import { ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {stepComponent, StepSlot, stepState} from './step.component'

export function stepToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '插入 step 组件',
        tooltip:'插入 step 组件',
        onClick() {


            const state:stepState={
                step:0,
                slots:[new StepSlot()]
            }
            const component = stepComponent.createInstance(injector, state)
            commander.insert(component)
            selection.setLocation(state.slots[0], 0)
        }
    }
}

export const stepTool:ButtonTool= new ButtonTool(stepToolConfigFactory)
