import { UICard } from "./card";
export declare class ButtonCardTool {
    elementRef: HTMLElement;
    factory: any;
    cardConfig: any;
    config: any;
    viewer: UICard;
    constructor(factory: any, cardConfig: any);
    setup(injector: any): HTMLElement;
    disabled(is: any): void;
    refreshState(): void;
}
export declare class DialogCardTool {
    elementRef: HTMLElement;
    factory: any;
    cardConfig: any;
    config: any;
    viewer: UICard;
    constructor(factory: any, cardConfig: any);
    setup(injector: any): HTMLElement;
    disabled(is: any): void;
    refreshState(): void;
}
export declare function createButtonCard(injector: any, config: any): {
    elementRef: HTMLElement;
    disabled(is: any): void;
    refreshState(): void;
};
export declare function createDialogCard(injector: any, config: any): {
    elementRef: HTMLElement;
    disabled(is: any): void;
    refreshState(): void;
};
