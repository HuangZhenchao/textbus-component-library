import { FormItem, FormTextareaParams } from "@textbus/editor";
export declare class FormTextareaColumn implements FormItem {
    name: string;
    elementRef: HTMLElement;
    input: any;
    readonly feedbackEle: any;
    config: any;
    sub?: any;
    readonly btn?: any;
    constructor(config: FormTextareaParams);
    reset(): void;
    update(value: any): void;
    getAttr(): {
        name: any;
        value: any;
    };
    validate(): boolean;
    uploaded(): void;
}
