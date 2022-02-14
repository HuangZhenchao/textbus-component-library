import {
    ComponentInstance,
    ComponentMethods,
    ContentType,
    defineComponent, Slot, SlotRender,
    Translator,
    useContext, useSlots, useState, VElement,Selection
} from "@textbus/core";
import {ComponentLoader, SlotParser} from "@textbus/browser";
import {Injector} from "@tanbo/di";
import * as Katex from 'katex';
import 'katex/dist/katex.min.css'
import { Form, FormSelect, FormSwitch, FormTextarea } from "@textbus/editor";
import { UIControlPanel } from "../control-panel.plugin";
export interface katexState{
    source:string,
    block:boolean
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
export const katexComponent=defineComponent<ComponentMethods,katexState,katexState>({
    name: "katexComponent",
    type: ContentType.BlockComponent,
    transform(translator: Translator, state: katexState): katexState {
        return state;
    },
    setup(state: katexState): ComponentMethods {
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
                let view;
                const create=(state)=> {
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
                        /*
                        new FormSelect({
                          name: 'type',
                          label: '类型',
                          options: 'default,primary,info,success,warning,danger,dark,gray'.split(',').map(i => {
                            return {
                              label: i,
                              value: i,
                              selected: i === state.methods.toJSON().type
                            };
                          })
                        }),
                        */
                        new FormSwitch({
                          label: '是否Block',
                          name: 'block',
                          checked: state.block
                        })
                      ]
                    });
                    form.onComplete.subscribe(map => {
                      changeController.update(draft=>{
                        draft.source=map.get('source');
                        draft.block=map.get('block');
                      })
                      controlPanel.showPanels([])
                      //console.log('component',alertState,instance.methods.toJSON())
                    });
                    return {
                      title: 'Katex',
                      view: form.elementRef
                    };
                  }
                let htmlString;
                try {
                    htmlString = Katex.renderToString(state.source, {
                        displayMode: state.block,
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
                        class:'tb-katex',
                        style:{display:state.block?'block':'inline-block'},
                        source: encodeURIComponent(state.source),
                        onClick:(e:Event)=>{
                            const selection=injector.get(Selection)    
                            //selection.toNextLine() 
                             
                            console.log('点击',selection); 
                            view=create(state)
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
            }

        }
    }

})
export const katexComponentLoader:ComponentLoader={
    component: katexComponent,

    match(element: HTMLElement) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-katex'
    },
    read(element: HTMLElement, context: Injector, slotParser: SlotParser) :ComponentInstance{
        const state:katexState={
            source:element.getAttribute('source')||'',
            block:element.style.display==='block'
        }

        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        return katexComponent.createInstance(context,state);
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
            `.tb-katex{display: inline-block}
             .tb-katex{margin-left: 0.5em; margin-right: 0.5em}`
        ]
    },
}
