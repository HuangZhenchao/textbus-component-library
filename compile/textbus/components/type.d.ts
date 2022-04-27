import { Slot } from "@textbus/core";
import { Injector } from "@tanbo/di";
export interface ComponentCreator {
    example: string | HTMLElement;
    name: string;
    category?: string;
    create(injector: Injector): void;
}
export declare class SlotComplete extends Slot {
    constructor();
}
export interface componentStyle {
    width?: string;
    height?: string;
    margin?: string;
    float?: string;
}
