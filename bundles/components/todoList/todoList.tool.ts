import { ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {todoListComponent, todoListState} from './todoList.component'

export function todoListToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '插入 todoList 组件',
        tooltip:'插入 todoList 组件',
        onClick() {
            const slot = new Slot([
                ContentType.BlockComponent,
                ContentType.Text
            ])
            slot.write('待办事项')

            const state:todoListState={
                active: false,
                disabled:false,
                
            }
            const component = todoListComponent.createInstance(injector, {state:state,slots:[slot]})
            commander.insert(component)
            selection.setLocation(slot, 0)
        }
    }
}

export const todoListTool:ButtonTool= new ButtonTool(todoListToolConfigFactory)
