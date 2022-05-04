import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
//import Layout from '@/layout'
export const constantRoutes = [
    {
        path: '/',
        redirect: '/textbusTest',
    },
    {
        path: '/textbusTest',
        name: 'textbusTest',
        component: () => import('@/views/Index.vue'),
        //redirect:'/tagManager/video',
        meta: { title: '标签管理', icon: 'figure' },
    },
];
const createRouter = () => new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: constantRoutes
});
const router = createRouter();
//export function resetRouter() {
//  const newRouter = createRouter()
//  router.matcher=newRouter.matcher // reset router
//}
export default router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUM7QUFDdEIsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBRW5DLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFbkIsK0JBQStCO0FBRS9CLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRztJQUM1QjtRQUNFLElBQUksRUFBRSxHQUFHO1FBQ1QsUUFBUSxFQUFFLGNBQWM7S0FFekI7SUFDRDtRQUNFLElBQUksRUFBQyxjQUFjO1FBQ25CLElBQUksRUFBQyxhQUFhO1FBQ2xCLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUM7UUFDNUMsK0JBQStCO1FBQy9CLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtLQUV4QztDQUNGLENBQUE7QUFHRCxNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLFNBQVMsQ0FBQztJQUN2Qyw4Q0FBOEM7SUFDOUMsY0FBYyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNwQyxNQUFNLEVBQUUsY0FBYztDQUN2QixDQUFDLENBQUE7QUFFRixNQUFNLE1BQU0sR0FBRyxZQUFZLEVBQUUsQ0FBQTtBQUM3QixpQ0FBaUM7QUFDakMsb0NBQW9DO0FBQ3BDLG9EQUFvRDtBQUNwRCxHQUFHO0FBRUgsZUFBZSxNQUFNLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSBcInZ1ZS1yb3V0ZXJcIjtcblxuVnVlLnVzZShWdWVSb3V0ZXIpO1xuXG4vL2ltcG9ydCBMYXlvdXQgZnJvbSAnQC9sYXlvdXQnXG5cbmV4cG9ydCBjb25zdCBjb25zdGFudFJvdXRlcyA9IFsgXG4gIHtcbiAgICBwYXRoOiAnLycsXG4gICAgcmVkaXJlY3Q6ICcvdGV4dGJ1c1Rlc3QnLFxuXG4gIH0sXG4gIHtcbiAgICBwYXRoOicvdGV4dGJ1c1Rlc3QnLFxuICAgIG5hbWU6J3RleHRidXNUZXN0JyxcbiAgICBjb21wb25lbnQ6ICgpID0+IGltcG9ydCgnQC92aWV3cy9JbmRleC52dWUnKSxcbiAgICAvL3JlZGlyZWN0OicvdGFnTWFuYWdlci92aWRlbycsXG4gICAgbWV0YTogeyB0aXRsZTogJ+agh+etvueuoeeQhicsIGljb246ICdmaWd1cmUnIH0sXG4gICAgLy9xdWVyeTp7ZmlsZVBhdGg6fVxuICB9LFxuXVxuXG5cbmNvbnN0IGNyZWF0ZVJvdXRlciA9ICgpID0+IG5ldyBWdWVSb3V0ZXIoe1xuICAvLyBtb2RlOiAnaGlzdG9yeScsIC8vIHJlcXVpcmUgc2VydmljZSBzdXBwb3J0XG4gIHNjcm9sbEJlaGF2aW9yOiAoKSA9PiAoeyB4OjAseTogMCB9KSxcbiAgcm91dGVzOiBjb25zdGFudFJvdXRlc1xufSlcblxuY29uc3Qgcm91dGVyID0gY3JlYXRlUm91dGVyKCkgXG4vL2V4cG9ydCBmdW5jdGlvbiByZXNldFJvdXRlcigpIHtcbi8vICBjb25zdCBuZXdSb3V0ZXIgPSBjcmVhdGVSb3V0ZXIoKVxuLy8gIHJvdXRlci5tYXRjaGVyPW5ld1JvdXRlci5tYXRjaGVyIC8vIHJlc2V0IHJvdXRlclxuLy99XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlciJdfQ==