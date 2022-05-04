import { ContentType, defineComponent, Slot, Translator, useContext, useSlots, useState, VElement } from "@textbus/core";
export class WordExplainTitleSlot extends Slot {
    constructor() {
        super([ContentType.Text]);
        this.write('标题');
    }
}
export class WordExplainSubtitleSlot extends Slot {
    constructor() {
        super([ContentType.Text]);
        this.write('副标题');
    }
}
export class WordExplainDetailSlot extends Slot {
    constructor() {
        super([ContentType.BlockComponent, ContentType.Text, ContentType.InlineComponent]);
        this.write('<div>描述</div>');
    }
}
/**
 * titleSlot:WordExplainTitleSlot,
    subtitleSlot:WordExplainSubtitleSlot,
    detailSlot:WordExplainDetailSlot,
 */
export const wordExplainComponent = defineComponent({
    name: "wordExplainComponent",
    type: ContentType.BlockComponent,
    setup(data) {
        const injector = useContext();
        const translator = injector.get(Translator);
        let state = data.state;
        let slots = useSlots(data.slots);
        const changeController = useState(state);
        changeController.onChange.subscribe(newState => {
            state = newState;
            console.log('changeController', state);
        });
        return {
            render(isOutputMode, slotRender) {
                return (VElement.createElement("div", { class: 'tb-word-explain' }, VElement.createElement("div", { class: "tb-word-explain-title-group", style: { width: state.width } }, slots.get(0) ? slotRender(slots.get(0), () => { return VElement.createElement("div", { class: "tb-word-explain-title" }); }) : '', slots.get(1) ? slotRender(slots.get(1), () => { return VElement.createElement("div", { class: "tb-word-explain-subtitle" }); }) : ''), slots.get(2) ? slotRender(slots.get(2), () => { return VElement.createElement("div", { class: "tb-word-explain-detail" }); }) : "", !isOutputMode && VElement.createElement("span", { class: "tb-word-explain-close", onClick: () => {
                        var _a;
                        const instance = (_a = slots.get(0)) === null || _a === void 0 ? void 0 : _a.parent;
                        const pSlot = instance === null || instance === void 0 ? void 0 : instance.parent;
                        console.log('delete', pSlot === null || pSlot === void 0 ? void 0 : pSlot.removeComponent(instance));
                    } })));
            },
        };
    }
});
export const wordExplainComponentLoader = {
    component: wordExplainComponent,
    match(element) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-word-explain';
    },
    read(element, context, slotParser) {
        let slots = [slotParser(new WordExplainTitleSlot(), element.querySelector('.tb-word-explain-title')),
            slotParser(new WordExplainSubtitleSlot(), element.querySelector('.tb-word-explain-subtitle')),
            slotParser(new WordExplainDetailSlot(), element.querySelector('.tb-word-explain-detail'))];
        let initState = {
            width: '200px',
        };
        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        return wordExplainComponent.createInstance(context, { slots: slots, state: initState });
    },
    resources: {
        styles: [
            `
.tb-word-explain {
  display: flex;
  margin-top: 1em;
  margin-bottom: 1em;
  padding: 10px 20px;
  background-color: #f8f8f9;
  border-radius: 10px;
}

.tb-word-explain-title-group {
  width: 140px;
  padding-right: 20px;
}
.tb-word-explain-title {
  margin:0;
  font-size: inherit;
}
.tb-word-explain-subtitle {
  margin: 0;
  font-weight: 300;
  font-size: 0.9em;
}
.tb-word-explain-detail {
  flex: 1;
  padding-left: 20px;
  border-left: 1px dashed #ddd;
}
@media screen and (max-width: 767px) {
  .tb-word-explain {
    display: block;
  }
  .tb-word-explain-title-group {
    width: auto !important;
    padding-right: 0;
    display: flex;
    align-items: baseline;
    padding-bottom: 0.5em;
    margin-bottom: 0.5em;
    border-bottom: 1px dashed #ddd;
  }
  .tb-word-explain-subtitle {
    margin-left: 0.5em;
    font-weight: 300;
    font-size: 0.9em;
  }
  .tb-word-explain-detail {
    padding-left: 0;
    border-left: none;
  }
}
`
        ],
        editModeStyles: [
            `
.tb-word-explain {
  position: relative;
}
.tb-word-explain:hover .tb-word-explain-close {
  display: block;
}
.tb-word-explain-close {
  display: none;
  position: absolute;
  right: 10px;
  top: 0;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}
.tb-word-explain-close:hover {
  transform: scale(1.2);
}
.tb-word-explain-close:before {
  content: "\u00d7";
}
`
        ]
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZEV4cGxhaW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGV4dGJ1cy9jb21wb25lbnRzL3dvcmRFeHBsYWluL3dvcmRFeHBsYWluLmNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlILFdBQVcsRUFDWCxlQUFlLEVBQUUsSUFBSSxFQUNyQixVQUFVLEVBQ1YsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUMzQyxNQUFNLGVBQWUsQ0FBQztBQU12QixNQUFNLE9BQU8sb0JBQXFCLFNBQVEsSUFBSTtJQUMxQztRQUNJLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDcEIsQ0FBQztDQUNKO0FBQ0QsTUFBTSxPQUFPLHVCQUF3QixTQUFRLElBQUk7SUFDN0M7UUFDSSxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3JCLENBQUM7Q0FDSjtBQUNELE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxJQUFJO0lBQzNDO1FBQ0ksS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBQyxXQUFXLENBQUMsSUFBSSxFQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDL0IsQ0FBQztDQUNKO0FBTUQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFDLGVBQWUsQ0FBb0M7SUFDakYsSUFBSSxFQUFFLHNCQUFzQjtJQUM1QixJQUFJLEVBQUUsV0FBVyxDQUFDLGNBQWM7SUFFaEMsS0FBSyxDQUFDLElBQXFDO1FBQ3ZDLE1BQU0s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SyxLQUFLLElBQUksT0FBTyxDQUFDLFNBQVMsS0FBSyxpQkFBaUIsQ0FBQTtJQUM3RixDQUFDO0lBQ0QsSUFBSSxDQUFDLE9BQW9CLEVBQUUsT0FBaUIsRUFBRSxVQUFzQjtRQUNoRSxJQUFJLEtBQUssR0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLG9CQUFvQixFQUFFLEVBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBZ0IsQ0FBQztZQUNoSCxVQUFVLENBQUMsSUFBSSx1QkFBdUIsRUFBRSxFQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQWdCLENBQUM7WUFDM0csVUFBVSxDQUFDLElBQUkscUJBQXFCLEVBQUUsRUFBQyxPQUFPLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFnQixDQUFDLENBQUMsQ0FBQTtRQUN4RyxJQUFJLFNBQVMsR0FBa0I7WUFDM0IsS0FBSyxFQUFDLE9BQU87U0FDaEIsQ0FBQTtRQUVELHVFQUF1RTtRQUN2RSxPQUFPLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFDRCxTQUFTLEVBQUU7UUFDUCxNQUFNLEVBQUU7WUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBbURYO1NBQ1E7UUFDRCxjQUFjLEVBQUU7WUFDWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXNCWDtTQUNRO0tBQ0o7Q0FDSixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudERhdGEsXHJcbiAgICBDb21wb25lbnRJbnN0YW5jZSxcclxuICAgIENvbXBvbmVudE1ldGhvZHMsXHJcbiAgICBDb250ZW50VHlwZSxcclxuICAgIGRlZmluZUNvbXBvbmVudCwgU2xvdCwgU2xvdFJlbmRlcixcclxuICAgIFRyYW5zbGF0b3IsXHJcbiAgICB1c2VDb250ZXh0LCB1c2VTbG90cywgdXNlU3RhdGUsIFZFbGVtZW50XHJcbn0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuaW1wb3J0IHtDb21wb25lbnRMb2FkZXIsIFNsb3RQYXJzZXJ9IGZyb20gXCJAdGV4dGJ1cy9icm93c2VyXCI7XHJcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gXCJAdGFuYm8vZGlcIjtcclxuaW1wb3J0IHtTbG90TGl0ZXJhbH0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgV29yZEV4cGxhaW5UaXRsZVNsb3QgZXh0ZW5kcyBTbG90e1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoW0NvbnRlbnRUeXBlLlRleHRdKTtcclxuICAgICAgICB0aGlzLndyaXRlKCfmoIfpopgnKVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBXb3JkRXhwbGFpblN1YnRpdGxlU2xvdCBleHRlbmRzIFNsb3R7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbQ29udGVudFR5cGUuVGV4dF0pO1xyXG4gICAgICAgIHRoaXMud3JpdGUoJ+WJr+agh+mimCcpXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFdvcmRFeHBsYWluRGV0YWlsU2xvdCBleHRlbmRzIFNsb3R7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbQ29udGVudFR5cGUuQmxvY2tDb21wb25lbnQsQ29udGVudFR5cGUuVGV4dCxDb250ZW50VHlwZS5JbmxpbmVDb21wb25lbnRdKTtcclxuICAgICAgICB0aGlzLndyaXRlKCc8ZGl2PuaPj+i/sDwvZGl2PicpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2Ugd29yZEV4cGxhaW5TdGF0ZXtcclxuICAgIHdpZHRoOnN0cmluZyxcclxuICAgIFxyXG59XHJcbi8qKlxyXG4gKiB0aXRsZVNsb3Q6V29yZEV4cGxhaW5UaXRsZVNsb3QsXHJcbiAgICBzdWJ0aXRsZVNsb3Q6V29yZEV4cGxhaW5TdWJ0aXRsZVNsb3QsXHJcbiAgICBkZXRhaWxTbG90OldvcmRFeHBsYWluRGV0YWlsU2xvdCxcclxuICovXHJcbmV4cG9ydCBjb25zdCB3b3JkRXhwbGFpbkNvbXBvbmVudD1kZWZpbmVDb21wb25lbnQ8Q29tcG9uZW50TWV0aG9kcyx3b3JkRXhwbGFpblN0YXRlPih7XHJcbiAgICBuYW1lOiBcIndvcmRFeHBsYWluQ29tcG9uZW50XCIsXHJcbiAgICB0eXBlOiBDb250ZW50VHlwZS5CbG9ja0NvbXBvbmVudCxcclxuXHJcbiAgICBzZXR1cChkYXRhOiBDb21wb25lbnREYXRhPHdvcmRFeHBsYWluU3RhdGU+KTogQ29tcG9uZW50TWV0aG9kcyB7XHJcbiAgICAgICAgY29uc3QgaW5qZWN0b3IgPSB1c2VDb250ZXh0KCk7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRvcj1pbmplY3Rvci5nZXQoVHJhbnNsYXRvcik7XHJcblxyXG4gICAgICAgIGxldCBzdGF0ZT1kYXRhLnN0YXRlIGFzIHdvcmRFeHBsYWluU3RhdGVcclxuICAgICAgICBsZXQgc2xvdHM9dXNlU2xvdHMoZGF0YS5zbG90cyEpXHJcbiAgICAgICAgY29uc3QgY2hhbmdlQ29udHJvbGxlcj11c2VTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgY2hhbmdlQ29udHJvbGxlci5vbkNoYW5nZS5zdWJzY3JpYmUobmV3U3RhdGU9PntcclxuICAgICAgICAgICAgc3RhdGU9bmV3U3RhdGU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VDb250cm9sbGVyJyxzdGF0ZSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlbmRlcihpc091dHB1dE1vZGU6Ym9vbGVhbiwgc2xvdFJlbmRlcjpTbG90UmVuZGVyKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoVkVsZW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3M6J3RiLXdvcmQtZXhwbGFpbid9LFxyXG4gICAgICAgICAgICAgICAgICAgIFZFbGVtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJ0Yi13b3JkLWV4cGxhaW4tdGl0bGUtZ3JvdXBcIiwgc3R5bGU6IHsgd2lkdGg6IHN0YXRlIS53aWR0aCB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICBzbG90cy5nZXQoMCk/c2xvdFJlbmRlcihzbG90cy5nZXQoMCkhLCAoKT0+e3JldHVybiBWRWxlbWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwidGItd29yZC1leHBsYWluLXRpdGxlXCIgfSl9KTonJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xvdHMuZ2V0KDEpP3Nsb3RSZW5kZXIoc2xvdHMuZ2V0KDEpISwgKCk9PntyZXR1cm4gVkVsZW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInRiLXdvcmQtZXhwbGFpbi1zdWJ0aXRsZVwiIH0pfSk6JydcclxuICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3RzLmdldCgyKT9zbG90UmVuZGVyKHNsb3RzLmdldCgyKSEsICgpPT57cmV0dXJuIFZFbGVtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJ0Yi13b3JkLWV4cGxhaW4tZGV0YWlsXCIgfSl9KTpcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICFpc091dHB1dE1vZGUgJiYgVkVsZW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzczogXCJ0Yi13b3JkLWV4cGxhaW4tY2xvc2VcIiwgb25DbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBzbG90cy5nZXQoMCk/LnBhcmVudCBhcyBDb21wb25lbnRJbnN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBTbG90ID0gaW5zdGFuY2U/LnBhcmVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZWxldGUnLHBTbG90Py5yZW1vdmVDb21wb25lbnQoaW5zdGFuY2UpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KVxyXG5leHBvcnQgY29uc3Qgd29yZEV4cGxhaW5Db21wb25lbnRMb2FkZXI6Q29tcG9uZW50TG9hZGVyPXtcclxuICAgIGNvbXBvbmVudDogd29yZEV4cGxhaW5Db21wb25lbnQsXHJcblxyXG4gICAgbWF0Y2goZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdkaXYnICYmIGVsZW1lbnQuY2xhc3NOYW1lID09PSAndGItd29yZC1leHBsYWluJ1xyXG4gICAgfSxcclxuICAgIHJlYWQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbnRleHQ6IEluamVjdG9yLCBzbG90UGFyc2VyOiBTbG90UGFyc2VyKSA6Q29tcG9uZW50SW5zdGFuY2V7XHJcbiAgICAgICAgbGV0IHNsb3RzPVtzbG90UGFyc2VyKG5ldyBXb3JkRXhwbGFpblRpdGxlU2xvdCgpLGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRiLXdvcmQtZXhwbGFpbi10aXRsZScpIGFzIEhUTUxFbGVtZW50KSxcclxuICAgICAgICBzbG90UGFyc2VyKG5ldyBXb3JkRXhwbGFpblN1YnRpdGxlU2xvdCgpLGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRiLXdvcmQtZXhwbGFpbi1zdWJ0aXRsZScpIGFzIEhUTUxFbGVtZW50KSxcclxuICAgICAgICBzbG90UGFyc2VyKG5ldyBXb3JkRXhwbGFpbkRldGFpbFNsb3QoKSxlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50Yi13b3JkLWV4cGxhaW4tZGV0YWlsJykgYXMgSFRNTEVsZW1lbnQpXVxyXG4gICAgICAgIGxldCBpbml0U3RhdGU6d29yZEV4cGxhaW5TdGF0ZT17XHJcbiAgICAgICAgICAgIHdpZHRoOicyMDBweCcsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NvbnN0IGNvbXBvbmVudCA9IG5ldyBUb2RvTGlzdENvbXBvbmVudChsaXN0Q29uZmlnLm1hcChpID0+IGkuc2xvdCkpO1xyXG4gICAgICAgIHJldHVybiB3b3JkRXhwbGFpbkNvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShjb250ZXh0LHtzbG90czpzbG90cyxzdGF0ZTppbml0U3RhdGV9KTtcclxuICAgIH0sXHJcbiAgICByZXNvdXJjZXM6IHtcclxuICAgICAgICBzdHlsZXM6IFtcclxuICAgICAgICAgICAgYFxyXG4udGItd29yZC1leHBsYWluIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIG1hcmdpbi10b3A6IDFlbTtcclxuICBtYXJnaW4tYm90dG9tOiAxZW07XHJcbiAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY4Zjk7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxufVxyXG5cclxuLnRiLXdvcmQtZXhwbGFpbi10aXRsZS1ncm91cCB7XHJcbiAgd2lkdGg6IDE0MHB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDIwcHg7XHJcbn1cclxuLnRiLXdvcmQtZXhwbGFpbi10aXRsZSB7XHJcbiAgbWFyZ2luOjA7XHJcbiAgZm9udC1zaXplOiBpbmhlcml0O1xyXG59XHJcbi50Yi13b3JkLWV4cGxhaW4tc3VidGl0bGUge1xyXG4gIG1hcmdpbjogMDtcclxuICBmb250LXdlaWdodDogMzAwO1xyXG4gIGZvbnQtc2l6ZTogMC45ZW07XHJcbn1cclxuLnRiLXdvcmQtZXhwbGFpbi1kZXRhaWwge1xyXG4gIGZsZXg6IDE7XHJcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xyXG4gIGJvcmRlci1sZWZ0OiAxcHggZGFzaGVkICNkZGQ7XHJcbn1cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcclxuICAudGItd29yZC1leHBsYWluIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gIH1cclxuICAudGItd29yZC1leHBsYWluLXRpdGxlLWdyb3VwIHtcclxuICAgIHdpZHRoOiBhdXRvICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcclxuICAgIHBhZGRpbmctYm90dG9tOiAwLjVlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IDAuNWVtO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IGRhc2hlZCAjZGRkO1xyXG4gIH1cclxuICAudGItd29yZC1leHBsYWluLXN1YnRpdGxlIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAwLjVlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgICBmb250LXNpemU6IDAuOWVtO1xyXG4gIH1cclxuICAudGItd29yZC1leHBsYWluLWRldGFpbCB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XHJcbiAgICBib3JkZXItbGVmdDogbm9uZTtcclxuICB9XHJcbn1cclxuYFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZWRpdE1vZGVTdHlsZXM6IFtcclxuICAgICAgICAgICAgYFxyXG4udGItd29yZC1leHBsYWluIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuLnRiLXdvcmQtZXhwbGFpbjpob3ZlciAudGItd29yZC1leHBsYWluLWNsb3NlIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG4udGItd29yZC1leHBsYWluLWNsb3NlIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICByaWdodDogMTBweDtcclxuICB0b3A6IDA7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4udGItd29yZC1leHBsYWluLWNsb3NlOmhvdmVyIHtcclxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XHJcbn1cclxuLnRiLXdvcmQtZXhwbGFpbi1jbG9zZTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFx1MDBkN1wiO1xyXG59XHJcbmBcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG59Il19