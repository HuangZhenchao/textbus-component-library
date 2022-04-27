import {
    ComponentInstance,
    ComponentMethods,
    ContentType,
    defineComponent, Slot, SlotRender,
    Translator,
    useContext, useSlots, useState, VElement,Selection, ComponentOptions, SlotLiteral, VTextNode, ComponentData, Renderer, useRef, Ref, useSelf, onViewInit
} from "@textbus/core";
import {ComponentLoader, SlotParser} from "@textbus/browser";
import {Injector} from "@tanbo/di";
import { FileUploader, Form, FormSelect, FormSwitch, FormTextarea, FormTextField, headingComponent } from "@textbus/editor";

import G6 from "@antv/g6";
import "./TreeGraph/registerNode"
import { useDragResize } from "@textbus/editor";
import {DateFormat} from "../../utils/Date"
import { componentStyle } from "../type";
export interface TreeGraphState{
    style:componentStyle
    code:string;
    data:string;
}

export const TreeGraphComponent=defineComponent<ComponentMethods,TreeGraphState>({
    name: "TreeGraphComponent",
    type: ContentType.BlockComponent, 
    setup(data: ComponentData<TreeGraphState>): ComponentMethods {
        let state=data.state as TreeGraphState;
        const changeController=useState(state);
        let injector=useContext();
        let render=injector.get(Renderer)
        let selection=injector.get(Selection)
        let instance=useSelf()
        //useState({fill:false,type:'info',slot:slots.toJSON()})
        changeController.onChange.subscribe(newState=>{
            state=newState;
            console.log('changeController',state)
        })
        const ref:Ref<HTMLElement> = useRef();
        useDragResize(ref, rect => {
            changeController.update(draft => {
                Object.assign(draft.style, rect);
            });
        });
        onViewInit(() => {
            var InitG6TreeGraph=new Function("G6","container","data",state.code)
            InitG6TreeGraph(G6,ref.current,JSON.parse(state.data));
        })
        let scriptFlag:boolean=true
        return {
            render(isOutputMode:boolean, slotRender:SlotRender){        
                console.log(state)
                let id='tree-graph-container'+DateFormat("YYYYMMDDHHmmSS")
                console.log('id',id);
                var childVElement:VElement;
                scriptFlag?console.log("true\n\n"):console.log("false\n\n")                                              
                const container=VElement.createElement('div',{
                        ref,
                        id:id,
                        class:"tb-graph",
                        style:state.style,
                        onClick:(e)=>{
                            //let pSlot=instance.parent;
                            selection.selectComponent(instance)
                            //selection.setPosition(pSlot,0)
                            //selection.unSelect()
                            //selection.restore();
                            //selection.selectComponent(instance,true)
                            
                            console.log("selectComponent")
                        }
                    },
                );
                if(!isOutputMode&&ref.current){
                    var refDom=ref.current
                    //var canvas=refDom.querySelector("canvas")
                    state.style.width?refDom.style.width=state.style.width:null,
                    state.style.height?refDom.style.height=state.style.height:null
                    refDom.innerHTML=""
                    var InitG6TreeGraph=new Function("G6","container","data",state.code)
                    //var tgcontainer=document.getElementById(id)
                    InitG6TreeGraph(G6,refDom,JSON.parse(state.data));
                    console.log(refDom.style)
                }
                if(!isOutputMode){
                    scriptFlag=!scriptFlag
                }
                return container;
            }

        }
    }

})

export const TreeGraphComponentLoader:ComponentLoader={
    component: TreeGraphComponent,

    match(element: HTMLElement) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-graph'
    },
    read(element: HTMLElement, context: Injector, slotParser: SlotParser) :ComponentInstance{
        const style = element.style;
        const state:TreeGraphState={
            style:{},
            code: "",
            data: ""
        }
        //slotParser(state.slot,element)
        return TreeGraphComponent.createInstance(context,{state:state});
        
        //const component = new TodoListComponent(listConfig.map(i => i.slot));        
    },
    
    resources: {
        styles: [
            `.tb-graph {
                display: block;
                min-width:500px;
                min-height: 500px;
                max-width:100%;
                
                margin-bottom: 1em;
                background-color: #eee;
              }
              `
        ]
    },
}