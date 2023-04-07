const Checks = () => import('@/views/checks/index.vue')
const Categories = () => import('@/views/categories/index.vue')
const States = () => import('@/views/states/index.vue')
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
        path: 'categories',
        name: 'categories',
        component: Categories,
        meta: {
          title: 'categories',
          affix: true,
        },
      },
      {
        path: 'states',
        name: 'states',
        component: States,
        meta: {
          title: 'states',
          affix: true,
        },
      }
    ],
  },
]
