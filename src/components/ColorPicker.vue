<template>
  <div class="self-color-picker">
    <div class="native-color-container">
      <input
        type="color"
        :value="value"
        @input="onChange(($event.target as HTMLInputElement).value)"
      />
    </div>
    <ul class="picked-color-list">
      <li
        v-for="(item, key) in colors"
        :key="key"
        :class="`item-${key}`"
        @click.prevent="onChange(item)"
      >
        <div
          v-if="item.startsWith('#')"
          :style="{ backgroundColor: item }"
          class="color-item"
        ></div>
        <div v-else class="color-item transparent-back"></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
const defaultColors = [
  '#ffffff',
  '#f5222d',
  '#fa541c',
  '#fadb14',
  '#52c412',
  '#5254c2',
  '#1234c2',
  '#521412',
  '#323432',
  ''
]
</script>

<script lang="ts" setup>
import { defineProps, PropType, defineEmits } from 'vue'

const props = defineProps({
  value: {
    type: String
  },
  colors: {
    type: Array as PropType<string[]>,
    default: defaultColors
  }
})
const emit = defineEmits(['change'])

const onChange = (color: string) => {
  emit('change', color)
}
</script>

<style>
.self-color-picker {
  display: flex;
}
.native-color-container {
  width: 30%;
}
.picked-color-list {
  padding-left: 3px;
  margin: 0;
  width: 60%;
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
  justify-content: space-between;
}
.picked-color-list li {
  flex: 1;
  width: 20%;
  min-width: 20%;
  max-width: 20%;
  margin-bottom: 10px;
}
.color-item {
  padding: 3px;
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-right: 5px;
  cursor: pointer;
}
.transparent-back {
  border: 1px solid #000;
  background-color: #eee;
}
</style>
