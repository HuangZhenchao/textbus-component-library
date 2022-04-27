import {
    ComponentInstance,
    ComponentMethods,
    ContentType,
    defineComponent,
    Slot,
    SlotLiteral,
    SlotRender, Selection,
    Translator, useContext,
    useSlots, useState,
    VElement, VTextNode, ComponentData
  } from '@textbus/core'
  import {ComponentLoader, createElement, SlotParser} from '@textbus/browser'
  import { Injector } from '@tanbo/di'
  

  export interface detailState{
    text:['产品介绍','产品特性','支持版本','安装方式']
  }
/*
  export interface detailState{
    presentation:Slot,
    features:Slot,
    version:Slot,
    installWay:Slot
  }
*/
  export const detailComponent = defineComponent<ComponentMethods, null>({
    type: ContentType.BlockComponent,
    name: 'detailComponent',

    setup(data: ComponentData<null>): ComponentMethods {
      const injector = useContext();
      const translator=injector.get(Translator);
      let state={} 
      const slots=useSlots(data.slots||[new Slot([ContentType.Text]),new Slot([ContentType.Text]),new Slot([ContentType.Text]),new Slot([ContentType.Text])])
      const changeController=useState(state);
      //useState({fill:false,type:'info',slot:slots.toJSON()})
      changeController.onChange.subscribe(newState=>{
        state=newState;
        console.log('changeController',state)
      })
  
      return {
        render(isOutputMode: boolean, slotRender: SlotRender): VElement {
          const textItem=['产品介绍','产品特性','支持版本','安装方式'];
          const createItem=function(index){
            const icon=VElement.createElement('i',{class:''});            
            const title=new VElement('span',{
              class:"detail-item-title"
            },[icon,new VTextNode(textItem[index])]);
            const Item=VElement.createElement('div',{
              class:"detail-item"
            },[title,slotRender(slots.get(index)!,()=>{
                return <div class="detail-item-content"/>
            })]);
            return Item;
          }
          const vNode=VElement.createElement('div',{
            class:'tb-product-detail',
          },slots.toArray().map((value,index)=>{
            console.log(index)
            return createItem(index)
          }))
          console.log(vNode)
          return vNode
        }
      }
    }
  })
  
export const detailComponentLoader: ComponentLoader = {
    component: detailComponent,
    
    match(element: HTMLElement): boolean {
      return element.tagName.toLowerCase() === 'div' && element.className.includes('tb-product-detail')
    },
    read(element: HTMLElement, context: Injector, slotParser: SlotParser): ComponentInstance {
      let slots:Slot[]=[];
      element.querySelectorAll('.detail-item-content').forEach(el=>{
        const slot=new Slot([ContentType.Text])
        slotParser(slot,el as HTMLElement)
        slots.push(slot)
      })

      return detailComponent.createInstance(context, {slots:slots})
    },
    resources: {
      styles: [`
  .tb-product-detail {
    padding: 10px 15px;
    border-radius: 6px;
    border: 1px solid #e9eaec;
    background-color: #f8f8f9;
    margin-top: 1em;
    margin-bottom: 1em
  }
  .detail-item{

  }
  .detail-item-content{
    min-height:100px;
  }
  .detail-item-title{

  }
    `
      ]
    },
}
  
  