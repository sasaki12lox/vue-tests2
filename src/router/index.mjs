import { createRouter, createWebHistory } from 'vue-router'
import CardCreator from '../pages/cardCreator.vue';
import CardHolder from '../pages/cardHolder.vue';

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/creator',
      name: 'creator',
      component: CardCreator
    },
    {
      path: '/holder',
      name: 'holder',
      component: CardHolder
    }
  ]
})

export default router
