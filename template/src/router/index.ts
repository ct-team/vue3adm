import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/pages/Home.vue'),
    children: [
      {
        path: 'drawer',
        component: () => import('@/pages/Drawer.vue'),
        children: [
          {
            path: 'view',
            meta: { permission: 'view', title: '查看' },
            component: () => import('@/pages/View.vue'),
          },
          {
            path: 'edit',
            meta: { permission: 'edit', title: '编辑' },
            component: () => import('@/pages/Edit.vue'),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
