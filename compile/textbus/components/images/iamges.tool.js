import { Commander, Query, QueryStateType } from '@textbus/core';
import { createElement, createTextNode } from '@textbus/browser';
import { DialogTool, FileUploader, Form, FormRadio, FormTextField, I18n, imageComponent } from "@textbus/editor";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWFtZ2VzLnRvb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXh0YnVzL2NvbXBvbmVudHMvaW1hZ2VzL2lhbWdlcy50b29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUUvRyxNQUFNLFlBQVk7SUFJZCxZQUFZLEtBQUs7UUFIakI7Ozs7O1dBQWE7UUFDYjs7Ozs7V0FBc0I7UUFDdEI7Ozs7O1dBQXdCO1FBRXBCLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLEtBQUssRUFBRTtZQUNuQyxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUMvQixRQUFRLEVBQUU7Z0JBQ04sYUFBYSxDQUFDLE9BQU8sRUFBRTtvQkFDbkIsT0FBTyxFQUFFLENBQUMsdUJBQXVCLENBQUM7b0JBQ2xDLFFBQVEsRUFBRTt3QkFDTixjQUFjLENBQUMsS0FBSyxDQUFDO3FCQUN4QjtpQkFDSixDQUFDO2dCQUNGLGFBQWEsQ0FBQyxLQUFLLEVBQUU7b0JBQ2pCLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDO29CQUNuQyxRQUFRLEVBQUU7d0JBQ04sYUFBYSxDQUFDLEtBQUssRUFBRTs0QkFDakIsT0FBTyxFQUFFLENBQUMscUNBQXFDLENBQUM7NEJBQ2hELFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEVB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SyxHQUFHO3dCQUNSLEdBQUcsRUFBRSxHQUFHO3dCQUNSLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTTt3QkFDeEIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLO3dCQUN0QixRQUFRLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLO3dCQUNqQyxTQUFTLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNO3dCQUNuQyxLQUFLLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLO3dCQUMzQixNQUFNLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNO3FCQUNoQyxDQUFDO29CQUNGLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDMUQsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLGNBQWMsQ0FBQyxPQUFPLEVBQUU7d0JBQ3hDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUMvQjt5QkFDSSxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7d0JBQzVDLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUM1RTtnQkFDTCxDQUFDLENBQUMsQ0FBQTthQUNMO1FBRUwsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBQ0QsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDbEUsc0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWFuZGVyLCBRdWVyeSwgUXVlcnlTdGF0ZVR5cGUgfSBmcm9tICdAdGV4dGJ1cy9jb3JlJztcclxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgY3JlYXRlVGV4dE5vZGUgfSBmcm9tICdAdGV4dGJ1cy9icm93c2VyJztcclxuaW1wb3J0IHtEaWFsb2dUb29sLCBGaWxlVXBsb2FkZXIsIEZvcm0sIEZvcm1SYWRpbywgRm9ybVRleHRGaWVsZCwgSTE4biwgaW1hZ2VDb21wb25lbnR9IGZyb20gXCJAdGV4dGJ1cy9lZGl0b3JcIjtcclxuXHJcbmNsYXNzIE1hcmdpblNldHRlciB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGlucHV0czogYW55W107XHJcbiAgICBlbGVtZW50UmVmOiBIVE1MRWxlbWVudDtcclxuICAgIGNvbnN0cnVjdG9yKGxhYmVsKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gJ21hcmdpbic7XHJcbiAgICAgICAgdGhpcy5pbnB1dHMgPSBbXTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1mb3JtLWdyb3VwJ10sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtY29udHJvbC1sYWJlbCddLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRleHROb2RlKGxhYmVsKVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1jb250cm9sLXN0YXRpYyddLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy10b29sYmFyLWltYWdlLW1hcmdpbi1zZXR0ZXInXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA0IH0pLmZpbGwobnVsbCkubWFwKCgpID0+IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcwJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLWZvcm0tY29udHJvbCddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pbnB1dHMgPSBBcnJheS5mcm9tKHRoaXMuZWxlbWVudFJlZi5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpKTtcclxuICAgIH1cclxuICAgIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRzLmZvckVhY2goaW5wdXQgPT4gaW5wdXQudmFsdWUgPSAnJyk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCB2YXJzID0gKHZhbHVlICsgJycpLnNwbGl0KC9cXHMrL2cpO1xyXG4gICAgICAgICAgICB2YXJzLmZvckVhY2goKHYsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0c1tpbmRleF0udmFsdWUgPSB2O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRBdHRyKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuaW5wdXRzLm1hcChpbnB1dCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoTnVtYmVyKGlucHV0LnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dC52YWx1ZSArICdweCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQudmFsdWUgfHwgJzAnO1xyXG4gICAgICAgICAgICB9KS5qb2luKCcgJylcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgdmFsaWRhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgU2l6ZVNldHRlciB7XHJcbiAgICBuYW1lOiBhbnk7XHJcbiAgICBwcml2YXRlIGkxOG46IGFueTtcclxuICAgIHByaXZhdGUgaW5wdXRzOiBhbnlbXTtcclxuICAgIGVsZW1lbnRSZWY6IEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgaTE4bikge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5pMThuID0gaTE4bjtcclxuICAgICAgICB0aGlzLmlucHV0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLWZvcm0tZ3JvdXAnXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1jb250cm9sLWxhYmVsJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlVGV4dE5vZGUoaTE4bi5nZXQoJ2xhYmVsJykpXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLWNvbnRyb2wtdmFsdWUnXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtdG9vbGJhci1pbWFnZS1zaXplLXNldHRlciddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogJ3RleHQnLCBwbGFjZWhvbGRlcjogaTE4bi5nZXQoJ3dpZHRoUGxhY2Vob2xkZXInKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtZm9ybS1jb250cm9sJ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVUZXh0Tm9kZSgnICogJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6ICd0ZXh0JywgcGxhY2Vob2xkZXI6IGkxOG4uZ2V0KCdoZWlnaHRQbGFjZWhvbGRlcicpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1mb3JtLWNvbnRyb2wnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaW5wdXRzID0gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRSZWYucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKSk7XHJcbiAgICB9XHJcbiAgICByZXNldCgpIHtcclxuICAgICAgICB0aGlzLmlucHV0cy5mb3JFYWNoKGlucHV0ID0+IGlucHV0LnZhbHVlID0gJycpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dHNbMF0udmFsdWUgPSAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhbHVlLndpZHRoKSB8fCAnJztcclxuICAgICAgICB0aGlzLmlucHV0c1sxXS52YWx1ZSA9ICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFsdWUuaGVpZ2h0KSB8fCAnJztcclxuICAgIH1cclxuICAgIGdldEF0dHIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuaW5wdXRzWzBdLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmlucHV0c1sxXS52YWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHZhbGlkYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpbWFnZXNUb29sQ29uZmlnRmFjdG9yeShpbmplY3Rvcikge1xyXG4gICAgY29uc3QgaTE4biA9IGluamVjdG9yLmdldChJMThuKTtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gaW5qZWN0b3IuZ2V0KFF1ZXJ5KTtcclxuICAgIGNvbnN0IGNvbW1hbmRlciA9IGluamVjdG9yLmdldChDb21tYW5kZXIpO1xyXG4gICAgY29uc3QgZmlsZVVwbG9hZGVyID0gaW5qZWN0b3IuZ2V0KEZpbGVVcGxvYWRlcik7XHJcbiAgICBjb25zdCBjaGlsZEkxOG4gPSBpMThuLmdldENvbnRleHQoJ3BsdWdpbnMudG9vbGJhci5pbWFnZVRvb2wudmlldycpO1xyXG4gICAgY29uc3QgZm9ybSA9IG5ldyBGb3JtKHtcclxuICAgICAgICB0aXRsZTogY2hpbGRJMThuLmdldCgndGl0bGUnKSxcclxuICAgICAgICBjYW5jZWxCdG5UZXh0OiBjaGlsZEkxOG4uZ2V0KCdjYW5jZWxCdG5UZXh0JyksXHJcbiAgICAgICAgY29uZmlybUJ0blRleHQ6IGNoaWxkSTE4bi5nZXQoJ2NvbmZpcm1CdG5UZXh0JyksXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgbmV3IEZvcm1UZXh0RmllbGQoe1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6IGNoaWxkSTE4bi5nZXQoJ2xpbmtMYWJlbCcpLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3NyYycsXHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogY2hpbGRJMThuLmdldCgnbGlua0lucHV0UGxhY2Vob2xkZXInKSxcclxuICAgICAgICAgICAgICAgIGNhblVwbG9hZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHVwbG9hZFR5cGU6ICdpbWFnZScsXHJcbiAgICAgICAgICAgICAgICB1cGxvYWRCdG5UZXh0OiBjaGlsZEkxOG4uZ2V0KCd1cGxvYWRCdG5UZXh0JyksXHJcbiAgICAgICAgICAgICAgICB1cGxvYWRNdWx0aXBsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZpbGVVcGxvYWRlcixcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlRm4odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZEkxOG4uZ2V0KCd2YWxpZGF0ZUVycm9yTWVzc2FnZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBuZXcgU2l6ZVNldHRlcignc2l6ZScsIGNoaWxkSTE4bi5nZXRDb250ZXh0KCdzaXplU2V0dGVyJykpLFxyXG4gICAgICAgICAgICBuZXcgU2l6ZVNldHRlcignbWF4U2l6ZScsIGNoaWxkSTE4bi5nZXRDb250ZXh0KCdtYXhTaXplU2V0dGVyJykpLFxyXG4gICAgICAgICAgICBuZXcgRm9ybVJhZGlvKHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBjaGlsZEkxOG4uZ2V0KCdmbG9hdC5sYWJlbCcpLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2Zsb2F0JyxcclxuICAgICAgICAgICAgICAgIHZhbHVlczogW3tcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogY2hpbGRJMThuLmdldCgnZmxvYXQubm9GbG9hdExhYmVsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGNoaWxkSTE4bi5nZXQoJ2Zsb2F0LmZsb2F0VG9MZWZ0TGFiZWwnKSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ2xlZnQnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGNoaWxkSTE4bi5nZXQoJ2Zsb2F0LmZsb2F0VG9SaWdodExhYmVsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdyaWdodCdcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBuZXcgTWFyZ2luU2V0dGVyKGNoaWxkSTE4bi5nZXQoJ21hcmdpbkxhYmVsJykpXHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGljb25DbGFzc2VzOiBbJ3RleHRidXMtaWNvbi1pbWFnZSddLFxyXG4gICAgICAgIGxhYmVsOiflm77niYfmibnph48nLFxyXG4gICAgICAgIHRvb2x0aXA6IGkxOG4uZ2V0KCdwbHVnaW5zLnRvb2xiYXIuaW1hZ2VUb29sLnRvb2x0aXAnKSxcclxuICAgICAgICB2aWV3Q29udHJvbGxlcjogZm9ybSxcclxuICAgICAgICBxdWVyeVN0YXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gcXVlcnkucXVlcnlXcmFwcGVkQ29tcG9uZW50KGltYWdlQ29tcG9uZW50KTtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAoX2EgPSBzdGF0ZS52YWx1ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvSlNPTigpLnN0YXRlO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IHN0YXRlLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlID8ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogdmFsdWUuc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogdmFsdWUubWFyZ2luLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0OiB2YWx1ZS5mbG9hdCxcclxuICAgICAgICAgICAgICAgICAgICBzaXplOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB2YWx1ZS53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB2YWx1ZS5oZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFNpemU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHZhbHVlLm1heFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHZhbHVlLm1heEhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gOiBudWxsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1c2VWYWx1ZShmb3JtVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKGZvcm1WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybVZhbHVlLnNyYy5zcGxpdCgnOycpLmZvckVhY2goc3JjPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IHNyYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiBmb3JtVmFsdWUubWFyZ2luLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdDogZm9ybVZhbHVlLmZsb2F0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogZm9ybVZhbHVlLm1heFNpemUud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodDogZm9ybVZhbHVlLm1heFNpemUuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogZm9ybVZhbHVlLnNpemUud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogZm9ybVZhbHVlLnNpemUuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0ZSA9IHF1ZXJ5LnF1ZXJ5V3JhcHBlZENvbXBvbmVudChpbWFnZUNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLnN0YXRlID09PSBRdWVyeVN0YXRlVHlwZS5FbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnZhbHVlLnVzZVN0YXRlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhbHVlLnNyYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kZXIuaW5zZXJ0KGltYWdlQ29tcG9uZW50LmNyZWF0ZUluc3RhbmNlKGluamVjdG9yLCB7c3RhdGU6dmFsdWV9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydCBjb25zdCBpbWFnZXNUb29sID0gbmV3IERpYWxvZ1Rvb2woaW1hZ2VzVG9vbENvbmZpZ0ZhY3RvcnkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbWFnZS50b29sLmpzLm1hcCJdfQ==