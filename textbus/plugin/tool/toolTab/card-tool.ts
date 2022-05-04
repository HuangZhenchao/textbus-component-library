import { fromEvent, Keyboard, QueryStateType } from "@textbus/core";
import { ButtonTool, Dialog, ToolType } from "@textbus/editor";
import { createCard, UICard } from "./card";

export class ButtonCardTool{
    elementRef!: HTMLElement;
    factory: any;
    cardConfig: any;
    config: any;
    viewer!: UICard;
    constructor(factory,cardConfig){
        this.factory=factory;
        this.cardConfig=cardConfig;
    }
    setup(injector) {
        this.config = Object.assign(this.factory(injector), this.cardConfig);
        const keyboard = injector.get(Keyboard);
        
        const viewer=createCard(this.config);
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
        this.viewer=viewer;
        this.elementRef=viewer.elementRef;
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
export class DialogCardTool{
    elementRef!: HTMLElement;
    factory: any;
    cardConfig: any;
    config: any;
    viewer!: UICard;
    constructor(factory,cardConfig){
        this.factory=factory;
        this.cardConfig=cardConfig;
    }
    setup(injector){
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
        return viewer.elementRef
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
export function createButtonCard(injector,config) {
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
export function createDialogCard(injector,config) {
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


