const Home = () => import('@/views/home/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        meta: {
          title: 'home',
          affix: true,
        },
      },
    ],
  },
]
