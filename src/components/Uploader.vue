<template>
  <div class="file-upload">
    <button @click="triggerUpload">
      <span v-if="fileStatus === 'loading'">正在上传</span>
      <span v-else-if="fileStatus === 'success'">上传成功</span>
      <span v-else-if="fileStatus === 'error'">上传失败</span>
      <span v-else>点击上传</span>
    </button>
    <input
      ref="fileInput"
      type="file"
      :style="{ display: 'none' }"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import axios from 'axios'

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'

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

// 上传
const fileStatus = ref<UploadStatus>('ready')
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    const uploadedFile = files[0]
    const formData = new FormData()
    formData.append(uploadedFile.name, uploadedFile)
    fileStatus.value = 'loading'
    axios
      // .post('http://local.test:7001/api/upload', formData, {
      .post(props.action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        fileStatus.value = 'success'
        console.log(res)
      })
      .catch(err => {
        fileStatus.value = 'error'
        console.log(err)
      })
  }
}
</script>
