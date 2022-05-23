import { ComponentInstance, ComponentMethods, ComponentData } from '@textbus/core';
import { ComponentLoader } from '@textbus/browser';
export interface detailState {
    text: ['产品介绍', '产品特性', '支持版本', '安装方式'];
}
export declare const detailComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, null>, ComponentData<null, unknown>>;
export declare const detailComponentLoader: ComponentLoader;
