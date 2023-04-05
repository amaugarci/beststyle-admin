const Characters = () => import('@/views/characters/index.vue')
// const AddGroups = () => import('@/views/addgroup/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'characters',
        name: 'characters',
        component: Characters,
        meta: {
          title: 'characters',
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
