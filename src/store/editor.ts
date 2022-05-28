import { Module } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { GlobalDataProps } from './index'

// editor的state类型数据
export interface EditorProps {
  components: ComponentData[]
  currentElement: string
}
interface ComponentData {
  props: { [key: string]: any } // 索引签名
  id: string
  name: string
}

export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'l-text',
    props: { text: 'hello', fontSize: '20px', color: 'red' }
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: { text: 'hello2', fontSize: '30px', fontWeight: 'bold' }
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello3',
      fontSize: '40px',
      actionType: 'url',
      url: 'https://www.baidu.com'
    }
  }
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: ''
  },
  mutations: {
    addComponent(state, data) {
      const newComponent: ComponentData = {
        id: uuidv4(),
        name: 'l-text',
        props: data
      }
      state.components.push(newComponent)
    }
  }
}

export default editor
