import { auditTime, sampleTime } from "@tanbo/stream";
import { Editor, Toolbar } from "@textbus/editor";
import { defaultOptions,defaultToolFactories } from "./defaultOptions";
import { concatHTML } from "./utils/output";
import { SetUploader } from "./utils/uploader";

export interface OutputSetting{
    cbSaveJSON?: Function;
    cbSaveHTML?: Function;    
    saveInterval?:number;
    bConcatHtml?: Boolean;
    styleLink?:string;
}

export interface TextbusConfig{
    uploadFilePromise?: Function;
    componentLoaders?: [];
    formatLoaders?: [];
    toolFactories?: [];
    host?: string | HTMLElement;
    outputSetting:OutputSetting
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
        this.editor.onChange.pipe(auditTime(selfConfig.outputSetting.saveInterval||0)).subscribe(() => {
            this.onSave();
        })
    }
    replaceContent(content){
        this.editor.replaceContent(content);
    }
    onSave(){
        let outputSetting=this.selfConfig.outputSetting
        if(outputSetting.cbSaveJSON){
            outputSetting.cbSaveJSON(JSON.stringify(this.editor.getJSON().content,null,"  "))
        }
        if(outputSetting.cbSaveHTML!=undefined){
            let content=this.editor.getContents()
            outputSetting.cbSaveHTML(outputSetting.bConcatHtml?concatHTML(content,outputSetting.styleLink):content.content)
        }
    }
}