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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGV4dGJ1cy9jb21wb25lbnRzL3RpbWVsaW5lL3RpbWVsaW5lLmNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlILFdBQVcsRUFDWCxlQUFlLEVBQ2YsSUFBSSxFQUlKLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBTXZCLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxJQUFJO0lBQ3RDLFlBQVksSUFBSTtRQUNaLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFDO1lBQ2hELElBQUksRUFBQyxJQUFJO1NBQ1osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNyQixDQUFDO0NBQ0o7QUFPRCxNQUFNLGFBQWEsR0FBRyxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzFGLE1BQU0sTUFBTSxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFFN0YsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUMsZUFBZSxDQUF3QjtJQUNsRSxJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLElBQUksRUFBRSxXQUFXLENBQUMsY0FBYztJQUVoQyxLQUFLLENBQUMsSUFBeUI7UUFFM0IsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBRSxJQUFJLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUcsQ0FBQTtRQUMxRSw0QkFBNEI7UUFDNUIsSUFBSSxLQUFLLEdBQUMsRUFBRSxDQUFBO1FBQ1osTUFBTSxnQkFBZ0IsR0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsd0RBQXdEO1FBQ3hELGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFBLEVBQUU7WUFDMUMsS0FBSyxHQUFDLFFBQVEsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUMsS0FBSyxDQUFDLENBQUE7UUFDekMsQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPO1lBQ0gsTUFBTSxDQUFDLFlBQW9CLEVBQUUsVUFBcUI7Z0JBQzlDLElBQUksS0FBSyxHQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLEVBQUU7b0JBQ3pDLE1BQU0sT0FBTyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztvQkFDckMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTt3QkFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUN2RDtvQkFDRCxPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFDO3dCQUNoQyxLQUFLLEVBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7cUJBQzFCLEVBQUM7d0JBQ0UsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQzt3QkFDNUQsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRTtnQ0FDNUcsTUFBTSxJQUFJLEdBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQ0FDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3pCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFFLEVBQUUsQ0FBQztnQ0FDdEMsSUFBSSxDQUFDLFdBQVcsRUFBRTtvQ0FDZCxXQUFXLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lDQUNsQztxQ0FDSTtvQ0FDRCxXQUFXLEdBQUcsYUFBYSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2lDQUM3RTtnQ0FDRCxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO29DQUN0QixLQUFLLENBQUMsSUFBSSxHQUFDLFdBQVcsQ0FBQTtnQ0FDMUIsQ0FBQyxFQUFDO2dDQUNFLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFBOzRCQUM1QyxDQUFDLEVBQUUsQ0FBQzt3QkFDSixDQUFDLFlBQVksSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFO2dDQUNsRixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsQ0FBQTtnQ0FDdEMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDakUsQ0FBQyxFQUFFLENBQUM7d0JBQ1IsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7NEJBQ2xCLE9BQU8sZ0NBQUssS0FBSyxFQUFDLHNCQUFzQixHQUFFLENBQUE7d0JBQzlDLENBQUMsQ0FBQztxQkFDTCxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUM7b0JBQ2hDLEtBQUssRUFBQyxhQUFhO2lCQUN0QixFQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWIsQ0FBQztTQUNKLENBQUE7SUFDTCxDQUFDO0NBRUosQ0FBQyxDQUFBO0FBQ0YsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQWlCO0lBQ2pELFNBQVMsRUFBRSxpQkFBaUI7SUFFNUIsS0FBSyxDQUFDLE9BQW9CO1FBQ3RCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLElBQUksT0FBTyxDQUFDLFNBQVMsS0FBSyxhQUFhLENBQUE7SUFDekYsQ0FBQztJQUNELElBQUksQ0FBQyxPQUFvQixFQUFFLE9BQWlCLEVBQUUsVUFBc0I7UUFDaEUseUVBQXlFO1FBQ3pFLE1BQU0sT0FBTyxHQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQWdCLENBQUE7UUFDMUUsTUFBTSxJQUFJLEdBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUMxQyxVQUFVLENBQUMsSUFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXhCLHVFQUF1RTtRQUN2RSxPQUFPLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNELFNBQVMsRUFBRTtRQUNQLE1BQU0sRUFBRTtZQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMkNYLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDaEIsT0FBTztzQkFDRCxhQUFhLENBQUMsS0FBSyxDQUFDOzs7c0JBR3BCLGFBQWEsQ0FBQyxLQUFLLENBQUM7b0JBQ3RCLEtBQUs7d0JBQ0QsS0FBSzs7c0JBRVAsYUFBYSxDQUFDLEtBQUssQ0FBQztvQkFDdEIsS0FBSzs7R0FFdEIsQ0FBQztZQUNRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDaEI7UUFDRCxjQUFjLEVBQUU7WUFDWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMkJYO1NBQ1E7S0FDSjtDQUNKLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50RGF0YSxcclxuICAgIENvbXBvbmVudEluc3RhbmNlLFxyXG4gICAgQ29tcG9uZW50TWV0aG9kcyxcclxuICAgIENvbnRlbnRUeXBlLFxyXG4gICAgZGVmaW5lQ29tcG9uZW50LFxyXG4gICAgU2xvdCxcclxuICAgIFNsb3RSZW5kZXIsXHJcbiAgICBUcmFuc2xhdG9yLFxyXG4gICAgdXNlQ29udGV4dCxcclxuICAgIHVzZVNsb3RzLFxyXG4gICAgdXNlU3RhdGUsXHJcbiAgICBWRWxlbWVudFxyXG59IGZyb20gXCJAdGV4dGJ1cy9jb3JlXCI7XHJcbmltcG9ydCB7Q29tcG9uZW50TG9hZGVyLCBTbG90UGFyc2VyfSBmcm9tIFwiQHRleHRidXMvYnJvd3NlclwiO1xyXG5pbXBvcnQge0luamVjdG9yfSBmcm9tIFwiQHRhbmJvL2RpXCI7XHJcbmltcG9ydCB7U2xvdExpdGVyYWx9IGZyb20gXCJAdGV4dGJ1cy9jb3JlXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lSXRlbVNsb3QgZXh0ZW5kcyBTbG90e1xyXG4gICAgY29uc3RydWN0b3IodHlwZSkge1xyXG4gICAgICAgIHN1cGVyKFtDb250ZW50VHlwZS5CbG9ja0NvbXBvbmVudCxDb250ZW50VHlwZS5UZXh0XSx7XHJcbiAgICAgICAgICAgIHR5cGU6dHlwZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMud3JpdGUoJ+aXtumXtOe6vycpXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSB0aW1lbGluZVNsb3R7XHJcbiAgICBpdGVtU2xvdHM6IFRpbWVsaW5lSXRlbVNsb3RbXTtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIHRpbWVsaW5lU2xvdExpdGVyYWx7XHJcbiAgICBpdGVtU2xvdExpdGVyYWxzOlNsb3RMaXRlcmFsW11cclxufVxyXG5jb25zdCB0aW1lbGluZVR5cGVzID0gWydwcmltYXJ5JywgJ2luZm8nLCAnc3VjY2VzcycsICd3YXJuaW5nJywgJ2RhbmdlcicsICdkYXJrJywgJ2dyYXknXTtcclxuY29uc3QgY29sb3JzID0gWycjMTI5NmRiJywgJyM2YWQxZWMnLCAnIzE1YmQ5YScsICcjZmY5OTAwJywgJyNFNzRGNUUnLCAnIzQ5NTA2MCcsICcjYmJiZWM0J107XHJcblxyXG5leHBvcnQgY29uc3QgdGltZWxpbmVDb21wb25lbnQ9ZGVmaW5lQ29tcG9uZW50PENvbXBvbmVudE1ldGhvZHMsbnVsbD4oe1xyXG4gICAgbmFtZTogXCJ0aW1lbGluZUNvbXBvbmVudFwiLFxyXG4gICAgdHlwZTogQ29udGVudFR5cGUuQmxvY2tDb21wb25lbnQsXHJcblxyXG4gICAgc2V0dXAoZGF0YTogQ29tcG9uZW50RGF0YTxudWxsPik6IENvbXBvbmVudE1ldGhvZHMge1xyXG5cclxuICAgICAgICBjb25zdCBzbG90cyA9IHVzZVNsb3RzKGRhdGEuc2xvdHMgfHwgWyBuZXcgVGltZWxpbmVJdGVtU2xvdCgncHJpbWFyeScpXSwgKVxyXG4gICAgICAgIC8vc2xvdHMuZ2V0KDApLnN0YXRlLnR5cGU9JydcclxuICAgICAgICBsZXQgc3RhdGU9e31cclxuICAgICAgICBjb25zdCBjaGFuZ2VDb250cm9sbGVyPXVzZVN0YXRlKHN0YXRlKTtcclxuICAgICAgICAvL3VzZVN0YXRlKHtmaWxsOmZhbHNlLHR5cGU6J2luZm8nLHNsb3Q6c2xvdHMudG9KU09OKCl9KVxyXG4gICAgICAgIGNoYW5nZUNvbnRyb2xsZXIub25DaGFuZ2Uuc3Vic2NyaWJlKG5ld1N0YXRlPT57XHJcbiAgICAgICAgICAgIHN0YXRlPW5ld1N0YXRlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlQ29udHJvbGxlcicsc3RhdGUpXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZW5kZXIoaXNPdXRwdXRNb2RlOmJvb2xlYW4sIHNsb3RSZW5kZXI6U2xvdFJlbmRlcil7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXM9c2xvdHMudG9BcnJheSgpLm1hcCgoaXRlbSAsaW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IFsndGItdGltZWxpbmUtaXRlbSddO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnN0YXRlLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCd0Yi10aW1lbGluZS1pdGVtLScgKyBpdGVtLnN0YXRlLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVkVsZW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOmNsYXNzZXMuam9pbignICcpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZFbGVtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJ0Yi10aW1lbGluZS1saW5lXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZFbGVtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJ0Yi10aW1lbGluZS1pY29uXCIsIHRpdGxlOiBpc091dHB1dE1vZGUgPyBudWxsIDogJ+eCueWHu+WIh+aNouminOiJsicsIG9uQ2xpY2s6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsb3Q9c2xvdHMuZ2V0KGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Nsb3QnLGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRUeXBlID0gaXRlbS5zdGF0ZS50eXBlfHwnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VHlwZSA9IHRpbWVsaW5lVHlwZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VHlwZSA9IHRpbWVsaW5lVHlwZXNbdGltZWxpbmVUeXBlcy5pbmRleE9mKGN1cnJlbnRUeXBlKSArIDFdIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdD8udXBkYXRlU3RhdGUoZHJhZnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWZ0LnR5cGU9Y3VycmVudFR5cGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlQ29udHJvbGxlci51cGRhdGUoZHJhZnQgPT4ge30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFpc091dHB1dE1vZGUgJiYgVkVsZW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzczogXCJ0Yi10aW1lbGluZS1hZGRcIiwgb25DbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0Yi10aW1lbGluZS1hZGQnLGluZGV4KzEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdHMuaW5zZXJ0QnlJbmRleChuZXcgVGltZWxpbmVJdGVtU2xvdCgncHJpbWFyeScpLGluZGV4KzEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xvdFJlbmRlcihpdGVtLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzcz0ndGItdG9kby1saXN0LWNvbnRlbnQnLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VsJyxpdGVtcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVkVsZW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyx7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6J3RiLXRpbWVsaW5lJ1xyXG4gICAgICAgICAgICAgICAgfSxpdGVtcyk7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pXHJcbmV4cG9ydCBjb25zdCB0aW1lbGluZUNvbXBvbmVudExvYWRlcjpDb21wb25lbnRMb2FkZXI9e1xyXG4gICAgY29tcG9uZW50OiB0aW1lbGluZUNvbXBvbmVudCxcclxuXHJcbiAgICBtYXRjaChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2RpdicgJiYgZWxlbWVudC5jbGFzc05hbWUgPT09ICd0Yi10aW1lbGluZSdcclxuICAgIH0sXHJcbiAgICByZWFkKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb250ZXh0OiBJbmplY3Rvciwgc2xvdFBhcnNlcjogU2xvdFBhcnNlcikgOkNvbXBvbmVudEluc3RhbmNle1xyXG4gICAgICAgIC8vY29uc3QgY2hlY2s9ZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGItdG9kby1saXN0LXN0YXRlJykgYXMgSFRNTEVsZW1lbnRcclxuICAgICAgICBjb25zdCBjb250ZW50PWVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRiLXRpbWVsaW5lLWNvbnRlbnQnKSBhcyBIVE1MRWxlbWVudFxyXG4gICAgICAgIGNvbnN0IHNsb3Q9bmV3IFRpbWVsaW5lSXRlbVNsb3QoJ3ByaW1hcnknKVxyXG4gICAgICAgIHNsb3RQYXJzZXIoc2xvdCxjb250ZW50KVxyXG5cclxuICAgICAgICAvL2NvbnN0IGNvbXBvbmVudCA9IG5ldyBUb2RvTGlzdENvbXBvbmVudChsaXN0Q29uZmlnLm1hcChpID0+IGkuc2xvdCkpO1xyXG4gICAgICAgIHJldHVybiB0aW1lbGluZUNvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShjb250ZXh0LHtzbG90czpbc2xvdF19KTtcclxuICAgIH0sXHJcbiAgICByZXNvdXJjZXM6IHtcclxuICAgICAgICBzdHlsZXM6IFtcclxuICAgICAgICAgICAgYFxyXG4udGItdGltZWxpbmUge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHBhZGRpbmctdG9wOiAxZW07XHJcbiAgcGFkZGluZy1sZWZ0OiA1cHg7XHJcbn1cclxuLnRiLXRpbWVsaW5lLWl0ZW0ge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBwYWRkaW5nLWxlZnQ6IDEuNWVtO1xyXG4gIHBhZGRpbmctYm90dG9tOiAwLjVlbTtcclxuICBvcGFjaXR5OiAuNzY7XHJcbn1cclxuXHJcbi50Yi10aW1lbGluZS1pdGVtOmZpcnN0LW9mLXR5cGUgPiAudGItdGltZWxpbmUtbGluZXtcclxuICB0b3A6IDFlbTtcclxufVxyXG5cclxuLnRiLXRpbWVsaW5lLWl0ZW06bGFzdC1vZi10eXBlID4gLnRiLXRpbWVsaW5lLWxpbmV7XHJcbiAgYm90dG9tOiBjYWxjKDEwMCUgLSAxZW0pO1xyXG59XHJcblxyXG4udGItdGltZWxpbmUtbGluZSB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGxlZnQ6IDA7XHJcbiAgdG9wOiAwO1xyXG4gIGJvdHRvbTogMDtcclxuICB3aWR0aDogMDtcclxuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNkZGRlZTE7XHJcbn1cclxuXHJcbi50Yi10aW1lbGluZS1pY29uIHtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB3aWR0aDogOXB4O1xyXG4gIGhlaWdodDogOXB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBsZWZ0OiAtNHB4O1xyXG4gIHRvcDogLjVlbTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNiYmJlYzQ7XHJcbn1cclxuXHJcbmAgKyBjb2xvcnMubWFwKCh2YWx1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgXHJcbiAgLnRiLXRpbWVsaW5lLWl0ZW0tJHt0aW1lbGluZVR5cGVzW2luZGV4XX0ge1xyXG4gICAgb3BhY2l0eTogMTtcclxuICB9XHJcbiAgLnRiLXRpbWVsaW5lLWl0ZW0tJHt0aW1lbGluZVR5cGVzW2luZGV4XX0gPi50Yi10aW1lbGluZS1pY29uIHtcclxuICAgIGJvcmRlci1jb2xvcjogJHt2YWx1ZX07XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3ZhbHVlfTtcclxuICB9XHJcbiAgLnRiLXRpbWVsaW5lLWl0ZW0tJHt0aW1lbGluZVR5cGVzW2luZGV4XX0gPi50Yi10aW1lbGluZS1saW5lIHtcclxuICAgIGJvcmRlci1jb2xvcjogJHt2YWx1ZX07XHJcbiAgfVxyXG4gIGA7XHJcbiAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpXHJcbiAgICAgICAgXSxcclxuICAgICAgICBlZGl0TW9kZVN0eWxlczogW1xyXG4gICAgICAgICAgICBgXHJcbi50Yi10aW1lbGluZS1pY29uOmhvdmVyIHtcclxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbi50Yi10aW1lbGluZS1hZGQge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIHRvcDogMDtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgbGluZS1oZWlnaHQ6IDE7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbi50Yi10aW1lbGluZS1hZGQ6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIitcIjtcclxufVxyXG4udGItdGltZWxpbmUtYWRkOmhvdmVyIHtcclxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XHJcbn1cclxuXHJcbi50Yi10aW1lbGluZS1pdGVtOmhvdmVyIC50Yi10aW1lbGluZS1hZGQge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcbi50Yi10aW1lbGluZS1jb250ZW50IHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcbmBcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG59Il19