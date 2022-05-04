import { QueryStateType } from "@textbus/core";
import { DropdownTool } from "@textbus/editor";
import { toolTabConfig } from "./library.toolTab.config";
import { CardToolTab } from "./toolTab/CardToolTab.plugin";
export function libraryToolConfigFactory(injector) {
    //const commander = injector.get(Commander);
    //iconClasses: ['textbus-icon-emoji'],
    //console.log("libraryToolConfigFactory",toolTabConfig)
    return {
        label: '组件库',
        iconClasses: ['textbus-icon-components'],
        tooltip: '组件库',
        viewController: new CardToolTab(injector, toolTabConfig),
        queryState() {
            return {
                state: QueryStateType.Normal,
                value: null
            };
        },
        useValue(value) {
            //commander.insert(value);
        }
    };
}
export function libraryDropdownTool() {
    return new DropdownTool(libraryToolConfigFactory);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlicmFyeS5kcm9wZG93bi50b29sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGV4dGJ1cy9wbHVnaW4vdG9vbC9saWJyYXJ5LmRyb3Bkb3duLnRvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFxQixNQUFNLGlCQUFpQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFM0QsTUFBTSxVQUFVLHdCQUF3QixDQUFDLFFBQVE7SUFDN0MsNENBQTRDO0lBQzVDLHNDQUFzQztJQUN0Qyx1REFBdUQ7SUFDdkQsT0FBTztRQUNILEtBQUssRUFBQyxLQUFLO1FBQ1gsV0FBVyxFQUFDLENBQUMseUJBQXlCLENBQUM7UUFDdkMsT0FBTyxFQUFFLEtBQUs7UUFDZCxjQUFjLEVBQUUsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFDLGFBQWEsQ0FBQztRQUN2RCxVQUFVO1lBQ04sT0FBTztnQkFDSCxLQUFLLEVBQUUsY0FBYyxDQUFDLE1BQU07Z0JBQzVCLEtBQUssRUFBRSxJQUFJO2FBQ2QsQ0FBQztRQUNOLENBQUM7UUFDRCxRQUFRLENBQUMsS0FBSztZQUNWLDBCQUEwQjtRQUM5QixDQUFDO0tBQ0osQ0FBQztBQUVOLENBQUM7QUFDRCxNQUFNLFVBQVUsbUJBQW1CO0lBQy9CLE9BQU8sSUFBSSxZQUFZLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN0RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtRdWVyeVN0YXRlVHlwZX0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuaW1wb3J0IHsgRHJvcGRvd25Ub29sLCBEcm9wZG93blRvb2xDb25maWd9IGZyb20gXCJAdGV4dGJ1cy9lZGl0b3JcIjtcclxuXHJcbmltcG9ydCB7IHRvb2xUYWJDb25maWcgfSBmcm9tIFwiLi9saWJyYXJ5LnRvb2xUYWIuY29uZmlnXCI7XHJcbmltcG9ydCB7IENhcmRUb29sVGFiIH0gZnJvbSBcIi4vdG9vbFRhYi9DYXJkVG9vbFRhYi5wbHVnaW5cIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsaWJyYXJ5VG9vbENvbmZpZ0ZhY3RvcnkoaW5qZWN0b3IpOkRyb3Bkb3duVG9vbENvbmZpZyB7XHJcbiAgICAvL2NvbnN0IGNvbW1hbmRlciA9IGluamVjdG9yLmdldChDb21tYW5kZXIpO1xyXG4gICAgLy9pY29uQ2xhc3NlczogWyd0ZXh0YnVzLWljb24tZW1vamknXSxcclxuICAgIC8vY29uc29sZS5sb2coXCJsaWJyYXJ5VG9vbENvbmZpZ0ZhY3RvcnlcIix0b29sVGFiQ29uZmlnKVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsYWJlbDon57uE5Lu25bqTJyxcclxuICAgICAgICBpY29uQ2xhc3NlczpbJ3RleHRidXMtaWNvbi1jb21wb25lbnRzJ10sXHJcbiAgICAgICAgdG9vbHRpcDogJ+e7hOS7tuW6kycsXHJcbiAgICAgICAgdmlld0NvbnRyb2xsZXI6IG5ldyBDYXJkVG9vbFRhYihpbmplY3Rvcix0b29sVGFiQ29uZmlnKSwvL25ldyBMaWJyYXJ5VGFiKGluamVjdG9yKSwvL1xyXG4gICAgICAgIHF1ZXJ5U3RhdGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogUXVlcnlTdGF0ZVR5cGUuTm9ybWFsLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVzZVZhbHVlKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vY29tbWFuZGVyLmluc2VydCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGxpYnJhcnlEcm9wZG93blRvb2woKXtcclxuICAgIHJldHVybiBuZXcgRHJvcGRvd25Ub29sKGxpYnJhcnlUb29sQ29uZmlnRmFjdG9yeSk7XHJcbn0iXX0=