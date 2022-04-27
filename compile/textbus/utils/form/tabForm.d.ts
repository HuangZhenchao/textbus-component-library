import { Injector } from "@textbus/core";
import { FormItem, ViewController } from "@textbus/editor";
import { Observable } from "@tanbo/stream";
import { Tab } from "../tab";
export interface TabViewConfig {
    name: string;
    title: string;
    items: FormItem[];
}
export declare class TabForm {
    name: string;
    title: string;
    elementRef: HTMLElement;
    items: FormItem[];
    constructor(config: TabViewConfig);
    getValue(): {};
}
export interface TabViewControlConfig {
    title: string;
    confirmBtnText?: string;
    cancelBtnText?: string;
    tabForms: TabForm[];
}
export declare class TabViewControl implements ViewController<Record<string, any>> {
    elementRef: HTMLElement;
    body: HTMLElement;
    footer: HTMLElement;
    tab: Tab;
    btnSubmit: HTMLElement;
    btnCancel: HTMLElement;
    private completeEvent;
    private cancelEvent;
    onComplete: Observable<Record<string, any>>;
    onCancel: Observable<void>;
    config: TabViewControlConfig;
    constructor(injector: Injector, config: TabViewControlConfig);
    reset(): void;
    update(newValue: Record<string, any>): void;
}
