import { QueryStateType } from "@textbus/core";
import { DropdownTool } from "@textbus/editor";
import { createElement } from "@textbus/browser";
import { Tab } from "../utils/tab";
import { alertComponentCreator } from "./alert/alert.component";
import { Observable, Subject } from "rxjs";
const CREATORS = [
    alertComponentCreator
];
class ComponentExample {
    constructor(injector) {
        Object.defineProperty(this, "elementRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "injector", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onCancel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "checkEvent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onComplete", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.injector = injector;
        this.onCancel = new Observable();
        this.checkEvent = new Subject();
        this.onComplete = this.checkEvent.asObservable();
        this.elementRef = createElement('div', {
            classes: ['textbus-component-stage'],
            children: []
        });
        const tab = new Tab({});
        const categories = this.classify(CREATORS || []);
        tab.show(categories.map(item => {
            console.log(item);
            const view = createElement('div', {
                classes: ['textbus-component-stage-list']
            });
            item.libs.forEach(i => view.appendChild(this.addExample(i)));
            return {
                label: item.categoryName,
                view
            };
        }));
        this.elementRef.appendChild(tab.elementRef);
    }
    classify(libs) {
        const categories = new Map();
        libs.forEach(item => {
            const category = item.category === 'undefined' ? '组件库' : item.category;
            const categoryName = category || "组件库";
            if (!categories.has(categoryName)) {
                categories.set(categoryName, []);
            }
            const list = categories.get(categoryName);
            list.push(item);
        });
        return Array.from(categories).map(value => {
            return {
                categoryName: value[0],
                libs: value[1]
            };
        });
    }
    addExample(example) {
        const name = example.name === 'undefined' ? '组件' : example.name;
        const { wrapper, card } = ComponentExample.createViewer(example.example, name);
        wrapper.addEventListener('click', () => {
            /*
            if (this.editorController.readonly ) {
                return;
            }*/
            const t = example.create(this.injector);
        });
        return wrapper;
    }
    static createViewer(content, name) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('textbus-component-example-item');
        const card = document.createElement('div');
        card.classList.add('textbus-component-example');
        const exampleContent = document.createElement('div');
        exampleContent.classList.add('textbus-component-example-content');
        if (typeof content === 'string') {
            exampleContent.innerHTML = content;
        }
        else if (content instanceof HTMLElement) {
            exampleContent.appendChild(content);
        }
        card.appendChild(exampleContent);
        const mask = document.createElement('div');
        mask.classList.add('textbus-component-example-mask');
        card.appendChild(mask);
        wrapper.appendChild(card);
        const nameWrapper = document.createElement('div');
        nameWrapper.classList.add('textbus-component-example-name');
        nameWrapper.innerText = name || '';
        wrapper.appendChild(nameWrapper);
        return {
            wrapper,
            card
        };
    }
    update() {
        //
    }
    reset() {
        //
    }
}
export function libraryToolConfigFactory(injector) {
    //const commander = injector.get(Commander);
    //iconClasses: ['textbus-icon-emoji'],
    return {
        label: '组件库',
        iconClasses: ['textbus-icon-components'],
        tooltip: '组件库',
        viewController: new ComponentExample(injector),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlicmFyeS5kcm9wZG93bi50b29sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGV4dGJ1cy9jb21wb25lbnRzL2xpYnJhcnkuZHJvcGRvd24udG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXlCLGNBQWMsRUFBa0IsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFDLFlBQVksRUFBcUIsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUVqQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUl4QyxNQUFNLFFBQVEsR0FBb0I7SUFDOUIscUJBQXFCO0NBQ3hCLENBQUM7QUFDRixNQUFNLGdCQUFnQjtJQU1sQixZQUFZLFFBQVE7UUFMcEI7Ozs7O1dBQXdCO1FBQ3hCOzs7OztXQUFzQjtRQUN0Qjs7Ozs7V0FBYztRQUNkOzs7OztXQUFnQjtRQUNoQjs7Ozs7V0FBZ0I7UUFFWixJQUFJLENBQUMsUUFBUSxHQUFDLFFBQVEsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxLQUFLLEVBQUU7WUFDbkMsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7WUFDcEMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDLENBQUM7UUFDSCxNQUFNLEdBQUcsR0FBRyxJ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QU0sVUFBVSx3QkFBd0IsQ0FBQyxRQUFRO0lBQzdDLDRDQUE0QztJQUM1QyxzQ0FBc0M7SUFDdEMsT0FBTztRQUNILEtBQUssRUFBQyxLQUFLO1FBQ1gsV0FBVyxFQUFDLENBQUMseUJBQXlCLENBQUM7UUFDdkMsT0FBTyxFQUFFLEtBQUs7UUFDZCxjQUFjLEVBQUUsSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7UUFDOUMsVUFBVTtZQUNOLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLGNBQWMsQ0FBQyxNQUFNO2dCQUM1QixLQUFLLEVBQUUsSUFBSTthQUNkLENBQUM7UUFDTixDQUFDO1FBQ0QsUUFBUSxDQUFDLEtBQUs7WUFDViwwQkFBMEI7UUFDOUIsQ0FBQztLQUNKLENBQUM7QUFFTixDQUFDO0FBQ0QsTUFBTSxVQUFVLG1CQUFtQjtJQUMvQixPQUFPLElBQUksWUFBWSxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDdEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tbWFuZGVyLCBDb250ZW50VHlwZSwgUXVlcnlTdGF0ZVR5cGUsIFNsb3QsIFNlbGVjdGlvbn0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuaW1wb3J0IHtEcm9wZG93blRvb2wsIERyb3Bkb3duVG9vbENvbmZpZ30gZnJvbSBcIkB0ZXh0YnVzL2VkaXRvclwiO1xyXG5pbXBvcnQge2NyZWF0ZUVsZW1lbnR9IGZyb20gXCJAdGV4dGJ1cy9icm93c2VyXCI7XHJcbmltcG9ydCB7VGFifSBmcm9tIFwiLi4vdXRpbHMvdGFiXCI7XHJcbmltcG9ydCB7Q29tcG9uZW50Q3JlYXRvcn0gZnJvbSBcIi4vdHlwZVwiO1xyXG5pbXBvcnQge2FsZXJ0Q29tcG9uZW50Q3JlYXRvcn0gZnJvbSBcIi4vYWxlcnQvYWxlcnQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZSxTdWJqZWN0fSBmcm9tIFwicnhqc1wiO1xyXG5cclxuXHJcblxyXG5jb25zdCBDUkVBVE9SUzpDb21wb25lbnRDcmVhdG9yW109W1xyXG4gICAgYWxlcnRDb21wb25lbnRDcmVhdG9yXHJcbl07XHJcbmNsYXNzIENvbXBvbmVudEV4YW1wbGV7XHJcbiAgICBlbGVtZW50UmVmOiBIVE1MRWxlbWVudDtcclxuICAgIHByaXZhdGUgaW5qZWN0b3I6IGFueTtcclxuICAgIG9uQ2FuY2VsOiBhbnk7XHJcbiAgICBjaGVja0V2ZW50OiBhbnk7XHJcbiAgICBvbkNvbXBsZXRlOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihpbmplY3Rvcikge1xyXG4gICAgICAgIHRoaXMuaW5qZWN0b3I9aW5qZWN0b3I7XHJcbiAgICAgICAgdGhpcy5vbkNhbmNlbCA9IG5ldyBPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5jaGVja0V2ZW50ID0gbmV3IFN1YmplY3QoKTtcclxuICAgICAgICB0aGlzLm9uQ29tcGxldGUgPSB0aGlzLmNoZWNrRXZlbnQuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtY29tcG9uZW50LXN0YWdlJ10sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHRhYiA9IG5ldyBUYWIoe30pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGNhdGVnb3JpZXMgPSB0aGlzLmNsYXNzaWZ5KENSRUFUT1JTIHx8IFtdKTtcclxuICAgICAgICB0YWIuc2hvdyhjYXRlZ29yaWVzLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbSlcclxuICAgICAgICAgICAgY29uc3QgdmlldyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1jb21wb25lbnQtc3RhZ2UtbGlzdCddXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpdGVtLmxpYnMuZm9yRWFjaChpID0+IHZpZXcuYXBwZW5kQ2hpbGQodGhpcy5hZGRFeGFtcGxlKGkpKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogaXRlbS5jYXRlZ29yeU5hbWUsXHJcbiAgICAgICAgICAgICAgICB2aWV3XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5hcHBlbmRDaGlsZCh0YWIuZWxlbWVudFJlZik7XHJcbiAgICB9XHJcbiAgICBjbGFzc2lmeShsaWJzKSB7XHJcbiAgICAgICAgY29uc3QgY2F0ZWdvcmllcyA9IG5ldyBNYXAoKTtcclxuICAgICAgICBsaWJzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gaXRlbS5jYXRlZ29yeSA9PT0gJ3VuZGVmaW5lZCcgPyAn57uE5Lu25bqTJyA6IGl0ZW0uY2F0ZWdvcnk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5TmFtZSA9IGNhdGVnb3J5IHx8IFwi57uE5Lu25bqTXCI7XHJcbiAgICAgICAgICAgIGlmICghY2F0ZWdvcmllcy5oYXMoY2F0ZWdvcnlOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmllcy5zZXQoY2F0ZWdvcnlOYW1lLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbGlzdCA9IGNhdGVnb3JpZXMuZ2V0KGNhdGVnb3J5TmFtZSk7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShjYXRlZ29yaWVzKS5tYXAodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlOYW1lOiB2YWx1ZVswXSxcclxuICAgICAgICAgICAgICAgIGxpYnM6IHZhbHVlWzFdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhZGRFeGFtcGxlKGV4YW1wbGUpIHtcclxuICAgICAgICBjb25zdCBuYW1lID0gZXhhbXBsZS5uYW1lID09PSAndW5kZWZpbmVkJyA/ICfnu4Tku7YnOiBleGFtcGxlLm5hbWU7XHJcbiAgICAgICAgY29uc3QgeyB3cmFwcGVyLCBjYXJkIH0gPSBDb21wb25lbnRFeGFtcGxlLmNyZWF0ZVZpZXdlcihleGFtcGxlLmV4YW1wbGUsIG5hbWUpO1xyXG4gICAgICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVkaXRvckNvbnRyb2xsZXIucmVhZG9ubHkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICBjb25zdCB0ID0gZXhhbXBsZS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XHJcblxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gd3JhcHBlcjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjcmVhdGVWaWV3ZXIoY29udGVudCwgbmFtZSkge1xyXG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3RleHRidXMtY29tcG9uZW50LWV4YW1wbGUtaXRlbScpO1xyXG4gICAgICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ3RleHRidXMtY29tcG9uZW50LWV4YW1wbGUnKTtcclxuICAgICAgICBjb25zdCBleGFtcGxlQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGV4YW1wbGVDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3RleHRidXMtY29tcG9uZW50LWV4YW1wbGUtY29udGVudCcpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgZXhhbXBsZUNvbnRlbnQuaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGV4YW1wbGVDb250ZW50LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXJkLmFwcGVuZENoaWxkKGV4YW1wbGVDb250ZW50KTtcclxuICAgICAgICBjb25zdCBtYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbWFzay5jbGFzc0xpc3QuYWRkKCd0ZXh0YnVzLWNvbXBvbmVudC1leGFtcGxlLW1hc2snKTtcclxuICAgICAgICBjYXJkLmFwcGVuZENoaWxkKG1hc2spO1xyXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoY2FyZCk7XHJcbiAgICAgICAgY29uc3QgbmFtZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBuYW1lV3JhcHBlci5jbGFzc0xpc3QuYWRkKCd0ZXh0YnVzLWNvbXBvbmVudC1leGFtcGxlLW5hbWUnKTtcclxuICAgICAgICBuYW1lV3JhcHBlci5pbm5lclRleHQgPSBuYW1lIHx8ICcnO1xyXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQobmFtZVdyYXBwZXIpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdyYXBwZXIsXHJcbiAgICAgICAgICAgIGNhcmRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgLy9cclxuICAgIH1cclxuICAgIHJlc2V0KCkge1xyXG4gICAgICAgIC8vXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGxpYnJhcnlUb29sQ29uZmlnRmFjdG9yeShpbmplY3Rvcik6RHJvcGRvd25Ub29sQ29uZmlnIHtcclxuICAgIC8vY29uc3QgY29tbWFuZGVyID0gaW5qZWN0b3IuZ2V0KENvbW1hbmRlcik7XHJcbiAgICAvL2ljb25DbGFzc2VzOiBbJ3RleHRidXMtaWNvbi1lbW9qaSddLFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsYWJlbDon57uE5Lu25bqTJyxcclxuICAgICAgICBpY29uQ2xhc3NlczpbJ3RleHRidXMtaWNvbi1jb21wb25lbnRzJ10sXHJcbiAgICAgICAgdG9vbHRpcDogJ+e7hOS7tuW6kycsXHJcbiAgICAgICAgdmlld0NvbnRyb2xsZXI6IG5ldyBDb21wb25lbnRFeGFtcGxlKGluamVjdG9yKSxcclxuICAgICAgICBxdWVyeVN0YXRlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFF1ZXJ5U3RhdGVUeXBlLk5vcm1hbCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBudWxsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1c2VWYWx1ZSh2YWx1ZSkge1xyXG4gICAgICAgICAgICAvL2NvbW1hbmRlci5pbnNlcnQodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBsaWJyYXJ5RHJvcGRvd25Ub29sKCl7XHJcbiAgICByZXR1cm4gbmV3IERyb3Bkb3duVG9vbChsaWJyYXJ5VG9vbENvbmZpZ0ZhY3RvcnkpO1xyXG59Il19