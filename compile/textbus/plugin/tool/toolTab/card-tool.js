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
        let config = Object.assign(this.factory(injector), this.cardConfig);
        const keyboard = injector.get(Keyboard);
        const viewer = createCard(config);
        fromEvent(viewer.elementRef, 'click').subscribe(() => {
            config.onClick();
            //this.controller.hide();
        });
        if (config.keymap) {
            keyboard.addShortcut({
                keymap: config.keymap,
                action() {
                    if (!viewer.disabled) {
                        //console.log("this.config",config)
                        config.onClick();
                    }
                }
            });
        }
        this.config = config;
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
        let config = Object.assign(this.factory(injector), this.cardConfig);
        const viewer = createCard(config);
        fromEvent(viewer.elementRef, 'click').subscribe(() => {
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
                    if (!viewer.disabled && prevValue !== defaultValue) {
                        config.useValue(prevValue);
                    }
                }
            });
        }
        this.config = config;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC10b29sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdGV4dGJ1cy9wbHVnaW4vdG9vbC90b29sVGFiL2NhcmQtdG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFjLE1BQU0sRUFBWSxNQUFNLGlCQUFpQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQVUsTUFBTSxRQUFRLENBQUM7QUFFNUMsTUFBTSxPQUFPLGNBQWM7SUFNdkIsWUFBWSxPQUFPLEVBQUMsVUFBVTtRQUw5Qjs7Ozs7V0FBeUI7UUFDekI7Ozs7O1dBQWE7UUFDYjs7Ozs7V0FBZ0I7UUFDaEI7Ozs7O1dBQVk7UUFDWjs7Ozs7V0FBZ0I7UUFFWixJQUFJLENBQUMsT0FBTyxHQUFDLE9BQU8sQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFDLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBQ0QsS0FBSyxDQUFDLFFBQVE7UUFDVixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFeEMsTUFBTSxNQUFNLEdBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDakQsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLHlCQUF5QjtRQUM3QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNmLFFBQVEsQ0FBQyxXQUFX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QUUsQ0FBQztZQUNsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDcEIsUUFBUSxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUNqQixLQUFLLGNBQWMsQ0FBQyxRQUFRO29CQUN4QixNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDdkIsTUFBTSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ3pCLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQzlCLE1BQU07Z0JBQ1YsS0FBSyxjQUFjLENBQUMsT0FBTztvQkFDdkIsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3hCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUN4QixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzFDLE1BQU07Z0JBQ1YsS0FBSyxjQUFjLENBQUMsTUFBTTtvQkFDdEIsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3hCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUN6QixNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3JDO1FBQ0wsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZnJvbUV2ZW50LCBLZXlib2FyZCwgUXVlcnlTdGF0ZVR5cGUgfSBmcm9tIFwiQHRleHRidXMvY29yZVwiO1xyXG5pbXBvcnQgeyBCdXR0b25Ub29sLCBEaWFsb2csIFRvb2xUeXBlIH0gZnJvbSBcIkB0ZXh0YnVzL2VkaXRvclwiO1xyXG5pbXBvcnQgeyBjcmVhdGVDYXJkLCBVSUNhcmQgfSBmcm9tIFwiLi9jYXJkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQnV0dG9uQ2FyZFRvb2x7XHJcbiAgICBlbGVtZW50UmVmITogSFRNTEVsZW1lbnQ7XHJcbiAgICBmYWN0b3J5OiBhbnk7XHJcbiAgICBjYXJkQ29uZmlnOiBhbnk7XHJcbiAgICBjb25maWc6IGFueTtcclxuICAgIHZpZXdlciE6IFVJQ2FyZDtcclxuICAgIGNvbnN0cnVjdG9yKGZhY3RvcnksY2FyZENvbmZpZyl7XHJcbiAgICAgICAgdGhpcy5mYWN0b3J5PWZhY3Rvcnk7XHJcbiAgICAgICAgdGhpcy5jYXJkQ29uZmlnPWNhcmRDb25maWc7XHJcbiAgICB9XHJcbiAgICBzZXR1cChpbmplY3Rvcikge1xyXG4gICAgICAgIGxldCBjb25maWcgPSBPYmplY3QuYXNzaWduKHRoaXMuZmFjdG9yeShpbmplY3RvciksIHRoaXMuY2FyZENvbmZpZyk7XHJcbiAgICAgICAgY29uc3Qga2V5Ym9hcmQgPSBpbmplY3Rvci5nZXQoS2V5Ym9hcmQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHZpZXdlcj1jcmVhdGVDYXJkKGNvbmZpZyk7XHJcbiAgICAgICAgZnJvbUV2ZW50KHZpZXdlci5lbGVtZW50UmVmLCAnY2xpY2snKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25maWcub25DbGljaygpO1xyXG4gICAgICAgICAgICAvL3RoaXMuY29udHJvbGxlci5oaWRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5rZXltYXApIHtcclxuICAgICAgICAgICAga2V5Ym9hcmQuYWRkU2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5bWFwOiBjb25maWcua2V5bWFwLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdmlld2VyLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzLmNvbmZpZ1wiLGNvbmZpZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLm9uQ2xpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbmZpZz1jb25maWc7XHJcbiAgICAgICAgdGhpcy52aWV3ZXI9dmlld2VyO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZj12aWV3ZXIuZWxlbWVudFJlZjtcclxuICAgICAgICByZXR1cm4gdmlld2VyLmVsZW1lbnRSZWY7XHJcbiAgICB9XHJcbiAgICBkaXNhYmxlZChpcykge1xyXG4gICAgICAgIHRoaXMudmlld2VyLmRpc2FibGVkID0gaXM7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoU3RhdGUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5xdWVyeVN0YXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLmNvbmZpZy5xdWVyeVN0YXRlKCk7XHJcbiAgICAgICAgY29uc3Qgdmlld2VyID0gdGhpcy52aWV3ZXI7XHJcbiAgICAgICAgc3dpdGNoIChzdGF0ZS5zdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIFF1ZXJ5U3RhdGVUeXBlLkRpc2FibGVkOlxyXG4gICAgICAgICAgICAgICAgdmlld2VyLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHZpZXdlci5oaWdobGlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFF1ZXJ5U3RhdGVUeXBlLkVuYWJsZWQ6XHJcbiAgICAgICAgICAgICAgICB2aWV3ZXIuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHZpZXdlci5oaWdobGlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUXVlcnlTdGF0ZVR5cGUuTm9ybWFsOlxyXG4gICAgICAgICAgICAgICAgdmlld2VyLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2aWV3ZXIuaGlnaGxpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBEaWFsb2dDYXJkVG9vbHtcclxuICAgIGVsZW1lbnRSZWYhOiBIVE1MRWxlbWVudDtcclxuICAgIGZhY3Rvcnk6IGFueTtcclxuICAgIGNhcmRDb25maWc6IGFueTtcclxuICAgIGNvbmZpZzogYW55O1xyXG4gICAgdmlld2VyITogVUlDYXJkO1xyXG4gICAgY29uc3RydWN0b3IoZmFjdG9yeSxjYXJkQ29uZmlnKXtcclxuICAgICAgICB0aGlzLmZhY3Rvcnk9ZmFjdG9yeTtcclxuICAgICAgICB0aGlzLmNhcmRDb25maWc9Y2FyZENvbmZpZztcclxuICAgIH1cclxuICAgIHNldHVwKGluamVjdG9yKXtcclxuICAgICAgICBjb25zdCBrZXlib2FyZCA9IGluamVjdG9yLmdldChLZXlib2FyZCk7XHJcbiAgICAgICAgY29uc3QgZGlhbG9nID0gaW5qZWN0b3IuZ2V0KERpYWxvZyk7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24odGhpcy5mYWN0b3J5KGluamVjdG9yKSwgdGhpcy5jYXJkQ29uZmlnKTtcclxuICAgICAgICBjb25zdCB2aWV3ZXIgPSBjcmVhdGVDYXJkKGNvbmZpZyk7XHJcbiAgICAgICAgZnJvbUV2ZW50KHZpZXdlci5lbGVtZW50UmVmLCAnY2xpY2snKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICBkaWFsb2cuc2hvdyhjb25maWcudmlld0NvbnRyb2xsZXIuZWxlbWVudFJlZik7XHJcbiAgICAgICAgICAgIC8vdGhpcy5jb250cm9sbGVyLmhpZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB7fTtcclxuICAgICAgICBsZXQgcHJldlZhbHVlID0gZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIGNvbmZpZy52aWV3Q29udHJvbGxlci5vbkNvbXBsZXRlLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIHByZXZWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBjb25maWcudXNlVmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICBkaWFsb2cuaGlkZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbmZpZy52aWV3Q29udHJvbGxlci5vbkNhbmNlbC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICBkaWFsb2cuaGlkZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChjb25maWcua2V5bWFwKSB7XHJcbiAgICAgICAgICAgIGtleWJvYXJkLmFkZFNob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleW1hcDogY29uZmlnLmtleW1hcCxcclxuICAgICAgICAgICAgICAgIGFjdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZpZXdlci5kaXNhYmxlZCAmJiBwcmV2VmFsdWUgIT09IGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcudXNlVmFsdWUocHJldlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbmZpZz1jb25maWc7XHJcbiAgICAgICAgdGhpcy52aWV3ZXI9dmlld2VyO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZj12aWV3ZXIuZWxlbWVudFJlZjtcclxuICAgICAgICByZXR1cm4gdmlld2VyLmVsZW1lbnRSZWY7XHJcbiAgICB9XHJcbiAgICBkaXNhYmxlZChpcykge1xyXG4gICAgICAgIHRoaXMudmlld2VyLmRpc2FibGVkID0gaXM7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoU3RhdGUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5xdWVyeVN0YXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLmNvbmZpZy5xdWVyeVN0YXRlKCk7XHJcbiAgICAgICAgY29uc3Qgdmlld2VyID0gdGhpcy52aWV3ZXI7XHJcbiAgICAgICAgc3dpdGNoIChzdGF0ZS5zdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIFF1ZXJ5U3RhdGVUeXBlLkRpc2FibGVkOlxyXG4gICAgICAgICAgICAgICAgdmlld2VyLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHZpZXdlci5oaWdobGlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnZpZXdDb250cm9sbGVyLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBRdWVyeVN0YXRlVHlwZS5FbmFibGVkOlxyXG4gICAgICAgICAgICAgICAgdmlld2VyLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2aWV3ZXIuaGlnaGxpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnZpZXdDb250cm9sbGVyLnVwZGF0ZShzdGF0ZS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBRdWVyeVN0YXRlVHlwZS5Ob3JtYWw6XHJcbiAgICAgICAgICAgICAgICB2aWV3ZXIuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHZpZXdlci5oaWdobGlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnZpZXdDb250cm9sbGVyLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCdXR0b25DYXJkKGluamVjdG9yLGNvbmZpZykge1xyXG4gICAgY29uc3Qga2V5Ym9hcmQgPSBpbmplY3Rvci5nZXQoS2V5Ym9hcmQpO1xyXG4gICAgY29uc3QgaXRlbSA9IGNyZWF0ZUNhcmQoY29uZmlnKTtcclxuICAgIGZyb21FdmVudChpdGVtLmVsZW1lbnRSZWYsICdjbGljaycpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgY29uZmlnLm9uQ2xpY2soKTtcclxuICAgICAgICAvL3RoaXMuY29udHJvbGxlci5oaWRlKCk7XHJcbiAgICB9KTtcclxuICAgIGlmIChjb25maWcua2V5bWFwKSB7XHJcbiAgICAgICAga2V5Ym9hcmQuYWRkU2hvcnRjdXQoe1xyXG4gICAgICAgICAgICBrZXltYXA6IGNvbmZpZy5rZXltYXAsXHJcbiAgICAgICAgICAgIGFjdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXRlbS5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5vbkNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZWxlbWVudFJlZjogaXRlbS5lbGVtZW50UmVmLFxyXG4gICAgICAgIGRpc2FibGVkKGlzKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uZGlzYWJsZWQgPSBpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlZnJlc2hTdGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKCFjb25maWcucXVlcnlTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gY29uZmlnLnF1ZXJ5U3RhdGUoKTtcclxuICAgICAgICAgICAgY29uc3Qgdmlld2VyID0gaXRlbTtcclxuICAgICAgICAgICAgc3dpdGNoIChzdGF0ZS5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBRdWVyeVN0YXRlVHlwZS5EaXNhYmxlZDpcclxuICAgICAgICAgICAgICAgICAgICB2aWV3ZXIuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdlci5oaWdobGlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgUXVlcnlTdGF0ZVR5cGUuRW5hYmxlZDpcclxuICAgICAgICAgICAgICAgICAgICB2aWV3ZXIuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3ZXIuaGlnaGxpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgUXVlcnlTdGF0ZVR5cGUuTm9ybWFsOlxyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdlci5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdlci5oaWdobGlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpYWxvZ0NhcmQoaW5qZWN0b3IsY29uZmlnKSB7XHJcbiAgICBjb25zdCBrZXlib2FyZCA9IGluamVjdG9yLmdldChLZXlib2FyZCk7XHJcbiAgICBjb25zdCBkaWFsb2cgPSBpbmplY3Rvci5nZXQoRGlhbG9nKTtcclxuICAgIGNvbnN0IGl0ZW0gPSBjcmVhdGVDYXJkKGNvbmZpZyk7XHJcbiAgICBmcm9tRXZlbnQoaXRlbS5lbGVtZW50UmVmLCAnY2xpY2snKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGRpYWxvZy5zaG93KGNvbmZpZy52aWV3Q29udHJvbGxlci5lbGVtZW50UmVmKTtcclxuICAgICAgICAvL3RoaXMuY29udHJvbGxlci5oaWRlKCk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHt9O1xyXG4gICAgbGV0IHByZXZWYWx1ZSA9IGRlZmF1bHRWYWx1ZTtcclxuICAgIGNvbmZpZy52aWV3Q29udHJvbGxlci5vbkNvbXBsZXRlLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgcHJldlZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgY29uZmlnLnVzZVZhbHVlKHZhbHVlKTtcclxuICAgICAgICBkaWFsb2cuaGlkZSgpO1xyXG4gICAgfSk7XHJcbiAgICBjb25maWcudmlld0NvbnRyb2xsZXIub25DYW5jZWwuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBkaWFsb2cuaGlkZSgpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoY29uZmlnLmtleW1hcCkge1xyXG4gICAgICAgIGtleWJvYXJkLmFkZFNob3J0Y3V0KHtcclxuICAgICAgICAgICAga2V5bWFwOiBjb25maWcua2V5bWFwLFxyXG4gICAgICAgICAgICBhY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0uZGlzYWJsZWQgJiYgcHJldlZhbHVlICE9PSBkZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWcudXNlVmFsdWUocHJldlZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBlbGVtZW50UmVmOiBpdGVtLmVsZW1lbnRSZWYsXHJcbiAgICAgICAgZGlzYWJsZWQoaXMpIHtcclxuICAgICAgICAgICAgaXRlbS5kaXNhYmxlZCA9IGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVmcmVzaFN0YXRlKCkge1xyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZy5xdWVyeVN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBjb25maWcucXVlcnlTdGF0ZSgpO1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3ZXIgPSBpdGVtO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXRlLnN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFF1ZXJ5U3RhdGVUeXBlLkRpc2FibGVkOlxyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdlci5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld2VyLmhpZ2hsaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy52aWV3Q29udHJvbGxlci5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBRdWVyeVN0YXRlVHlwZS5FbmFibGVkOlxyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdlci5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdlci5oaWdobGlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy52aWV3Q29udHJvbGxlci51cGRhdGUoc3RhdGUudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBRdWVyeVN0YXRlVHlwZS5Ob3JtYWw6XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld2VyLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld2VyLmhpZ2hsaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy52aWV3Q29udHJvbGxlci5yZXNldCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbiJdfQ==