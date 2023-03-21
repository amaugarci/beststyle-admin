const Users = () => import('@/views/admins/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/admins',
    component: Layout,
    children: [
      {
        path: '',
        name: 'admins',
        component: Users,
        meta: {
          title: 'admins',
          affix: true,
        },
      },
    ],
  },
]
