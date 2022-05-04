import { fromEvent } from "@tanbo/stream";
import { createElement, createTextNode } from "@textbus/browser";
import { Layout } from "@textbus/editor";
import { CardToolTab } from "./tool/toolTab/CardToolTab.plugin";
import { toolTabConfig } from "./tool/library.toolTab.config";
export class LibraryDrawerPlugin {
    constructor(positionFlag) {
        Object.defineProperty(this, "switchElementRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "switchBtn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "subs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        //libDrawer!: LibraryTab;
        Object.defineProperty(this, "toolTab", {
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
        Object.defineProperty(this, "positionFlag", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        }); //组件库面板位置标识，true为工作区，false为右侧容器
        Object.defineProperty(this, "_expand", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.positionFlag = positionFlag == undefined ? true : positionFlag;
        console.log(positionFlag, this.positionFlag);
        this.switchBtn = createElement('button', {
            attrs: {
                type: 'button',
                title: "组件库",
            },
            classes: ['textbus-status-bar-btn'],
            children: [
                createElement('span', {
                    classes: ['textbus-icon-components']
                }),
                createTextNode("组件库")
            ]
        });
        this.switchElementRef = createElement('div', {
            styles: {
                "margin-left": "auto"
            },
            classes: ['textbus-lib-switch'],
            children: [
                this.switchBtn
            ]
        });
        this.subs.push(fromEvent(this.switchElementRef, 'click').subscribe(() => {
            this.expand = !this.expand;
        }));
    }
    set expand(b) {
        this._expand = b;
        //this.callback(b);
        if (b) {
            this.switchElementRef.classList.add('textbus-status-bar-btn-active');
            if (this.positionFlag) {
                this.layout.workbench.setAttribute("style", "display:flex;");
                //(this.layout.workbench as HTMLElement).appendChild(this.libDrawer.elementRef);
                this.layout.workbench.appendChild(this.toolTab.elementRef);
            }
            else {
                //this.layout.container.parentNode.append(this.libDrawer.elementRef);
                this.layout.container.parentNode.append(this.toolTab.elementRef);
            }
        }
        else {
            this.switchElementRef.classList.remove('textbus-status-bar-btn-active');
            //this.libDrawer.elementRef.remove();
            this.toolTab.elementRef.remove();
        }
    }
    get expand() {
        return this._expand;
    }
    setup(injector) {
        //this.libDrawer=new LibraryTab(injector);
        console.log("LibraryDrawerPlugin", toolTabConfig);
        this.toolTab = new CardToolTab(injector, toolTabConfig);
        //this.libDrawer.elementRef.setAttribute("style","height:100%;");
        this.toolTab.elementRef.setAttribute("style", "height:100%;");
        this.layout = injector.get(Layout);
        //this.layout.container.parentNode.prepend(this.leftContainer);
        //this.leftContainer.appendChild(this.container);
        this.layout.bottom.appendChild(this.switchElementRef);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlicmFyeS5kcmF3ZXIucGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGV4dGJ1cy9wbHVnaW4vbGlicmFyeS5kcmF3ZXIucGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQVUsTUFBTSxrQkFBa0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUk3RCxNQUFNLE9BQU8sbUJBQW1CO0lBUzVCLFlBQVksWUFBcUI7UUFSakM7Ozs7O1dBQTZCO1FBQzdCOzs7OztXQUE2QjtRQUM3Qjs7OzttQkFBYyxFQUFFO1dBQUM7UUFDakIseUJBQXlCO1FBQ3pCOzs7OztXQUFxQjtRQUNyQjs7Ozs7V0FBWTtRQUNaOzs7O21CQUFxQixJQUFJO1dBQUMsQ0FBQSwrQkFBK0I7UUFDekQ7Ozs7bUJBQTJCLEtBQUs7V0FBQztRQUU3QixJQUFJLENBQUMsWUFBWSxHQUFDLFlBQVksSUFBRSxTQUFTLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQSxDQUFDLENBQUEsWUFBWSxDQUFDO1FBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUU7WUFDbkMsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxLQUFLO2FBQ2I7WUFDRCxPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztZQUNuQyxRQUFRLEVBQUU7Z0JBQ1IsYUFBYSxDQUFDLE1BQU0sRUFBRTtvQkFDcEIsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7aUJBQ3JDLENBQUM7Z0JBQ0YsY0FBYyxDQUFDLEtBQUssQ0FBQzthQUN0QjtTQUNGLENBQXNCLENBQUM7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixHQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUU7WUFDdkMsTUFBTSxFQUFDO2dCQUNILGFBQWEsRUFBRSxNQUFNO2FBQ3hCO1lBQ0QsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7WUFDL0IsUUFBUSxFQUFFO2dCQUNSLElBQUksQ0FBQyxTQUFTO2FBQ2Y7U0FDSixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDVixTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDdkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQ0gsQ0FBQTtJQUNQLENBQUM7SUFDRCxJQUFJLE1BQU0sQ0FBQyxDQUFVO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsRUFBRTtZQUNMLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDckUsSUFBRyxJQUFJLENBQUMsWUFBWSxFQUFDO2dCQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQXlCLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBQyxlQUFlLENBQUMsQ0FBQztnQkFDN0UsZ0ZBQWdGO2dCQUMvRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQXlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDN0U7aUJBQUk7Z0JBQ0gscUVBQXFFO2dCQUNyRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbEU7U0FFRjthQUFNO1lBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUN4RSxxQ0FBcUM7WUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbEM7SUFDTCxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUTtRQUNWLDBDQUEwQztRQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JELGlFQUFpRTtRQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxNQUFNLEdBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQywrREFBK0Q7UUFDL0QsaURBQWlEO1FBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tIFwiQHRhbmJvL3N0cmVhbVwiO1xyXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBjcmVhdGVUZXh0Tm9kZSwgUGx1Z2luIH0gZnJvbSBcIkB0ZXh0YnVzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHsgTGF5b3V0IH0gZnJvbSBcIkB0ZXh0YnVzL2VkaXRvclwiO1xyXG5pbXBvcnQgeyBDYXJkVG9vbFRhYiB9IGZyb20gXCIuL3Rvb2wvdG9vbFRhYi9DYXJkVG9vbFRhYi5wbHVnaW5cIjtcclxuaW1wb3J0IHt0b29sVGFiQ29uZmlnIH0gZnJvbSBcIi4vdG9vbC9saWJyYXJ5LnRvb2xUYWIuY29uZmlnXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBMaWJyYXJ5RHJhd2VyUGx1Z2luIGltcGxlbWVudHMgUGx1Z2lue1xyXG4gICAgc3dpdGNoRWxlbWVudFJlZjpIVE1MRWxlbWVudDtcclxuICAgIHN3aXRjaEJ0bjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBzdWJzOiBhbnlbXSA9IFtdO1xyXG4gICAgLy9saWJEcmF3ZXIhOiBMaWJyYXJ5VGFiO1xyXG4gICAgdG9vbFRhYiE6Q2FyZFRvb2xUYWI7XHJcbiAgICBsYXlvdXQ6IGFueTtcclxuICAgIHBvc2l0aW9uRmxhZzpib29sZWFuPXRydWU7Ly/nu4Tku7blupPpnaLmnb/kvY3nva7moIfor4bvvIx0cnVl5Li65bel5L2c5Yy677yMZmFsc2XkuLrlj7PkvqflrrnlmahcclxuICAgIHByaXZhdGUgX2V4cGFuZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb25GbGFnPzpib29sZWFuKXtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uRmxhZz1wb3NpdGlvbkZsYWc9PXVuZGVmaW5lZD90cnVlOnBvc2l0aW9uRmxhZztcclxuICAgICAgICBjb25zb2xlLmxvZyhwb3NpdGlvbkZsYWcsdGhpcy5wb3NpdGlvbkZsYWcpXHJcbiAgICAgICAgdGhpcy5zd2l0Y2hCdG49Y3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG4gICAgICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiBcIue7hOS7tuW6k1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtc3RhdHVzLWJhci1idG4nXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLWljb24tY29tcG9uZW50cyddXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgY3JlYXRlVGV4dE5vZGUoXCLnu4Tku7blupNcIilcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hFbGVtZW50UmVmPWNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgc3R5bGVzOntcclxuICAgICAgICAgICAgICAgIFwibWFyZ2luLWxlZnRcIjogXCJhdXRvXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLWxpYi1zd2l0Y2gnXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICB0aGlzLnN3aXRjaEJ0blxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zdWJzLnB1c2goXHJcbiAgICAgICAgICAgIGZyb21FdmVudCh0aGlzLnN3aXRjaEVsZW1lbnRSZWYsICdjbGljaycpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5leHBhbmQgPSAhdGhpcy5leHBhbmQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApXHJcbiAgICB9XHJcbiAgICBzZXQgZXhwYW5kKGI6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9leHBhbmQgPSBiO1xyXG4gICAgICAgIC8vdGhpcy5jYWxsYmFjayhiKTtcclxuICAgICAgICBpZiAoYikge1xyXG4gICAgICAgICAgdGhpcy5zd2l0Y2hFbGVtZW50UmVmLmNsYXNzTGlzdC5hZGQoJ3RleHRidXMtc3RhdHVzLWJhci1idG4tYWN0aXZlJyk7XHJcbiAgICAgICAgICBpZih0aGlzLnBvc2l0aW9uRmxhZyl7XHJcbiAgICAgICAgICAgICh0aGlzLmxheW91dC53b3JrYmVuY2ggYXMgSFRNTEVsZW1lbnQpLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJkaXNwbGF5OmZsZXg7XCIpO1xyXG4gICAgICAgICAgICAvLyh0aGlzLmxheW91dC53b3JrYmVuY2ggYXMgSFRNTEVsZW1lbnQpLmFwcGVuZENoaWxkKHRoaXMubGliRHJhd2VyLmVsZW1lbnRSZWYpO1xyXG4gICAgICAgICAgICAodGhpcy5sYXlvdXQud29ya2JlbmNoIGFzIEhUTUxFbGVtZW50KS5hcHBlbmRDaGlsZCh0aGlzLnRvb2xUYWIuZWxlbWVudFJlZik7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy90aGlzLmxheW91dC5jb250YWluZXIucGFyZW50Tm9kZS5hcHBlbmQodGhpcy5saWJEcmF3ZXIuZWxlbWVudFJlZik7XHJcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LmNvbnRhaW5lci5wYXJlbnROb2RlLmFwcGVuZCh0aGlzLnRvb2xUYWIuZWxlbWVudFJlZik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zd2l0Y2hFbGVtZW50UmVmLmNsYXNzTGlzdC5yZW1vdmUoJ3RleHRidXMtc3RhdHVzLWJhci1idG4tYWN0aXZlJyk7XHJcbiAgICAgICAgICAvL3RoaXMubGliRHJhd2VyLmVsZW1lbnRSZWYucmVtb3ZlKCk7XHJcbiAgICAgICAgICB0aGlzLnRvb2xUYWIuZWxlbWVudFJlZi5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBleHBhbmQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cGFuZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0dXAoaW5qZWN0b3Ipe1xyXG4gICAgICAgIC8vdGhpcy5saWJEcmF3ZXI9bmV3IExpYnJhcnlUYWIoaW5qZWN0b3IpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTGlicmFyeURyYXdlclBsdWdpblwiLHRvb2xUYWJDb25maWcpXHJcbiAgICAgICAgdGhpcy50b29sVGFiPW5ldyBDYXJkVG9vbFRhYihpbmplY3Rvcix0b29sVGFiQ29uZmlnKTtcclxuICAgICAgICAvL3RoaXMubGliRHJhd2VyLmVsZW1lbnRSZWYuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcImhlaWdodDoxMDAlO1wiKTtcclxuICAgICAgICB0aGlzLnRvb2xUYWIuZWxlbWVudFJlZi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLFwiaGVpZ2h0OjEwMCU7XCIpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0PWluamVjdG9yLmdldChMYXlvdXQpO1xyXG4gICAgICAgIC8vdGhpcy5sYXlvdXQuY29udGFpbmVyLnBhcmVudE5vZGUucHJlcGVuZCh0aGlzLmxlZnRDb250YWluZXIpO1xyXG4gICAgICAgIC8vdGhpcy5sZWZ0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcclxuICAgICAgICB0aGlzLmxheW91dC5ib3R0b20uYXBwZW5kQ2hpbGQodGhpcy5zd2l0Y2hFbGVtZW50UmVmKTtcclxuICAgIH1cclxufSJdfQ==