import { ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {
    wordExplainComponent, WordExplainDetailSlot,
    wordExplainState,
    WordExplainSubtitleSlot,
    WordExplainTitleSlot
} from './wordExplain.component'

export function wordExplainToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '插入 wordExplain 组件',
        tooltip:'插入 wordExplain 组件',
        onClick() {
            let initSlots=[new WordExplainTitleSlot(),new WordExplainSubtitleSlot(),new WordExplainDetailSlot()]
            let initState:wordExplainState={
                width:'200px',
            }
            const component = wordExplainComponent.createInstance(injector, {slots:initSlots,state:initState})
            commander.insert(component)
            selection.setLocation(initSlots[0], 0)
        }
    }
}

export const wordExplainTool:ButtonTool= new ButtonTool(wordExplainToolConfigFactory)
