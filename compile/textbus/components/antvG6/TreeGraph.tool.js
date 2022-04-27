import { DialogTool, I18n } from '@textbus/editor';
import { Commander, Query, QueryStateType } from '@textbus/core';
import { TreeGraphComponent } from './TreeGraph.component';
import { treeGraph } from './TreeGraph/TreeGraph';
import { paragraphComponent } from "@textbus/editor";
import { TabForm, TabViewControl } from '../../utils/form/tabForm';
import { getStyleControlFormConfig } from '../../utils/form/StyleControl.FormOption';
import { FormAceEditor } from '../../utils/form/form-ace-editor';
export function TreeGraphToolConfigFactory(injector) {
    const i18n = injector.get(I18n);
    const query = injector.get(Query);
    const commander = injector.get(Commander);
    const tabViewControlConfig = {
        title: 'TreeGraph设置',
        tabForms: [
            new TabForm({
                name: "style",
                title: "style设置",
                items: getStyleControlFormConfig(injector).items
            }),
            new TabForm({
                name: "code",
                title: "代码",
                items: [new FormAceEditor({
                        label: "代码",
                        name: "code",
                        value: treeGraph.FunctionString
                    })]
            }),
            new TabForm({
                name: "data",
                title: "Data",
                items: [new FormAceEditor({
                        label: "Data",
                        name: "data",
                        value: treeGraph.DataString
                    })]
            })
        ]
    };
    return {
        iconClasses: ['textbus-icon-image'],
        label: "AntV-G6树图",
        tooltip: i18n.get('plugins.toolbar.imageTool.tooltip'),
        viewController: new TabViewControl(injector, tabViewControlConfig),
        queryState() {
            var instance;
            const queryState = query.queryWrappedComponent(TreeGraphComponent);
            const instanceState = (instance = queryState.value) === null || instance === void 0 ? void 0 : instance.toJSON().state;
            //console.log("queryState", queryState,instanceState)
            return {
                state: queryState.state,
                value: instanceState ? {
                    style: {
                        size: {
                            width: instanceState.style.width || "100%",
                            height: instanceState.style.height || "500px",
                        },
                        margin: instanceState.style.margin,
                        float: instanceState.style.float,
                    },
                    code: {
                        code: instanceState.code
                    },
                    data: {
                        data: instanceState.data
                    }
                } : null
            };
        },
        useValue(value) {
            if (value) {
                value = {
                    style: {
                        width: value.style.size.width || "100%",
                        height: value.style.size.height || "500px",
                        margin: value.style.margin,
                        float: value.style.float,
                    },
                    code: value.code.code,
                    data: value.data.data,
                };
            }
            const queryState = query.queryWrappedComponent(TreeGraphComponent);
            console.log("useValue queryState", queryState);
            if (queryState.state === QueryStateType.Enabled) {
                //instance更新
                queryState.value.updateState(draft => {
                    Object.assign(draft, value);
                });
            }
            else if (value === null || value === void 0 ? void 0 : value.code) {
                //console.log(value)
                commander.insert(TreeGraphComponent.createInstance(injector, {
                    state: value
                }));
                commander.insert(paragraphComponent.createInstance(injector));
            }
        }
    };
}
export function TreeGraphTool() {
    return new DialogTool(TreeGraphToolConfigFactory);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZUdyYXBoLnRvb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXh0YnVzL2NvbXBvbmVudHMvYW50dkc2L1RyZWVHcmFwaC50b29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBNkQsVUFBVSxFQUFFLElBQUksRUFBb0csTUFBTSxpQkFBaUIsQ0FBQTtBQUMvTSxPQUFPLEVBQUUsU0FBUyxFQUFnQyxLQUFLLEVBQUUsY0FBYyxFQUFZLE1BQU0sZUFBZSxDQUFBO0FBQ3hHLE9BQU8sRUFBRSxrQkFBa0IsRUFBa0IsTUFBTSx1QkFBdUIsQ0FBQTtBQUkxRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHbEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFFcEQsT0FBTyxFQUFFLE9BQU8sRUFBQyxjQUFjLEVBQXNCLE1BQU0sMEJBQTBCLENBQUE7QUFDckYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMENBQTBDLENBQUE7QUFDcEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFBO0FBRWhFLE1BQU0sVUFBVSwwQkFBMEIsQ0FBQyxRQUFRO0lBQ2pELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sb0JBQW9CLEdBQXNCO1FBQzlDLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFFBQVEsRUFBRTtZQUNSLElBQUksT0FBTyxDQUFDO2dCQUNWLElBQUksRUFBQyxPQUFPO2dCQUNaLEtBQUssRUFBQyxTQUFTO2dCQUNmLEtBQUssRUFBQyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLO2FBQ2hELENBQUM7WUFDRixJQUFJLE9BQU8sQ0FBQztnQkFDVixJQUFJLEVBQUMsTUFBTTtnQkFDWCxLQUFLLEVBQUMsSUFBSTtnQkFDVixLQUFLLEVBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQzt3QkFDdkIsS0FBSyxFQUFDLElBQUk7d0JBQ1YsSUFBSSxFQUFDLE1BQU07d0JBQ1gsS0FBSyxFQUFDLFNBQVMsQ0FBQyxjQUFjO3FCQUMvQixDQUFDLENBQUM7YUFDSixDQUFDO1lBQ0YsSUFBSSxPQUFPLENBQUM7Z0JBQ1YsSUFBSSxFQUFDLE1BQU07Z0JBQ1gsS0FBSyxFQUFDLE1BQU07Z0JBQ1osS0FBSyxFQUFDLENBQUMsSUFBSSxhQUFhLENBQUM7d0JBQ3ZCLEtBQUssRUFBQyxNQUFNO3dCQUNaLElBQUksRUFBQyxNQUFNO3dCQUNYLEtBQUssRUFBQyxTQUFTLENBQUMsVUFBVTtxQkFDM0IsQ0FBQyxDQUFDO2FBQ0osQ0FBQztTQUNIO0tBQ0YsQ0FBQTtJQUNELE9BQU87UUFDTCxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztRQUNuQyxLQUFLLEVBQUUsV0FBVztRQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQztRQUN0RCxjQUFjLEVBQUUsSUFBSSxjQUFjLENBQUMsUUFBUSxFQUFDLG9CQUFvQixDQUFDO1FBQ2pFLFVBQVU7WUFFUixJQUFJLFFBQVEsQ0FBQztZQUNiLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sYUFBYSxHQUFHLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksUUFBUSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztZQUN2SCxxREFBcUQ7WUFDckQsT0FBTztnQkFDTCxLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUs7Z0JBQ3ZCLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO29CQUNyQixLQUFLLEVBQUM7d0JBQ0osSUFBSSxFQUFDOzRCQUNILEtBQUssRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxNQUFNOzRCQUMxQyxNQUFNLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksT0FBTzt5QkFDOUM7d0JBQ0QsTUFBTSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTTt3QkFDbEMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSztxQkFDakM7b0JBQ0QsSUFBSSxFQUFDO3dCQUNILElBQUksRUFBRSxhQUFhLENBQUMsSUFBSTtxQkFDekI7b0JBQ0QsSUFBSSxFQUFDO3dCQUNILElBQUksRUFBQyxhQUFhLENBQUMsSUFBSTtxQkFDeEI7aUJBQ0YsQ0FBQyxDQUFDLENBQUMsSUFBSTthQUNULENBQUM7UUFDSixDQUFDO1FBQ0QsUUFBUSxDQUFDLEtBQUs7WUFDWixJQUFJLEtBQUssRUFBRTtnQkFDVCxLQUFLLEdBQUc7b0JBQ04sS0FBSyxFQUFDO3dCQUNKLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksTUFBTTt3QkFDdkMsTUFBTSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPO3dCQUMxQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNO3dCQUMxQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLO3FCQUN6QjtvQkFDRCxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJO29CQUNyQixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJO2lCQUN0QixDQUFDO2FBQ0g7WUFFRCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNuRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQzdDLElBQUksVUFBVSxDQUFDLEtBQUssS0FBSyxjQUFjLENBQUMsT0FBTyxFQUFFO2dCQUMvQyxZQUFZO2dCQUNaLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNuQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLENBQUM7YUFDSjtpQkFDSSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDakUsb0JBQW9CO2dCQUNwQixTQUFTLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUU7b0JBQzNELEtBQUssRUFBRSxLQUFLO2lCQUNiLENBQUMsQ0FBQyxDQUFDO2dCQUNKLFNBQVMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7YUFDOUQ7UUFDSCxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFDRCxNQUFNLFVBQVUsYUFBYTtJQUMzQixPQUFPLElBQUksVUFBVSxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDcEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJsb2NrcXVvdGVUb29sQ29uZmlnRmFjdG9yeSwgQnV0dG9uVG9vbCwgQnV0dG9uVG9vbENvbmZpZywgRGlhbG9nVG9vbCwgSTE4biwgRm9ybSwgRm9ybVJhZGlvLCBGb3JtVGV4dEZpZWxkLCBGaWxlVXBsb2FkZXIsIEZvcm1TZWxlY3QsIFZpZXdDb250cm9sbGVyLCBGb3JtVGV4dGFyZWEsIEZvcm1JdGVtIH0gZnJvbSAnQHRleHRidXMvZWRpdG9yJ1xyXG5pbXBvcnQgeyBDb21tYW5kZXIsIENvbnRlbnRUeXBlLCBTbG90LCBTZWxlY3Rpb24sIFF1ZXJ5LCBRdWVyeVN0YXRlVHlwZSwgSW5qZWN0b3IgfSBmcm9tICdAdGV4dGJ1cy9jb3JlJ1xyXG5pbXBvcnQgeyBUcmVlR3JhcGhDb21wb25lbnQsIFRyZWVHcmFwaFN0YXRlIH0gZnJvbSAnLi9UcmVlR3JhcGguY29tcG9uZW50J1xyXG5pbXBvcnQgeyBTbG90Q29tcGxldGUgfSBmcm9tICcuLi90eXBlJ1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSBcIkB0YW5iby9zdHJlYW1cIlxyXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBjcmVhdGVUZXh0Tm9kZSB9IGZyb20gJ0B0ZXh0YnVzL2Jyb3dzZXInO1xyXG5pbXBvcnQgeyB0cmVlR3JhcGggfSBmcm9tICcuL1RyZWVHcmFwaC9UcmVlR3JhcGgnO1xyXG5pbXBvcnQgeyBUYWIgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdGFiXCI7XHJcblxyXG5pbXBvcnQgeyBwYXJhZ3JhcGhDb21wb25lbnQgfSBmcm9tIFwiQHRleHRidXMvZWRpdG9yXCJcclxuaW1wb3J0IHsgU2l6ZVNldHRlciB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm0vU2l6ZVNldHRlci5Gb3JtSXRlbSdcclxuaW1wb3J0IHsgVGFiRm9ybSxUYWJWaWV3Q29udHJvbCxUYWJWaWV3Q29udHJvbENvbmZpZ30gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybS90YWJGb3JtJ1xyXG5pbXBvcnQgeyBnZXRTdHlsZUNvbnRyb2xGb3JtQ29uZmlnIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybS9TdHlsZUNvbnRyb2wuRm9ybU9wdGlvbidcclxuaW1wb3J0IHsgRm9ybUFjZUVkaXRvciB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm0vZm9ybS1hY2UtZWRpdG9yJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFRyZWVHcmFwaFRvb2xDb25maWdGYWN0b3J5KGluamVjdG9yKSB7XHJcbiAgY29uc3QgaTE4biA9IGluamVjdG9yLmdldChJMThuKTtcclxuICBjb25zdCBxdWVyeSA9IGluamVjdG9yLmdldChRdWVyeSk7XHJcbiAgY29uc3QgY29tbWFuZGVyID0gaW5qZWN0b3IuZ2V0KENvbW1hbmRlcik7XHJcbiAgY29uc3QgdGFiVmlld0NvbnRyb2xDb25maWc6VGFiVmlld0NvbnRyb2xDb25maWc9e1xyXG4gICAgdGl0bGU6ICdUcmVlR3JhcGjorr7nva4nLFxyXG4gICAgdGFiRm9ybXM6IFtcclxuICAgICAgbmV3IFRhYkZvcm0oe1xyXG4gICAgICAgIG5hbWU6XCJzdHlsZVwiLFxyXG4gICAgICAgIHRpdGxlOlwic3R5bGXorr7nva5cIixcclxuICAgICAgICBpdGVtczpnZXRTdHlsZUNvbnRyb2xGb3JtQ29uZmlnKGluamVjdG9yKS5pdGVtc1xyXG4gICAgICB9KSxcclxuICAgICAgbmV3IFRhYkZvcm0oe1xyXG4gICAgICAgIG5hbWU6XCJjb2RlXCIsXHJcbiAgICAgICAgdGl0bGU6XCLku6PnoIFcIixcclxuICAgICAgICBpdGVtczpbbmV3IEZvcm1BY2VFZGl0b3Ioe1xyXG4gICAgICAgICAgbGFiZWw6XCLku6PnoIFcIixcclxuICAgICAgICAgIG5hbWU6XCJjb2RlXCIsXHJcbiAgICAgICAgICB2YWx1ZTp0cmVlR3JhcGguRnVuY3Rpb25TdHJpbmdcclxuICAgICAgICB9KV1cclxuICAgICAgfSksXHJcbiAgICAgIG5ldyBUYWJGb3JtKHtcclxuICAgICAgICBuYW1lOlwiZGF0YVwiLFxyXG4gICAgICAgIHRpdGxlOlwiRGF0YVwiLFxyXG4gICAgICAgIGl0ZW1zOltuZXcgRm9ybUFjZUVkaXRvcih7XHJcbiAgICAgICAgICBsYWJlbDpcIkRhdGFcIixcclxuICAgICAgICAgIG5hbWU6XCJkYXRhXCIsXHJcbiAgICAgICAgICB2YWx1ZTp0cmVlR3JhcGguRGF0YVN0cmluZ1xyXG4gICAgICAgIH0pXVxyXG4gICAgICB9KVxyXG4gICAgXVxyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgaWNvbkNsYXNzZXM6IFsndGV4dGJ1cy1pY29uLWltYWdlJ10sXHJcbiAgICBsYWJlbDogXCJBbnRWLUc25qCR5Zu+XCIsXHJcbiAgICB0b29sdGlwOiBpMThuLmdldCgncGx1Z2lucy50b29sYmFyLmltYWdlVG9vbC50b29sdGlwJyksXHJcbiAgICB2aWV3Q29udHJvbGxlcjogbmV3IFRhYlZpZXdDb250cm9sKGluamVjdG9yLHRhYlZpZXdDb250cm9sQ29uZmlnKSxcclxuICAgIHF1ZXJ5U3RhdGUoKSB7XHJcblxyXG4gICAgICB2YXIgaW5zdGFuY2U7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5U3RhdGUgPSBxdWVyeS5xdWVyeVdyYXBwZWRDb21wb25lbnQoVHJlZUdyYXBoQ29tcG9uZW50KTtcclxuICAgICAgY29uc3QgaW5zdGFuY2VTdGF0ZSA9IChpbnN0YW5jZSA9IHF1ZXJ5U3RhdGUudmFsdWUpID09PSBudWxsIHx8IGluc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpbnN0YW5jZS50b0pTT04oKS5zdGF0ZTtcclxuICAgICAgLy9jb25zb2xlLmxvZyhcInF1ZXJ5U3RhdGVcIiwgcXVlcnlTdGF0ZSxpbnN0YW5jZVN0YXRlKVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0YXRlOiBxdWVyeVN0YXRlLnN0YXRlLFxyXG4gICAgICAgIHZhbHVlOiBpbnN0YW5jZVN0YXRlID8ge1xyXG4gICAgICAgICAgc3R5bGU6e1xyXG4gICAgICAgICAgICBzaXplOntcclxuICAgICAgICAgICAgICB3aWR0aDogaW5zdGFuY2VTdGF0ZS5zdHlsZS53aWR0aCB8fCBcIjEwMCVcIixcclxuICAgICAgICAgICAgICBoZWlnaHQ6IGluc3RhbmNlU3RhdGUuc3R5bGUuaGVpZ2h0IHx8IFwiNTAwcHhcIixcclxuICAgICAgICAgICAgfSwgICAgICAgICAgIFxyXG4gICAgICAgICAgICBtYXJnaW46IGluc3RhbmNlU3RhdGUuc3R5bGUubWFyZ2luLFxyXG4gICAgICAgICAgICBmbG9hdDogaW5zdGFuY2VTdGF0ZS5zdHlsZS5mbG9hdCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjb2RlOntcclxuICAgICAgICAgICAgY29kZTogaW5zdGFuY2VTdGF0ZS5jb2RlXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgIGRhdGE6aW5zdGFuY2VTdGF0ZS5kYXRhXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSA6IG51bGxcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICB1c2VWYWx1ZSh2YWx1ZSkgeyAgICAgIFxyXG4gICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICB2YWx1ZSA9IHtcclxuICAgICAgICAgIHN0eWxlOntcclxuICAgICAgICAgICAgd2lkdGg6IHZhbHVlLnN0eWxlLnNpemUud2lkdGggfHwgXCIxMDAlXCIsXHJcbiAgICAgICAgICAgIGhlaWdodDogdmFsdWUuc3R5bGUuc2l6ZS5oZWlnaHQgfHwgXCI1MDBweFwiLFxyXG4gICAgICAgICAgICBtYXJnaW46IHZhbHVlLnN0eWxlLm1hcmdpbixcclxuICAgICAgICAgICAgZmxvYXQ6IHZhbHVlLnN0eWxlLmZsb2F0LFxyXG4gICAgICAgICAgfSwgICAgICAgICAgXHJcbiAgICAgICAgICBjb2RlOiB2YWx1ZS5jb2RlLmNvZGUsXHJcbiAgICAgICAgICBkYXRhOiB2YWx1ZS5kYXRhLmRhdGEsXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgY29uc3QgcXVlcnlTdGF0ZSA9IHF1ZXJ5LnF1ZXJ5V3JhcHBlZENvbXBvbmVudChUcmVlR3JhcGhDb21wb25lbnQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInVzZVZhbHVlIHF1ZXJ5U3RhdGVcIixxdWVyeVN0YXRlKVxyXG4gICAgICBpZiAocXVlcnlTdGF0ZS5zdGF0ZSA9PT0gUXVlcnlTdGF0ZVR5cGUuRW5hYmxlZCkge1xyXG4gICAgICAgIC8vaW5zdGFuY2Xmm7TmlrBcclxuICAgICAgICBxdWVyeVN0YXRlLnZhbHVlLnVwZGF0ZVN0YXRlKGRyYWZ0ID0+IHtcclxuICAgICAgICAgIE9iamVjdC5hc3NpZ24oZHJhZnQsIHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFsdWUuY29kZSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codmFsdWUpXHJcbiAgICAgICAgY29tbWFuZGVyLmluc2VydChUcmVlR3JhcGhDb21wb25lbnQuY3JlYXRlSW5zdGFuY2UoaW5qZWN0b3IsIHtcclxuICAgICAgICAgIHN0YXRlOiB2YWx1ZVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBjb21tYW5kZXIuaW5zZXJ0KHBhcmFncmFwaENvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShpbmplY3RvcikpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBUcmVlR3JhcGhUb29sKCkge1xyXG4gIHJldHVybiBuZXcgRGlhbG9nVG9vbChUcmVlR3JhcGhUb29sQ29uZmlnRmFjdG9yeSk7XHJcbn1cclxuXHJcblxyXG4iXX0=