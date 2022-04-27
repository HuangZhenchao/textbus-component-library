import { createElement, createTextNode } from "@textbus/browser";
import { Injector } from "@textbus/core";
import { FormItem, ViewController } from "@textbus/editor";
import { Subject, Observable } from "@tanbo/stream";
import { Tab } from "../tab";
export interface TabViewConfig{
    name:string;
    title:string;
    items:FormItem[]
}
export class TabForm{
    name:string;
    title:string;
    elementRef:HTMLElement;
    items:FormItem[];
    
    constructor(config:TabViewConfig){
        this.name=config.name;
        this.title=config.title;
        this.items=config.items;
        this.elementRef=createElement("div",
            {
                children:this.items.map(item=>{
                    return item.elementRef
                })
            }
        )
    }
    getValue(){
        const values={}
        this.items.forEach(item=>{
            let attr=item.getAttr()
            values[attr.name]=attr.value
              
        })
        return values
    };
}

export interface TabViewControlConfig{
    title:string;
    confirmBtnText?:string;
    cancelBtnText?:string;
    tabForms:TabForm[];
}
export class TabViewControl implements ViewController<Record<string, any>>{
    elementRef: HTMLElement;
    body: HTMLElement;
    footer: HTMLElement;
    tab: Tab;
    btnSubmit: HTMLElement;
    btnCancel: HTMLElement;
    private completeEvent: Subject<any>;
    private cancelEvent: Subject<void>;
    onComplete: Observable<Record<string, any>>;
    onCancel: Observable<void>;
    config: TabViewControlConfig;
  
    constructor(injector: Injector, config:TabViewControlConfig) {
        this.config=config;
        this.completeEvent = new Subject();
        this.cancelEvent = new Subject();
        this.onComplete = this.completeEvent.asObservable();
        this.onCancel = this.cancelEvent.asObservable();
        this.tab = new Tab({width:"500px",height:"560px"});
    
        this.elementRef = createElement('div');
        this.elementRef.appendChild(createElement('h3', {
            classes: ['textbus-form-title'],
            children: [createTextNode(config.title)]
        }));
        this.body = createElement('div');
        this.body.append(this.tab.elementRef);
        this.elementRef.appendChild(this.body);
        this.tab.show(
            this.config.tabForms.map(view=>{
                return {
                    label:view.title,
                    view:view.elementRef
                }
            })
        )
        this.btnSubmit = createElement('button', {
            attrs: {
            type: 'submit'
            },
            classes: ['textbus-btn', 'textbus-btn-primary'],
            children: [createTextNode(config.confirmBtnText || '确定')]
        }),
        this.btnSubmit.addEventListener('click', () => {
            const values={}
            config.tabForms.forEach(view=>{
                values[view.name]=view.getValue()
            })
            if (values == null) {
                //return;
            }
            this.completeEvent.next(values);
        })
        this.btnCancel = createElement('button', {
            classes: ['textbus-btn', 'textbus-btn-default'],
            attrs: {
            type: 'button'
            },
            children: [createTextNode(config.cancelBtnText || '取消')]
        });
        this.btnCancel.addEventListener('click', () => {
            this.cancelEvent.next();
        });
        this.elementRef.appendChild(this.footer = createElement('div', {
            classes: ['textbus-form-footer'],
            children: [this.btnSubmit, this.btnCancel]
        }));
    }
    reset(): void {
        
    }
    update(newValue: Record<string, any>): void {
  
    }
  
  }