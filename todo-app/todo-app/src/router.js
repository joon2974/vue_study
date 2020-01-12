import Vue from 'vue'
import VueRouter from 'vue-router'

import Todo from './views/TodoPage.vue'
import OpencarelabInfo from './views/opencarelabInfo.vue'
import VueInfo from './views/VueInfo.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {path: '/', component: OpencarelabInfo},
    {path: '/vueinfo', component: VueInfo},
    {path: '/todo', component: Todo}
  ]
});

export default router


