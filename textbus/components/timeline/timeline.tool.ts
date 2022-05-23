import { ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {timelineComponent, TimelineItemSlot} from './timeline.component'

export function timelineToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '时间轴',
        tooltip:'时间轴',
        onClick() {
            const slot = new TimelineItemSlot('primary')
            slot.write('待办事项')

            const component = timelineComponent.createInstance(injector, {slots:[slot]})
            console.log('component',component)
            commander.insert(component)
            selection.setPosition(slot, 0)
        }
    }
}

export const timelineTool:ButtonTool= new ButtonTool(timelineToolConfigFactory)

export const timelineExample= `<img alt="示例" src="data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg width="100" height="70" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><rect fill="#fff" height="100%" width="100%"/></g><defs><g id="item"><circle r="2" cx="10" cy="12"></circle><line x1="10" y1="12" x2="10" y2="24" stroke-width="0.5"></line><text font-family="Helvetica, Arial, sans-serif" font-size="5" x="16" y="14" stroke-width="0" stroke="#000" fill="#000000">事件主题</text><text font-family="Helvetica, Arial, sans-serif" font-size="4.5" x="38" y="13.5" stroke-width="0" stroke="#000" fill="#888">2020-08-08</text><text font-family="Helvetica, Arial, sans-serif" font-size="4.5" x="16" y="20" stroke-width="0" stroke="#000" fill="#000000">详细说明...</text></g></defs><use xlink:href="#item" fill="#1296db" stroke="#1296db"></use><use xlink:href="#item" transform="translate(0, 14)" fill="#15bd9a" stroke="#15bd9a"></use><use xlink:href="#item" transform="translate(0, 28)" fill="#495060" stroke="#495060"></use><use xlink:href="#item" transform="translate(0, 42)" fill="#E74F5E" stroke="#E74F5E"></use></svg>')}">`;
  