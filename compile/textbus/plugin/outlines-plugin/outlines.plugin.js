import { fromEvent } from 'rxjs';
import { sampleTime } from '@tanbo/stream'; //renderer.js里的导入Subject来源应该改为rxjs
import { Layout } from '@textbus/editor';
import { createElement, createTextNode } from "@textbus/browser";
import { Renderer, RootComponentRef } from "@textbus/core";
export class OutlinesPlugin {
    constructor() {
        Object.defineProperty(this, "renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rootComponentRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "layout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "scroller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "container", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "links", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "btnWrapper", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "btn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_expand", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "boolDefaultExpand", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "subs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "leftContainer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
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
        this.leftContainer = createElement('div', {
            classes: ['textbus-ui-left']
        });
        //this.btnWrapper.style.float='right';
    }
    setup(injector) {
        this.layout = injector.get(Layout);
        this.layout.container.parentNode.prepend(this.leftContainer);
        this.renderer = injector.get(Renderer);
        this.scroller = this.layout.scroller;
        this.rootComponentRef = injector.get(RootComponentRef);
        //this.editor.host.prepend(this.container);
        //this.container.style.width=this.layout.container.clientWidth*0.3+'px';
        //this.container.style.height=this.layout.container.clientHeight+'px'
        this.leftContainer.appendChild(this.container);
        this.layout.bottom.appendChild(this.btnWrapper);
        this.expand = this.boolDefaultExpand;
        this.onUpdateOutlines();
        this.subs.push(fromEvent(this.btn, 'click').subscribe(() => {
            this.expand = !this.expand;
        }), this.renderer.onViewChecked.pipe(sampleTime(1000)).subscribe(() => this.onUpdateOutlines()));
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
    onUpdateOutlines() {
        const components = this.getHeadingComponents();
        const headingNativeNodes = components.map(component => {
            const VNode = this.renderer.getVNodeByComponent(component);
            const nativeNode = this.renderer.getNativeNodeByVNode(VNode);
            return nativeNode;
        });
        const children = Array.from(this.links.children);
        for (let i = headingNativeNodes.length; i < children.length; i++) {
            this.links.removeChild(children[i]);
        }
        for (let i = 0; i < headingNativeNodes.length; i++) {
            const h = headingNativeNodes[i];
            const child = children[i];
            if (child) {
                child.className = 'textbus-outlines-plugin-' + h.tagName.toLowerCase();
                const a = child.querySelector('a');
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
            if (component.name == 'HeadingComponent') {
                result.push(component);
            }
            component.slots.toArray().forEach(slot => {
                slot.content.data.forEach(childComponent => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZXMucGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGV4dGJ1cy9wbHVnaW4vb3V0bGluZXMtcGx1Z2luL291dGxpbmVzLnBsdWdpbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDLENBQUEsa0NBQWtDO0FBQzdFLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsYUFBYSxFQUFFLGNBQWMsRUFBUyxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQVcsTUFBTSxlQUFlLENBQUM7QUFFbkUsTUFBTSxPQUFPLGNBQWM7SUFrQnZCO1FBakJBOzs7OztXQUFzQjtRQUN0Qjs7Ozs7V0FBOEI7UUFFOUI7Ozs7O1dBQW9CO1FBQ3BCOzs7OztXQUFzQjtRQUV0Qjs7Ozs7V0FBdUI7UUFDdkI7Ozs7O1dBQW1CO1FBQ25COzs7OztXQUF3QjtRQUN4Qjs7Ozs7V0FBaUI7UUFFakI7Ozs7bUJBQXlCLEtBQUs7V0FBQztRQUMvQjs7OzttQkFBNEMsS0FBSztXQUFDO1FBRWxEOzs7OztXQUFrQjtRQUNsQjs7Ozs7V0FBMkI7UUFHdkIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxLQUFLLEVBQUU7WUFDbEMsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7WUFDcEMsUUFBUSxFQUFFO2dCQUNOLGFBQWEsQ0FBQyxJQUFJLEVBQUU7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLCtCQUErQixDQUFDO29CQUMxQyxRQUFRLEVBQUU7d0JBQ04sY0FBYyxDQUFDLElBQUksQ0FBQztxQkFDdkI7aUJBQ0osQ0FBQztnQkFDRixJQUFJ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bUV2ZW50IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHNhbXBsZVRpbWUgfSBmcm9tICdAdGFuYm8vc3RyZWFtJzsvL3JlbmRlcmVyLmpz6YeM55qE5a+85YWlU3ViamVjdOadpea6kOW6lOivpeaUueS4unJ4anNcclxuaW1wb3J0IHtMYXlvdXR9IGZyb20gJ0B0ZXh0YnVzL2VkaXRvcidcclxuaW1wb3J0IHtjcmVhdGVFbGVtZW50LCBjcmVhdGVUZXh0Tm9kZSwgUGx1Z2lufSBmcm9tIFwiQHRleHRidXMvYnJvd3NlclwiO1xyXG5pbXBvcnQge1JlbmRlcmVyLCBSb290Q29tcG9uZW50UmVmLCBWRWxlbWVudH0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBPdXRsaW5lc1BsdWdpbiBpbXBsZW1lbnRzIFBsdWdpbntcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IGFueTtcclxuICAgIHByaXZhdGUgcm9vdENvbXBvbmVudFJlZjogYW55O1xyXG5cclxuICAgIHByaXZhdGUgbGF5b3V0OiBhbnk7XHJcbiAgICBwcml2YXRlIHNjcm9sbGVyOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IGFueTtcclxuICAgIHByaXZhdGUgbGlua3M6IGFueTtcclxuICAgIHByaXZhdGUgYnRuV3JhcHBlcjogYW55O1xyXG4gICAgcHJpdmF0ZSBidG46IGFueTtcclxuXHJcbiAgICBwcml2YXRlIF9leHBhbmQ6IGJvb2xlYW49ZmFsc2U7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGJvb2xEZWZhdWx0RXhwYW5kOiBib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgc3ViczogYW55O1xyXG4gICAgbGVmdENvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnN1YnMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLW91dGxpbmVzLXBsdWdpbiddLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaDMnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLW91dGxpbmVzLXBsdWdpbi10aXRsZSddLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRleHROb2RlKFwi55uu5b2VXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtzID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1vdXRsaW5lcy1wbHVnaW4tbGlua3MnXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSxcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5idG5XcmFwcGVyID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtb3V0bGluZXMtcGx1Z2luLWJ0bi13cmFwcGVyJ10sXHJcblxyXG4gICAgICAgICAgICAvL3N0eWxlczpbYC50ZXh0YnVzLW91dGxpbmVzLXBsdWdpbi1idG4td3JhcHBlciB7ZmxvYXQ6bGVmdDt9YF0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtc3RhdHVzLWJhci1idG4nXSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfnm67lvZUnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLWljb24tdHJlZSddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGVmdENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLXVpLWxlZnQnXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy90aGlzLmJ0bldyYXBwZXIuc3R5bGUuZmxvYXQ9J3JpZ2h0JztcclxuICAgIH1cclxuICAgIHNldHVwKGluamVjdG9yKXtcclxuXHJcbiAgICAgICAgdGhpcy5sYXlvdXQ9aW5qZWN0b3IuZ2V0KExheW91dCk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQuY29udGFpbmVyLnBhcmVudE5vZGUucHJlcGVuZCh0aGlzLmxlZnRDb250YWluZXIpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXI9aW5qZWN0b3IuZ2V0KFJlbmRlcmVyKTtcclxuICAgICAgICB0aGlzLnNjcm9sbGVyPXRoaXMubGF5b3V0LnNjcm9sbGVyXHJcbiAgICAgICAgdGhpcy5yb290Q29tcG9uZW50UmVmID0gaW5qZWN0b3IuZ2V0KFJvb3RDb21wb25lbnRSZWYpO1xyXG5cclxuICAgICAgICAvL3RoaXMuZWRpdG9yLmhvc3QucHJlcGVuZCh0aGlzLmNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIC8vdGhpcy5jb250YWluZXIuc3R5bGUud2lkdGg9dGhpcy5sYXlvdXQuY29udGFpbmVyLmNsaWVudFdpZHRoKjAuMysncHgnO1xyXG4gICAgICAgIC8vdGhpcy5jb250YWluZXIuc3R5bGUuaGVpZ2h0PXRoaXMubGF5b3V0LmNvbnRhaW5lci5jbGllbnRIZWlnaHQrJ3B4J1xyXG5cclxuICAgICAgICB0aGlzLmxlZnRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0LmJvdHRvbS5hcHBlbmRDaGlsZCh0aGlzLmJ0bldyYXBwZXIpO1xyXG5cclxuICAgICAgICB0aGlzLmV4cGFuZD10aGlzLmJvb2xEZWZhdWx0RXhwYW5kO1xyXG4gICAgICAgIHRoaXMub25VcGRhdGVPdXRsaW5lcygpO1xyXG5cclxuICAgICAgICB0aGlzLnN1YnMucHVzaChcclxuICAgICAgICAgICAgZnJvbUV2ZW50KHRoaXMuYnRuLCAnY2xpY2snKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmQgPSAhdGhpcy5leHBhbmQ7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLm9uVmlld0NoZWNrZWQucGlwZShzYW1wbGVUaW1lKDEwMDApKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vblVwZGF0ZU91dGxpbmVzKCkpLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBzZXQgZXhwYW5kKGIpIHtcclxuICAgICAgICB0aGlzLl9leHBhbmQgPSBiO1xyXG4gICAgICAgIGlmIChiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuLmNsYXNzTGlzdC5hZGQoJ3RleHRidXMtc3RhdHVzLWJhci1idG4tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS53aWR0aCA9IHRoaXMubGF5b3V0LndvcmtiZW5jaC5vZmZzZXRXaWR0aCAqIDAuMiArICdweCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmJ0bi5jbGFzc0xpc3QucmVtb3ZlKCd0ZXh0YnVzLXN0YXR1cy1iYXItYnRuLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCBleHBhbmQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cGFuZDtcclxuICAgIH1cclxuICAgIG9uVXBkYXRlT3V0bGluZXMoKXtcclxuICAgICAgICBjb25zdCBjb21wb25lbnRzID0gdGhpcy5nZXRIZWFkaW5nQ29tcG9uZW50cygpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRpbmdOYXRpdmVOb2RlcyA9IGNvbXBvbmVudHMubWFwKGNvbXBvbmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IFZOb2RlPXRoaXMucmVuZGVyZXIuZ2V0Vk5vZGVCeUNvbXBvbmVudChjb21wb25lbnQpO1xyXG4gICAgICAgICAgICBjb25zdCBuYXRpdmVOb2RlPXRoaXMucmVuZGVyZXIuZ2V0TmF0aXZlTm9kZUJ5Vk5vZGUoVk5vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlTm9kZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IEFycmF5LmZyb20odGhpcy5saW5rcy5jaGlsZHJlbik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGhlYWRpbmdOYXRpdmVOb2Rlcy5sZW5ndGg7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxpbmtzLnJlbW92ZUNoaWxkKGNoaWxkcmVuW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkaW5nTmF0aXZlTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgaCA9IGhlYWRpbmdOYXRpdmVOb2Rlc1tpXSA7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV0gYXMgRWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5jbGFzc05hbWUgPSAndGV4dGJ1cy1vdXRsaW5lcy1wbHVnaW4tJyArIGgudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYSA9IGNoaWxkLnF1ZXJ5U2VsZWN0b3IoJ2EnKSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICBhLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9oLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsZXIuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMuZ2V0VG9wRGlzdGFuY2UoaClcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgYS5pbm5lclRleHQgPSBoLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGEgPSBjcmVhdGVFbGVtZW50KCdhJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICdqYXZhc2NyaXB0OjsnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW2NyZWF0ZVRleHROb2RlKGguaW5uZXJUZXh0KV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbGVyLnNjcm9sbFRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLmdldFRvcERpc3RhbmNlKGgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluayA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtb3V0bGluZXMtcGx1Z2luLScgKyBoLnRhZ05hbWUudG9Mb3dlckNhc2UoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFthXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtzLmFwcGVuZENoaWxkKGxpbmspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0SGVhZGluZ0NvbXBvbmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IFtdO1xyXG4gICAgICAgIGZ1bmN0aW9uIGZuKGNvbXBvbmVudCwgcmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coY29tcG9uZW50KTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjb21wb25lbnQudGFnTmFtZSk7XHJcbiAgICAgICAgICAgIC8vaWYgKC9oWzEtNl0vLnRlc3QoY29tcG9uZW50LnRhZ05hbWUpKSB7XHJcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQubmFtZT09J0hlYWRpbmdDb21wb25lbnQnKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb21wb25lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5zbG90cy50b0FycmF5KCkuZm9yRWFjaChzbG90ID0+IHtcclxuICAgICAgICAgICAgICAgIHNsb3QuY29udGVudC5kYXRhLmZvckVhY2goY2hpbGRDb21wb25lbnQ9PntcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNoaWxkQ29tcG9uZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZuKGNoaWxkQ29tcG9uZW50LCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZuKGksIHJlc3VsdCk7Ki9cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZuKHRoaXMucm9vdENvbXBvbmVudFJlZi5jb21wb25lbnQsIGNvbXBvbmVudHMpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coY29tcG9uZW50cyk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudHM7XHJcbiAgICB9XHJcbiAgICBnZXRUb3BEaXN0YW5jZShlbCkge1xyXG4gICAgICAgIGxldCBpID0gZWwub2Zmc2V0VG9wO1xyXG4gICAgICAgIHdoaWxlIChlbC5vZmZzZXRQYXJlbnQpIHtcclxuICAgICAgICAgICAgZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XHJcbiAgICAgICAgICAgIGkgKz0gZWwub2Zmc2V0VG9wO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaTtcclxuICAgIH1cclxufVxyXG4iXX0=