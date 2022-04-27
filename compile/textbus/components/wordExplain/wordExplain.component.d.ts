import { ComponentData, ComponentInstance, ComponentMethods, Slot } from "@textbus/core";
import { ComponentLoader } from "@textbus/browser";
export declare class WordExplainTitleSlot extends Slot {
    constructor();
}
export declare class WordExplainSubtitleSlot extends Slot {
    constructor();
}
export declare class WordExplainDetailSlot extends Slot {
    constructor();
}
export interface wordExplainState {
    width: string;
}
/**
 * titleSlot:WordExplainTitleSlot,
    subtitleSlot:WordExplainSubtitleSlot,
    detailSlot:WordExplainDetailSlot,
 */
export declare const wordExplainComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, wordExplainState>, ComponentData<wordExplainState>>;
export declare const wordExplainComponentLoader: ComponentLoader;
