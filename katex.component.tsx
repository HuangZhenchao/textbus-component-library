import {
    ComponentInstance,
    ComponentMethods,
    ContentType,
    defineComponent, Slot, SlotRender,
    Translator,
    useContext, useSlots, useState, VElement
} from "@textbus/core";
import {ComponentLoader, SlotParser} from "@textbus/browser";
import {Injector} from "@tanbo/di";
import {SlotLiteral} from "@textbus/core";
import * as Katex from 'katex';
import 'katex/dist/katex.min.css'
export interface katexState{
    source:string,
    block:string
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
    type: ContentType.InlineComponent,
    transform(translator: Translator, state: katexState): katexState {
        return state;
    },
    setup(state: katexState): ComponentMethods {
        const injector = useContext();
        const translator=injector.get(Translator);

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
                        displayMode: true,
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
                    htmlString = `<span style="color: red">${e.stack.split('\n').join('<br>')}</span>`;
                }
                const dom = new DOMParser().parseFromString(htmlString, 'text/html').body.children[0];
                return new VElement('div', {                    
                        class:'tb-katex',
                        style:'display:'+state.block,
                        source: encodeURIComponent(state.source)
                    },
                     dom ? [domToVDom(dom)] : []
                );

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
            block:element.style.display
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
        }],//.tb-katex, .katex-display, .katex, .katex-html{display: inline-block}
        styles: [
            `.tb-katex{display: inline-block}
             .tb-katex{margin-left: 0.5em; margin-right: 0.5em}`
        ]
    },
}