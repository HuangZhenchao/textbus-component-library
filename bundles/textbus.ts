import { auditTime, sampleTime } from "@tanbo/stream";
import { Editor, Toolbar } from "@textbus/editor";
import { defaultOptions,defaultToolFactories } from "./defaultOptions";
import { concatHTML } from "./utils/output";
import { SetUploader } from "./utils/uploader";

export interface TextbusConfig{
    uploadFilePromise?: Function;
    componentLoaders?: [];
    formatLoaders?: [];
    toolFactories?: [];
    host?: string | HTMLElement;
    cbSaveJSON?: Function;
    cbSaveHTML?: Function;
    bConcatHtml?: Boolean;
    saveInterval?:number;
}
export class TextbusApp{
    editor:Editor
    selector:string | HTMLElement
    selfConfig: TextbusConfig;
    constructor(selector,selfConfig:TextbusConfig){
        this.selector=selector;
        this.selfConfig=selfConfig;
        selfConfig.componentLoaders?defaultOptions.componentLoaders=selfConfig.componentLoaders:'';
        selfConfig.formatLoaders?defaultOptions.formatLoaders=selfConfig.formatLoaders:'';
        console.log(selfConfig.host,selfConfig.toolFactories)
        selfConfig.toolFactories?
            defaultOptions.plugins![0]=new Toolbar(selfConfig.toolFactories,selfConfig.host)
            :defaultOptions.plugins![0]=new Toolbar(defaultToolFactories,selfConfig.host);

        selfConfig.uploadFilePromise?defaultOptions.uploader=SetUploader(selfConfig.uploadFilePromise):'';
        
        this.editor = new Editor(selector,defaultOptions);
        this.editor.onChange.pipe(auditTime(5000)).subscribe(() => {
            this.onSave();
        })
    }
    replaceContent(content){
        this.editor.replaceContent(content);
    }
    onSave(){
        console.log("onSave")
        if(this.selfConfig.cbSaveJSON){
            this.selfConfig.cbSaveJSON(this.editor.getJSON().content)
        }
        if(this.selfConfig.cbSaveHTML!=undefined){
            let content=this.editor.getContents()
            this.selfConfig.cbSaveHTML(this.selfConfig.bConcatHtml?concatHTML(content):content)
        }
    }
}