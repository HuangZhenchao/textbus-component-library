import {
    ComponentInstance,
    ComponentMethods,
    ContentType,
    defineComponent, Slot, SlotRender,
    Translator,
    useContext, useSlots, useState, VElement,Selection, ComponentOptions
} from "@textbus/core";
import {ComponentLoader, SlotParser} from "@textbus/browser";
import {Injector} from "@tanbo/di";
import * as Katex from 'katex';
import 'katex/dist/katex.min.css'
import { Form, FormSelect, FormSwitch, FormTextarea } from "@textbus/editor";
import { UIControlPanel } from "../control-panel.plugin";
export interface katexState{
    source:string,
    //block:boolean
}
export interface katexMethods{
    render(isOutputMode: boolean, slotRender: SlotRender):VElement,
    toJSON():any,
    createControlView():void
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
const SetComponentOptions=function(block:boolean):ComponentOptions<katexMethods,katexState,katexState>{
    const katexComponentOptions:ComponentOptions<katexMethods,katexState,katexState>={
        name: block?"katexBlockComponent":"katexInlineComponent",
        type: block?ContentType.BlockComponent:ContentType.InlineComponent,
        transform(translator: Translator, state: katexState): katexState {
            return state;
        },
        setup(state: katexState): katexMethods {
            const injector = useContext();
            const controlPanel=injector.get(UIControlPanel)
            const translator=injector.get(Translator);
            const selection = injector.get(Selection)
            const changeController=useState(state);
            //useState({fill:false,type:'info',slot:slots.toJSON()})
            changeController.onChange.subscribe(newState=>{
                state=newState;
                console.log('changeController',state)
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
                            source: encodeURIComponent(state.source),
                            onClick:(e:Event)=>{
                                let view=this.createControlView()
                                controlPanel.showPanels([view])
                                e.stopPropagation();                                
                            }
                        },
                        dom ? [domToVDom(dom)] : []
                    );
                    console.log(state,el)
                    return el;
    
                },
    
                toJSON(){
                    return state
                },
                createControlView(){
                    console.log('create',state)
                    const form = new Form({
                      mini: true,
                      confirmBtnText: '确定',
                      cancelBtnText:'关闭',
                      items: [
                        new FormTextarea({
                            name: 'source',
                            placeholder: "输入LaTeX语法",
                            label: '',
                            value: state.source
                        }),
                      ]
                    });
                    form.onComplete.subscribe(map => {
                      changeController.update(draft=>{
                        draft.source=map.get('source');
                        //draft.block=map.get('block');
                      })
                      controlPanel.showPanels([])
                      //console.log('component',alertState,instance.methods.toJSON())
                    });
                    return {
                      title: 'Katex',
                      view: form.elementRef
                    };
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
            return katexBlockComponent.createInstance(context,state);
        }else{
            return katexInlineComponent.createInstance(context,state);
        }
        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        
    },
    
    resources: {
        links:[{
            rel: 'stylesheet',
            //type:'text/css',
            href: '//cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css',
            //href:'./katex.min.css',
            //integrity: 'sha384-t5CR+zwDAROtph0PXGte6ia8heboACF9R5l/DiY+WZ3P2lxNgvJkQk5n7GPvLMYw',
            crossOrigin: 'anonymous'
        }],
        styles: [
            `.tb-katex-block{display: block}
            .tb-katex-inline{display: inline-block}
             .tb-katex-block,.tb-katex-inline{margin-left: 0.5em; margin-right: 0.5em}`
        ]
    },
}