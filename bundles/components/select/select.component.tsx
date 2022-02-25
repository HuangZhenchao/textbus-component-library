import {
    Commander,
    Component,
    ComponentInstance,
    ComponentMethods,
    ContentType,
    defineComponent,
    Slot,
    SlotLiteral,
    SlotRender, Selection,
    Translator, useContext,
    useSlots, useState,
    VElement, VTextNode
  } from '@textbus/core'
  import {ComponentLoader, createElement, SlotParser} from '@textbus/browser'
  import { Injector } from '@tanbo/di'
  import {ComponentCreator} from "../type";
  import {Form, FormSelect, FormSwitch} from "@textbus/editor";
  
  export interface selectState{
    value:any
  }

  export const selectComponent = defineComponent<ComponentMethods, selectState, selectState>({
    type: ContentType.BlockComponent,
    name: 'selectComponent',
    transform(translator: Translator, state: selectState): selectState {
      return {
        ...state,
        //slot:translator.createSlot(state.slot)
      }
    },
    setup(initState: selectState): ComponentMethods {
      const injector = useContext();
      const translator=injector.get(Translator);
 
      const changeController=useState(initState);
      //useState({fill:false,type:'info',slot:slots.toJSON()})
      changeController.onChange.subscribe(state=>{
        initState=state;
        console.log('changeController',state)
      })
  
      return {
        render(isOutputMode: boolean, slotRender: SlotRender): VElement {

          const vNode=VElement.createElement('div',{
            class:'tb-select',
          },[
            VElement.createElement('select',{
                onChange:(event)=>{
                    console.log(event,event.originalTarget.value)
                    initState.value='';
                }
            },[<option value ="volvo">Volvo</option>,
            <option value ="saab">Saab</option>,
            <option value="opel">Opel</option>,
            <option value="audi">Audi</option>])         
          ])
          console.log(vNode)
          return vNode
        },
        toJSON(): any {
          return {
            value: initState.value,
          }
        }
      }
    }
  })
  
  export const selectComponentLoader: ComponentLoader = {
    component: selectComponent,
    
    match(element: HTMLElement): boolean {
      console.log('match',element)
      return element.tagName.toLowerCase() === 'div' && element.className.includes('tb-select')
    },
    read(element: HTMLElement, context: Injector, slotParser: SlotParser): ComponentInstance {
  
      const selectState:selectState={                                 
        value:'type',
      }
      console.log('read',selectState)
      return selectComponent.createInstance(context, selectState)
    },
    resources: {
      styles: [`
  .tb-select {
    padding: 10px 15px;
    border-radius: 6px;
    border: 1px solid #e9eaec;
    background-color: #f8f8f9;
    margin-top: 1em;
    margin-bottom: 1em
  }
    `
      ]
    },
  }
  
  