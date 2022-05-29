import { defineComponent } from 'vue'

// 中间桥梁
const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [Object, String],
      required: true
    }
  },
  render() {
    return this.vNode
  }
})

export default RenderVnode
