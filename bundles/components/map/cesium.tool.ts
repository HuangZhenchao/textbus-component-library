import { ButtonTool,ButtonToolConfig, headingComponent} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import { cesiumComponent, cesiumState } from './cesium.component'

export function cesiumToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '插入 cesium 组件',
        tooltip:'插入 cesium 组件',
        onClick() {
            const state:cesiumState={
                center:{x:116.404,y:39.915},
                markers:[{x:116.404,y:39.915}],
                zoom:16
            }
            
            const component = cesiumComponent.createInstance(injector, {state:state})
            commander.insert(component)
            //selection.setLocation(headingSlot, headingSlot.length)
        }
    }
}
export function cesiumTool(){
    return new ButtonTool(cesiumToolConfigFactory);
}