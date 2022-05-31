<template>
  <div class="create-component-list">
    <!-- 文本 -->
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item)"
    >
      <l-text v-bind="item"></l-text>
    </div>

    <!-- 图片 -->
    <style-uploader />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import LText from './LText.vue'
import StyleUploader from '@/components/StyleUploader.vue'

defineProps({
  list: {
    type: Array,
    required: true
  }
})

// 注册事件
const emit = defineEmits(['on-item-emit'])

const onItemClick = (data: any) => {
  emit('on-item-emit', data)
}
</script>
