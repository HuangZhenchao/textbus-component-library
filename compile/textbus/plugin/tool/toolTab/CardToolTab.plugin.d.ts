import { Tool } from "@textbus/editor";
import { ToolTabPanel } from "./type";
export declare class CardToolTab {
    elementRef: HTMLElement;
    private injector;
    onCancel: any;
    checkEvent: any;
    onComplete: any;
    tools: Tool[];
    keymapPrompt: HTMLElement;
    constructor(injector: any, tooTabPanels: ToolTabPanel[]);
    findNeedShowKeymapHandler(el: any): any;
    update(): void;
    reset(): void;
}
