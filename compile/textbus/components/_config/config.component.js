import { defineComponent, ContentType, useContext, Translator, VElement, useState, Selection } from "@textbus/core";
import { Dialog } from "@textbus/editor";
import { JsNewGuid } from "../../utils/common";
export const pageConfigComponent = defineComponent({
    type: ContentType.BlockComponent,
    name: 'pageConfigComponent',
    setup(data) {
        const injector = useContext();
        const translator = injector.get(Translator);
        const dialog = injector.get(Dialog);
        const selection = injector.get(Selection);
        let state = data.state;
        const changeController = useState(state);
        changeController.onChange.subscribe(newState => {
            state = newState;
        });
        return {
            render(isOutputMode, slotRender) {
                const vNode = VElement.createElement('div', {
                    class: "tb-page-config",
                    scrollTop: state.scrollTop,
                    pageID: state.pageID
                });
                return vNode;
                /*
                return (
                    <div class={ classes }>
                    <div>这是 Alert 组件，这里的内容是不可以编辑的</div>
                    {
                        slotRender(slots.get(0)!, () => {
                        return <div/>
                        })
                    }
                    </div>
                )*/
            }
        };
    }
});
export const pageConfigComponentLoader = {
    component: pageConfigComponent,
    match(element) {
        return element.tagName.toLowerCase() === 'div' && element.className.includes('tb-page-config');
    },
    read(element, context, slotParser) {
        //TODO:从html读取时取出fill和type
        const configState = {
            pageID: element.getAttribute("pageID") || JsNewGuid(),
            scrollTop: Number(element.getAttribute("scrollTop")) || 0
        };
        return pageConfigComponent.createInstance(context, {
            state: configState
        });
    },
    resources: {
        styles: [`
      .tb-page-config{
        display:none;
      }`
        ]
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RleHRidXMvY29tcG9uZW50cy9fY29uZmlnL2NvbmZpZy5jb21wb25lbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxlQUFlLEVBQW9CLFdBQVcsRUFBaUIsVUFBVSxFQUFFLFVBQVUsRUFDNUYsUUFBUSxFQUFFLFFBQVEsRUFBOEIsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sb0JBQW9CLENBQUE7QUFNNUMsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsZUFBZSxDQUFvQztJQUNsRixJQUFJLEVBQUUsV0FBVyxDQUFDLGNBQWM7SUFDaEMsSUFBSSxFQUFFLHFCQUFxQjtJQUMzQixLQUFLLENBQUMsSUFBb0M7UUFDdEMsTUFBTSxRQUFRLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFDOUIsTUFBTSxVQUFVLEdBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQXdCLENBQUM7UUFDeEMsTUFBTSxnQkFBZ0IsR0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdkMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUEsRUFBRTtZQUM1QyxLQUFLLEdBQUMsUUFBUSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTztZQUNILE1BQU0sQ0FBQyxZQUFxQixFQUFFLFVBQXNCO2dCQUNsRCxNQUFNLEtBQUssR0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBQztvQkFDakMsS0FBSyxFQUFDLGdCQUFnQjtvQkFDdEIsU0FBUyxFQUFDLEtBQUssQ0FBQyxTQUFTO29CQUN6QixNQUFNLEVBQUMsS0FBSyxDQUFDLE1BQU07aUJBQ3RCLENBQ0osQ0FBQTtnQkFDRCxPQUFPLEtBQUssQ0FBQTtnQkFDZDs7Ozs7Ozs7OzttQkFVRztZQUNILENBQUM7U0FDSixDQUFBO0lBQ0wsQ0FBQztDQUNKLENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFvQjtJQUN0RCxTQUFTLEVBQUUsbUJBQW1CO0lBRTlCLEtBQUssQ0FBQyxPQUFvQjtRQUN4QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDaEcsQ0FBQztJQUNELElBQUksQ0FBQyxPQUFvQixFQUFFLE9BQWlCLEVBQUUsVUFBc0I7UUFDbEUsMEJBQTBCO1FBRTFCLE1BQU0sV0FBVyxHQUFpQjtZQUM5QixNQUFNLEVBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBRSxTQUFTLEVBQUU7WUFDbEQsU0FBUyxFQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUUsQ0FBQztTQUN6RCxDQUFBO1FBQ0QsT0FBTyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUMvQztZQUNFLEtBQUssRUFBQyxXQUFXO1NBQ2xCLENBQ0YsQ0FBQTtJQUNILENBQUM7SUFDRCxTQUFTLEVBQUU7UUFDVCxNQUFNLEVBQUUsQ0FBQzs7O1FBR1A7U0FDRDtLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudExvYWRlciwgU2xvdFBhcnNlciB9IGZyb20gXCJAdGV4dGJ1cy9icm93c2VyXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbXBvbmVudCwgQ29tcG9uZW50TWV0aG9kcywgQ29udGVudFR5cGUsIENvbXBvbmVudERhdGEsIHVzZUNvbnRleHQsIFRyYW5zbGF0b3IsIFNsb3RSZW5kZXIsIFxyXG4gIFZFbGVtZW50LCB1c2VTdGF0ZSwgQ29tcG9uZW50SW5zdGFuY2UsIEluamVjdG9yLFNlbGVjdGlvbn0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuaW1wb3J0IHsgRGlhbG9nIH0gZnJvbSBcIkB0ZXh0YnVzL2VkaXRvclwiO1xyXG5pbXBvcnQgeyBBbGVydFN0YXRlIH0gZnJvbSBcIi4uL19wdWJsaWMtYXBpXCI7XHJcbmltcG9ydCB7SnNOZXdHdWlkfSBmcm9tIFwiLi4vLi4vdXRpbHMvY29tbW9uXCJcclxuZXhwb3J0IGludGVyZmFjZSBQYWdlQ29uZmlnU3RhdGV7XHJcbiAgICBwYWdlSUQ6c3RyaW5nO1xyXG4gICAgc2Nyb2xsVG9wOm51bWJlcjtcclxuICB9XHJcbiAgXHJcbmV4cG9ydCBjb25zdCBwYWdlQ29uZmlnQ29tcG9uZW50ID0gZGVmaW5lQ29tcG9uZW50PENvbXBvbmVudE1ldGhvZHMsIFBhZ2VDb25maWdTdGF0ZT4oe1xyXG4gICAgdHlwZTogQ29udGVudFR5cGUuQmxvY2tDb21wb25lbnQsXHJcbiAgICBuYW1lOiAncGFnZUNvbmZpZ0NvbXBvbmVudCcsXHJcbiAgICBzZXR1cChkYXRhOiBDb21wb25lbnREYXRhPFBhZ2VDb25maWdTdGF0ZT4pOiBDb21wb25lbnRNZXRob2RzIHtcclxuICAgICAgICBjb25zdCBpbmplY3RvciA9IHVzZUNvbnRleHQoKTtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdG9yPWluamVjdG9yLmdldChUcmFuc2xhdG9yKTtcclxuICAgICAgICBjb25zdCBkaWFsb2cgPSBpbmplY3Rvci5nZXQoRGlhbG9nKTtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBpbmplY3Rvci5nZXQoU2VsZWN0aW9uKTtcclxuICAgICAgICBsZXQgc3RhdGU9ZGF0YS5zdGF0ZSBhcyBQYWdlQ29uZmlnU3RhdGU7XHJcbiAgICAgICAgY29uc3QgY2hhbmdlQ29udHJvbGxlcj11c2VTdGF0ZShzdGF0ZSk7XHJcblxyXG4gICAgICAgIGNoYW5nZUNvbnRyb2xsZXIub25DaGFuZ2Uuc3Vic2NyaWJlKG5ld1N0YXRlPT57XHJcbiAgICAgICAgICBzdGF0ZT1uZXdTdGF0ZTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlbmRlcihpc091dHB1dE1vZGU6IGJvb2xlYW4sIHNsb3RSZW5kZXI6IFNsb3RSZW5kZXIpOiBWRWxlbWVudCB7ICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIGNvbnN0IHZOb2RlPVZFbGVtZW50LmNyZWF0ZUVsZW1lbnQoJ2Rpdicse1xyXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M6XCJ0Yi1wYWdlLWNvbmZpZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOnN0YXRlLnNjcm9sbFRvcCxcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZ2VJRDpzdGF0ZS5wYWdlSURcclxuICAgICAgICAgICAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgIHJldHVybiB2Tm9kZVxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz17IGNsYXNzZXMgfT5cclxuICAgICAgICAgICAgICAgIDxkaXY+6L+Z5pivIEFsZXJ0IOe7hOS7tu+8jOi/memHjOeahOWGheWuueaYr+S4jeWPr+S7pee8lui+keeahDwvZGl2PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsb3RSZW5kZXIoc2xvdHMuZ2V0KDApISwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2Lz5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkqL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG5cclxuZXhwb3J0IGNvbnN0IHBhZ2VDb25maWdDb21wb25lbnRMb2FkZXI6IENvbXBvbmVudExvYWRlciA9IHtcclxuICAgIGNvbXBvbmVudDogcGFnZUNvbmZpZ0NvbXBvbmVudCxcclxuICAgIFxyXG4gICAgbWF0Y2goZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcclxuICAgICAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZGl2JyAmJiBlbGVtZW50LmNsYXNzTmFtZS5pbmNsdWRlcygndGItcGFnZS1jb25maWcnKVxyXG4gICAgfSxcclxuICAgIHJlYWQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbnRleHQ6IEluamVjdG9yLCBzbG90UGFyc2VyOiBTbG90UGFyc2VyKTogQ29tcG9uZW50SW5zdGFuY2Uge1xyXG4gICAgICAvL1RPRE865LuOaHRtbOivu+WPluaXtuWPluWHumZpbGzlkox0eXBlXHJcbiAgXHJcbiAgICAgIGNvbnN0IGNvbmZpZ1N0YXRlOlBhZ2VDb25maWdTdGF0ZT17XHJcbiAgICAgICAgICBwYWdlSUQ6ZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJwYWdlSURcIil8fEpzTmV3R3VpZCgpLFxyXG4gICAgICAgICAgc2Nyb2xsVG9wOk51bWJlcihlbGVtZW50LmdldEF0dHJpYnV0ZShcInNjcm9sbFRvcFwiKSl8fDBcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcGFnZUNvbmZpZ0NvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShjb250ZXh0LCBcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzdGF0ZTpjb25maWdTdGF0ZVxyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgfSxcclxuICAgIHJlc291cmNlczoge1xyXG4gICAgICBzdHlsZXM6IFtgXHJcbiAgICAgIC50Yi1wYWdlLWNvbmZpZ3tcclxuICAgICAgICBkaXNwbGF5Om5vbmU7XHJcbiAgICAgIH1gXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgfVxyXG4gICJdfQ==