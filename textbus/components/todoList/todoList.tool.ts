import { ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {todoListComponent, todoListState} from './todoList.component'

export function todoListToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '待办事项',
        tooltip:'待办事项',
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
            selection.setPosition(slot, 0)
        }
    }
}

export const todoListTool:ButtonTool= new ButtonTool(todoListToolConfigFactory)

export const todoListExample= `<img alt="默认图片" src="data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg width="100" height="70" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><g><rect fill="#fff" height="100%" width="100%"/></g><defs><g id="item"><rect fill="#fff" stroke="#1296db" height="8" width="8" rx="2" x="15" y="12"/><text font-family="Helvetica, Arial, sans-serif" font-size="8" x="28" y="19"  stroke-width="0" stroke="#000" fill="#000000">待办事项...</text></g></defs><use xlink:href="#item"></use><use xlink:href="#item" transform="translate(0, 12)"></use><use xlink:href="#item" transform="translate(0, 24)"></use><use xlink:href="#item" transform="translate(0, 36)"></use></svg>')}">`;