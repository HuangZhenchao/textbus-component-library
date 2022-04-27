import { Commander, ContentType, defineComponent, Slot, Selection, Translator, useContext, useSlots, useState, VElement, onContextMenu, onEnter } from '@textbus/core';
import { SlotComplete } from "../type";
import { Dialog, Form, FormSelect, FormSwitch } from "@textbus/editor";
export const alertComponent = defineComponent({
    type: ContentType.BlockComponent,
    name: 'AlertComponent',
    setup(data) {
        const injector = useContext();
        const translator = injector.get(Translator);
        const dialog = injector.get(Dialog);
        const selection = injector.get(Selection);
        const slots = useSlots(data.slots || [new Slot([ContentType.Text]), new SlotComplete()]);
        let state = data.state;
        const changeController = useState(state);
        changeController.onChange.subscribe(newState => {
            state = newState;
            console.log('changeController', state);
        });
        const form = new Form({
            confirmBtnText: '确定',
            items: [
                new FormSelect({
                    name: 'type',
                    label: '类型',
                    options: 'default,primary,info,success,warning,danger,dark,gray'.split(',').map(i => {
                        return {
                            label: i,
                            value: i,
                            selected: i === state.type
                        };
                    })
                }),
                new FormSwitch({
                    label: '是否填充',
                    name: 'fill',
                    checked: state.fill
                })
            ]
        });
        form.onComplete.subscribe(map => {
            console.log('component', state);
            changeController.update(draft => {
                draft.fill = map.get('fill');
                draft.type = map.get('type');
            });
            dialog.hide();
        });
        form.onCancel.subscribe(() => {
            dialog.hide();
        });
        onContextMenu(() => {
            let submenu = 'default,primary,info,success,warning,danger,dark,gray'.split(',').map(i => {
                return {
                    label: i,
                    onClick() {
                        changeController.update(draft => {
                            draft.type = i;
                        });
                    }
                };
            });
            return [{
                    label: "警告框设置类型",
                    submenu: submenu
                },
                {
                    label: "警告框设置填充",
                    submenu: [{
                            label: "是",
                            onClick() {
                                changeController.update(draft => {
                                    draft.fill = true;
                                });
                            }
                        },
                        {
                            label: "否",
                            onClick() {
                                changeController.update(draft => {
                                    draft.fill = false;
                                });
                            }
                        }]
                }];
        });
        onEnter(ev => {
            if (ev.target === slots.get(0)) {
                ev.preventDefault();
            }
        });
        return {
            render(isOutputMode, slotRender) {
                let classes = 'tb-alert';
                if (state.fill) {
                    classes += ' tb-alert-fill';
                }
                if (state.type) {
                    classes += (' tb-alert-' + state.type);
                }
                console.log(classes);
                const vNode = VElement.createElement('div', {
                    class: classes,
                }, slots.get(0) ? slotRender(slots.get(0), () => {
                    return VElement.createElement("div", { class: "tb-alert-title" });
                }) : '', VElement.createElement("div", { class: "splitor" }), slots.get(1) ? slotRender(slots.get(1), () => {
                    return VElement.createElement("div", { class: "tb-alert-content" });
                }) : '');
                return vNode;
                /*
                return (
                  <div class={ classes }>
                    <div>这是 Alert 组件，这里的内容是不可以编辑的</div>
                    {
                      slotRender(slots.get(0)!, () => {
                        return <div/>
                      })
                    }
                  </div>
                )*/
            }
        };
    }
});
export const alertComponentLoader = {
    component: alertComponent,
    match(element) {
        return element.tagName.toLowerCase() === 'div' && element.className.includes('tb-alert');
    },
    read(element, context, slotParser) {
        const types = 'default,primary,info,success,warning,danger,dark,gray'.split(',').map(i => {
            return 'tb-alert-' + i;
        });
        let type = '';
        element.className.split(' ').forEach(c => {
            if (types.indexOf(c)) {
                type = c.replace('tb-alert-', '');
            }
        });
        //TODO:从html读取时取出fill和type
        const alertState = {
            fill: element.className.includes('tb-alert-fill'),
            type: type,
        };
        return alertComponent.createInstance(context, {
            slots: [
                slotParser(new Slot([ContentType.Text]), element.querySelector(".tb-alert-title")),
                slotParser(new SlotComplete(), element.querySelector(".tb-alert-content"))
            ],
            state: alertState
        });
    },
    resources: {
        styles: [`
    .splitor{
      width:100%;
      height:1px;
      margin:10px 0px;
      background-color:#EFEFEF;
    }
.tb-alert {
  padding: 10px 15px;
  border-radius: 6px;
  border: 1px solid #e9eaec;
  background-color: #f8f8f9;
  color:#000;
  margin-top: 1em;
  margin-bottom: 1em;
  position: relative;
}

.tb-alert.tb-alert-primary {
  border-color: rgba(18, 150, 219, 0.3);
  background-color: rgba(18, 150, 219, 0.15)
}

.tb-alert.tb-alert-primary.tb-alert-fill {
  color: #fff;
  background-color: #1296db
}

.tb-alert.tb-alert-success {
  border-color: rgba(21, 189, 154, 0.3);
  background-color: rgba(21, 189, 154, 0.15)
}

.tb-alert.tb-alert-success.tb-alert-fill {
  color: #fff;
  background-color: #15bd9a
}

.tb-alert.tb-alert-info {
  border-color: rgba(106, 209, 236, 0.3);
  background-color: rgba(106, 209, 236, 0.15)
}

.tb-alert.tb-alert-info.tb-alert-fill {
  color: #fff;
  background-color: #6ad1ec
}

.tb-alert.tb-alert-warning {
  border-color: rgba(255, 153, 0, 0.3);
  background-color: rgba(255, 153, 0, 0.15)
}

.tb-alert.tb-alert-warning.tb-alert-fill {
  color: #fff;
  background-color: #f90
}

.tb-alert.tb-alert-danger {
  border-color: rgba(231, 79, 94, 0.3);
  background-color: rgba(231, 79, 94, 0.15)
}

.tb-alert.tb-alert-danger.tb-alert-fill {
  color: #fff;
  background-color: #E74F5E
}

.tb-alert.tb-alert-dark {
  border-color: rgba(73, 80, 96, 0.3);
  background-color: rgba(73, 80, 96, 0.15)
}

.tb-alert.tb-alert-dark.tb-alert-fill {
  color: #fff;
  background-color: #495060
}

.tb-alert.tb-alert-gray {
  border-color: rgba(187, 190, 196, 0.3);
  background-color: rgba(187, 190, 196, 0.15)
}

.tb-alert.tb-alert-gray.tb-alert-fill {
  color: #fff;
  background-color: #bbbec4
}

.tb-alert-fill code {
  background-color: rgba(255, 255, 255, 0.2);
  border: none
}`
        ]
    },
};
export const alertComponentCreator = {
    name: '警告框',
    category: 'TextBus',
    example: `<img src="data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg width="100" height="70" xmlns="http://www.w3.org/2000/svg"><g><rect fill="#fff" height="100%" width="100%"/></g><rect width="90%" height="20" fill="#eee" stroke="#dedede" rx="5" ry="5" x="5" y="25"></rect><text font-family="Helvetica, Arial, sans-serif" font-size="10" x="10" y="35" stroke-width="0" stroke="#000" fill="#000000">文本内容</text></svg>')}">`,
    create(injector) {
        const commander = injector.get(Commander);
        const selection = injector.get(Selection);
        const slot = new Slot([
            ContentType.Text, ContentType.BlockComponent, ContentType.InlineComponent
        ]);
        const alertState = {
            fill: true,
            type: 'primary',
        };
        const component = alertComponent.createInstance(injector, { slots: [slot], state: alertState });
        commander.insert(component);
        //selection.setLocation(slot, 0)
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGV4dGJ1cy9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxXQUFXLEVBQ1gsZUFBZSxFQUNmLElBQUksRUFDUSxTQUFTLEVBQ3JCLFVBQVUsRUFBRSxVQUFVLEVBQ3RCLFFBQVEsRUFBRSxRQUFRLEVBQ2xCLFFBQVEsRUFBNEIsYUFBYSxFQUFvQixPQUFPLEVBQzdFLE1BQU0sZUFBZSxDQUFBO0FBR3RCLE9BQU8sRUFBbUIsWUFBWSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQU9yRSxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUErQjtJQUMxRSxJQUFJLEVBQUUsV0FBVyxDQUFDLGNBQWM7SUFDaEMsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixLQUFLLENBQUMsSUFBK0I7UUFDbkMsTUFBTSxRQUFRLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFDOUIsTUFBTSxVQUFVLEdBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksWUFBWSxFQUFFLENBQUMsQ0FDckYsQ0FBQTtRQUNELElBQUksS0FBSyxHQUFD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QUE7UUFDRCxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxFQUFDLEtBQUssRUFBQyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO1FBRTNGLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDM0IsZ0NBQWdDO0lBQ2xDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tbWFuZGVyLFxuICBDb21wb25lbnRJbnN0YW5jZSxcbiAgQ29udGVudFR5cGUsXG4gIGRlZmluZUNvbXBvbmVudCxcbiAgU2xvdCxcbiAgU2xvdFJlbmRlciwgU2VsZWN0aW9uLFxuICBUcmFuc2xhdG9yLCB1c2VDb250ZXh0LFxuICB1c2VTbG90cywgdXNlU3RhdGUsXG4gIFZFbGVtZW50LCBWVGV4dE5vZGUsIENvbXBvbmVudERhdGEsIG9uQ29udGV4dE1lbnUsIENvbXBvbmVudE1ldGhvZHMsIG9uRW50ZXJcbn0gZnJvbSAnQHRleHRidXMvY29yZSdcbmltcG9ydCB7Q29tcG9uZW50TG9hZGVyLCBjcmVhdGVFbGVtZW50LCBTbG90UGFyc2VyfSBmcm9tICdAdGV4dGJ1cy9icm93c2VyJ1xuaW1wb3J0IHsgSW5qZWN0b3IgfSBmcm9tICdAdGFuYm8vZGknXG5pbXBvcnQge0NvbXBvbmVudENyZWF0b3IsIFNsb3RDb21wbGV0ZX0gZnJvbSBcIi4uL3R5cGVcIjtcbmltcG9ydCB7RGlhbG9nLCBGb3JtLCBGb3JtU2VsZWN0LCBGb3JtU3dpdGNofSBmcm9tIFwiQHRleHRidXMvZWRpdG9yXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWxlcnRTdGF0ZXtcbiAgZmlsbDpib29sZWFuO1xuICB0eXBlOnN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IGFsZXJ0Q29tcG9uZW50ID0gZGVmaW5lQ29tcG9uZW50PENvbXBvbmVudE1ldGhvZHMsIEFsZXJ0U3RhdGU+KHtcbiAgdHlwZTogQ29udGVudFR5cGUuQmxvY2tDb21wb25lbnQsXG4gIG5hbWU6ICdBbGVydENvbXBvbmVudCcsXG4gIHNldHVwKGRhdGE6IENvbXBvbmVudERhdGE8QWxlcnRTdGF0ZT4pOiBDb21wb25lbnRNZXRob2RzIHtcbiAgICBjb25zdCBpbmplY3RvciA9IHVzZUNvbnRleHQoKTtcbiAgICBjb25zdCB0cmFuc2xhdG9yPWluamVjdG9yLmdldChUcmFuc2xhdG9yKTtcbiAgICBjb25zdCBkaWFsb2cgPSBpbmplY3Rvci5nZXQoRGlhbG9nKTtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBpbmplY3Rvci5nZXQoU2VsZWN0aW9uKTtcbiAgICBjb25zdCBzbG90cyA9IHVzZVNsb3RzKGRhdGEuc2xvdHMgfHwgW25ldyBTbG90KFtDb250ZW50VHlwZS5UZXh0XSksbmV3IFNsb3RDb21wbGV0ZSgpXVxuICAgIClcbiAgICBsZXQgc3RhdGU9ZGF0YS5zdGF0ZSBhcyBBbGVydFN0YXRlO1xuICAgIGNvbnN0IGNoYW5nZUNvbnRyb2xsZXI9dXNlU3RhdGUoc3RhdGUpO1xuXG4gICAgY2hhbmdlQ29udHJvbGxlci5vbkNoYW5nZS5zdWJzY3JpYmUobmV3U3RhdGU9PntcbiAgICAgIHN0YXRlPW5ld1N0YXRlO1xuICAgICAgY29uc29sZS5sb2coJ2NoYW5nZUNvbnRyb2xsZXInLHN0YXRlKVxuICAgIH0pXG4gICAgY29uc3QgZm9ybSA9IG5ldyBGb3JtKHtcbiAgICAgIGNvbmZpcm1CdG5UZXh0OiAn56Gu5a6aJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIG5ldyBGb3JtU2VsZWN0KHtcbiAgICAgICAgICBuYW1lOiAndHlwZScsXG4gICAgICAgICAgbGFiZWw6ICfnsbvlnosnLFxuICAgICAgICAgIG9wdGlvbnM6ICdkZWZhdWx0LHByaW1hcnksaW5mbyxzdWNjZXNzLHdhcm5pbmcsZGFuZ2VyLGRhcmssZ3JheScuc3BsaXQoJywnKS5tYXAoaSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBsYWJlbDogaSxcbiAgICAgICAgICAgICAgdmFsdWU6IGksXG4gICAgICAgICAgICAgIHNlbGVjdGVkOiBpID09PSBzdGF0ZS50eXBlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgRm9ybVN3aXRjaCh7XG4gICAgICAgICAgbGFiZWw6ICfmmK/lkKbloavlhYUnLFxuICAgICAgICAgIG5hbWU6ICdmaWxsJyxcbiAgICAgICAgICBjaGVja2VkOiBzdGF0ZS5maWxsXG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgfSk7XG4gICAgZm9ybS5vbkNvbXBsZXRlLnN1YnNjcmliZShtYXAgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ2NvbXBvbmVudCcsc3RhdGUpXG4gICAgICBjaGFuZ2VDb250cm9sbGVyLnVwZGF0ZShkcmFmdD0+e1xuICAgICAgICBkcmFmdC5maWxsPW1hcC5nZXQoJ2ZpbGwnKTtcbiAgICAgICAgZHJhZnQudHlwZT1tYXAuZ2V0KCd0eXBlJyk7XG4gICAgICB9KVxuICAgICAgZGlhbG9nLmhpZGUoKVxuICAgICAgXG4gICAgfSk7XG4gICAgZm9ybS5vbkNhbmNlbC5zdWJzY3JpYmUoKCk9PntcbiAgICAgIGRpYWxvZy5oaWRlKClcbiAgICB9KVxuICAgIG9uQ29udGV4dE1lbnUoKCk9PntcbiAgICAgIGxldCBzdWJtZW51PSdkZWZhdWx0LHByaW1hcnksaW5mbyxzdWNjZXNzLHdhcm5pbmcsZGFuZ2VyLGRhcmssZ3JheScuc3BsaXQoJywnKS5tYXAoaSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbGFiZWw6IGksXG4gICAgICAgICAgb25DbGljaygpe1xuICAgICAgICAgICAgY2hhbmdlQ29udHJvbGxlci51cGRhdGUoZHJhZnQ9PntcbiAgICAgICAgICAgICAgZHJhZnQudHlwZT1pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgbGFiZWw6XCLorablkYrmoYborr7nva7nsbvlnotcIixcbiAgICAgICAgICAgIHN1Ym1lbnU6c3VibWVudVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6XCLorablkYrmoYborr7nva7loavlhYVcIixcbiAgICAgICAgICBzdWJtZW51Olt7XG4gICAgICAgICAgICAgIGxhYmVsOlwi5pivXCIsXG4gICAgICAgICAgICAgIG9uQ2xpY2soKXtcbiAgICAgICAgICAgICAgICBjaGFuZ2VDb250cm9sbGVyLnVwZGF0ZShkcmFmdD0+e1xuICAgICAgICAgICAgICAgICAgZHJhZnQuZmlsbD10cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDpcIuWQplwiLFxuICAgICAgICAgICAgICBvbkNsaWNrKCl7XG4gICAgICAgICAgICAgICAgY2hhbmdlQ29udHJvbGxlci51cGRhdGUoZHJhZnQ9PntcbiAgICAgICAgICAgICAgICAgIGRyYWZ0LmZpbGw9ZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgIH1dXG4gICAgICB9XVxuICAgIH0pXG4gICAgb25FbnRlcihldj0+eyAgICAgXG4gICAgICBpZihldi50YXJnZXQ9PT1zbG90cy5nZXQoMCkpeyBcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTsgXG4gICAgICB9XG4gICAgICBcbiAgICB9KVxuICAgIHJldHVybiB7XG4gICAgICByZW5kZXIoaXNPdXRwdXRNb2RlOiBib29sZWFuLCBzbG90UmVuZGVyOiBTbG90UmVuZGVyKTogVkVsZW1lbnQge1xuICAgICAgICBsZXQgY2xhc3Nlcz0ndGItYWxlcnQnO1xuICAgICAgICBpZiAoc3RhdGUuZmlsbCkge1xuICAgICAgICAgIGNsYXNzZXMrPScgdGItYWxlcnQtZmlsbCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXRlLnR5cGUpIHtcbiAgICAgICAgICBjbGFzc2VzKz0oJyB0Yi1hbGVydC0nICsgc3RhdGUudHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coY2xhc3NlcylcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHZOb2RlPVZFbGVtZW50LmNyZWF0ZUVsZW1lbnQoJ2Rpdicse1xuICAgICAgICAgICAgICBjbGFzczpjbGFzc2VzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNsb3RzLmdldCgwKT9zbG90UmVuZGVyKHNsb3RzLmdldCgwKSEsICgpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3M9XCJ0Yi1hbGVydC10aXRsZVwiLz5cbiAgICAgICAgICAgIH0pOicnLFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNwbGl0b3JcIj48L2Rpdj4sXG4gICAgICAgICAgICBzbG90cy5nZXQoMSk/c2xvdFJlbmRlcihzbG90cy5nZXQoMSkhLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzPVwidGItYWxlcnQtY29udGVudFwiLz5cbiAgICAgICAgICAgIH0pOicnICAgICAgICAgICAgXG4gICAgICAgICkgICAgICAgIFxuICAgICAgICByZXR1cm4gdk5vZGVcbiAgICAgICAgLypcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGNsYXNzPXsgY2xhc3NlcyB9PlxuICAgICAgICAgICAgPGRpdj7ov5nmmK8gQWxlcnQg57uE5Lu277yM6L+Z6YeM55qE5YaF5a655piv5LiN5Y+v5Lul57yW6L6R55qEPC9kaXY+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNsb3RSZW5kZXIoc2xvdHMuZ2V0KDApISwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2Lz5cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSovXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG5leHBvcnQgY29uc3QgYWxlcnRDb21wb25lbnRMb2FkZXI6IENvbXBvbmVudExvYWRlciA9IHtcbiAgY29tcG9uZW50OiBhbGVydENvbXBvbmVudCxcbiAgXG4gIG1hdGNoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZGl2JyAmJiBlbGVtZW50LmNsYXNzTmFtZS5pbmNsdWRlcygndGItYWxlcnQnKVxuICB9LFxuICByZWFkKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb250ZXh0OiBJbmplY3Rvciwgc2xvdFBhcnNlcjogU2xvdFBhcnNlcik6IENvbXBvbmVudEluc3RhbmNlIHtcblxuICAgIGNvbnN0IHR5cGVzPSdkZWZhdWx0LHByaW1hcnksaW5mbyxzdWNjZXNzLHdhcm5pbmcsZGFuZ2VyLGRhcmssZ3JheScuc3BsaXQoJywnKS5tYXAoaSA9PiB7XG4gICAgICByZXR1cm4gJ3RiLWFsZXJ0LScraVxuICAgIH0pXG4gICAgbGV0IHR5cGU9JydcbiAgICBlbGVtZW50LmNsYXNzTmFtZS5zcGxpdCgnICcpLmZvckVhY2goYz0+e1xuICAgICAgaWYodHlwZXMuaW5kZXhPZihjKSl7XG4gICAgICAgIHR5cGU9Yy5yZXBsYWNlKCd0Yi1hbGVydC0nLCcnKVxuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vVE9ETzrku45odG1s6K+75Y+W5pe25Y+W5Ye6ZmlsbOWSjHR5cGVcblxuICAgIGNvbnN0IGFsZXJ0U3RhdGU6QWxlcnRTdGF0ZT17XG4gICAgICBmaWxsOiBlbGVtZW50LmNsYXNzTmFtZS5pbmNsdWRlcygndGItYWxlcnQtZmlsbCcpLFxuICAgICAgdHlwZTp0eXBlLCAgICAgXG4gICAgfVxuICAgIHJldHVybiBhbGVydENvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShjb250ZXh0LCBcbiAgICAgIHtcbiAgICAgICAgc2xvdHM6W1xuICAgICAgICAgIHNsb3RQYXJzZXIobmV3IFNsb3QoW0NvbnRlbnRUeXBlLlRleHRdKSwgZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRiLWFsZXJ0LXRpdGxlXCIpIGFzIEhUTUxFbGVtZW50KSxcbiAgICAgICAgICBzbG90UGFyc2VyKG5ldyBTbG90Q29tcGxldGUoKSwgZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRiLWFsZXJ0LWNvbnRlbnRcIikgYXMgSFRNTEVsZW1lbnQpXG4gICAgICAgIF0sXG4gICAgICAgIHN0YXRlOmFsZXJ0U3RhdGVcbiAgICAgIH1cbiAgICApXG4gIH0sXG4gIHJlc291cmNlczoge1xuICAgIHN0eWxlczogW2BcbiAgICAuc3BsaXRvcntcbiAgICAgIHdpZHRoOjEwMCU7XG4gICAgICBoZWlnaHQ6MXB4O1xuICAgICAgbWFyZ2luOjEwcHggMHB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjojRUZFRkVGO1xuICAgIH1cbi50Yi1hbGVydCB7XG4gIHBhZGRpbmc6IDEwcHggMTVweDtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZTllYWVjO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOGY5O1xuICBjb2xvcjojMDAwO1xuICBtYXJnaW4tdG9wOiAxZW07XG4gIG1hcmdpbi1ib3R0b206IDFlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4udGItYWxlcnQudGItYWxlcnQtcHJpbWFyeSB7XG4gIGJvcmRlci1jb2xvcjogcmdiYSgxOCwgMTUwLCAyMTksIDAuMyk7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTgsIDE1MCwgMjE5LCAwLjE1KVxufVxuXG4udGItYWxlcnQudGItYWxlcnQtcHJpbWFyeS50Yi1hbGVydC1maWxsIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxMjk2ZGJcbn1cblxuLnRiLWFsZXJ0LnRiLWFsZXJ0LXN1Y2Nlc3Mge1xuICBib3JkZXItY29sb3I6IHJnYmEoMjEsIDE4OSwgMTU0LCAwLjMpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIxLCAxODksIDE1NCwgMC4xNSlcbn1cblxuLnRiLWFsZXJ0LnRiLWFsZXJ0LXN1Y2Nlc3MudGItYWxlcnQtZmlsbCB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTViZDlhXG59XG5cbi50Yi1hbGVydC50Yi1hbGVydC1pbmZvIHtcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDEwNiwgMjA5LCAyMzYsIDAuMyk7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTA2LCAyMDksIDIzNiwgMC4xNSlcbn1cblxuLnRiLWFsZXJ0LnRiLWFsZXJ0LWluZm8udGItYWxlcnQtZmlsbCB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNmFkMWVjXG59XG5cbi50Yi1hbGVydC50Yi1hbGVydC13YXJuaW5nIHtcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDI1NSwgMTUzLCAwLCAwLjMpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMTUzLCAwLCAwLjE1KVxufVxuXG4udGItYWxlcnQudGItYWxlcnQtd2FybmluZy50Yi1hbGVydC1maWxsIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOTBcbn1cblxuLnRiLWFsZXJ0LnRiLWFsZXJ0LWRhbmdlciB7XG4gIGJvcmRlci1jb2xvcjogcmdiYSgyMzEsIDc5LCA5NCwgMC4zKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMzEsIDc5LCA5NCwgMC4xNSlcbn1cblxuLnRiLWFsZXJ0LnRiLWFsZXJ0LWRhbmdlci50Yi1hbGVydC1maWxsIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICNFNzRGNUVcbn1cblxuLnRiLWFsZXJ0LnRiLWFsZXJ0LWRhcmsge1xuICBib3JkZXItY29sb3I6IHJnYmEoNzMsIDgwLCA5NiwgMC4zKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg3MywgODAsIDk2LCAwLjE1KVxufVxuXG4udGItYWxlcnQudGItYWxlcnQtZGFyay50Yi1hbGVydC1maWxsIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0OTUwNjBcbn1cblxuLnRiLWFsZXJ0LnRiLWFsZXJ0LWdyYXkge1xuICBib3JkZXItY29sb3I6IHJnYmEoMTg3LCAxOTAsIDE5NiwgMC4zKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxODcsIDE5MCwgMTk2LCAwLjE1KVxufVxuXG4udGItYWxlcnQudGItYWxlcnQtZ3JheS50Yi1hbGVydC1maWxsIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICNiYmJlYzRcbn1cblxuLnRiLWFsZXJ0LWZpbGwgY29kZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgYm9yZGVyOiBub25lXG59YFxuICAgIF1cbiAgfSxcbn1cblxuZXhwb3J0IGNvbnN0IGFsZXJ0Q29tcG9uZW50Q3JlYXRvcjpDb21wb25lbnRDcmVhdG9yPXtcbiAgbmFtZTogJ+itpuWRiuahhicsXG4gIGNhdGVnb3J5OiAnVGV4dEJ1cycsXG4gIGV4YW1wbGU6IGA8aW1nIHNyYz1cImRhdGE6aW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PVVURi04LCR7ZW5jb2RlVVJJQ29tcG9uZW50KCc8c3ZnIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiNzBcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PGc+PHJlY3QgZmlsbD1cIiNmZmZcIiBoZWlnaHQ9XCIxMDAlXCIgd2lkdGg9XCIxMDAlXCIvPjwvZz48cmVjdCB3aWR0aD1cIjkwJVwiIGhlaWdodD1cIjIwXCIgZmlsbD1cIiNlZWVcIiBzdHJva2U9XCIjZGVkZWRlXCIgcng9XCI1XCIgcnk9XCI1XCIgeD1cIjVcIiB5PVwiMjVcIj48L3JlY3Q+PHRleHQgZm9udC1mYW1pbHk9XCJIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmXCIgZm9udC1zaXplPVwiMTBcIiB4PVwiMTBcIiB5PVwiMzVcIiBzdHJva2Utd2lkdGg9XCIwXCIgc3Ryb2tlPVwiIzAwMFwiIGZpbGw9XCIjMDAwMDAwXCI+5paH5pys5YaF5a65PC90ZXh0Pjwvc3ZnPicpfVwiPmAsXG4gIGNyZWF0ZShpbmplY3Rvcil7XG4gICAgY29uc3QgY29tbWFuZGVyPWluamVjdG9yLmdldChDb21tYW5kZXIpXG4gICAgY29uc3Qgc2VsZWN0aW9uPWluamVjdG9yLmdldChTZWxlY3Rpb24pXG4gICAgY29uc3Qgc2xvdCA9IG5ldyBTbG90KFtcbiAgICAgIENvbnRlbnRUeXBlLlRleHQsQ29udGVudFR5cGUuQmxvY2tDb21wb25lbnQsQ29udGVudFR5cGUuSW5saW5lQ29tcG9uZW50XG4gICAgXSlcblxuICAgIGNvbnN0IGFsZXJ0U3RhdGU6QWxlcnRTdGF0ZT17XG4gICAgICBmaWxsOiB0cnVlLFxuICAgICAgdHlwZToncHJpbWFyeScsXG4gICAgfVxuICAgIGNvbnN0IGNvbXBvbmVudCA9IGFsZXJ0Q29tcG9uZW50LmNyZWF0ZUluc3RhbmNlKGluamVjdG9yLCB7c2xvdHM6W3Nsb3RdLHN0YXRlOmFsZXJ0U3RhdGV9KTtcblxuICAgIGNvbW1hbmRlci5pbnNlcnQoY29tcG9uZW50KVxuICAgIC8vc2VsZWN0aW9uLnNldExvY2F0aW9uKHNsb3QsIDApXG4gIH0sXG59Il19