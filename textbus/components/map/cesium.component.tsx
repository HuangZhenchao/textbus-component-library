import {
    ComponentInstance,
    ComponentMethods,
    ContentType,
    defineComponent, Slot, SlotRender,
    Translator,
    useContext, useSlots, useState, VElement,Selection, ComponentOptions, SlotLiteral, VTextNode, ComponentData, onViewInit, Ref, useRef
} from "@textbus/core";
import {ComponentLoader, SlotParser} from "@textbus/browser";
import {Injector} from "@tanbo/di";
import { FileUploader, Form, FormSelect, FormSwitch, FormTextarea, FormTextField, headingComponent, useDragResize } from "@textbus/editor";
import {CesiumApp} from "./CesiumViewer/Viewer"
import G6 from "@antv/g6";
import { DateFormat } from "../../utils/Date";
import { componentStyle } from "../type";
const ak='85dcab3699b288cd780476d37fa35805'
declare const window: any;

export interface cesiumState{
    style:componentStyle
    center:any,
    markers:any,
    zoom:any
}
const CesiumData={
    center:[100,110],
    degrees:15000,
    marks:[{

    }]
}
export const cesiumComponent=defineComponent<ComponentMethods,cesiumState>({
    name: "cesiumComponent",
    type: ContentType.BlockComponent,
    setup(data: ComponentData<cesiumState>): ComponentMethods {
        let state=data.state as cesiumState;
        const changeController=useState(state);

        //useState({fill:false,type:'info',slot:slots.toJSON()})
        changeController.onChange.subscribe(newState=>{
            state=newState;
            console.log('changeController',state)
        })
        const ref:Ref<HTMLElement> = useRef();
        useDragResize(ref, rect => {
            changeController.update(draft => {
                Object.assign(draft.style, rect);
            });
        });
        onViewInit(() => {
            var mapContainer=ref.current?.querySelector(".map-container")
            const cesium=new CesiumApp(window.Cesium,{});
            cesium.CreateViewer(mapContainer)
            console.log('onLoad',cesium,cesium.Cesium,window);
        })
        return {
            render(isOutputMode:boolean, slotRender:SlotRender){
                let map;
                let zoom=12;
                let id='map-container'+DateFormat("YYYYMMDDHHmmSS")
                console.log('id',id);
                
                const vEle = VElement.createElement("div", {
                    ref,
                    class:'tb-cesiumMap',
                    style:state.style
                 },VElement.createElement('div',{id:id,class:"map-container"})
                );
                if(!isOutputMode&&ref.current){

                }
                
                //let map = new BMapGL.Map(mapContainer);
                //let point = new BMapGL.Point(116.404, 39.915); // 创建点坐标
                //map.centerAndZoom(point, 15);

                return vEle;
            }

        }
    }

})

export const cesiumComponentLoader:ComponentLoader={
    component: cesiumComponent,

    match(element: HTMLElement) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-cesiumMap'
    },
    read(element: HTMLElement, context: Injector, slotParser: SlotParser) :ComponentInstance{
        const style = element.style;
        const state:cesiumState={
            style:{},
            center:{x:116.404,y:39.915},
            markers:[{x:116.404,y:39.915}],
            zoom:16
        }
        //slotParser(state.slot,element)
        return cesiumComponent.createInstance(context,{state:state});
        
        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        
    },
    
    resources: {
        scripts:['http://106.55.148.203:801/Cesium/Cesium.js'],
        links:[{
            rel: 'stylesheet',
            href: 'http://106.55.148.203:801/Cesium/Widgets/widgets.css',
            //crossOrigin: 'anonymous'
        }],
        styles: [
            `.tb-cesiumMap{
                min-width:600px;
                min-height: 400px;
                max-width:100%;
            }
            .map-container {
                display: block;
                width:100%;
                height:100%;
                background-color: #eee;
              }
              `
        ]
    },
}