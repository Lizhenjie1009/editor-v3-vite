// 右侧属性列表
import { TextComponentProps } from './defaultProps'

// 对应右侧的antd组件及属性
export interface PropToForm {
  component: string
  text?: string
  value?: string
  extraProps?: {
    [key: string]: any
  }
}

export type PropsToForms = {
  [key in keyof TextComponentProps]?: PropToForm
}

// 右侧展示的属性组件
export const mapPropsToForms: PropsToForms = {
  text: {
    text: '文本',
    component: 'a-textarea',
    extraProps: {
      rows: 3
    }
  },
  fontSize: {
    text: '字号',
    component: 'a-input-number'
  },
  lineHeight: {
    text: '行高',
    component: 'a-slider',
    extraProps: {
      // antd的组件属性
      min: 0,
      max: 3,
      step: 0.1
    }
  }
}
