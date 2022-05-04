import { fromEvent, Keyboard, QueryStateType } from "@textbus/core";
import { Dialog } from "@textbus/editor";
import { createCard } from "./card";
export class ButtonCardTool {
    constructor(factory, cardConfig) {
        Object.defineProperty(this, "elementRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "factory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cardConfig", {
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
        Object.defineProperty(this, "viewer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.factory = factory;
        this.cardConfig = cardConfig;
    }
    setup(injector) {
        this.config = Object.assign(this.factory(injector), this.cardConfig);
        const keyboard = injector.get(Keyboard);
        const viewer = createCard(this.config);
        fromEvent(viewer.elementRef, 'click').subscribe(() => {
            this.config.onClick();
            //this.controller.hide();
        });
        if (this.config.keymap) {
            keyboard.addShortcut({
                keymap: this.config.keymap,
                action() {
                    if (!viewer.disabled) {
                        this.config.onClick();
                    }
                }
            });
        }
        this.viewer = viewer;
        this.elementRef = viewer.elementRef;
        return viewer.elementRef;
    }
    disabled(is) {
        this.viewer.disabled = is;
    }
    refreshState() {
        if (!this.config.queryState) {
            return;
        }
        const state = this.config.queryState();
        const viewer = this.viewer;
        switch (state.state) {
            case QueryStateType.Disabled:
                viewer.disabled = true;
                viewer.highlight = false;
                break;
            case QueryStateType.Enabled:
                viewer.disabled = false;
                viewer.highlight = true;
                break;
            case QueryStateType.Normal:
                viewer.disabled = false;
                viewer.highlight = false;
        }
    }
}
export class DialogCardTool {
    constructor(factory, cardConfig) {
        Object.defineProperty(this, "elementRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "factory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cardConfig", {
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
        Object.defineProperty(this, "viewer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.factory = factory;
        this.cardConfig = cardConfig;
    }
    setup(injector) {
        const keyboard = injector.get(Keyboard);
        const dialog = injector.get(Dialog);
        this.config = Object.assign(this.factory(injector), this.cardConfig);
        const viewer = createCard(this.config);
        fromEvent(viewer.elementRef, 'click').subscribe(() => {
            dialog.show(this.config.viewController.elementRef);
            //this.controller.hide();
        });
        const defaultValue = {};
        let prevValue = defaultValue;
        this.config.viewController.onComplete.subscribe(value => {
            prevValue = value;
            this.config.useValue(value);
            dialog.hide();
        });
        this.config.viewController.onCancel.subscribe(() => {
            dialog.hide();
        });
        if (this.config.keymap) {
            keyboard.addShortcut({
                keymap: this.config.keymap,
                action() {
                    if (!viewer.disabled && prevValue !== defaultValue) {
                        this.config.useValue(prevValue);
                    }
                }
            });
        }
        return viewer.elementRef;
    }
    disabled(is) {
        this.viewer.disabled = is;
    }
    refreshState() {
        if (!this.config.queryState) {
            return;
        }
        const state = this.config.queryState();
        const viewer = this.viewer;
        switch (state.state) {
            case QueryStateType.Disabled:
                viewer.disabled = true;
                viewer.highlight = false;
                this.config.viewController.reset();
                break;
            case QueryStateType.Enabled:
                viewer.disabled = false;
                viewer.highlight = true;
                this.config.viewController.update(state.value);
                break;
            case QueryStateType.Normal:
                viewer.disabled = false;
                viewer.highlight = false;
                this.config.viewController.reset();
        }
    }
}
export function createButtonCard(injector, config) {
    const keyboard = injector.get(Keyboard);
    const item = createCard(config);
    fromEvent(item.elementRef, 'click').subscribe(() => {
        config.onClick();
        //this.controller.hide();
    });
    if (config.keymap) {
        keyboard.addShortcut({
            keymap: config.keymap,
            action() {
                if (!item.disabled) {
                    config.onClick();
                }
            }
        });
    }
    return {
        elementRef: item.elementRef,
        disabled(is) {
            item.disabled = is;
        },
        refreshState() {
            if (!config.queryState) {
                return;
            }
            const state = config.queryState();
            const viewer = item;
            switch (state.state) {
                case QueryStateType.Disabled:
                    viewer.disabled = true;
                    viewer.highlight = false;
                    break;
                case QueryStateType.Enabled:
                    viewer.disabled = false;
                    viewer.highlight = true;
                    break;
                case QueryStateType.Normal:
                    viewer.disabled = false;
                    viewer.highlight = false;
            }
        }
    };
}
export function createDialogCard(injector, config) {
    const keyboard = injector.get(Keyboard);
    const dialog = injector.get(Dialog);
    const item = createCard(config);
    fromEvent(item.elementRef, 'click').subscribe(() => {
        dialog.show(config.viewController.elementRef);
        //this.controller.hide();
    });
    const defaultValue = {};
    let prevValue = defaultValue;
    config.viewController.onComplete.subscribe(value => {
        prevValue = value;
        config.useValue(value);
        dialog.hide();
    });
    config.viewController.onCancel.subscribe(() => {
        dialog.hide();
    });
    if (config.keymap) {
        keyboard.addShortcut({
            keymap: config.keymap,
            action() {
                if (!item.disabled && prevValue !== defaultValue) {
                    config.useValue(prevValue);
                }
            }
        });
    }
    return {
        elementRef: item.elementRef,
        disabled(is) {
            item.disabled = is;
        },
        refreshState() {
            if (!config.queryState) {
                return;
            }
            const state = config.queryState();
            const viewer = item;
            switch (state.state) {
                case QueryStateType.Disabled:
                    viewer.disabled = true;
                    viewer.highlight = false;
                    config.viewController.reset();
                    break;
                case QueryStateType.Enabled:
                    viewer.disabled = false;
                    viewer.highlight = true;
                    config.viewController.update(state.value);
                    break;
                case QueryStateType.Normal:
                    viewer.disabled = false;
                    viewer.highlight = false;
                    config.viewController.reset();
            }
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC10b29sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdGV4dGJ1cy9wbHVnaW4vdG9vbC90b29sVGFiL2NhcmQtdG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFjLE1BQU0sRUFBWSxNQUFNLGlCQUFpQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQVUsTUFBTSxRQUFRLENBQUM7QUFFNUMsTUFBTSxPQUFPLGNBQWM7SUFNdkIsWUFBWSxPQUFPLEVBQUMsVUFBVTtRQUw5Qjs7Ozs7V0FBeUI7UUFDekI7Ozs7O1dBQWE7UUFDYjs7Ozs7V0FBZ0I7UUFDaEI7Ozs7O1dBQVk7UUFDWjs7Ozs7V0FBZ0I7UUFFWixJQUFJLENBQUMsT0FBTyxHQUFDLE9BQU8sQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFDLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBQ0QsS0FBSyxDQUFDLFFBQVE7UUFDVixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckUsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4QyxNQUFNLE1BQU0sR0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0Qix5QkFBeUI7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksQ0FBQyxNQUFN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QUcsSUFBSSxDQUFDO1lBQ3BCLFFBQVEsS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDakIsS0FBSyxjQUFjLENBQUMsUUFBUTtvQkFDeEIsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3ZCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUN6QixNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUM5QixNQUFNO2dCQUNWLEtBQUssY0FBYyxDQUFDLE9BQU87b0JBQ3ZCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO29CQUN4QixNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDeEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxQyxNQUFNO2dCQUNWLEtBQUssY0FBYyxDQUFDLE1BQU07b0JBQ3RCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO29CQUN4QixNQUFNLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFDekIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNyQztRQUNMLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb21FdmVudCwgS2V5Ym9hcmQsIFF1ZXJ5U3RhdGVUeXBlIH0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuaW1wb3J0IHsgQnV0dG9uVG9vbCwgRGlhbG9nLCBUb29sVHlwZSB9IGZyb20gXCJAdGV4dGJ1cy9lZGl0b3JcIjtcclxuaW1wb3J0IHsgY3JlYXRlQ2FyZCwgVUlDYXJkIH0gZnJvbSBcIi4vY2FyZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJ1dHRvbkNhcmRUb29se1xyXG4gICAgZWxlbWVudFJlZiE6IEhUTUxFbGVtZW50O1xyXG4gICAgZmFjdG9yeTogYW55O1xyXG4gICAgY2FyZENvbmZpZzogYW55O1xyXG4gICAgY29uZmlnOiBhbnk7XHJcbiAgICB2aWV3ZXIhOiBVSUNhcmQ7XHJcbiAgICBjb25zdHJ1Y3RvcihmYWN0b3J5LGNhcmRDb25maWcpe1xyXG4gICAgICAgIHRoaXMuZmFjdG9yeT1mYWN0b3J5O1xyXG4gICAgICAgIHRoaXMuY2FyZENvbmZpZz1jYXJkQ29uZmlnO1xyXG4gICAgfVxyXG4gICAgc2V0dXAoaW5qZWN0b3IpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24odGhpcy5mYWN0b3J5KGluamVjdG9yKSwgdGhpcy5jYXJkQ29uZmlnKTtcclxuICAgICAgICBjb25zdCBrZXlib2FyZCA9IGluamVjdG9yLmdldChLZXlib2FyZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3Qgdmlld2VyPWNyZWF0ZUNhcmQodGhpcy5jb25maWcpO1xyXG4gICAgICAgIGZyb21FdmVudCh2aWV3ZXIuZWxlbWVudFJlZiwgJ2NsaWNrJykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcub25DbGljaygpO1xyXG4gICAgICAgICAgICAvL3RoaXMuY29udHJvbGxlci5oaWRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmtleW1hcCkge1xyXG4gICAgICAgICAgICBrZXlib2FyZC5hZGRTaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXltYXA6IHRoaXMuY29uZmlnLmtleW1hcCxcclxuICAgICAgICAgICAgICAgIGFjdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZpZXdlci5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5vbkNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52aWV3ZXI9dmlld2VyO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZj12aWV3ZXIuZWxlbWVudFJlZjtcclxuICAgICAgICByZXR1cm4gdmlld2VyLmVsZW1lbnRSZWY7XHJcbiAgICB9XHJcbiAgICBkaXNhYmxlZChpcykge1xyXG4gICAgICAgIHRoaXMudmlld2VyLmRpc2FibGVkID0gaXM7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoU3RhdGUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5xdWVyeVN0YXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLmNvbmZpZy5xdWVyeVN0YXRlKCk7XHJcbiAgICAgICAgY29uc3Qgdmlld2VyID0gdGhpcy52aWV3ZXI7XHJcbiAgICAgICAgc3dpdGNoIChzdGF0ZS5zdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIFF1ZXJ5U3RhdGVUeXBlLkRpc2FibGVkOlxyXG4gICAgICAgICAgICAgICAgdmlld2VyLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHZpZXdlci5oaWdobGlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFF1ZXJ5U3RhdGVUeXBlLkVuYWJsZWQ6XHJcbiAgICAgICAgICAgICAgICB2aWV3ZXIuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHZpZXdlci5oaWdobGlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUXVlcnlTdGF0ZVR5cGUuTm9ybWFsOlxyXG4gICAgICAgICAgICAgICAgdmlld2VyLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2aWV3ZXIuaGlnaGxpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBEaWFsb2dDYXJkVG9vbHtcclxuICAgIGVsZW1lbnRSZWYhOiBIVE1MRWxlbWVudDtcclxuICAgIGZhY3Rvcnk6IGFueTtcclxuICAgIGNhcmRDb25maWc6IGFueTtcclxuICAgIGNvbmZpZzogYW55O1xyXG4gICAgdmlld2VyITogVUlDYXJkO1xyXG4gICAgY29uc3RydWN0b3IoZmFjdG9yeSxjYXJkQ29uZmlnKXtcclxuICAgICAgICB0aGlzLmZhY3Rvcnk9ZmFjdG9yeTtcclxuICAgICAgICB0aGlzLmNhcmRDb25maWc9Y2FyZENvbmZpZztcclxuICAgIH1cclxuICAgIHNldHVwKGluamVjdG9yKXtcclxuICAgICAgICBjb25zdCBrZXlib2FyZCA9IGluamVjdG9yLmdldChLZXlib2FyZCk7XHJcbiAgICAgICAgY29uc3QgZGlhbG9nID0gaW5qZWN0b3IuZ2V0KERpYWxvZyk7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHRoaXMuZmFjdG9yeShpbmplY3RvciksIHRoaXMuY2FyZENvbmZpZyk7XHJcbiAgICAgICAgY29uc3Qgdmlld2VyID0gY3JlYXRlQ2FyZCh0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgZnJvbUV2ZW50KHZpZXdlci5lbGVtZW50UmVmLCAnY2xpY2snKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICBkaWFsb2cuc2hvdyh0aGlzLmNvbmZpZy52aWV3Q29udHJvbGxlci5lbGVtZW50UmVmKTtcclxuICAgICAgICAgICAgLy90aGlzLmNvbnRyb2xsZXIuaGlkZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHt9O1xyXG4gICAgICAgIGxldCBwcmV2VmFsdWUgPSBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgdGhpcy5jb25maWcudmlld0NvbnRyb2xsZXIub25Db21wbGV0ZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICBwcmV2VmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcudXNlVmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICBkaWFsb2cuaGlkZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLnZpZXdDb250cm9sbGVyLm9uQ2FuY2VsLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGRpYWxvZy5oaWRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmtleW1hcCkge1xyXG4gICAgICAgICAgICBrZXlib2FyZC5hZGRTaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXltYXA6IHRoaXMuY29uZmlnLmtleW1hcCxcclxuICAgICAgICAgICAgICAgIGFjdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZpZXdlci5kaXNhYmxlZCAmJiBwcmV2VmFsdWUgIT09IGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy51c2VWYWx1ZShwcmV2VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2aWV3ZXIuZWxlbWVudFJlZlxyXG4gICAgfVxyXG4gICAgZGlzYWJsZWQoaXMpIHtcclxuICAgICAgICB0aGlzLnZpZXdlci5kaXNhYmxlZCA9IGlzO1xyXG4gICAgfVxyXG4gICAgcmVmcmVzaFN0YXRlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jb25maWcucXVlcnlTdGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jb25maWcucXVlcnlTdGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IHZpZXdlciA9IHRoaXMudmlld2VyO1xyXG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBRdWVyeVN0YXRlVHlwZS5EaXNhYmxlZDpcclxuICAgICAgICAgICAgICAgIHZpZXdlci5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB2aWV3ZXIuaGlnaGxpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy52aWV3Q29udHJvbGxlci5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUXVlcnlTdGF0ZVR5cGUuRW5hYmxlZDpcclxuICAgICAgICAgICAgICAgIHZpZXdlci5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdmlld2VyLmhpZ2hsaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy52aWV3Q29udHJvbGxlci51cGRhdGUoc3RhdGUudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUXVlcnlTdGF0ZVR5cGUuTm9ybWFsOlxyXG4gICAgICAgICAgICAgICAgdmlld2VyLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2aWV3ZXIuaGlnaGxpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy52aWV3Q29udHJvbGxlci5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnV0dG9uQ2FyZChpbmplY3Rvcixjb25maWcpIHtcclxuICAgIGNvbnN0IGtleWJvYXJkID0gaW5qZWN0b3IuZ2V0KEtleWJvYXJkKTtcclxuICAgIGNvbnN0IGl0ZW0gPSBjcmVhdGVDYXJkKGNvbmZpZyk7XHJcbiAgICBmcm9tRXZlbnQoaXRlbS5lbGVtZW50UmVmLCAnY2xpY2snKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGNvbmZpZy5vbkNsaWNrKCk7XHJcbiAgICAgICAgLy90aGlzLmNvbnRyb2xsZXIuaGlkZSgpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoY29uZmlnLmtleW1hcCkge1xyXG4gICAgICAgIGtleWJvYXJkLmFkZFNob3J0Y3V0KHtcclxuICAgICAgICAgICAga2V5bWFwOiBjb25maWcua2V5bWFwLFxyXG4gICAgICAgICAgICBhY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0uZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWcub25DbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGVsZW1lbnRSZWY6IGl0ZW0uZWxlbWVudFJlZixcclxuICAgICAgICBkaXNhYmxlZChpcykge1xyXG4gICAgICAgICAgICBpdGVtLmRpc2FibGVkID0gaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWZyZXNoU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICghY29uZmlnLnF1ZXJ5U3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGNvbmZpZy5xdWVyeVN0YXRlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXdlciA9IGl0ZW07XHJcbiAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgUXVlcnlTdGF0ZVR5cGUuRGlzYWJsZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld2VyLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3ZXIuaGlnaGxpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFF1ZXJ5U3RhdGVUeXBlLkVuYWJsZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld2VyLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld2VyLmhpZ2hsaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFF1ZXJ5U3RhdGVUeXBlLk5vcm1hbDpcclxuICAgICAgICAgICAgICAgICAgICB2aWV3ZXIuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3ZXIuaGlnaGxpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaWFsb2dDYXJkKGluamVjdG9yLGNvbmZpZykge1xyXG4gICAgY29uc3Qga2V5Ym9hcmQgPSBpbmplY3Rvci5nZXQoS2V5Ym9hcmQpO1xyXG4gICAgY29uc3QgZGlhbG9nID0gaW5qZWN0b3IuZ2V0KERpYWxvZyk7XHJcbiAgICBjb25zdCBpdGVtID0gY3JlYXRlQ2FyZChjb25maWcpO1xyXG4gICAgZnJvbUV2ZW50KGl0ZW0uZWxlbWVudFJlZiwgJ2NsaWNrJykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBkaWFsb2cuc2hvdyhjb25maWcudmlld0NvbnRyb2xsZXIuZWxlbWVudFJlZik7XHJcbiAgICAgICAgLy90aGlzLmNvbnRyb2xsZXIuaGlkZSgpO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB7fTtcclxuICAgIGxldCBwcmV2VmFsdWUgPSBkZWZhdWx0VmFsdWU7XHJcbiAgICBjb25maWcudmlld0NvbnRyb2xsZXIub25Db21wbGV0ZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICAgIHByZXZWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIGNvbmZpZy51c2VWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgZGlhbG9nLmhpZGUoKTtcclxuICAgIH0pO1xyXG4gICAgY29uZmlnLnZpZXdDb250cm9sbGVyLm9uQ2FuY2VsLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgZGlhbG9nLmhpZGUoKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGNvbmZpZy5rZXltYXApIHtcclxuICAgICAgICBrZXlib2FyZC5hZGRTaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIGtleW1hcDogY29uZmlnLmtleW1hcCxcclxuICAgICAgICAgICAgYWN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLmRpc2FibGVkICYmIHByZXZWYWx1ZSAhPT0gZGVmYXVsdFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLnVzZVZhbHVlKHByZXZWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZWxlbWVudFJlZjogaXRlbS5lbGVtZW50UmVmLFxyXG4gICAgICAgIGRpc2FibGVkKGlzKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uZGlzYWJsZWQgPSBpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlZnJlc2hTdGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKCFjb25maWcucXVlcnlTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gY29uZmlnLnF1ZXJ5U3RhdGUoKTtcclxuICAgICAgICAgICAgY29uc3Qgdmlld2VyID0gaXRlbTtcclxuICAgICAgICAgICAgc3dpdGNoIChzdGF0ZS5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBRdWVyeVN0YXRlVHlwZS5EaXNhYmxlZDpcclxuICAgICAgICAgICAgICAgICAgICB2aWV3ZXIuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdlci5oaWdobGlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWcudmlld0NvbnRyb2xsZXIucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgUXVlcnlTdGF0ZVR5cGUuRW5hYmxlZDpcclxuICAgICAgICAgICAgICAgICAgICB2aWV3ZXIuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3ZXIuaGlnaGxpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWcudmlld0NvbnRyb2xsZXIudXBkYXRlKHN0YXRlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgUXVlcnlTdGF0ZVR5cGUuTm9ybWFsOlxyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdlci5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdlci5oaWdobGlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWcudmlld0NvbnRyb2xsZXIucmVzZXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcblxyXG4iXX0=