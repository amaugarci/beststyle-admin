const Users = () => import('@/views/users/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/users',
    component: Layout,
    name: 'users',
    children: [
      {
        path: '',
        name: 'users',
        component: Users,
        meta: {
          title: 'users',
          affix: true,
        },
      },
    ],
  },
]
