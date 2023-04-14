const Characters = () => import('@/views/characters/index.vue')
const CharacterComment = () => import('@/views/charactercomments/index.vue')
const Charactergroup = () => import('@/views/charactergroup/index.vue')
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
      {
        path: 'characters/:id',
        name: 'charactercomments',
        component: CharacterComment,
        meta: {
          title: 'groups',
          affix: true,
        },
      },
      {
        path: 'charactergroup',
        name: 'charactergroup',
        component: Charactergroup,
        meta: {
          title: 'charactergroup',
          affix: true,
        },
      }
    ],
  },
]
