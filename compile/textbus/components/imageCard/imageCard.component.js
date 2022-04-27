import { ContentType, defineComponent, onEnter, Slot, Translator, useContext, useRef, useSlots, useState, VElement } from '@textbus/core';
import { useDragResize } from "@textbus/editor";
export const imageCardComponent = defineComponent({
    type: ContentType.BlockComponent,
    name: 'imageCardComponent',
    setup(data) {
        const injector = useContext();
        const translator = injector.get(Translator);
        const slots = useSlots(data.slots || [new Slot([
                ContentType.Text
            ])
        ]);
        let state = data.state;
        const changeController = useState(state);
        changeController.onChange.subscribe(newState => {
            state = newState;
        });
        const ref = useRef();
        useDragResize(ref, rect => {
            changeController.update(() => { return Object.assign(Object.assign({}, state), rect); });
            //TODO:改为调整整个卡片而不是图片
        });
        onEnter(ev => {
            ev.preventDefault();
        });
        return {
            render(isOutputMode, slotRender) {
                console.log(state);
                return new VElement('div', {
                    class: 'tb-image-card',
                    style: { minWidth: '500px' || state.maxWidth,
                    }
                }, [
                    new VElement('img', {
                        ref,
                        src: state.src,
                        style: {
                            width: '100%' || state.width,
                            height: 'auto' || state.height,
                            maxWidth: state.maxWidth,
                            maxHeight: state.maxHeight,
                            //minWidth: '500px',
                            //minHeight: state.maxHeight,
                            margin: state.margin,
                            float: state.float
                        }
                    }),
                    slotRender(slots.get(0), () => {
                        return VElement.createElement("div", { class: 'p' });
                    })
                ]);
            },
        };
    }
});
export const imageCardComponentLoader = {
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
    match(element) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-image-card';
    },
    read(element, context, slotParser) {
        const slot = new Slot([
            ContentType.Text
        ]);
        slotParser(slot, element.children[0]);
        const style = element.style;
        const state = {
            src: element.getAttribute('src') || '',
            width: style.width,
            height: style.height,
            margin: style.margin,
            float: style.float,
            maxWidth: style.maxWidth,
            maxHeight: style.maxHeight,
        };
        return imageCardComponent.createInstance(context, { slots: [slot], state: state });
    }
};
export class imageCardComponentSetter {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VDYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RleHRidXMvY29tcG9uZW50cy9pbWFnZUNhcmQvaW1hZ2VDYXJkLmNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlILFdBQVcsRUFDWCxlQUFlLEVBQUUsT0FBTyxFQUN4QixJQUFJLEVBR0osVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQzlCLFFBQVEsRUFBRSxRQUFRLEVBQ2xCLFFBQVEsRUFDWCxNQUFNLGVBQWUsQ0FBQTtBQUd0QixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFZOUMsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsZUFBZSxDQUFtQztJQUNoRixJQUFJLEVBQUUsV0FBVyxDQUFDLGNBQWM7SUFDaEMsSUFBSSxFQUFFLG9CQUFvQjtJQUUxQixLQUFLLENBQUMsSUFBa0M7UUFDcEMsTUFBTSxRQUFRLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFDOUIsTUFBTSxVQUFVLEdBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBRSxDQUFDLElBQUksSUFBSSxDQUFDO2dCQUNyQyxXQUFXLENBQUMsSUFBSTthQUNuQixDQUFDO1NBQ0wsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxLQUFLLEdBQUUsSUFBSSxDQUFDLEtBQXVCLENBQUE7UUFDdkMsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMzQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxHQUFHLEdBQW9CLE1BQU0sRUFBRSxDQUFDO1FBQ3RD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LGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLENBQUUsQ0FBQTtJQUNqRixDQUFDO0NBQ0osQ0FBQTtBQUVELE1BQU0sT0FBTyx3QkFBd0I7Q0FFcEM7QUFDRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50RGF0YSxcclxuICAgIENvbXBvbmVudEluc3RhbmNlLFxyXG4gICAgQ29tcG9uZW50TWV0aG9kcyxcclxuICAgIENvbnRlbnRUeXBlLFxyXG4gICAgZGVmaW5lQ29tcG9uZW50LCBvbkVudGVyLCBSZWYsXHJcbiAgICBTbG90LFxyXG4gICAgU2xvdExpdGVyYWwsXHJcbiAgICBTbG90UmVuZGVyLFxyXG4gICAgVHJhbnNsYXRvciwgdXNlQ29udGV4dCwgdXNlUmVmLFxyXG4gICAgdXNlU2xvdHMsIHVzZVN0YXRlLFxyXG4gICAgVkVsZW1lbnRcclxufSBmcm9tICdAdGV4dGJ1cy9jb3JlJ1xyXG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXIsIFNsb3RQYXJzZXIgfSBmcm9tICdAdGV4dGJ1cy9icm93c2VyJ1xyXG5pbXBvcnQgeyBJbmplY3RvciB9IGZyb20gJ0B0YW5iby9kaSdcclxuaW1wb3J0IHt1c2VEcmFnUmVzaXplfSBmcm9tIFwiQHRleHRidXMvZWRpdG9yXCI7XHJcbmV4cG9ydCBpbnRlcmZhY2UgaW1hZ2VDYXJkU3RhdGV7XHJcbiAgICBzcmM6IHN0cmluZztcclxuICAgIG1heFdpZHRoPzogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgbWF4SGVpZ2h0Pzogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgd2lkdGg/OiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICBoZWlnaHQ/OiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICBtYXJnaW4/OiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICBmbG9hdD86IHN0cmluZyB8IHVuZGVmaW5lZDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBpbWFnZUNhcmRDb21wb25lbnQgPSBkZWZpbmVDb21wb25lbnQ8Q29tcG9uZW50TWV0aG9kcywgaW1hZ2VDYXJkU3RhdGU+KHtcclxuICAgIHR5cGU6IENvbnRlbnRUeXBlLkJsb2NrQ29tcG9uZW50LFxyXG4gICAgbmFtZTogJ2ltYWdlQ2FyZENvbXBvbmVudCcsXHJcblxyXG4gICAgc2V0dXAoZGF0YTpDb21wb25lbnREYXRhPGltYWdlQ2FyZFN0YXRlPiApOiBDb21wb25lbnRNZXRob2RzIHtcclxuICAgICAgICBjb25zdCBpbmplY3RvciA9IHVzZUNvbnRleHQoKTtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdG9yPWluamVjdG9yLmdldChUcmFuc2xhdG9yKTtcclxuICAgICAgICBjb25zdCBzbG90cyA9IHVzZVNsb3RzKGRhdGEuc2xvdHN8fFtuZXcgU2xvdChbXHJcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZS5UZXh0XHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgXSlcclxuICAgICAgICBsZXQgc3RhdGU9IGRhdGEuc3RhdGUgYXMgaW1hZ2VDYXJkU3RhdGVcclxuICAgICAgICBjb25zdCBjaGFuZ2VDb250cm9sbGVyID0gdXNlU3RhdGUoc3RhdGUpO1xyXG4gICAgICAgIGNoYW5nZUNvbnRyb2xsZXIub25DaGFuZ2Uuc3Vic2NyaWJlKG5ld1N0YXRlID0+IHtcclxuICAgICAgICAgICAgc3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCByZWY6UmVmPEhUTUxFbGVtZW50PiA9IHVzZVJlZigpO1xyXG4gICAgICAgIHVzZURyYWdSZXNpemUocmVmLCByZWN0ID0+IHtcclxuICAgICAgICAgICAgY2hhbmdlQ29udHJvbGxlci51cGRhdGUoKCk9PntyZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSksIHJlY3QpfSk7XHJcbiAgICAgICAgICAgIC8vVE9ETzrmlLnkuLrosIPmlbTmlbTkuKrljaHniYfogIzkuI3mmK/lm77niYdcclxuICAgICAgICB9KTtcclxuICAgICAgICBvbkVudGVyKGV2PT57XHJcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlbmRlcihpc091dHB1dE1vZGU6IGJvb2xlYW4sIHNsb3RSZW5kZXI6IFNsb3RSZW5kZXIpOiBWRWxlbWVudCB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVkVsZW1lbnQoJ2Rpdicse1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6J3RiLWltYWdlLWNhcmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOnttaW5XaWR0aDogJzUwMHB4J3x8c3RhdGUubWF4V2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgVkVsZW1lbnQoJ2ltZycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IHN0YXRlLnNyYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJSd8fHN0YXRlLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnYXV0byd8fHN0YXRlLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiBzdGF0ZS5tYXhXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodDogc3RhdGUubWF4SGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9taW5XaWR0aDogJzUwMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbWluSGVpZ2h0OiBzdGF0ZS5tYXhIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46IHN0YXRlLm1hcmdpbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0OiBzdGF0ZS5mbG9hdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdFJlbmRlcihzbG90cy5nZXQoMCkhLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzPSdwJy8+XHJcbiAgICAgICAgICAgICAgICAgICAgfSldXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuXHJcbmV4cG9ydCBjb25zdCBpbWFnZUNhcmRDb21wb25lbnRMb2FkZXI6IENvbXBvbmVudExvYWRlciA9IHtcclxuICAgIGNvbXBvbmVudDogaW1hZ2VDYXJkQ29tcG9uZW50LFxyXG4gICAgcmVzb3VyY2VzOiB7XHJcbiAgICAgICAgc3R5bGVzOiBbXHJcbiAgICAgICAgICAgIGBcclxuLnRiLWltYWdlLWNhcmQge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICBib3gtc2hhZG93OiAxcHggMnB4IDNweCByZ2JhKDAsIDAsIDAsIC4xKTtcclxuICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG4udGItaW1hZ2UtY2FyZCA+IGRpdiA+IGltZyB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgbWluLWhlaWdodDogNDBweDtcclxufVxyXG4udGItaW1hZ2UtY2FyZCA+IC5wIHtcclxuICBtYXJnaW46IDA7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxuICBjb2xvcjogcmVkO1xyXG4gIGhlaWdodDogMjRweDtcclxuICBsaW5lLWhlaWdodDogMjRweDtcclxuICBwYWRkaW5nOiA2cHggMjBweDtcclxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxufVxyXG5gXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIG1hdGNoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZGl2JyAmJiBlbGVtZW50LmNsYXNzTmFtZSA9PT0gJ3RiLWltYWdlLWNhcmQnXHJcbiAgICB9LFxyXG4gICAgcmVhZChlbGVtZW50OiBIVE1MRWxlbWVudCwgY29udGV4dDogSW5qZWN0b3IsIHNsb3RQYXJzZXI6IFNsb3RQYXJzZXIpOiBDb21wb25lbnRJbnN0YW5jZSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdCA9IG5ldyBTbG90KFtcclxuICAgICAgICAgICAgQ29udGVudFR5cGUuVGV4dFxyXG4gICAgICAgIF0pXHJcbiAgICAgICAgc2xvdFBhcnNlcihzbG90LCBlbGVtZW50LmNoaWxkcmVuWzBdISBhcyBIVE1MRWxlbWVudClcclxuICAgICAgICBjb25zdCBzdHlsZSA9IGVsZW1lbnQuc3R5bGU7XHJcbiAgICAgICAgY29uc3Qgc3RhdGU9e1xyXG4gICAgICAgICAgICBzcmM6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzcmMnKSB8fCAnJyxcclxuICAgICAgICAgICAgd2lkdGg6IHN0eWxlLndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHN0eWxlLmhlaWdodCxcclxuICAgICAgICAgICAgbWFyZ2luOiBzdHlsZS5tYXJnaW4sXHJcbiAgICAgICAgICAgIGZsb2F0OiBzdHlsZS5mbG9hdCxcclxuICAgICAgICAgICAgbWF4V2lkdGg6IHN0eWxlLm1heFdpZHRoLFxyXG4gICAgICAgICAgICBtYXhIZWlnaHQ6IHN0eWxlLm1heEhlaWdodCxcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGltYWdlQ2FyZENvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShjb250ZXh0LHtzbG90czpbc2xvdF0sc3RhdGU6c3RhdGV9IClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIGltYWdlQ2FyZENvbXBvbmVudFNldHRlcntcclxuXHJcbn1cclxuLypcclxuZXhwb3J0IGNvbnN0IENvbXBvbmVudENyZWF0b3JFeGFtcGxlOkNvbXBvbmVudENyZWF0b3I9e1xyXG4gICAgbmFtZTogaTE4biA9PiBpMThuLmdldCgnY29tcG9uZW50cy5pbWFnZUNhcmRDb21wb25lbnQuY3JlYXRvci5uYW1lJyksXHJcbiAgICBjYXRlZ29yeTogJ1RleHRCdXMnLFxyXG4gICAgZXhhbXBsZTogYDxpbWcgc3JjPVwiZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9VVRGLTgsJHtlbmNvZGVVUklDb21wb25lbnQoJzxzdmcgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCI3MFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9XCJiZ1wiIHgxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIwJVwiIHkyPVwiMTAwJVwiPjxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcC1jb2xvcj1cIiNmOTBcIi8+PHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3AtY29sb3I9XCIjZmZmXCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnPjxyZWN0IGZpbGw9XCJ1cmwoI2JnKVwiIGhlaWdodD1cIjUwXCIgd2lkdGg9XCIxMDAlXCIvPjwvZz48Zz48cGF0aCBmaWxsPVwiI2YwMFwiIG9wYWNpdHk9XCIwLjJcIiBkPVwiTTgxLjI1IDI4LjEyNWMwIDUuMTc4LTQuMTk3IDkuMzc1LTkuMzc1IDkuMzc1cy05LjM3NS00LjE5Ny05LjM3NS05LjM3NSA0LjE5Ny05LjM3NSA5LjM3NS05LjM3NSA5LjM3NSA0LjE5NyA5LjM3NSA5LjM3NXpcIj48L3BhdGg+PHBhdGggZmlsbD1cIiMwZTBcIiBvcGFjaXR5PVwiMC4zXCIgZD1cIk04Ny41IDgxLjI1aC03NXYtMTIuNWwyMS44NzUtMzcuNSAyNSAzMS4yNWg2LjI1bDIxLjg3NS0xOC43NXpcIj48L3BhdGg+PC9nPjxnPjxyZWN0IGZpbGw9XCIjZmZmXCIgaGVpZ2h0PVwiMjBcIiB3aWR0aD1cIjEwMCVcIiB5PVwiNTBcIj48L3JlY3Q+PC9nPjxnPjx0ZXh0IGZvbnQtZmFtaWx5PVwiSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZlwiIGZvbnQtc2l6ZT1cIjEyXCIgeT1cIjYzXCIgeD1cIjUwJVwiIHRleHQtYW5jaG9yPVwibWlkZGxlXCIgc3Ryb2tlLXdpZHRoPVwiMFwiIHN0cm9rZT1cIiMwMDBcIiBmaWxsPVwiIzAwMDAwMFwiPuaPj+i/sOaWh+WtlzwvdGV4dD48L2c+PC9zdmc+Jyl9XCIgYWx0PVwiXCI+YCxcclxuICAgIGZhY3RvcnkoaW5qZWN0b3IpIHtcclxuICAgICAgICBjb25zdCBpbWdGcmFnbWVudCA9IG5ldyBGcmFnbWVudCgpO1xyXG4gICAgICAgIGltZ0ZyYWdtZW50LmFwcGVuZChuZXcgSW1hZ2VDb21wb25lbnQoZGVmYXVsdEltYWdlU3JjKSk7XHJcbiAgICAgICAgY29uc3QgZGVzY0ZyYWdtZW50ID0gbmV3IEZyYWdtZW50KCk7XHJcbiAgICAgICAgZGVzY0ZyYWdtZW50LmFwcGVuZCgn5Zu+54mH5o+P6L+wJyk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBpbWFnZUNhcmRDb21wb25lbnQoe1xyXG4gICAgICAgICAgICBpbWdGcmFnbWVudCxcclxuICAgICAgICAgICAgZGVzY0ZyYWdtZW50XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0qLyJdfQ==