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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGV4dGJ1cy9jb21wb25lbnRzL3RpbWVsaW5lL3RpbWVsaW5lLmNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlILFdBQVcsRUFDWCxlQUFlLEVBQ2YsSUFBSSxFQUlKLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBTXZCLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxJQUFJO0lBQ3RDLFlBQVksSUFBSTtRQUNaLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFDO1lBQ2hELElBQUksRUFBQyxJQUFJO1NBQ1osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNyQixDQUFDO0NBQ0o7QUFPRCxNQUFNLGFBQWEsR0FBRyxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzFGLE1BQU0sTUFBTSxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFFN0YsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUMsZUFBZSxDQUF3QjtJQUNsRSxJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLElBQUksRUFBRSxXQUFXLENBQUMsY0FBYztJQUVoQyxLQUFLLENBQUMsSUFBeUI7UUFFM0IsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBRSxJQUFJLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUcsQ0FBQTtRQUMxRSw0QkFBNEI7UUFDNUIsSUFBSSxL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QUFLOztzQkFFUCxhQUFhLENBQUMsS0FBSyxDQUFDO29CQUN0QixLQUFLOztHQUV0QixDQUFDO1lBQ1EsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNoQjtRQUNELGNBQWMsRUFBRTtZQUNaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0EyQlg7U0FDUTtLQUNKO0NBQ0osQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnREYXRhLFxyXG4gICAgQ29tcG9uZW50SW5zdGFuY2UsXHJcbiAgICBDb21wb25lbnRNZXRob2RzLFxyXG4gICAgQ29udGVudFR5cGUsXHJcbiAgICBkZWZpbmVDb21wb25lbnQsXHJcbiAgICBTbG90LFxyXG4gICAgU2xvdFJlbmRlcixcclxuICAgIFRyYW5zbGF0b3IsXHJcbiAgICB1c2VDb250ZXh0LFxyXG4gICAgdXNlU2xvdHMsXHJcbiAgICB1c2VTdGF0ZSxcclxuICAgIFZFbGVtZW50XHJcbn0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuaW1wb3J0IHtDb21wb25lbnRMb2FkZXIsIFNsb3RQYXJzZXJ9IGZyb20gXCJAdGV4dGJ1cy9icm93c2VyXCI7XHJcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gXCJAdGFuYm8vZGlcIjtcclxuaW1wb3J0IHtTbG90TGl0ZXJhbH0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVGltZWxpbmVJdGVtU2xvdCBleHRlbmRzIFNsb3R7XHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlKSB7XHJcbiAgICAgICAgc3VwZXIoW0NvbnRlbnRUeXBlLkJsb2NrQ29tcG9uZW50LENvbnRlbnRUeXBlLlRleHRdLHtcclxuICAgICAgICAgICAgdHlwZTp0eXBlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy53cml0ZSgn5pe26Ze057q/JylcclxuICAgIH1cclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIHRpbWVsaW5lU2xvdHtcclxuICAgIGl0ZW1TbG90czogVGltZWxpbmVJdGVtU2xvdFtdO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgdGltZWxpbmVTbG90TGl0ZXJhbHtcclxuICAgIGl0ZW1TbG90TGl0ZXJhbHM6U2xvdExpdGVyYWxbXVxyXG59XHJcbmNvbnN0IHRpbWVsaW5lVHlwZXMgPSBbJ3ByaW1hcnknLCAnaW5mbycsICdzdWNjZXNzJywgJ3dhcm5pbmcnLCAnZGFuZ2VyJywgJ2RhcmsnLCAnZ3JheSddO1xyXG5jb25zdCBjb2xvcnMgPSBbJyMxMjk2ZGInLCAnIzZhZDFlYycsICcjMTViZDlhJywgJyNmZjk5MDAnLCAnI0U3NEY1RScsICcjNDk1MDYwJywgJyNiYmJlYzQnXTtcclxuXHJcbmV4cG9ydCBjb25zdCB0aW1lbGluZUNvbXBvbmVudD1kZWZpbmVDb21wb25lbnQ8Q29tcG9uZW50TWV0aG9kcyxudWxsPih7XHJcbiAgICBuYW1lOiBcInRpbWVsaW5lQ29tcG9uZW50XCIsXHJcbiAgICB0eXBlOiBDb250ZW50VHlwZS5CbG9ja0NvbXBvbmVudCxcclxuXHJcbiAgICBzZXR1cChkYXRhOiBDb21wb25lbnREYXRhPG51bGw+KTogQ29tcG9uZW50TWV0aG9kcyB7XHJcblxyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdXNlU2xvdHMoZGF0YS5zbG90cyB8fCBbIG5ldyBUaW1lbGluZUl0ZW1TbG90KCdwcmltYXJ5JyldLCApXHJcbiAgICAgICAgLy9zbG90cy5nZXQoMCkuc3RhdGUudHlwZT0nJ1xyXG4gICAgICAgIGxldCBzdGF0ZT17fVxyXG4gICAgICAgIGNvbnN0IGNoYW5nZUNvbnRyb2xsZXI9dXNlU3RhdGUoc3RhdGUpO1xyXG4gICAgICAgIC8vdXNlU3RhdGUoe2ZpbGw6ZmFsc2UsdHlwZTonaW5mbycsc2xvdDpzbG90cy50b0pTT04oKX0pXHJcbiAgICAgICAgY2hhbmdlQ29udHJvbGxlci5vbkNoYW5nZS5zdWJzY3JpYmUobmV3U3RhdGU9PntcclxuICAgICAgICAgICAgc3RhdGU9bmV3U3RhdGU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VDb250cm9sbGVyJyxzdGF0ZSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlbmRlcihpc091dHB1dE1vZGU6Ym9vbGVhbiwgc2xvdFJlbmRlcjpTbG90UmVuZGVyKXtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtcz1zbG90cy50b0FycmF5KCkubWFwKChpdGVtICxpbmRleCk9PntcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gWyd0Yi10aW1lbGluZS1pdGVtJ107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uc3RhdGUudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goJ3RiLXRpbWVsaW5lLWl0ZW0tJyArIGl0ZW0uc3RhdGUudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBWRWxlbWVudC5jcmVhdGVFbGVtZW50KCdkaXYnLHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6Y2xhc3Nlcy5qb2luKCcgJylcclxuICAgICAgICAgICAgICAgICAgICB9LFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVkVsZW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInRiLXRpbWVsaW5lLWxpbmVcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVkVsZW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInRiLXRpbWVsaW5lLWljb25cIiwgdGl0bGU6IGlzT3V0cHV0TW9kZSA/IG51bGwgOiAn54K55Ye75YiH5o2i6aKc6ImyJywgb25DbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xvdD1zbG90cy5nZXQoaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2xvdCcsaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFR5cGUgPSBpdGVtLnN0YXRlLnR5cGV8fCcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUeXBlID0gdGltZWxpbmVUeXBlc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUeXBlID0gdGltZWxpbmVUeXBlc1t0aW1lbGluZVR5cGVzLmluZGV4T2YoY3VycmVudFR5cGUpICsgMV0gfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90Py51cGRhdGVTdGF0ZShkcmFmdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZnQudHlwZT1jdXJyZW50VHlwZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VDb250cm9sbGVyLnVwZGF0ZShkcmFmdCA9PiB7fSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIWlzT3V0cHV0TW9kZSAmJiBWRWxlbWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzOiBcInRiLXRpbWVsaW5lLWFkZFwiLCBvbkNsaWNrOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RiLXRpbWVsaW5lLWFkZCcsaW5kZXgrMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90cy5pbnNlcnRCeUluZGV4KG5ldyBUaW1lbGluZUl0ZW1TbG90KCdwcmltYXJ5JyksaW5kZXgrMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90UmVuZGVyKGl0ZW0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzPSd0Yi10b2RvLWxpc3QtY29udGVudCcvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZWwnLGl0ZW1zKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBWRWxlbWVudC5jcmVhdGVFbGVtZW50KCdkaXYnLHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzczondGItdGltZWxpbmUnXHJcbiAgICAgICAgICAgICAgICB9LGl0ZW1zKTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSlcclxuZXhwb3J0IGNvbnN0IHRpbWVsaW5lQ29tcG9uZW50TG9hZGVyOkNvbXBvbmVudExvYWRlcj17XHJcbiAgICBjb21wb25lbnQ6IHRpbWVsaW5lQ29tcG9uZW50LFxyXG5cclxuICAgIG1hdGNoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZGl2JyAmJiBlbGVtZW50LmNsYXNzTmFtZSA9PT0gJ3RiLXRpbWVsaW5lJ1xyXG4gICAgfSxcclxuICAgIHJlYWQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbnRleHQ6IEluamVjdG9yLCBzbG90UGFyc2VyOiBTbG90UGFyc2VyKSA6Q29tcG9uZW50SW5zdGFuY2V7XHJcbiAgICAgICAgLy9jb25zdCBjaGVjaz1lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50Yi10b2RvLWxpc3Qtc3RhdGUnKSBhcyBIVE1MRWxlbWVudFxyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQ9ZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGItdGltZWxpbmUtY29udGVudCcpIGFzIEhUTUxFbGVtZW50XHJcbiAgICAgICAgY29uc3Qgc2xvdD1uZXcgVGltZWxpbmVJdGVtU2xvdCgncHJpbWFyeScpXHJcbiAgICAgICAgc2xvdFBhcnNlcihzbG90LGNvbnRlbnQpXHJcblxyXG4gICAgICAgIC8vY29uc3QgY29tcG9uZW50ID0gbmV3IFRvZG9MaXN0Q29tcG9uZW50KGxpc3RDb25maWcubWFwKGkgPT4gaS5zbG90KSk7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVsaW5lQ29tcG9uZW50LmNyZWF0ZUluc3RhbmNlKGNvbnRleHQse3Nsb3RzOltzbG90XX0pO1xyXG4gICAgfSxcclxuICAgIHJlc291cmNlczoge1xyXG4gICAgICAgIHN0eWxlczogW1xyXG4gICAgICAgICAgICBgXHJcbi50Yi10aW1lbGluZSB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgcGFkZGluZy10b3A6IDFlbTtcclxuICBwYWRkaW5nLWxlZnQ6IDVweDtcclxufVxyXG4udGItdGltZWxpbmUtaXRlbSB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHBhZGRpbmctbGVmdDogMS41ZW07XHJcbiAgcGFkZGluZy1ib3R0b206IDAuNWVtO1xyXG4gIG9wYWNpdHk6IC43NjtcclxufVxyXG5cclxuLnRiLXRpbWVsaW5lLWl0ZW06Zmlyc3Qtb2YtdHlwZSA+IC50Yi10aW1lbGluZS1saW5le1xyXG4gIHRvcDogMWVtO1xyXG59XHJcblxyXG4udGItdGltZWxpbmUtaXRlbTpsYXN0LW9mLXR5cGUgPiAudGItdGltZWxpbmUtbGluZXtcclxuICBib3R0b206IGNhbGMoMTAwJSAtIDFlbSk7XHJcbn1cclxuXHJcbi50Yi10aW1lbGluZS1saW5lIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbGVmdDogMDtcclxuICB0b3A6IDA7XHJcbiAgYm90dG9tOiAwO1xyXG4gIHdpZHRoOiAwO1xyXG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2RkZGVlMTtcclxufVxyXG5cclxuLnRiLXRpbWVsaW5lLWljb24ge1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHdpZHRoOiA5cHg7XHJcbiAgaGVpZ2h0OiA5cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGxlZnQ6IC00cHg7XHJcbiAgdG9wOiAuNWVtO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2JiYmVjNDtcclxufVxyXG5cclxuYCArIGNvbG9ycy5tYXAoKHZhbHVlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGBcclxuICAudGItdGltZWxpbmUtaXRlbS0ke3RpbWVsaW5lVHlwZXNbaW5kZXhdfSB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gIH1cclxuICAudGItdGltZWxpbmUtaXRlbS0ke3RpbWVsaW5lVHlwZXNbaW5kZXhdfSA+LnRiLXRpbWVsaW5lLWljb24ge1xyXG4gICAgYm9yZGVyLWNvbG9yOiAke3ZhbHVlfTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7dmFsdWV9O1xyXG4gIH1cclxuICAudGItdGltZWxpbmUtaXRlbS0ke3RpbWVsaW5lVHlwZXNbaW5kZXhdfSA+LnRiLXRpbWVsaW5lLWxpbmUge1xyXG4gICAgYm9yZGVyLWNvbG9yOiAke3ZhbHVlfTtcclxuICB9XHJcbiAgYDtcclxuICAgICAgICAgICAgfSkuam9pbignXFxuJylcclxuICAgICAgICBdLFxyXG4gICAgICAgIGVkaXRNb2RlU3R5bGVzOiBbXHJcbiAgICAgICAgICAgIGBcclxuLnRiLXRpbWVsaW5lLWljb246aG92ZXIge1xyXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuLnRiLXRpbWVsaW5lLWFkZCB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgdG9wOiAwO1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBsaW5lLWhlaWdodDogMTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuLnRiLXRpbWVsaW5lLWFkZDpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiK1wiO1xyXG59XHJcbi50Yi10aW1lbGluZS1hZGQ6aG92ZXIge1xyXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcclxufVxyXG5cclxuLnRiLXRpbWVsaW5lLWl0ZW06aG92ZXIgLnRiLXRpbWVsaW5lLWFkZCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuLnRiLXRpbWVsaW5lLWNvbnRlbnQge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuYFxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbn0iXX0=