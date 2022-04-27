import { ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {stepComponent, StepSlot, stepState} from './step.component'

export function stepToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '步骤条',
        tooltip:'步骤条',
        onClick() {

            let slots=[new StepSlot()];
            const initState:stepState={
                step:0,                
            }
            const component = stepComponent.createInstance(injector, {slots:slots,state:initState})
            commander.insert(component)
            selection.setPosition(slots[0], 0)
        }
    }
}

export const stepTool:ButtonTool= new ButtonTool(stepToolConfigFactory)
