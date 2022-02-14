import {
    ComponentInstance,
    ComponentMethods,
    ContentType,
    defineComponent,
    Slot,
    SlotRender,
    Translator,
    useContext,
    useSlots,
    useState,
    VElement
} from "@textbus/core";
import {ComponentLoader, SlotParser} from "@textbus/browser";
import {Injector} from "@tanbo/di";
import {SlotLiteral} from "@textbus/core";


export class TimelineItemSlot extends Slot{
    constructor(type) {
        super([ContentType.BlockComponent,ContentType.Text],{
            type:type
        });
        this.write('时间线')
    }
}
export interface timelineSlot{
    itemSlots: TimelineItemSlot[];
}
export interface timelineSlotLiteral{
    itemSlotLiterals:SlotLiteral[]
}
const timelineTypes = ['primary', 'info', 'success', 'warning', 'danger', 'dark', 'gray'];
const colors = ['#1296db', '#6ad1ec', '#15bd9a', '#ff9900', '#E74F5E', '#495060', '#bbbec4'];

export const timelineComponent=defineComponent<ComponentMethods,timelineSlotLiteral,timelineSlot>({
    name: "timelineComponent",
    type: ContentType.BlockComponent,
    transform(translator: Translator, state: timelineSlotLiteral): timelineSlot {
        return {
            itemSlots:state.itemSlotLiterals.map((item)=>{
                return translator.createSlot(item)
            })}
    },
    setup(initState: timelineSlot): ComponentMethods {
        const injector = useContext();
        const translator=injector.get(Translator);
        const slots = useSlots(initState.itemSlots || [ new TimelineItemSlot('primary')], () => {
            return new TimelineItemSlot('primary')
        })
        //slots.get(0).state.type=''
        let info={count:1}
        const changeController=useState(info);
        //useState({fill:false,type:'info',slot:slots.toJSON()})
        changeController.onChange.subscribe(newState=>{
            info=newState;
            console.log('changeController',info)
        })
        return {
            render(isOutputMode:boolean, slotRender:SlotRender){
                let items=slots.toArray().map((item ,index)=>{
                    const classes = ['tb-timeline-item'];
                    if (item.state.type) {
                        classes.push('tb-timeline-item-' + item.state.type);
                    }
                    return VElement.createElement('div',{
                        class:classes.join(' ')
                    },[
                        VElement.createElement("div", { class: "tb-timeline-line" }),
                        VElement.createElement("div", { class: "tb-timeline-icon", title: isOutputMode ? null : '点击切换颜色', onClick: () => {
                            const slot=slots.get(index)
                            console.log('slot',item);
                            let currentType = item.state.type||'';
                            if (!currentType) {
                                currentType = timelineTypes[0];
                            }
                            else {
                                currentType = timelineTypes[timelineTypes.indexOf(currentType) + 1] || '';
                            }
                            slot?.updateState(draft => {
                                draft.type=currentType
                            })
                                changeController.update(draft => {})
                        } }),
                        !isOutputMode && VElement.createElement("span", { class: "tb-timeline-add", onClick: () => {
                                console.log('tb-timeline-add',index+1)
                                slots.insertByIndex(new TimelineItemSlot('primary'),index+1);
                            } }),
                        slotRender(item, () => {
                            return <div class='tb-todo-list-content'/>
                        })
                    ]);
                });
                console.log('el',items);
                return VElement.createElement('div',{
                    class:'tb-timeline'
                },items);

            },

            toJSON(){
                return {itemSlotLiterals:slots.toArray().map(slot=>{
                        return slot.toJSON()
                    })}
            }

        }
    }

})
export const timelineComponentLoader:ComponentLoader={
    component: timelineComponent,

    match(element: HTMLElement) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-timeline'
    },
    read(element: HTMLElement, context: Injector, slotParser: SlotParser) :ComponentInstance{
        //const check=element.querySelector('.tb-todo-list-state') as HTMLElement
        const content=element.querySelector('.tb-timeline-content') as HTMLElement
        const slot=new Slot<any>([ContentType.BlockComponent,ContentType.Text])
        slotParser(slot,content)

        let state:timelineSlot={
            itemSlots:[new TimelineItemSlot('primary')]
        }

        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        return timelineComponent.createInstance(context,state);
    },
    resources: {
        styles: [
            `
.tb-timeline {
  display: block;
  padding-top: 1em;
  padding-left: 5px;
}
.tb-timeline-item {
  display: block;
  position: relative;
  padding-left: 1.5em;
  padding-bottom: 0.5em;
  opacity: .76;
}

.tb-timeline-item:first-of-type > .tb-timeline-line{
  top: 1em;
}

.tb-timeline-item:last-of-type > .tb-timeline-line{
  bottom: calc(100% - 1em);
}

.tb-timeline-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  border-left: 1px solid #dddee1;
}

.tb-timeline-icon {
  box-sizing: border-box;
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  left: -4px;
  top: .5em;
  background-color: #fff;
  border: 1px solid #bbbec4;
}

` + colors.map((value, index) => {
                return `
  .tb-timeline-item-${timelineTypes[index]} {
    opacity: 1;
  }
  .tb-timeline-item-${timelineTypes[index]} >.tb-timeline-icon {
    border-color: ${value};
    background-color: ${value};
  }
  .tb-timeline-item-${timelineTypes[index]} >.tb-timeline-line {
    border-color: ${value};
  }
  `;
            }).join('\n')
        ],
        editModeStyles: [
            `
.tb-timeline-icon:hover {
  transform: scale(1.2);
  cursor: pointer;
}
.tb-timeline-add {
  display: none;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}
.tb-timeline-add:before {
  content: "+";
}
.tb-timeline-add:hover {
  transform: scale(1.2);
}

.tb-timeline-item:hover .tb-timeline-add {
  display: block;
}
.tb-timeline-content {
  overflow: hidden;
}
`
        ]
    },
}