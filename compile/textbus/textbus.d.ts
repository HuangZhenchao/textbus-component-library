import { Editor } from "@textbus/editor";
export interface OutputSetting {
    cbSaveJSON?: Function;
    cbSaveHTML?: Function;
    saveInterval?: number;
    bConcatHtml?: Boolean;
    styleLink?: string;
}
export interface TextbusConfig {
    uploadFilePromise?: Function;
    componentLoaders?: [];
    formatLoaders?: [];
    toolFactories?: [];
    host?: string | HTMLElement;
    outputSetting: OutputSetting;
}
export declare class TextbusApp {
    editor: Editor;
    selector: string | HTMLElement;
    selfConfig: TextbusConfig;
    constructor(selector: any, selfConfig: TextbusConfig);
    replaceContent(content: any): void;
    onSave(): void;
}
