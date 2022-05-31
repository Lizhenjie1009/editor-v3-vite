<template>
  <uploader
    action="https://jsonplaceholder.typicode.com/posts/"
    :before-upload="uploadValid"
    drag
    :auto-upload="false"
    list-type="picture"
  >
    <!-- <template #uploaded="scope">
      <div>{{ scope }}</div>
    </template> -->
  </uploader>
  <router-view></router-view>
</template>

<script setup lang="ts">
import Uploader from '@/components/Uploader.vue'
const uploadValid = (file: File) => {
  console.log(file)
  return true
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}

.file-upload .upload-area {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  padding: 20px;
  width: 360px;
  height: 180px;
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
