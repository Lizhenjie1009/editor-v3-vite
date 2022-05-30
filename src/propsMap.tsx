// 右侧属性列表
import { VNode, h } from 'vue'
import { TextComponentProps } from './defaultProps'

// 对应右侧的antd组件及属性
export interface PropToForm {
  component: string
  text?: string
  extraProps?: {
    [key: string]: any
  }
  subComponent?: string
  options?: { text: string | VNode; value: any }[]
  initalTransform?: (v: any) => any // 转换组件库对应需要的类型
  afterTransform?: (v: any) => any // 复原原属性值
  valueProp?: string // 非组件库组件
  eventName?: string
}

export type PropsToForms = {
  [key in keyof TextComponentProps]?: PropToForm
}
const fontFamilyArr = [
  { value: '', text: '无' },
  { text: '宋体', value: '"SimSun","STSong"' },
  { text: '黑体', value: '"SimHei","STHeiti"' },
  { text: '楷体', value: '"KaiTi","STKaiti"' },
  { text: '仿宋', value: '"FangSong","STFangsong"' }
]
const fontFamilOptions = fontFamilyArr.map(font => {
  return {
    value: font.value,
    // text: h('span', { style: { fontFamily: font.value } }, font.text)
    text: <span style={{fontFamily: font.value}}>{font.text}</span>
  }
})

// 右侧展示的属性组件
export const mapPropsToForms: PropsToForms = {
  text: {
    text: '文本',
    component: 'a-textarea',
    extraProps: {
      rows: 3
    },
    afterTransform: (e: any) => e.target.value
  },
  fontSize: {
    text: '字号',
    component: 'a-input-number',
    initalTransform: (v: string) => parseInt(v),
    afterTransform: (e: number) => (e ? `${e}px` : '')
  },
  lineHeight: {
    text: '行高',
    component: 'a-slider',
    extraProps: {
      // antd的组件属性
      min: 0,
      max: 3,
      step: 0.1
    },
    initalTransform: (v: string) => parseFloat(v),
    afterTransform: (e: number) => e.toString()
  },
  textAlign: {
    component: 'a-radio-group',
    subComponent: 'a-radio-button',
    text: '对齐',
    options: [
      { value: 'left', text: '左' },
      { value: 'center', text: '中' },
      { value: 'right', text: '右' }
    ],
    afterTransform: (e: any) => e.target.value
  },
  fontFamily: {
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '字体',
    options: [{ value: '', text: '无' }, ...fontFamilOptions]
  },
  color: {
    component: 'color-picker',
    text: "字体颜色"
  }
}
