import { ContentType, defineComponent, useContext, useState, VElement, Selection, Renderer, useRef, useSelf, onViewInit } from "@textbus/core";
import G6 from "@antv/g6";
import "./TreeGraph/registerNode";
import { useDragResize } from "@textbus/editor";
import { DateFormat } from "../../utils/Date";
export const TreeGraphComponent = defineComponent({
    name: "TreeGraphComponent",
    type: ContentType.BlockComponent,
    setup(data) {
        let state = data.state;
        const changeController = useState(state);
        let injector = useContext();
        let render = injector.get(Renderer);
        let selection = injector.get(Selection);
        let instance = useSelf();
        //useState({fill:false,type:'info',slot:slots.toJSON()})
        changeController.onChange.subscribe(newState => {
            state = newState;
            console.log('changeController', state);
        });
        const ref = useRef();
        useDragResize(ref, rect => {
            changeController.update(draft => {
                Object.assign(draft.style, rect);
            });
        });
        onViewInit(() => {
            var InitG6TreeGraph = new Function("G6", "container", "data", state.code);
            InitG6TreeGraph(G6, ref.current, JSON.parse(state.data));
        });
        let scriptFlag = true;
        return {
            render(isOutputMode, slotRender) {
                console.log(state);
                let id = 'tree-graph-container' + DateFormat("YYYYMMDDHHmmSS");
                console.log('id', id);
                var childVElement;
                scriptFlag ? console.log("true\n\n") : console.log("false\n\n");
                const container = VElement.createElement('div', {
                    ref,
                    id: id,
                    class: "tb-graph",
                    style: state.style,
                    onClick: (e) => {
                        //let pSlot=instance.parent;
                        selection.selectComponent(instance);
                        //selection.setPosition(pSlot,0)
                        //selection.unSelect()
                        //selection.restore();
                        //selection.selectComponent(instance,true)
                        console.log("selectComponent");
                    }
                });
                if (!isOutputMode && ref.current) {
                    var refDom = ref.current;
                    //var canvas=refDom.querySelector("canvas")
                    state.style.width ? refDom.style.width = state.style.width : null,
                        state.style.height ? refDom.style.height = state.style.height : null;
                    refDom.innerHTML = "";
                    var InitG6TreeGraph = new Function("G6", "container", "data", state.code);
                    //var tgcontainer=document.getElementById(id)
                    InitG6TreeGraph(G6, refDom, JSON.parse(state.data));
                    console.log(refDom.style);
                }
                if (!isOutputMode) {
                    scriptFlag = !scriptFlag;
                }
                return container;
            }
        };
    }
});
export const TreeGraphComponentLoader = {
    component: TreeGraphComponent,
    match(element) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-graph';
    },
    read(element, context, slotParser) {
        const style = element.style;
        const state = {
            style: {},
            code: "",
            data: ""
        };
        //slotParser(state.slot,element)
        return TreeGraphComponent.createInstance(context, { state: state });
        //const component = new TodoListComponent(listConfig.map(i => i.slot));        
    },
    resources: {
        styles: [
            `.tb-graph {
                display: block;
                min-width:500px;
                min-height: 500px;
                max-width:100%;
                
                margin-bottom: 1em;
                background-color: #eee;
              }
              `
        ]
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZUdyYXBoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RleHRidXMvY29tcG9uZW50cy9hbnR2RzYvVHJlZUdyYXBoLmNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdILFdBQVcsRUFDWCxlQUFlLEVBRWYsVUFBVSxFQUFZLFFBQVEsRUFBRSxRQUFRLEVBQUMsU0FBUyxFQUEyRCxRQUFRLEVBQUUsTUFBTSxFQUFPLE9BQU8sRUFBRSxVQUFVLEVBQzFKLE1BQU0sZUFBZSxDQUFDO0FBS3ZCLE9BQU8sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMxQixPQUFPLDBCQUEwQixDQUFBO0FBQ2pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sa0JBQWtCLENBQUE7QUFRM0MsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUMsZUFBZSxDQUFrQztJQUM3RSxJQUFJLEVBQUUsb0JBQW9CO0lBQzFCLElBQUksRUFBRSxXQUFXLENBQUMsY0FBYztJQUNoQyxLQUFLLENBQUMsSUFBbUM7UUFDckMsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQXVCLENBQUM7UUFDdkMsTUFBTSxnQkFBZ0IsR0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxRQUFRLEdBQUMsVUFBVSxFQUFFLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNqQyxJQUFJLFNBQVMsR0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3JDLElBQUksUUFBUSxHQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ3RCLHdEQUF3RDtRQUN4RCxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQSxFQUFFO1lBQzFDLEtB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QUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtpQkFDNUI7Z0JBQ0QsSUFBRyxDQUFDLFlBQVksRUFBQztvQkFDYixVQUFVLEdBQUMsQ0FBQyxVQUFVLENBQUE7aUJBQ3pCO2dCQUNELE9BQU8sU0FBUyxDQUFDO1lBQ3JCLENBQUM7U0FFSixDQUFBO0lBQ0wsQ0FBQztDQUVKLENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFpQjtJQUNsRCxTQUFTLEVBQUUsa0JBQWtCO0lBRTdCLEtBQUssQ0FBQyxPQUFvQjtRQUN0QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssVUFBVSxDQUFBO0lBQ3RGLENBQUM7SUFDRCxJQUFJLENBQUMsT0FBb0IsRUFBRSxPQUFpQixFQUFFLFVBQXNCO1FBQ2hFLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDNUIsTUFBTSxLQUFLLEdBQWdCO1lBQ3ZCLEtBQUssRUFBQyxFQUFFO1lBQ1IsSUFBSSxFQUFFLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtTQUNYLENBQUE7UUFDRCxnQ0FBZ0M7UUFDaEMsT0FBTyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFDLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7UUFFaEUsK0VBQStFO0lBQ25GLENBQUM7SUFFRCxTQUFTLEVBQUU7UUFDUCxNQUFNLEVBQUU7WUFDSjs7Ozs7Ozs7O2VBU0c7U0FDTjtLQUNKO0NBQ0osQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnRJbnN0YW5jZSxcclxuICAgIENvbXBvbmVudE1ldGhvZHMsXHJcbiAgICBDb250ZW50VHlwZSxcclxuICAgIGRlZmluZUNvbXBvbmVudCwgU2xvdCwgU2xvdFJlbmRlcixcclxuICAgIFRyYW5zbGF0b3IsXHJcbiAgICB1c2VDb250ZXh0LCB1c2VTbG90cywgdXNlU3RhdGUsIFZFbGVtZW50LFNlbGVjdGlvbiwgQ29tcG9uZW50T3B0aW9ucywgU2xvdExpdGVyYWwsIFZUZXh0Tm9kZSwgQ29tcG9uZW50RGF0YSwgUmVuZGVyZXIsIHVzZVJlZiwgUmVmLCB1c2VTZWxmLCBvblZpZXdJbml0XHJcbn0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuaW1wb3J0IHtDb21wb25lbnRMb2FkZXIsIFNsb3RQYXJzZXJ9IGZyb20gXCJAdGV4dGJ1cy9icm93c2VyXCI7XHJcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gXCJAdGFuYm8vZGlcIjtcclxuaW1wb3J0IHsgRmlsZVVwbG9hZGVyLCBGb3JtLCBGb3JtU2VsZWN0LCBGb3JtU3dpdGNoLCBGb3JtVGV4dGFyZWEsIEZvcm1UZXh0RmllbGQsIGhlYWRpbmdDb21wb25lbnQgfSBmcm9tIFwiQHRleHRidXMvZWRpdG9yXCI7XHJcblxyXG5pbXBvcnQgRzYgZnJvbSBcIkBhbnR2L2c2XCI7XHJcbmltcG9ydCBcIi4vVHJlZUdyYXBoL3JlZ2lzdGVyTm9kZVwiXHJcbmltcG9ydCB7IHVzZURyYWdSZXNpemUgfSBmcm9tIFwiQHRleHRidXMvZWRpdG9yXCI7XHJcbmltcG9ydCB7RGF0ZUZvcm1hdH0gZnJvbSBcIi4uLy4uL3V0aWxzL0RhdGVcIlxyXG5pbXBvcnQgeyBjb21wb25lbnRTdHlsZSB9IGZyb20gXCIuLi90eXBlXCI7XHJcbmV4cG9ydCBpbnRlcmZhY2UgVHJlZUdyYXBoU3RhdGV7XHJcbiAgICBzdHlsZTpjb21wb25lbnRTdHlsZVxyXG4gICAgY29kZTpzdHJpbmc7XHJcbiAgICBkYXRhOnN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFRyZWVHcmFwaENvbXBvbmVudD1kZWZpbmVDb21wb25lbnQ8Q29tcG9uZW50TWV0aG9kcyxUcmVlR3JhcGhTdGF0ZT4oe1xyXG4gICAgbmFtZTogXCJUcmVlR3JhcGhDb21wb25lbnRcIixcclxuICAgIHR5cGU6IENvbnRlbnRUeXBlLkJsb2NrQ29tcG9uZW50LCBcclxuICAgIHNldHVwKGRhdGE6IENvbXBvbmVudERhdGE8VHJlZUdyYXBoU3RhdGU+KTogQ29tcG9uZW50TWV0aG9kcyB7XHJcbiAgICAgICAgbGV0IHN0YXRlPWRhdGEuc3RhdGUgYXMgVHJlZUdyYXBoU3RhdGU7XHJcbiAgICAgICAgY29uc3QgY2hhbmdlQ29udHJvbGxlcj11c2VTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgbGV0IGluamVjdG9yPXVzZUNvbnRleHQoKTtcclxuICAgICAgICBsZXQgcmVuZGVyPWluamVjdG9yLmdldChSZW5kZXJlcilcclxuICAgICAgICBsZXQgc2VsZWN0aW9uPWluamVjdG9yLmdldChTZWxlY3Rpb24pXHJcbiAgICAgICAgbGV0IGluc3RhbmNlPXVzZVNlbGYoKVxyXG4gICAgICAgIC8vdXNlU3RhdGUoe2ZpbGw6ZmFsc2UsdHlwZTonaW5mbycsc2xvdDpzbG90cy50b0pTT04oKX0pXHJcbiAgICAgICAgY2hhbmdlQ29udHJvbGxlci5vbkNoYW5nZS5zdWJzY3JpYmUobmV3U3RhdGU9PntcclxuICAgICAgICAgICAgc3RhdGU9bmV3U3RhdGU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VDb250cm9sbGVyJyxzdGF0ZSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnN0IHJlZjpSZWY8SFRNTEVsZW1lbnQ+ID0gdXNlUmVmKCk7XHJcbiAgICAgICAgdXNlRHJhZ1Jlc2l6ZShyZWYsIHJlY3QgPT4ge1xyXG4gICAgICAgICAgICBjaGFuZ2VDb250cm9sbGVyLnVwZGF0ZShkcmFmdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGRyYWZ0LnN0eWxlLCByZWN0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgb25WaWV3SW5pdCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBJbml0RzZUcmVlR3JhcGg9bmV3IEZ1bmN0aW9uKFwiRzZcIixcImNvbnRhaW5lclwiLFwiZGF0YVwiLHN0YXRlLmNvZGUpXHJcbiAgICAgICAgICAgIEluaXRHNlRyZWVHcmFwaChHNixyZWYuY3VycmVudCxKU09OLnBhcnNlKHN0YXRlLmRhdGEpKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGxldCBzY3JpcHRGbGFnOmJvb2xlYW49dHJ1ZVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlbmRlcihpc091dHB1dE1vZGU6Ym9vbGVhbiwgc2xvdFJlbmRlcjpTbG90UmVuZGVyKXsgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RhdGUpXHJcbiAgICAgICAgICAgICAgICBsZXQgaWQ9J3RyZWUtZ3JhcGgtY29udGFpbmVyJytEYXRlRm9ybWF0KFwiWVlZWU1NRERISG1tU1NcIilcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpZCcsaWQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkVkVsZW1lbnQ6VkVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHRGbGFnP2NvbnNvbGUubG9nKFwidHJ1ZVxcblxcblwiKTpjb25zb2xlLmxvZyhcImZhbHNlXFxuXFxuXCIpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyPVZFbGVtZW50LmNyZWF0ZUVsZW1lbnQoJ2Rpdicse1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczpcInRiLWdyYXBoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOnN0YXRlLnN0eWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOihlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgcFNsb3Q9aW5zdGFuY2UucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLnNlbGVjdENvbXBvbmVudChpbnN0YW5jZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0aW9uLnNldFBvc2l0aW9uKHBTbG90LDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGlvbi51blNlbGVjdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGlvbi5yZXN0b3JlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGlvbi5zZWxlY3RDb21wb25lbnQoaW5zdGFuY2UsdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3RDb21wb25lbnRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgaWYoIWlzT3V0cHV0TW9kZSYmcmVmLmN1cnJlbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZWZEb209cmVmLmN1cnJlbnRcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhciBjYW52YXM9cmVmRG9tLnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXNcIilcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5zdHlsZS53aWR0aD9yZWZEb20uc3R5bGUud2lkdGg9c3RhdGUuc3R5bGUud2lkdGg6bnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5zdHlsZS5oZWlnaHQ/cmVmRG9tLnN0eWxlLmhlaWdodD1zdGF0ZS5zdHlsZS5oZWlnaHQ6bnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIHJlZkRvbS5pbm5lckhUTUw9XCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBJbml0RzZUcmVlR3JhcGg9bmV3IEZ1bmN0aW9uKFwiRzZcIixcImNvbnRhaW5lclwiLFwiZGF0YVwiLHN0YXRlLmNvZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgdGdjb250YWluZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgSW5pdEc2VHJlZUdyYXBoKEc2LHJlZkRvbSxKU09OLnBhcnNlKHN0YXRlLmRhdGEpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWZEb20uc3R5bGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZighaXNPdXRwdXRNb2RlKXtcclxuICAgICAgICAgICAgICAgICAgICBzY3JpcHRGbGFnPSFzY3JpcHRGbGFnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pXHJcblxyXG5leHBvcnQgY29uc3QgVHJlZUdyYXBoQ29tcG9uZW50TG9hZGVyOkNvbXBvbmVudExvYWRlcj17XHJcbiAgICBjb21wb25lbnQ6IFRyZWVHcmFwaENvbXBvbmVudCxcclxuXHJcbiAgICBtYXRjaChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2RpdicgJiYgZWxlbWVudC5jbGFzc05hbWUgPT09ICd0Yi1ncmFwaCdcclxuICAgIH0sXHJcbiAgICByZWFkKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb250ZXh0OiBJbmplY3Rvciwgc2xvdFBhcnNlcjogU2xvdFBhcnNlcikgOkNvbXBvbmVudEluc3RhbmNle1xyXG4gICAgICAgIGNvbnN0IHN0eWxlID0gZWxlbWVudC5zdHlsZTtcclxuICAgICAgICBjb25zdCBzdGF0ZTpUcmVlR3JhcGhTdGF0ZT17XHJcbiAgICAgICAgICAgIHN0eWxlOnt9LFxyXG4gICAgICAgICAgICBjb2RlOiBcIlwiLFxyXG4gICAgICAgICAgICBkYXRhOiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vc2xvdFBhcnNlcihzdGF0ZS5zbG90LGVsZW1lbnQpXHJcbiAgICAgICAgcmV0dXJuIFRyZWVHcmFwaENvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShjb250ZXh0LHtzdGF0ZTpzdGF0ZX0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vY29uc3QgY29tcG9uZW50ID0gbmV3IFRvZG9MaXN0Q29tcG9uZW50KGxpc3RDb25maWcubWFwKGkgPT4gaS5zbG90KSk7ICAgICAgICBcclxuICAgIH0sXHJcbiAgICBcclxuICAgIHJlc291cmNlczoge1xyXG4gICAgICAgIHN0eWxlczogW1xyXG4gICAgICAgICAgICBgLnRiLWdyYXBoIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgICAgICAgbWluLXdpZHRoOjUwMHB4O1xyXG4gICAgICAgICAgICAgICAgbWluLWhlaWdodDogNTAwcHg7XHJcbiAgICAgICAgICAgICAgICBtYXgtd2lkdGg6MTAwJTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMWVtO1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYFxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbn0iXX0=