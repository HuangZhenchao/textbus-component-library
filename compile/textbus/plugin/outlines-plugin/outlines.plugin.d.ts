import { Plugin } from "@textbus/browser";
export declare class OutlinesPlugin implements Plugin {
    private renderer;
    private rootComponentRef;
    private layout;
    private scroller;
    private container;
    private links;
    private btnWrapper;
    private btn;
    private _expand;
    private readonly boolDefaultExpand;
    private subs;
    leftContainer: HTMLElement;
    constructor();
    setup(injector: any): void;
    set expand(b: boolean);
    get expand(): boolean;
    onUpdateOutlines(): void;
    getHeadingComponents(): never[];
    getTopDistance(el: any): any;
}
