import {
  Commander,
  ComponentInstance,
  ContentType,
  defineComponent,
  Slot,
  SlotRender, Selection,
  Translator, useContext,
  useSlots, useState,
  VElement, VTextNode, ComponentData, onContextMenu, ComponentMethods, onEnter
} from '@textbus/core'
import {ComponentLoader, createElement, SlotParser} from '@textbus/browser'
import { Injector } from '@tanbo/di'
import {ComponentCreator, SlotComplete} from "../type";
import {Dialog, Form, FormSelect, FormSwitch} from "@textbus/editor";

export interface AlertState{
  fill:boolean;
  type:string;
}

export const alertComponent = defineComponent<ComponentMethods, AlertState>({
  type: ContentType.BlockComponent,
  name: 'AlertComponent',
  setup(data: ComponentData<AlertState>): ComponentMethods {
    const injector = useContext();
    const translator=injector.get(Translator);
    const dialog = injector.get(Dialog);
    const selection = injector.get(Selection);
    const slots = useSlots(data.slots || [new Slot([ContentType.Text]),new SlotComplete()]
    )
    let state=data.state as AlertState;
    const changeController=useState(state);

    changeController.onChange.subscribe(newState=>{
      state=newState;
      console.log('changeController',state)
    })
    const form = new Form({
      confirmBtnText: '确定',
      items: [
        new FormSelect({
          name: 'type',
          label: '类型',
          options: 'default,primary,info,success,warning,danger,dark,gray'.split(',').map(i => {
            return {
              label: i,
              value: i,
              selected: i === state.type
            };
          })
        }),
        new FormSwitch({
          label: '是否填充',
          name: 'fill',
          checked: state.fill
        })
      ]
    });
    form.onComplete.subscribe(map => {
      console.log('component',state)
      changeController.update(draft=>{
        draft.fill=map.get('fill');
        draft.type=map.get('type');
      })
      dialog.hide()
      
    });
    form.onCancel.subscribe(()=>{
      dialog.hide()
    })
    onContextMenu(()=>{
      let submenu='default,primary,info,success,warning,danger,dark,gray'.split(',').map(i => {
        return {
          label: i,
          onClick(){
            changeController.update(draft=>{
              draft.type=i
            })
          }
        };
      })
        return [{
            label:"警告框设置类型",
            submenu:submenu
        },
        {
          label:"警告框设置填充",
          submenu:[{
              label:"是",
              onClick(){
                changeController.update(draft=>{
                  draft.fill=true
                })
              }
          },
          {
              label:"否",
              onClick(){
                changeController.update(draft=>{
                  draft.fill=false
                })
              }
        }]
      }]
    })
    onEnter(ev=>{     
      if(ev.target===slots.get(0)){ 
        ev.preventDefault(); 
      }
      
    })
    return {
      render(isOutputMode: boolean, slotRender: SlotRender): VElement {
        let classes='tb-alert';
        if (state.fill) {
          classes+=' tb-alert-fill';
        }
        if (state.type) {
          classes+=(' tb-alert-' + state.type);
        }
        console.log(classes)
        
        const vNode=VElement.createElement('div',{
              class:classes,
            },
            slots.get(0)?slotRender(slots.get(0)!, () => {
              return <div class="tb-alert-title"/>
            }):'',
            <div class="splitor"></div>,
            slots.get(1)?slotRender(slots.get(1)!, () => {
              return <div class="tb-alert-content"/>
            }):''            
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

export const alertComponentLoader: ComponentLoader = {
  component: alertComponent,
  
  match(element: HTMLElement): boolean {
    return element.tagName.toLowerCase() === 'div' && element.className.includes('tb-alert')
  },
  read(element: HTMLElement, context: Injector, slotParser: SlotParser): ComponentInstance {

    const types='default,primary,info,success,warning,danger,dark,gray'.split(',').map(i => {
      return 'tb-alert-'+i
    })
    let type=''
    element.className.split(' ').forEach(c=>{
      if(types.indexOf(c)){
        type=c.replace('tb-alert-','')
      }
    });
    //TODO:从html读取时取出fill和type

    const alertState:AlertState={
      fill: element.className.includes('tb-alert-fill'),
      type:type,     
    }
    return alertComponent.createInstance(context, 
      {
        slots:[
          slotParser(new Slot([ContentType.Text]), element.querySelector(".tb-alert-title") as HTMLElement),
          slotParser(new SlotComplete(), element.querySelector(".tb-alert-content") as HTMLElement)
        ],
        state:alertState
      }
    )
  },
  resources: {
    styles: [`
    .splitor{
      width:100%;
      height:1px;
      margin:10px 0px;
      background-color:#EFEFEF;
    }
.tb-alert {
  padding: 10px 15px;
  border-radius: 6px;
  border: 1px solid #e9eaec;
  background-color: #f8f8f9;
  color:#000;
  margin-top: 1em;
  margin-bottom: 1em;
  position: relative;
}

.tb-alert.tb-alert-primary {
  border-color: rgba(18, 150, 219, 0.3);
  background-color: rgba(18, 150, 219, 0.15)
}

.tb-alert.tb-alert-primary.tb-alert-fill {
  color: #fff;
  background-color: #1296db
}

.tb-alert.tb-alert-success {
  border-color: rgba(21, 189, 154, 0.3);
  background-color: rgba(21, 189, 154, 0.15)
}

.tb-alert.tb-alert-success.tb-alert-fill {
  color: #fff;
  background-color: #15bd9a
}

.tb-alert.tb-alert-info {
  border-color: rgba(106, 209, 236, 0.3);
  background-color: rgba(106, 209, 236, 0.15)
}

.tb-alert.tb-alert-info.tb-alert-fill {
  color: #fff;
  background-color: #6ad1ec
}

.tb-alert.tb-alert-warning {
  border-color: rgba(255, 153, 0, 0.3);
  background-color: rgba(255, 153, 0, 0.15)
}

.tb-alert.tb-alert-warning.tb-alert-fill {
  color: #fff;
  background-color: #f90
}

.tb-alert.tb-alert-danger {
  border-color: rgba(231, 79, 94, 0.3);
  background-color: rgba(231, 79, 94, 0.15)
}

.tb-alert.tb-alert-danger.tb-alert-fill {
  color: #fff;
  background-color: #E74F5E
}

.tb-alert.tb-alert-dark {
  border-color: rgba(73, 80, 96, 0.3);
  background-color: rgba(73, 80, 96, 0.15)
}

.tb-alert.tb-alert-dark.tb-alert-fill {
  color: #fff;
  background-color: #495060
}

.tb-alert.tb-alert-gray {
  border-color: rgba(187, 190, 196, 0.3);
  background-color: rgba(187, 190, 196, 0.15)
}

.tb-alert.tb-alert-gray.tb-alert-fill {
  color: #fff;
  background-color: #bbbec4
}

.tb-alert-fill code {
  background-color: rgba(255, 255, 255, 0.2);
  border: none
}`
    ]
  },
}

export const alertComponentCreator:ComponentCreator={
  name: '警告框',
  category: 'TextBus',
  example: `<img src="data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg width="100" height="70" xmlns="http://www.w3.org/2000/svg"><g><rect fill="#fff" height="100%" width="100%"/></g><rect width="90%" height="20" fill="#eee" stroke="#dedede" rx="5" ry="5" x="5" y="25"></rect><text font-family="Helvetica, Arial, sans-serif" font-size="10" x="10" y="35" stroke-width="0" stroke="#000" fill="#000000">文本内容</text></svg>')}">`,
  create(injector){
    const commander=injector.get(Commander)
    const selection=injector.get(Selection)
    const slot = new Slot([
      ContentType.Text,ContentType.BlockComponent,ContentType.InlineComponent
    ])

    const alertState:AlertState={
      fill: true,
      type:'primary',
    }
    const component = alertComponent.createInstance(injector, {slots:[slot],state:alertState});

    commander.insert(component)
    //selection.setLocation(slot, 0)
  },
}