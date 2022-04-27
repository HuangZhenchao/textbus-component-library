import { ButtonTool,ButtonToolConfig, headingComponent} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import { cesiumComponent, cesiumState } from './cesium.component'

export function cesiumToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: 'cesium地图',
        tooltip:'cesium地图',
        onClick() {
            const state:cesiumState={
                style:{width:"600px",height:"400px"},
                center:{x:116.404,y:39.915},
                markers:[{x:116.404,y:39.915}],
                zoom:16
            }
            
            const component = cesiumComponent.createInstance(injector, {state:state})
            commander.insert(component)
            //selection.setPosition(headingSlot, headingSlot.length)
        }
    }
}
export function cesiumTool(){
    return new ButtonTool(cesiumToolConfigFactory);
}