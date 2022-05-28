<template>
  <component :is="tag" :style="styleProps" class="l-text-component">
    {{ text }}
  </component>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { pick } from 'lodash-es'
import {
  transformToComponentProps,
  textDefaultProps,
  textStylePropNames
} from '../defaultProps'

// 1.生成props数据，不能使用自己导入的数据。按照2使用，
// const defaultProps = transformToComponentProps(textDefaultProps)
const props = defineProps({
  ...defaultProps,
  tag: {
    type: String,
    default: 'div'
  }
})
// console.log(props)
/**
 * pick:
 *  {fontSize: '10px'}
 */
const styleProps = computed(() => pick(props, textStylePropNames))
</script>

<script lang="ts">
// 2.生成props数据
const defaultProps = transformToComponentProps(textDefaultProps)
</script>

<style>
.l-text-component {
  position: relative !important;
}
</style>
