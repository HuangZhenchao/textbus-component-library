import { fromEvent } from "@tanbo/stream";
import {CoreEditor, createElement, createTextNode, EDITABLE_DOCUMENT, Plugin} from "@textbus/browser";
import {Layout} from '@textbus/editor'
export class OutputPlugin implements Plugin{
    layout: any;
    btnWrapper: any;
    btn: HTMLElement;
    editor: any;
    constructor(){
        this.btnWrapper = createElement('div', {
            classes: ['textbus-outlines-plugin-btn-wrapper'],

            //styles:[`.textbus-outlines-plugin-btn-wrapper {float:left;}`],
            children: [
                this.btn = createElement('button', {
                    classes: ['textbus-status-bar-btn'],
                    attrs: {
                        type: 'button',
                        title: '导出'
                    },
                    children: [
                        createElement('span', {
                            classes: ['textbus-icon-tree']
                        })
                    ]
                })
            ]
        });
    }
    setup(injector){
        this.layout=injector.get(Layout);
        this.layout.bottom.appendChild(this.btnWrapper);
        this.editor=injector.get(CoreEditor);
        const doc = injector.get(EDITABLE_DOCUMENT) as Document;
        fromEvent(this.btn, 'click').subscribe(() => {
            const Contens=this.editor.getContents();
            const options=this.editor.options;
            const html=createElement('html',{})
            const head=createElement('head',{})
            const body=createElement('body',{})
            body.innerHTML=Contens.content;
            html.append(head);html.append(body);
            
            //console.log(doc.documentElement.outerHTML);
            //创建一个输出doc，
            const links:any = [];
            const scripts:any=[];
            const componentStyles = Contens.resourcesList.map(i => i.resources).map(metadata => {
                var _a, _b;
                if (Array.isArray(metadata.links)) {
                    links.push(...metadata.links);
                    
                }
                if (Array.isArray(metadata.scripts)) {
                    
                    scripts.push(...metadata.scripts)
                }
                return [((_a = metadata.styles) === null || _a === void 0 ? void 0 : _a.join('')) || '', ((_b = metadata.editModeStyles) === null || _b === void 0 ? void 0 : _b.join('')) || ''].join('');
            }).join('');
            links.forEach(link => {
                const linkEle = doc.createElement('link');
                Object.assign(linkEle, link);
                head.appendChild(linkEle);
            });
            scripts.forEach(scriptSrc=>{
                const scriptEle = doc.createElement('script');
                scriptEle.src=scriptSrc;
                head.appendChild(scriptEle);
            })
            const docStyles = this.cssMin([componentStyles, ...(options.styleSheets || [])].join(''));
            const styleEl = doc.createElement('style');
            styleEl.innerHTML = this.cssMin([...docStyles, ...(options.editingStyleSheets || [])].join(''));
            head.append(styleEl);
            console.log(this.editor.getJSON().content,JSON.stringify(this.editor.getJSON().content,null,'  '));
        })
    }
    cssMin(str) {
        return str
            .replace(/\s*(?=[>{}:;,[])/g, '')
            .replace(/([>{}:;,])\s*/g, '$1')
            .replace(/;}/g, '}').replace(/\s+/, ' ').trim();
    }
}