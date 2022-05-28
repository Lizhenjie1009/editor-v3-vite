import { mapValues } from 'lodash-es'

// 编辑器通用属性
export const commonDefaultProps = {
  // actions
  actionsType: '',
  url: '',
  // size
  height: '',
  width: '318px',
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  // border type
  borderStyle: 'none',
  borderColor: '#000',
  borderWdith: '0',
  borderRadius: '0',
  // shadow and opacity
  boxShadow: '0 0 0 #000000',
  opacity: 1,
  // position and x,y
  position: 'absolute',
  left: '0',
  top: '0',
  right: '0'
}

// 文本通用属性
export const textDefaultProps = {
  text: '正文内容',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
  textAlign: 'left',
  color: '#000',
  backgroundColor: '',
  ...commonDefaultProps
}

export const transformToComponentProps = (props: { [key: string]: any }) => {
  return mapValues(props, item => {
    return {
      type: item.constructor,
      default: item
    }
  })
}
