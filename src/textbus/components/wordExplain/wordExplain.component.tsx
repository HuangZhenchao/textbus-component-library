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

export class WordExplainTitleSlot extends Slot{
    constructor() {
        super([ContentType.Text]);
        this.write('标题')
    }
}
export class WordExplainSubtitleSlot extends Slot{
    constructor() {
        super([ContentType.Text]);
        this.write('副标题')
    }
}
export class WordExplainDetailSlot extends Slot{
    constructor() {
        super([ContentType.BlockComponent,ContentType.Text,ContentType.InlineComponent]);
        this.write('<div>描述</div>')
    }
}
export interface wordExplainInfo{
    width:string
}
export interface wordExplainState{
    width:string,
    titleSlot:WordExplainTitleSlot,
    subtitleSlot:WordExplainSubtitleSlot,
    detailSlot:WordExplainDetailSlot,
}
export interface wordExplainSlotLiteral{
    width:string,
    titleSlotLiteral:SlotLiteral,
    subtitleSlotLiteral:SlotLiteral,
    detailSlotLiteral:SlotLiteral,
}
export const wordExplainComponent=defineComponent<ComponentMethods,wordExplainSlotLiteral,wordExplainState>({
    name: "wordExplainComponent",
    type: ContentType.BlockComponent,
    transform(translator: Translator, slotLiteral: wordExplainSlotLiteral): wordExplainState {
        return {
            width:slotLiteral.width,
            titleSlot:translator.createSlot(slotLiteral.titleSlotLiteral),
            subtitleSlot:translator.createSlot(slotLiteral.subtitleSlotLiteral),
            detailSlot:translator.createSlot(slotLiteral.detailSlotLiteral),
        }
    },
    setup(initState: wordExplainState): ComponentMethods {
        const injector = useContext();
        const translator=injector.get(Translator);

        let state=initState
        let slots=useSlots([
            initState.titleSlot,
            initState.subtitleSlot,
            initState.detailSlot
        ],(state)=>{
            return translator.createSlot(state)
        })
        const changeController=useState(state);
        changeController.onChange.subscribe(newState=>{
            state=newState;
            console.log('changeController',state)
        })
        return {
            render(isOutputMode:boolean, slotRender:SlotRender){
                return (VElement.createElement("div", {class:'tb-word-explain'},
                    VElement.createElement("div", { class: "tb-word-explain-title-group", style: { width: initState.width } },
                        slotRender(initState.titleSlot, ()=>{return VElement.createElement("div", { class: "tb-word-explain-title" })}),
                        slotRender(initState.subtitleSlot, ()=>{return VElement.createElement("div", { class: "tb-word-explain-subtitle" })})
                    ),
                        slotRender(initState.detailSlot, ()=>{return VElement.createElement("div", { class: "tb-word-explain-detail" })}),
                    !isOutputMode && VElement.createElement("span", { class: "tb-word-explain-close", onClick: () => {
                            const instance = slots.get(0)?.parent as ComponentInstance;
                            const pSlot = instance?.parent;
                            console.log('delete',pSlot?.removeComponent(instance))

                        } })
                    )
                );

            },

            toJSON(){
                return {
                    width:state.width,
                    titleSlotLiteral:slots.get(0)?.toJSON(),
                    subtitleSlotLiteral:slots.get(1)?.toJSON(),
                    detailSlotLiteral:slots.get(2)?.toJSON(),
                }
            }

        }
    }

})
export const wordExplainComponentLoader:ComponentLoader={
    component: wordExplainComponent,

    match(element: HTMLElement) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-word-explain'
    },
    read(element: HTMLElement, context: Injector, slotParser: SlotParser) :ComponentInstance{
        let initState:wordExplainState={
            width:'200px',
            titleSlot:slotParser(new WordExplainTitleSlot(),element.querySelector('.tb-word-explain-title') as HTMLElement),
            subtitleSlot:slotParser(new WordExplainSubtitleSlot(),element.querySelector('.tb-word-explain-subtitle') as HTMLElement),
            detailSlot:slotParser(new WordExplainDetailSlot(),element.querySelector('.tb-word-explain-detail') as HTMLElement)
        }

        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        return wordExplainComponent.createInstance(context,initState);
    },
    resources: {
        styles: [
            `
.tb-word-explain {
  display: flex;
  margin-top: 1em;
  margin-bottom: 1em;
  padding: 10px 20px;
  background-color: #f8f8f9;
  border-radius: 10px;
}

.tb-word-explain-title-group {
  width: 140px;
  padding-right: 20px;
}
.tb-word-explain-title {
  margin:0;
  font-size: inherit;
}
.tb-word-explain-subtitle {
  margin: 0;
  font-weight: 300;
  font-size: 0.9em;
}
.tb-word-explain-detail {
  flex: 1;
  padding-left: 20px;
  border-left: 1px dashed #ddd;
}
@media screen and (max-width: 767px) {
  .tb-word-explain {
    display: block;
  }
  .tb-word-explain-title-group {
    width: auto !important;
    padding-right: 0;
    display: flex;
    align-items: baseline;
    padding-bottom: 0.5em;
    margin-bottom: 0.5em;
    border-bottom: 1px dashed #ddd;
  }
  .tb-word-explain-subtitle {
    margin-left: 0.5em;
    font-weight: 300;
    font-size: 0.9em;
  }
  .tb-word-explain-detail {
    padding-left: 0;
    border-left: none;
  }
}
`
        ],
        editModeStyles: [
            `
.tb-word-explain {
  position: relative;
}
.tb-word-explain:hover .tb-word-explain-close {
  display: block;
}
.tb-word-explain-close {
  display: none;
  position: absolute;
  right: 10px;
  top: 0;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}
.tb-word-explain-close:hover {
  transform: scale(1.2);
}
.tb-word-explain-close:before {
  content: "\u00d7";
}
`
        ]
    },
}