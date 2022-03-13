import {createElement, EDITABLE_DOCUMENT} from "@textbus/browser";
import {EditorController, Layout} from "@textbus/editor";
import {Tab} from "../utils/tab";
import {Selection} from "@textbus/core";

import { fromEvent } from "rxjs";

export class UIControlPanel {
    private subs: any[];
    private tab: Tab;
    _fixed: boolean;
    private layout: any;
    private oldViews: any;
    elementRef: HTMLElement;

    private fixedBtn: HTMLElement;
    private editorController: any;
    private selection: any;
    private container: HTMLElement;
    disBtn: HTMLElement;
    prevComponent: any;
    rightContainer: HTMLElement;

    constructor() {
        this._fixed = false;
        this.subs = [];
        this.oldViews = [];
        this.tab = new Tab();
        this.fixedBtn = createElement('button', {
            attrs: {
                type: 'button',
                title: '固定'
            },
            classes: ['textbus-control-panel-fixed-btn'],
            children: [createElement('span', {
                classes: ['textbus-icon-pushpin']
            })]
        });
        this.disBtn = createElement('button', {
            attrs: {
                type: 'button',
                title: '固定'
            },
            classes: ['textbus-control-panel-fixed-btn'],
            children: [createElement('span', {
                classes: ['textbus-icon-pushpin']
            })]
        });
        this.elementRef = createElement('div', {
            classes: ['textbus-control-panel'],
            children: [
                this.container = createElement('div', {
                    classes: ['textbus-control-panel-container'],
                    children: [
                        this.tab.elementRef
                    ]
                })
            ]
        });
        this.rightContainer = createElement('div', {
            classes: ['textbus-ui-right']
        })
        this.fixedBtn.addEventListener('click', () => {
            this.fixed = !this.fixed;
        });
        this.disBtn.addEventListener('click', () => {
            this.showPanels([]);
        });
        this.tab.head.insertBefore(this.fixedBtn, this.tab.head.children[0]);
        this.tab.head.insertBefore(this.disBtn, this.tab.head.children[1]);
    }
    setup(injector){
        this.layout = injector.get(Layout);
        this.layout.container.parentNode.appendChild(this.rightContainer);
        this.editorController = injector.get(EditorController);
        this.selection=injector.get(Selection);
        const editableDocument = injector.get(EDITABLE_DOCUMENT);
        this.subs.push(
            this.selection.onChange.subscribe(() => {
                this.dispatchComponentPresetEvent();
            }),
            this.editorController.onStateChange.subscribe(status => {
                if (status.readonly) {
                    this.fixed = false;
                }
            }),
            fromEvent(editableDocument, 'click').subscribe(ev => {            
                //this.dispatchComponentPresetEvent();
            })

        );
        this.fixed = false;
    }
    set fixed(b) {
        this._fixed = b;
        if (b) {
            this.layout.container.parentNode.insertBefore(this.elementRef, this.rightContainer);
            this.elementRef.classList.add('textbus-control-panel-fixed');
            this.fixedBtn.classList.add('textbus-control-panel-fixed-btn-active');
            this.fixedBtn.title = '取消固定';
        }
        else {
            this.layout.middle.appendChild(this.elementRef);
            this.elementRef.classList.remove('textbus-control-panel-fixed');
            this.fixedBtn.classList.remove('textbus-control-panel-fixed-btn-active');
            this.fixedBtn.title = '固定';
        }
    }
    get fixed() {
        return this._fixed;
    }
    showPanels(views) {
        this.oldViews.forEach(view => {
            var _a;
            (_a = view.onDestroy) === null || _a === void 0 ? void 0 : _a.call(view);
        });
        this.oldViews = views;
        if (views.length === 0) {
            //component
            this.tab.show([]);
            this.elementRef.classList.remove('textbus-control-panel-show');
            return;
        }
        this.elementRef.classList.add('textbus-control-panel-show');
        const tabs = views.map(view => {
            return {
                label: view.title,
                view: view.view
            };
        });
        this.tab.show(tabs);
    }
    dispatchComponentPresetEvent() {
        var _a;
        let component = this.selection.commonAncestorComponent;
        console.log('component',component)
        if (!component) {
            this.showPanels([]);
            return;
        }

        const views:any = [];
        const createView = (component) => {
            const createControlView=component.methods.createControlView;
            //const setter = injector.get(mapComponentSetters, null, InjectFlags.Self);
            
            if (createControlView) {
                console.log('createControlView',createControlView)
                return createControlView();
            }
            return null;
        };
        if (component === this.prevComponent) {
            return;
        }
        this.prevComponent = component;
        while (component) {
            const v = createView(component);
            if (v) {
                views.push(v);
            }
            component = (_a = component.parentFragment) === null || _a === void 0 ? void 0 : _a.parentComponent;
        }
        this.showPanels(views);

        /*
                if (this.selection.collapsed) {
                    const firstRange = this.selection.firstRange;
                    const prevContent = firstRange.startFragment.getContentAtIndex(firstRange.startIndex - 1);
                    if (prevContent instanceof LeafAbstractComponent) {
                        component = prevContent;
                    }
                }
                if (component === this.prevComponent) {
                    return;
                }
                this.prevComponent = component;
                while (component) {
                    const v = createView(component);
                    if (v) {
                        views.push(v);
                    }
                    //父组件
                    component = (_a = component.parentFragment) === null || _a === void 0 ? void 0 : _a.parentComponent;
                }
                this.controlPanel.showPanels(views);

        */
    }
    onDestroy() {
        this.subs.forEach(s => s.unsubscribe());
    }
};