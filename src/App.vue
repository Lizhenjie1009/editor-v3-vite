<template>
  <uploader
    action="https://jsonplaceholder.typicode.com/posts/"
    :before-upload="uploadValid"
  >
    <template #uploaded="scope">
      <div>{{ scope }}</div>
    </template>
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

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
