import { Layout } from '@textbus/editor';
import { Plugin } from "@textbus/browser";
import { Injector, RootComponentRef } from "@textbus/core";
import { PageConfigState } from "../../components/_config/config.component";
export declare class PageConfigPlugin implements Plugin {
    subs: any[];
    private renderer;
    doc: HTMLElement;
    lastState: PageConfigState;
    rootComponentRef: RootComponentRef;
    layout: Layout;
    scroller: HTMLElement;
    constructor();
    setup(injector: Injector): void;
}
