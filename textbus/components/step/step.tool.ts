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

//export const stepTool:ButtonTool= new ButtonTool(stepToolConfigFactory)
export function stepTool(){
    return new ButtonTool(stepToolConfigFactory)
}
export const stepExample=`<img alt="示例" src="data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg width="100" height="70" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><rect fill="#fff" height="100%" width="100%"/></g><defs><g id="item"><circle r="2" cx="10" cy="12"></circle><line x1="12" y1="12" x2="38" y2="12" stroke-width="0.5"></line><text font-family="Helvetica, Arial, sans-serif" font-size="5" x="8" y="22" stroke-width="0" stroke="#000" fill="#000000">标题</text><text font-family="Helvetica, Arial, sans-serif" font-size="4.5" x="8" y="27" stroke-width="0" stroke="#000" fill="#000">描述信息...</text></g></defs><use xlink:href="#item" transform="translate(0, 20)" fill="#15bd9a" stroke="#15bd9a"></use><use xlink:href="#item" transform="translate(30, 20)" fill="#1296db" stroke="#1296db"></use><use xlink:href="#item" transform="translate(60, 20)" fill="#aaa" stroke="#aaa"></use></svg>')}">`;
  