import { createElement, createTextNode } from '@textbus/browser';
import { Keymap } from '@textbus/core';
export interface UICardConfig{
    label?:string;
    tooltip?:string;
    card?:HTMLElement|string
    onclick():void;
    keymap?: Keymap;
}
export interface UICard{
    elementRef: HTMLElement;
    disabled: boolean;
    highlight: boolean;
}

export function createCard(config:UICardConfig):UICard{
    const exampleContent = document.createElement('div');
    exampleContent.classList.add('textbus-component-example-content');
    if (typeof config.card === 'string') {
        exampleContent.innerHTML = config.card;
    }
    else if (config.card instanceof HTMLElement) {
        exampleContent.appendChild(config.card);
    }
    /*
    const exampleLabel = document.createElement('div');
    exampleContent.classList.add('textbus-component-example-label');
    if (typeof content === 'string') {
        exampleContent.innerHTML = content;
    }
    else if (content instanceof HTMLElement) {
        exampleContent.appendChild(content);
    }
    */
    const wrapper =createElement('button',{
        styles:{
            "background-color":"#fff",
            "border":"none"
        },
        classes:["textbus-component-example-item"],
        attrs: {
            title: config.tooltip || '',
            type: 'button',
            'data-keymap': JSON.stringify(config.keymap)
        },
        children:[
            createElement('div',{
                classes:["textbus-component-example"],
                children:[
                    exampleContent,
                    createElement('div',{
                        classes:["textbus-component-example-mask"]
                    }) 
                ]
            }),
            createElement('div',{
                classes:["textbus-component-example-name"],
                children:[createTextNode(config.label!==undefined?config.label:(config.tooltip==undefined?"组件":config.tooltip))]
            })
        ]
    }) as HTMLButtonElement;

    let highlight = false;
    let disabled = false;
    return {
        elementRef:wrapper,
        get highlight() {
            return highlight;
        },
        set highlight(v) {
            highlight = v;
            if (v) {
                wrapper.classList.add('textbus-toolbar-button-active');
            }
            else {
                wrapper.classList.remove('textbus-toolbar-button-active');
            }
        },
        get disabled() {
            return disabled;
        },
        set disabled(v) {
            disabled = v;
            wrapper.disabled = v;
        }
    }
}