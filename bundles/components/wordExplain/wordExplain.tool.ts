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
        label: '名词解释',
        tooltip:'名词解释',
        onClick() {
            let initSlots=[new WordExplainTitleSlot(),new WordExplainSubtitleSlot(),new WordExplainDetailSlot()]
            let initState:wordExplainState={
                width:'200px',
            }
            const component = wordExplainComponent.createInstance(injector, {slots:initSlots,state:initState})
            commander.insert(component)
            selection.setPosition(initSlots[0], 0)
        }
    }
}

export const wordExplainTool:ButtonTool= new ButtonTool(wordExplainToolConfigFactory)
