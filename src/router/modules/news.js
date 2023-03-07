const News = () => import('@/views/news/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/news',
    component: Layout,
    children: [
      {
        path: '',
        name: 'news',
        component: News,
        meta: {
          title: 'news',
          affix: true,
        },
      },
    ],
  },
]
