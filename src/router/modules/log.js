const Logs = () => import('@/views/logs/index.vue')
const Ips = () => import('@/views/ips/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'logs',
        name: 'logs',
        component: Logs,
        meta: {
          title: 'logs',
          affix: true,
        },
      },
      {
        path: 'ips',
        name: 'ips',
        component: Ips,
        meta: {
          title: 'ips',
          affix: true,
        },
      }
    ],
  },
]
