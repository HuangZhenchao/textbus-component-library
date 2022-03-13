import { ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {katexBlockComponent, katexInlineComponent, katexState} from './katex.component'

export function katexInlineToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '插入 katexInline 组件',
        tooltip:'插入 katexInline 组件',
        onClick() {
            const state:katexState={
                //block:false,
                source:`a b^{cd} efghijklmnopqrstuvwxyz`
                
            }
            const component = katexInlineComponent.createInstance(injector, {state:state})
            commander.insert(component)
            //selection.setLocation(slot, 0)
        }
    }
}
export function katexBlockToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '插入 katexBlock 组件',
        tooltip:'插入 katexBlock 组件',
        onClick() {
            const state:katexState={
                //block:false,
                source:`a b^{cd} efghijklmnopqrstuvwxyz`
                
            }
            const component = katexBlockComponent.createInstance(injector, {state:state})
            commander.insert(component)
            //selection.setLocation(slot, 0)
        }
    }
}
export const katexInlineTool:ButtonTool= new ButtonTool(katexInlineToolConfigFactory)
export const katexBlockTool:ButtonTool= new ButtonTool(katexBlockToolConfigFactory)

