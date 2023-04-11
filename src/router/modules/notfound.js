const NotFounded = () => import('@/views/notfound/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/:catchAll(.*)',
      component: Layout,
      children: [
        {
          path: '',
          component: NotFounded,
          meta: {
            title: '404',
            affix: true,
          },
        }
      ]
  },
]
