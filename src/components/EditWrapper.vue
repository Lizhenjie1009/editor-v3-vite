<template>
  <div
    class="edit-wrapper"
    :class="{ active: active }"
    @click="onItemClick(id)"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
  id: {
    type: String,
    required: true
  },
  active: {
    // 是否选中
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['set-active'])
const onItemClick = (id: string) => {
  emit('set-active', id)
}
</script>

<style>
.edit-wrapper {
  padding: 0;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
}
.edit-wrapper:hover {
  border: 1px solid #ccc;
}
.edit-wrapper.active {
  border: 1px solid #1890ff;
  z-index: 1500;
}
</style>
