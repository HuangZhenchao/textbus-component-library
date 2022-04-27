import { ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {progressComponent, ProgressState} from './progress.component'

export function progressToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '进度条',
        tooltip:'进度条',
        onClick() {
            const state:ProgressState={
                type:'primary',
                progress:50,
                max:100,
                min:0
            }
            const component = progressComponent.createInstance(injector, {state:state})
            commander.insert(component)
            //selection.setPosition(slot, 0)
        }
    }
}

export const progressTool:ButtonTool= new ButtonTool(progressToolConfigFactory)
