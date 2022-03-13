import {blockquoteToolConfigFactory, ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {alertComponent, AlertState} from './alert.component'

export function alertToolConfigFactory(injector):ButtonToolConfig {
  const commander = injector.get(Commander)
  const selection = injector.get(Selection)
  return {
    label: '插入 Alert 组件',
    tooltip:'插入 Alert 组件',
    onClick() {
      const slot = new Slot([
        ContentType.Text,ContentType.BlockComponent,ContentType.InlineComponent
      ])

      const alertState:AlertState={
        fill: true,
        type:'primary',
      }
      const component = alertComponent.createInstance(injector, {slots:[slot],state:alertState})
      commander.insert(component)
      selection.setLocation(slot, 0)
    }
  }
}

export const alertTool:ButtonTool= new ButtonTool(alertToolConfigFactory)
