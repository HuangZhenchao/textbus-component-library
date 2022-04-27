import { ContentType, defineComponent, Slot, Translator, useContext, useSlots, useState, VElement } from "@textbus/core";
export class StepSlot extends Slot {
    constructor() {
        super([ContentType.BlockComponent, ContentType.Text]);
        this.write('标题\n描述');
    }
}
export const stepComponent = defineComponent({
    name: "stepComponent",
    type: ContentType.BlockComponent,
    setup(data) {
        const injector = useContext();
        const translator = injector.get(Translator);
        const slots = useSlots(data.slots || [new StepSlot()]);
        let state = data.state;
        const changeController = useState(state);
        changeController.onChange.subscribe(newState => {
            state = newState;
            console.log('changeController', state);
        });
        return {
            render(isOutputMode, slotRender) {
                const createItem = function (item, index) {
                    let classes = 'tb-waiting';
                    if (index < state.step) {
                        classes = 'tb-complete';
                    }
                    else if (index === state.step) {
                        classes = 'tb-current';
                    }
                    return VElement.createElement("div", { class: 'tb-step-item ' + classes }, VElement.createElement("div", { class: "tb-step-item-header" }, VElement.createElement("div", { class: "tb-step-item-line" }), VElement.createElement("div", { class: "tb-step-item-icon", onClick: () => {
                            const currentStep = state.step;
                            let newStep = currentStep;
                            if (index === currentStep) {
                                newStep = index + 1;
                            }
                            else if (index + 1 === currentStep) {
                                newStep = index - 1;
                            }
                            else {
                                newStep = index;
                            }
                            changeController.update(draft => {
                                draft.step = newStep;
                            });
                        } }, index + 1)), slotRender(item, () => {
                        return VElement.createElement("div", { class: 'tb-step-item-content' });
                    }), !isOutputMode && VElement.createElement("span", { class: "tb-step-item-add", onClick: () => {
                            slots.insertByIndex(new StepSlot(), index + 1);
                            // 当前新插入的item后面的item需要更新序号
                            changeController.update(draft => { });
                        } }));
                };
                return VElement.createElement('div', {
                    class: 'tb-step',
                    step: state.step || 0
                }, slots.toArray().map((slot, index) => {
                    return createItem(slot, index);
                }));
            }
        };
    }
});
export const stepComponentLoader = {
    component: stepComponent,
    match(element) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-step';
    },
    read(element, context, slotParser) {
        let slots = Array.from(element.children).map(child => {
            return slotParser(new StepSlot(), child);
        });
        let initState = {
            step: Number(element.getAttribute('step')) || 0,
        };
        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        return stepComponent.createInstance(context, { slots: slots, state: initState });
    },
    resources: {
        styles: [
            `
.tb-step {
  display: flex;
}
.tb-step-item {
  position: relative;
  flex: 1;
}

.tb-step-item:last-child .tb-step-item-line {
  display: none;
}

.tb-step-item.tb-complete .tb-step-item-line {
  border-top-color: #15bd9a;
}
.tb-step-item.tb-complete .tb-step-item-icon {
  background-color: #15bd9a;
}

.tb-step-item.tb-current .tb-step-item-line {
  border-top-style: dashed;
}
.tb-step-item.tb-current .tb-step-item-icon {
  background-color: #1296db;
}

.tb-step-item.tb-waiting .tb-step-item-line {
  border-top-style: dashed;
}

.tb-step-item.tb-waiting .tb-step-item-icon {
  background-color: #bbbec4;
}
.tb-step-item.tb-waiting .tb-step-item-content {
  opacity: .8;
}

.tb-step-item-header {
  position: relative;
  margin-bottom: 1em;
}

.tb-step-item-icon {
  width: 1.6em;
  height: 1.6em;
  border-radius: 50%;
  position: relative;
  text-align: center;
  line-height: 1.6em;
  color: #fff;
  font-weight: 500;
}

.tb-step-item-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  border-top: 1px solid #dddee1;
}

.tb-step-item-content {
  padding-right: 15px;
}

.tb-step-title {
  font-weight: 500;
  margin: 0;
  font-size: 1.2em;
}

.tb-step-title > small {
  font-weight: normal;
  opacity: .8;
}

.tb-step-content {
  font-weight: normal;
  margin: 0;
}
`
        ],
        editModeStyles: [
            `
.tb-step-item-add {
  position: absolute;
  right:0;
  top: 0;
  display: none;
  cursor: pointer;
}

.tb-step-item-add:hover {
  transform: scale(1.2);
}

.tb-step-item-add:after {
  content: "+"
}
.tb-step-item:hover .tb-step-item-add {
  display: block;
}

.tb-step-item-icon {
  cursor: pointer;
}
`
        ]
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXh0YnVzL2NvbXBvbmVudHMvc3RlcC9zdGVwLmNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlILFdBQVcsRUFDWCxlQUFlLEVBQUUsSUFBSSxFQUNyQixVQUFVLEVBQ1YsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUMzQyxNQUFNLGVBQWUsQ0FBQztBQU92QixNQUFNLE9BQU8sUUFBUyxTQUFRLElBQUk7SUFDOUI7UUFDSSxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDeEIsQ0FBQztDQUNKO0FBS0QsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFDLGVBQWUsQ0FBNkI7SUFDbkUsSUFBSSxFQUFFLGVBQWU7SUFDckIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxjQUFjO0lBRWhDLEtBQUssQ0FBQyxJQUE4QjtRQUNoQyxNQUFNLFFBQVEsR0FBRyxVQUFVLEVBQUUsQ0FBQztRQUM5QixNQUFNLFVBQVUsR0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUUsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFFdkQsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQWtCLENBQUM7UUFDbEMsTUFBTSxnQkFBZ0IsR0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUEsRUFBRTtZQUM1QyxLQUFLLEdBQUMsUUFBUSxDQUFDO1lBQ2IsT0FBTyxDQUFD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LE9BQW9CO1FBQ3RCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLElBQUksT0FBTyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUE7SUFDckYsQ0FBQztJQUNELElBQUksQ0FBQyxPQUFvQixFQUFFLE9BQWlCLEVBQUUsVUFBc0I7UUFDbEUsSUFBSSxLQUFLLEdBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pELE9BQU8sVUFBVSxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUMsS0FBb0IsQ0FBQyxDQUFBO1FBQ3hELENBQUMsQ0FBQyxDQUFBO1FBQ0EsSUFBSSxTQUFTLEdBQVc7WUFDcEIsSUFBSSxFQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUUsQ0FBQztTQUMvQyxDQUFBO1FBRUQsdUVBQXVFO1FBQ3ZFLE9BQU8sYUFBYSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFDRCxTQUFTLEVBQUU7UUFDUCxNQUFNLEVBQUU7WUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBaUZYO1NBQ1E7UUFDRCxjQUFjLEVBQUU7WUFDWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F1Qlg7U0FDUTtLQUNKO0NBQ0osQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50RGF0YSxcclxuICAgIENvbXBvbmVudEluc3RhbmNlLFxyXG4gICAgQ29tcG9uZW50TWV0aG9kcyxcclxuICAgIENvbnRlbnRUeXBlLFxyXG4gICAgZGVmaW5lQ29tcG9uZW50LCBTbG90LCBTbG90UmVuZGVyLFxyXG4gICAgVHJhbnNsYXRvcixcclxuICAgIHVzZUNvbnRleHQsIHVzZVNsb3RzLCB1c2VTdGF0ZSwgVkVsZW1lbnRcclxufSBmcm9tIFwiQHRleHRidXMvY29yZVwiO1xyXG5pbXBvcnQge0NvbXBvbmVudExvYWRlciwgU2xvdFBhcnNlcn0gZnJvbSBcIkB0ZXh0YnVzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSBcIkB0YW5iby9kaVwiO1xyXG5pbXBvcnQge3RvZG9MaXN0U3RhdGV9IGZyb20gXCIuLi90b2RvTGlzdC90b2RvTGlzdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtTbG90TGl0ZXJhbH0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuaW1wb3J0IHtUaW1lbGluZUl0ZW1TbG90fSBmcm9tIFwiLi4vdGltZWxpbmUvdGltZWxpbmUuY29tcG9uZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RlcFNsb3QgZXh0ZW5kcyBTbG90e1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoW0NvbnRlbnRUeXBlLkJsb2NrQ29tcG9uZW50LENvbnRlbnRUeXBlLlRleHRdKTtcclxuICAgICAgICB0aGlzLndyaXRlKCfmoIfpophcXG7mj4/ov7AnKVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2Ugc3RlcFN0YXRle1xyXG4gICAgc3RlcDpudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHN0ZXBDb21wb25lbnQ9ZGVmaW5lQ29tcG9uZW50PENvbXBvbmVudE1ldGhvZHMsc3RlcFN0YXRlPih7XHJcbiAgICBuYW1lOiBcInN0ZXBDb21wb25lbnRcIixcclxuICAgIHR5cGU6IENvbnRlbnRUeXBlLkJsb2NrQ29tcG9uZW50LFxyXG5cclxuICAgIHNldHVwKGRhdGE6IENvbXBvbmVudERhdGE8c3RlcFN0YXRlPik6IENvbXBvbmVudE1ldGhvZHMge1xyXG4gICAgICAgIGNvbnN0IGluamVjdG9yID0gdXNlQ29udGV4dCgpO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0b3I9aW5qZWN0b3IuZ2V0KFRyYW5zbGF0b3IpO1xyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdXNlU2xvdHMoZGF0YS5zbG90cyB8fCBbIG5ldyBTdGVwU2xvdCgpXSlcclxuXHJcbiAgICAgICAgbGV0IHN0YXRlPWRhdGEuc3RhdGUgYXMgc3RlcFN0YXRlO1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZUNvbnRyb2xsZXI9dXNlU3RhdGUoc3RhdGUpO1xyXG4gICAgICAgIGNoYW5nZUNvbnRyb2xsZXIub25DaGFuZ2Uuc3Vic2NyaWJlKG5ld1N0YXRlPT57XHJcbiAgICAgICAgICBzdGF0ZT1uZXdTdGF0ZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZUNvbnRyb2xsZXInLHN0YXRlKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVuZGVyKGlzT3V0cHV0TW9kZTpib29sZWFuLCBzbG90UmVuZGVyOlNsb3RSZW5kZXIpe1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUl0ZW0gPSBmdW5jdGlvbihpdGVtLGluZGV4KXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2xhc3NlcyA9ICd0Yi13YWl0aW5nJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBzdGF0ZS5zdGVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgPSAndGItY29tcGxldGUnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gc3RhdGUuc3RlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzID0gJ3RiLWN1cnJlbnQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVkVsZW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiAndGItc3RlcC1pdGVtICcgKyBjbGFzc2VzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZFbGVtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJ0Yi1zdGVwLWl0ZW0taGVhZGVyXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZFbGVtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJ0Yi1zdGVwLWl0ZW0tbGluZVwiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVkVsZW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInRiLXN0ZXAtaXRlbS1pY29uXCIsIG9uQ2xpY2s6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFN0ZXAgPSBzdGF0ZS5zdGVwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3U3RlcD1jdXJyZW50U3RlcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IGN1cnJlbnRTdGVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTdGVwID0gaW5kZXggKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ICsgMSA9PT0gY3VycmVudFN0ZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1N0ZXAgPSBpbmRleCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTdGVwID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlQ29udHJvbGxlci51cGRhdGUoZHJhZnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZnQuc3RlcD1uZXdTdGVwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgaW5kZXggKyAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90UmVuZGVyKGl0ZW0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzPSd0Yi1zdGVwLWl0ZW0tY29udGVudCcvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIWlzT3V0cHV0TW9kZSAmJiBWRWxlbWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzOiBcInRiLXN0ZXAtaXRlbS1hZGRcIiwgb25DbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3RzLmluc2VydEJ5SW5kZXgobmV3IFN0ZXBTbG90KCksaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlvZPliY3mlrDmj5LlhaXnmoRpdGVt5ZCO6Z2i55qEaXRlbemcgOimgeabtOaWsOW6j+WPt1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUNvbnRyb2xsZXIudXBkYXRlKGRyYWZ0ID0+IHt9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0pXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBWRWxlbWVudC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOid0Yi1zdGVwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogc3RhdGUuc3RlcHx8MFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdHMudG9BcnJheSgpLm1hcCgoc2xvdCxpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlSXRlbShzbG90LGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSlcclxuZXhwb3J0IGNvbnN0IHN0ZXBDb21wb25lbnRMb2FkZXI6Q29tcG9uZW50TG9hZGVyPXtcclxuICAgIGNvbXBvbmVudDogc3RlcENvbXBvbmVudCxcclxuXHJcbiAgICBtYXRjaChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2RpdicgJiYgZWxlbWVudC5jbGFzc05hbWUgPT09ICd0Yi1zdGVwJ1xyXG4gICAgfSxcclxuICAgIHJlYWQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbnRleHQ6IEluamVjdG9yLCBzbG90UGFyc2VyOiBTbG90UGFyc2VyKSA6Q29tcG9uZW50SW5zdGFuY2V7XHJcbiAgICAgIGxldCBzbG90cz1BcnJheS5mcm9tKGVsZW1lbnQuY2hpbGRyZW4pLm1hcChjaGlsZCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNsb3RQYXJzZXIobmV3IFN0ZXBTbG90KCksY2hpbGQgYXMgSFRNTEVsZW1lbnQpXHJcbiAgICAgIH0pXHJcbiAgICAgICAgbGV0IGluaXRTdGF0ZTpzdGVwU3RhdGU9e1xyXG4gICAgICAgICAgICBzdGVwOk51bWJlcihlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3RlcCcpKXx8MCwgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jb25zdCBjb21wb25lbnQgPSBuZXcgVG9kb0xpc3RDb21wb25lbnQobGlzdENvbmZpZy5tYXAoaSA9PiBpLnNsb3QpKTtcclxuICAgICAgICByZXR1cm4gc3RlcENvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShjb250ZXh0LHtzbG90czpzbG90cyxzdGF0ZTppbml0U3RhdGV9KTtcclxuICAgIH0sXHJcbiAgICByZXNvdXJjZXM6IHtcclxuICAgICAgICBzdHlsZXM6IFtcclxuICAgICAgICAgICAgYFxyXG4udGItc3RlcCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxufVxyXG4udGItc3RlcC1pdGVtIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgZmxleDogMTtcclxufVxyXG5cclxuLnRiLXN0ZXAtaXRlbTpsYXN0LWNoaWxkIC50Yi1zdGVwLWl0ZW0tbGluZSB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuLnRiLXN0ZXAtaXRlbS50Yi1jb21wbGV0ZSAudGItc3RlcC1pdGVtLWxpbmUge1xyXG4gIGJvcmRlci10b3AtY29sb3I6ICMxNWJkOWE7XHJcbn1cclxuLnRiLXN0ZXAtaXRlbS50Yi1jb21wbGV0ZSAudGItc3RlcC1pdGVtLWljb24ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMxNWJkOWE7XHJcbn1cclxuXHJcbi50Yi1zdGVwLWl0ZW0udGItY3VycmVudCAudGItc3RlcC1pdGVtLWxpbmUge1xyXG4gIGJvcmRlci10b3Atc3R5bGU6IGRhc2hlZDtcclxufVxyXG4udGItc3RlcC1pdGVtLnRiLWN1cnJlbnQgLnRiLXN0ZXAtaXRlbS1pY29uIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTI5NmRiO1xyXG59XHJcblxyXG4udGItc3RlcC1pdGVtLnRiLXdhaXRpbmcgLnRiLXN0ZXAtaXRlbS1saW5lIHtcclxuICBib3JkZXItdG9wLXN0eWxlOiBkYXNoZWQ7XHJcbn1cclxuXHJcbi50Yi1zdGVwLWl0ZW0udGItd2FpdGluZyAudGItc3RlcC1pdGVtLWljb24ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNiYmJlYzQ7XHJcbn1cclxuLnRiLXN0ZXAtaXRlbS50Yi13YWl0aW5nIC50Yi1zdGVwLWl0ZW0tY29udGVudCB7XHJcbiAgb3BhY2l0eTogLjg7XHJcbn1cclxuXHJcbi50Yi1zdGVwLWl0ZW0taGVhZGVyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xyXG59XHJcblxyXG4udGItc3RlcC1pdGVtLWljb24ge1xyXG4gIHdpZHRoOiAxLjZlbTtcclxuICBoZWlnaHQ6IDEuNmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjZlbTtcclxuICBjb2xvcjogI2ZmZjtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG59XHJcblxyXG4udGItc3RlcC1pdGVtLWxpbmUge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDUwJTtcclxuICBsZWZ0OiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGRkZWUxO1xyXG59XHJcblxyXG4udGItc3RlcC1pdGVtLWNvbnRlbnQge1xyXG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XHJcbn1cclxuXHJcbi50Yi1zdGVwLXRpdGxlIHtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIG1hcmdpbjogMDtcclxuICBmb250LXNpemU6IDEuMmVtO1xyXG59XHJcblxyXG4udGItc3RlcC10aXRsZSA+IHNtYWxsIHtcclxuICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gIG9wYWNpdHk6IC44O1xyXG59XHJcblxyXG4udGItc3RlcC1jb250ZW50IHtcclxuICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG5gXHJcbiAgICAgICAgXSxcclxuICAgICAgICBlZGl0TW9kZVN0eWxlczogW1xyXG4gICAgICAgICAgICBgXHJcbi50Yi1zdGVwLWl0ZW0tYWRkIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgcmlnaHQ6MDtcclxuICB0b3A6IDA7XHJcbiAgZGlzcGxheTogbm9uZTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi50Yi1zdGVwLWl0ZW0tYWRkOmhvdmVyIHtcclxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XHJcbn1cclxuXHJcbi50Yi1zdGVwLWl0ZW0tYWRkOmFmdGVyIHtcclxuICBjb250ZW50OiBcIitcIlxyXG59XHJcbi50Yi1zdGVwLWl0ZW06aG92ZXIgLnRiLXN0ZXAtaXRlbS1hZGQge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4udGItc3RlcC1pdGVtLWljb24ge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5gXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxufSJdfQ==