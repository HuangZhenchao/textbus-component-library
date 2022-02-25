import { ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {progressComponent, ProgressConfig} from './progress.component'

export function progressToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '插入 progress 组件',
        tooltip:'插入 progress 组件',
        onClick() {
            const state:ProgressConfig={
                type:'primary',
                progress:50,
                max:100,
                min:0
            }
            const component = progressComponent.createInstance(injector, state)
            commander.insert(component)
            //selection.setLocation(slot, 0)
        }
    }
}

export const progressTool:ButtonTool= new ButtonTool(progressToolConfigFactory)
