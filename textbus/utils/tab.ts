import { createElement, createTextNode } from '@textbus/browser';
export class Tab {
    elementRef: HTMLElement;
    viewContainer: HTMLElement;
    head: HTMLElement;
    btnWrapper: HTMLElement;
    constructor(style) {
        this.elementRef = createElement('div', {
            classes: ['textbus-tab'],
            styles:Object.assign({width:"100%",height:"100%"},style),
            children: [
                this.head = createElement('div', {
                    classes: ['textbus-tab-head'],
                    children: [
                        this.btnWrapper = createElement('div', {
                            classes: ['textbus-tab-btn-wrapper']
                        })
                    ]
                }),
                this.viewContainer = createElement('div', {
                    classes: ['textbus-tab-view']
                })
            ]
        });
    }
    show(config) {
        this.btnWrapper.innerHTML = '';
        this.viewContainer.innerHTML = '';
        const btns = config.map((item, index) => {
            const btn = createElement('button', {
                classes: ['textbus-tab-btn'],
                children: [
                    createTextNode(item.label)
                ]
            });
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('textbus-tab-btn-active'));
                btn.classList.add('textbus-tab-btn-active');
                this.viewContainer.innerHTML = '';
                this.viewContainer.appendChild(item.view);
            });
            this.btnWrapper.appendChild(btn);
            if (index === 0) {
                btn.classList.add('textbus-tab-btn-active');
                this.viewContainer.appendChild(item.view);
            }
            return btn;
        });
    }
}