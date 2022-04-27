/// <reference types="@/shims-vue" />
import VueRouter from "vue-router";
export declare const constantRoutes: ({
    path: string;
    redirect: string;
    name?: undefined;
    component?: undefined;
    meta?: undefined;
} | {
    path: string;
    name: string;
    component: () => Promise<typeof import("*.vue")>;
    meta: {
        title: string;
        icon: string;
    };
    redirect?: undefined;
})[];
declare const router: VueRouter;
export default router;
