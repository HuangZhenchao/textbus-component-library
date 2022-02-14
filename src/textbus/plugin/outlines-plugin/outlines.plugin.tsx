import { fromEvent } from 'rxjs';
import { sampleTime } from 'rxjs/operators';//renderer.js里的导入Subject来源应该改为rxjs
import {Layout} from '@textbus/editor'
import {createElement, createTextNode, Plugin,SCROLL_CONTAINER} from "@textbus/browser";
import {Renderer, RootComponentRef, VElement} from "@textbus/core";

import './outlines.css'
import {LayoutPlugin} from "@/textbus/plugin/layout.plugin";
export class OutlinesPlugin implements Plugin{
    private renderer: any;
    private rootComponentRef: any;

    private layout: any;
    private scroller: any;

    private container: any;
    private links: any;
    private btnWrapper: any;
    private btn: any;

    private _expand: boolean=false;
    private readonly boolDefaultExpand: boolean=false;

    private subs: any;
    private layoutPlugin: any;

    constructor(){
        this.subs = [];
        this.container = createElement('div', {
            classes: ['textbus-outlines-plugin'],
            children: [
                createElement('h3', {
                    classes: ['textbus-outlines-plugin-title'],
                    children: [
                        createTextNode("目录")
                    ]
                }),
                this.links = createElement('div', {
                    classes: ['textbus-outlines-plugin-links']
                })
            ],

        });
        this.btnWrapper = createElement('div', {
            classes: ['textbus-outlines-plugin-btn-wrapper'],

            //styles:[`.textbus-outlines-plugin-btn-wrapper {float:left;}`],
            children: [
                this.btn = createElement('button', {
                    classes: ['textbus-status-bar-btn'],
                    attrs: {
                        type: 'button',
                        title: '目录'
                    },
                    children: [
                        createElement('span', {
                            classes: ['textbus-icon-tree']
                        })
                    ]
                })
            ]
        });

        //this.btnWrapper.style.float='right';
    }
    setup(injector){

        this.layout=injector.get(Layout);
        this.layoutPlugin=injector.get(LayoutPlugin);
        this.renderer=injector.get(Renderer);
        this.scroller=injector.get(SCROLL_CONTAINER)
        this.rootComponentRef = injector.get(RootComponentRef);

        //this.editor.host.prepend(this.container);

        //this.container.style.width=this.layout.container.clientWidth*0.3+'px';
        //this.container.style.height=this.layout.container.clientHeight+'px'

        this.layoutPlugin.leftContainer.appendChild(this.container);


        this.layout.bottom.appendChild(this.btnWrapper);

        this.expand=this.boolDefaultExpand;
        this.onUpdateOutlines();

        this.subs.push(
            fromEvent(this.btn, 'click').subscribe(() => {
                this.expand = !this.expand;
            }),
            this.renderer.onViewChecked.pipe(sampleTime(1000)).subscribe(() => this.onUpdateOutlines()),
        );
    }
    set expand(b) {
        this._expand = b;
        if (b) {
            this.btn.classList.add('textbus-status-bar-btn-active');
            this.container.style.display = 'block';
            this.container.style.width = this.layout.workbench.offsetWidth * 0.2 + 'px';
        }
        else {
            this.btn.classList.remove('textbus-status-bar-btn-active');
            this.container.style.display = 'none';
        }
    }
    get expand() {
        return this._expand;
    }
    onUpdateOutlines(){
        const components = this.getHeadingComponents();
        const headingNativeNodes = components.map(component => {
            const VNode=this.renderer.getVNodeByComponent(component);
            const nativeNode=this.renderer.getNativeNodeByVNode(VNode);
            return nativeNode;
        });
        const children = Array.from(this.links.children);
        for (let i = headingNativeNodes.length; i < children.length; i++) {
            this.links.removeChild(children[i]);
        }
        for (let i = 0; i < headingNativeNodes.length; i++) {
            const h = headingNativeNodes[i] ;
            const child = children[i] as Element;
            if (child) {
                child.className = 'textbus-outlines-plugin-' + h.tagName.toLowerCase();
                const a = child.querySelector('a') as any;
                a.onclick = () => {
                    //h.getBoundingClientRect();
                    this.scroller.scrollTo({
                        top: this.getTopDistance(h)
                    });
                };

                a.innerText = h.innerText;
            }
            else {
                const a = createElement('a', {
                    attrs: {
                        href: 'javascript:;'
                    },
                    children: [createTextNode(h.innerText)]
                });
                a.onclick = () => {
                    //h.getBoundingClientRect();
                    this.scroller.scrollTo({
                        top: this.getTopDistance(h)
                    });
                };
                const link = createElement('div', {
                    classes: ['textbus-outlines-plugin-' + h.tagName.toLowerCase()],
                    children: [a]
                });
                this.links.appendChild(link);
            }
        }
    }
    getHeadingComponents() {
        const components = [];
        function fn(component, result) {
            //console.log(component);
            //console.log(component.tagName);
            //if (/h[1-6]/.test(component.tagName)) {
            if (component.name=='HeadingComponent') {
                result.push(component);
            }
            component.slots.slots.forEach(slot => {
                slot.content.data.forEach(childComponent=>{
                    if (typeof childComponent === 'string') {
                        return;
                    }
                    fn(childComponent, result);
                });
                /*
                if (typeof i === 'string') {
                    return;
                }
                fn(i, result);*/
            });
        }
        fn(this.rootComponentRef.component, components);
        //console.log(components);
        return components;
    }
    getTopDistance(el) {
        let i = el.offsetTop;
        while (el.offsetParent) {
            el = el.offsetParent;
            i += el.offsetTop;
        }
        return i;
    }
}
