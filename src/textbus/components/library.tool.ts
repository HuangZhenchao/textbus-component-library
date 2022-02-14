import {Commander, ContentType, QueryStateType, Slot, Selection} from "@textbus/core";
import {DropdownTool, DropdownToolConfig} from "@textbus/editor";
import {createElement} from "@textbus/browser";
import {Tab} from "@/textbus/utils/tab";
import {ComponentCreator} from "./type";
import {alertComponentCreator} from "@/textbus/components/alert/alert.component";
import {Observable,Subject} from "rxjs";

import './component-library.plugin.scss'

class ComponentExample{
    elementRef: HTMLElement;
    private injector: any;
    onCancel: any;
    checkEvent: any;
    onComplete: any;
    constructor(injector) {
        this.injector=injector;
        this.onCancel = new Observable();
        this.checkEvent = new Subject();
        this.onComplete = this.checkEvent.asObservable();
        this.elementRef = createElement('div', {
            classes: ['textbus-component-stage'],
            children: []
        });
        const tab = new Tab();
        const CREATORS:ComponentCreator[]=[
            alertComponentCreator
        ];
        const categories = this.classify(CREATORS || []);
        tab.show(categories.map(item => {
            console.log(item)
            const view = createElement('div', {
                classes: ['textbus-component-stage-list']
            });
            item.libs.forEach(i => view.appendChild(this.addExample(i)));
            return {
                label: item.categoryName,
                view
            };
        }));
        this.elementRef.appendChild(tab.elementRef);
    }
    classify(libs) {
        const categories = new Map();
        libs.forEach(item => {
            const category = item.category === 'undefined' ? '组件库' : item.category;
            const categoryName = category || "组件库";
            if (!categories.has(categoryName)) {
                categories.set(categoryName, []);
            }
            const list = categories.get(categoryName);
            list.push(item);
        });
        return Array.from(categories).map(value => {
            return {
                categoryName: value[0],
                libs: value[1]
            };
        });
    }
    addExample(example) {
        const name = example.name === 'undefined' ? '组件': example.name;
        const { wrapper, card } = ComponentExample.createViewer(example.example, name);
        wrapper.addEventListener('click', () => {
            /*
            if (this.editorController.readonly ) {
                return;
            }*/
            const t = example.create(this.injector);


        });
        return wrapper;
    }
    static createViewer(content, name) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('textbus-component-example-item');
        const card = document.createElement('div');
        card.classList.add('textbus-component-example');
        const exampleContent = document.createElement('div');
        exampleContent.classList.add('textbus-component-example-content');
        if (typeof content === 'string') {
            exampleContent.innerHTML = content;
        }
        else if (content instanceof HTMLElement) {
            exampleContent.appendChild(content);
        }
        card.appendChild(exampleContent);
        const mask = document.createElement('div');
        mask.classList.add('textbus-component-example-mask');
        card.appendChild(mask);
        wrapper.appendChild(card);
        const nameWrapper = document.createElement('div');
        nameWrapper.classList.add('textbus-component-example-name');
        nameWrapper.innerText = name || '';
        wrapper.appendChild(nameWrapper);
        return {
            wrapper,
            card
        };
    }


    update() {
        //
    }
    reset() {
        //
    }
}
export function libraryToolConfigFactory(injector):DropdownToolConfig {
    //const commander = injector.get(Commander);
    //iconClasses: ['textbus-icon-emoji'],
    return {
        label:'组件库',
        tooltip: '组件库',
        viewController: new ComponentExample(injector),
        queryState() {
            return {
                state: QueryStateType.Normal,
                value: null
            };
        },
        useValue(value) {
            //commander.insert(value);
        }
    };

}
export const libraryTool = new DropdownTool(libraryToolConfigFactory);