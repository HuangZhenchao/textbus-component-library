import {
    ComponentInstance,
    ComponentMethods,
    ContentType,
    defineComponent, Slot, SlotRender,
    Translator,
    useContext, useSlots, useState, VElement,Selection, ComponentOptions, SlotLiteral, ComponentData, onContextMenu
} from "@textbus/core";
import {ComponentLoader, SlotParser} from "@textbus/browser";
import {Injector} from "@tanbo/di";
import { Dialog, FileUploader, Form, FormSelect, FormSwitch, FormTextarea, FormTextField, headingComponent } from "@textbus/editor";

export class JumbotronSlot extends Slot{
    constructor(){
        super([ContentType.Text,ContentType.BlockComponent,ContentType.InlineComponent]);
        
    }
}
export interface jumbotronState{
    minHeight: string;
    backgroundImage: string;
    backgroundSize: string;
    backgroundPosition: string;
}


export const jumbotronComponent=defineComponent<ComponentMethods,jumbotronState>({
    name: "jumbotronComponent",
    type: ContentType.BlockComponent,

    setup(data: ComponentData<jumbotronState>): ComponentMethods {
        const injector = useContext();        
        const dialog=injector.get(Dialog)
        const fileUploader = injector.get(FileUploader);
        
        const slots=useSlots(
            data.slots ||[new JumbotronSlot()],             
        )
        let state=data.state as jumbotronState
        const changeController=useState(state);
        //useState({fill:false,type:'info',slot:slots.toJSON()})
        changeController.onChange.subscribe(newState=>{
            state=newState;
            console.log('changeController',state)
        })
        const form = new Form({
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
            dialog.hide()
        });
        form.onCancel.subscribe(()=>{
            dialog.hide()
        })
        onContextMenu(()=>{
            return [{
                label:"巨幕设置",
                onClick(){
                    dialog.show(form.elementRef)
                }
            }]
        })
        return {
            render(isOutputMode:boolean, slotRender:SlotRender){

                const vEle = VElement.createElement("div", { 
                    class:'tb-jumbotron',
                    style: {
                        backgroundImage: `url("${state.backgroundImage}")`,
                        backgroundSize: state.backgroundSize || 'cover',
                        backgroundPosition: state.backgroundPosition || 'center',
                        minHeight: state.minHeight
                    }
                 }
                );
                return slotRender(slots.get(0)!, ()=>{return vEle});
            }

        }
    }

})

export const jumbotronComponentLoader:ComponentLoader={
    component: jumbotronComponent,

    match(element: HTMLElement) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-jumbotron'
    },
    read(element: HTMLElement, context: Injector, slotParser: SlotParser) :ComponentInstance{
        const style = element.style;
        const state:jumbotronState={
            backgroundImage: (style.backgroundImage || '').replace(/^url\(['"]?|['"]?\)$/g, ''),
            backgroundSize: style.backgroundSize,
            backgroundPosition: style.backgroundPosition,
            minHeight: style.minHeight,
            
        }
        let slot=new JumbotronSlot()
        slotParser(slot,element)
        return jumbotronComponent.createInstance(context,{slots:[slot],state:state});
        
        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        
    },
    
    resources: {
        styles: [
            `.tb-jumbotron {
                display: block;
                min-height: 200px;
                margin-bottom: 1em;
                background-color: #eee;
                padding: 20px;
              }
              `
        ]
    },
}