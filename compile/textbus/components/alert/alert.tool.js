import { ButtonTool } from '@textbus/editor';
import { Commander, ContentType, Slot, Selection } from '@textbus/core';
import { alertComponent } from './alert.component';
import { SlotComplete } from '../type';
export function alertToolConfigFactory(injector) {
    const commander = injector.get(Commander);
    const selection = injector.get(Selection);
    return {
        label: '警告框',
        tooltip: '警告框',
        keymap: /win(dows|32|64)/i.test(navigator.userAgent) ? {
            altKey: true,
            key: 'a'
        } : {
            ctrlKey: true,
            key: 'a'
        },
        onClick() {
            const slot = new Slot([ContentType.Text]);
            slot.insert("这是Alert组件");
            const alertState = {
                fill: true,
                type: 'primary',
            };
            const component = alertComponent.createInstance(injector, {
                slots: [
                    slot,
                    new SlotComplete()
                ],
                state: alertState
            });
            commander.insert(component);
            selection.setPosition(slot, slot.length);
        }
    };
}
export function alertTool() {
    return new ButtonTool(alertToolConfigFactory);
}
export const alertExample = `<img src="data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg width="100" height="70" xmlns="http://www.w3.org/2000/svg"><g><rect fill="#fff" height="100%" width="100%"/></g><rect width="90%" height="20" fill="#eee" stroke="#dedede" rx="5" ry="5" x="5" y="25"></rect><text font-family="Helvetica, Arial, sans-serif" font-size="10" x="10" y="35" stroke-width="0" stroke="#000" fill="#000000">文本内容</text></svg>')}">`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQudG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RleHRidXMvY29tcG9uZW50cy9hbGVydC9hbGVydC50b29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBOEIsVUFBVSxFQUFrQixNQUFNLGlCQUFpQixDQUFBO0FBQ3hGLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDdkUsT0FBTyxFQUFDLGNBQWMsRUFBYSxNQUFNLG1CQUFtQixDQUFBO0FBQzVELE9BQU8sRUFBb0IsWUFBWSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBRXhELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxRQUFRO0lBQzdDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDekMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN6QyxPQUFPO1FBQ0wsS0FBSyxFQUFFLEtBQUs7UUFDWixPQUFPLEVBQUMsS0FBSztRQUNiLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxNQUFNLEVBQUUsSUFBSTtZQUNaLEdBQUcsRUFBRSxHQUFHO1NBQ1gsQ0FBQyxDQUFDLENBQUM7WUFDQSxPQUFPLEVBQUUsSUFBSTtZQUNiLEdBQUcsRUFBRSxHQUFHO1NBQ1g7UUFDRCxPQUFPO1lBQ0wsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3hCLE1BQU0sVUFBVSxHQUFZO2dCQUMxQixJQUFJLEVBQUUsSUFBSTtnQkFDVixJQUFJLEVBQUMsU0FBUzthQUNmLENBQUE7WUFDRCxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFDdEQ7Z0JBQ0UsS0FBSyxFQUFDO29CQUNKLElBQUk7b0JBQ0osSUFBSSxZQUFZLEVBQUU7aUJBQ25CO2dCQUNELEtBQUssRUFBQyxVQUFVO2FBQ2pCLENBQ0YsQ0FBQTtZQUVELFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDM0IsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzFDLENBQUM7S0FDRixDQUFBO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTO0lBQ3ZCLE9BQU8sSUFBSSxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtBQUMvQyxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFDLDhDQUE4QyxrQkFBa0IsQ0FBQyxpV0FBaVcsQ0FBQyxJQUFJLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Jsb2NrcXVvdGVUb29sQ29uZmlnRmFjdG9yeSwgQnV0dG9uVG9vbCxCdXR0b25Ub29sQ29uZmlnfSBmcm9tICdAdGV4dGJ1cy9lZGl0b3InXG5pbXBvcnQgeyBDb21tYW5kZXIsIENvbnRlbnRUeXBlLCBTbG90LCBTZWxlY3Rpb24gfSBmcm9tICdAdGV4dGJ1cy9jb3JlJ1xuaW1wb3J0IHthbGVydENvbXBvbmVudCwgQWxlcnRTdGF0ZX0gZnJvbSAnLi9hbGVydC5jb21wb25lbnQnXG5pbXBvcnQgeyBDb21wb25lbnRDcmVhdG9yLCBTbG90Q29tcGxldGUgfSBmcm9tICcuLi90eXBlJ1xuXG5leHBvcnQgZnVuY3Rpb24gYWxlcnRUb29sQ29uZmlnRmFjdG9yeShpbmplY3Rvcik6QnV0dG9uVG9vbENvbmZpZyB7XG4gIGNvbnN0IGNvbW1hbmRlciA9IGluamVjdG9yLmdldChDb21tYW5kZXIpXG4gIGNvbnN0IHNlbGVjdGlvbiA9IGluamVjdG9yLmdldChTZWxlY3Rpb24pXG4gIHJldHVybiB7XG4gICAgbGFiZWw6ICforablkYrmoYYnLFxuICAgIHRvb2x0aXA6J+itpuWRiuahhicsXG4gICAga2V5bWFwOiAvd2luKGRvd3N8MzJ8NjQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSA/IHtcbiAgICAgICAgYWx0S2V5OiB0cnVlLFxuICAgICAgICBrZXk6ICdhJ1xuICAgIH0gOiB7XG4gICAgICAgIGN0cmxLZXk6IHRydWUsXG4gICAgICAgIGtleTogJ2EnXG4gICAgfSxcbiAgICBvbkNsaWNrKCkge1xuICAgICAgY29uc3Qgc2xvdCA9IG5ldyBTbG90KFtDb250ZW50VHlwZS5UZXh0XSlcbiAgICAgIHNsb3QuaW5zZXJ0KFwi6L+Z5pivQWxlcnTnu4Tku7ZcIilcbiAgICAgIGNvbnN0IGFsZXJ0U3RhdGU6QWxlcnRTdGF0ZT17XG4gICAgICAgIGZpbGw6IHRydWUsXG4gICAgICAgIHR5cGU6J3ByaW1hcnknLFxuICAgICAgfVxuICAgICAgY29uc3QgY29tcG9uZW50ID0gYWxlcnRDb21wb25lbnQuY3JlYXRlSW5zdGFuY2UoaW5qZWN0b3IsIFxuICAgICAgICB7XG4gICAgICAgICAgc2xvdHM6W1xuICAgICAgICAgICAgc2xvdCxcbiAgICAgICAgICAgIG5ldyBTbG90Q29tcGxldGUoKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgc3RhdGU6YWxlcnRTdGF0ZVxuICAgICAgICB9XG4gICAgICApXG4gICAgXG4gICAgICBjb21tYW5kZXIuaW5zZXJ0KGNvbXBvbmVudClcbiAgICAgIHNlbGVjdGlvbi5zZXRQb3NpdGlvbihzbG90LCBzbG90Lmxlbmd0aClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0VG9vbCgpe1xuICByZXR1cm4gbmV3IEJ1dHRvblRvb2woYWxlcnRUb29sQ29uZmlnRmFjdG9yeSlcbn1cblxuZXhwb3J0IGNvbnN0IGFsZXJ0RXhhbXBsZT1gPGltZyBzcmM9XCJkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD1VVEYtOCwke2VuY29kZVVSSUNvbXBvbmVudCgnPHN2ZyB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjcwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxnPjxyZWN0IGZpbGw9XCIjZmZmXCIgaGVpZ2h0PVwiMTAwJVwiIHdpZHRoPVwiMTAwJVwiLz48L2c+PHJlY3Qgd2lkdGg9XCI5MCVcIiBoZWlnaHQ9XCIyMFwiIGZpbGw9XCIjZWVlXCIgc3Ryb2tlPVwiI2RlZGVkZVwiIHJ4PVwiNVwiIHJ5PVwiNVwiIHg9XCI1XCIgeT1cIjI1XCI+PC9yZWN0Pjx0ZXh0IGZvbnQtZmFtaWx5PVwiSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZlwiIGZvbnQtc2l6ZT1cIjEwXCIgeD1cIjEwXCIgeT1cIjM1XCIgc3Ryb2tlLXdpZHRoPVwiMFwiIHN0cm9rZT1cIiMwMDBcIiBmaWxsPVwiIzAwMDAwMFwiPuaWh+acrOWGheWuuTwvdGV4dD48L3N2Zz4nKX1cIj5gXG4iXX0=