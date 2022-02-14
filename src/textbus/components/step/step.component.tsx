import {
    ComponentInstance,
    ComponentMethods,
    ContentType,
    defineComponent, Slot, SlotRender,
    Translator,
    useContext, useSlots, useState, VElement
} from "@textbus/core";
import {ComponentLoader, SlotParser} from "@textbus/browser";
import {Injector} from "@tanbo/di";
import {todoListState} from "@/textbus/components/todoList/todoList.component";
import {SlotLiteral} from "@textbus/core";
import {TimelineItemSlot} from "@/textbus/components/timeline/timeline.component";

export class StepSlot extends Slot{
    constructor() {
        super([ContentType.BlockComponent,ContentType.Text]);
        this.write('标题\n描述')
    }
}
export interface stepState{
    slots:StepSlot[],
    step:number
}
export interface stepSlotLiteral{
    slotLiterals:SlotLiteral[],
    step:number
}
export const stepComponent=defineComponent<ComponentMethods,stepSlotLiteral,stepState>({
    name: "stepComponent",
    type: ContentType.BlockComponent,
    transform(translator: Translator, state: stepSlotLiteral): stepState {
        return {
            step:state.step,
            slots:state.slotLiterals.map(slotLiteral=>{
                return translator.createSlot(slotLiteral)
            })
        }
    },
    setup(initState: stepState): ComponentMethods {
        const injector = useContext();
        const translator=injector.get(Translator);
        const slots = useSlots(initState.slots || [ new StepSlot()], (value) => {
            console.log('restore',value)
            return new TimelineItemSlot('')
        })

        let info={step:initState.step}
        const changeController=useState(info);
        changeController.onChange.subscribe(newState=>{
            info=newState;
            console.log('changeController',info)
        })
        return {
            render(isOutputMode:boolean, slotRender:SlotRender){

                const createItem = function(item,index){
                    let classes = 'tb-waiting';
                    if (index < info.step) {
                        classes = 'tb-complete';
                    }
                    else if (index === info.step) {
                        classes = 'tb-current';
                    }
                    return VElement.createElement("div", { class: 'tb-step-item ' + classes },
                        VElement.createElement("div", { class: "tb-step-item-header" },
                            VElement.createElement("div", { class: "tb-step-item-line" }),
                            VElement.createElement("div", { class: "tb-step-item-icon", onClick: () => {
                                    const currentStep = info.step;
                                    let newStep=currentStep
                                    if (index === currentStep) {
                                        newStep = index + 1;
                                    }
                                    else if (index + 1 === currentStep) {
                                        newStep = index - 1;
                                    }
                                    else {
                                        newStep = index;
                                    }
                                    changeController.update(draft => {
                                        draft.step=newStep;
                                    })
                                } }, index + 1)
                        ),
                        slotRender(item, () => {
                            return <div class='tb-step-item-content'/>
                        }),
                        !isOutputMode && VElement.createElement("span", { class: "tb-step-item-add", onClick: () => {
                                slots.insertByIndex(new StepSlot(),index + 1);
                                // 当前新插入的item后面的item需要更新序号
                                changeController.update(draft => {})
                            }})
                    )
                };
                return VElement.createElement('div', {
                        class:'tb-step',
                        step: info.step
                    },
                    slots.toArray().map((slot,index) => {
                        return createItem(slot,index);
                    })
                );

            },

            toJSON(){
                return {
                    step:info.step,
                    slotLiterals:slots.toArray().map(slot=>{
                        return slot.toJSON()
                    })
                }
            }

        }
    }

})
export const stepComponentLoader:ComponentLoader={
    component: stepComponent,

    match(element: HTMLElement) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-step'
    },
    read(element: HTMLElement, context: Injector, slotParser: SlotParser) :ComponentInstance{
        let initState:stepState={
            step:Number(element.getAttribute('step'))||0,
            slots:Array.from(element.children).map(child => {
                return slotParser(new StepSlot(),child as HTMLElement)
            })
        }

        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        return stepComponent.createInstance(context,initState);
    },
    resources: {
        styles: [
            `
.tb-step {
  display: flex;
}
.tb-step-item {
  position: relative;
  flex: 1;
}

.tb-step-item:last-child .tb-step-item-line {
  display: none;
}

.tb-step-item.tb-complete .tb-step-item-line {
  border-top-color: #15bd9a;
}
.tb-step-item.tb-complete .tb-step-item-icon {
  background-color: #15bd9a;
}

.tb-step-item.tb-current .tb-step-item-line {
  border-top-style: dashed;
}
.tb-step-item.tb-current .tb-step-item-icon {
  background-color: #1296db;
}

.tb-step-item.tb-waiting .tb-step-item-line {
  border-top-style: dashed;
}

.tb-step-item.tb-waiting .tb-step-item-icon {
  background-color: #bbbec4;
}
.tb-step-item.tb-waiting .tb-step-item-content {
  opacity: .8;
}

.tb-step-item-header {
  position: relative;
  margin-bottom: 1em;
}

.tb-step-item-icon {
  width: 1.6em;
  height: 1.6em;
  border-radius: 50%;
  position: relative;
  text-align: center;
  line-height: 1.6em;
  color: #fff;
  font-weight: 500;
}

.tb-step-item-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  border-top: 1px solid #dddee1;
}

.tb-step-item-content {
  padding-right: 15px;
}

.tb-step-title {
  font-weight: 500;
  margin: 0;
  font-size: 1.2em;
}

.tb-step-title > small {
  font-weight: normal;
  opacity: .8;
}

.tb-step-content {
  font-weight: normal;
  margin: 0;
}
`
        ],
        editModeStyles: [
            `
.tb-step-item-add {
  position: absolute;
  right:0;
  top: 0;
  display: none;
  cursor: pointer;
}

.tb-step-item-add:hover {
  transform: scale(1.2);
}

.tb-step-item-add:after {
  content: "+"
}
.tb-step-item:hover .tb-step-item-add {
  display: block;
}

.tb-step-item-icon {
  cursor: pointer;
}
`
        ]
    },
}