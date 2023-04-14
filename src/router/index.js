
import { createRouter, createWebHashHistory } from 'vue-router'

import login from './modules/login'
import home from './modules/home'
import user from './modules/users'
import group from './modules/group'
import onboarding from './modules/onboarding'
import training from './modules/training'
import material from './modules/material'
import character from './modules/character'
import check from './modules/check'
import log from './modules/log'
import notfound from './modules/notfound'
import {useAuthStore} from '@/pinia/modules/useAuthStore';


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    ...login,
    ...home,
    ...user,
    ...group,
    ...onboarding,
    ...training,
    ...material,
    ...character,
    ...check,
    ...log,
    ...notfound
    // ...localization
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  },
})
router.beforeEach(async (to) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  if(auth.admin==null&&auth.token){
    auth.fetchAdmin();
  }
  if (authRequired && !auth.token) {
      auth.returnUrl = to.name;
      return '/login';
  }
  
});
export default router
