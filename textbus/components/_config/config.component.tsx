import { ComponentLoader, SlotParser } from "@textbus/browser";
import { defineComponent, ComponentMethods, ContentType, ComponentData, useContext, Translator, SlotRender, 
  VElement, useState, ComponentInstance, Injector,Selection} from "@textbus/core";
import { Dialog } from "@textbus/editor";
import { AlertState } from "../_public-api";
import {JsNewGuid} from "../../utils/common"
export interface ConfigState{
    pageID:string;
    scrollTop:number;
  }
  
export const pageConfigComponent = defineComponent<ComponentMethods, ConfigState>({
    type: ContentType.BlockComponent,
    name: 'pageConfigComponent',
    setup(data: ComponentData<ConfigState>): ComponentMethods {
        const injector = useContext();
        const translator=injector.get(Translator);
        const dialog = injector.get(Dialog);
        const selection = injector.get(Selection);
        let state=data.state as ConfigState;
        const changeController=useState(state);

        changeController.onChange.subscribe(newState=>{
          state=newState;
        })
        return {
            render(isOutputMode: boolean, slotRender: SlotRender): VElement {          
              const vNode=VElement.createElement('div',{
                      class:"tb-page-config",
                      scrollTop:state.scrollTop,
                      pageID:state.pageID
                  }        
              )
              return vNode
            /*
            return (
                <div class={ classes }>
                <div>这是 Alert 组件，这里的内容是不可以编辑的</div>
                {
                    slotRender(slots.get(0)!, () => {
                    return <div/>
                    })
                }
                </div>
            )*/
            }
        }
    }
})

export const pageConfigComponentLoader: ComponentLoader = {
    component: pageConfigComponent,
    
    match(element: HTMLElement): boolean {
      return element.tagName.toLowerCase() === 'div' && element.className.includes('tb-page-config')
    },
    read(element: HTMLElement, context: Injector, slotParser: SlotParser): ComponentInstance {
      //TODO:从html读取时取出fill和type
  
      const configState:ConfigState={
          pageID:element.getAttribute("pageID")||JsNewGuid(),
          scrollTop:Number(element.getAttribute("scrollTop"))||0
      }
      return pageConfigComponent.createInstance(context, 
        {
          state:configState
        }
      )
    },
    resources: {
      styles: [`
      .tb-page-config{
        display:none;
      }`
      ]
    },
  }
  