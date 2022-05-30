<template>
  <div class="file-upload">
    <div class="upload-area" @click="triggerUpload">
      <slot v-if="isUploading" name="loading">
        <button disabled>正在上传</button>
      </slot>
      <slot
        v-else-if="lastFileData && lastFileData.loaded"
        name="uploaded"
        :uploaded-data="lastFileData.data"
      >
        <button>点击上传</button>
      </slot>
      <slot v-else name="default">
        <button>点击上传</button>
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
        v-for="file in uploadFiles"
        :key="file.uid"
        :class="`uploaded-file upload-${file.status}`"
      >
        <span class="filename">{{ file.name }}</span>
        <button class="delete-icon" @click="removeFile(file.uid)">Del</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, reactive, computed } from 'vue'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { last } from 'lodash-es'

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
interface UploadFile {
  uid: string
  size: number
  name: string
  status: UploadStatus
  raw: File
  resp?: any
}
const props = defineProps({
  action: {
    type: String,
    required: true
  }
})

// 按钮模拟点击
const fileInput = ref<null | HTMLInputElement>(null)
const triggerUpload = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const uploadFiles = ref<UploadFile[]>([])
const isUploading = computed(() => {
  return uploadFiles.value.some(file => file.status === 'loading')
})
const lastFileData = computed(() => {
  const lastFile = last(uploadFiles.value)
  if (lastFile) {
    return {
      loaded: lastFile.status === 'success',
      data: lastFile.resp
    }
  }
  return false
})
const removeFile = (id: string) => {
  uploadFiles.value = uploadFiles.value.filter(file => file.uid !== id)
}

// 上传
const fileStatus = ref<UploadStatus>('ready')
const handleFileChange = (e: Event) => {
  console.log(111)
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    const uploadedFile = files[0]
    const formData = new FormData()
    formData.append(uploadedFile.name, uploadedFile)
    const fileObj = reactive<UploadFile>({
      uid: uuidv4(),
      size: uploadedFile.size,
      name: uploadedFile.name,
      status: 'loading',
      raw: uploadedFile
    })
    uploadFiles.value.push(fileObj)
    fileStatus.value = 'loading'
    axios
      // .post('http://local.test:7001/api/upload', formData, {
      .post(props.action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        fileObj.status = 'success'
        fileStatus.value = 'success'
        fileObj.resp = res
        console.log(res)
      })
      .catch(err => {
        fileObj.status = 'error'
        fileStatus.value = 'error'
        console.log(err)
      })
      .finally(() => {
        // 两次点击元素事件一样
        if (fileInput.value) {
          fileInput.value.value = ''
        }
      })
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
