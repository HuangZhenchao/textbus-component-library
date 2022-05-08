import { Plugin } from "@textbus/browser";
import { Injector, RootComponentRef } from "@textbus/core";
export declare class PageConfigPlugin implements Plugin {
    subs: any[];
    private renderer;
    doc: HTMLElement;
    lastPageID: string;
    rootComponentRef: RootComponentRef;
    constructor();
    setup(injector: Injector): void;
}
