import { ButtonTool } from '@textbus/editor';
import { Commander, Selection } from '@textbus/core';
import { wordExplainComponent, WordExplainDetailSlot, WordExplainSubtitleSlot, WordExplainTitleSlot } from './wordExplain.component';
export function wordExplainToolConfigFactory(injector) {
    const commander = injector.get(Commander);
    const selection = injector.get(Selection);
    return {
        label: '名词解释',
        tooltip: '名词解释',
        onClick() {
            let initSlots = [new WordExplainTitleSlot(), new WordExplainSubtitleSlot(), new WordExplainDetailSlot()];
            let initState = {
                width: '200px',
            };
            const component = wordExplainComponent.createInstance(injector, { slots: initSlots, state: initState });
            commander.insert(component);
            selection.setPosition(initSlots[0], 0);
        }
    };
}
export const wordExplainTool = new ButtonTool(wordExplainToolConfigFactory);
export const wordExplainExample = `<img alt="示例" src="data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg width="100" height="70" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><rect fill="#fff" height="100%" width="100%"/></g><defs><g id="item"><rect fill="#eee" height="18" width="90" rx="2" x="5" y="6"/><line x1="26" y1="9" x2="26" y2="20.5" stroke="#000" stroke-dasharray="0.8 0.8" stroke-width="0.1"></line><text font-family="Helvetica, Arial, sans-serif" font-size="6" x="10" y="14" stroke-width="0" stroke="#000" fill="#000000">名词</text><text font-family="Helvetica, Arial, sans-serif" font-size="5" x="12" y="20" stroke-width="0" stroke="#000" fill="#000000">说明</text><text font-family="Helvetica, Arial, sans-serif" font-size="6" x="30" y="14" stroke-width="0" stroke="#000" fill="#000000">详细解释...</text></g></defs><use xlink:href="#item"></use><use xlink:href="#item" transform="translate(0, 20)"></use><use xlink:href="#item" transform="translate(0, 40)"></use></svg>')}">`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZEV4cGxhaW4udG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RleHRidXMvY29tcG9uZW50cy93b3JkRXhwbGFpbi93b3JkRXhwbGFpbi50b29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWtCLE1BQU0saUJBQWlCLENBQUE7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBcUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQ3ZFLE9BQU8sRUFDSCxvQkFBb0IsRUFBRSxxQkFBcUIsRUFFM0MsdUJBQXVCLEVBQ3ZCLG9CQUFvQixFQUN2QixNQUFNLHlCQUF5QixDQUFBO0FBRWhDLE1BQU0sVUFBVSw0QkFBNEIsQ0FBQyxRQUFRO0lBQ2pELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDekMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN6QyxPQUFPO1FBQ0gsS0FBSyxFQUFFLE1BQU07UUFDYixPQUFPLEVBQUMsTUFBTTtRQUNkLE9BQU87WUFDSCxJQUFJLFNBQVMsR0FBQyxDQUFDLElBQUksb0JBQW9CLEVBQUUsRUFBQyxJQUFJLHVCQUF1QixFQUFFLEVBQUMsSUFBSSxxQkFBcUIsRUFBRSxDQUFDLENBQUE7WUFDcEcsSUFBSSxTQUFTLEdBQWtCO2dCQUMzQixLQUFLLEVBQUMsT0FBTzthQUNoQixDQUFBO1lBQ0QsTUFBTSxTQUFTLEdBQUcsb0JBQW9CLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxDQUFDLENBQUE7WUFDbEcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUMzQixTQUFTLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMxQyxDQUFDO0tBQ0osQ0FBQTtBQUNMLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQWEsSUFBSSxVQUFVLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtBQUVyRixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRSx1REFBdUQsa0JBQWtCLENBQUMsazVCQUFrNUIsQ0FBQyxJQUFJLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCdXR0b25Ub29sLEJ1dHRvblRvb2xDb25maWd9IGZyb20gJ0B0ZXh0YnVzL2VkaXRvcidcclxuaW1wb3J0IHsgQ29tbWFuZGVyLCBDb250ZW50VHlwZSwgU2xvdCwgU2VsZWN0aW9uIH0gZnJvbSAnQHRleHRidXMvY29yZSdcclxuaW1wb3J0IHtcclxuICAgIHdvcmRFeHBsYWluQ29tcG9uZW50LCBXb3JkRXhwbGFpbkRldGFpbFNsb3QsXHJcbiAgICB3b3JkRXhwbGFpblN0YXRlLFxyXG4gICAgV29yZEV4cGxhaW5TdWJ0aXRsZVNsb3QsXHJcbiAgICBXb3JkRXhwbGFpblRpdGxlU2xvdFxyXG59IGZyb20gJy4vd29yZEV4cGxhaW4uY29tcG9uZW50J1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdvcmRFeHBsYWluVG9vbENvbmZpZ0ZhY3RvcnkoaW5qZWN0b3IpOkJ1dHRvblRvb2xDb25maWcge1xyXG4gICAgY29uc3QgY29tbWFuZGVyID0gaW5qZWN0b3IuZ2V0KENvbW1hbmRlcilcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IGluamVjdG9yLmdldChTZWxlY3Rpb24pXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxhYmVsOiAn5ZCN6K+N6Kej6YeKJyxcclxuICAgICAgICB0b29sdGlwOiflkI3or43op6Pph4onLFxyXG4gICAgICAgIG9uQ2xpY2soKSB7XHJcbiAgICAgICAgICAgIGxldCBpbml0U2xvdHM9W25ldyBXb3JkRXhwbGFpblRpdGxlU2xvdCgpLG5ldyBXb3JkRXhwbGFpblN1YnRpdGxlU2xvdCgpLG5ldyBXb3JkRXhwbGFpbkRldGFpbFNsb3QoKV1cclxuICAgICAgICAgICAgbGV0IGluaXRTdGF0ZTp3b3JkRXhwbGFpblN0YXRlPXtcclxuICAgICAgICAgICAgICAgIHdpZHRoOicyMDBweCcsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gd29yZEV4cGxhaW5Db21wb25lbnQuY3JlYXRlSW5zdGFuY2UoaW5qZWN0b3IsIHtzbG90czppbml0U2xvdHMsc3RhdGU6aW5pdFN0YXRlfSlcclxuICAgICAgICAgICAgY29tbWFuZGVyLmluc2VydChjb21wb25lbnQpXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbi5zZXRQb3NpdGlvbihpbml0U2xvdHNbMF0sIDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgd29yZEV4cGxhaW5Ub29sOkJ1dHRvblRvb2w9IG5ldyBCdXR0b25Ub29sKHdvcmRFeHBsYWluVG9vbENvbmZpZ0ZhY3RvcnkpXHJcblxyXG5leHBvcnQgY29uc3Qgd29yZEV4cGxhaW5FeGFtcGxlPSBgPGltZyBhbHQ9XCLnpLrkvotcIiBzcmM9XCJkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD1VVEYtOCwke2VuY29kZVVSSUNvbXBvbmVudCgnPHN2ZyB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjcwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiPjxnPjxyZWN0IGZpbGw9XCIjZmZmXCIgaGVpZ2h0PVwiMTAwJVwiIHdpZHRoPVwiMTAwJVwiLz48L2c+PGRlZnM+PGcgaWQ9XCJpdGVtXCI+PHJlY3QgZmlsbD1cIiNlZWVcIiBoZWlnaHQ9XCIxOFwiIHdpZHRoPVwiOTBcIiByeD1cIjJcIiB4PVwiNVwiIHk9XCI2XCIvPjxsaW5lIHgxPVwiMjZcIiB5MT1cIjlcIiB4Mj1cIjI2XCIgeTI9XCIyMC41XCIgc3Ryb2tlPVwiIzAwMFwiIHN0cm9rZS1kYXNoYXJyYXk9XCIwLjggMC44XCIgc3Ryb2tlLXdpZHRoPVwiMC4xXCI+PC9saW5lPjx0ZXh0IGZvbnQtZmFtaWx5PVwiSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZlwiIGZvbnQtc2l6ZT1cIjZcIiB4PVwiMTBcIiB5PVwiMTRcIiBzdHJva2Utd2lkdGg9XCIwXCIgc3Ryb2tlPVwiIzAwMFwiIGZpbGw9XCIjMDAwMDAwXCI+5ZCN6K+NPC90ZXh0Pjx0ZXh0IGZvbnQtZmFtaWx5PVwiSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZlwiIGZvbnQtc2l6ZT1cIjVcIiB4PVwiMTJcIiB5PVwiMjBcIiBzdHJva2Utd2lkdGg9XCIwXCIgc3Ryb2tlPVwiIzAwMFwiIGZpbGw9XCIjMDAwMDAwXCI+6K+05piOPC90ZXh0Pjx0ZXh0IGZvbnQtZmFtaWx5PVwiSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZlwiIGZvbnQtc2l6ZT1cIjZcIiB4PVwiMzBcIiB5PVwiMTRcIiBzdHJva2Utd2lkdGg9XCIwXCIgc3Ryb2tlPVwiIzAwMFwiIGZpbGw9XCIjMDAwMDAwXCI+6K+m57uG6Kej6YeKLi4uPC90ZXh0PjwvZz48L2RlZnM+PHVzZSB4bGluazpocmVmPVwiI2l0ZW1cIj48L3VzZT48dXNlIHhsaW5rOmhyZWY9XCIjaXRlbVwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLCAyMClcIj48L3VzZT48dXNlIHhsaW5rOmhyZWY9XCIjaXRlbVwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLCA0MClcIj48L3VzZT48L3N2Zz4nKX1cIj5gO1xyXG4gICJdfQ==