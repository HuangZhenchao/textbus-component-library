import { sampleTime } from '@tanbo/stream';
import { Editor, Layout } from '@textbus/editor';
import { DOC_CONTAINER } from "@textbus/browser";
import { Commander, Renderer, RootComponentRef, Selection } from "@textbus/core";
import { pageConfigComponent } from "../../components/_config/config.component";
import { JsNewGuid } from '../../_public-api';
import { getComponentsByName } from '../../utils/component/getComponents';
export class PageConfigPlugin {
    constructor() {
        Object.defineProperty(this, "subs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "doc", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lastState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rootComponentRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "layout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "scroller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.subs = [];
        this.lastState = {
            pageID: "",
            scrollTop: 0
        };
    }
    setup(injector) {
        this.layout = injector.get(Layout);
        //this.layout.container.parentNode.prepend(this.leftContainer);
        this.scroller = this.layout.scroller;
        this.doc = injector.get(DOC_CONTAINER);
        this.renderer = injector.get(Renderer);
        this.rootComponentRef = injector.get(RootComponentRef);
        let selection = injector.get(Selection);
        let commander = injector.get(Commander);
        let editor = injector.get(Editor);
        this.subs.push(this.renderer.onViewChecked.pipe(sampleTime(1000)).subscribe(() => {
            let rootSlot = this.rootComponentRef.component.slots.get(0);
            let components = getComponentsByName(this.rootComponentRef.component, "pageConfigComponent");
            if (components.length == 0) {
                rootSlot.retain(0);
                rootSlot.insert(pageConfigComponent.createInstance(injector, { state: { pageID: JsNewGuid(), scrollTop: 0 } }));
                //rootSlot.retain(0);
                const location = selection.findLastPosition(rootSlot);
                console.log(rootSlot, location.slot, location.offset);
                selection.setPosition(location.slot, location.offset);
                //selection.restore();
                return;
            }
            else {
                let component = components[0];
                let state = component.toJSON().state;
                //pageID不同，是新页面，加载页面设置
                if (state.pageID != this.lastState.pageID) {
                    this.lastState = state;
                    this.scroller.scrollTo({ top: state.scrollTop });
                }
            }
        }), this.scroller.addEventListener("scroll", (ev) => {
            let component = getComponentsByName(this.rootComponentRef.component, "pageConfigComponent")[0];
            component.updateState(draft => {
                draft.scrollTop = ev.target.scrollTop;
            });
            //console.log();
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZUNvbmZpZy5wbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXh0YnVzL3BsdWdpbi9wYWdlLWNvbmZpZy5wbHVnaW4vcGFnZUNvbmZpZy5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFZLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFBO0FBQzlDLE9BQU8sRUFBZ0MsYUFBYSxFQUE0QixNQUFNLGtCQUFrQixDQUFDO0FBQ3pHLE9BQU8sRUFBQyxTQUFTLEVBQVksUUFBUSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBVyxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUMsbUJBQW1CLEVBQWtCLE1BQU0sMkNBQTJDLENBQUE7QUFDOUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE1BQU0sT0FBTyxnQkFBZ0I7SUFRekI7UUFQQTs7Ozs7V0FBWTtRQUNaOzs7OztXQUE0QjtRQUM1Qjs7Ozs7V0FBa0I7UUFDbEI7Ozs7O1dBQTBCO1FBQzFCOzs7OztXQUFvQztRQUNwQzs7Ozs7V0FBZ0I7UUFDaEI7Ozs7O1dBQXVCO1FBRW5CLElBQUksQ0FBQyxJQUFJLEdBQUMsRUFBRSxDQUFBO1FBQ1osSUFBSSxDQUFDLFNBQVMsR0FBQztZQUNYLE1BQU0sRUFBQyxFQUFFO1lBQ1QsU0FBUyxFQUFDLENBQUM7U0FDZCxDQUFBO0lBRUwsQ0FBQztJQUNELEtBQUssQ0FBQyxRQUFrQjtRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakMsK0RBQStEO1FBQy9ELElBQUksQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUE7UUFDbEMsSUFBSSxDQUFDLEdBQUcsR0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZELElBQUksU0FBUyxHQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsSUFBSSxTQUFTLEdBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNyQyxJQUFJLE1BQU0sR0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRS9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRSxFQUFFO1lBQzdELElBQUksUUFBUSxHQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUUsQ0FBQTtZQUMxRCxJQUFJLFVBQVUsR0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFMUYsSUFBRyxVQUFVLENBQUMsTUFBTSxJQUFFLENBQUMsRUFBQztnQkFDcEIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUN2RCxFQUFDLEtBQUssRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUUsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLHFCQUFxQjtnQkFDckIsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsSUFBSSxFQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDbkQsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDckQsc0JBQXNCO2dCQUN0QixPQUFPO2FBQ1Y7aUJBQUk7Z0JBQ0QsSUFBSSxTQUFTLEdBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLEtBQUssR0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBd0IsQ0FBQztnQkFDdEQsc0JBQXNCO2dCQUN0QixJQUFHLEtBQUssQ0FBQyxNQUFNLElBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUM7b0JBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUMsS0FBSyxDQUFDO29CQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFDLEdBQUcsRUFBQyxLQUFLLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQTtpQkFDaEQ7YUFDSjtRQUVMLENBQUMsQ0FBQyxFQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFDLENBQUMsRUFBRSxFQUFDLEVBQUU7WUFDMUMsSUFBSSxTQUFTLEdBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVGLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFBLEVBQUU7Z0JBQ3pCLEtBQUssQ0FBQyxTQUFTLEdBQUUsRUFBRSxDQUFDLE1BQXNCLENBQUMsU0FBUyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFBO1lBQ0YsZ0JBQWdCO1FBQ3BCLENBQUMsQ0FBQyxDQUNMLENBQUE7SUFDTCxDQUFDO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tRXZlbnQsc2FtcGxlVGltZSB9IGZyb20gJ0B0YW5iby9zdHJlYW0nO1xyXG5pbXBvcnQge0VkaXRvciwgTGF5b3V0fSBmcm9tICdAdGV4dGJ1cy9lZGl0b3InXHJcbmltcG9ydCB7Y3JlYXRlRWxlbWVudCwgY3JlYXRlVGV4dE5vZGUsIERPQ19DT05UQUlORVIsIEVESVRBQkxFX0RPQ1VNRU5ULCBQbHVnaW59IGZyb20gXCJAdGV4dGJ1cy9icm93c2VyXCI7XHJcbmltcG9ydCB7Q29tbWFuZGVyLCBJbmplY3RvciwgUmVuZGVyZXIsIFJvb3RDb21wb25lbnRSZWYsIFNlbGVjdGlvbiwgVkVsZW1lbnR9IGZyb20gXCJAdGV4dGJ1cy9jb3JlXCI7XHJcbmltcG9ydCB7cGFnZUNvbmZpZ0NvbXBvbmVudCwgUGFnZUNvbmZpZ1N0YXRlfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9fY29uZmlnL2NvbmZpZy5jb21wb25lbnRcIlxyXG5pbXBvcnQgeyBKc05ld0d1aWQgfSBmcm9tICcuLi8uLi9fcHVibGljLWFwaSc7XHJcbmltcG9ydCB7IGdldENvbXBvbmVudHNCeU5hbWUgfSBmcm9tICcuLi8uLi91dGlscy9jb21wb25lbnQvZ2V0Q29tcG9uZW50cyc7XHJcbmV4cG9ydCBjbGFzcyBQYWdlQ29uZmlnUGx1Z2luIGltcGxlbWVudHMgUGx1Z2lue1xyXG4gICAgc3ViczogYW55W107XHJcbiAgICBwcml2YXRlIHJlbmRlcmVyITogUmVuZGVyZXI7XHJcbiAgICBkb2MhOiBIVE1MRWxlbWVudDtcclxuICAgIGxhc3RTdGF0ZTpQYWdlQ29uZmlnU3RhdGU7XHJcbiAgICByb290Q29tcG9uZW50UmVmITogUm9vdENvbXBvbmVudFJlZjtcclxuICAgIGxheW91dCE6IExheW91dDtcclxuICAgIHNjcm9sbGVyITogSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuc3Vicz1bXVxyXG4gICAgICAgIHRoaXMubGFzdFN0YXRlPXtcclxuICAgICAgICAgICAgcGFnZUlEOlwiXCIsXHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDowXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgc2V0dXAoaW5qZWN0b3I6IEluamVjdG9yKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQ9aW5qZWN0b3IuZ2V0KExheW91dCk7XHJcbiAgICAgICAgLy90aGlzLmxheW91dC5jb250YWluZXIucGFyZW50Tm9kZS5wcmVwZW5kKHRoaXMubGVmdENvbnRhaW5lcik7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxlcj10aGlzLmxheW91dC5zY3JvbGxlclxyXG4gICAgICAgIHRoaXMuZG9jPWluamVjdG9yLmdldChET0NfQ09OVEFJTkVSKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyPWluamVjdG9yLmdldChSZW5kZXJlcik7XHJcbiAgICAgICAgdGhpcy5yb290Q29tcG9uZW50UmVmID0gaW5qZWN0b3IuZ2V0KFJvb3RDb21wb25lbnRSZWYpO1xyXG4gICAgICAgIGxldCBzZWxlY3Rpb249aW5qZWN0b3IuZ2V0KFNlbGVjdGlvbik7XHJcbiAgICAgICAgbGV0IGNvbW1hbmRlcj1pbmplY3Rvci5nZXQoQ29tbWFuZGVyKVxyXG4gICAgICAgIGxldCBlZGl0b3I9aW5qZWN0b3IuZ2V0KEVkaXRvcilcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnN1YnMucHVzaChcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5vblZpZXdDaGVja2VkLnBpcGUoc2FtcGxlVGltZSgxMDAwKSkuc3Vic2NyaWJlKCgpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgcm9vdFNsb3Q9dGhpcy5yb290Q29tcG9uZW50UmVmLmNvbXBvbmVudC5zbG90cy5nZXQoMCkhXHJcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50cz1nZXRDb21wb25lbnRzQnlOYW1lKHRoaXMucm9vdENvbXBvbmVudFJlZi5jb21wb25lbnQsXCJwYWdlQ29uZmlnQ29tcG9uZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihjb21wb25lbnRzLmxlbmd0aD09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9vdFNsb3QucmV0YWluKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvb3RTbG90Lmluc2VydChwYWdlQ29uZmlnQ29tcG9uZW50LmNyZWF0ZUluc3RhbmNlKGluamVjdG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7c3RhdGU6e3BhZ2VJRDpKc05ld0d1aWQoKSxzY3JvbGxUb3A6MH19KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yb290U2xvdC5yZXRhaW4oMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSBzZWxlY3Rpb24uZmluZExhc3RQb3NpdGlvbihyb290U2xvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocm9vdFNsb3QsbG9jYXRpb24uc2xvdCxsb2NhdGlvbi5vZmZzZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLnNldFBvc2l0aW9uKGxvY2F0aW9uLnNsb3QsIGxvY2F0aW9uLm9mZnNldClcclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGlvbi5yZXN0b3JlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudD1jb21wb25lbnRzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGF0ZT1jb21wb25lbnQudG9KU09OKCkuc3RhdGUgYXMgUGFnZUNvbmZpZ1N0YXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcGFnZUlE5LiN5ZCM77yM5piv5paw6aG16Z2i77yM5Yqg6L296aG16Z2i6K6+572uXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3RhdGUucGFnZUlEIT10aGlzLmxhc3RTdGF0ZS5wYWdlSUQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RTdGF0ZT1zdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxlci5zY3JvbGxUbyh7dG9wOnN0YXRlLnNjcm9sbFRvcH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLChldik9PntcclxuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnQ9Z2V0Q29tcG9uZW50c0J5TmFtZSh0aGlzLnJvb3RDb21wb25lbnRSZWYuY29tcG9uZW50LFwicGFnZUNvbmZpZ0NvbXBvbmVudFwiKVswXTtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC51cGRhdGVTdGF0ZShkcmFmdD0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYWZ0LnNjcm9sbFRvcD0oZXYudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG4iXX0=