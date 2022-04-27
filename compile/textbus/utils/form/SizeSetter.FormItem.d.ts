export declare class SizeSetter {
    elementRef: HTMLElement;
    inputs: HTMLInputElement[];
    name: any;
    constructor(name: any, i18n: any);
    reset(): void;
    update(value: any): void;
    getAttr(): {
        name: any;
        value: {
            width: string;
            height: string;
        };
    };
    validate(): boolean;
}
