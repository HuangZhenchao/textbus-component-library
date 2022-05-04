import { ButtonTool, headingComponent } from '@textbus/editor';
import { Commander, ContentType, Slot, Selection } from '@textbus/core';
import { jumbotronComponent, JumbotronSlot } from './jumbotron.component';
export function jumbotronToolConfigFactory(injector) {
    const commander = injector.get(Commander);
    const selection = injector.get(Selection);
    return {
        label: '巨幕',
        tooltip: '巨幕',
        onClick() {
            const state = {
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundImage: './',
                minHeight: '200px',
            };
            let slot = new JumbotronSlot();
            const headingSlot = new Slot([ContentType.Text,
                ContentType.InlineComponent]);
            headingSlot.write('hello world!');
            slot.write(headingComponent.createInstance(injector, { state: 'h1', slots: [headingSlot] }));
            const component = jumbotronComponent.createInstance(injector, { slots: [slot], state: state });
            commander.insert(component);
            selection.setPosition(headingSlot, headingSlot.length);
        }
    };
}
export function jumbotronTool() {
    return new ButtonTool(jumbotronToolConfigFactory);
}
export const jumbotronExample = `<img src="data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg width="100" height="70" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#6ad1ec"/><stop offset="100%" stop-color="#fff"/></linearGradient></defs><g><rect fill="url(#bg)" height="100%" width="100%"/></g><path fill="#fff" opacity="0.3" d="M81.25 28.125c0 5.178-4.197 9.375-9.375 9.375s-9.375-4.197-9.375-9.375 4.197-9.375 9.375-9.375 9.375 4.197 9.375 9.375z"></path><path fill="#fff" opacity="0.3"  d="M87.5 81.25h-75v-12.5l21.875-37.5 25 31.25h6.25l21.875-18.75z"></path><text font-family="Helvetica, Arial, sans-serif" font-size="12" x="10" y="25" stroke-width="0.3" stroke="#000" fill="#000000">Hello, world!</text><text font-family="Helvetica, Arial, sans-serif" font-size="6" x="10" y="40" stroke-width="0" stroke="#000" fill="#000000">我是 TextBus 富文本编辑器。</text><text font-family="Helvetica, Arial, sans-serif" font-size="6" x="10" y="50" stroke-width="0" stroke="#000" fill="#000000">别来无恙？</text></svg>')}">`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVtYm90cm9uLnRvb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXh0YnVzL2NvbXBvbmVudHMvanVtYm90cm9uL2p1bWJvdHJvbi50b29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQW1CLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDOUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUN2RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFrQixNQUFNLHVCQUF1QixDQUFBO0FBRXpGLE1BQU0sVUFBVSwwQkFBMEIsQ0FBQyxRQUFRO0lBQy9DLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDekMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN6QyxPQUFPO1FBQ0gsS0FBSyxFQUFFLElBQUk7UUFDWCxPQUFPLEVBQUMsSUFBSTtRQUNaLE9BQU87WUFDSCxNQUFNLEtBQUssR0FBZ0I7Z0JBQ3ZCLGtCQUFrQixFQUFFLGVBQWU7Z0JBQ25DLGNBQWMsRUFBRSxPQUFPO2dCQUN2QixlQUFlLEVBQUUsSUFBSTtnQkFDckIsU0FBUyxFQUFFLE9BQU87YUFFckIsQ0FBQTtZQUNELElBQUksSUFBSSxHQUFDLElBQUksYUFBYSxFQUFFLENBQUE7WUFDNUIsTUFBTSxXQUFXLEdBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSTtnQkFDeEMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDbEMsV0FBVyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3RGLE1BQU0sU0FBUyxHQUFHLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsRUFBQyxLQUFLLEVBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQTtZQUN6RixTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQzNCLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMxRCxDQUFDO0tBQ0osQ0FBQTtBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsYUFBYTtJQUN6QixPQUFPLElBQUksVUFBVSxDQUFDLDBCQUEwQixDQUFDLENBQUE7QUFDckQsQ0FBQztBQUNELE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFDLDhDQUE4QyxrQkFBa0IsQ0FBQyw2Z0NBQTZnQyxDQUFDLElBQUksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1dHRvblRvb2wsQnV0dG9uVG9vbENvbmZpZywgaGVhZGluZ0NvbXBvbmVudH0gZnJvbSAnQHRleHRidXMvZWRpdG9yJ1xyXG5pbXBvcnQgeyBDb21tYW5kZXIsIENvbnRlbnRUeXBlLCBTbG90LCBTZWxlY3Rpb24gfSBmcm9tICdAdGV4dGJ1cy9jb3JlJ1xyXG5pbXBvcnQgeyBqdW1ib3Ryb25Db21wb25lbnQsIEp1bWJvdHJvblNsb3QsIGp1bWJvdHJvblN0YXRlIH0gZnJvbSAnLi9qdW1ib3Ryb24uY29tcG9uZW50J1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGp1bWJvdHJvblRvb2xDb25maWdGYWN0b3J5KGluamVjdG9yKTpCdXR0b25Ub29sQ29uZmlnIHtcclxuICAgIGNvbnN0IGNvbW1hbmRlciA9IGluamVjdG9yLmdldChDb21tYW5kZXIpXHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBpbmplY3Rvci5nZXQoU2VsZWN0aW9uKVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsYWJlbDogJ+W3qOW5lScsXHJcbiAgICAgICAgdG9vbHRpcDon5beo5bmVJyxcclxuICAgICAgICBvbkNsaWNrKCkge1xyXG4gICAgICAgICAgICBjb25zdCBzdGF0ZTpqdW1ib3Ryb25TdGF0ZT17XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246ICdjZW50ZXIgY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAnLi8nLFxyXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0OiAnMjAwcHgnLFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHNsb3Q9bmV3IEp1bWJvdHJvblNsb3QoKVxyXG4gICAgICAgICAgICBjb25zdCBoZWFkaW5nU2xvdD1uZXcgU2xvdChbQ29udGVudFR5cGUuVGV4dCxcclxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlLklubGluZUNvbXBvbmVudF0pO1xyXG4gICAgICAgICAgICBoZWFkaW5nU2xvdC53cml0ZSgnaGVsbG8gd29ybGQhJyk7XHJcbiAgICAgICAgICAgIHNsb3Qud3JpdGUoaGVhZGluZ0NvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShpbmplY3Rvcix7c3RhdGU6J2gxJyxzbG90czpbaGVhZGluZ1Nsb3RdfSkpXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGp1bWJvdHJvbkNvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShpbmplY3Rvciwge3Nsb3RzOltzbG90XSxzdGF0ZTpzdGF0ZX0pXHJcbiAgICAgICAgICAgIGNvbW1hbmRlci5pbnNlcnQoY29tcG9uZW50KVxyXG4gICAgICAgICAgICBzZWxlY3Rpb24uc2V0UG9zaXRpb24oaGVhZGluZ1Nsb3QsIGhlYWRpbmdTbG90Lmxlbmd0aClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqdW1ib3Ryb25Ub29sKCl7XHJcbiAgICByZXR1cm4gbmV3IEJ1dHRvblRvb2woanVtYm90cm9uVG9vbENvbmZpZ0ZhY3RvcnkpXHJcbn1cclxuZXhwb3J0IGNvbnN0IGp1bWJvdHJvbkV4YW1wbGU9YDxpbWcgc3JjPVwiZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9VVRGLTgsJHtlbmNvZGVVUklDb21wb25lbnQoJzxzdmcgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCI3MFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9XCJiZ1wiIHgxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIwJVwiIHkyPVwiMTAwJVwiPjxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcC1jb2xvcj1cIiM2YWQxZWNcIi8+PHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3AtY29sb3I9XCIjZmZmXCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnPjxyZWN0IGZpbGw9XCJ1cmwoI2JnKVwiIGhlaWdodD1cIjEwMCVcIiB3aWR0aD1cIjEwMCVcIi8+PC9nPjxwYXRoIGZpbGw9XCIjZmZmXCIgb3BhY2l0eT1cIjAuM1wiIGQ9XCJNODEuMjUgMjguMTI1YzAgNS4xNzgtNC4xOTcgOS4zNzUtOS4zNzUgOS4zNzVzLTkuMzc1LTQuMTk3LTkuMzc1LTkuMzc1IDQuMTk3LTkuMzc1IDkuMzc1LTkuMzc1IDkuMzc1IDQuMTk3IDkuMzc1IDkuMzc1elwiPjwvcGF0aD48cGF0aCBmaWxsPVwiI2ZmZlwiIG9wYWNpdHk9XCIwLjNcIiAgZD1cIk04Ny41IDgxLjI1aC03NXYtMTIuNWwyMS44NzUtMzcuNSAyNSAzMS4yNWg2LjI1bDIxLjg3NS0xOC43NXpcIj48L3BhdGg+PHRleHQgZm9udC1mYW1pbHk9XCJIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmXCIgZm9udC1zaXplPVwiMTJcIiB4PVwiMTBcIiB5PVwiMjVcIiBzdHJva2Utd2lkdGg9XCIwLjNcIiBzdHJva2U9XCIjMDAwXCIgZmlsbD1cIiMwMDAwMDBcIj5IZWxsbywgd29ybGQhPC90ZXh0Pjx0ZXh0IGZvbnQtZmFtaWx5PVwiSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZlwiIGZvbnQtc2l6ZT1cIjZcIiB4PVwiMTBcIiB5PVwiNDBcIiBzdHJva2Utd2lkdGg9XCIwXCIgc3Ryb2tlPVwiIzAwMFwiIGZpbGw9XCIjMDAwMDAwXCI+5oiR5pivIFRleHRCdXMg5a+M5paH5pys57yW6L6R5Zmo44CCPC90ZXh0Pjx0ZXh0IGZvbnQtZmFtaWx5PVwiSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZlwiIGZvbnQtc2l6ZT1cIjZcIiB4PVwiMTBcIiB5PVwiNTBcIiBzdHJva2Utd2lkdGg9XCIwXCIgc3Ryb2tlPVwiIzAwMFwiIGZpbGw9XCIjMDAwMDAwXCI+5Yir5p2l5peg5oGZ77yfPC90ZXh0Pjwvc3ZnPicpfVwiPmA7Il19