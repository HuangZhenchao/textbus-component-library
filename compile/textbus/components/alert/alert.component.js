import { ContentType, defineComponent, Slot, Selection, Translator, useContext, useSlots, useState, VElement, onContextMenu, onEnter } from '@textbus/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGV4dGJ1cy9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLFdBQVcsRUFDWCxlQUFlLEVBQ2YsSUFBSSxFQUNRLFNBQVMsRUFDckIsVUFBVSxFQUFFLFVBQVUsRUFDdEIsUUFBUSxFQUFFLFFBQVEsRUFDbEIsUUFBUSxFQUE0QixhQUFhLEVBQW9CLE9BQU8sRUFDN0UsTUFBTSxlQUFlLENBQUE7QUFHdEIsT0FBTyxFQUFtQixZQUFZLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDdkQsT0FBTyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBT3JFLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxlQUFlLENBQStCO0lBQzFFLElBQUksRUFBRSxXQUFXLENBQUMsY0FBYztJQUNoQyxJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLEtBQUssQ0FBQyxJQUErQjtRQUNuQyxNQUFNLFFBQVEsR0FBRyxVQUFVLEVBQUUsQ0FBQztRQUM5QixNQUFNLFVBQVUsR0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQyxDQUNyRixDQUFBO1FBQ0QsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFD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QUk7U0FDVixDQUFBO1FBQ0QsT0FBTyxjQUFjLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFDMUM7WUFDRSxLQUFLLEVBQUM7Z0JBQ0osVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBZ0IsQ0FBQztnQkFDakcsVUFBVSxDQUFDLElBQUksWUFBWSxFQUFFLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBZ0IsQ0FBQzthQUMxRjtZQUNELEtBQUssRUFBQyxVQUFVO1NBQ2pCLENBQ0YsQ0FBQTtJQUNILENBQUM7SUFDRCxTQUFTLEVBQUU7UUFDVCxNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTJGWDtTQUNHO0tBQ0Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tbWFuZGVyLFxuICBDb21wb25lbnRJbnN0YW5jZSxcbiAgQ29udGVudFR5cGUsXG4gIGRlZmluZUNvbXBvbmVudCxcbiAgU2xvdCxcbiAgU2xvdFJlbmRlciwgU2VsZWN0aW9uLFxuICBUcmFuc2xhdG9yLCB1c2VDb250ZXh0LFxuICB1c2VTbG90cywgdXNlU3RhdGUsXG4gIFZFbGVtZW50LCBWVGV4dE5vZGUsIENvbXBvbmVudERhdGEsIG9uQ29udGV4dE1lbnUsIENvbXBvbmVudE1ldGhvZHMsIG9uRW50ZXJcbn0gZnJvbSAnQHRleHRidXMvY29yZSdcbmltcG9ydCB7Q29tcG9uZW50TG9hZGVyLCBjcmVhdGVFbGVtZW50LCBTbG90UGFyc2VyfSBmcm9tICdAdGV4dGJ1cy9icm93c2VyJ1xuaW1wb3J0IHsgSW5qZWN0b3IgfSBmcm9tICdAdGFuYm8vZGknXG5pbXBvcnQge0NvbXBvbmVudENyZWF0b3IsIFNsb3RDb21wbGV0ZX0gZnJvbSBcIi4uL3R5cGVcIjtcbmltcG9ydCB7RGlhbG9nLCBGb3JtLCBGb3JtU2VsZWN0LCBGb3JtU3dpdGNofSBmcm9tIFwiQHRleHRidXMvZWRpdG9yXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWxlcnRTdGF0ZXtcbiAgZmlsbDpib29sZWFuO1xuICB0eXBlOnN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IGFsZXJ0Q29tcG9uZW50ID0gZGVmaW5lQ29tcG9uZW50PENvbXBvbmVudE1ldGhvZHMsIEFsZXJ0U3RhdGU+KHtcbiAgdHlwZTogQ29udGVudFR5cGUuQmxvY2tDb21wb25lbnQsXG4gIG5hbWU6ICdBbGVydENvbXBvbmVudCcsXG4gIHNldHVwKGRhdGE6IENvbXBvbmVudERhdGE8QWxlcnRTdGF0ZT4pOiBDb21wb25lbnRNZXRob2RzIHtcbiAgICBjb25zdCBpbmplY3RvciA9IHVzZUNvbnRleHQoKTtcbiAgICBjb25zdCB0cmFuc2xhdG9yPWluamVjdG9yLmdldChUcmFuc2xhdG9yKTtcbiAgICBjb25zdCBkaWFsb2cgPSBpbmplY3Rvci5nZXQoRGlhbG9nKTtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBpbmplY3Rvci5nZXQoU2VsZWN0aW9uKTtcbiAgICBjb25zdCBzbG90cyA9IHVzZVNsb3RzKGRhdGEuc2xvdHMgfHwgW25ldyBTbG90KFtDb250ZW50VHlwZS5UZXh0XSksbmV3IFNsb3RDb21wbGV0ZSgpXVxuICAgIClcbiAgICBsZXQgc3RhdGU9ZGF0YS5zdGF0ZSBhcyBBbGVydFN0YXRlO1xuICAgIGNvbnN0IGNoYW5nZUNvbnRyb2xsZXI9dXNlU3RhdGUoc3RhdGUpO1xuXG4gICAgY2hhbmdlQ29udHJvbGxlci5vbkNoYW5nZS5zdWJzY3JpYmUobmV3U3RhdGU9PntcbiAgICAgIHN0YXRlPW5ld1N0YXRlO1xuICAgICAgY29uc29sZS5sb2coJ2NoYW5nZUNvbnRyb2xsZXInLHN0YXRlKVxuICAgIH0pXG4gICAgY29uc3QgZm9ybSA9IG5ldyBGb3JtKHtcbiAgICAgIGNvbmZpcm1CdG5UZXh0OiAn56Gu5a6aJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIG5ldyBGb3JtU2VsZWN0KHtcbiAgICAgICAgICBuYW1lOiAndHlwZScsXG4gICAgICAgICAgbGFiZWw6ICfnsbvlnosnLFxuICAgICAgICAgIG9wdGlvbnM6ICdkZWZhdWx0LHByaW1hcnksaW5mbyxzdWNjZXNzLHdhcm5pbmcsZGFuZ2VyLGRhcmssZ3JheScuc3BsaXQoJywnKS5tYXAoaSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBsYWJlbDogaSxcbiAgICAgICAgICAgICAgdmFsdWU6IGksXG4gICAgICAgICAgICAgIHNlbGVjdGVkOiBpID09PSBzdGF0ZS50eXBlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgRm9ybVN3aXRjaCh7XG4gICAgICAgICAgbGFiZWw6ICfmmK/lkKbloavlhYUnLFxuICAgICAgICAgIG5hbWU6ICdmaWxsJyxcbiAgICAgICAgICBjaGVja2VkOiBzdGF0ZS5maWxsXG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgfSk7XG4gICAgZm9ybS5vbkNvbXBsZXRlLnN1YnNjcmliZShtYXAgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ2NvbXBvbmVudCcsc3RhdGUpXG4gICAgICBjaGFuZ2VDb250cm9sbGVyLnVwZGF0ZShkcmFmdD0+e1xuICAgICAgICBkcmFmdC5maWxsPW1hcC5nZXQoJ2ZpbGwnKTtcbiAgICAgICAgZHJhZnQudHlwZT1tYXAuZ2V0KCd0eXBlJyk7XG4gICAgICB9KVxuICAgICAgZGlhbG9nLmhpZGUoKVxuICAgICAgXG4gICAgfSk7XG4gICAgZm9ybS5vbkNhbmNlbC5zdWJzY3JpYmUoKCk9PntcbiAgICAgIGRpYWxvZy5oaWRlKClcbiAgICB9KVxuICAgIG9uQ29udGV4dE1lbnUoKCk9PntcbiAgICAgIGxldCBzdWJtZW51PSdkZWZhdWx0LHByaW1hcnksaW5mbyxzdWNjZXNzLHdhcm5pbmcsZGFuZ2VyLGRhcmssZ3JheScuc3BsaXQoJywnKS5tYXAoaSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbGFiZWw6IGksXG4gICAgICAgICAgb25DbGljaygpe1xuICAgICAgICAgICAgY2hhbmdlQ29udHJvbGxlci51cGRhdGUoZHJhZnQ9PntcbiAgICAgICAgICAgICAgZHJhZnQudHlwZT1pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgbGFiZWw6XCLorablkYrmoYborr7nva7nsbvlnotcIixcbiAgICAgICAgICAgIHN1Ym1lbnU6c3VibWVudVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6XCLorablkYrmoYborr7nva7loavlhYVcIixcbiAgICAgICAgICBzdWJtZW51Olt7XG4gICAgICAgICAgICAgIGxhYmVsOlwi5pivXCIsXG4gICAgICAgICAgICAgIG9uQ2xpY2soKXtcbiAgICAgICAgICAgICAgICBjaGFuZ2VDb250cm9sbGVyLnVwZGF0ZShkcmFmdD0+e1xuICAgICAgICAgICAgICAgICAgZHJhZnQuZmlsbD10cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDpcIuWQplwiLFxuICAgICAgICAgICAgICBvbkNsaWNrKCl7XG4gICAgICAgICAgICAgICAgY2hhbmdlQ29udHJvbGxlci51cGRhdGUoZHJhZnQ9PntcbiAgICAgICAgICAgICAgICAgIGRyYWZ0LmZpbGw9ZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgIH1dXG4gICAgICB9XVxuICAgIH0pXG4gICAgb25FbnRlcihldj0+eyAgICAgXG4gICAgICBpZihldi50YXJnZXQ9PT1zbG90cy5nZXQoMCkpeyBcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTsgXG4gICAgICB9XG4gICAgICBcbiAgICB9KVxuICAgIHJldHVybiB7XG4gICAgICByZW5kZXIoaXNPdXRwdXRNb2RlOiBib29sZWFuLCBzbG90UmVuZGVyOiBTbG90UmVuZGVyKTogVkVsZW1lbnQge1xuICAgICAgICBsZXQgY2xhc3Nlcz0ndGItYWxlcnQnO1xuICAgICAgICBpZiAoc3RhdGUuZmlsbCkge1xuICAgICAgICAgIGNsYXNzZXMrPScgdGItYWxlcnQtZmlsbCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXRlLnR5cGUpIHtcbiAgICAgICAgICBjbGFzc2VzKz0oJyB0Yi1hbGVydC0nICsgc3RhdGUudHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coY2xhc3NlcylcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHZOb2RlPVZFbGVtZW50LmNyZWF0ZUVsZW1lbnQoJ2Rpdicse1xuICAgICAgICAgICAgICBjbGFzczpjbGFzc2VzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNsb3RzLmdldCgwKT9zbG90UmVuZGVyKHNsb3RzLmdldCgwKSEsICgpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3M9XCJ0Yi1hbGVydC10aXRsZVwiLz5cbiAgICAgICAgICAgIH0pOicnLFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNwbGl0b3JcIj48L2Rpdj4sXG4gICAgICAgICAgICBzbG90cy5nZXQoMSk/c2xvdFJlbmRlcihzbG90cy5nZXQoMSkhLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzPVwidGItYWxlcnQtY29udGVudFwiLz5cbiAgICAgICAgICAgIH0pOicnICAgICAgICAgICAgXG4gICAgICAgICkgICAgICAgIFxuICAgICAgICByZXR1cm4gdk5vZGVcbiAgICAgICAgLypcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGNsYXNzPXsgY2xhc3NlcyB9PlxuICAgICAgICAgICAgPGRpdj7ov5nmmK8gQWxlcnQg57uE5Lu277yM6L+Z6YeM55qE5YaF5a655piv5LiN5Y+v5Lul57yW6L6R55qEPC9kaXY+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNsb3RSZW5kZXIoc2xvdHMuZ2V0KDApISwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2Lz5cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSovXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG5leHBvcnQgY29uc3QgYWxlcnRDb21wb25lbnRMb2FkZXI6IENvbXBvbmVudExvYWRlciA9IHtcbiAgY29tcG9uZW50OiBhbGVydENvbXBvbmVudCxcbiAgXG4gIG1hdGNoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZGl2JyAmJiBlbGVtZW50LmNsYXNzTmFtZS5pbmNsdWRlcygndGItYWxlcnQnKVxuICB9LFxuICByZWFkKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb250ZXh0OiBJbmplY3Rvciwgc2xvdFBhcnNlcjogU2xvdFBhcnNlcik6IENvbXBvbmVudEluc3RhbmNlIHtcblxuICAgIGNvbnN0IHR5cGVzPSdkZWZhdWx0LHByaW1hcnksaW5mbyxzdWNjZXNzLHdhcm5pbmcsZGFuZ2VyLGRhcmssZ3JheScuc3BsaXQoJywnKS5tYXAoaSA9PiB7XG4gICAgICByZXR1cm4gJ3RiLWFsZXJ0LScraVxuICAgIH0pXG4gICAgbGV0IHR5cGU9JydcbiAgICBlbGVtZW50LmNsYXNzTmFtZS5zcGxpdCgnICcpLmZvckVhY2goYz0+e1xuICAgICAgaWYodHlwZXMuaW5kZXhPZihjKSl7XG4gICAgICAgIHR5cGU9Yy5yZXBsYWNlKCd0Yi1hbGVydC0nLCcnKVxuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vVE9ETzrku45odG1s6K+75Y+W5pe25Y+W5Ye6ZmlsbOWSjHR5cGVcblxuICAgIGNvbnN0IGFsZXJ0U3RhdGU6QWxlcnRTdGF0ZT17XG4gICAgICBmaWxsOiBlbGVtZW50LmNsYXNzTmFtZS5pbmNsdWRlcygndGItYWxlcnQtZmlsbCcpLFxuICAgICAgdHlwZTp0eXBlLCAgICAgXG4gICAgfVxuICAgIHJldHVybiBhbGVydENvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShjb250ZXh0LCBcbiAgICAgIHtcbiAgICAgICAgc2xvdHM6W1xuICAgICAgICAgIHNsb3RQYXJzZXIobmV3IFNsb3QoW0NvbnRlbnRUeXBlLlRleHRdKSwgZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRiLWFsZXJ0LXRpdGxlXCIpIGFzIEhUTUxFbGVtZW50KSxcbiAgICAgICAgICBzbG90UGFyc2VyKG5ldyBTbG90Q29tcGxldGUoKSwgZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRiLWFsZXJ0LWNvbnRlbnRcIikgYXMgSFRNTEVsZW1lbnQpXG4gICAgICAgIF0sXG4gICAgICAgIHN0YXRlOmFsZXJ0U3RhdGVcbiAgICAgIH1cbiAgICApXG4gIH0sXG4gIHJlc291cmNlczoge1xuICAgIHN0eWxlczogW2BcbiAgICAuc3BsaXRvcntcbiAgICAgIHdpZHRoOjEwMCU7XG4gICAgICBoZWlnaHQ6MXB4O1xuICAgICAgbWFyZ2luOjEwcHggMHB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjojRUZFRkVGO1xuICAgIH1cbi50Yi1hbGVydCB7XG4gIHBhZGRpbmc6IDEwcHggMTVweDtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZTllYWVjO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOGY5O1xuICBjb2xvcjojMDAwO1xuICBtYXJnaW4tdG9wOiAxZW07XG4gIG1hcmdpbi1ib3R0b206IDFlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4udGItYWxlcnQudGItYWxlcnQtcHJpbWFyeSB7XG4gIGJvcmRlci1jb2xvcjogcmdiYSgxOCwgMTUwLCAyMTksIDAuMyk7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTgsIDE1MCwgMjE5LCAwLjE1KVxufVxuXG4udGItYWxlcnQudGItYWxlcnQtcHJpbWFyeS50Yi1hbGVydC1maWxsIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxMjk2ZGJcbn1cblxuLnRiLWFsZXJ0LnRiLWFsZXJ0LXN1Y2Nlc3Mge1xuICBib3JkZXItY29sb3I6IHJnYmEoMjEsIDE4OSwgMTU0LCAwLjMpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIxLCAxODksIDE1NCwgMC4xNSlcbn1cblxuLnRiLWFsZXJ0LnRiLWFsZXJ0LXN1Y2Nlc3MudGItYWxlcnQtZmlsbCB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTViZDlhXG59XG5cbi50Yi1hbGVydC50Yi1hbGVydC1pbmZvIHtcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDEwNiwgMjA5LCAyMzYsIDAuMyk7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTA2LCAyMDksIDIzNiwgMC4xNSlcbn1cblxuLnRiLWFsZXJ0LnRiLWFsZXJ0LWluZm8udGItYWxlcnQtZmlsbCB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNmFkMWVjXG59XG5cbi50Yi1hbGVydC50Yi1hbGVydC13YXJuaW5nIHtcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDI1NSwgMTUzLCAwLCAwLjMpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMTUzLCAwLCAwLjE1KVxufVxuXG4udGItYWxlcnQudGItYWxlcnQtd2FybmluZy50Yi1hbGVydC1maWxsIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOTBcbn1cblxuLnRiLWFsZXJ0LnRiLWFsZXJ0LWRhbmdlciB7XG4gIGJvcmRlci1jb2xvcjogcmdiYSgyMzEsIDc5LCA5NCwgMC4zKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMzEsIDc5LCA5NCwgMC4xNSlcbn1cblxuLnRiLWFsZXJ0LnRiLWFsZXJ0LWRhbmdlci50Yi1hbGVydC1maWxsIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICNFNzRGNUVcbn1cblxuLnRiLWFsZXJ0LnRiLWFsZXJ0LWRhcmsge1xuICBib3JkZXItY29sb3I6IHJnYmEoNzMsIDgwLCA5NiwgMC4zKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg3MywgODAsIDk2LCAwLjE1KVxufVxuXG4udGItYWxlcnQudGItYWxlcnQtZGFyay50Yi1hbGVydC1maWxsIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0OTUwNjBcbn1cblxuLnRiLWFsZXJ0LnRiLWFsZXJ0LWdyYXkge1xuICBib3JkZXItY29sb3I6IHJnYmEoMTg3LCAxOTAsIDE5NiwgMC4zKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxODcsIDE5MCwgMTk2LCAwLjE1KVxufVxuXG4udGItYWxlcnQudGItYWxlcnQtZ3JheS50Yi1hbGVydC1maWxsIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICNiYmJlYzRcbn1cblxuLnRiLWFsZXJ0LWZpbGwgY29kZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgYm9yZGVyOiBub25lXG59YFxuICAgIF1cbiAgfSxcbn1cblxuIl19