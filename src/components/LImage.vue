<template>
  <img
    :style="styleProps"
    class="l-image-component"
    :src="src"
    alt=""
    @click.prevent="handleClick"
  />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import {
  transformToComponentProps,
  imageDefaultProps,
  imageStylePropNames
} from '../defaultProps'
import useComponentCommon from '@/hooks/useComponentCommon'

const props = defineProps({
  ...defaultProps
})
console.log(props)
const { styleProps, handleClick } = useComponentCommon(
  props,
  imageStylePropNames
)
</script>

<script lang="ts">
// 2.生成props数据
const defaultProps = transformToComponentProps(imageDefaultProps)
</script>

<style>
.l-image-component {
  position: relative !important;
}
</style>
