import {
    ComponentInstance,
    ComponentMethods,
    ContentType,
    defineComponent, Slot, SlotRender,
    Translator,
    useContext, useSlots, useState, VElement,Selection, ComponentOptions, SlotLiteral, VTextNode, ComponentData
} from "@textbus/core";
import {ComponentLoader, SlotParser} from "@textbus/browser";
import {Injector} from "@tanbo/di";
import { FileUploader, Form, FormSelect, FormSwitch, FormTextarea, FormTextField, headingComponent } from "@textbus/editor";
import { UIControlPanel } from "../control-panel.plugin";

export interface cesiumMethods{
    render(isOutputMode: boolean, slotRender: SlotRender):VElement,
    createControlView():void
}
const ak='85dcab3699b288cd780476d37fa35805'
declare const window: any;
export interface cesiumState{
    center:any,
    markers:any,
    zoom:any
}

export const cesiumComponent=defineComponent<cesiumMethods,cesiumState>({
    name: "cesiumComponent",
    type: ContentType.BlockComponent,
    setup(data: ComponentData<cesiumState>): cesiumMethods {
        let state=data.state as cesiumState;
        const changeController=useState(state);

        //useState({fill:false,type:'info',slot:slots.toJSON()})
        changeController.onChange.subscribe(newState=>{
            state=newState;
            console.log('changeController',state)
        })
        return {
            render(isOutputMode:boolean, slotRender:SlotRender){
                let map;
                let zoom=12;
                let id=('map-container'+Math.random()).replace('.', '')
                console.log('id',id);
                const div=VElement.createElement('div',{id:id,class:"map-container"});
                const vEle = VElement.createElement("div", { 
                    class:'tb-cesiumMap'
                 },[div]
                );
                const onload=()=>{
                    //window.T=function(){}    
                    //const T=window[0].T       
                    console.log('onLoad',window);          
                    //map = new T.Map(id);
                    //map.centerAndZoom(new T.LngLat(116.40769, 39.89945), zoom);
                }
                !isOutputMode?vEle.appendChild(VElement.createElement("script", { 
                        src:'.',
                        onLoad:onload
                    }
                )):null
                
                //let map = new BMapGL.Map(mapContainer);
                //let point = new BMapGL.Point(116.404, 39.915); // 创建点坐标
                //map.centerAndZoom(point, 15);

                return vEle;
            },
            createControlView(){
                /*
                const form = new Form({
                    mini: true,
                    confirmBtnText: '确定',
                    items: [
                        new FormTextField({
                            name: 'minHeight',
                            value: state.minHeight,
                            placeholder: '',
                            label: '巨幕最小高度'
                        }),
                        new FormTextField({
                            label: '背景图片地址',
                            name: 'backgroundImage',
                            placeholder: '',
                            canUpload: true,
                            uploadType: 'image',
                            uploadBtnText: '上传',
                            value: state.backgroundImage,
                            fileUploader,
                            validateFn(value) {
                                if (!value) {
                                    return 'test';
                                }
                                return false;
                            }
                        })
                    ]
                });
                form.onComplete.subscribe(map => {
                    changeController.update(draft=>{
                        draft.minHeight = map.get('minHeight');
                        draft.backgroundImage = map.get('backgroundImage');
                    })
                });
                return {
                    title: '巨幕设置',
                    view: form.elementRef
                };*/
            }

        }
    }

})

export const cesiumComponentLoader:ComponentLoader={
    component: cesiumComponent,

    match(element: HTMLElement) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-cesium'
    },
    read(element: HTMLElement, context: Injector, slotParser: SlotParser) :ComponentInstance{
        const style = element.style;
        const state:cesiumState={
            center:{x:116.404,y:39.915},
            markers:[{x:116.404,y:39.915}],
            zoom:16
        }
        //slotParser(state.slot,element)
        return cesiumComponent.createInstance(context,{state:state});
        
        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        
    },
    
    resources: {
        scripts:['http://localhost:5382/cesium/Build/Cesium/Cesium.js','http://106.55.148.203:801/textbus-cesium.js'],
        styles: [
            `.tb-cesium,.map-container {
                display: block;
                min-height: 400px;
                margin-bottom: 1em;
                background-color: #eee;
                padding: 20px;
              }
              `
        ]
    },
}