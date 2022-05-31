import { Module } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { GlobalDataProps } from './index'

// editor的state类型数据
export interface EditorProps {
  components: ComponentData[]
  currentElement: string
}
export interface ComponentData {
  props: { [key: string]: any } // 索引签名
  id: string
  name: string
}

export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello',
      fontSize: '20px',
      color: '#ff0000',
      lineHeight: '1',
      textAlign: 'left',
      fontFamily: ''
    }
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello2',
      fontSize: '30px',
      fontWeight: 'bold',
      lineHeight: '2',
      textAlign: 'left',
      fontFamily: ''
    }
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello3',
      fontSize: '40px',
      actionType: 'url',
      url: 'https://www.baidu.com',
      lineHeight: '3',
      textAlign: 'left',
      fontFamily: ''
    }
  }
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: ''
  },
  getters: {
    getCurrentElement: state =>
      state.components.find(component => component.id === state.currentElement)
  },
  mutations: {
    addComponent(state, data: ComponentData) {
      state.components.push(data)
      console.log(state.components)
    },
    setActive(state, id) {
      state.currentElement = id
    },
    updateComponent(state, { key, value }) {
      // 找到当前的元素
      const updateComponent = state.components.find(
        component => component.id === state.currentElement
      )

      if (updateComponent) {
        updateComponent.props[key] = value
      }
    }
  }
}

export default editor
