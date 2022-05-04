import { createElement, createTextNode } from "@textbus/browser";
import { ButtonTool, Tool, ToolType } from "@textbus/editor";
import { auditTime, fromEvent, merge, Observable, Subject } from "@tanbo/stream";
import { alertExample, Tab } from "../../../_public-api";
import { ToolTabPanel, ToolTabItem } from "./type";
import {ButtonCardTool, DialogCardTool } from "./card-tool";
import { ButtonToolConfig, DialogToolConfig } from "@textbus/editor";
import { Renderer,Selection} from "@textbus/core";
import {createKeymap} from "@textbus/editor/bundles/toolbar/toolkit/_utils/_create-keymap"
export class CardToolTab{
    elementRef: HTMLElement;
    private injector: any;
    onCancel: any;
    checkEvent: any;
    onComplete: any;
    tools:Tool[]=[];
    keymapPrompt: HTMLElement;
    constructor(injector,tooTabPanels:ToolTabPanel[]) {
        this.injector=injector;
        const selection = injector.get(Selection);
        const renderer = injector.get(Renderer);
        this.onCancel = new Observable();
        this.checkEvent = new Subject();
        this.onComplete = this.checkEvent.asObservable();
        this.elementRef = createElement('div', {
            classes: ['textbus-component-stage'],
            children: [
                this.keymapPrompt = createElement('div', {
                    classes: ['textbus-toolbar-keymap-prompt']
                })
            ]
        });
        const tab = new Tab({});
        
        tab.show(tooTabPanels.map(panel => {
            console.log(panel)
            const view = createElement('div', {
                classes: ['textbus-component-stage-list']
            });
            panel.items.forEach(item => {
                //var config=Object.assign(item.config)
                var tool;
                console.log("panel.items",item,alertExample)
                switch(item.config.type){
                    case ToolType.Button:
                        tool= new ButtonCardTool(item.toolFactory,item.config);
                        break;
                    case ToolType.Dialog:
                        tool= new DialogCardTool(item.toolFactory,item.config);
                        break;
                    default:
                        tool= new ButtonTool(item.toolFactory as (injector)=>ButtonToolConfig);
                        break;
                }
                this.tools.push(tool);
                view.appendChild(tool.setup(injector))
            });
            return {
                label: panel.category,
                view
            };
        }));
        this.elementRef.appendChild(tab.elementRef);

        merge(selection.onChange, renderer.onViewChecked).pipe(auditTime(100)).subscribe(() => {
            this.tools.forEach(tool => {
                tool.refreshState();
            });
        });
        fromEvent(this.elementRef, 'mouseover').subscribe(ev => {
            const keymap = this.findNeedShowKeymapHandler(ev.target);
            if (keymap) {
                try {
                    const config = JSON.parse(keymap);
                    this.keymapPrompt.innerHTML = '';
                    this.keymapPrompt.append(...createKeymap(config));
                    this.keymapPrompt.classList.add('textbus-toolbar-keymap-prompt-show');
                    return;
                }
                catch (e) {
                    //
                }
            }
            this.keymapPrompt.classList.remove('textbus-toolbar-keymap-prompt-show');
        });
    }
    findNeedShowKeymapHandler(el) {
        if (el === this.elementRef) {
            return '';
        }
        if (el.dataset.keymap) {
            return el.dataset.keymap;
        }
        return this.findNeedShowKeymapHandler(el.parentNode);
    }
    update() {
        //
    }
    reset() {
        //
    }
}