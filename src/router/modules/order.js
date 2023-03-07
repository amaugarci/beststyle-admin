const Order = () => import('@/views/order/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: '',
        name: 'order',
        component: Order,
        meta: {
          title: 'order',
          affix: true,
        },
      },
    ],
  },
]
