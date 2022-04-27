import { createElement, createTextNode } from "@textbus/browser";
import { Subject } from "@tanbo/stream";
import { Tab } from "../tab";
export class TabForm {
    constructor(config) {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "title", {
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
        Object.defineProperty(this, "items", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = config.name;
        this.title = config.title;
        this.items = config.items;
        this.elementRef = createElement("div", {
            children: this.items.map(item => {
                return item.elementRef;
            })
        });
    }
    getValue() {
        const values = {};
        this.items.forEach(item => {
            let attr = item.getAttr();
            values[attr.name] = attr.value;
        });
        return values;
    }
    ;
}
export class TabViewControl {
    constructor(injector, config) {
        Object.defineProperty(this, "elementRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "body", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "footer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tab", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "btnSubmit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "btnCancel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "completeEvent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cancelEvent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onComplete", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onCancel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.config = config;
        this.completeEvent = new Subject();
        this.cancelEvent = new Subject();
        this.onComplete = this.completeEvent.asObservable();
        this.onCancel = this.cancelEvent.asObservable();
        this.tab = new Tab({ width: "500px", height: "560px" });
        this.elementRef = createElement('div');
        this.elementRef.appendChild(createElement('h3', {
            classes: ['textbus-form-title'],
            children: [createTextNode(config.title)]
        }));
        this.body = createElement('div');
        this.body.append(this.tab.elementRef);
        this.elementRef.appendChild(this.body);
        this.tab.show(this.config.tabForms.map(view => {
            return {
                label: view.title,
                view: view.elementRef
            };
        }));
        this.btnSubmit = createElement('button', {
            attrs: {
                type: 'submit'
            },
            classes: ['textbus-btn', 'textbus-btn-primary'],
            children: [createTextNode(config.confirmBtnText || '确定')]
        }),
            this.btnSubmit.addEventListener('click', () => {
                const values = {};
                config.tabForms.forEach(view => {
                    values[view.name] = view.getValue();
                });
                if (values == null) {
                    //return;
                }
                this.completeEvent.next(values);
            });
        this.btnCancel = createElement('button', {
            classes: ['textbus-btn', 'textbus-btn-default'],
            attrs: {
                type: 'button'
            },
            children: [createTextNode(config.cancelBtnText || '取消')]
        });
        this.btnCancel.addEventListener('click', () => {
            this.cancelEvent.next();
        });
        this.elementRef.appendChild(this.footer = createElement('div', {
            classes: ['textbus-form-footer'],
            children: [this.btnSubmit, this.btnCancel]
        }));
    }
    reset() {
    }
    update(newValue) {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiRm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RleHRidXMvdXRpbHMvZm9ybS90YWJGb3JtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR2pFLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQU03QixNQUFNLE9BQU8sT0FBTztJQU1oQixZQUFZLE1BQW9CO1FBTGhDOzs7OztXQUFZO1FBQ1o7Ozs7O1dBQWE7UUFDYjs7Ozs7V0FBdUI7UUFDdkI7Ozs7O1dBQWlCO1FBR2IsSUFBSSxDQUFDLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBQyxhQUFhLENBQUMsS0FBSyxFQUMvQjtZQUNJLFFBQVEsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUEsRUFBRTtnQkFDMUIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBO1lBQzFCLENBQUMsQ0FBQztTQUNMLENBQ0osQ0FBQTtJQUNMLENBQUM7SUFDRCxRQUFRO1FBQ0osTUFBTSxNQUFNLEdBQUMsRUFBRSxDQUFBO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBLEVBQUU7WUFDckIsSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUVoQyxDQUFDLENBQUMsQ0FBQTtRQUNG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LFFBQVEsRUFBRTtZQUNyQyxPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUscUJBQXFCLENBQUM7WUFDL0MsS0FBSyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2FBQ2I7WUFDRCxRQUFRLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQztTQUMzRCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLEtBQUssRUFBRTtZQUMzRCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNoQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDN0MsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBQ0QsS0FBSztJQUVMLENBQUM7SUFDRCxNQUFNLENBQUMsUUFBNkI7SUFFcEMsQ0FBQztDQUVGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgY3JlYXRlVGV4dE5vZGUgfSBmcm9tIFwiQHRleHRidXMvYnJvd3NlclwiO1xyXG5pbXBvcnQgeyBJbmplY3RvciB9IGZyb20gXCJAdGV4dGJ1cy9jb3JlXCI7XHJcbmltcG9ydCB7IEZvcm1JdGVtLCBWaWV3Q29udHJvbGxlciB9IGZyb20gXCJAdGV4dGJ1cy9lZGl0b3JcIjtcclxuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gXCJAdGFuYm8vc3RyZWFtXCI7XHJcbmltcG9ydCB7IFRhYiB9IGZyb20gXCIuLi90YWJcIjtcclxuZXhwb3J0IGludGVyZmFjZSBUYWJWaWV3Q29uZmlne1xyXG4gICAgbmFtZTpzdHJpbmc7XHJcbiAgICB0aXRsZTpzdHJpbmc7XHJcbiAgICBpdGVtczpGb3JtSXRlbVtdXHJcbn1cclxuZXhwb3J0IGNsYXNzIFRhYkZvcm17XHJcbiAgICBuYW1lOnN0cmluZztcclxuICAgIHRpdGxlOnN0cmluZztcclxuICAgIGVsZW1lbnRSZWY6SFRNTEVsZW1lbnQ7XHJcbiAgICBpdGVtczpGb3JtSXRlbVtdO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6VGFiVmlld0NvbmZpZyl7XHJcbiAgICAgICAgdGhpcy5uYW1lPWNvbmZpZy5uYW1lO1xyXG4gICAgICAgIHRoaXMudGl0bGU9Y29uZmlnLnRpdGxlO1xyXG4gICAgICAgIHRoaXMuaXRlbXM9Y29uZmlnLml0ZW1zO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZj1jcmVhdGVFbGVtZW50KFwiZGl2XCIsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOnRoaXMuaXRlbXMubWFwKGl0ZW09PntcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5lbGVtZW50UmVmXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgZ2V0VmFsdWUoKXtcclxuICAgICAgICBjb25zdCB2YWx1ZXM9e31cclxuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goaXRlbT0+e1xyXG4gICAgICAgICAgICBsZXQgYXR0cj1pdGVtLmdldEF0dHIoKVxyXG4gICAgICAgICAgICB2YWx1ZXNbYXR0ci5uYW1lXT1hdHRyLnZhbHVlXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gdmFsdWVzXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhYlZpZXdDb250cm9sQ29uZmlne1xyXG4gICAgdGl0bGU6c3RyaW5nO1xyXG4gICAgY29uZmlybUJ0blRleHQ/OnN0cmluZztcclxuICAgIGNhbmNlbEJ0blRleHQ/OnN0cmluZztcclxuICAgIHRhYkZvcm1zOlRhYkZvcm1bXTtcclxufVxyXG5leHBvcnQgY2xhc3MgVGFiVmlld0NvbnRyb2wgaW1wbGVtZW50cyBWaWV3Q29udHJvbGxlcjxSZWNvcmQ8c3RyaW5nLCBhbnk+PntcclxuICAgIGVsZW1lbnRSZWY6IEhUTUxFbGVtZW50O1xyXG4gICAgYm9keTogSFRNTEVsZW1lbnQ7XHJcbiAgICBmb290ZXI6IEhUTUxFbGVtZW50O1xyXG4gICAgdGFiOiBUYWI7XHJcbiAgICBidG5TdWJtaXQ6IEhUTUxFbGVtZW50O1xyXG4gICAgYnRuQ2FuY2VsOiBIVE1MRWxlbWVudDtcclxuICAgIHByaXZhdGUgY29tcGxldGVFdmVudDogU3ViamVjdDxhbnk+O1xyXG4gICAgcHJpdmF0ZSBjYW5jZWxFdmVudDogU3ViamVjdDx2b2lkPjtcclxuICAgIG9uQ29tcGxldGU6IE9ic2VydmFibGU8UmVjb3JkPHN0cmluZywgYW55Pj47XHJcbiAgICBvbkNhbmNlbDogT2JzZXJ2YWJsZTx2b2lkPjtcclxuICAgIGNvbmZpZzogVGFiVmlld0NvbnRyb2xDb25maWc7XHJcbiAgXHJcbiAgICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IsIGNvbmZpZzpUYWJWaWV3Q29udHJvbENvbmZpZykge1xyXG4gICAgICAgIHRoaXMuY29uZmlnPWNvbmZpZztcclxuICAgICAgICB0aGlzLmNvbXBsZXRlRXZlbnQgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgICAgIHRoaXMuY2FuY2VsRXZlbnQgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgICAgIHRoaXMub25Db21wbGV0ZSA9IHRoaXMuY29tcGxldGVFdmVudC5hc09ic2VydmFibGUoKTtcclxuICAgICAgICB0aGlzLm9uQ2FuY2VsID0gdGhpcy5jYW5jZWxFdmVudC5hc09ic2VydmFibGUoKTtcclxuICAgICAgICB0aGlzLnRhYiA9IG5ldyBUYWIoe3dpZHRoOlwiNTAwcHhcIixoZWlnaHQ6XCI1NjBweFwifSk7XHJcbiAgICBcclxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYgPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnaDMnLCB7XHJcbiAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1mb3JtLXRpdGxlJ10sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbY3JlYXRlVGV4dE5vZGUoY29uZmlnLnRpdGxlKV1cclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5ib2R5ID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmFwcGVuZCh0aGlzLnRhYi5lbGVtZW50UmVmKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYuYXBwZW5kQ2hpbGQodGhpcy5ib2R5KTtcclxuICAgICAgICB0aGlzLnRhYi5zaG93KFxyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy50YWJGb3Jtcy5tYXAodmlldz0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDp2aWV3LnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6dmlldy5lbGVtZW50UmVmXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICAgIHRoaXMuYnRuU3VibWl0ID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG4gICAgICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICB0eXBlOiAnc3VibWl0J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtYnRuJywgJ3RleHRidXMtYnRuLXByaW1hcnknXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtjcmVhdGVUZXh0Tm9kZShjb25maWcuY29uZmlybUJ0blRleHQgfHwgJ+ehruWumicpXVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRoaXMuYnRuU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZXM9e31cclxuICAgICAgICAgICAgY29uZmlnLnRhYkZvcm1zLmZvckVhY2godmlldz0+e1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzW3ZpZXcubmFtZV09dmlldy5nZXRWYWx1ZSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9yZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUV2ZW50Lm5leHQodmFsdWVzKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuYnRuQ2FuY2VsID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG4gICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtYnRuJywgJ3RleHRidXMtYnRuLWRlZmF1bHQnXSxcclxuICAgICAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtjcmVhdGVUZXh0Tm9kZShjb25maWcuY2FuY2VsQnRuVGV4dCB8fCAn5Y+W5raIJyldXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5idG5DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsRXZlbnQubmV4dCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5hcHBlbmRDaGlsZCh0aGlzLmZvb3RlciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLWZvcm0tZm9vdGVyJ10sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbdGhpcy5idG5TdWJtaXQsIHRoaXMuYnRuQ2FuY2VsXVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuICAgIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgdXBkYXRlKG5ld1ZhbHVlOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZCB7XHJcbiAgXHJcbiAgICB9XHJcbiAgXHJcbiAgfSJdfQ==