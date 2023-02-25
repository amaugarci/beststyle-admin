const Financial = () => import('@/views/financial/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/financial',
    component: Layout,
    name: 'financial',
    children: [
      {
        path: '',
        name: 'financial',
        component: Financial,
        meta: {
          title: 'financial',
          affix: true,
        },
      },
    ],
  },
]
