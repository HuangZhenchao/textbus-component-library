import { ButtonTool,ButtonToolConfig, headingComponent} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import { tdtMapComponent, tdtMapState } from './tdtMap.component'

export function tdtMapToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '插入 tdtMap 组件',
        tooltip:'插入 tdtMap 组件',
        onClick() {
            const state:tdtMapState={
                center:{x:116.404,y:39.915},
                markers:[{x:116.404,y:39.915}],
                zoom:16
            }
            
            const component = tdtMapComponent.createInstance(injector, state)
            commander.insert(component)
            //selection.setLocation(headingSlot, headingSlot.length)
        }
    }
}
export function tdtMapTool(){
    return new ButtonTool(tdtMapToolConfigFactory);
}