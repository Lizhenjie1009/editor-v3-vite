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
    <style-uploader @image-uploaded="onImageUploaded" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import LText from './LText.vue'
import StyleUploader from '@/components/StyleUploader.vue'
import { v4 as uuidv4 } from 'uuid'
import { imageDefaultProps } from '../defaultProps'
import { getImageDimensions } from '../helper'
defineProps({
  list: {
    type: Array,
    required: true
  }
})

// 注册事件
const emit = defineEmits(['on-item-emit'])

const onItemClick = (data: any) => {
  emit('on-item-emit', {
    id: uuidv4(),
    name: 'l-text',
    props: data
  })
}

const onImageUploaded = (res: any) => {
  // console.log(res)
  const componentData = {
    id: uuidv4(),
    name: 'l-image',
    props: {
      ...imageDefaultProps
    }
  }
  componentData.props.src = res.url
  getImageDimensions(res.url).then(({ width, height }) => {
    console.log(width, height)
    const maxWidth = 373
    componentData.props.width = (width > maxWidth ? maxWidth : width) + 'px'
    emit('on-item-emit', componentData)
  })
  // emit('on-item-emit', componentData)
}
</script>
