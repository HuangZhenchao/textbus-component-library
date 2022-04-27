import { Commander, ContentType, Slot, Query, QueryStateType } from '@textbus/core';
import { imageCardComponent } from './imageCard.component';
import { createElement, createTextNode } from '@textbus/browser';
import { DialogTool, FileUploader, Form, FormRadio, FormTextField, I18n } from "@textbus/editor";
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
        label: '图文卡片',
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
                formValue.src.split(';').forEach(src => {
                    const slot = new Slot([
                        ContentType.Text
                    ]);
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
                        commander.insert(imageCardComponent.createInstance(injector, { slots: [slot], state: value }));
                    }
                });
            }
        }
    };
}
export const imageCardTool = new DialogTool(imageCardToolConfigFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VDYXJkLnRvb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXh0YnVzL2NvbXBvbmVudHMvaW1hZ2VDYXJkL2ltYWdlQ2FyZC50b29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBYSxLQUFLLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQzlGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFBO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakUsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFpQixNQUFNLGlCQUFpQixDQUFDO0FBRS9HLE1BQU0sWUFBWTtJQUlkLFlBQVksS0FBSztRQUhqQjs7Ozs7V0FBYTtRQUNiOzs7OztXQUFzQjtRQUN0Qjs7Ozs7V0FBd0I7UUFFcEIsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUMsS0FBSyxFQUFFO1lBQ25DLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO1lBQy9CLFFBQVEsRUFBRTtnQkFDTixhQUFhLENBQUMsT0FBTyxFQUFFO29CQUNuQixPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztvQkFDbEMsUUFBUSxFQUFFO3dCQUNOLGNBQWMsQ0FBQyxLQUFLLENBQUM7cUJBQ3hCO2lCQUNKLENBQUM7Z0JBQ0YsYUFBYSxDQUFDLEtBQUssRUFBRTtvQkFDakIsT0FBTyxFQUFFLENBQUMsd0JBQXdCLENBQUM7b0JBQ25DLFFBQVEsRUFBRTt3QkFDTixhQUFhLENBQUMsS0FBSyxFQUFFOzRCQUNqQixP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SSxVQUFVLENBQUMsMEJBQTBCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YmxvY2txdW90ZVRvb2xDb25maWdGYWN0b3J5LCBCdXR0b25Ub29sLEJ1dHRvblRvb2xDb25maWd9IGZyb20gJ0B0ZXh0YnVzL2VkaXRvcidcclxuaW1wb3J0IHsgQ29tbWFuZGVyLCBDb250ZW50VHlwZSwgU2xvdCwgU2VsZWN0aW9uLCBRdWVyeSwgUXVlcnlTdGF0ZVR5cGUgfSBmcm9tICdAdGV4dGJ1cy9jb3JlJ1xyXG5pbXBvcnQgeyBpbWFnZUNhcmRDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlQ2FyZC5jb21wb25lbnQnXHJcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGNyZWF0ZVRleHROb2RlIH0gZnJvbSAnQHRleHRidXMvYnJvd3Nlcic7XHJcbmltcG9ydCB7RGlhbG9nVG9vbCwgRmlsZVVwbG9hZGVyLCBGb3JtLCBGb3JtUmFkaW8sIEZvcm1UZXh0RmllbGQsIEkxOG4sIGltYWdlQ29tcG9uZW50fSBmcm9tIFwiQHRleHRidXMvZWRpdG9yXCI7XHJcblxyXG5jbGFzcyBNYXJnaW5TZXR0ZXIge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBpbnB1dHM6IGFueVtdO1xyXG4gICAgZWxlbWVudFJlZjogSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdHJ1Y3RvcihsYWJlbCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9ICdtYXJnaW4nO1xyXG4gICAgICAgIHRoaXMuaW5wdXRzID0gW107XHJcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtZm9ybS1ncm91cCddLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLWNvbnRyb2wtbGFiZWwnXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVUZXh0Tm9kZShsYWJlbClcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtY29udHJvbC1zdGF0aWMnXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtdG9vbGJhci1pbWFnZS1tYXJnaW4tc2V0dGVyJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogQXJyYXkuZnJvbSh7IGxlbmd0aDogNCB9KS5maWxsKG51bGwpLm1hcCgoKSA9PiBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnMCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1mb3JtLWNvbnRyb2wnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaW5wdXRzID0gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRSZWYucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKSk7XHJcbiAgICB9XHJcbiAgICByZXNldCgpIHtcclxuICAgICAgICB0aGlzLmlucHV0cy5mb3JFYWNoKGlucHV0ID0+IGlucHV0LnZhbHVlID0gJycpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBjb25zdCB2YXJzID0gKHZhbHVlICsgJycpLnNwbGl0KC9cXHMrL2cpO1xyXG4gICAgICAgICAgICB2YXJzLmZvckVhY2goKHYsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0c1tpbmRleF0udmFsdWUgPSB2O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRBdHRyKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuaW5wdXRzLm1hcChpbnB1dCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoTnVtYmVyKGlucHV0LnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dC52YWx1ZSArICdweCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQudmFsdWUgfHwgJzAnO1xyXG4gICAgICAgICAgICB9KS5qb2luKCcgJylcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgdmFsaWRhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgU2l6ZVNldHRlciB7XHJcbiAgICBuYW1lOiBhbnk7XHJcbiAgICBwcml2YXRlIGkxOG46IGFueTtcclxuICAgIHByaXZhdGUgaW5wdXRzOiBhbnlbXTtcclxuICAgIGVsZW1lbnRSZWY6IEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgaTE4bikge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5pMThuID0gaTE4bjtcclxuICAgICAgICB0aGlzLmlucHV0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLWZvcm0tZ3JvdXAnXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1jb250cm9sLWxhYmVsJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlVGV4dE5vZGUoaTE4bi5nZXQoJ2xhYmVsJykpXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLWNvbnRyb2wtdmFsdWUnXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtdG9vbGJhci1pbWFnZS1zaXplLXNldHRlciddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogJ3RleHQnLCBwbGFjZWhvbGRlcjogaTE4bi5nZXQoJ3dpZHRoUGxhY2Vob2xkZXInKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtZm9ybS1jb250cm9sJ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVUZXh0Tm9kZSgnICogJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6ICd0ZXh0JywgcGxhY2Vob2xkZXI6IGkxOG4uZ2V0KCdoZWlnaHRQbGFjZWhvbGRlcicpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1mb3JtLWNvbnRyb2wnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaW5wdXRzID0gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRSZWYucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKSk7XHJcbiAgICB9XHJcbiAgICByZXNldCgpIHtcclxuICAgICAgICB0aGlzLmlucHV0cy5mb3JFYWNoKGlucHV0ID0+IGlucHV0LnZhbHVlID0gJycpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dHNbMF0udmFsdWUgPSAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhbHVlLndpZHRoKSB8fCAnJztcclxuICAgICAgICB0aGlzLmlucHV0c1sxXS52YWx1ZSA9ICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFsdWUuaGVpZ2h0KSB8fCAnJztcclxuICAgIH1cclxuICAgIGdldEF0dHIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuaW5wdXRzWzBdLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmlucHV0c1sxXS52YWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHZhbGlkYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpbWFnZUNhcmRUb29sQ29uZmlnRmFjdG9yeShpbmplY3Rvcikge1xyXG4gICAgY29uc3QgaTE4biA9IGluamVjdG9yLmdldChJMThuKTtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gaW5qZWN0b3IuZ2V0KFF1ZXJ5KTtcclxuICAgIGNvbnN0IGNvbW1hbmRlciA9IGluamVjdG9yLmdldChDb21tYW5kZXIpO1xyXG4gICAgY29uc3QgZmlsZVVwbG9hZGVyID0gaW5qZWN0b3IuZ2V0KEZpbGVVcGxvYWRlcik7XHJcbiAgICBjb25zdCBjaGlsZEkxOG4gPSBpMThuLmdldENvbnRleHQoJ3BsdWdpbnMudG9vbGJhci5pbWFnZVRvb2wudmlldycpO1xyXG4gICAgY29uc3QgZm9ybSA9IG5ldyBGb3JtKHtcclxuICAgICAgICB0aXRsZTogY2hpbGRJMThuLmdldCgndGl0bGUnKSxcclxuICAgICAgICBjYW5jZWxCdG5UZXh0OiBjaGlsZEkxOG4uZ2V0KCdjYW5jZWxCdG5UZXh0JyksXHJcbiAgICAgICAgY29uZmlybUJ0blRleHQ6IGNoaWxkSTE4bi5nZXQoJ2NvbmZpcm1CdG5UZXh0JyksXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgbmV3IEZvcm1UZXh0RmllbGQoe1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6IGNoaWxkSTE4bi5nZXQoJ2xpbmtMYWJlbCcpLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3NyYycsXHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogY2hpbGRJMThuLmdldCgnbGlua0lucHV0UGxhY2Vob2xkZXInKSxcclxuICAgICAgICAgICAgICAgIGNhblVwbG9hZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHVwbG9hZFR5cGU6ICdpbWFnZScsXHJcbiAgICAgICAgICAgICAgICB1cGxvYWRCdG5UZXh0OiBjaGlsZEkxOG4uZ2V0KCd1cGxvYWRCdG5UZXh0JyksXHJcbiAgICAgICAgICAgICAgICB1cGxvYWRNdWx0aXBsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZpbGVVcGxvYWRlcixcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlRm4odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZEkxOG4uZ2V0KCd2YWxpZGF0ZUVycm9yTWVzc2FnZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBuZXcgU2l6ZVNldHRlcignc2l6ZScsIGNoaWxkSTE4bi5nZXRDb250ZXh0KCdzaXplU2V0dGVyJykpLFxyXG4gICAgICAgICAgICBuZXcgU2l6ZVNldHRlcignbWF4U2l6ZScsIGNoaWxkSTE4bi5nZXRDb250ZXh0KCdtYXhTaXplU2V0dGVyJykpLFxyXG4gICAgICAgICAgICBuZXcgRm9ybVJhZGlvKHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBjaGlsZEkxOG4uZ2V0KCdmbG9hdC5sYWJlbCcpLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2Zsb2F0JyxcclxuICAgICAgICAgICAgICAgIHZhbHVlczogW3tcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogY2hpbGRJMThuLmdldCgnZmxvYXQubm9GbG9hdExhYmVsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGNoaWxkSTE4bi5nZXQoJ2Zsb2F0LmZsb2F0VG9MZWZ0TGFiZWwnKSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ2xlZnQnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGNoaWxkSTE4bi5nZXQoJ2Zsb2F0LmZsb2F0VG9SaWdodExhYmVsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdyaWdodCdcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBuZXcgTWFyZ2luU2V0dGVyKGNoaWxkSTE4bi5nZXQoJ21hcmdpbkxhYmVsJykpXHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGljb25DbGFzc2VzOiBbJ3RleHRidXMtaWNvbi1pbWFnZSddLFxyXG4gICAgICAgIGxhYmVsOiflm77mlofljaHniYcnLFxyXG4gICAgICAgIHRvb2x0aXA6IGkxOG4uZ2V0KCdwbHVnaW5zLnRvb2xiYXIuaW1hZ2VUb29sLnRvb2x0aXAnKSxcclxuICAgICAgICB2aWV3Q29udHJvbGxlcjogZm9ybSxcclxuICAgICAgICBxdWVyeVN0YXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gcXVlcnkucXVlcnlXcmFwcGVkQ29tcG9uZW50KGltYWdlQ2FyZENvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gKF9hID0gc3RhdGUudmFsdWUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b0pTT04oKS5zdGF0ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZS5zdGF0ZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSA/IHtcclxuICAgICAgICAgICAgICAgICAgICBzcmM6IHZhbHVlLnNyYyxcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IHZhbHVlLm1hcmdpbixcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdDogdmFsdWUuZmxvYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogdmFsdWUud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogdmFsdWUuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhTaXplOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB2YWx1ZS5tYXhXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB2YWx1ZS5tYXhIZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IDogbnVsbFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXNlVmFsdWUoZm9ybVZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChmb3JtVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGZvcm1WYWx1ZS5zcmMuc3BsaXQoJzsnKS5mb3JFYWNoKHNyYz0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsb3QgPSBuZXcgU2xvdChbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlLlRleHRcclxuICAgICAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBzcmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogZm9ybVZhbHVlLm1hcmdpbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXQ6IGZvcm1WYWx1ZS5mbG9hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6IGZvcm1WYWx1ZS5tYXhTaXplLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IGZvcm1WYWx1ZS5tYXhTaXplLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGZvcm1WYWx1ZS5zaXplLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGZvcm1WYWx1ZS5zaXplLmhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gcXVlcnkucXVlcnlXcmFwcGVkQ29tcG9uZW50KGltYWdlQ2FyZENvbXBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLnN0YXRlID09PSBRdWVyeVN0YXRlVHlwZS5FbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnZhbHVlLnVzZVN0YXRlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhbHVlLnNyYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kZXIuaW5zZXJ0KGltYWdlQ2FyZENvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShpbmplY3Rvciwge3Nsb3RzOltzbG90XSxzdGF0ZTp2YWx1ZX0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuZXhwb3J0IGNvbnN0IGltYWdlQ2FyZFRvb2wgPSBuZXcgRGlhbG9nVG9vbChpbWFnZUNhcmRUb29sQ29uZmlnRmFjdG9yeSk7XHJcblxyXG5cclxuIl19