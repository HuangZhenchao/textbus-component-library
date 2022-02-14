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

export interface AlertState{
  fill:boolean;
  type:string;
  slot: SlotLiteral;
}

export const alertComponent = defineComponent<ComponentMethods, AlertState, AlertState>({
  type: ContentType.BlockComponent,
  name: 'AlertComponent',
  transform(translator: Translator, state: AlertState): AlertState {
    return {
      ...state,
      //slot:translator.createSlot(state.slot)
    }
  },
  setup(initState: AlertState): ComponentMethods {
    const injector = useContext();
    const translator=injector.get(Translator);
    const slots = useSlots([
      translator.createSlot(initState.slot) ||new Slot([
        ContentType.Text
      ])
    ], () => {
      return new Slot([
        ContentType.Text
      ])
    })
    const changeController=useState(initState);
    //useState({fill:false,type:'info',slot:slots.toJSON()})
    changeController.onChange.subscribe(state=>{
      initState=state;
      console.log('changeController',state)
    })

    return {
      render(isOutputMode: boolean, slotRender: SlotRender): VElement {
        let classes='tb-alert';
        if (initState.fill) {
          classes+=' tb-alert-fill';
        }
        if (initState.type) {
          classes+=(' tb-alert-' + initState.type);
        }
        console.log(classes)
        const vNode=VElement.createElement('div',{
          class:classes,
        },[
            <div>这是 Alert 组件，这里的内容是不可以编辑的</div>,
            slotRender(slots.get(0)!, () => {
              return <div/>
            }),
        ])
        console.log(vNode)
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
      },
      toJSON(): any {
        return {
          fill: initState.fill,
          type:initState.type,
          slot:slots.get(0)!.toJSON()
        }
      }
    }
  }
})

export const alertComponentLoader: ComponentLoader = {
  component: alertComponent,
  resources: {
    styles: [`
.tb-alert {
  padding: 10px 15px;
  border-radius: 6px;
  border: 1px solid #e9eaec;
  background-color: #f8f8f9;
  margin-top: 1em;
  margin-bottom: 1em
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
  match(element: HTMLElement): boolean {
    console.log('match',element)
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
    const slot = new Slot([
      ContentType.Text
    ])

    slotParser(slot, element.children[1]! as HTMLElement)
    const alertState:AlertState={
      fill: element.className.includes('tb-alert-fill'),
      type:type,
      slot:slot.toJSON()
    }
    console.log('read',alertState)
    return alertComponent.createInstance(context, alertState)
  }
}

export class AlertComponentSetter {
  constructor() {
  }
  static create(instance) {
    const form = new Form({
      mini: true,
      confirmBtnText: '确定',
      items: [
        new FormSelect({
          name: 'type',
          label: '类型',
          options: 'default,primary,info,success,warning,danger,dark,gray'.split(',').map(i => {
            return {
              label: i,
              value: i,
              selected: i === instance.methods.toJSON().type
            };
          })
        }),
        new FormSwitch({
          label: '是否填充',
          name: 'fill',
          checked: instance.methods.toJSON().fill
        })
      ]
    });
    form.onComplete.subscribe(map => {
      console.log('component',instance)
      instance.updateState(draft=>{
        draft.fill=map.get('fill');
        draft.type=map.get('type');
      })
      
    });
    return {
      title: '警告框设置',
      view: form.elementRef
    };
  }
};

export const alertComponentCreator:ComponentCreator={
  name: '警告框',
  category: 'TextBus',
  example: `<img src="data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg width="100" height="70" xmlns="http://www.w3.org/2000/svg"><g><rect fill="#fff" height="100%" width="100%"/></g><rect width="90%" height="20" fill="#eee" stroke="#dedede" rx="5" ry="5" x="5" y="25"></rect><text font-family="Helvetica, Arial, sans-serif" font-size="10" x="10" y="35" stroke-width="0" stroke="#000" fill="#000000">文本内容</text></svg>')}">`,
  create(injector){
    const commander=injector.get(Commander)
    const selection=injector.get(Selection)
    const slot = new Slot([
      ContentType.Text
    ])

    const alertState:AlertState={
      fill: true,
      type:'primary',
      slot:slot.toJSON()
    }
    const component = alertComponent.createInstance(injector, alertState);

    commander.insert(component)
    selection.setLocation(slot, 0)
  },
}