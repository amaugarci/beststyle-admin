const Materials = () => import('@/views/materials/index.vue')
// const AddGroups = () => import('@/views/addgroup/index.vue')
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
      // {
      //   path: 'addgroup',
      //   name: 'addgroup',
      //   component: AddGroups,
      //   meta: {
      //     title: 'addgroup',
      //     affix: true,
      //   },
      // }
    ],
  },
]
