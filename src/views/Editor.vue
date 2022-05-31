<template>
  <a-row class="editor">
    <a-layout>
      <a-col :span="6">
        <a-layout-sider class="editor-col">
          <h1>组件列表</h1>
          <components-list :list="defaultTextTemplates" @onItemEmit="addItem" />
        </a-layout-sider>
      </a-col>
      <a-col :span="12">
        <a-layout-sider class="editor-col center">
          <h1>画布区域</h1>
          <div id="canvas-area" class="preview">
            <edit-wrapper
              v-for="component in components"
              :id="component.id"
              :key="component.id"
              :active="component.id === currentElement?.id"
              @setActive="setActive"
            >
              <component :is="component.name" v-bind="component.props" />
            </edit-wrapper>
          </div>
          <!-- <l-text
            v-for="component in components"
            :key="component.id"
            v-bind="component.props"
          ></l-text> -->
        </a-layout-sider>
      </a-col>
      <a-col :span="6">
        <a-layout-sider class="editor-col">
          <h1>组件属性</h1>
          <props-table
            v-if="currentElement && currentElement.props"
            :props="currentElement.props"
            @change="handleChange"
          />
          <pre>{{ currentElement && currentElement.props }}</pre>
        </a-layout-sider>
      </a-col>
    </a-layout>
  </a-row>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store/index'
import { ComponentData } from '../store/editor'
import ComponentsList from '@/components/ComponentsList.vue'
import { defaultTextTemplates } from '../defaultTemplates'
import EditWrapper from '@/components/EditWrapper.vue'
import PropsTable from '@/components/PropsTable.vue'

const store = useStore<GlobalDataProps>()
const components = computed(() => store.state.editor.components)
// 获取选中节点--未点击之前类型是null，点击之后是ComponentData
const currentElement = computed<ComponentData | null>(
  () => store.getters.getCurrentElement
)

// 从列表组件往画布区域添加
const addItem = (data: any) => {
  store.commit('addComponent', data)
}
// 从画布区域选择当前选中
const setActive = (id: string) => {
  store.commit('setActive', id)
}

// 接受右侧属性事件
const handleChange = (e: any) => {
  console.log(e)
  store.commit('updateComponent', e)
}
</script>

<script lang="ts">
import LText from '@/components/LText.vue'
export default {
  components: {
    LText
  }
}
</script>

<style lang="scss" scoped>
.editor {
  width: 100%;
  height: 100%;
}
.editor-col {
  min-width: 100% !important;
  height: 100%;
  background-color: #eee;
}
.center {
  background-color: #fff;
}
</style>
