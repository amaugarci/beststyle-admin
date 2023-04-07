const Trainings = () => import('@/views/trainings/index.vue')
const Traininggroup = () => import('@/views/traininggroup/index.vue')
// const AddGroups = () => import('@/views/addgroup/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'trainings',
        name: 'trainings',
        component: Trainings,
        meta: {
          title: 'groups',
          affix: true,
        },
      },
      {
        path: 'traininggroup',
        name: 'traininggroup',
        component: Traininggroup,
        meta: {
          title: 'traininggroup',
          affix: true,
        },
      }
    ],
  },
]
