const Groups = () => import('@/views/groups/index.vue')
const Departments = () => import('@/views/departments/index.vue')
const AddGroups = () => import('@/views/addgroup/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'departments',
        name: 'departments',
        component: Departments,
        meta: {
          title: 'departments',
          affix: true,
        },
      },
      {
        path: 'groups',
        name: 'groups',
        component: Groups,
        meta: {
          title: 'groups',
          affix: true,
        },
      }
    ],
  },
]
