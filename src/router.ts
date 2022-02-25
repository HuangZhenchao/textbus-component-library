import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//import Layout from '@/layout'

export const constantRoutes = [ 
  {
    path: '/',
    redirect: '/textbus2',

  },

  {
    path:'/textbus2/:filePath',
    component: () => import('@/views/Home.vue'),
    //redirect:'/tagManager/video',
    meta: { title: '标签管理', icon: 'figure' },
    //query:{filePath:}
  },

]


const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ x:0,y: 0 }),
  routes: constantRoutes
})

const router = createRouter() 
//export function resetRouter() {
//  const newRouter = createRouter()
//  router.matcher=newRouter.matcher // reset router
//}

export default router