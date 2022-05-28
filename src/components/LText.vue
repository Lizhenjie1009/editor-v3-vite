<template>
  <component :is="tag" :style="styleProps" class="l-text-component">
    {{ text }}
  </component>
</template>
<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { pick } from 'lodash-es'
const props = defineProps({
  text: String,
  fontSize: String,
  tag: {
    type: String,
    default: 'div'
  }
})
console.log(props)
/**
 * pick:
 *  {fontSize: '10px'}
 */
const styleProps = computed(() => pick(props, ['fontSize']))
</script>
