import { Commander, Query, QueryStateType } from '@textbus/core';
import { createElement, createTextNode } from '@textbus/browser';
import {DialogTool, FileUploader, Form, FormRadio, FormTextField, I18n, imageComponent} from "@textbus/editor";

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
export function imagesToolConfigFactory(injector) {
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
        label:'图片批量',
        tooltip: i18n.get('plugins.toolbar.imageTool.tooltip'),
        viewController: form,
        queryState() {
            var _a;
            const state = query.queryWrappedComponent(imageComponent);
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
                    let value = {
                        src: src,
                        margin: formValue.margin,
                        float: formValue.float,
                        maxWidth: formValue.maxSize.width,
                        maxHeight: formValue.maxSize.height,
                        width: formValue.size.width,
                        height: formValue.size.height
                    };
                    const state = query.queryWrappedComponent(imageComponent);
                    if (state.state === QueryStateType.Enabled) {
                        state.value.useState(value);
                    }
                    else if (value === void 0 ? void 0 : value.src) {
                        commander.insert(imageComponent.createInstance(injector, {state:value}));
                    }
                })
            }

        }
    };
}
export const imagesTool = new DialogTool(imagesToolConfigFactory);
//# sourceMappingURL=image.tool.js.map