<template>
  <div class="props-table">
    <div v-for="(value, index) in finalProps" :key="index" class="prop-item">
      <span v-if="value.text" class="label">{{ value.text }}</span>
      <div class="prop-component">
        <component
          :is="value.component"
          v-if="value"
          :[value.valueProp]="value.value"
          v-bind="value.extraProps"
          v-on="value.events"
        >
          <!-- 渲染嵌套组件 -->
          <template v-if="value.options">
            <component
              :is="value.subComponent"
              v-for="(option, key) in value.options"
              :key="key"
              :value="option.value"
            >
              {{ option.text }}
              <!-- <render-vnode :v-node="option.text"></render-vnode> -->
            </component>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, computed, defineEmits } from 'vue'
import { reduce } from 'lodash'
import { TextComponentProps } from '../defaultProps'
import { mapPropsToForms } from '../propsMap'
import RenderVnode from '@/components/RenderVnode'

// 当前渲染所需要的类型
interface FormProps {
  component: string
  subComponent?: string
  value: string
  extraProps?: {
    [key: string]: any
  }
  text?: string
  options?: { text: string; value: any }[]
  initalTransform?: (v: any) => any // 转换组件库对应需要的类型
  valueProp: string // 非组件库组件
  eventName: string
  events: { [key: string]: (e: any) => void }
}

const props = defineProps({
  props: {
    type: Object as PropType<TextComponentProps>,
    required: true
  }
})

const emit = defineEmits(['change'])

// 单独出来传过来的自定义画布属性对应的value
const finalProps = computed(() => {
  return reduce(
    props.props,
    (result, value, key) => {
      /**
       * key隐式错误为string
       * mapPropsToForms类型为PropsToForms
       * PropsToForms中的item为TextComponentProps之一
       *  需要类型断言为TextComponentProps中的之一
       */
      const newKey = key as keyof TextComponentProps
      const item = mapPropsToForms[newKey]
      if (item) {
        const {
          valueProp = 'value',
          eventName = 'change',
          initalTransform,
          afterTransform
        } = item
        const newItem: FormProps = {
          ...item,
          value: initalTransform ? initalTransform(value) : value,
          valueProp,
          eventName,
          events: {
            // [eventName]动态加载事件名称
            [eventName]: (e: any) =>
              emit('change', {
                key,
                value: afterTransform ? afterTransform(e) : e
              })
          }
        }
        // item.value = item.initalTransform ? item.initalTransform(value) : value
        // item.valueProp = item.valueProp ? item.valueProp : 'value'
        // {} as PropsToForms
        // {} as Required<PropsToForms> 必选类型不会推断出问题
        /**
         * {}隐式any类型，不能找到对应的key
         * 断言 {} as PropsToForms
         */
        result[newKey] = newItem
      }
      return result
    },
    // {} as PropsToForms
    {} as { [key: string]: FormProps }
  )
})
</script>

<style>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
.label {
  width: 20%;
}
.prop-component {
  width: 70%;
}
</style>
