import { ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {timelineComponent, timelineSlot, TimelineItemSlot} from './timeline.component'

export function timelineToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '时间轴',
        tooltip:'时间轴',
        onClick() {
            const slot = new TimelineItemSlot('primary')
            slot.write('待办事项')
            let state:timelineSlot={
                itemSlots:[slot]
            }
            const component = timelineComponent.createInstance(injector, {slots:[slot]})
            console.log('component',component)
            commander.insert(component)
            selection.setPosition(slot, 0)
        }
    }
}

export const timelineTool:ButtonTool= new ButtonTool(timelineToolConfigFactory)
