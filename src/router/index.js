
import { createRouter, createWebHashHistory } from 'vue-router'

import login from './modules/login'
import home from './modules/home'
import users from './modules/users'
import commodity from './modules/commodity'
import order from './modules/order'
import financial from './modules/financial'
import news from './modules/news'
import system from './modules/system'
// import {useAuthStore} from '@/pinia/modules/useAuthStore';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    ...login,
    ...home,
    ...users,
    ...commodity,
    ...order,
    ...financial,
    ...news,
    ...system
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  },
})
// router.beforeEach(async (to) => {
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const auth = useAuthStore();
//   if(auth.user==null&&auth.token){
//     auth.fetchUser();
//   }
//   if (authRequired && !auth.token) {
//       auth.returnUrl = to.name;
//       return '/login';
//   }
// });
export default router
