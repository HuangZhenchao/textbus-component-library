import {blockquoteToolConfigFactory, ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {alertComponent, AlertState} from './alert.component'
import { ComponentCreator, SlotComplete } from '../type'

export function alertToolConfigFactory(injector):ButtonToolConfig {
  const commander = injector.get(Commander)
  const selection = injector.get(Selection)
  return {
    label: '警告框',
    tooltip:'警告框',
    keymap: /win(dows|32|64)/i.test(navigator.userAgent) ? {
        altKey: true,
        key: 'a'
    } : {
        ctrlKey: true,
        key: 'a'
    },
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

export const alertExample=`<img src="data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg width="100" height="70" xmlns="http://www.w3.org/2000/svg"><g><rect fill="#fff" height="100%" width="100%"/></g><rect width="90%" height="20" fill="#eee" stroke="#dedede" rx="5" ry="5" x="5" y="25"></rect><text font-family="Helvetica, Arial, sans-serif" font-size="10" x="10" y="35" stroke-width="0" stroke="#000" fill="#000000">文本内容</text></svg>')}">`
