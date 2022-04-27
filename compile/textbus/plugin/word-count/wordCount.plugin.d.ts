import { Editor } from '@textbus/editor';
import { Plugin, SelectionBridge } from "@textbus/browser";
import { Injector, Renderer } from "@textbus/core";
export declare class WordCountPlugin implements Plugin {
    private layout;
    private container;
    renderer: Renderer;
    eleCountChinese: Text;
    eleCountLetter: Text;
    eleCountNum: Text;
    editor: Editor;
    eleCountPunctuation: any;
    selectionBridge: SelectionBridge;
    constructor();
    setup(injector: Injector): void;
}
