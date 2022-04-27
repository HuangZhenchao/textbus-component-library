import { ComponentData, ComponentInstance, ComponentMethods } from "@textbus/core";
import { ComponentLoader } from "@textbus/browser";
export interface ProgressState {
    type: string;
    progress: number;
    max: number;
    min: number;
}
export declare const progressComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, ProgressState>, ComponentData<ProgressState>>;
export declare const progressComponentLoader: ComponentLoader;
