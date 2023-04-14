const User = () => import('@/views/user/index.vue')
const Roles = () => import('@/views/roles/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'user',
        name: 'user',
        component: User,
        meta: {
          title: 'user',
          affix: true,
        },
      },
      {
        path: 'roles',
        name: 'roles',
        component: Roles,
        meta: {
          title: 'role',
          affix: true,
        },
      }
    ],
  },
]
