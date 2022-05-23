import { ContentType, defineComponent, Slot, useSlots, useState, VElement } from "@textbus/core";
export class TimelineItemSlot extends Slot {
    constructor(type) {
        super([ContentType.BlockComponent, ContentType.Text], {
            type: type
        });
        this.write('时间线');
    }
}
const timelineTypes = ['primary', 'info', 'success', 'warning', 'danger', 'dark', 'gray'];
const colors = ['#1296db', '#6ad1ec', '#15bd9a', '#ff9900', '#E74F5E', '#495060', '#bbbec4'];
export const timelineComponent = defineComponent({
    name: "timelineComponent",
    type: ContentType.BlockComponent,
    setup(data) {
        const slots = useSlots(data.slots || [new TimelineItemSlot('primary')]);
        //slots.get(0).state.type=''
        let state = {};
        const changeController = useState(state);
        //useState({fill:false,type:'info',slot:slots.toJSON()})
        changeController.onChange.subscribe(newState => {
            state = newState;
            console.log('changeController', state);
        });
        return {
            render(isOutputMode, slotRender) {
                let items = slots.toArray().map((item, index) => {
                    const classes = ['tb-timeline-item'];
                    if (item.state.type) {
                        classes.push('tb-timeline-item-' + item.state.type);
                    }
                    return VElement.createElement('div', {
                        class: classes.join(' ')
                    }, [
                        VElement.createElement("div", { class: "tb-timeline-line" }),
                        VElement.createElement("div", { class: "tb-timeline-icon", title: isOutputMode ? null : '点击切换颜色', onClick: () => {
                                const slot = slots.get(index);
                                console.log('slot', item);
                                let currentType = item.state.type || '';
                                if (!currentType) {
                                    currentType = timelineTypes[0];
                                }
                                else {
                                    currentType = timelineTypes[timelineTypes.indexOf(currentType) + 1] || '';
                                }
                                slot === null || slot === void 0 ? void 0 : slot.updateState(draft => {
                                    draft.type = currentType;
                                });
                                changeController.update(draft => { });
                            } }),
                        !isOutputMode && VElement.createElement("span", { class: "tb-timeline-add", onClick: () => {
                                console.log('tb-timeline-add', index + 1);
                                slots.insertByIndex(new TimelineItemSlot('primary'), index + 1);
                            } }),
                        slotRender(item, () => {
                            return VElement.createElement("div", { class: 'tb-todo-list-content' });
                        })
                    ]);
                });
                console.log('el', items);
                return VElement.createElement('div', {
                    class: 'tb-timeline'
                }, items);
            },
        };
    }
});
export const timelineComponentLoader = {
    component: timelineComponent,
    match(element) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-timeline';
    },
    read(element, context, slotParser) {
        //const check=element.querySelector('.tb-todo-list-state') as HTMLElement
        const content = element.querySelector('.tb-timeline-content');
        const slot = new TimelineItemSlot('primary');
        slotParser(slot, content);
        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        return timelineComponent.createInstance(context, { slots: [slot] });
    },
    resources: {
        styles: [
            `
.tb-timeline {
  display: block;
  padding-top: 1em;
  padding-left: 5px;
}
.tb-timeline-item {
  display: block;
  position: relative;
  padding-left: 1.5em;
  padding-bottom: 0.5em;
  opacity: .76;
}

.tb-timeline-item:first-of-type > .tb-timeline-line{
  top: 1em;
}

.tb-timeline-item:last-of-type > .tb-timeline-line{
  bottom: calc(100% - 1em);
}

.tb-timeline-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  border-left: 1px solid #dddee1;
}

.tb-timeline-icon {
  box-sizing: border-box;
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  left: -4px;
  top: .5em;
  background-color: #fff;
  border: 1px solid #bbbec4;
}

` + colors.map((value, index) => {
                return `
  .tb-timeline-item-${timelineTypes[index]} {
    opacity: 1;
  }
  .tb-timeline-item-${timelineTypes[index]} >.tb-timeline-icon {
    border-color: ${value};
    background-color: ${value};
  }
  .tb-timeline-item-${timelineTypes[index]} >.tb-timeline-line {
    border-color: ${value};
  }
  `;
            }).join('\n')
        ],
        editModeStyles: [
            `
.tb-timeline-icon:hover {
  transform: scale(1.2);
  cursor: pointer;
}
.tb-timeline-add {
  display: none;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}
.tb-timeline-add:before {
  content: "+";
}
.tb-timeline-add:hover {
  transform: scale(1.2);
}

.tb-timeline-item:hover .tb-timeline-add {
  display: block;
}
.tb-timeline-content {
  overflow: hidden;
}
`
        ]
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGV4dGJ1cy9jb21wb25lbnRzL3RpbWVsaW5lL3RpbWVsaW5lLmNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlILFdBQVcsRUFDWCxlQUFlLEVBQ2YsSUFBSSxFQUlKLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBVXZCLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxJQUFJO0lBQ3RDLFlBQVksSUFBSTtRQUNaLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFDO1lBQ2hELElBQUksRUFBQyxJQUFJO1NBQ1osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNyQixDQUFDO0NBQ0o7QUFFRCxNQUFNLGFBQWEsR0FBRyxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzFGLE1BQU0sTUFBTSxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFFN0YsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUMsZUFBZSxDQUFpQztJQUMzRSxJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLElBQUksRUFBRSxXQUFXLENBQUMsY0FBYztJQUVoQyxLQUFLLENBQUMsSUFBb0Q7UUFFdEQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBRSxJQUFJLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN4RSw0QkFBNEI7UUFDNUIsSUFBSSxL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QUFLOztzQkFFUCxhQUFhLENBQUMsS0FBSyxDQUFDO29CQUN0QixLQUFLOztHQUV0QixDQUFDO1lBQ1EsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNoQjtRQUNELGNBQWMsRUFBRTtZQUNaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0EyQlg7U0FDUTtLQUNKO0NBQ0osQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnREYXRhLFxyXG4gICAgQ29tcG9uZW50SW5zdGFuY2UsXHJcbiAgICBDb21wb25lbnRNZXRob2RzLFxyXG4gICAgQ29udGVudFR5cGUsXHJcbiAgICBkZWZpbmVDb21wb25lbnQsXHJcbiAgICBTbG90LFxyXG4gICAgU2xvdFJlbmRlcixcclxuICAgIFRyYW5zbGF0b3IsXHJcbiAgICB1c2VDb250ZXh0LFxyXG4gICAgdXNlU2xvdHMsXHJcbiAgICB1c2VTdGF0ZSxcclxuICAgIFZFbGVtZW50XHJcbn0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuaW1wb3J0IHtDb21wb25lbnRMb2FkZXIsIFNsb3RQYXJzZXJ9IGZyb20gXCJAdGV4dGJ1cy9icm93c2VyXCI7XHJcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gXCJAdGFuYm8vZGlcIjtcclxuaW1wb3J0IHtTbG90TGl0ZXJhbH0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgdGltZWxpbmVTdGF0ZXtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIHRpbWVsaW5lU2xvdFN0YXRle1xyXG4gICAgdHlwZTpzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lSXRlbVNsb3QgZXh0ZW5kcyBTbG90e1xyXG4gICAgY29uc3RydWN0b3IodHlwZSkge1xyXG4gICAgICAgIHN1cGVyKFtDb250ZW50VHlwZS5CbG9ja0NvbXBvbmVudCxDb250ZW50VHlwZS5UZXh0XSx7XHJcbiAgICAgICAgICAgIHR5cGU6dHlwZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMud3JpdGUoJ+aXtumXtOe6vycpXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHRpbWVsaW5lVHlwZXMgPSBbJ3ByaW1hcnknLCAnaW5mbycsICdzdWNjZXNzJywgJ3dhcm5pbmcnLCAnZGFuZ2VyJywgJ2RhcmsnLCAnZ3JheSddO1xyXG5jb25zdCBjb2xvcnMgPSBbJyMxMjk2ZGInLCAnIzZhZDFlYycsICcjMTViZDlhJywgJyNmZjk5MDAnLCAnI0U3NEY1RScsICcjNDk1MDYwJywgJyNiYmJlYzQnXTtcclxuXHJcbmV4cG9ydCBjb25zdCB0aW1lbGluZUNvbXBvbmVudD1kZWZpbmVDb21wb25lbnQ8Q29tcG9uZW50TWV0aG9kcyx0aW1lbGluZVN0YXRlPih7XHJcbiAgICBuYW1lOiBcInRpbWVsaW5lQ29tcG9uZW50XCIsXHJcbiAgICB0eXBlOiBDb250ZW50VHlwZS5CbG9ja0NvbXBvbmVudCxcclxuXHJcbiAgICBzZXR1cChkYXRhOiBDb21wb25lbnREYXRhPHRpbWVsaW5lU3RhdGUsdGltZWxpbmVTbG90U3RhdGU+KTogQ29tcG9uZW50TWV0aG9kcyB7XHJcblxyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdXNlU2xvdHMoZGF0YS5zbG90cyB8fCBbIG5ldyBUaW1lbGluZUl0ZW1TbG90KCdwcmltYXJ5JyldKVxyXG4gICAgICAgIC8vc2xvdHMuZ2V0KDApLnN0YXRlLnR5cGU9JydcclxuICAgICAgICBsZXQgc3RhdGU9e31cclxuICAgICAgICBjb25zdCBjaGFuZ2VDb250cm9sbGVyPXVzZVN0YXRlKHN0YXRlKTtcclxuICAgICAgICAvL3VzZVN0YXRlKHtmaWxsOmZhbHNlLHR5cGU6J2luZm8nLHNsb3Q6c2xvdHMudG9KU09OKCl9KVxyXG4gICAgICAgIGNoYW5nZUNvbnRyb2xsZXIub25DaGFuZ2Uuc3Vic2NyaWJlKG5ld1N0YXRlPT57XHJcbiAgICAgICAgICAgIHN0YXRlPW5ld1N0YXRlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlQ29udHJvbGxlcicsc3RhdGUpXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZW5kZXIoaXNPdXRwdXRNb2RlOmJvb2xlYW4sIHNsb3RSZW5kZXI6U2xvdFJlbmRlcil7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXM9c2xvdHMudG9BcnJheSgpLm1hcCgoaXRlbSAsaW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IFsndGItdGltZWxpbmUtaXRlbSddO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnN0YXRlLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCd0Yi10aW1lbGluZS1pdGVtLScgKyBpdGVtLnN0YXRlLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVkVsZW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOmNsYXNzZXMuam9pbignICcpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZFbGVtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJ0Yi10aW1lbGluZS1saW5lXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZFbGVtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJ0Yi10aW1lbGluZS1pY29uXCIsIHRpdGxlOiBpc091dHB1dE1vZGUgPyBudWxsIDogJ+eCueWHu+WIh+aNouminOiJsicsIG9uQ2xpY2s6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsb3Q9c2xvdHMuZ2V0KGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Nsb3QnLGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRUeXBlID0gaXRlbS5zdGF0ZS50eXBlfHwnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VHlwZSA9IHRpbWVsaW5lVHlwZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VHlwZSA9IHRpbWVsaW5lVHlwZXNbdGltZWxpbmVUeXBlcy5pbmRleE9mKGN1cnJlbnRUeXBlKSArIDFdIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdD8udXBkYXRlU3RhdGUoZHJhZnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWZ0LnR5cGU9Y3VycmVudFR5cGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlQ29udHJvbGxlci51cGRhdGUoZHJhZnQgPT4ge30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFpc091dHB1dE1vZGUgJiYgVkVsZW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzczogXCJ0Yi10aW1lbGluZS1hZGRcIiwgb25DbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0Yi10aW1lbGluZS1hZGQnLGluZGV4KzEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdHMuaW5zZXJ0QnlJbmRleChuZXcgVGltZWxpbmVJdGVtU2xvdCgncHJpbWFyeScpLGluZGV4KzEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xvdFJlbmRlcihpdGVtLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzcz0ndGItdG9kby1saXN0LWNvbnRlbnQnLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VsJyxpdGVtcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVkVsZW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyx7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6J3RiLXRpbWVsaW5lJ1xyXG4gICAgICAgICAgICAgICAgfSxpdGVtcyk7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pXHJcbmV4cG9ydCBjb25zdCB0aW1lbGluZUNvbXBvbmVudExvYWRlcjpDb21wb25lbnRMb2FkZXI9e1xyXG4gICAgY29tcG9uZW50OiB0aW1lbGluZUNvbXBvbmVudCxcclxuXHJcbiAgICBtYXRjaChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2RpdicgJiYgZWxlbWVudC5jbGFzc05hbWUgPT09ICd0Yi10aW1lbGluZSdcclxuICAgIH0sXHJcbiAgICByZWFkKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb250ZXh0OiBJbmplY3Rvciwgc2xvdFBhcnNlcjogU2xvdFBhcnNlcikgOkNvbXBvbmVudEluc3RhbmNle1xyXG4gICAgICAgIC8vY29uc3QgY2hlY2s9ZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGItdG9kby1saXN0LXN0YXRlJykgYXMgSFRNTEVsZW1lbnRcclxuICAgICAgICBjb25zdCBjb250ZW50PWVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRiLXRpbWVsaW5lLWNvbnRlbnQnKSBhcyBIVE1MRWxlbWVudFxyXG4gICAgICAgIGNvbnN0IHNsb3Q9bmV3IFRpbWVsaW5lSXRlbVNsb3QoJ3ByaW1hcnknKVxyXG4gICAgICAgIHNsb3RQYXJzZXIoc2xvdCxjb250ZW50KVxyXG5cclxuICAgICAgICAvL2NvbnN0IGNvbXBvbmVudCA9IG5ldyBUb2RvTGlzdENvbXBvbmVudChsaXN0Q29uZmlnLm1hcChpID0+IGkuc2xvdCkpO1xyXG4gICAgICAgIHJldHVybiB0aW1lbGluZUNvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShjb250ZXh0LHtzbG90czpbc2xvdF19KTtcclxuICAgIH0sXHJcbiAgICByZXNvdXJjZXM6IHtcclxuICAgICAgICBzdHlsZXM6IFtcclxuICAgICAgICAgICAgYFxyXG4udGItdGltZWxpbmUge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHBhZGRpbmctdG9wOiAxZW07XHJcbiAgcGFkZGluZy1sZWZ0OiA1cHg7XHJcbn1cclxuLnRiLXRpbWVsaW5lLWl0ZW0ge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBwYWRkaW5nLWxlZnQ6IDEuNWVtO1xyXG4gIHBhZGRpbmctYm90dG9tOiAwLjVlbTtcclxuICBvcGFjaXR5OiAuNzY7XHJcbn1cclxuXHJcbi50Yi10aW1lbGluZS1pdGVtOmZpcnN0LW9mLXR5cGUgPiAudGItdGltZWxpbmUtbGluZXtcclxuICB0b3A6IDFlbTtcclxufVxyXG5cclxuLnRiLXRpbWVsaW5lLWl0ZW06bGFzdC1vZi10eXBlID4gLnRiLXRpbWVsaW5lLWxpbmV7XHJcbiAgYm90dG9tOiBjYWxjKDEwMCUgLSAxZW0pO1xyXG59XHJcblxyXG4udGItdGltZWxpbmUtbGluZSB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGxlZnQ6IDA7XHJcbiAgdG9wOiAwO1xyXG4gIGJvdHRvbTogMDtcclxuICB3aWR0aDogMDtcclxuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNkZGRlZTE7XHJcbn1cclxuXHJcbi50Yi10aW1lbGluZS1pY29uIHtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB3aWR0aDogOXB4O1xyXG4gIGhlaWdodDogOXB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBsZWZ0OiAtNHB4O1xyXG4gIHRvcDogLjVlbTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNiYmJlYzQ7XHJcbn1cclxuXHJcbmAgKyBjb2xvcnMubWFwKCh2YWx1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgXHJcbiAgLnRiLXRpbWVsaW5lLWl0ZW0tJHt0aW1lbGluZVR5cGVzW2luZGV4XX0ge1xyXG4gICAgb3BhY2l0eTogMTtcclxuICB9XHJcbiAgLnRiLXRpbWVsaW5lLWl0ZW0tJHt0aW1lbGluZVR5cGVzW2luZGV4XX0gPi50Yi10aW1lbGluZS1pY29uIHtcclxuICAgIGJvcmRlci1jb2xvcjogJHt2YWx1ZX07XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3ZhbHVlfTtcclxuICB9XHJcbiAgLnRiLXRpbWVsaW5lLWl0ZW0tJHt0aW1lbGluZVR5cGVzW2luZGV4XX0gPi50Yi10aW1lbGluZS1saW5lIHtcclxuICAgIGJvcmRlci1jb2xvcjogJHt2YWx1ZX07XHJcbiAgfVxyXG4gIGA7XHJcbiAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpXHJcbiAgICAgICAgXSxcclxuICAgICAgICBlZGl0TW9kZVN0eWxlczogW1xyXG4gICAgICAgICAgICBgXHJcbi50Yi10aW1lbGluZS1pY29uOmhvdmVyIHtcclxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbi50Yi10aW1lbGluZS1hZGQge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIHRvcDogMDtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgbGluZS1oZWlnaHQ6IDE7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbi50Yi10aW1lbGluZS1hZGQ6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIitcIjtcclxufVxyXG4udGItdGltZWxpbmUtYWRkOmhvdmVyIHtcclxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XHJcbn1cclxuXHJcbi50Yi10aW1lbGluZS1pdGVtOmhvdmVyIC50Yi10aW1lbGluZS1hZGQge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcbi50Yi10aW1lbGluZS1jb250ZW50IHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcbmBcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG59Il19