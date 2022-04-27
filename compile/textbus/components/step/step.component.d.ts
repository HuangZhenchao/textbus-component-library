import { ComponentData, ComponentInstance, ComponentMethods, Slot } from "@textbus/core";
import { ComponentLoader } from "@textbus/browser";
export declare class StepSlot extends Slot {
    constructor();
}
export interface stepState {
    step: number;
}
export declare const stepComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, stepState>, ComponentData<stepState>>;
export declare const stepComponentLoader: ComponentLoader;
