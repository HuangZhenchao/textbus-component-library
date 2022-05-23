import { ComponentLoader } from "@textbus/browser";
import { ComponentMethods, ComponentData, ComponentInstance } from "@textbus/core";
export interface PageConfigState {
    pageID: string;
    scrollTop: number;
}
export declare const pageConfigComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, PageConfigState>, ComponentData<PageConfigState, unknown>>;
export declare const pageConfigComponentLoader: ComponentLoader;
