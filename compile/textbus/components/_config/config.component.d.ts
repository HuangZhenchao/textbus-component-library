import { ComponentLoader } from "@textbus/browser";
import { ComponentMethods, ComponentData, ComponentInstance } from "@textbus/core";
export interface ConfigState {
    pageID: string;
    scrollTop: number;
}
export declare const pageConfigComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, ConfigState>, ComponentData<ConfigState>>;
export declare const pageConfigComponentLoader: ComponentLoader;
