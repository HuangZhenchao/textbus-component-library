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
        //query:{filePath:}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUM7QUFDdEIsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBRW5DLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFbkIsK0JBQStCO0FBRS9CLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRztJQUM1QjtRQUNFLElBQUksRUFBRSxHQUFHO1FBQ1QsUUFBUSxFQUFFLGNBQWM7S0FFekI7SUFDRDtRQUNFLElBQUksRUFBQyxjQUFjO1FBQ25CLElBQUksRUFBQyxhQUFhO1FBQ2xCLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUM7UUFDNUMsK0JBQStCO1FBQy9CLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtRQUN2QyxtQkFBbUI7S0FDcEI7Q0FDRixDQUFBO0FBR0QsTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxTQUFTLENBQUM7SUFDdkMsOENBQThDO0lBQzlDLGNBQWMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDcEMsTUFBTSxFQUFFLGNBQWM7Q0FDdkIsQ0FBQyxDQUFBO0FBRUYsTUFBTSxNQUFNLEdBQUcsWUFBWSxFQUFFLENBQUE7QUFDN0IsaUNBQWlDO0FBQ2pDLG9DQUFvQztBQUNwQyxvREFBb0Q7QUFDcEQsR0FBRztBQUVILGVBQWUsTUFBTSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgVnVlUm91dGVyIGZyb20gXCJ2dWUtcm91dGVyXCI7XG5cblZ1ZS51c2UoVnVlUm91dGVyKTtcblxuLy9pbXBvcnQgTGF5b3V0IGZyb20gJ0AvbGF5b3V0J1xuXG5leHBvcnQgY29uc3QgY29uc3RhbnRSb3V0ZXMgPSBbIFxuICB7XG4gICAgcGF0aDogJy8nLFxuICAgIHJlZGlyZWN0OiAnL3RleHRidXNUZXN0JyxcblxuICB9LFxuICB7XG4gICAgcGF0aDonL3RleHRidXNUZXN0JyxcbiAgICBuYW1lOid0ZXh0YnVzVGVzdCcsXG4gICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoJ0Avdmlld3MvSW5kZXgudnVlJyksXG4gICAgLy9yZWRpcmVjdDonL3RhZ01hbmFnZXIvdmlkZW8nLFxuICAgIG1ldGE6IHsgdGl0bGU6ICfmoIfnrb7nrqHnkIYnLCBpY29uOiAnZmlndXJlJyB9LFxuICAgIC8vcXVlcnk6e2ZpbGVQYXRoOn1cbiAgfSxcbl1cblxuXG5jb25zdCBjcmVhdGVSb3V0ZXIgPSAoKSA9PiBuZXcgVnVlUm91dGVyKHtcbiAgLy8gbW9kZTogJ2hpc3RvcnknLCAvLyByZXF1aXJlIHNlcnZpY2Ugc3VwcG9ydFxuICBzY3JvbGxCZWhhdmlvcjogKCkgPT4gKHsgeDowLHk6IDAgfSksXG4gIHJvdXRlczogY29uc3RhbnRSb3V0ZXNcbn0pXG5cbmNvbnN0IHJvdXRlciA9IGNyZWF0ZVJvdXRlcigpIFxuLy9leHBvcnQgZnVuY3Rpb24gcmVzZXRSb3V0ZXIoKSB7XG4vLyAgY29uc3QgbmV3Um91dGVyID0gY3JlYXRlUm91dGVyKClcbi8vICByb3V0ZXIubWF0Y2hlcj1uZXdSb3V0ZXIubWF0Y2hlciAvLyByZXNldCByb3V0ZXJcbi8vfVxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXIiXX0=