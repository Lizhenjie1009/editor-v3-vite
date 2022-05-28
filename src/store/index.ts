import { createStore } from 'vuex'
import editor, { EditorProps } from './editor'
import template, { TemplateProps } from './template'

// 全局state类型数据
export interface GlobalDataProps {
  editor: EditorProps
  template: TemplateProps
}

export default createStore({
  modules: {
    editor,
    template
  }
})
