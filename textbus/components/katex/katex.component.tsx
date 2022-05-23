import {
    ComponentInstance,
    ComponentMethods,
    ContentType,
    defineComponent, Slot, SlotRender,
    Translator,
    useContext, useSlots, useState, VElement,Selection, ComponentOptions, ComponentData, onContextMenu
} from "@textbus/core";
import {ComponentLoader, SlotParser} from "@textbus/browser";
import {Injector} from "@tanbo/di";
import * as Katex from 'katex';
import "katex/dist/katex.min.css"
import { Dialog, Form, FormSelect, FormSwitch, FormTextarea } from "@textbus/editor";
import { FormTextareaColumn } from "../../utils/form/form-textarea-column";
export interface katexState{
    source:string,
    //block:boolean
}

function domToVDom(el:Element) {
    const attrs = {};
    el.getAttributeNames().forEach(key => {
        attrs[key] = el.getAttribute(key);
    });
    return VElement.createElement(el.tagName.toLowerCase(), attrs, Array.from(el.childNodes).map(child => {
        if (child.nodeType === Node.ELEMENT_NODE) {
            return domToVDom(child as Element);
        }
        return child.textContent;
    }));
}
const SetComponentOptions=function(block:boolean):ComponentOptions<ComponentMethods,katexState>{
    const katexComponentOptions:ComponentOptions<ComponentMethods,katexState>={
        name: block?"katexBlockComponent":"katexInlineComponent",
        type: block?ContentType.BlockComponent:ContentType.InlineComponent,
        setup(data: ComponentData<katexState> ): ComponentMethods {
            const injector = useContext();
            const dialog=injector.get(Dialog)
            let state=data.state as katexState;
            const changeController=useState(state);
            //useState({fill:false,type:'info',slot:slots.toJSON()})
            changeController.onChange.subscribe(newState=>{
                state=newState;
            })
            const formTextareaItem=new FormTextareaColumn({
                name: 'source',
                placeholder: "输入LaTeX语法",
                label: '',
                value: state.source
            });
            formTextareaItem.input.style.width="500px";
            formTextareaItem.input.style.height="100px";
            const form = new Form({
                confirmBtnText: '确定',
                cancelBtnText:'关闭',
                items: [
                    formTextareaItem
                ]
            });
              
              
            form.onComplete.subscribe(map => {
                changeController.update(draft=>{
                    draft.source=map['source'];
                    //draft.block=map.get('block');
                })
                dialog.hide()
                //console.log('component',alertState,instance.methods.toJSON())
            });
            form.onCancel.subscribe(()=>{
                dialog.hide()
            })
            onContextMenu(()=>{
                return [{
                    label:"公式设置",
                    onClick(){
                        dialog.show(form.elementRef)
                    }
                }]
            })
            return {
                render(isOutputMode:boolean, slotRender:SlotRender){
                    
                    
                    let htmlString;
                    try {
                        htmlString = Katex.renderToString(state.source, {
                            displayMode: block,
                            leqno: false,
                            fleqn: false,
                            throwOnError: true,
                            errorColor: '#cc0000',
                            strict: 'warn',
                            output: 'html',
                            trust: false,
                            //macros: { '\\f': '#1f(#2)' }
                        });
                    }
                    catch (e:any) {
                        console.log(e.stack)//.split('\n').join('<br>')
                        //htmlString = `<span style="color: red">${}</span>`;
                    }
                    const dom = new DOMParser().parseFromString(htmlString, 'text/html').body.children[0];
                    let el=new VElement('div', {                    
                            class:block?'tb-katex-block':'tb-katex-inline',
                            //style:{display:block?'block':'inline-block'},
                            source: encodeURIComponent(state.source)                            
                        },
                        dom ? [domToVDom(dom)] : []
                    );
                    return el;
    
                }
    
            }
        }
    
    }
    return katexComponentOptions;
}

export const katexBlockComponent=defineComponent(SetComponentOptions(true))
export const katexInlineComponent=defineComponent(SetComponentOptions(false))

export const katexInlineComponentLoader:ComponentLoader={
    component: katexInlineComponent,

    match(element: HTMLElement) {
        return element.tagName.toLowerCase() === 'div' && (element.className === 'tb-katex-block'||element.className === 'tb-katex-inline')
    },
    read(element: HTMLElement, context: Injector, slotParser: SlotParser) :ComponentInstance{
        const state:katexState={
            source:element.getAttribute('source')||'',
            //block:element.style.display==='block'
        }
        if(element.className === 'tb-katex-block'){
            return katexBlockComponent.createInstance(context,{state:state});
        }else{
            return katexInlineComponent.createInstance(context,{state:state});
        }
        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        
    },
    
    resources: {
        links:[{
            //rel: 'stylesheet',
            //type:'text/css',
            //href: 'https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css',
            //href:'./katex.min.css',
            //integrity: 'sha384-t5CR+zwDAROtph0PXGte6ia8heboACF9R5l/DiY+WZ3P2lxNgvJkQk5n7GPvLMYw',
            //crossOrigin: 'anonymous'
        }],
        styles: [
            `.tb-katex-block{display: block}
            .tb-katex-inline{display: inline-block}
             .tb-katex-block,.tb-katex-inline{margin-left: 0.5em; margin-right: 0.5em}`
        ]
    },
}
