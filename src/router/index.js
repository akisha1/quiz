import {createRouter, createWebHistory} from 'vue-router'
import Quiz from '../views/Quiz.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/quiz/:id',
      name: 'Quiz',
      component: Quiz
    },
  ]
})

export default router;