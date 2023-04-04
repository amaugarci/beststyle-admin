const User = () => import('@/views/user/index.vue')
const Admin = () => import('@/views/admin/index.vue')
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
        path: 'admin',
        name: 'admin',
        component: Admin,
        meta: {
          title: 'admin',
          affix: true,
        },
      }
    ],
  },
]
