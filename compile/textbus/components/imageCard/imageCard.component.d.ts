import { ComponentData, ComponentInstance, ComponentMethods } from '@textbus/core';
import { ComponentLoader } from '@textbus/browser';
export interface imageCardState {
    src: string;
    maxWidth?: string | undefined;
    maxHeight?: string | undefined;
    width?: string | undefined;
    height?: string | undefined;
    margin?: string | undefined;
    float?: string | undefined;
}
export declare const imageCardComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, imageCardState>, ComponentData<imageCardState, unknown>>;
export declare const imageCardComponentLoader: ComponentLoader;
export declare class imageCardComponentSetter {
}
