import { ButtonTool } from '@textbus/editor';
import { Commander, Selection } from '@textbus/core';
import { katexBlockComponent, katexInlineComponent } from './katex.component';
export function katexInlineToolConfigFactory(injector) {
    const commander = injector.get(Commander);
    const selection = injector.get(Selection);
    return {
        label: '行内数学公式',
        tooltip: '行内数学公式',
        onClick() {
            const state = {
                //block:false,
                source: `a b^{cd} efghijklmnopqrstuvwxyz`
            };
            const component = katexInlineComponent.createInstance(injector, { state: state });
            commander.insert(component);
            //selection.setPosition(slot, 0)
        }
    };
}
export function katexBlockToolConfigFactory(injector) {
    const commander = injector.get(Commander);
    const selection = injector.get(Selection);
    return {
        label: '块级数学公式',
        tooltip: '块级数学公式',
        onClick() {
            const state = {
                //block:false,
                source: `a b^{cd} efghijklmnopqrstuvwxyz`
            };
            const component = katexBlockComponent.createInstance(injector, { state: state });
            commander.insert(component);
            //selection.setPosition(slot, 0)
        }
    };
}
export const katexInlineTool = new ButtonTool(katexInlineToolConfigFactory);
export const katexBlockTool = new ButtonTool(katexBlockToolConfigFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2F0ZXgudG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RleHRidXMvY29tcG9uZW50cy9rYXRleC9rYXRleC50b29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWtCLE1BQU0saUJBQWlCLENBQUE7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBcUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQ3ZFLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBYSxNQUFNLG1CQUFtQixDQUFBO0FBRXZGLE1BQU0sVUFBVSw0QkFBNEIsQ0FBQyxRQUFRO0lBQ2pELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDekMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN6QyxPQUFPO1FBQ0gsS0FBSyxFQUFFLFFBQVE7UUFDZixPQUFPLEVBQUMsUUFBUTtRQUNoQixPQUFPO1lBQ0gsTUFBTSxLQUFLLEdBQVk7Z0JBQ25CLGNBQWM7Z0JBQ2QsTUFBTSxFQUFDLGlDQUFpQzthQUUzQyxDQUFBO1lBQ0QsTUFBTSxTQUFTLEdBQUcsb0JBQW9CLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFBO1lBQzlFLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDM0IsZ0NBQWdDO1FBQ3BDLENBQUM7S0FDSixDQUFBO0FBQ0wsQ0FBQztBQUNELE1BQU0sVUFBVSwyQkFBMkIsQ0FBQyxRQUFRO0lBQ2hELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDekMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN6QyxPQUFPO1FBQ0gsS0FBSyxFQUFFLFFBQVE7UUFDZixPQUFPLEVBQUMsUUFBUTtRQUNoQixPQUFPO1lBQ0gsTUFBTSxLQUFLLEdBQVk7Z0JBQ25CLGNBQWM7Z0JBQ2QsTUFBTSxFQUFDLGlDQUFpQzthQUUzQyxDQUFBO1lBQ0QsTUFBTSxTQUFTLEdBQUcsbUJBQW1CLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFBO1lBQzdFLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDM0IsZ0NBQWdDO1FBQ3BDLENBQUM7S0FDSixDQUFBO0FBQ0wsQ0FBQztBQUNELE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBYSxJQUFJLFVBQVUsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3JGLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBYSxJQUFJLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnV0dG9uVG9vbCxCdXR0b25Ub29sQ29uZmlnfSBmcm9tICdAdGV4dGJ1cy9lZGl0b3InXHJcbmltcG9ydCB7IENvbW1hbmRlciwgQ29udGVudFR5cGUsIFNsb3QsIFNlbGVjdGlvbiB9IGZyb20gJ0B0ZXh0YnVzL2NvcmUnXHJcbmltcG9ydCB7a2F0ZXhCbG9ja0NvbXBvbmVudCwga2F0ZXhJbmxpbmVDb21wb25lbnQsIGthdGV4U3RhdGV9IGZyb20gJy4va2F0ZXguY29tcG9uZW50J1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGthdGV4SW5saW5lVG9vbENvbmZpZ0ZhY3RvcnkoaW5qZWN0b3IpOkJ1dHRvblRvb2xDb25maWcge1xyXG4gICAgY29uc3QgY29tbWFuZGVyID0gaW5qZWN0b3IuZ2V0KENvbW1hbmRlcilcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IGluamVjdG9yLmdldChTZWxlY3Rpb24pXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxhYmVsOiAn6KGM5YaF5pWw5a2m5YWs5byPJyxcclxuICAgICAgICB0b29sdGlwOifooYzlhoXmlbDlrablhazlvI8nLFxyXG4gICAgICAgIG9uQ2xpY2soKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlOmthdGV4U3RhdGU9e1xyXG4gICAgICAgICAgICAgICAgLy9ibG9jazpmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNvdXJjZTpgYSBiXntjZH0gZWZnaGlqa2xtbm9wcXJzdHV2d3h5emBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGthdGV4SW5saW5lQ29tcG9uZW50LmNyZWF0ZUluc3RhbmNlKGluamVjdG9yLCB7c3RhdGU6c3RhdGV9KVxyXG4gICAgICAgICAgICBjb21tYW5kZXIuaW5zZXJ0KGNvbXBvbmVudClcclxuICAgICAgICAgICAgLy9zZWxlY3Rpb24uc2V0UG9zaXRpb24oc2xvdCwgMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGthdGV4QmxvY2tUb29sQ29uZmlnRmFjdG9yeShpbmplY3Rvcik6QnV0dG9uVG9vbENvbmZpZyB7XHJcbiAgICBjb25zdCBjb21tYW5kZXIgPSBpbmplY3Rvci5nZXQoQ29tbWFuZGVyKVxyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gaW5qZWN0b3IuZ2V0KFNlbGVjdGlvbilcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGFiZWw6ICflnZfnuqfmlbDlrablhazlvI8nLFxyXG4gICAgICAgIHRvb2x0aXA6J+Wdl+e6p+aVsOWtpuWFrOW8jycsXHJcbiAgICAgICAgb25DbGljaygpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RhdGU6a2F0ZXhTdGF0ZT17XHJcbiAgICAgICAgICAgICAgICAvL2Jsb2NrOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc291cmNlOmBhIGJee2NkfSBlZmdoaWprbG1ub3BxcnN0dXZ3eHl6YFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0ga2F0ZXhCbG9ja0NvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShpbmplY3Rvciwge3N0YXRlOnN0YXRlfSlcclxuICAgICAgICAgICAgY29tbWFuZGVyLmluc2VydChjb21wb25lbnQpXHJcbiAgICAgICAgICAgIC8vc2VsZWN0aW9uLnNldFBvc2l0aW9uKHNsb3QsIDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBrYXRleElubGluZVRvb2w6QnV0dG9uVG9vbD0gbmV3IEJ1dHRvblRvb2woa2F0ZXhJbmxpbmVUb29sQ29uZmlnRmFjdG9yeSlcclxuZXhwb3J0IGNvbnN0IGthdGV4QmxvY2tUb29sOkJ1dHRvblRvb2w9IG5ldyBCdXR0b25Ub29sKGthdGV4QmxvY2tUb29sQ29uZmlnRmFjdG9yeSlcclxuXHJcbiJdfQ==