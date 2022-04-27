import { ComponentInstance, ComponentData, ComponentMethods } from '@textbus/core';
import { ComponentLoader } from '@textbus/browser';
import { ComponentCreator } from "../type";
export interface AlertState {
    fill: boolean;
    type: string;
}
export declare const alertComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, AlertState>, ComponentData<AlertState>>;
export declare const alertComponentLoader: ComponentLoader;
export declare const alertComponentCreator: ComponentCreator;
