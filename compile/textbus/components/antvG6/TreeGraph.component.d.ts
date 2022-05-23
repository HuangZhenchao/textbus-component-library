import { ComponentInstance, ComponentMethods, ComponentData } from "@textbus/core";
import { ComponentLoader } from "@textbus/browser";
import "./TreeGraph/registerNode";
import { componentStyle } from "../type";
export interface TreeGraphState {
    style: componentStyle;
    code: string;
    data: string;
}
export declare const TreeGraphComponent: import("@textbus/core").Component<ComponentInstance<ComponentMethods, TreeGraphState>, ComponentData<TreeGraphState, unknown>>;
export declare const TreeGraphComponentLoader: ComponentLoader;
