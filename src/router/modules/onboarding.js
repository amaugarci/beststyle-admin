const Onboardings = () => import('@/views/onboardings/index.vue')
const AddOnboardings = () => import('@/views/addonboarding/index.vue')
const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'onboardings',
        name: 'onboardings',
        component: Onboardings,
        meta: {
          title: 'onboardings',
          affix: true,
        },
      },
      {
        path: 'addonboarding',
        name: 'addonboarding',
        component: AddOnboardings,
        meta: {
          title: 'addonboarding',
          affix: true,
        },
      }
    ],
  },
]
