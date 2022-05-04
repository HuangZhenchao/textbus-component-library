import { createElement, createTextNode } from '@textbus/browser';
export function createCard(config) {
    const exampleContent = document.createElement('div');
    exampleContent.classList.add('textbus-component-example-content');
    if (typeof config.card === 'string') {
        exampleContent.innerHTML = config.card;
    }
    else if (config.card instanceof HTMLElement) {
        exampleContent.appendChild(config.card);
    }
    /*
    const exampleLabel = document.createElement('div');
    exampleContent.classList.add('textbus-component-example-label');
    if (typeof content === 'string') {
        exampleContent.innerHTML = content;
    }
    else if (content instanceof HTMLElement) {
        exampleContent.appendChild(content);
    }
    */
    const wrapper = createElement('button', {
        styles: {
            "background-color": "#fff",
            "border": "none"
        },
        classes: ["textbus-component-example-item"],
        attrs: {
            title: config.tooltip || '',
            type: 'button',
            'data-keymap': JSON.stringify(config.keymap)
        },
        children: [
            createElement('div', {
                classes: ["textbus-component-example"],
                children: [
                    exampleContent,
                    createElement('div', {
                        classes: ["textbus-component-example-mask"]
                    })
                ]
            }),
            createElement('div', {
                classes: ["textbus-component-example-name"],
                children: [createTextNode(config.label !== undefined ? config.label : (config.tooltip == undefined ? "组件" : config.tooltip))]
            })
        ]
    });
    let highlight = false;
    let disabled = false;
    return {
        elementRef: wrapper,
        get highlight() {
            return highlight;
        },
        set highlight(v) {
            highlight = v;
            if (v) {
                wrapper.classList.add('textbus-toolbar-button-active');
            }
            else {
                wrapper.classList.remove('textbus-toolbar-button-active');
            }
        },
        get disabled() {
            return disabled;
        },
        set disabled(v) {
            disabled = v;
            wrapper.disabled = v;
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RleHRidXMvcGx1Z2luL3Rvb2wvdG9vbFRhYi9jYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFlakUsTUFBTSxVQUFVLFVBQVUsQ0FBQyxNQUFtQjtJQUMxQyxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JELGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDbEUsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQ2pDLGNBQWMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztLQUMxQztTQUNJLElBQUksTUFBTSxDQUFDLElBQUksWUFBWSxXQUFXLEVBQUU7UUFDekMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0M7SUFDRDs7Ozs7Ozs7O01BU0U7SUFDRixNQUFNLE9BQU8sR0FBRSxhQUFhLENBQUMsUUFBUSxFQUFDO1FBQ2xDLE1BQU0sRUFBQztZQUNILGtCQUFrQixFQUFDLE1BQU07WUFDekIsUUFBUSxFQUFDLE1BQU07U0FDbEI7UUFDRCxPQUFPLEVBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQztRQUMxQyxLQUFLLEVBQUU7WUFDSCxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFO1lBQzNCLElBQUksRUFBRSxRQUFRO1lBQ2QsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUMvQztRQUNELFFBQVEsRUFBQztZQUNMLGFBQWEsQ0FBQyxLQUFLLEVBQUM7Z0JBQ2hCLE9BQU8sRUFBQyxDQUFDLDJCQUEyQixDQUFDO2dCQUNyQyxRQUFRLEVBQUM7b0JBQ0wsY0FBYztvQkFDZCxhQUFhLENBQUMsS0FBSyxFQUFDO3dCQUNoQixPQUFPLEVBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQztxQkFDN0MsQ0FBQztpQkFDTDthQUNKLENBQUM7WUFDRixhQUFhLENBQUMsS0FBSyxFQUFDO2dCQUNoQixPQUFPLEVBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQztnQkFDMUMsUUFBUSxFQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUcsU0FBUyxDQUFBLENBQUMsQ0FBQSxNQUFNLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUUsU0FBUyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUEsQ0FBQyxDQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ25ILENBQUM7U0FDTDtLQUNKLENBQXNCLENBQUM7SUFFeEIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNyQixPQUFPO1FBQ0gsVUFBVSxFQUFDLE9BQU87UUFDbEIsSUFBSSxTQUFTO1lBQ1QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNELElBQUksU0FBUyxDQUFDLENBQUM7WUFDWCxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLEVBQUU7Z0JBQ0gsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQzthQUMxRDtpQkFDSTtnQkFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO2FBQzdEO1FBQ0wsQ0FBQztRQUNELElBQUksUUFBUTtZQUNSLE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxDQUFDO1lBQ1YsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUNiLE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7S0FDSixDQUFBO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGNyZWF0ZVRleHROb2RlIH0gZnJvbSAnQHRleHRidXMvYnJvd3Nlcic7XHJcbmltcG9ydCB7IEtleW1hcCB9IGZyb20gJ0B0ZXh0YnVzL2NvcmUnO1xyXG5leHBvcnQgaW50ZXJmYWNlIFVJQ2FyZENvbmZpZ3tcclxuICAgIGxhYmVsPzpzdHJpbmc7XHJcbiAgICB0b29sdGlwPzpzdHJpbmc7XHJcbiAgICBjYXJkPzpIVE1MRWxlbWVudHxzdHJpbmdcclxuICAgIG9uY2xpY2soKTp2b2lkO1xyXG4gICAga2V5bWFwPzogS2V5bWFwO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgVUlDYXJke1xyXG4gICAgZWxlbWVudFJlZjogSFRNTEVsZW1lbnQ7XHJcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIGhpZ2hsaWdodDogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNhcmQoY29uZmlnOlVJQ2FyZENvbmZpZyk6VUlDYXJke1xyXG4gICAgY29uc3QgZXhhbXBsZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGV4YW1wbGVDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3RleHRidXMtY29tcG9uZW50LWV4YW1wbGUtY29udGVudCcpO1xyXG4gICAgaWYgKHR5cGVvZiBjb25maWcuY2FyZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBleGFtcGxlQ29udGVudC5pbm5lckhUTUwgPSBjb25maWcuY2FyZDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGNvbmZpZy5jYXJkIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBleGFtcGxlQ29udGVudC5hcHBlbmRDaGlsZChjb25maWcuY2FyZCk7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgY29uc3QgZXhhbXBsZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBleGFtcGxlQ29udGVudC5jbGFzc0xpc3QuYWRkKCd0ZXh0YnVzLWNvbXBvbmVudC1leGFtcGxlLWxhYmVsJyk7XHJcbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgZXhhbXBsZUNvbnRlbnQuaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGV4YW1wbGVDb250ZW50LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xyXG4gICAgfVxyXG4gICAgKi9cclxuICAgIGNvbnN0IHdyYXBwZXIgPWNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicse1xyXG4gICAgICAgIHN0eWxlczp7XHJcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwiLFxyXG4gICAgICAgICAgICBcImJvcmRlclwiOlwibm9uZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGFzc2VzOltcInRleHRidXMtY29tcG9uZW50LWV4YW1wbGUtaXRlbVwiXSxcclxuICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICB0aXRsZTogY29uZmlnLnRvb2x0aXAgfHwgJycsXHJcbiAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxyXG4gICAgICAgICAgICAnZGF0YS1rZXltYXAnOiBKU09OLnN0cmluZ2lmeShjb25maWcua2V5bWFwKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hpbGRyZW46W1xyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLHtcclxuICAgICAgICAgICAgICAgIGNsYXNzZXM6W1widGV4dGJ1cy1jb21wb25lbnQtZXhhbXBsZVwiXSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOltcclxuICAgICAgICAgICAgICAgICAgICBleGFtcGxlQ29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczpbXCJ0ZXh0YnVzLWNvbXBvbmVudC1leGFtcGxlLW1hc2tcIl1cclxuICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2Rpdicse1xyXG4gICAgICAgICAgICAgICAgY2xhc3NlczpbXCJ0ZXh0YnVzLWNvbXBvbmVudC1leGFtcGxlLW5hbWVcIl0sXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjpbY3JlYXRlVGV4dE5vZGUoY29uZmlnLmxhYmVsIT09dW5kZWZpbmVkP2NvbmZpZy5sYWJlbDooY29uZmlnLnRvb2x0aXA9PXVuZGVmaW5lZD9cIue7hOS7tlwiOmNvbmZpZy50b29sdGlwKSldXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXVxyXG4gICAgfSkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gICAgbGV0IGhpZ2hsaWdodCA9IGZhbHNlO1xyXG4gICAgbGV0IGRpc2FibGVkID0gZmFsc2U7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGVsZW1lbnRSZWY6d3JhcHBlcixcclxuICAgICAgICBnZXQgaGlnaGxpZ2h0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaGlnaGxpZ2h0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0IGhpZ2hsaWdodCh2KSB7XHJcbiAgICAgICAgICAgIGhpZ2hsaWdodCA9IHY7XHJcbiAgICAgICAgICAgIGlmICh2KSB7XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3RleHRidXMtdG9vbGJhci1idXR0b24tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3RleHRidXMtdG9vbGJhci1idXR0b24tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCBkaXNhYmxlZCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRpc2FibGVkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0IGRpc2FibGVkKHYpIHtcclxuICAgICAgICAgICAgZGlzYWJsZWQgPSB2O1xyXG4gICAgICAgICAgICB3cmFwcGVyLmRpc2FibGVkID0gdjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=