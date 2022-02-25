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
            let initState:wordExplainState={
                width:'200px',
                titleSlot:new WordExplainTitleSlot(),
                subtitleSlot:new WordExplainSubtitleSlot(),
                detailSlot:new WordExplainDetailSlot()
            }
            const component = wordExplainComponent.createInstance(injector, initState)
            commander.insert(component)
            selection.setLocation(initState.detailSlot, 0)
        }
    }
}

export const wordExplainTool:ButtonTool= new ButtonTool(wordExplainToolConfigFactory)
