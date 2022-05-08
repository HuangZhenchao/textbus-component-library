import { sampleTime } from '@tanbo/stream';
import { Editor } from '@textbus/editor';
import { DOC_CONTAINER } from "@textbus/browser";
import { Commander, Renderer, RootComponentRef, Selection } from "@textbus/core";
import { pageConfigComponent } from "../../components/_config/config.component";
import { JsNewGuid } from '../../_public-api';
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
        Object.defineProperty(this, "lastPageID", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "rootComponentRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.subs = [];
    }
    setup(injector) {
        //this.layout=injector.get(Layout);
        //this.layout.container.parentNode.prepend(this.leftContainer);
        this.doc = injector.get(DOC_CONTAINER);
        this.renderer = injector.get(Renderer);
        this.rootComponentRef = injector.get(RootComponentRef);
        let selection = injector.get(Selection);
        let commander = injector.get(Commander);
        let editor = injector.get(Editor);
        this.subs.push(this.renderer.onViewChecked.pipe(sampleTime(1000)).subscribe(() => {
            let rootSlot = this.rootComponentRef.component.slots.get(0);
            let node = this.doc.querySelector(".tb-page-config");
            if (node == null) {
                rootSlot.retain(0);
                rootSlot.insert(pageConfigComponent.createInstance(injector, { state: { pageID: JsNewGuid(), scrollTop: 0 } }));
                //rootSlot.retain(0);
                const location = selection.findLastPosition(rootSlot);
                console.log(rootSlot, location.slot, location.offset);
                selection.setPosition(location.slot, location.offset);
                //selection.restore();
                return;
            }
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZUNvbmZpZy5wbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXh0YnVzL3BsdWdpbi9wYWdlLWNvbmZpZy5wbHVnaW4vcGFnZUNvbmZpZy5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFZLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsTUFBTSxFQUFTLE1BQU0saUJBQWlCLENBQUE7QUFDOUMsT0FBTyxFQUFnQyxhQUFhLEVBQTRCLE1BQU0sa0JBQWtCLENBQUM7QUFDekcsT0FBTyxFQUFDLFNBQVMsRUFBWSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ25HLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFBO0FBQzdFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxNQUFNLE9BQU8sZ0JBQWdCO0lBTXpCO1FBTEE7Ozs7O1dBQVk7UUFDWjs7Ozs7V0FBNEI7UUFDNUI7Ozs7O1dBQWtCO1FBQ2xCOzs7O21CQUFrQixFQUFFO1dBQUM7UUFDckI7Ozs7O1dBQW9DO1FBRWhDLElBQUksQ0FBQyxJQUFJLEdBQUMsRUFBRSxDQUFBO0lBRWhCLENBQUM7SUFDRCxLQUFLLENBQUMsUUFBa0I7UUFDcEIsbUNBQW1DO1FBQ25DLCtEQUErRDtRQUMvRCxJQUFJLENBQUMsR0FBRyxHQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdkQsSUFBSSxTQUFTLEdBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxJQUFJLFNBQVMsR0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3JDLElBQUksTUFBTSxHQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFFLEVBQUU7WUFDN0QsSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBRSxDQUFBO1lBQzFELElBQUksSUFBSSxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFbkQsSUFBRyxJQUFJLElBQUUsSUFBSSxFQUFDO2dCQUNWLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLFFBQVEsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFDdkQsRUFBQyxLQUFLLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFFLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxxQkFBcUI7Z0JBQ3JCLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ25ELFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ3JELHNCQUFzQjtnQkFDdEIsT0FBTzthQUNWO1FBQ0wsQ0FBQyxDQUFDLENBQ0wsQ0FBQTtJQUNMLENBQUM7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb21FdmVudCxzYW1wbGVUaW1lIH0gZnJvbSAnQHRhbmJvL3N0cmVhbSc7XHJcbmltcG9ydCB7RWRpdG9yLCBMYXlvdXR9IGZyb20gJ0B0ZXh0YnVzL2VkaXRvcidcclxuaW1wb3J0IHtjcmVhdGVFbGVtZW50LCBjcmVhdGVUZXh0Tm9kZSwgRE9DX0NPTlRBSU5FUiwgRURJVEFCTEVfRE9DVU1FTlQsIFBsdWdpbn0gZnJvbSBcIkB0ZXh0YnVzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtDb21tYW5kZXIsIEluamVjdG9yLCBSZW5kZXJlciwgUm9vdENvbXBvbmVudFJlZiwgU2VsZWN0aW9uLCBWRWxlbWVudH0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuaW1wb3J0IHtwYWdlQ29uZmlnQ29tcG9uZW50fSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9fY29uZmlnL2NvbmZpZy5jb21wb25lbnRcIlxyXG5pbXBvcnQgeyBKc05ld0d1aWQgfSBmcm9tICcuLi8uLi9fcHVibGljLWFwaSc7XHJcbmV4cG9ydCBjbGFzcyBQYWdlQ29uZmlnUGx1Z2luIGltcGxlbWVudHMgUGx1Z2lue1xyXG4gICAgc3ViczogYW55W107XHJcbiAgICBwcml2YXRlIHJlbmRlcmVyITogUmVuZGVyZXI7XHJcbiAgICBkb2MhOiBIVE1MRWxlbWVudDtcclxuICAgIGxhc3RQYWdlSUQ6c3RyaW5nPVwiXCI7XHJcbiAgICByb290Q29tcG9uZW50UmVmITogUm9vdENvbXBvbmVudFJlZjtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5zdWJzPVtdXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBzZXR1cChpbmplY3RvcjogSW5qZWN0b3IpOiB2b2lkIHtcclxuICAgICAgICAvL3RoaXMubGF5b3V0PWluamVjdG9yLmdldChMYXlvdXQpO1xyXG4gICAgICAgIC8vdGhpcy5sYXlvdXQuY29udGFpbmVyLnBhcmVudE5vZGUucHJlcGVuZCh0aGlzLmxlZnRDb250YWluZXIpO1xyXG4gICAgICAgIHRoaXMuZG9jPWluamVjdG9yLmdldChET0NfQ09OVEFJTkVSKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyPWluamVjdG9yLmdldChSZW5kZXJlcik7XHJcbiAgICAgICAgdGhpcy5yb290Q29tcG9uZW50UmVmID0gaW5qZWN0b3IuZ2V0KFJvb3RDb21wb25lbnRSZWYpO1xyXG4gICAgICAgIGxldCBzZWxlY3Rpb249aW5qZWN0b3IuZ2V0KFNlbGVjdGlvbik7XHJcbiAgICAgICAgbGV0IGNvbW1hbmRlcj1pbmplY3Rvci5nZXQoQ29tbWFuZGVyKVxyXG4gICAgICAgIGxldCBlZGl0b3I9aW5qZWN0b3IuZ2V0KEVkaXRvcilcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnN1YnMucHVzaChcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5vblZpZXdDaGVja2VkLnBpcGUoc2FtcGxlVGltZSgxMDAwKSkuc3Vic2NyaWJlKCgpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgcm9vdFNsb3Q9dGhpcy5yb290Q29tcG9uZW50UmVmLmNvbXBvbmVudC5zbG90cy5nZXQoMCkhXHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT10aGlzLmRvYy5xdWVyeVNlbGVjdG9yKFwiLnRiLXBhZ2UtY29uZmlnXCIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihub2RlPT1udWxsKXtcclxuICAgICAgICAgICAgICAgICAgICByb290U2xvdC5yZXRhaW4oMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9vdFNsb3QuaW5zZXJ0KHBhZ2VDb25maWdDb21wb25lbnQuY3JlYXRlSW5zdGFuY2UoaW5qZWN0b3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtzdGF0ZTp7cGFnZUlEOkpzTmV3R3VpZCgpLHNjcm9sbFRvcDowfX0pKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3Jvb3RTbG90LnJldGFpbigwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IHNlbGVjdGlvbi5maW5kTGFzdFBvc2l0aW9uKHJvb3RTbG90KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyb290U2xvdCxsb2NhdGlvbi5zbG90LGxvY2F0aW9uLm9mZnNldClcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24uc2V0UG9zaXRpb24obG9jYXRpb24uc2xvdCwgbG9jYXRpb24ub2Zmc2V0KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0aW9uLnJlc3RvcmUoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbiJdfQ==