import { ButtonTool,ButtonToolConfig, headingComponent} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import { baiduMapComponent, baiduMapState } from './baiduMap.component'

export function baiduMapToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '百度地图',
        tooltip:'百度地图',
        onClick() {
            const state:baiduMapState={
                center:{x:116.404,y:39.915},
                markers:[{x:116.404,y:39.915}],
                zoom:16
            }
            
            const component = baiduMapComponent.createInstance(injector, {state:state})
            commander.insert(component)
            //selection.setPosition(headingSlot, headingSlot.length)
        }
    }
}
export function baiduMapTool(){
    return new ButtonTool(baiduMapToolConfigFactory);
}