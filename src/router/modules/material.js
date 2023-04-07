const Materials = () => import('@/views/materials/index.vue')
const Materialgroup = () => import('@/views/materialgroup/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'materials',
        name: 'materials',
        component: Materials,
        meta: {
          title: 'materials',
          affix: true,
        },
      },
      {
        path: 'materialgroup',
        name: 'materialgroup',
        component: Materialgroup,
        meta: {
          title: 'materialgroup',
          affix: true,
        },
      }
    ],
  },
]
