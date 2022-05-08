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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RleHRidXMvY29tcG9uZW50cy9fY29uZmlnL2NvbmZpZy5jb21wb25lbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxlQUFlLEVBQW9CLFdBQVcsRUFBaUIsVUFBVSxFQUFFLFVBQVUsRUFDNUYsUUFBUSxFQUFFLFFBQVEsRUFBOEIsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sb0JBQW9CLENBQUE7QUFNNUMsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsZUFBZSxDQUFnQztJQUM5RSxJQUFJLEVBQUUsV0FBVyxDQUFDLGNBQWM7SUFDaEMsSUFBSSxFQUFFLHFCQUFxQjtJQUMzQixLQUFLLENBQUMsSUFBZ0M7UUFDbEMsTUFBTSxRQUFRLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFDOUIsTUFBTSxVQUFVLEdBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQW9CLENBQUM7UUFDcEMsTUFBTSxnQkFBZ0IsR0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdkMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUEsRUFBRTtZQUM1QyxLQUFLLEdBQUMsUUFBUSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTztZQUNILE1BQU0sQ0FBQyxZQUFxQixFQUFFLFVBQXNCO2dCQUNsRCxNQUFNLEtBQUssR0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBQztvQkFDakMsS0FBSyxFQUFDLGdCQUFnQjtvQkFDdEIsU0FBUyxFQUFDLEtBQUssQ0FBQyxTQUFTO29CQUN6QixNQUFNLEVBQUMsS0FBSyxDQUFDLE1BQU07aUJBQ3RCLENBQ0osQ0FBQTtnQkFDRCxPQUFPLEtBQUssQ0FBQTtnQkFDZDs7Ozs7Ozs7OzttQkFVRztZQUNILENBQUM7U0FDSixDQUFBO0lBQ0wsQ0FBQztDQUNKLENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFvQjtJQUN0RCxTQUFTLEVBQUUsbUJBQW1CO0lBRTlCLEtBQUssQ0FBQyxPQUFvQjtRQUN4QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDaEcsQ0FBQztJQUNELElBQUksQ0FBQyxPQUFvQixFQUFFLE9BQWlCLEVBQUUsVUFBc0I7UUFDbEUsMEJBQTBCO1FBRTFCLE1BQU0sV0FBVyxHQUFhO1lBQzFCLE1BQU0sRUFBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFFLFNBQVMsRUFBRTtZQUNsRCxTQUFTLEVBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBRSxDQUFDO1NBQ3pELENBQUE7UUFDRCxPQUFPLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQy9DO1lBQ0UsS0FBSyxFQUFDLFdBQVc7U0FDbEIsQ0FDRixDQUFBO0lBQ0gsQ0FBQztJQUNELFNBQVMsRUFBRTtRQUNULE1BQU0sRUFBRSxDQUFDOzs7UUFHUDtTQUNEO0tBQ0Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50TG9hZGVyLCBTbG90UGFyc2VyIH0gZnJvbSBcIkB0ZXh0YnVzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29tcG9uZW50LCBDb21wb25lbnRNZXRob2RzLCBDb250ZW50VHlwZSwgQ29tcG9uZW50RGF0YSwgdXNlQ29udGV4dCwgVHJhbnNsYXRvciwgU2xvdFJlbmRlciwgXHJcbiAgVkVsZW1lbnQsIHVzZVN0YXRlLCBDb21wb25lbnRJbnN0YW5jZSwgSW5qZWN0b3IsU2VsZWN0aW9ufSBmcm9tIFwiQHRleHRidXMvY29yZVwiO1xyXG5pbXBvcnQgeyBEaWFsb2cgfSBmcm9tIFwiQHRleHRidXMvZWRpdG9yXCI7XHJcbmltcG9ydCB7IEFsZXJ0U3RhdGUgfSBmcm9tIFwiLi4vX3B1YmxpYy1hcGlcIjtcclxuaW1wb3J0IHtKc05ld0d1aWR9IGZyb20gXCIuLi8uLi91dGlscy9jb21tb25cIlxyXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZ1N0YXRle1xyXG4gICAgcGFnZUlEOnN0cmluZztcclxuICAgIHNjcm9sbFRvcDpudW1iZXI7XHJcbiAgfVxyXG4gIFxyXG5leHBvcnQgY29uc3QgcGFnZUNvbmZpZ0NvbXBvbmVudCA9IGRlZmluZUNvbXBvbmVudDxDb21wb25lbnRNZXRob2RzLCBDb25maWdTdGF0ZT4oe1xyXG4gICAgdHlwZTogQ29udGVudFR5cGUuQmxvY2tDb21wb25lbnQsXHJcbiAgICBuYW1lOiAncGFnZUNvbmZpZ0NvbXBvbmVudCcsXHJcbiAgICBzZXR1cChkYXRhOiBDb21wb25lbnREYXRhPENvbmZpZ1N0YXRlPik6IENvbXBvbmVudE1ldGhvZHMge1xyXG4gICAgICAgIGNvbnN0IGluamVjdG9yID0gdXNlQ29udGV4dCgpO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0b3I9aW5qZWN0b3IuZ2V0KFRyYW5zbGF0b3IpO1xyXG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IGluamVjdG9yLmdldChEaWFsb2cpO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGluamVjdG9yLmdldChTZWxlY3Rpb24pO1xyXG4gICAgICAgIGxldCBzdGF0ZT1kYXRhLnN0YXRlIGFzIENvbmZpZ1N0YXRlO1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZUNvbnRyb2xsZXI9dXNlU3RhdGUoc3RhdGUpO1xyXG5cclxuICAgICAgICBjaGFuZ2VDb250cm9sbGVyLm9uQ2hhbmdlLnN1YnNjcmliZShuZXdTdGF0ZT0+e1xyXG4gICAgICAgICAgc3RhdGU9bmV3U3RhdGU7XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZW5kZXIoaXNPdXRwdXRNb2RlOiBib29sZWFuLCBzbG90UmVuZGVyOiBTbG90UmVuZGVyKTogVkVsZW1lbnQgeyAgICAgICAgICBcclxuICAgICAgICAgICAgICBjb25zdCB2Tm9kZT1WRWxlbWVudC5jcmVhdGVFbGVtZW50KCdkaXYnLHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOlwidGItcGFnZS1jb25maWdcIixcclxuICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDpzdGF0ZS5zY3JvbGxUb3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwYWdlSUQ6c3RhdGUucGFnZUlEXHJcbiAgICAgICAgICAgICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICByZXR1cm4gdk5vZGVcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9eyBjbGFzc2VzIH0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2Pui/meaYryBBbGVydCDnu4Tku7bvvIzov5nph4znmoTlhoXlrrnmmK/kuI3lj6/ku6XnvJbovpHnmoQ8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90UmVuZGVyKHNsb3RzLmdldCgwKSEsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdi8+XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKi9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuXHJcbmV4cG9ydCBjb25zdCBwYWdlQ29uZmlnQ29tcG9uZW50TG9hZGVyOiBDb21wb25lbnRMb2FkZXIgPSB7XHJcbiAgICBjb21wb25lbnQ6IHBhZ2VDb25maWdDb21wb25lbnQsXHJcbiAgICBcclxuICAgIG1hdGNoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICAgIHJldHVybiBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2RpdicgJiYgZWxlbWVudC5jbGFzc05hbWUuaW5jbHVkZXMoJ3RiLXBhZ2UtY29uZmlnJylcclxuICAgIH0sXHJcbiAgICByZWFkKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb250ZXh0OiBJbmplY3Rvciwgc2xvdFBhcnNlcjogU2xvdFBhcnNlcik6IENvbXBvbmVudEluc3RhbmNlIHtcclxuICAgICAgLy9UT0RPOuS7jmh0bWzor7vlj5bml7blj5blh7pmaWxs5ZKMdHlwZVxyXG4gIFxyXG4gICAgICBjb25zdCBjb25maWdTdGF0ZTpDb25maWdTdGF0ZT17XHJcbiAgICAgICAgICBwYWdlSUQ6ZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJwYWdlSURcIil8fEpzTmV3R3VpZCgpLFxyXG4gICAgICAgICAgc2Nyb2xsVG9wOk51bWJlcihlbGVtZW50LmdldEF0dHJpYnV0ZShcInNjcm9sbFRvcFwiKSl8fDBcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcGFnZUNvbmZpZ0NvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShjb250ZXh0LCBcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzdGF0ZTpjb25maWdTdGF0ZVxyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgfSxcclxuICAgIHJlc291cmNlczoge1xyXG4gICAgICBzdHlsZXM6IFtgXHJcbiAgICAgIC50Yi1wYWdlLWNvbmZpZ3tcclxuICAgICAgICBkaXNwbGF5Om5vbmU7XHJcbiAgICAgIH1gXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgfVxyXG4gICJdfQ==