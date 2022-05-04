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

export const wordExplainExample= `<img alt="示例" src="data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg width="100" height="70" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><rect fill="#fff" height="100%" width="100%"/></g><defs><g id="item"><rect fill="#eee" height="18" width="90" rx="2" x="5" y="6"/><line x1="26" y1="9" x2="26" y2="20.5" stroke="#000" stroke-dasharray="0.8 0.8" stroke-width="0.1"></line><text font-family="Helvetica, Arial, sans-serif" font-size="6" x="10" y="14" stroke-width="0" stroke="#000" fill="#000000">名词</text><text font-family="Helvetica, Arial, sans-serif" font-size="5" x="12" y="20" stroke-width="0" stroke="#000" fill="#000000">说明</text><text font-family="Helvetica, Arial, sans-serif" font-size="6" x="30" y="14" stroke-width="0" stroke="#000" fill="#000000">详细解释...</text></g></defs><use xlink:href="#item"></use><use xlink:href="#item" transform="translate(0, 20)"></use><use xlink:href="#item" transform="translate(0, 40)"></use></svg>')}">`;
  