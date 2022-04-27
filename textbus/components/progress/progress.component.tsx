import {
  ComponentData,
    ComponentInstance,
    ComponentMethods,
    ContentType,
    defineComponent, Slot, SlotRender,
    Translator,
    useContext, useSlots, useState, VElement
} from "@textbus/core";
import {ComponentLoader, SlotParser} from "@textbus/browser";
import {Injector} from "@tanbo/di";
import {todoListState} from "../todoList/todoList.component";
import {SlotLiteral} from "@textbus/core";
const colors = {
    primary: '#1296db',
    info: '#6ad1ec',
    success: '#15bd9a',
    warning: '#ff9900',
    danger: '#E74F5E',
    dark: '#495060',
    gray: '#bbbec4'
};
export interface ProgressState {
    type:string ,//|'primary' | 'info' | 'success' | 'warning' | 'danger' | 'gray' | 'dark';
    progress: number,
    max: number,
    min: number
}
export const progressComponent=defineComponent<ComponentMethods,ProgressState>({
    name: "progressComponent",
    type: ContentType.BlockComponent,
    setup(data: ComponentData<ProgressState>): ComponentMethods {
        const injector = useContext();
        let state=data.state as ProgressState;
        const changeController=useState(state);
        //useState({fill:false,type:'info',slot:slots.toJSON()})
        changeController.onChange.subscribe(newState=>{
            state=newState;
            console.log('changeController',state)
        })
        return {
            render(isOutputMode:boolean, slotRender:SlotRender){
                const value = Math.round((state.progress - state.min) / (state.max - state.min) * 100) + '%';
                const el=VElement.createElement("div", Object.assign({class:"tb-progress"}, state),
                            VElement.createElement("span", { class: "tb-progress-min" }, state.min),
                            VElement.createElement("div", { style: { width: value } },
                                VElement.createElement("span", { class: "tb-progress-value" }, value)),
                            VElement.createElement("span", { class: "tb-progress-max" }, state.max)
                );
                return el

            },
        }
    }

})
export const progressComponentLoader:ComponentLoader={
    component: progressComponent,

    match(element: HTMLElement) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-progress'
    },
    read(element: HTMLElement, context: Injector, slotParser: SlotParser) :ComponentInstance{

        const state:ProgressState={
            type: element.getAttribute('type')||"primary",
            progress: Number(element.getAttribute('progress')) || 0,
            max: Number(element.getAttribute('max')) || 100,
            min: Number(element.getAttribute('min')) || 0
        }

        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        return progressComponent.createInstance(context,{state:state});
    },
    resources: {
        styles: [
            `
            .tb-progress {
              margin: 2em 0 1em;
              background-color: #eee;
              border-radius: 3px;
              height: 6px;
              display: block;
              position: relative;
            }
            .tb-progress > div {
              height: 100%;
              border-radius: inherit;
              background-color: #aaa;
              position: relative;
            }
            .tb-progress > span {
              position: absolute;
              bottom: 100%;
              font-size:12px;
            }
            .tb-progress-value {
              position: absolute;
              right: 0;
              bottom: 100%;
              background-color: #000;
              color: #fff;
              padding: 3px 8px;
              border-radius: 5px;
              font-size: 13px;
              transform: translateX(50%) translateY(-4px);
            }
            .tb-progress-value:after {
              content: "";
              position: absolute;
              top: 100%;
              left: 50%;
              margin-left: -4px;
              width: 0;
              height: 0;
              border-width: 4px;
              border-style: solid;
              border-color: #000 transparent transparent;
            }
            .tb-progress-min {
              left: 0;
            }
            .tb-progress-max {
              right: 0;
            }
            .tb-progress[type=primary] > div {
              background-color: ${colors.primary}
            }
            .tb-progress[type=info] > div {
              background-color: ${colors.info}
            }
            .tb-progress[type=success] > div {
              background-color: ${colors.success}
            }
            .tb-progress[type=warning] > div {
              background-color: ${colors.warning}
            }
            .tb-progress[type=danger] > div {
              background-color: ${colors.danger}
            }
            .tb-progress[type=dark] > div {
              background-color: ${colors.dark}
            }
            .tb-progress[type=gray] > div {
              background-color: ${colors.gray}
            }
            `
        ]
    },
}