import {blockquoteToolConfigFactory, ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {alertComponent, AlertState} from './alert.component'
import { SlotComplete } from '../type'

export function alertToolConfigFactory(injector):ButtonToolConfig {
  const commander = injector.get(Commander)
  const selection = injector.get(Selection)
  return {
    label: '警告框',
    tooltip:'警告框',
    onClick() {
      const slot = new Slot([ContentType.Text])
      slot.insert("这是Alert组件")
      const alertState:AlertState={
        fill: true,
        type:'primary',
      }
      const component = alertComponent.createInstance(injector, 
        {
          slots:[
            slot,
            new SlotComplete()
          ],
          state:alertState
        }
      )
    
      commander.insert(component)
      selection.setPosition(slot, slot.length)
    }
  }
}

export function alertTool(){
  return new ButtonTool(alertToolConfigFactory)
}
