import { Commander, Query, QueryStateType } from '@textbus/core';
import { createElement, createTextNode } from '@textbus/browser';
import { DialogTool, FileUploader, Form, FormRadio, FormTextField, I18n, imageComponent } from "@textbus/editor";
import { MyFileUploader } from "./fileUploader";
class MarginSetter {
    constructor(label) {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "elementRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
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
    constructor(name, i18n) {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "i18n", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "elementRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
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
                fileUploader: new MyFileUploader(),
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
        label: '图片批量',
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
                formValue.src.split(';').forEach(src => {
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
                        commander.insert(imageComponent.createInstance(injector, { state: value }));
                    }
                });
            }
        }
    };
}
export const imagesTool = new DialogTool(imagesToolConfigFactory);
//# sourceMappingURL=image.tool.js.map
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VCYXNlNjQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXh0YnVzL2NvbXBvbmVudHMvaW1hZ2VzL2ltYWdlQmFzZTY0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMvRyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUE7QUFDN0MsTUFBTSxZQUFZO0lBSWQsWUFBWSxLQUFLO1FBSGpCOzs7OztXQUFhO1FBQ2I7Ozs7O1dBQXNCO1FBQ3RCOzs7OztXQUF3QjtRQUVwQixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxLQUFLLEVBQUU7WUFDbkMsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7WUFDL0IsUUFBUSxFQUFFO2dCQUNOLGFBQWEsQ0FBQyxPQUFPLEVBQUU7b0JBQ25CLE9BQU8sRUFBRSxDQUFDLHVCQUF1QixDQUFDO29CQUNsQyxRQUFRLEVBQUU7d0JBQ04sY0FBYyxDQUFDLEtBQUssQ0FBQztxQkFDeEI7aUJBQ0osQ0FBQztnQkFDRixhQUFhLENBQUMsS0FBSyxFQUFFO29CQUNqQixPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztvQkFDbkMsUUFBUSxFQUFFO3dCQUNOLGFBQWEsQ0FBQyxLQUFLLEVBQUU7NEJBQ2pCLE9BQU8sRUFBRSxDQUFDLHFDQUFxQyxD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QUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQSxFQUFFO29CQUNsQyxJQUFJLEtBQUssR0FBRzt3QkFDUixHQUFHLEVBQUUsR0FBRzt3QkFDUixNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU07d0JBQ3hCLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSzt3QkFDdEIsUUFBUSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSzt3QkFDakMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTTt3QkFDbkMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSzt3QkFDM0IsTUFBTSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTTtxQkFDaEMsQ0FBQztvQkFDRixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzFELElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxjQUFjLENBQUMsT0FBTyxFQUFFO3dCQUN4QyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDL0I7eUJBQ0ksSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO3dCQUM1QyxTQUFTLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQztxQkFDNUU7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7YUFDTDtRQUVMLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQUNELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ2xFLHNDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1hbmRlciwgUXVlcnksIFF1ZXJ5U3RhdGVUeXBlIH0gZnJvbSAnQHRleHRidXMvY29yZSc7XHJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGNyZWF0ZVRleHROb2RlIH0gZnJvbSAnQHRleHRidXMvYnJvd3Nlcic7XHJcbmltcG9ydCB7RGlhbG9nVG9vbCwgRmlsZVVwbG9hZGVyLCBGb3JtLCBGb3JtUmFkaW8sIEZvcm1UZXh0RmllbGQsIEkxOG4sIGltYWdlQ29tcG9uZW50fSBmcm9tIFwiQHRleHRidXMvZWRpdG9yXCI7XHJcbmltcG9ydCB7TXlGaWxlVXBsb2FkZXJ9IGZyb20gXCIuL2ZpbGVVcGxvYWRlclwiXHJcbmNsYXNzIE1hcmdpblNldHRlciB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGlucHV0czogYW55W107XHJcbiAgICBlbGVtZW50UmVmOiBIVE1MRWxlbWVudDtcclxuICAgIGNvbnN0cnVjdG9yKGxhYmVsKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gJ21hcmdpbic7XHJcbiAgICAgICAgdGhpcy5pbnB1dHMgPSBbXTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1mb3JtLWdyb3VwJ10sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtY29udHJvbC1sYWJlbCddLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRleHROb2RlKGxhYmVsKVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1jb250cm9sLXN0YXRpYyddLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy10b29sYmFyLWltYWdlLW1hcmdpbi1zZXR0ZXInXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA0IH0pLmZpbGwobnVsbCkubWFwKCgpID0+IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcwJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLWZvcm0tY29udHJvbCddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pbnB1dHMgPSBBcnJheS5mcm9tKHRoaXMuZWxlbWVudFJlZi5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpKTtcclxuICAgIH1cclxuICAgIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRzLmZvckVhY2goaW5wdXQgPT4gaW5wdXQudmFsdWUgPSAnJyk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCB2YXJzID0gKHZhbHVlICsgJycpLnNwbGl0KC9cXHMrL2cpO1xyXG4gICAgICAgICAgICB2YXJzLmZvckVhY2goKHYsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0c1tpbmRleF0udmFsdWUgPSB2O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRBdHRyKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuaW5wdXRzLm1hcChpbnB1dCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoTnVtYmVyKGlucHV0LnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dC52YWx1ZSArICdweCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQudmFsdWUgfHwgJzAnO1xyXG4gICAgICAgICAgICB9KS5qb2luKCcgJylcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgdmFsaWRhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgU2l6ZVNldHRlciB7XHJcbiAgICBuYW1lOiBhbnk7XHJcbiAgICBwcml2YXRlIGkxOG46IGFueTtcclxuICAgIHByaXZhdGUgaW5wdXRzOiBhbnlbXTtcclxuICAgIGVsZW1lbnRSZWY6IEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgaTE4bikge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5pMThuID0gaTE4bjtcclxuICAgICAgICB0aGlzLmlucHV0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLWZvcm0tZ3JvdXAnXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1jb250cm9sLWxhYmVsJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlVGV4dE5vZGUoaTE4bi5nZXQoJ2xhYmVsJykpXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLWNvbnRyb2wtdmFsdWUnXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtdG9vbGJhci1pbWFnZS1zaXplLXNldHRlciddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogJ3RleHQnLCBwbGFjZWhvbGRlcjogaTE4bi5nZXQoJ3dpZHRoUGxhY2Vob2xkZXInKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtZm9ybS1jb250cm9sJ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVUZXh0Tm9kZSgnICogJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6ICd0ZXh0JywgcGxhY2Vob2xkZXI6IGkxOG4uZ2V0KCdoZWlnaHRQbGFjZWhvbGRlcicpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1mb3JtLWNvbnRyb2wnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaW5wdXRzID0gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRSZWYucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKSk7XHJcbiAgICB9XHJcbiAgICByZXNldCgpIHtcclxuICAgICAgICB0aGlzLmlucHV0cy5mb3JFYWNoKGlucHV0ID0+IGlucHV0LnZhbHVlID0gJycpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dHNbMF0udmFsdWUgPSAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhbHVlLndpZHRoKSB8fCAnJztcclxuICAgICAgICB0aGlzLmlucHV0c1sxXS52YWx1ZSA9ICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFsdWUuaGVpZ2h0KSB8fCAnJztcclxuICAgIH1cclxuICAgIGdldEF0dHIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuaW5wdXRzWzBdLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmlucHV0c1sxXS52YWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHZhbGlkYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpbWFnZXNUb29sQ29uZmlnRmFjdG9yeShpbmplY3Rvcikge1xyXG4gICAgY29uc3QgaTE4biA9IGluamVjdG9yLmdldChJMThuKTtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gaW5qZWN0b3IuZ2V0KFF1ZXJ5KTtcclxuICAgIGNvbnN0IGNvbW1hbmRlciA9IGluamVjdG9yLmdldChDb21tYW5kZXIpO1xyXG4gICAgY29uc3QgZmlsZVVwbG9hZGVyID0gaW5qZWN0b3IuZ2V0KEZpbGVVcGxvYWRlcik7XHJcbiAgICBjb25zdCBjaGlsZEkxOG4gPSBpMThuLmdldENvbnRleHQoJ3BsdWdpbnMudG9vbGJhci5pbWFnZVRvb2wudmlldycpO1xyXG4gICAgY29uc3QgZm9ybSA9IG5ldyBGb3JtKHtcclxuICAgICAgICB0aXRsZTogY2hpbGRJMThuLmdldCgndGl0bGUnKSxcclxuICAgICAgICBcclxuICAgICAgICBjYW5jZWxCdG5UZXh0OiBjaGlsZEkxOG4uZ2V0KCdjYW5jZWxCdG5UZXh0JyksXHJcbiAgICAgICAgY29uZmlybUJ0blRleHQ6IGNoaWxkSTE4bi5nZXQoJ2NvbmZpcm1CdG5UZXh0JyksXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgbmV3IEZvcm1UZXh0RmllbGQoe1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6IGNoaWxkSTE4bi5nZXQoJ2xpbmtMYWJlbCcpLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3NyYycsXHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogY2hpbGRJMThuLmdldCgnbGlua0lucHV0UGxhY2Vob2xkZXInKSxcclxuICAgICAgICAgICAgICAgIGNhblVwbG9hZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHVwbG9hZFR5cGU6ICdpbWFnZScsXHJcbiAgICAgICAgICAgICAgICB1cGxvYWRCdG5UZXh0OiBjaGlsZEkxOG4uZ2V0KCd1cGxvYWRCdG5UZXh0JyksXHJcbiAgICAgICAgICAgICAgICB1cGxvYWRNdWx0aXBsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZpbGVVcGxvYWRlcjpuZXcgTXlGaWxlVXBsb2FkZXIoKSxcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlRm4odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZEkxOG4uZ2V0KCd2YWxpZGF0ZUVycm9yTWVzc2FnZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBuZXcgU2l6ZVNldHRlcignc2l6ZScsIGNoaWxkSTE4bi5nZXRDb250ZXh0KCdzaXplU2V0dGVyJykpLFxyXG4gICAgICAgICAgICBuZXcgU2l6ZVNldHRlcignbWF4U2l6ZScsIGNoaWxkSTE4bi5nZXRDb250ZXh0KCdtYXhTaXplU2V0dGVyJykpLFxyXG4gICAgICAgICAgICBuZXcgRm9ybVJhZGlvKHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBjaGlsZEkxOG4uZ2V0KCdmbG9hdC5sYWJlbCcpLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2Zsb2F0JyxcclxuICAgICAgICAgICAgICAgIHZhbHVlczogW3tcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogY2hpbGRJMThuLmdldCgnZmxvYXQubm9GbG9hdExhYmVsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGNoaWxkSTE4bi5nZXQoJ2Zsb2F0LmZsb2F0VG9MZWZ0TGFiZWwnKSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ2xlZnQnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGNoaWxkSTE4bi5nZXQoJ2Zsb2F0LmZsb2F0VG9SaWdodExhYmVsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdyaWdodCdcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBuZXcgTWFyZ2luU2V0dGVyKGNoaWxkSTE4bi5nZXQoJ21hcmdpbkxhYmVsJykpXHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGljb25DbGFzc2VzOiBbJ3RleHRidXMtaWNvbi1pbWFnZSddLFxyXG4gICAgICAgIGxhYmVsOiflm77niYfmibnph48nLFxyXG4gICAgICAgIHRvb2x0aXA6IGkxOG4uZ2V0KCdwbHVnaW5zLnRvb2xiYXIuaW1hZ2VUb29sLnRvb2x0aXAnKSxcclxuICAgICAgICB2aWV3Q29udHJvbGxlcjogZm9ybSxcclxuICAgICAgICBxdWVyeVN0YXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gcXVlcnkucXVlcnlXcmFwcGVkQ29tcG9uZW50KGltYWdlQ29tcG9uZW50KTtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAoX2EgPSBzdGF0ZS52YWx1ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvSlNPTigpLnN0YXRlO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IHN0YXRlLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlID8ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogdmFsdWUuc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogdmFsdWUubWFyZ2luLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0OiB2YWx1ZS5mbG9hdCxcclxuICAgICAgICAgICAgICAgICAgICBzaXplOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB2YWx1ZS53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB2YWx1ZS5oZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFNpemU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHZhbHVlLm1heFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHZhbHVlLm1heEhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gOiBudWxsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1c2VWYWx1ZShmb3JtVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKGZvcm1WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybVZhbHVlLnNyYy5zcGxpdCgnOycpLmZvckVhY2goc3JjPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IHNyYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiBmb3JtVmFsdWUubWFyZ2luLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdDogZm9ybVZhbHVlLmZsb2F0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogZm9ybVZhbHVlLm1heFNpemUud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodDogZm9ybVZhbHVlLm1heFNpemUuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogZm9ybVZhbHVlLnNpemUud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogZm9ybVZhbHVlLnNpemUuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0ZSA9IHF1ZXJ5LnF1ZXJ5V3JhcHBlZENvbXBvbmVudChpbWFnZUNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLnN0YXRlID09PSBRdWVyeVN0YXRlVHlwZS5FbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnZhbHVlLnVzZVN0YXRlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhbHVlLnNyYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kZXIuaW5zZXJ0KGltYWdlQ29tcG9uZW50LmNyZWF0ZUluc3RhbmNlKGluamVjdG9yLCB7c3RhdGU6dmFsdWV9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydCBjb25zdCBpbWFnZXNUb29sID0gbmV3IERpYWxvZ1Rvb2woaW1hZ2VzVG9vbENvbmZpZ0ZhY3RvcnkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbWFnZS50b29sLmpzLm1hcCJdfQ==