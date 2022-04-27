import { ButtonTool } from '@textbus/editor';
import { Commander, Selection } from '@textbus/core';
import { stepComponent, StepSlot } from './step.component';
export function stepToolConfigFactory(injector) {
    const commander = injector.get(Commander);
    const selection = injector.get(Selection);
    return {
        label: '步骤条',
        tooltip: '步骤条',
        onClick() {
            let slots = [new StepSlot()];
            const initState = {
                step: 0,
            };
            const component = stepComponent.createInstance(injector, { slots: slots, state: initState });
            commander.insert(component);
            selection.setPosition(slots[0], 0);
        }
    };
}
export const stepTool = new ButtonTool(stepToolConfigFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC50b29sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGV4dGJ1cy9jb21wb25lbnRzL3N0ZXAvc3RlcC50b29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWtCLE1BQU0saUJBQWlCLENBQUE7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBcUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQ3ZFLE9BQU8sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFZLE1BQU0sa0JBQWtCLENBQUE7QUFFbkUsTUFBTSxVQUFVLHFCQUFxQixDQUFDLFFBQVE7SUFDMUMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN6QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3pDLE9BQU87UUFDSCxLQUFLLEVBQUUsS0FBSztRQUNaLE9BQU8sRUFBQyxLQUFLO1FBQ2IsT0FBTztZQUVILElBQUksS0FBSyxHQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sU0FBUyxHQUFXO2dCQUN0QixJQUFJLEVBQUMsQ0FBQzthQUNULENBQUE7WUFDRCxNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxDQUFDLENBQUE7WUFDdkYsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUMzQixTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN0QyxDQUFDO0tBQ0osQ0FBQTtBQUNMLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQWEsSUFBSSxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1dHRvblRvb2wsQnV0dG9uVG9vbENvbmZpZ30gZnJvbSAnQHRleHRidXMvZWRpdG9yJ1xyXG5pbXBvcnQgeyBDb21tYW5kZXIsIENvbnRlbnRUeXBlLCBTbG90LCBTZWxlY3Rpb24gfSBmcm9tICdAdGV4dGJ1cy9jb3JlJ1xyXG5pbXBvcnQge3N0ZXBDb21wb25lbnQsIFN0ZXBTbG90LCBzdGVwU3RhdGV9IGZyb20gJy4vc3RlcC5jb21wb25lbnQnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RlcFRvb2xDb25maWdGYWN0b3J5KGluamVjdG9yKTpCdXR0b25Ub29sQ29uZmlnIHtcclxuICAgIGNvbnN0IGNvbW1hbmRlciA9IGluamVjdG9yLmdldChDb21tYW5kZXIpXHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBpbmplY3Rvci5nZXQoU2VsZWN0aW9uKVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsYWJlbDogJ+atpemqpOadoScsXHJcbiAgICAgICAgdG9vbHRpcDon5q2l6aqk5p2hJyxcclxuICAgICAgICBvbkNsaWNrKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHNsb3RzPVtuZXcgU3RlcFNsb3QoKV07XHJcbiAgICAgICAgICAgIGNvbnN0IGluaXRTdGF0ZTpzdGVwU3RhdGU9e1xyXG4gICAgICAgICAgICAgICAgc3RlcDowLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBzdGVwQ29tcG9uZW50LmNyZWF0ZUluc3RhbmNlKGluamVjdG9yLCB7c2xvdHM6c2xvdHMsc3RhdGU6aW5pdFN0YXRlfSlcclxuICAgICAgICAgICAgY29tbWFuZGVyLmluc2VydChjb21wb25lbnQpXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbi5zZXRQb3NpdGlvbihzbG90c1swXSwgMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzdGVwVG9vbDpCdXR0b25Ub29sPSBuZXcgQnV0dG9uVG9vbChzdGVwVG9vbENvbmZpZ0ZhY3RvcnkpXHJcbiJdfQ==