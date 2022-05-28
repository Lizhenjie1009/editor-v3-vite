import { createRouter, createWebHistory } from 'vue-router'

const Editor = () => import('@/views/Editor.vue')

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'editor',
      // component: () => import('../views/Editor.vue')
      component: Editor
    }
  ]
})
