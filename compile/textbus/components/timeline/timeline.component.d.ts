import { ComponentData, ComponentInstance, ComponentMethods, Slot } from "@textbus/core";
import { ComponentLoader } from "@textbus/browser";
import { SlotLiteral } from "@textbus/core";
export declare class TimelineItemSlot extends Slot {
    constructor(type: any);
}
export interface timelineSlot {
    itemSlots: TimelineItemSlot[];
}
export interface timelineSlotLiteral {
    itemSlotLiterals: SlotLiteral[];
}
export declare const timelineComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, null>, ComponentData<null>>;
export declare const timelineComponentLoader: ComponentLoader;
