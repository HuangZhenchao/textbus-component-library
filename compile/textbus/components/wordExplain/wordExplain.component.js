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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZEV4cGxhaW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGV4dGJ1cy9jb21wb25lbnRzL3dvcmRFeHBsYWluL3dvcmRFeHBsYWluLmNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlILFdBQVcsRUFDWCxlQUFlLEVBQUUsSUFBSSxFQUNyQixVQUFVLEVBQ1YsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUMzQyxNQUFNLGVBQWUsQ0FBQztBQU12QixNQUFNLE9BQU8sb0JBQXFCLFNBQVEsSUFBSTtJQUMxQztRQUNJLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDcEIsQ0FBQztDQUNKO0FBQ0QsTUFBTSxPQUFPLHVCQUF3QixTQUFRLElBQUk7SUFDN0M7UUFDSSxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3JCLENBQUM7Q0FDSjtBQUNELE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxJQUFJO0lBQzNDO1FBQ0ksS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBQyxXQUFXLENBQUMsSUFBSSxFQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDL0IsQ0FBQztDQUNKO0FBTUQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFDLGVBQWUsQ0FBb0M7SUFDakYsSUFBSSxFQUFFLHNCQUFzQjtJQUM1QixJQUFJLEVBQUUsV0FBVyxDQUFDLGNBQWM7SUFFaEMsS0FBSyxDQUFDLElBQXFDO1FBQ3ZDLE1BQU0s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RSxLQUFLLEtBQUssSUFBSSxPQUFPLENBQUMsU0FBUyxLQUFLLGlCQUFpQixDQUFBO0lBQzdGLENBQUM7SUFDRCxJQUFJLENBQUMsT0FBb0IsRUFBRSxPQUFpQixFQUFFLFVBQXNCO1FBQ2hFLElBQUksS0FBSyxHQUFDLENBQUMsVUFBVSxDQUFDLElBQUksb0JBQW9CLEVBQUUsRUFBQyxPQUFPLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFnQixDQUFDO1lBQ2hILFVBQVUsQ0FBQyxJQUFJLHVCQUF1QixFQUFFLEVBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBZ0IsQ0FBQztZQUMzRyxVQUFVLENBQUMsSUFBSSxxQkFBcUIsRUFBRSxFQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQWdCLENBQUMsQ0FBQyxDQUFBO1FBQ3hHLElBQUksU0FBUyxHQUFrQjtZQUMzQixLQUFLLEVBQUMsT0FBTztTQUNoQixDQUFBO1FBRUQsdUVBQXVFO1FBQ3ZFLE9BQU8sb0JBQW9CLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBQyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUNELFNBQVMsRUFBRTtRQUNQLE1BQU0sRUFBRTtZQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FtRFg7U0FDUTtRQUNELGNBQWMsRUFBRTtZQUNaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBc0JYO1NBQ1E7S0FDSjtDQUNKLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50RGF0YSxcclxuICAgIENvbXBvbmVudEluc3RhbmNlLFxyXG4gICAgQ29tcG9uZW50TWV0aG9kcyxcclxuICAgIENvbnRlbnRUeXBlLFxyXG4gICAgZGVmaW5lQ29tcG9uZW50LCBTbG90LCBTbG90UmVuZGVyLFxyXG4gICAgVHJhbnNsYXRvcixcclxuICAgIHVzZUNvbnRleHQsIHVzZVNsb3RzLCB1c2VTdGF0ZSwgVkVsZW1lbnRcclxufSBmcm9tIFwiQHRleHRidXMvY29yZVwiO1xyXG5pbXBvcnQge0NvbXBvbmVudExvYWRlciwgU2xvdFBhcnNlcn0gZnJvbSBcIkB0ZXh0YnVzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSBcIkB0YW5iby9kaVwiO1xyXG5pbXBvcnQge1Nsb3RMaXRlcmFsfSBmcm9tIFwiQHRleHRidXMvY29yZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBXb3JkRXhwbGFpblRpdGxlU2xvdCBleHRlbmRzIFNsb3R7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihbQ29udGVudFR5cGUuVGV4dF0pO1xyXG4gICAgICAgIHRoaXMud3JpdGUoJ+agh+mimCcpXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFdvcmRFeHBsYWluU3VidGl0bGVTbG90IGV4dGVuZHMgU2xvdHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFtDb250ZW50VHlwZS5UZXh0XSk7XHJcbiAgICAgICAgdGhpcy53cml0ZSgn5Ymv5qCH6aKYJylcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgV29yZEV4cGxhaW5EZXRhaWxTbG90IGV4dGVuZHMgU2xvdHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFtDb250ZW50VHlwZS5CbG9ja0NvbXBvbmVudCxDb250ZW50VHlwZS5UZXh0LENvbnRlbnRUeXBlLklubGluZUNvbXBvbmVudF0pO1xyXG4gICAgICAgIHRoaXMud3JpdGUoJzxkaXY+5o+P6L+wPC9kaXY+JylcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSB3b3JkRXhwbGFpblN0YXRle1xyXG4gICAgd2lkdGg6c3RyaW5nLFxyXG4gICAgXHJcbn1cclxuLyoqXHJcbiAqIHRpdGxlU2xvdDpXb3JkRXhwbGFpblRpdGxlU2xvdCxcclxuICAgIHN1YnRpdGxlU2xvdDpXb3JkRXhwbGFpblN1YnRpdGxlU2xvdCxcclxuICAgIGRldGFpbFNsb3Q6V29yZEV4cGxhaW5EZXRhaWxTbG90LFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHdvcmRFeHBsYWluQ29tcG9uZW50PWRlZmluZUNvbXBvbmVudDxDb21wb25lbnRNZXRob2RzLHdvcmRFeHBsYWluU3RhdGU+KHtcclxuICAgIG5hbWU6IFwid29yZEV4cGxhaW5Db21wb25lbnRcIixcclxuICAgIHR5cGU6IENvbnRlbnRUeXBlLkJsb2NrQ29tcG9uZW50LFxyXG5cclxuICAgIHNldHVwKGRhdGE6IENvbXBvbmVudERhdGE8d29yZEV4cGxhaW5TdGF0ZT4pOiBDb21wb25lbnRNZXRob2RzIHtcclxuICAgICAgICBjb25zdCBpbmplY3RvciA9IHVzZUNvbnRleHQoKTtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdG9yPWluamVjdG9yLmdldChUcmFuc2xhdG9yKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXRlPWRhdGEuc3RhdGUgYXMgd29yZEV4cGxhaW5TdGF0ZVxyXG4gICAgICAgIGxldCBzbG90cz11c2VTbG90cyhkYXRhLnNsb3RzISlcclxuICAgICAgICBjb25zdCBjaGFuZ2VDb250cm9sbGVyPXVzZVN0YXRlKHN0YXRlKTtcclxuICAgICAgICBjaGFuZ2VDb250cm9sbGVyLm9uQ2hhbmdlLnN1YnNjcmliZShuZXdTdGF0ZT0+e1xyXG4gICAgICAgICAgICBzdGF0ZT1uZXdTdGF0ZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZUNvbnRyb2xsZXInLHN0YXRlKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVuZGVyKGlzT3V0cHV0TW9kZTpib29sZWFuLCBzbG90UmVuZGVyOlNsb3RSZW5kZXIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChWRWxlbWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzczondGItd29yZC1leHBsYWluJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgVkVsZW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInRiLXdvcmQtZXhwbGFpbi10aXRsZS1ncm91cFwiLCBzdHlsZTogeyB3aWR0aDogc3RhdGUhLndpZHRoIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgIHNsb3RzLmdldCgwKT9zbG90UmVuZGVyKHNsb3RzLmdldCgwKSEsICgpPT57cmV0dXJuIFZFbGVtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJ0Yi13b3JkLWV4cGxhaW4tdGl0bGVcIiB9KX0pOicnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90cy5nZXQoMSk/c2xvdFJlbmRlcihzbG90cy5nZXQoMSkhLCAoKT0+e3JldHVybiBWRWxlbWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwidGItd29yZC1leHBsYWluLXN1YnRpdGxlXCIgfSl9KTonJ1xyXG4gICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdHMuZ2V0KDIpP3Nsb3RSZW5kZXIoc2xvdHMuZ2V0KDIpISwgKCk9PntyZXR1cm4gVkVsZW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInRiLXdvcmQtZXhwbGFpbi1kZXRhaWxcIiB9KX0pOlwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgIWlzT3V0cHV0TW9kZSAmJiBWRWxlbWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzOiBcInRiLXdvcmQtZXhwbGFpbi1jbG9zZVwiLCBvbkNsaWNrOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHNsb3RzLmdldCgwKT8ucGFyZW50IGFzIENvbXBvbmVudEluc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcFNsb3QgPSBpbnN0YW5jZT8ucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZScscFNsb3Q/LnJlbW92ZUNvbXBvbmVudChpbnN0YW5jZSkpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pXHJcbmV4cG9ydCBjb25zdCB3b3JkRXhwbGFpbkNvbXBvbmVudExvYWRlcjpDb21wb25lbnRMb2FkZXI9e1xyXG4gICAgY29tcG9uZW50OiB3b3JkRXhwbGFpbkNvbXBvbmVudCxcclxuXHJcbiAgICBtYXRjaChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2RpdicgJiYgZWxlbWVudC5jbGFzc05hbWUgPT09ICd0Yi13b3JkLWV4cGxhaW4nXHJcbiAgICB9LFxyXG4gICAgcmVhZChlbGVtZW50OiBIVE1MRWxlbWVudCwgY29udGV4dDogSW5qZWN0b3IsIHNsb3RQYXJzZXI6IFNsb3RQYXJzZXIpIDpDb21wb25lbnRJbnN0YW5jZXtcclxuICAgICAgICBsZXQgc2xvdHM9W3Nsb3RQYXJzZXIobmV3IFdvcmRFeHBsYWluVGl0bGVTbG90KCksZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGItd29yZC1leHBsYWluLXRpdGxlJykgYXMgSFRNTEVsZW1lbnQpLFxyXG4gICAgICAgIHNsb3RQYXJzZXIobmV3IFdvcmRFeHBsYWluU3VidGl0bGVTbG90KCksZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGItd29yZC1leHBsYWluLXN1YnRpdGxlJykgYXMgSFRNTEVsZW1lbnQpLFxyXG4gICAgICAgIHNsb3RQYXJzZXIobmV3IFdvcmRFeHBsYWluRGV0YWlsU2xvdCgpLGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRiLXdvcmQtZXhwbGFpbi1kZXRhaWwnKSBhcyBIVE1MRWxlbWVudCldXHJcbiAgICAgICAgbGV0IGluaXRTdGF0ZTp3b3JkRXhwbGFpblN0YXRlPXtcclxuICAgICAgICAgICAgd2lkdGg6JzIwMHB4JyxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY29uc3QgY29tcG9uZW50ID0gbmV3IFRvZG9MaXN0Q29tcG9uZW50KGxpc3RDb25maWcubWFwKGkgPT4gaS5zbG90KSk7XHJcbiAgICAgICAgcmV0dXJuIHdvcmRFeHBsYWluQ29tcG9uZW50LmNyZWF0ZUluc3RhbmNlKGNvbnRleHQse3Nsb3RzOnNsb3RzLHN0YXRlOmluaXRTdGF0ZX0pO1xyXG4gICAgfSxcclxuICAgIHJlc291cmNlczoge1xyXG4gICAgICAgIHN0eWxlczogW1xyXG4gICAgICAgICAgICBgXHJcbi50Yi13b3JkLWV4cGxhaW4ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgbWFyZ2luLXRvcDogMWVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDFlbTtcclxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjhmOTtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG59XHJcblxyXG4udGItd29yZC1leHBsYWluLXRpdGxlLWdyb3VwIHtcclxuICB3aWR0aDogMTQwcHg7XHJcbiAgcGFkZGluZy1yaWdodDogMjBweDtcclxufVxyXG4udGItd29yZC1leHBsYWluLXRpdGxlIHtcclxuICBtYXJnaW46MDtcclxuICBmb250LXNpemU6IGluaGVyaXQ7XHJcbn1cclxuLnRiLXdvcmQtZXhwbGFpbi1zdWJ0aXRsZSB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgZm9udC1zaXplOiAwLjllbTtcclxufVxyXG4udGItd29yZC1leHBsYWluLWRldGFpbCB7XHJcbiAgZmxleDogMTtcclxuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XHJcbiAgYm9yZGVyLWxlZnQ6IDFweCBkYXNoZWQgI2RkZDtcclxufVxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gIC50Yi13b3JkLWV4cGxhaW4ge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgfVxyXG4gIC50Yi13b3JkLWV4cGxhaW4tdGl0bGUtZ3JvdXAge1xyXG4gICAgd2lkdGg6IGF1dG8gIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDA7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDAuNWVtO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMC41ZW07XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggZGFzaGVkICNkZGQ7XHJcbiAgfVxyXG4gIC50Yi13b3JkLWV4cGxhaW4tc3VidGl0bGUge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDAuNWVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICAgIGZvbnQtc2l6ZTogMC45ZW07XHJcbiAgfVxyXG4gIC50Yi13b3JkLWV4cGxhaW4tZGV0YWlsIHtcclxuICAgIHBhZGRpbmctbGVmdDogMDtcclxuICAgIGJvcmRlci1sZWZ0OiBub25lO1xyXG4gIH1cclxufVxyXG5gXHJcbiAgICAgICAgXSxcclxuICAgICAgICBlZGl0TW9kZVN0eWxlczogW1xyXG4gICAgICAgICAgICBgXHJcbi50Yi13b3JkLWV4cGxhaW4ge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG4udGItd29yZC1leHBsYWluOmhvdmVyIC50Yi13b3JkLWV4cGxhaW4tY2xvc2Uge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcbi50Yi13b3JkLWV4cGxhaW4tY2xvc2Uge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHJpZ2h0OiAxMHB4O1xyXG4gIHRvcDogMDtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgbGluZS1oZWlnaHQ6IDE7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbi50Yi13b3JkLWV4cGxhaW4tY2xvc2U6aG92ZXIge1xyXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcclxufVxyXG4udGItd29yZC1leHBsYWluLWNsb3NlOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXHUwMGQ3XCI7XHJcbn1cclxuYFxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbn0iXX0=