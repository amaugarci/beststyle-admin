const Localization = () => import('@/views/localization/index.vue')
const Editlocalization = () => import('@/views/editlocalization/index.vue')
const Createlocalization = () => import('@/views/createlocalization/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/localization',
    component: Layout,
    children: [
      {
        path: '',
        name: 'localization',
        component: Localization,
        meta: {
          title: 'localization',
          affix: true,
        },
      },
      {
        path: 'create',
        name: 'createlocalization',
        component: Createlocalization,
        meta: {
          title: 'createlocalization',
          affix: true,
        },
      },
      {
        path: ':id',
        name: 'editlocalization',
        component: Editlocalization,
        meta: {
          title: 'editlocalization',
          affix: true,
        },
      }
    ],
  },
]
