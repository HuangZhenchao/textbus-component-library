import {
    ComponentInstance,
    ComponentMethods,
    ContentType,
    defineComponent, Slot, SlotRender,
    Translator,
    useContext, useSlots, useState, VElement,Selection, ComponentOptions, SlotLiteral, VTextNode, ComponentData
} from "@textbus/core";
import {ComponentLoader, EDITABLE_DOCUMENT, SlotParser} from "@textbus/browser";
import {Injector} from "@tanbo/di";
import { FileUploader, Form, FormSelect, FormSwitch, FormTextarea, FormTextField, headingComponent } from "@textbus/editor";
import { UIControlPanel } from "../control-panel.plugin";
let index=1;
export interface baiduMapMethods{
    render(isOutputMode: boolean, slotRender: SlotRender):VElement,
    createControlView():void
}
const ak='aRsXEo3UFgKwRF6UGZCbNno5rTwlz2zH'
declare const window: any;
declare const BMapGL: any;
export interface baiduMapState{
    center:any,
    markers:any,
    zoom:any
}

export const baiduMapComponent=defineComponent<baiduMapMethods,baiduMapState>({
    name: "baiduMapComponent",
    type: ContentType.BlockComponent,
    setup(data: ComponentData<baiduMapState>): baiduMapMethods {
        const injector = useContext();        
        const controlPanel=injector.get(UIControlPanel)
        const fileUploader = injector.get(FileUploader);
        const doc = injector.get(EDITABLE_DOCUMENT);
        let state=data.state as baiduMapState;
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
                
                let id='map-container-'+index;
                index=index+1;
                console.log('index',index,id);
                console.log('window',window);
                const vEle = VElement.createElement("div", {                     
                    class:'tb-baiduMap'
                 },[VElement.createElement('div',{id:id,class:"map-container"})]
                );
                const onload=()=>{
                    //window.T=function(){}    
                    const BMapGL=window[0].BMapGL       
                    console.log('onLoad',window);                           
                    let map = new BMapGL.Map(id);
                    let point = new BMapGL.Point(116.404, 39.915); // 创建点坐标
                    map.centerAndZoom(point, 15);
                }
                                                
                !isOutputMode?vEle.appendChild(new VElement("script", { 
                    src:'.',
                    onLoad:onload
                })):null
                

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

export const baiduMapComponentLoader:ComponentLoader={
    component: baiduMapComponent,

    match(element: HTMLElement) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-baiduMap'
    },
    read(element: HTMLElement, context: Injector, slotParser: SlotParser) :ComponentInstance{
        const style = element.style;
        const state:baiduMapState={
            center:{x:116.404,y:39.915},
            markers:[{x:116.404,y:39.915}],
            zoom:16
        }
        //slotParser(state.slot,element)
        return baiduMapComponent.createInstance(context,{state:state});
        
        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        
    },
    
    resources: {
        scripts:['https://api.map.baidu.com/getscript?type=webgl&v=1.0&ak='+ak,'http://106.55.148.203:801/test.js'],//'https://api.map.baidu.com/getscript?type=webgl&v=1.0&ak='+ak,"http://localhost:5382/test.js"
        styles: [
            `.tb-baiduMap,.map-container {
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