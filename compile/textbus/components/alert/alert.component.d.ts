import { ComponentInstance, ComponentData, ComponentMethods } from '@textbus/core';
import { ComponentLoader } from '@textbus/browser';
export interface AlertState {
    fill: boolean;
    type: string;
}
export declare const alertComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, AlertState>, ComponentData<AlertState, unknown>>;
export declare const alertComponentLoader: ComponentLoader;
