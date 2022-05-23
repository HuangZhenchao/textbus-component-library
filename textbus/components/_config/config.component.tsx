import { ComponentLoader, SlotParser } from "@textbus/browser";
import { defineComponent, ComponentMethods, ContentType, ComponentData, useContext, Translator, SlotRender, 
  VElement, useState, ComponentInstance, Injector,Selection} from "@textbus/core";
import { Dialog, Layout } from "@textbus/editor";
import { AlertState } from "../_public-api";
import {JsNewGuid} from "../../utils/common"
export interface PageConfigState{
    pageID:string;
    scrollTop:number;
  }
  
export const pageConfigComponent = defineComponent<ComponentMethods, PageConfigState>({
    type: ContentType.BlockComponent,
    name: 'pageConfigComponent',
    setup(data: ComponentData<PageConfigState>): ComponentMethods {
        const injector = useContext();
        const layout=injector.get(Layout);
        //this.layout.container.parentNode.prepend(this.leftContainer);
        const scroller=layout.scroller
        const translator=injector.get(Translator);
        const dialog = injector.get(Dialog);
        const selection = injector.get(Selection);
        let state=data.state as PageConfigState;
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
  
      const configState:PageConfigState={
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
  