const Blocked = () => import('@/views/blocked/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/blocked',
    name:'blocked',
    component: Blocked,
    meta: {
      title: 'blocked',
      affix: true,
    },
  },
]
