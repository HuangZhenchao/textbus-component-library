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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGV4dGJ1cy9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLFdBQVcsRUFDWCxlQUFlLEVBQ2YsSUFBSSxFQUNRLFNBQVMsRUFDckIsVUFBVSxFQUFFLFVBQVUsRUFDdEIsUUFBUSxFQUFFLFFBQVEsRUFDbEIsUUFBUSxFQUE0QixhQUFhLEVBQW9CLE9BQU8sRUFDN0UsTUFBTSxlQUFlLENBQUE7QUFHdEIsT0FBTyxFQUFtQixZQUFZLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDdkQsT0FBTyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBT3JFLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxlQUFlLENBQStCO0lBQzFFLElBQUksRUFBRSxXQUFXLENBQUMsY0FBYztJQUNoQyxJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLEtBQUssQ0FBQyxJQUErQjtRQUNuQyxNQUFNLFFBQVEsR0FBRyxVQUFVLEVBQUUsQ0FBQztRQUM5QixNQUFNLFVBQVUsR0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQyxDQUNyRixDQUFBO1FBQ0QsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFD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QztZQUNFLEtBQUssRUFBQztnQkFDSixVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFnQixDQUFDO2dCQUNqRyxVQUFVLENBQUMsSUFBSSxZQUFZLEVBQUUsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFnQixDQUFDO2FBQzFGO1lBQ0QsS0FBSyxFQUFDLFVBQVU7U0FDakIsQ0FDRixDQUFBO0lBQ0gsQ0FBQztJQUNELFNBQVMsRUFBRTtRQUNULE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMkZYO1NBQ0c7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21tYW5kZXIsXG4gIENvbXBvbmVudEluc3RhbmNlLFxuICBDb250ZW50VHlwZSxcbiAgZGVmaW5lQ29tcG9uZW50LFxuICBTbG90LFxuICBTbG90UmVuZGVyLCBTZWxlY3Rpb24sXG4gIFRyYW5zbGF0b3IsIHVzZUNvbnRleHQsXG4gIHVzZVNsb3RzLCB1c2VTdGF0ZSxcbiAgVkVsZW1lbnQsIFZUZXh0Tm9kZSwgQ29tcG9uZW50RGF0YSwgb25Db250ZXh0TWVudSwgQ29tcG9uZW50TWV0aG9kcywgb25FbnRlclxufSBmcm9tICdAdGV4dGJ1cy9jb3JlJ1xuaW1wb3J0IHtDb21wb25lbnRMb2FkZXIsIGNyZWF0ZUVsZW1lbnQsIFNsb3RQYXJzZXJ9IGZyb20gJ0B0ZXh0YnVzL2Jyb3dzZXInXG5pbXBvcnQgeyBJbmplY3RvciB9IGZyb20gJ0B0YW5iby9kaSdcbmltcG9ydCB7Q29tcG9uZW50Q3JlYXRvciwgU2xvdENvbXBsZXRlfSBmcm9tIFwiLi4vdHlwZVwiO1xuaW1wb3J0IHtEaWFsb2csIEZvcm0sIEZvcm1TZWxlY3QsIEZvcm1Td2l0Y2h9IGZyb20gXCJAdGV4dGJ1cy9lZGl0b3JcIjtcblxuZXhwb3J0IGludGVyZmFjZSBBbGVydFN0YXRle1xuICBmaWxsOmJvb2xlYW47XG4gIHR5cGU6c3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgYWxlcnRDb21wb25lbnQgPSBkZWZpbmVDb21wb25lbnQ8Q29tcG9uZW50TWV0aG9kcywgQWxlcnRTdGF0ZT4oe1xuICB0eXBlOiBDb250ZW50VHlwZS5CbG9ja0NvbXBvbmVudCxcbiAgbmFtZTogJ0FsZXJ0Q29tcG9uZW50JyxcbiAgc2V0dXAoZGF0YTogQ29tcG9uZW50RGF0YTxBbGVydFN0YXRlPik6IENvbXBvbmVudE1ldGhvZHMge1xuICAgIGNvbnN0IGluamVjdG9yID0gdXNlQ29udGV4dCgpO1xuICAgIGNvbnN0IHRyYW5zbGF0b3I9aW5qZWN0b3IuZ2V0KFRyYW5zbGF0b3IpO1xuICAgIGNvbnN0IGRpYWxvZyA9IGluamVjdG9yLmdldChEaWFsb2cpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IGluamVjdG9yLmdldChTZWxlY3Rpb24pO1xuICAgIGNvbnN0IHNsb3RzID0gdXNlU2xvdHMoZGF0YS5zbG90cyB8fCBbbmV3IFNsb3QoW0NvbnRlbnRUeXBlLlRleHRdKSxuZXcgU2xvdENvbXBsZXRlKCldXG4gICAgKVxuICAgIGxldCBzdGF0ZT1kYXRhLnN0YXRlIGFzIEFsZXJ0U3RhdGU7XG4gICAgY29uc3QgY2hhbmdlQ29udHJvbGxlcj11c2VTdGF0ZShzdGF0ZSk7XG5cbiAgICBjaGFuZ2VDb250cm9sbGVyLm9uQ2hhbmdlLnN1YnNjcmliZShuZXdTdGF0ZT0+e1xuICAgICAgc3RhdGU9bmV3U3RhdGU7XG4gICAgfSlcbiAgICBjb25zdCBmb3JtID0gbmV3IEZvcm0oe1xuICAgICAgY29uZmlybUJ0blRleHQ6ICfnoa7lrponLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAgbmV3IEZvcm1TZWxlY3Qoe1xuICAgICAgICAgIG5hbWU6ICd0eXBlJyxcbiAgICAgICAgICBsYWJlbDogJ+exu+WeiycsXG4gICAgICAgICAgb3B0aW9uczogJ2RlZmF1bHQscHJpbWFyeSxpbmZvLHN1Y2Nlc3Msd2FybmluZyxkYW5nZXIsZGFyayxncmF5Jy5zcGxpdCgnLCcpLm1hcChpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxhYmVsOiBpLFxuICAgICAgICAgICAgICB2YWx1ZTogaSxcbiAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGkgPT09IHN0YXRlLnR5cGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSlcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBGb3JtU3dpdGNoKHtcbiAgICAgICAgICBsYWJlbDogJ+aYr+WQpuWhq+WFhScsXG4gICAgICAgICAgbmFtZTogJ2ZpbGwnLFxuICAgICAgICAgIGNoZWNrZWQ6IHN0YXRlLmZpbGxcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9KTtcbiAgICBmb3JtLm9uQ29tcGxldGUuc3Vic2NyaWJlKG1hcCA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnY29tcG9uZW50JyxzdGF0ZSlcbiAgICAgIGNoYW5nZUNvbnRyb2xsZXIudXBkYXRlKGRyYWZ0PT57XG4gICAgICAgIGRyYWZ0LmZpbGw9bWFwLmdldCgnZmlsbCcpO1xuICAgICAgICBkcmFmdC50eXBlPW1hcC5nZXQoJ3R5cGUnKTtcbiAgICAgIH0pXG4gICAgICBkaWFsb2cuaGlkZSgpXG4gICAgICBcbiAgICB9KTtcbiAgICBmb3JtLm9uQ2FuY2VsLnN1YnNjcmliZSgoKT0+e1xuICAgICAgZGlhbG9nLmhpZGUoKVxuICAgIH0pXG4gICAgb25Db250ZXh0TWVudSgoKT0+e1xuICAgICAgbGV0IHN1Ym1lbnU9J2RlZmF1bHQscHJpbWFyeSxpbmZvLHN1Y2Nlc3Msd2FybmluZyxkYW5nZXIsZGFyayxncmF5Jy5zcGxpdCgnLCcpLm1hcChpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsYWJlbDogaSxcbiAgICAgICAgICBvbkNsaWNrKCl7XG4gICAgICAgICAgICBjaGFuZ2VDb250cm9sbGVyLnVwZGF0ZShkcmFmdD0+e1xuICAgICAgICAgICAgICBkcmFmdC50eXBlPWlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICBsYWJlbDpcIuitpuWRiuahhuiuvue9ruexu+Wei1wiLFxuICAgICAgICAgICAgc3VibWVudTpzdWJtZW51XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDpcIuitpuWRiuahhuiuvue9ruWhq+WFhVwiLFxuICAgICAgICAgIHN1Ym1lbnU6W3tcbiAgICAgICAgICAgICAgbGFiZWw6XCLmmK9cIixcbiAgICAgICAgICAgICAgb25DbGljaygpe1xuICAgICAgICAgICAgICAgIGNoYW5nZUNvbnRyb2xsZXIudXBkYXRlKGRyYWZ0PT57XG4gICAgICAgICAgICAgICAgICBkcmFmdC5maWxsPXRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOlwi5ZCmXCIsXG4gICAgICAgICAgICAgIG9uQ2xpY2soKXtcbiAgICAgICAgICAgICAgICBjaGFuZ2VDb250cm9sbGVyLnVwZGF0ZShkcmFmdD0+e1xuICAgICAgICAgICAgICAgICAgZHJhZnQuZmlsbD1mYWxzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfSlcbiAgICBvbkVudGVyKGV2PT57ICAgICBcbiAgICAgIGlmKGV2LnRhcmdldD09PXNsb3RzLmdldCgwKSl7IFxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpOyBcbiAgICAgIH1cbiAgICAgIFxuICAgIH0pXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlbmRlcihpc091dHB1dE1vZGU6IGJvb2xlYW4sIHNsb3RSZW5kZXI6IFNsb3RSZW5kZXIpOiBWRWxlbWVudCB7XG4gICAgICAgIGxldCBjbGFzc2VzPSd0Yi1hbGVydCc7XG4gICAgICAgIGlmIChzdGF0ZS5maWxsKSB7XG4gICAgICAgICAgY2xhc3Nlcys9JyB0Yi1hbGVydC1maWxsJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUudHlwZSkge1xuICAgICAgICAgIGNsYXNzZXMrPSgnIHRiLWFsZXJ0LScgKyBzdGF0ZS50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhjbGFzc2VzKVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgdk5vZGU9VkVsZW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyx7XG4gICAgICAgICAgICAgIGNsYXNzOmNsYXNzZXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2xvdHMuZ2V0KDApP3Nsb3RSZW5kZXIoc2xvdHMuZ2V0KDApISwgKCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzcz1cInRiLWFsZXJ0LXRpdGxlXCIvPlxuICAgICAgICAgICAgfSk6JycsXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3BsaXRvclwiPjwvZGl2PixcbiAgICAgICAgICAgIHNsb3RzLmdldCgxKT9zbG90UmVuZGVyKHNsb3RzLmdldCgxKSEsICgpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3M9XCJ0Yi1hbGVydC1jb250ZW50XCIvPlxuICAgICAgICAgICAgfSk6JycgICAgICAgICAgICBcbiAgICAgICAgKSAgICAgICAgXG4gICAgICAgIHJldHVybiB2Tm9kZVxuICAgICAgICAvKlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgY2xhc3M9eyBjbGFzc2VzIH0+XG4gICAgICAgICAgICA8ZGl2Pui/meaYryBBbGVydCDnu4Tku7bvvIzov5nph4znmoTlhoXlrrnmmK/kuI3lj6/ku6XnvJbovpHnmoQ8L2Rpdj5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2xvdFJlbmRlcihzbG90cy5nZXQoMCkhLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYvPlxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKi9cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG5cbmV4cG9ydCBjb25zdCBhbGVydENvbXBvbmVudExvYWRlcjogQ29tcG9uZW50TG9hZGVyID0ge1xuICBjb21wb25lbnQ6IGFsZXJ0Q29tcG9uZW50LFxuICBcbiAgbWF0Y2goZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdkaXYnICYmIGVsZW1lbnQuY2xhc3NOYW1lLmluY2x1ZGVzKCd0Yi1hbGVydCcpXG4gIH0sXG4gIHJlYWQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbnRleHQ6IEluamVjdG9yLCBzbG90UGFyc2VyOiBTbG90UGFyc2VyKTogQ29tcG9uZW50SW5zdGFuY2Uge1xuXG4gICAgY29uc3QgdHlwZXM9J2RlZmF1bHQscHJpbWFyeSxpbmZvLHN1Y2Nlc3Msd2FybmluZyxkYW5nZXIsZGFyayxncmF5Jy5zcGxpdCgnLCcpLm1hcChpID0+IHtcbiAgICAgIHJldHVybiAndGItYWxlcnQtJytpXG4gICAgfSlcbiAgICBsZXQgdHlwZT0nJ1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KCcgJykuZm9yRWFjaChjPT57XG4gICAgICBpZih0eXBlcy5pbmRleE9mKGMpKXtcbiAgICAgICAgdHlwZT1jLnJlcGxhY2UoJ3RiLWFsZXJ0LScsJycpXG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9UT0RPOuS7jmh0bWzor7vlj5bml7blj5blh7pmaWxs5ZKMdHlwZVxuXG4gICAgY29uc3QgYWxlcnRTdGF0ZTpBbGVydFN0YXRlPXtcbiAgICAgIGZpbGw6IGVsZW1lbnQuY2xhc3NOYW1lLmluY2x1ZGVzKCd0Yi1hbGVydC1maWxsJyksXG4gICAgICB0eXBlOnR5cGUsICAgICBcbiAgICB9XG4gICAgcmV0dXJuIGFsZXJ0Q29tcG9uZW50LmNyZWF0ZUluc3RhbmNlKGNvbnRleHQsIFxuICAgICAge1xuICAgICAgICBzbG90czpbXG4gICAgICAgICAgc2xvdFBhcnNlcihuZXcgU2xvdChbQ29udGVudFR5cGUuVGV4dF0pLCBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGItYWxlcnQtdGl0bGVcIikgYXMgSFRNTEVsZW1lbnQpLFxuICAgICAgICAgIHNsb3RQYXJzZXIobmV3IFNsb3RDb21wbGV0ZSgpLCBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGItYWxlcnQtY29udGVudFwiKSBhcyBIVE1MRWxlbWVudClcbiAgICAgICAgXSxcbiAgICAgICAgc3RhdGU6YWxlcnRTdGF0ZVxuICAgICAgfVxuICAgIClcbiAgfSxcbiAgcmVzb3VyY2VzOiB7XG4gICAgc3R5bGVzOiBbYFxuICAgIC5zcGxpdG9ye1xuICAgICAgd2lkdGg6MTAwJTtcbiAgICAgIGhlaWdodDoxcHg7XG4gICAgICBtYXJnaW46MTBweCAwcHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiNFRkVGRUY7XG4gICAgfVxuLnRiLWFsZXJ0IHtcbiAgcGFkZGluZzogMTBweCAxNXB4O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlOWVhZWM7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY4Zjk7XG4gIGNvbG9yOiMwMDA7XG4gIG1hcmdpbi10b3A6IDFlbTtcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi50Yi1hbGVydC50Yi1hbGVydC1wcmltYXJ5IHtcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDE4LCAxNTAsIDIxOSwgMC4zKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxOCwgMTUwLCAyMTksIDAuMTUpXG59XG5cbi50Yi1hbGVydC50Yi1hbGVydC1wcmltYXJ5LnRiLWFsZXJ0LWZpbGwge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEyOTZkYlxufVxuXG4udGItYWxlcnQudGItYWxlcnQtc3VjY2VzcyB7XG4gIGJvcmRlci1jb2xvcjogcmdiYSgyMSwgMTg5LCAxNTQsIDAuMyk7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjEsIDE4OSwgMTU0LCAwLjE1KVxufVxuXG4udGItYWxlcnQudGItYWxlcnQtc3VjY2Vzcy50Yi1hbGVydC1maWxsIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxNWJkOWFcbn1cblxuLnRiLWFsZXJ0LnRiLWFsZXJ0LWluZm8ge1xuICBib3JkZXItY29sb3I6IHJnYmEoMTA2LCAyMDksIDIzNiwgMC4zKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMDYsIDIwOSwgMjM2LCAwLjE1KVxufVxuXG4udGItYWxlcnQudGItYWxlcnQtaW5mby50Yi1hbGVydC1maWxsIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICM2YWQxZWNcbn1cblxuLnRiLWFsZXJ0LnRiLWFsZXJ0LXdhcm5pbmcge1xuICBib3JkZXItY29sb3I6IHJnYmEoMjU1LCAxNTMsIDAsIDAuMyk7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAxNTMsIDAsIDAuMTUpXG59XG5cbi50Yi1hbGVydC50Yi1hbGVydC13YXJuaW5nLnRiLWFsZXJ0LWZpbGwge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y5MFxufVxuXG4udGItYWxlcnQudGItYWxlcnQtZGFuZ2VyIHtcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDIzMSwgNzksIDk0LCAwLjMpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzMSwgNzksIDk0LCAwLjE1KVxufVxuXG4udGItYWxlcnQudGItYWxlcnQtZGFuZ2VyLnRiLWFsZXJ0LWZpbGwge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0U3NEY1RVxufVxuXG4udGItYWxlcnQudGItYWxlcnQtZGFyayB7XG4gIGJvcmRlci1jb2xvcjogcmdiYSg3MywgODAsIDk2LCAwLjMpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDczLCA4MCwgOTYsIDAuMTUpXG59XG5cbi50Yi1hbGVydC50Yi1hbGVydC1kYXJrLnRiLWFsZXJ0LWZpbGwge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ5NTA2MFxufVxuXG4udGItYWxlcnQudGItYWxlcnQtZ3JheSB7XG4gIGJvcmRlci1jb2xvcjogcmdiYSgxODcsIDE5MCwgMTk2LCAwLjMpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE4NywgMTkwLCAxOTYsIDAuMTUpXG59XG5cbi50Yi1hbGVydC50Yi1hbGVydC1ncmF5LnRiLWFsZXJ0LWZpbGwge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2JiYmVjNFxufVxuXG4udGItYWxlcnQtZmlsbCBjb2RlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICBib3JkZXI6IG5vbmVcbn1gXG4gICAgXVxuICB9LFxufVxuXG4iXX0=