import { ComponentInstance, ComponentMethods, Slot, ComponentData } from "@textbus/core";
import { ComponentLoader } from "@textbus/browser";
export declare class JumbotronSlot extends Slot {
    constructor();
}
export interface jumbotronState {
    minHeight: string;
    backgroundImage: string;
    backgroundSize: string;
    backgroundPosition: string;
}
export declare const jumbotronComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, jumbotronState>, ComponentData<jumbotronState, unknown>>;
export declare const jumbotronComponentLoader: ComponentLoader;
