const Checks = () => import('@/views/checks/index.vue')
const Addcheck = () => import('@/views/addcheck/index.vue')
const Addcstate = () => import('@/views/addcstate/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'checks',
        name: 'checks',
        component: Checks,
        meta: {
          title: 'checks',
          affix: true,
        },
      },
      {
        path: 'addcheck',
        name: 'addcheck',
        component: Addcheck,
        meta: {
          title: 'addcheck',
          affix: true,
        },
      },
      {
        path: 'addcstate',
        name: 'addcstate',
        component: Addcstate,
        meta: {
          title: 'addcstate',
          affix: true,
        },
      }
    ],
  },
]
