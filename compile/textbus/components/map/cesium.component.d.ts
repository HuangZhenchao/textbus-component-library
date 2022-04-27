import { ComponentInstance, ComponentMethods, ComponentData } from "@textbus/core";
import { ComponentLoader } from "@textbus/browser";
import { componentStyle } from "../type";
export interface cesiumState {
    style: componentStyle;
    center: any;
    markers: any;
    zoom: any;
}
export declare const cesiumComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, cesiumState>, ComponentData<cesiumState>>;
export declare const cesiumComponentLoader: ComponentLoader;
