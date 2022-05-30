<template>
  <uploader action="https://jsonplaceholder.typicode.com/posts/">
    <template #uploaded="scope">
      <div>{{ scope }}</div>
    </template>
  </uploader>
  <router-view></router-view>
</template>

<script setup lang="ts">
import Uploader from '@/components/Uploader.vue'
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
