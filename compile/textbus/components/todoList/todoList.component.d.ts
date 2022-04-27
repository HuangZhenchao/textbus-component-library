import { ComponentInstance, ComponentMethods, ComponentData } from "@textbus/core";
import { ComponentLoader } from "@textbus/browser";
export interface todoListState {
    active: boolean;
    disabled: boolean;
}
export declare const todoListComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, todoListState>, ComponentData<todoListState>>;
export declare const todoListComponentLoader: ComponentLoader;
