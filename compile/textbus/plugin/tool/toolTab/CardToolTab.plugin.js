import { createElement } from "@textbus/browser";
import { ButtonTool, ToolType } from "@textbus/editor";
import { auditTime, fromEvent, merge, Observable, Subject } from "@tanbo/stream";
import { Tab } from "../../../_public-api";
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
            const view = createElement('div', {
                classes: ['textbus-component-stage-list']
            });
            panel.items.forEach(item => {
                //var config=Object.assign(item.config)
                var tool;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZFRvb2xUYWIucGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdGV4dGJ1cy9wbHVnaW4vdG9vbC90b29sVGFiL0NhcmRUb29sVGFiLnBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFrQixNQUFNLGtCQUFrQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxVQUFVLEVBQVEsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakYsT0FBTyxFQUFnQixHQUFHLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV6RCxPQUFPLEVBQUMsY0FBYyxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUU1RCxPQUFPLEVBQUUsUUFBUSxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0RBQStELENBQUE7QUFDMUYsTUFBTSxPQUFPLFdBQVc7SUFRcEIsWUFBWSxRQUFRLEVBQUMsWUFBMkI7UUFQaEQ7Ozs7O1dBQXdCO1FBQ3hCOzs7OztXQUFzQjtRQUN0Qjs7Ozs7V0FBYztRQUNkOzs7OztXQUFnQjtRQUNoQjs7Ozs7V0FBZ0I7UUFDaEI7Ozs7bUJBQWEsRUFBRTtXQUFDO1FBQ2hCOzs7OztXQUEwQjtRQUV0QixJQUFJLENBQUMsUUFBUSxHQUFDLFFBQVEsQ0FBQztRQUN2QixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ2pDLElBQUks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LENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7b0JBQ3RFLE9BQU87aUJBQ1Y7Z0JBQ0QsT0FBTyxDQUFDLEVBQUU7b0JBQ04sRUFBRTtpQkFDTDthQUNKO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDN0UsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QseUJBQXlCLENBQUMsRUFBRTtRQUN4QixJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3hCLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFDRCxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ25CLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDNUI7UUFDRCxPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNELE1BQU07UUFDRixFQUFFO0lBQ04sQ0FBQztJQUNELEtBQUs7UUFDRCxFQUFFO0lBQ04sQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgY3JlYXRlVGV4dE5vZGUgfSBmcm9tIFwiQHRleHRidXMvYnJvd3NlclwiO1xyXG5pbXBvcnQgeyBCdXR0b25Ub29sLCBUb29sLCBUb29sVHlwZSB9IGZyb20gXCJAdGV4dGJ1cy9lZGl0b3JcIjtcclxuaW1wb3J0IHsgYXVkaXRUaW1lLCBmcm9tRXZlbnQsIG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSBcIkB0YW5iby9zdHJlYW1cIjtcclxuaW1wb3J0IHsgYWxlcnRFeGFtcGxlLCBUYWIgfSBmcm9tIFwiLi4vLi4vLi4vX3B1YmxpYy1hcGlcIjtcclxuaW1wb3J0IHsgVG9vbFRhYlBhbmVsLCBUb29sVGFiSXRlbSB9IGZyb20gXCIuL3R5cGVcIjtcclxuaW1wb3J0IHtCdXR0b25DYXJkVG9vbCwgRGlhbG9nQ2FyZFRvb2wgfSBmcm9tIFwiLi9jYXJkLXRvb2xcIjtcclxuaW1wb3J0IHsgQnV0dG9uVG9vbENvbmZpZywgRGlhbG9nVG9vbENvbmZpZyB9IGZyb20gXCJAdGV4dGJ1cy9lZGl0b3JcIjtcclxuaW1wb3J0IHsgUmVuZGVyZXIsU2VsZWN0aW9ufSBmcm9tIFwiQHRleHRidXMvY29yZVwiO1xyXG5pbXBvcnQge2NyZWF0ZUtleW1hcH0gZnJvbSBcIkB0ZXh0YnVzL2VkaXRvci9idW5kbGVzL3Rvb2xiYXIvdG9vbGtpdC9fdXRpbHMvX2NyZWF0ZS1rZXltYXBcIlxyXG5leHBvcnQgY2xhc3MgQ2FyZFRvb2xUYWJ7XHJcbiAgICBlbGVtZW50UmVmOiBIVE1MRWxlbWVudDtcclxuICAgIHByaXZhdGUgaW5qZWN0b3I6IGFueTtcclxuICAgIG9uQ2FuY2VsOiBhbnk7XHJcbiAgICBjaGVja0V2ZW50OiBhbnk7XHJcbiAgICBvbkNvbXBsZXRlOiBhbnk7XHJcbiAgICB0b29sczpUb29sW109W107XHJcbiAgICBrZXltYXBQcm9tcHQ6IEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3RydWN0b3IoaW5qZWN0b3IsdG9vVGFiUGFuZWxzOlRvb2xUYWJQYW5lbFtdKSB7XHJcbiAgICAgICAgdGhpcy5pbmplY3Rvcj1pbmplY3RvcjtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBpbmplY3Rvci5nZXQoU2VsZWN0aW9uKTtcclxuICAgICAgICBjb25zdCByZW5kZXJlciA9IGluamVjdG9yLmdldChSZW5kZXJlcik7XHJcbiAgICAgICAgdGhpcy5vbkNhbmNlbCA9IG5ldyBPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5jaGVja0V2ZW50ID0gbmV3IFN1YmplY3QoKTtcclxuICAgICAgICB0aGlzLm9uQ29tcGxldGUgPSB0aGlzLmNoZWNrRXZlbnQuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtY29tcG9uZW50LXN0YWdlJ10sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleW1hcFByb21wdCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtdG9vbGJhci1rZXltYXAtcHJvbXB0J11cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCB0YWIgPSBuZXcgVGFiKHt9KTtcclxuICAgICAgICBcclxuICAgICAgICB0YWIuc2hvdyh0b29UYWJQYW5lbHMubWFwKHBhbmVsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdmlldyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1jb21wb25lbnQtc3RhZ2UtbGlzdCddXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwYW5lbC5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgLy92YXIgY29uZmlnPU9iamVjdC5hc3NpZ24oaXRlbS5jb25maWcpXHJcbiAgICAgICAgICAgICAgICB2YXIgdG9vbDsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goaXRlbS5jb25maWcudHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUb29sVHlwZS5CdXR0b246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2w9IG5ldyBCdXR0b25DYXJkVG9vbChpdGVtLnRvb2xGYWN0b3J5LGl0ZW0uY29uZmlnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUb29sVHlwZS5EaWFsb2c6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2w9IG5ldyBEaWFsb2dDYXJkVG9vbChpdGVtLnRvb2xGYWN0b3J5LGl0ZW0uY29uZmlnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbD0gbmV3IEJ1dHRvblRvb2woaXRlbS50b29sRmFjdG9yeSBhcyAoaW5qZWN0b3IpPT5CdXR0b25Ub29sQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xzLnB1c2godG9vbCk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LmFwcGVuZENoaWxkKHRvb2wuc2V0dXAoaW5qZWN0b3IpKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBwYW5lbC5jYXRlZ29yeSxcclxuICAgICAgICAgICAgICAgIHZpZXdcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLmFwcGVuZENoaWxkKHRhYi5lbGVtZW50UmVmKTtcclxuXHJcbiAgICAgICAgbWVyZ2Uoc2VsZWN0aW9uLm9uQ2hhbmdlLCByZW5kZXJlci5vblZpZXdDaGVja2VkKS5waXBlKGF1ZGl0VGltZSgxMDApKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2xzLmZvckVhY2godG9vbCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0b29sLnJlZnJlc2hTdGF0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBmcm9tRXZlbnQodGhpcy5lbGVtZW50UmVmLCAnbW91c2VvdmVyJykuc3Vic2NyaWJlKGV2ID0+IHtcclxuICAgICAgICAgICAgY29uc3Qga2V5bWFwID0gdGhpcy5maW5kTmVlZFNob3dLZXltYXBIYW5kbGVyKGV2LnRhcmdldCk7XHJcbiAgICAgICAgICAgIGlmIChrZXltYXApIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29uZmlnID0gSlNPTi5wYXJzZShrZXltYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5bWFwUHJvbXB0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5bWFwUHJvbXB0LmFwcGVuZCguLi5jcmVhdGVLZXltYXAoY29uZmlnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXltYXBQcm9tcHQuY2xhc3NMaXN0LmFkZCgndGV4dGJ1cy10b29sYmFyLWtleW1hcC1wcm9tcHQtc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmtleW1hcFByb21wdC5jbGFzc0xpc3QucmVtb3ZlKCd0ZXh0YnVzLXRvb2xiYXIta2V5bWFwLXByb21wdC1zaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmaW5kTmVlZFNob3dLZXltYXBIYW5kbGVyKGVsKSB7XHJcbiAgICAgICAgaWYgKGVsID09PSB0aGlzLmVsZW1lbnRSZWYpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZWwuZGF0YXNldC5rZXltYXApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsLmRhdGFzZXQua2V5bWFwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5maW5kTmVlZFNob3dLZXltYXBIYW5kbGVyKGVsLnBhcmVudE5vZGUpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIC8vXHJcbiAgICB9XHJcbiAgICByZXNldCgpIHtcclxuICAgICAgICAvL1xyXG4gICAgfVxyXG59Il19