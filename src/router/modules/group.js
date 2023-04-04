const Groups = () => import('@/views/groups/index.vue')
const AddGroups = () => import('@/views/addgroup/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'groups',
        name: 'groups',
        component: Groups,
        meta: {
          title: 'groups',
          affix: true,
        },
      },
      {
        path: 'addgroup',
        name: 'addgroup',
        component: AddGroups,
        meta: {
          title: 'addgroup',
          affix: true,
        },
      }
    ],
  },
]
