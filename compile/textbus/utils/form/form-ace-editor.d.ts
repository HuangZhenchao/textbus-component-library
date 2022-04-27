import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/mode-javascript";
export interface FormAceEditorParams {
    label: string;
    name: string;
    placeholder?: string;
    value?: string;
    validateFn?(value: any): string;
}
export declare class FormAceEditor {
    name: any;
    elementRef: any;
    input: any;
    feedbackEle: any;
    config: any;
    sub: any;
    btn: any;
    editor: any;
    constructor(config: FormAceEditorParams);
    reset(): void;
    update(value: any): void;
    getAttr(): {
        name: any;
        value: any;
    };
    validate(): boolean;
    uploaded(): void;
}
