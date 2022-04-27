import { ButtonTool } from '@textbus/editor';
import { Commander, Selection } from '@textbus/core';
import { progressComponent } from './progress.component';
export function progressToolConfigFactory(injector) {
    const commander = injector.get(Commander);
    const selection = injector.get(Selection);
    return {
        label: '进度条',
        tooltip: '进度条',
        onClick() {
            const state = {
                type: 'primary',
                progress: 50,
                max: 100,
                min: 0
            };
            const component = progressComponent.createInstance(injector, { state: state });
            commander.insert(component);
            //selection.setPosition(slot, 0)
        }
    };
}
export const progressTool = new ButtonTool(progressToolConfigFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MudG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RleHRidXMvY29tcG9uZW50cy9wcm9ncmVzcy9wcm9ncmVzcy50b29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWtCLE1BQU0saUJBQWlCLENBQUE7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBcUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQ3ZFLE9BQU8sRUFBQyxpQkFBaUIsRUFBZ0IsTUFBTSxzQkFBc0IsQ0FBQTtBQUVyRSxNQUFNLFVBQVUseUJBQXlCLENBQUMsUUFBUTtJQUM5QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3pDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDekMsT0FBTztRQUNILEtBQUssRUFBRSxLQUFLO1FBQ1osT0FBTyxFQUFDLEtBQUs7UUFDYixPQUFPO1lBQ0gsTUFBTSxLQUFLLEdBQWU7Z0JBQ3RCLElBQUksRUFBQyxTQUFTO2dCQUNkLFFBQVEsRUFBQyxFQUFFO2dCQUNYLEdBQUcsRUFBQyxHQUFHO2dCQUNQLEdBQUcsRUFBQyxDQUFDO2FBQ1IsQ0FBQTtZQUNELE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQTtZQUMzRSxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQzNCLGdDQUFnQztRQUNwQyxDQUFDO0tBQ0osQ0FBQTtBQUNMLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQWEsSUFBSSxVQUFVLENBQUMseUJBQXlCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1dHRvblRvb2wsQnV0dG9uVG9vbENvbmZpZ30gZnJvbSAnQHRleHRidXMvZWRpdG9yJ1xyXG5pbXBvcnQgeyBDb21tYW5kZXIsIENvbnRlbnRUeXBlLCBTbG90LCBTZWxlY3Rpb24gfSBmcm9tICdAdGV4dGJ1cy9jb3JlJ1xyXG5pbXBvcnQge3Byb2dyZXNzQ29tcG9uZW50LCBQcm9ncmVzc1N0YXRlfSBmcm9tICcuL3Byb2dyZXNzLmNvbXBvbmVudCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9ncmVzc1Rvb2xDb25maWdGYWN0b3J5KGluamVjdG9yKTpCdXR0b25Ub29sQ29uZmlnIHtcclxuICAgIGNvbnN0IGNvbW1hbmRlciA9IGluamVjdG9yLmdldChDb21tYW5kZXIpXHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBpbmplY3Rvci5nZXQoU2VsZWN0aW9uKVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsYWJlbDogJ+i/m+W6puadoScsXHJcbiAgICAgICAgdG9vbHRpcDon6L+b5bqm5p2hJyxcclxuICAgICAgICBvbkNsaWNrKCkge1xyXG4gICAgICAgICAgICBjb25zdCBzdGF0ZTpQcm9ncmVzc1N0YXRlPXtcclxuICAgICAgICAgICAgICAgIHR5cGU6J3ByaW1hcnknLFxyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3M6NTAsXHJcbiAgICAgICAgICAgICAgICBtYXg6MTAwLFxyXG4gICAgICAgICAgICAgICAgbWluOjBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBwcm9ncmVzc0NvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShpbmplY3Rvciwge3N0YXRlOnN0YXRlfSlcclxuICAgICAgICAgICAgY29tbWFuZGVyLmluc2VydChjb21wb25lbnQpXHJcbiAgICAgICAgICAgIC8vc2VsZWN0aW9uLnNldFBvc2l0aW9uKHNsb3QsIDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NUb29sOkJ1dHRvblRvb2w9IG5ldyBCdXR0b25Ub29sKHByb2dyZXNzVG9vbENvbmZpZ0ZhY3RvcnkpXHJcbiJdfQ==