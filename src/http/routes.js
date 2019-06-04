

import login from '@/features/login/main.vue'
import dashboard from '@/features/dashboard/main.vue'
import account from '@/features/account/main.vue'



const routes = [
  {
    name: 'login',
    path: '/login',
    component: login,
    title: 'Login',
    layout: 'PublicLayout',
    isPublic: true
  },
  {
    name: 'maps',
    path: '/',
    component: dashboard,
    title: 'Maps',
    layout: 'DefaultLayout',
    isPublic: false
  },
  {
    name: 'account',
    path: '/account',
    component: account,
    title: 'Account',
    layout: 'DefaultLayout',
    isPublic: false
  }
]

export default routes
