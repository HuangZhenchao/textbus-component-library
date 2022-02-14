import { ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {katexComponent, katexState} from './katex.component'

export function katexToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '插入 katex 组件',
        tooltip:'插入 katex 组件',
        onClick() {
            const state:katexState={
                block:true,
                source:`a b^{cd} efghijklmnopqrstuvwxyz`
                
            }
            const component = katexComponent.createInstance(injector, state)
            commander.insert(component)
            //selection.setLocation(slot, 0)
        }
    }
}

export const katexTool:ButtonTool= new ButtonTool(katexToolConfigFactory)
