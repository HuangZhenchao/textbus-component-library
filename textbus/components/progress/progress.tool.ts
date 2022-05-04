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

export const  progressExample=`<img src="data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg width="100" height="70" xmlns="http://www.w3.org/2000/svg"><g><rect fill="#fff" height="100%" width="100%"/></g><line x1="10" y1="40" x2="90" y2="40" stroke="#ddd" stroke-width="4" stroke-linecap="round"></line><line x1="10" y1="40" x2="50" y2="40" stroke="#1296db" stroke-width="4" stroke-linecap="round"></line><text font-family="Helvetica, Arial, sans-serif" font-size="10" x="42" y="35" stroke-width="0" stroke="#000" fill="#000000">50%</text></svg>')}">`;
  