const System = () => import('@/views/system/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/system',
    component: Layout,
    name: 'system',
    children: [
      {
        path: '',
        name: 'system',
        component: System,
        meta: {
          title: 'system',
          affix: true,
        },
      },
    ],
  },
]
