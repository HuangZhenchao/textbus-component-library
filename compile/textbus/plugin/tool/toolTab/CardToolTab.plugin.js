import { createElement } from "@textbus/browser";
import { ButtonTool, ToolType } from "@textbus/editor";
import { auditTime, fromEvent, merge, Observable, Subject } from "@tanbo/stream";
import { alertExample, Tab } from "../../../_public-api";
import { ButtonCardTool, DialogCardTool } from "./card-tool";
import { Renderer, Selection } from "@textbus/core";
import { createKeymap } from "@textbus/editor/bundles/toolbar/toolkit/_utils/_create-keymap";
export class CardToolTab {
    constructor(injector, tooTabPanels) {
        Object.defineProperty(this, "elementRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "injector", {
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
        Object.defineProperty(this, "checkEvent", {
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
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "keymapPrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.injector = injector;
        const selection = injector.get(Selection);
        const renderer = injector.get(Renderer);
        this.onCancel = new Observable();
        this.checkEvent = new Subject();
        this.onComplete = this.checkEvent.asObservable();
        this.elementRef = createElement('div', {
            classes: ['textbus-component-stage'],
            children: [
                this.keymapPrompt = createElement('div', {
                    classes: ['textbus-toolbar-keymap-prompt']
                })
            ]
        });
        const tab = new Tab({});
        tab.show(tooTabPanels.map(panel => {
            console.log(panel);
            const view = createElement('div', {
                classes: ['textbus-component-stage-list']
            });
            panel.items.forEach(item => {
                //var config=Object.assign(item.config)
                var tool;
                console.log("panel.items", item, alertExample);
                switch (item.config.type) {
                    case ToolType.Button:
                        tool = new ButtonCardTool(item.toolFactory, item.config);
                        break;
                    case ToolType.Dialog:
                        tool = new DialogCardTool(item.toolFactory, item.config);
                        break;
                    default:
                        tool = new ButtonTool(item.toolFactory);
                        break;
                }
                this.tools.push(tool);
                view.appendChild(tool.setup(injector));
            });
            return {
                label: panel.category,
                view
            };
        }));
        this.elementRef.appendChild(tab.elementRef);
        merge(selection.onChange, renderer.onViewChecked).pipe(auditTime(100)).subscribe(() => {
            this.tools.forEach(tool => {
                tool.refreshState();
            });
        });
        fromEvent(this.elementRef, 'mouseover').subscribe(ev => {
            const keymap = this.findNeedShowKeymapHandler(ev.target);
            if (keymap) {
                try {
                    const config = JSON.parse(keymap);
                    this.keymapPrompt.innerHTML = '';
                    this.keymapPrompt.append(...createKeymap(config));
                    this.keymapPrompt.classList.add('textbus-toolbar-keymap-prompt-show');
                    return;
                }
                catch (e) {
                    //
                }
            }
            this.keymapPrompt.classList.remove('textbus-toolbar-keymap-prompt-show');
        });
    }
    findNeedShowKeymapHandler(el) {
        if (el === this.elementRef) {
            return '';
        }
        if (el.dataset.keymap) {
            return el.dataset.keymap;
        }
        return this.findNeedShowKeymapHandler(el.parentNode);
    }
    update() {
        //
    }
    reset() {
        //
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZFRvb2xUYWIucGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdGV4dGJ1cy9wbHVnaW4vdG9vbC90b29sVGFiL0NhcmRUb29sVGFiLnBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFrQixNQUFNLGtCQUFrQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxVQUFVLEVBQVEsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakYsT0FBTyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV6RCxPQUFPLEVBQUMsY0FBYyxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUU1RCxPQUFPLEVBQUUsUUFBUSxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0RBQStELENBQUE7QUFDMUYsTUFBTSxPQUFPLFdBQVc7SUFRcEIsWUFBWSxRQUFRLEVBQUMsWUFBMkI7UUFQaEQ7Ozs7O1dBQXdCO1FBQ3hCOzs7OztXQUFzQjtRQUN0Qjs7Ozs7V0FBYztRQUNkOzs7OztXQUFnQjtRQUNoQjs7Ozs7V0FBZ0I7UUFDaEI7Ozs7bUJBQWEsRUFBRTtXQUFDO1FBQ2hCOzs7OztXQUEwQjtRQUV0QixJQUFJLENBQUMsUUFBUSxHQUFDLFFBQVEsQ0FBQztRQUN2QixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FB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QUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO29CQUN0RSxPQUFPO2lCQUNWO2dCQUNELE9BQU8sQ0FBQyxFQUFFO29CQUNOLEVBQUU7aUJBQ0w7YUFDSjtZQUNELElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQzdFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELHlCQUF5QixDQUFDLEVBQUU7UUFDeEIsSUFBSSxFQUFFLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN4QixPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNuQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1NBQzVCO1FBQ0QsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFDRCxNQUFNO1FBQ0YsRUFBRTtJQUNOLENBQUM7SUFDRCxLQUFLO1FBQ0QsRUFBRTtJQUNOLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGNyZWF0ZVRleHROb2RlIH0gZnJvbSBcIkB0ZXh0YnVzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHsgQnV0dG9uVG9vbCwgVG9vbCwgVG9vbFR5cGUgfSBmcm9tIFwiQHRleHRidXMvZWRpdG9yXCI7XHJcbmltcG9ydCB7IGF1ZGl0VGltZSwgZnJvbUV2ZW50LCBtZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gXCJAdGFuYm8vc3RyZWFtXCI7XHJcbmltcG9ydCB7IGFsZXJ0RXhhbXBsZSwgVGFiIH0gZnJvbSBcIi4uLy4uLy4uL19wdWJsaWMtYXBpXCI7XHJcbmltcG9ydCB7IFRvb2xUYWJQYW5lbCwgVG9vbFRhYkl0ZW0gfSBmcm9tIFwiLi90eXBlXCI7XHJcbmltcG9ydCB7QnV0dG9uQ2FyZFRvb2wsIERpYWxvZ0NhcmRUb29sIH0gZnJvbSBcIi4vY2FyZC10b29sXCI7XHJcbmltcG9ydCB7IEJ1dHRvblRvb2xDb25maWcsIERpYWxvZ1Rvb2xDb25maWcgfSBmcm9tIFwiQHRleHRidXMvZWRpdG9yXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyLFNlbGVjdGlvbn0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuaW1wb3J0IHtjcmVhdGVLZXltYXB9IGZyb20gXCJAdGV4dGJ1cy9lZGl0b3IvYnVuZGxlcy90b29sYmFyL3Rvb2xraXQvX3V0aWxzL19jcmVhdGUta2V5bWFwXCJcclxuZXhwb3J0IGNsYXNzIENhcmRUb29sVGFie1xyXG4gICAgZWxlbWVudFJlZjogSFRNTEVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIGluamVjdG9yOiBhbnk7XHJcbiAgICBvbkNhbmNlbDogYW55O1xyXG4gICAgY2hlY2tFdmVudDogYW55O1xyXG4gICAgb25Db21wbGV0ZTogYW55O1xyXG4gICAgdG9vbHM6VG9vbFtdPVtdO1xyXG4gICAga2V5bWFwUHJvbXB0OiBIVE1MRWxlbWVudDtcclxuICAgIGNvbnN0cnVjdG9yKGluamVjdG9yLHRvb1RhYlBhbmVsczpUb29sVGFiUGFuZWxbXSkge1xyXG4gICAgICAgIHRoaXMuaW5qZWN0b3I9aW5qZWN0b3I7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gaW5qZWN0b3IuZ2V0KFNlbGVjdGlvbik7XHJcbiAgICAgICAgY29uc3QgcmVuZGVyZXIgPSBpbmplY3Rvci5nZXQoUmVuZGVyZXIpO1xyXG4gICAgICAgIHRoaXMub25DYW5jZWwgPSBuZXcgT2JzZXJ2YWJsZSgpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tFdmVudCA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICAgICAgdGhpcy5vbkNvbXBsZXRlID0gdGhpcy5jaGVja0V2ZW50LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLWNvbXBvbmVudC1zdGFnZSddLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXltYXBQcm9tcHQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLXRvb2xiYXIta2V5bWFwLXByb21wdCddXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgdGFiID0gbmV3IFRhYih7fSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGFiLnNob3codG9vVGFiUGFuZWxzLm1hcChwYW5lbCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhbmVsKVxyXG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLWNvbXBvbmVudC1zdGFnZS1saXN0J11cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHBhbmVsLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBjb25maWc9T2JqZWN0LmFzc2lnbihpdGVtLmNvbmZpZylcclxuICAgICAgICAgICAgICAgIHZhciB0b29sO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwYW5lbC5pdGVtc1wiLGl0ZW0sYWxlcnRFeGFtcGxlKVxyXG4gICAgICAgICAgICAgICAgc3dpdGNoKGl0ZW0uY29uZmlnLnR5cGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVG9vbFR5cGUuQnV0dG9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sPSBuZXcgQnV0dG9uQ2FyZFRvb2woaXRlbS50b29sRmFjdG9yeSxpdGVtLmNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVG9vbFR5cGUuRGlhbG9nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sPSBuZXcgRGlhbG9nQ2FyZFRvb2woaXRlbS50b29sRmFjdG9yeSxpdGVtLmNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2w9IG5ldyBCdXR0b25Ub29sKGl0ZW0udG9vbEZhY3RvcnkgYXMgKGluamVjdG9yKT0+QnV0dG9uVG9vbENvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b29scy5wdXNoKHRvb2wpO1xyXG4gICAgICAgICAgICAgICAgdmlldy5hcHBlbmRDaGlsZCh0b29sLnNldHVwKGluamVjdG9yKSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogcGFuZWwuY2F0ZWdvcnksXHJcbiAgICAgICAgICAgICAgICB2aWV3XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5hcHBlbmRDaGlsZCh0YWIuZWxlbWVudFJlZik7XHJcblxyXG4gICAgICAgIG1lcmdlKHNlbGVjdGlvbi5vbkNoYW5nZSwgcmVuZGVyZXIub25WaWV3Q2hlY2tlZCkucGlwZShhdWRpdFRpbWUoMTAwKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50b29scy5mb3JFYWNoKHRvb2wgPT4ge1xyXG4gICAgICAgICAgICAgICAgdG9vbC5yZWZyZXNoU3RhdGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuZWxlbWVudFJlZiwgJ21vdXNlb3ZlcicpLnN1YnNjcmliZShldiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleW1hcCA9IHRoaXMuZmluZE5lZWRTaG93S2V5bWFwSGFuZGxlcihldi50YXJnZXQpO1xyXG4gICAgICAgICAgICBpZiAoa2V5bWFwKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IEpTT04ucGFyc2Uoa2V5bWFwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleW1hcFByb21wdC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleW1hcFByb21wdC5hcHBlbmQoLi4uY3JlYXRlS2V5bWFwKGNvbmZpZykpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5bWFwUHJvbXB0LmNsYXNzTGlzdC5hZGQoJ3RleHRidXMtdG9vbGJhci1rZXltYXAtcHJvbXB0LXNob3cnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5rZXltYXBQcm9tcHQuY2xhc3NMaXN0LnJlbW92ZSgndGV4dGJ1cy10b29sYmFyLWtleW1hcC1wcm9tcHQtc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZmluZE5lZWRTaG93S2V5bWFwSGFuZGxlcihlbCkge1xyXG4gICAgICAgIGlmIChlbCA9PT0gdGhpcy5lbGVtZW50UmVmKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVsLmRhdGFzZXQua2V5bWFwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbC5kYXRhc2V0LmtleW1hcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZE5lZWRTaG93S2V5bWFwSGFuZGxlcihlbC5wYXJlbnROb2RlKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICAvL1xyXG4gICAgfVxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgLy9cclxuICAgIH1cclxufSJdfQ==