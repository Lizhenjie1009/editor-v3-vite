<template>
  <uploader
    class="styled-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-upload-list="false"
    :before-upload="commonUploadCheck"
    list-type="picture"
    @success="data => handleUploadSuccess(data)"
  >
    <div class="uploader-container">
      <h4>上传图片</h4>
    </div>
    <template #loading>
      <div class="uploader-container">
        <h4>上传中</h4>
      </div>
    </template>
    <template #uploaded>
      <div class="uploader-container">
        <h4>上传图片</h4>
      </div>
    </template>
  </uploader>
</template>

<script lang="ts" setup>
import Uploader from './Uploader.vue'
import { commonUploadCheck } from '../helper'

const handleUploadSuccess = (data: any) => {
  console.log(data)
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
}

.styled-uploader {
  background-color: #559999;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  padding: 20px;
  width: 120px;
  height: 60px;
  text-align: center;
  &:hover {
    border: 1px solid #1890ff;
  }
  &.is-dragover {
    border: 2px solid #189;
    background: rgba(#189, 0.2);
  }
}
</style>
