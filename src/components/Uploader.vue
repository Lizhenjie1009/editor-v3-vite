<template>
  <div class="file-upload">
    <div
      class="upload-area"
      :class="{ 'is-dragover': drag && isDragOver }"
      v-on="events"
    >
      <!-- @click="triggerUpload" -->
      <slot v-if="isUploading" name="loading">
        <button disabled>正在上传</button>
      </slot>
      <slot
        v-else-if="lastFileData && lastFileData.loaded"
        name="uploaded"
        :uploaded-data="lastFileData.data"
      >
        <button>点击上传1</button>
      </slot>
      <slot v-else name="default">
        <button>点击上传2</button>
        <button @click.stop="uploadFiles">手动上传</button>
      </slot>
    </div>
    <input
      ref="fileInput"
      type="file"
      :style="{ display: 'none' }"
      @change="handleFileChange"
    />
    <ul>
      <li
        v-for="file in filesList"
        :key="file.uid"
        :class="`uploaded-file upload-${file.status}`"
      >
        <img
          v-if="file.url && listType === 'picture'"
          class="file-icon"
          :src="file.url"
          :alt="file.name"
        />
        <span class="filename">{{ file.name }}</span>
        <button class="delete-icon" @click="removeFile(file.uid)">Del</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, reactive, computed, PropType } from 'vue'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { last } from 'lodash-es'

type FileListType = 'picture' | 'text'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
// 使用上传组件的回调类型检测
type CheckUpload = (file: File) => boolean | Promise<File>
interface UploadFile {
  uid: string
  size: number
  name: string
  status: UploadStatus
  raw: File
  resp?: any
  url?: string
}
const props = defineProps({
  action: {
    type: String,
    required: true
  },
  beforeUpload: {
    // 上传之前的钩子回调函数
    type: Function as PropType<CheckUpload>
  },
  drag: {
    // 拖拽
    type: Boolean,
    default: false
  },
  autoUpload: {
    // 是否自动上传
    type: Boolean,
    default: true
  },
  listType: {
    // 显示缩略图picture可以预览
    type: String as PropType<FileListType>,
    default: 'text'
  }
})

// 按钮模拟点击
const fileInput = ref<null | HTMLInputElement>(null)
const triggerUpload = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const filesList = ref<UploadFile[]>([])
const isDragOver = ref(false)
const isUploading = computed(() => {
  return filesList.value.some(file => file.status === 'loading')
})
const lastFileData = computed(() => {
  const lastFile = last(filesList.value)
  if (lastFile) {
    return {
      loaded: lastFile.status === 'success',
      data: lastFile.resp
    }
  }
  return false
})
const removeFile = (id: string) => {
  filesList.value = filesList.value.filter(file => file.uid !== id)
}

// 上传
// const fileStatus = ref<UploadStatus>('ready')
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  beforeUploadCheck(files)
}

const postFile = (readyFile: UploadFile) => {
  const formData = new FormData()
  formData.append(readyFile.name, readyFile.raw)
  readyFile.status = 'loading'
  axios
    // .post('http://local.test:7001/api/upload', formData, {
    .post(props.action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      readyFile.status = 'success'
      // fileStatus.value = 'success'
      readyFile.resp = res
      console.log(res)
    })
    .catch(err => {
      readyFile.status = 'error'
      // fileStatus.value = 'error'
      console.log(err)
    })
    .finally(() => {
      // 两次点击元素事件一样
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    })
}

// addFileToList
const addFileToList = (uploadedFile: File) => {
  const fileObj = reactive<UploadFile>({
    uid: uuidv4(),
    size: uploadedFile.size,
    name: uploadedFile.name,
    status: 'ready',
    raw: uploadedFile
  })
  if (props.listType === 'picture') {
    try {
      // 创建图片utf-16 bolb链接
      fileObj.url = URL.createObjectURL(uploadedFile)
    } catch (err) {
      console.error('upload File error', err)
    }
  }
  filesList.value.push(fileObj)
  if (props.autoUpload) {
    postFile(fileObj)
  }
}
const beforeUploadCheck = (files: null | FileList) => {
  if (files) {
    const uploadedFile = files[0]
    if (props.beforeUpload) {
      const result = props.beforeUpload(uploadedFile)
      // 判断是不是promise
      if (result && result instanceof Promise) {
        result
          .then(processedFile => {
            if (processedFile instanceof File) {
              addFileToList(processedFile)
            } else {
              throw new Error('beforeUpload Promise should return File object')
            }
          })
          .catch(err => {
            console.error(err)
          })
      } else if (result === true) {
        addFileToList(uploadedFile)
      }
    } else {
      addFileToList(uploadedFile)
    }
  }
}
const uploadFiles = () => {
  filesList.value
    .filter(file => file.status === 'ready')
    .forEach(readyFile => postFile(readyFile))
}

// ts v-on='{'click': fn}'
let events: { [key: string]: (e: any) => void } = {
  click: triggerUpload
}
const handleDrag = (e: DragEvent, over: boolean) => {
  e.preventDefault()
  isDragOver.value = over
}
const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false
  if (e.dataTransfer) {
    beforeUploadCheck(e.dataTransfer.files)
  }
}
if (props.drag) {
  events = {
    ...events,
    dragover: (e: DragEvent) => handleDrag(e, true),
    dragleave: (e: DragEvent) => handleDrag(e, false),
    drop: handleDrop
  }
}
</script>

<style>
.upload-loading {
  color: yellow;
}
.upload-success {
  color: green;
}
.upload-error {
  color: red;
}
</style>
