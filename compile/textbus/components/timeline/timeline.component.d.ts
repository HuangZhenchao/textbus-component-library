import { ComponentData, ComponentInstance, ComponentMethods, Slot } from "@textbus/core";
import { ComponentLoader } from "@textbus/browser";
export interface timelineState {
}
export interface timelineSlotState {
    type: string;
}
export declare class TimelineItemSlot extends Slot {
    constructor(type: any);
}
export declare const timelineComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, timelineState>, ComponentData<timelineState, unknown>>;
export declare const timelineComponentLoader: ComponentLoader;
