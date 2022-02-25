import {blockquoteToolConfigFactory, ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {selectComponent, selectState} from './select.component'

export function selectToolConfigFactory(injector):ButtonToolConfig {
  const commander = injector.get(Commander)
  const selection = injector.get(Selection)
  return {
    label: '插入 select 组件',
    tooltip:'插入 select 组件',
    onClick() {

      const selectState:selectState={
        value: 'true',

      }
      const component = selectComponent.createInstance(injector, selectState)
      commander.insert(component)
    }
  }
}

export const selectTool:ButtonTool= new ButtonTool(selectToolConfigFactory)
