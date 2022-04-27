import { ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {katexBlockComponent, katexInlineComponent, katexState} from './katex.component'

export function katexInlineToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '行内数学公式',
        tooltip:'行内数学公式',
        onClick() {
            const state:katexState={
                //block:false,
                source:`a b^{cd} efghijklmnopqrstuvwxyz`
                
            }
            const component = katexInlineComponent.createInstance(injector, {state:state})
            commander.insert(component)
            //selection.setPosition(slot, 0)
        }
    }
}
export function katexBlockToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '块级数学公式',
        tooltip:'块级数学公式',
        onClick() {
            const state:katexState={
                //block:false,
                source:`a b^{cd} efghijklmnopqrstuvwxyz`
                
            }
            const component = katexBlockComponent.createInstance(injector, {state:state})
            commander.insert(component)
            //selection.setPosition(slot, 0)
        }
    }
}
export const katexInlineTool:ButtonTool= new ButtonTool(katexInlineToolConfigFactory)
export const katexBlockTool:ButtonTool= new ButtonTool(katexBlockToolConfigFactory)

