import {
    ComponentInstance,
    ComponentMethods,
    ContentType,
    defineComponent,
    Slot,
    SlotLiteral,
    SlotRender,
    Selection,
    Translator,
    useContext,
    useSlots, useState,
    VElement,
    ComponentData
} from "@textbus/core";
import {ComponentLoader, SlotParser} from "@textbus/browser";
import {Injector} from "@tanbo/di";

export interface todoListState{
    active:boolean,
    disabled:boolean,
}
export const todoListComponent=defineComponent<ComponentMethods,todoListState>({
    name: "todoListComponent",
    type: ContentType.BlockComponent,

    setup(data: ComponentData<todoListState>): ComponentMethods {
        const injector = useContext();
        const slots = useSlots(data.slots ||[new Slot([
                ContentType.BlockComponent,
                ContentType.Text
            ])
        ])
        const stateCollection = [{
            active: false,
            disabled: false
        }, {
            active: true,
            disabled: false
        }, {
            active: false,
            disabled: true
        }, {
            active: true,
            disabled: true
        }];
        let state=data.state as todoListState
        const changeController=useState(state);
        //useState({fill:false,type:'info',slot:slots.toJSON()})
        changeController.onChange.subscribe(newState=>{
            state=newState;
            console.log('changeController',state)
        })
        return {
            render(isOutputMode:boolean, slotRender:SlotRender){
                const getStateIndex=function (active, disabled) {
                    for (let i = 0; i < 4; i++) {
                        const item = stateCollection[i];
                        if (item.active === active && item.disabled === disabled) {
                            return i;
                        }
                    }
                    return -1;
                }
                let classes = ['tb-todo-list-state'];
                if (state.active) {
                    classes.push('tb-todo-list-state-active');
                }
                if (state.disabled) {
                    classes.push('tb-todo-list-state-disabled');
                }
                return (
                    <div class='tb-todo-list'>
                    <div class='tb-todo-list-item'>
                        <div class='tb-todo-list-btn'>
                            {
                                VElement.createElement("div", { class: classes.join(' '), onClick: () => {

                                    //const selection=injector.get(TBSelection);
                                    //let component = selection.commonAncestorComponent;
                                    //state=
                                    const i = (getStateIndex(state.active, state.disabled) + 1) % 4;
                                    const newState = stateCollection[i];
                                        changeController.update(draft=>{                                           
                                            draft.active=newState.active;
                                            draft.disabled=newState.disabled;
                                        });
                                        console.log(state)
                                    //state.markAsDirtied();
                                } })
                            }
                        </div>
                    {
                        slotRender(slots.get(0)!, () => {
                            return <div class='tb-todo-list-content' placeholder='待办事项'/>
                        })
                    }
                    </div>
                    </div>
                )

            }
        }
    }

})
export const todoListComponentLoader:ComponentLoader={
    component: todoListComponent,

    match(element: HTMLElement) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-todo-list'
    },
    read(element: HTMLElement, context: Injector, slotParser: SlotParser) :ComponentInstance{
        const check=element.querySelector('.tb-todo-list-state') as HTMLElement
        const content=element.querySelector('.tb-todo-list-content') as HTMLElement
        const slot=new Slot<any>([ContentType.BlockComponent])
        slotParser(slot,content)

        const state:todoListState={
            active:check.className.includes('tb-todo-list-state-active'),
            disabled:check.className.includes('tb-todo-list-state-disabled'),
        }

        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        return todoListComponent.createInstance(context,{state:state,slots:[slot]});
    },
    resources: {
        styles: [
            `
.tb-todo-list {
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
}
.tb-todo-list-item {
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  display: flex;
}
.tb-todo-list-btn {
  margin-right: 0.6em;
}
.tb-todo-list-state {
  display: inline-block;
  margin-top: 3px;
  width: 12px;
  height: 12px;
  border: 2px solid #1296db;
  background: #fff;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
}
.tb-todo-list-state:after {
  content: "";
  position: absolute;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  left: 3px;
  top: 1px;
  width: 4px;
  height: 6px;
  transform: rotateZ(45deg);
}
.tb-todo-list-state-active:after {
  border-color: #1296db;
}
.tb-todo-list-state-disabled {
  opacity: 0.5;
}
.tb-todo-list-content {
  flex: 1;
}
`
        ]
    },
}