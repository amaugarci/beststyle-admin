const Transaction = () => import('@/views/transaction/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/transaction',
    component: Layout,
    children: [
      {
        path: '',
        name: 'transaction',
        component: Transaction,
        meta: {
          title: 'transaction',
          affix: true,
        },
      },
    ],
  },
]
