import {blockquoteToolConfigFactory, ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection, Query, QueryStateType } from '@textbus/core'
import { imageCardComponent } from './imageCard.component'
import { createElement, createTextNode } from '@textbus/browser';
import {DialogTool, FileUploader, Form, FormRadio, FormTextField, I18n, imageComponent} from "@textbus/editor";
import { ComponentCreator } from '../type';

class MarginSetter {
    name: string;
    private inputs: any[];
    elementRef: HTMLElement;
    constructor(label) {
        this.name = 'margin';
        this.inputs = [];
        this.elementRef = createElement('div', {
            classes: ['textbus-form-group'],
            children: [
                createElement('label', {
                    classes: ['textbus-control-label'],
                    children: [
                        createTextNode(label)
                    ]
                }),
                createElement('div', {
                    classes: ['textbus-control-static'],
                    children: [
                        createElement('div', {
                            classes: ['textbus-toolbar-image-margin-setter'],
                            children: Array.from({ length: 4 }).fill(null).map(() => createElement('input', {
                                attrs: {
                                    type: 'text',
                                    value: '0'
                                },
                                classes: ['textbus-form-control']
                            }))
                        })
                    ]
                })
            ]
        });
        this.inputs = Array.from(this.elementRef.querySelectorAll('input'));
    }
    reset() {
        this.inputs.forEach(input => input.value = '');
    }
    update(value) {
        this.reset();
        if (value) {
            const vars = (value + '').split(/\s+/g);
            vars.forEach((v, index) => {
                this.inputs[index].value = v;
            });
        }
    }
    getAttr() {
        return {
            name: this.name,
            value: this.inputs.map(input => {
                if (Number(input.value)) {
                    return input.value + 'px';
                }
                return input.value || '0';
            }).join(' ')
        };
    }
    validate() {
        return true;
    }
}
class SizeSetter {
    name: any;
    private i18n: any;
    private inputs: any[];
    elementRef: HTMLElement;
    constructor(name, i18n) {
        this.name = name;
        this.i18n = i18n;
        this.inputs = [];
        this.elementRef = createElement('div', {
            classes: ['textbus-form-group'],
            children: [
                createElement('label', {
                    classes: ['textbus-control-label'],
                    children: [
                        createTextNode(i18n.get('label'))
                    ]
                }),
                createElement('div', {
                    classes: ['textbus-control-value'],
                    children: [
                        createElement('div', {
                            classes: ['textbus-toolbar-image-size-setter'],
                            children: [
                                createElement('input', {
                                    attrs: { type: 'text', placeholder: i18n.get('widthPlaceholder') },
                                    classes: ['textbus-form-control']
                                }),
                                createTextNode(' * '),
                                createElement('input', {
                                    attrs: { type: 'text', placeholder: i18n.get('heightPlaceholder') },
                                    classes: ['textbus-form-control']
                                })
                            ]
                        })
                    ]
                })
            ]
        });
        this.inputs = Array.from(this.elementRef.querySelectorAll('input'));
    }
    reset() {
        this.inputs.forEach(input => input.value = '');
    }
    update(value) {
        this.inputs[0].value = (value === null || value === void 0 ? void 0 : value.width) || '';
        this.inputs[1].value = (value === null || value === void 0 ? void 0 : value.height) || '';
    }
    getAttr() {
        return {
            name: this.name,
            value: {
                width: this.inputs[0].value,
                height: this.inputs[1].value
            }
        };
    }
    validate() {
        return true;
    }
}
export function imageCardToolConfigFactory(injector) {
    const i18n = injector.get(I18n);
    const query = injector.get(Query);
    const commander = injector.get(Commander);
    const fileUploader = injector.get(FileUploader);
    const childI18n = i18n.getContext('plugins.toolbar.imageTool.view');
    const form = new Form({
        title: childI18n.get('title'),
        cancelBtnText: childI18n.get('cancelBtnText'),
        confirmBtnText: childI18n.get('confirmBtnText'),
        items: [
            new FormTextField({
                label: childI18n.get('linkLabel'),
                name: 'src',
                placeholder: childI18n.get('linkInputPlaceholder'),
                canUpload: true,
                uploadType: 'image',
                uploadBtnText: childI18n.get('uploadBtnText'),
                uploadMultiple: true,
                fileUploader,
                validateFn(value) {
                    if (!value) {
                        return childI18n.get('validateErrorMessage');
                    }
                    return false;
                }
            }),
            new SizeSetter('size', childI18n.getContext('sizeSetter')),
            new SizeSetter('maxSize', childI18n.getContext('maxSizeSetter')),
            new FormRadio({
                label: childI18n.get('float.label'),
                name: 'float',
                values: [{
                    label: childI18n.get('float.noFloatLabel'),
                    value: 'none',
                    default: true
                }, {
                    label: childI18n.get('float.floatToLeftLabel'),
                    value: 'left'
                }, {
                    label: childI18n.get('float.floatToRightLabel'),
                    value: 'right'
                }]
            }),
            new MarginSetter(childI18n.get('marginLabel'))
        ]
    });
    return {
        iconClasses: ['textbus-icon-image'],
        label:'图文卡片',
        tooltip: i18n.get('plugins.toolbar.imageTool.tooltip'),
        viewController: form,
        queryState() {
            var _a;
            const state = query.queryWrappedComponent(imageCardComponent);
            const value = (_a = state.value) === null || _a === void 0 ? void 0 : _a.toJSON().state;
            return {
                state: state.state,
                value: value ? {
                    src: value.src,
                    margin: value.margin,
                    float: value.float,
                    size: {
                        width: value.width,
                        height: value.height
                    },
                    maxSize: {
                        width: value.maxWidth,
                        height: value.maxHeight
                    }
                } : null
            };
        },
        useValue(formValue) {
            if (formValue) {
                formValue.src.split(';').forEach(src=>{
                    const slot = new Slot([
                        ContentType.Text
                    ])
                    let value = {
                        src: src,
                        margin: formValue.margin,
                        float: formValue.float,
                        maxWidth: formValue.maxSize.width,
                        maxHeight: formValue.maxSize.height,
                        width: formValue.size.width,
                        height: formValue.size.height
                    };
                        
                    const state = query.queryWrappedComponent(imageCardComponent);
                    if (state.state === QueryStateType.Enabled) {
                        state.value.useState(value);
                    }
                    else if (value === void 0 ? void 0 : value.src) {
                        commander.insert(imageCardComponent.createInstance(injector, {slots:[slot],state:value}));
                    }
                })
            }

        }
    };
}
export const imageCardTool = new DialogTool(imageCardToolConfigFactory);

export const imageCardExample= `<img src="data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg width="100" height="70" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#f90"/><stop offset="100%" stop-color="#fff"/></linearGradient></defs><g><rect fill="url(#bg)" height="50" width="100%"/></g><g><path fill="#f00" opacity="0.2" d="M81.25 28.125c0 5.178-4.197 9.375-9.375 9.375s-9.375-4.197-9.375-9.375 4.197-9.375 9.375-9.375 9.375 4.197 9.375 9.375z"></path><path fill="#0e0" opacity="0.3" d="M87.5 81.25h-75v-12.5l21.875-37.5 25 31.25h6.25l21.875-18.75z"></path></g><g><rect fill="#fff" height="20" width="100%" y="50"></rect></g><g><text font-family="Helvetica, Arial, sans-serif" font-size="12" y="63" x="50%" text-anchor="middle" stroke-width="0" stroke="#000" fill="#000000">描述文字</text></g></svg>')}" alt="">`;
