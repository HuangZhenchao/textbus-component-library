import { ContentType, defineComponent, Slot, useContext, useSlots, useState, VElement } from "@textbus/core";
export const todoListComponent = defineComponent({
    name: "todoListComponent",
    type: ContentType.BlockComponent,
    setup(data) {
        const injector = useContext();
        const slots = useSlots(data.slots || [new Slot([
                ContentType.BlockComponent,
                ContentType.Text
            ])
        ]);
        const stateCollection = [{
                active: false,
                disabled: false
            }, {
                active: true,
                disabled: false
            }, {
                active: false,
                disabled: true
            }, {
                active: true,
                disabled: true
            }];
        let state = data.state;
        const changeController = useState(state);
        //useState({fill:false,type:'info',slot:slots.toJSON()})
        changeController.onChange.subscribe(newState => {
            state = newState;
            console.log('changeController', state);
        });
        return {
            render(isOutputMode, slotRender) {
                const getStateIndex = function (active, disabled) {
                    for (let i = 0; i < 4; i++) {
                        const item = stateCollection[i];
                        if (item.active === active && item.disabled === disabled) {
                            return i;
                        }
                    }
                    return -1;
                };
                let classes = ['tb-todo-list-state'];
                if (state.active) {
                    classes.push('tb-todo-list-state-active');
                }
                if (state.disabled) {
                    classes.push('tb-todo-list-state-disabled');
                }
                return (VElement.createElement("div", { class: 'tb-todo-list' },
                    VElement.createElement("div", { class: 'tb-todo-list-item' },
                        VElement.createElement("div", { class: 'tb-todo-list-btn' }, VElement.createElement("div", { class: classes.join(' '), onClick: () => {
                                //const selection=injector.get(TBSelection);
                                //let component = selection.commonAncestorComponent;
                                //state=
                                const i = (getStateIndex(state.active, state.disabled) + 1) % 4;
                                const newState = stateCollection[i];
                                changeController.update(draft => {
                                    draft.active = newState.active;
                                    draft.disabled = newState.disabled;
                                });
                                console.log(state);
                                //state.markAsDirtied();
                            } })),
                        slotRender(slots.get(0), () => {
                            return VElement.createElement("div", { class: 'tb-todo-list-content', placeholder: '\u5F85\u529E\u4E8B\u9879' });
                        }))));
            }
        };
    }
});
export const todoListComponentLoader = {
    component: todoListComponent,
    match(element) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-todo-list';
    },
    read(element, context, slotParser) {
        const check = element.querySelector('.tb-todo-list-state');
        const content = element.querySelector('.tb-todo-list-content');
        const slot = new Slot([ContentType.BlockComponent]);
        slotParser(slot, content);
        const state = {
            active: check.className.includes('tb-todo-list-state-active'),
            disabled: check.className.includes('tb-todo-list-state-disabled'),
        };
        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        return todoListComponent.createInstance(context, { state: state, slots: [slot] });
    },
    resources: {
        styles: [
            `
.tb-todo-list {
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
}
.tb-todo-list-item {
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  display: flex;
}
.tb-todo-list-btn {
  margin-right: 0.6em;
}
.tb-todo-list-state {
  display: inline-block;
  margin-top: 3px;
  width: 12px;
  height: 12px;
  border: 2px solid #1296db;
  background: #fff;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
}
.tb-todo-list-state:after {
  content: "";
  position: absolute;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  left: 3px;
  top: 1px;
  width: 4px;
  height: 6px;
  transform: rotateZ(45deg);
}
.tb-todo-list-state-active:after {
  border-color: #1296db;
}
.tb-todo-list-state-disabled {
  opacity: 0.5;
}
.tb-todo-list-content {
  flex: 1;
}
`
        ]
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9kb0xpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGV4dGJ1cy9jb21wb25lbnRzL3RvZG9MaXN0L3RvZG9MaXN0LmNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdILFdBQVcsRUFDWCxlQUFlLEVBQ2YsSUFBSSxFQUtKLFVBQVUsRUFDVixRQUFRLEVBQUUsUUFBUSxFQUNsQixRQUFRLEVBRVgsTUFBTSxlQUFlLENBQUM7QUFRdkIsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUMsZUFBZSxDQUFpQztJQUMzRSxJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLElBQUksRUFBRSxXQUFXLENBQUMsY0FBYztJQUVoQyxLQUFLLENBQUMsSUFBa0M7UUFDcEMsTUFBTSxRQUFRLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFDOUIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQztnQkFDdEMsV0FBVyxDQUFDLGNBQWM7Z0JBQzFCLFdBQVcsQ0FBQyxJQUFJO2FBQ25CLENBQUM7U0FDTCxDQUFDLENBQUE7UUFDRixNQUFNLGVBQWUsR0FBRyxDQUFDO2dCQUNyQixNQUFNLEVBQUUsS0FBSztnQkFDYixRQUFRLEVBQUUsS0FBSzthQUNsQixFQUFFO2dCQUNDLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFFBQVEsRUFBRSxLQUFLO2FBQ2xCLEVBQUU7Z0JBQ0MsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsUUFBUSxFQUFFLElBQUk7YUFDakIsRUFBRTtnQkFDQyxNQUFNLEVBQUUsSUFBSTtnQkFDWixRQUFRLEVBQUUsSUFBSTthQUNqQixDQUFDLENBQUM7UUFDSCxJQUFJLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBc0IsQ0FBQTtRQUNyQyxNQUFNLGdCQUFnQixHQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2Qyx3REFB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QUFPLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFnQixDQUFBO1FBQ3ZFLE1BQU0sT0FBTyxHQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQWdCLENBQUE7UUFDM0UsTUFBTSxJQUFJLEdBQUMsSUFBSSxJQUFJLENBQU0sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtRQUN0RCxVQUFVLENBQUMsSUFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXhCLE1BQU0sS0FBSyxHQUFlO1lBQ3RCLE1BQU0sRUFBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQztZQUM1RCxRQUFRLEVBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsNkJBQTZCLENBQUM7U0FDbkUsQ0FBQTtRQUVELHVFQUF1RTtRQUN2RSxPQUFPLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsTUFBTSxFQUFFO1lBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTZDWDtTQUNRO0tBQ0o7Q0FDSixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudEluc3RhbmNlLFxyXG4gICAgQ29tcG9uZW50TWV0aG9kcyxcclxuICAgIENvbnRlbnRUeXBlLFxyXG4gICAgZGVmaW5lQ29tcG9uZW50LFxyXG4gICAgU2xvdCxcclxuICAgIFNsb3RMaXRlcmFsLFxyXG4gICAgU2xvdFJlbmRlcixcclxuICAgIFNlbGVjdGlvbixcclxuICAgIFRyYW5zbGF0b3IsXHJcbiAgICB1c2VDb250ZXh0LFxyXG4gICAgdXNlU2xvdHMsIHVzZVN0YXRlLFxyXG4gICAgVkVsZW1lbnQsXHJcbiAgICBDb21wb25lbnREYXRhXHJcbn0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuaW1wb3J0IHtDb21wb25lbnRMb2FkZXIsIFNsb3RQYXJzZXJ9IGZyb20gXCJAdGV4dGJ1cy9icm93c2VyXCI7XHJcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gXCJAdGFuYm8vZGlcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgdG9kb0xpc3RTdGF0ZXtcclxuICAgIGFjdGl2ZTpib29sZWFuLFxyXG4gICAgZGlzYWJsZWQ6Ym9vbGVhbixcclxufVxyXG5leHBvcnQgY29uc3QgdG9kb0xpc3RDb21wb25lbnQ9ZGVmaW5lQ29tcG9uZW50PENvbXBvbmVudE1ldGhvZHMsdG9kb0xpc3RTdGF0ZT4oe1xyXG4gICAgbmFtZTogXCJ0b2RvTGlzdENvbXBvbmVudFwiLFxyXG4gICAgdHlwZTogQ29udGVudFR5cGUuQmxvY2tDb21wb25lbnQsXHJcblxyXG4gICAgc2V0dXAoZGF0YTogQ29tcG9uZW50RGF0YTx0b2RvTGlzdFN0YXRlPik6IENvbXBvbmVudE1ldGhvZHMge1xyXG4gICAgICAgIGNvbnN0IGluamVjdG9yID0gdXNlQ29udGV4dCgpO1xyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdXNlU2xvdHMoZGF0YS5zbG90cyB8fFtuZXcgU2xvdChbXHJcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZS5CbG9ja0NvbXBvbmVudCxcclxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlLlRleHRcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICBdKVxyXG4gICAgICAgIGNvbnN0IHN0YXRlQ29sbGVjdGlvbiA9IFt7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBhY3RpdmU6IHRydWUsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgfV07XHJcbiAgICAgICAgbGV0IHN0YXRlPWRhdGEuc3RhdGUgYXMgdG9kb0xpc3RTdGF0ZVxyXG4gICAgICAgIGNvbnN0IGNoYW5nZUNvbnRyb2xsZXI9dXNlU3RhdGUoc3RhdGUpO1xyXG4gICAgICAgIC8vdXNlU3RhdGUoe2ZpbGw6ZmFsc2UsdHlwZTonaW5mbycsc2xvdDpzbG90cy50b0pTT04oKX0pXHJcbiAgICAgICAgY2hhbmdlQ29udHJvbGxlci5vbkNoYW5nZS5zdWJzY3JpYmUobmV3U3RhdGU9PntcclxuICAgICAgICAgICAgc3RhdGU9bmV3U3RhdGU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VDb250cm9sbGVyJyxzdGF0ZSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlbmRlcihpc091dHB1dE1vZGU6Ym9vbGVhbiwgc2xvdFJlbmRlcjpTbG90UmVuZGVyKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdldFN0YXRlSW5kZXg9ZnVuY3Rpb24gKGFjdGl2ZSwgZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc3RhdGVDb2xsZWN0aW9uW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5hY3RpdmUgPT09IGFjdGl2ZSAmJiBpdGVtLmRpc2FibGVkID09PSBkaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGNsYXNzZXMgPSBbJ3RiLXRvZG8tbGlzdC1zdGF0ZSddO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgndGItdG9kby1saXN0LXN0YXRlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCd0Yi10b2RvLWxpc3Qtc3RhdGUtZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ndGItdG9kby1saXN0Jz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSd0Yi10b2RvLWxpc3QtaXRlbSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J3RiLXRvZG8tbGlzdC1idG4nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZFbGVtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogY2xhc3Nlcy5qb2luKCcgJyksIG9uQ2xpY2s6ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc3Qgc2VsZWN0aW9uPWluamVjdG9yLmdldChUQlNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IGNvbXBvbmVudCA9IHNlbGVjdGlvbi5jb21tb25BbmNlc3RvckNvbXBvbmVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zdGF0ZT1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaSA9IChnZXRTdGF0ZUluZGV4KHN0YXRlLmFjdGl2ZSwgc3RhdGUuZGlzYWJsZWQpICsgMSkgJSA0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IHN0YXRlQ29sbGVjdGlvbltpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUNvbnRyb2xsZXIudXBkYXRlKGRyYWZ0PT57ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWZ0LmFjdGl2ZT1uZXdTdGF0ZS5hY3RpdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZnQuZGlzYWJsZWQ9bmV3U3RhdGUuZGlzYWJsZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3N0YXRlLm1hcmtBc0RpcnRpZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xvdFJlbmRlcihzbG90cy5nZXQoMCkhLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzcz0ndGItdG9kby1saXN0LWNvbnRlbnQnIHBsYWNlaG9sZGVyPSflvoXlip7kuovpobknLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSlcclxuZXhwb3J0IGNvbnN0IHRvZG9MaXN0Q29tcG9uZW50TG9hZGVyOkNvbXBvbmVudExvYWRlcj17XHJcbiAgICBjb21wb25lbnQ6IHRvZG9MaXN0Q29tcG9uZW50LFxyXG5cclxuICAgIG1hdGNoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZGl2JyAmJiBlbGVtZW50LmNsYXNzTmFtZSA9PT0gJ3RiLXRvZG8tbGlzdCdcclxuICAgIH0sXHJcbiAgICByZWFkKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb250ZXh0OiBJbmplY3Rvciwgc2xvdFBhcnNlcjogU2xvdFBhcnNlcikgOkNvbXBvbmVudEluc3RhbmNle1xyXG4gICAgICAgIGNvbnN0IGNoZWNrPWVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRiLXRvZG8tbGlzdC1zdGF0ZScpIGFzIEhUTUxFbGVtZW50XHJcbiAgICAgICAgY29uc3QgY29udGVudD1lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50Yi10b2RvLWxpc3QtY29udGVudCcpIGFzIEhUTUxFbGVtZW50XHJcbiAgICAgICAgY29uc3Qgc2xvdD1uZXcgU2xvdDxhbnk+KFtDb250ZW50VHlwZS5CbG9ja0NvbXBvbmVudF0pXHJcbiAgICAgICAgc2xvdFBhcnNlcihzbG90LGNvbnRlbnQpXHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXRlOnRvZG9MaXN0U3RhdGU9e1xyXG4gICAgICAgICAgICBhY3RpdmU6Y2hlY2suY2xhc3NOYW1lLmluY2x1ZGVzKCd0Yi10b2RvLWxpc3Qtc3RhdGUtYWN0aXZlJyksXHJcbiAgICAgICAgICAgIGRpc2FibGVkOmNoZWNrLmNsYXNzTmFtZS5pbmNsdWRlcygndGItdG9kby1saXN0LXN0YXRlLWRpc2FibGVkJyksXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NvbnN0IGNvbXBvbmVudCA9IG5ldyBUb2RvTGlzdENvbXBvbmVudChsaXN0Q29uZmlnLm1hcChpID0+IGkuc2xvdCkpO1xyXG4gICAgICAgIHJldHVybiB0b2RvTGlzdENvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShjb250ZXh0LHtzdGF0ZTpzdGF0ZSxzbG90czpbc2xvdF19KTtcclxuICAgIH0sXHJcbiAgICByZXNvdXJjZXM6IHtcclxuICAgICAgICBzdHlsZXM6IFtcclxuICAgICAgICAgICAgYFxyXG4udGItdG9kby1saXN0IHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBtYXJnaW4tdG9wOiAxZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xyXG59XHJcbi50Yi10b2RvLWxpc3QtaXRlbSB7XHJcbiAgcGFkZGluZy10b3A6IDAuMmVtO1xyXG4gIHBhZGRpbmctYm90dG9tOiAwLjJlbTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcbi50Yi10b2RvLWxpc3QtYnRuIHtcclxuICBtYXJnaW4tcmlnaHQ6IDAuNmVtO1xyXG59XHJcbi50Yi10b2RvLWxpc3Qtc3RhdGUge1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBtYXJnaW4tdG9wOiAzcHg7XHJcbiAgd2lkdGg6IDEycHg7XHJcbiAgaGVpZ2h0OiAxMnB4O1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkICMxMjk2ZGI7XHJcbiAgYmFja2dyb3VuZDogI2ZmZjtcclxuICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG4udGItdG9kby1saXN0LXN0YXRlOmFmdGVyIHtcclxuICBjb250ZW50OiBcIlwiO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBib3JkZXItcmlnaHQ6IDJweCBzb2xpZCAjZmZmO1xyXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjZmZmO1xyXG4gIGxlZnQ6IDNweDtcclxuICB0b3A6IDFweDtcclxuICB3aWR0aDogNHB4O1xyXG4gIGhlaWdodDogNnB4O1xyXG4gIHRyYW5zZm9ybTogcm90YXRlWig0NWRlZyk7XHJcbn1cclxuLnRiLXRvZG8tbGlzdC1zdGF0ZS1hY3RpdmU6YWZ0ZXIge1xyXG4gIGJvcmRlci1jb2xvcjogIzEyOTZkYjtcclxufVxyXG4udGItdG9kby1saXN0LXN0YXRlLWRpc2FibGVkIHtcclxuICBvcGFjaXR5OiAwLjU7XHJcbn1cclxuLnRiLXRvZG8tbGlzdC1jb250ZW50IHtcclxuICBmbGV4OiAxO1xyXG59XHJcbmBcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG59Il19