import { fromEvent } from 'rxjs';
import { sampleTime } from '@tanbo/stream';
import {Editor, Layout} from '@textbus/editor'
import {createElement, createTextNode, Plugin,SelectionBridge} from "@textbus/browser";
import {Injector, Renderer, RootComponentRef, VElement} from "@textbus/core";
export class WordCountSelected implements Plugin{
    private layout: any;
    private container: any;
    renderer!: Renderer;
    eleCountChinese: Text;
    eleCountLetter:Text;
    eleCountNum:Text;
    editor!: Editor;
    eleCountPunctuation: any;
    selectionBridge!: SelectionBridge;
    constructor(){
        this.eleCountChinese=createTextNode("0");
        this.eleCountPunctuation=createTextNode("0");
        this.eleCountLetter=createTextNode("0");
        this.eleCountNum=createTextNode("0");
        this.container = createElement('div', {
            classes: ['textbus-plugin-wordcount'],
            styles:{
                //float:"right"
                "font-size":"12px",
                //height:"30px",
                "text-align":"center",
                display:"flex",
                margin:"0px 10px"
            },
            children: [
                createElement("div",{
                    styles:{
                        padding:"7px 10px"
                    },
                    children:[createTextNode("选择")]
                }),
                createElement("div",{
                    children:[
                        createTextNode("中文-"),
                        this.eleCountChinese,
                        createTextNode(" 标点-"),
                        this.eleCountPunctuation,
                        createElement('br'),
                        createTextNode(" 字母-"),
                        this.eleCountLetter,
                        createTextNode(" 数字-"),
                        this.eleCountNum,
                    ]
                })
                
            ],
        });
    }
    setup(injector: Injector): void {
        this.layout=injector.get(Layout);
        this.editor=injector.get(Editor);
        this.selectionBridge=injector.get(SelectionBridge)
        this.layout.bottom.appendChild(this.container);
        this.renderer=injector.get(Renderer);
        this.selectionBridge.onSelectionChange.subscribe((range) =>{
            var content = this.editor.getContents().content;
            if(!range){
                return;
            }
            content=range.toString();
            var regChinese = /[\u4e00-\u9fa5]/g;
            var regPunctuation = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
            var regLetter = /[a-zA-z]/g;
            var regNum = /\d/g;
            var matchChinese=content.match(regChinese);
            var matchPunctuation=content.match(regPunctuation);
            var matchLetter=content.match(regLetter);
            var matchNum=content.match(regNum);
            
            this.eleCountChinese.textContent=matchChinese?matchChinese.length.toString():"0"
            this.eleCountPunctuation.textContent=matchPunctuation?matchPunctuation.length.toString():"0"
            this.eleCountLetter.textContent=matchLetter?matchLetter.length.toString():"0"
            this.eleCountNum.textContent=matchNum?matchNum.length.toString():"0"
        })
    }
}