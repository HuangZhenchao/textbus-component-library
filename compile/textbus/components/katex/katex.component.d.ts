import { ComponentInstance, ComponentMethods, ComponentData } from "@textbus/core";
import { ComponentLoader } from "@textbus/browser";
export interface katexState {
    source: string;
}
export declare const katexBlockComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, katexState>, ComponentData<katexState>>;
export declare const katexInlineComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, katexState>, ComponentData<katexState>>;
export declare const katexInlineComponentLoader: ComponentLoader;
