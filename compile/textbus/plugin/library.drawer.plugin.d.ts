import { Plugin } from "@textbus/browser";
import { CardToolTab } from "./tool/toolTab/CardToolTab.plugin";
export declare class LibraryDrawerPlugin implements Plugin {
    switchElementRef: HTMLElement;
    switchBtn: HTMLButtonElement;
    subs: any[];
    toolTab: CardToolTab;
    layout: any;
    positionFlag: boolean;
    private _expand;
    constructor(positionFlag?: boolean);
    set expand(b: boolean);
    get expand(): boolean;
    setup(injector: any): void;
}
