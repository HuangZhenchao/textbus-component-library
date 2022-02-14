import {
    ComponentInstance,
    ComponentMethods,
    ContentType,
    defineComponent, Ref,
    Slot,
    SlotLiteral,
    SlotRender,
    Translator, useContext, useRef,
    useSlots, useState,
    VElement
} from '@textbus/core'
import { ComponentLoader, SlotParser } from '@textbus/browser'
import { Injector } from '@tanbo/di'
import {ComponentCreator} from "../type";
import {useDragResize} from "@textbus/editor/bundles/components/_utils/drag-resize";
export interface imageCardState{
    src: string;
    maxWidth?: string | undefined;
    maxHeight?: string | undefined;
    width?: string | undefined;
    height?: string | undefined;
    margin?: string | undefined;
    float?: string | undefined;
    slotLiteral:SlotLiteral;
}


export const imageCardComponent = defineComponent<ComponentMethods, imageCardState, imageCardState>({
    type: ContentType.BlockComponent,
    name: 'imageCardComponent',
    transform(translator: Translator, state: imageCardState): imageCardState {
        return state
    },
    setup(state: imageCardState): ComponentMethods {
        const injector = useContext();
        const translator=injector.get(Translator);
        const slots = useSlots([
            translator.createSlot(state.slotLiteral) || new Slot([
                ContentType.Text
            ])
        ], () => {
            return new Slot([
                ContentType.Text
            ])
        })
        const changeController = useState(state);
        changeController.onChange.subscribe(v => {
            state = v;
        });
        const ref:Ref<HTMLElement> = useRef();
        useDragResize(ref, rect => {
            changeController.update(()=>{return Object.assign(Object.assign({}, state), rect)});
            //TODO:改为调整整个卡片而不是图片
        });
        return {
            render(isOutputMode: boolean, slotRender: SlotRender): VElement {
                console.log(state)
                return new VElement('div',{

                        class:'tb-image-card',
                    style:{minWidth: '500px'||state.maxWidth,
                        }
                    },[
                    new VElement('img', {
                        ref,
                        src: state.src,
                        style: {
                            width: '100%'||state.width,
                            height: 'auto'||state.height,
                            maxWidth: state.maxWidth,
                            maxHeight: state.maxHeight,
                            //minWidth: '500px',
                            //minHeight: state.maxHeight,
                            margin: state.margin,
                            float: state.float
                        }
                    }),
                    slotRender(slots.get(0)!, () => {
                        return <div class='p'/>
                    })]
                )
            },
            toJSON(): any {
                return Object.assign({}, state);
            }
        }
    }
})

export const imageCardComponentLoader: ComponentLoader = {
    component: imageCardComponent,
    resources: {
        styles: [
            `
.tb-image-card {
  display: block;
  margin-top: 10px;
  margin-bottom: 20px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, .1);
  border-radius: 3px;
  overflow: hidden;
}
.tb-image-card > div > img {
  width: 100%;
  display: block;
  min-height: 40px;
}
.tb-image-card > .p {
  margin: 0;
  text-align: center;
  font-size: 15px;
  color: red;
  height: 24px;
  line-height: 24px;
  padding: 6px 20px;
  box-sizing: content-box;
}
`
        ]
    },
    match(element: HTMLElement): boolean {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-image-card'
    },
    read(element: HTMLElement, context: Injector, slotParser: SlotParser): ComponentInstance {
        const slot = new Slot([
            ContentType.Text
        ])
        slotParser(slot, element.children[0]! as HTMLElement)
        const style = element.style;
        return imageCardComponent.createInstance(context, {
            src: element.getAttribute('src') || '',
            width: style.width,
            height: style.height,
            margin: style.margin,
            float: style.float,
            maxWidth: style.maxWidth,
            maxHeight: style.maxHeight,
            slotLiteral:slot.toJSON()
        })
    }
}

export class imageCardComponentSetter{

}
/*
export const ComponentCreatorExample:ComponentCreator={
    name: i18n => i18n.get('components.imageCardComponent.creator.name'),
    category: 'TextBus',
    example: `<img src="data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg width="100" height="70" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#f90"/><stop offset="100%" stop-color="#fff"/></linearGradient></defs><g><rect fill="url(#bg)" height="50" width="100%"/></g><g><path fill="#f00" opacity="0.2" d="M81.25 28.125c0 5.178-4.197 9.375-9.375 9.375s-9.375-4.197-9.375-9.375 4.197-9.375 9.375-9.375 9.375 4.197 9.375 9.375z"></path><path fill="#0e0" opacity="0.3" d="M87.5 81.25h-75v-12.5l21.875-37.5 25 31.25h6.25l21.875-18.75z"></path></g><g><rect fill="#fff" height="20" width="100%" y="50"></rect></g><g><text font-family="Helvetica, Arial, sans-serif" font-size="12" y="63" x="50%" text-anchor="middle" stroke-width="0" stroke="#000" fill="#000000">描述文字</text></g></svg>')}" alt="">`,
    factory(injector) {
        const imgFragment = new Fragment();
        imgFragment.append(new ImageComponent(defaultImageSrc));
        const descFragment = new Fragment();
        descFragment.append('图片描述');
        return new imageCardComponent({
            imgFragment,
            descFragment
        });
    }
}*/