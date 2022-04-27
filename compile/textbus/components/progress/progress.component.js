import { ContentType, defineComponent, useContext, useState, VElement } from "@textbus/core";
const colors = {
    primary: '#1296db',
    info: '#6ad1ec',
    success: '#15bd9a',
    warning: '#ff9900',
    danger: '#E74F5E',
    dark: '#495060',
    gray: '#bbbec4'
};
export const progressComponent = defineComponent({
    name: "progressComponent",
    type: ContentType.BlockComponent,
    setup(data) {
        const injector = useContext();
        let state = data.state;
        const changeController = useState(state);
        //useState({fill:false,type:'info',slot:slots.toJSON()})
        changeController.onChange.subscribe(newState => {
            state = newState;
            console.log('changeController', state);
        });
        return {
            render(isOutputMode, slotRender) {
                const value = Math.round((state.progress - state.min) / (state.max - state.min) * 100) + '%';
                const el = VElement.createElement("div", Object.assign({ class: "tb-progress" }, state), VElement.createElement("span", { class: "tb-progress-min" }, state.min), VElement.createElement("div", { style: { width: value } }, VElement.createElement("span", { class: "tb-progress-value" }, value)), VElement.createElement("span", { class: "tb-progress-max" }, state.max));
                return el;
            },
        };
    }
});
export const progressComponentLoader = {
    component: progressComponent,
    match(element) {
        return element.tagName.toLowerCase() === 'div' && element.className === 'tb-progress';
    },
    read(element, context, slotParser) {
        const state = {
            type: element.getAttribute('type') || "primary",
            progress: Number(element.getAttribute('progress')) || 0,
            max: Number(element.getAttribute('max')) || 100,
            min: Number(element.getAttribute('min')) || 0
        };
        //const component = new TodoListComponent(listConfig.map(i => i.slot));
        return progressComponent.createInstance(context, { state: state });
    },
    resources: {
        styles: [
            `
            .tb-progress {
              margin: 2em 0 1em;
              background-color: #eee;
              border-radius: 3px;
              height: 6px;
              display: block;
              position: relative;
            }
            .tb-progress > div {
              height: 100%;
              border-radius: inherit;
              background-color: #aaa;
              position: relative;
            }
            .tb-progress > span {
              position: absolute;
              bottom: 100%;
              font-size:12px;
            }
            .tb-progress-value {
              position: absolute;
              right: 0;
              bottom: 100%;
              background-color: #000;
              color: #fff;
              padding: 3px 8px;
              border-radius: 5px;
              font-size: 13px;
              transform: translateX(50%) translateY(-4px);
            }
            .tb-progress-value:after {
              content: "";
              position: absolute;
              top: 100%;
              left: 50%;
              margin-left: -4px;
              width: 0;
              height: 0;
              border-width: 4px;
              border-style: solid;
              border-color: #000 transparent transparent;
            }
            .tb-progress-min {
              left: 0;
            }
            .tb-progress-max {
              right: 0;
            }
            .tb-progress[type=primary] > div {
              background-color: ${colors.primary}
            }
            .tb-progress[type=info] > div {
              background-color: ${colors.info}
            }
            .tb-progress[type=success] > div {
              background-color: ${colors.success}
            }
            .tb-progress[type=warning] > div {
              background-color: ${colors.warning}
            }
            .tb-progress[type=danger] > div {
              background-color: ${colors.danger}
            }
            .tb-progress[type=dark] > div {
              background-color: ${colors.dark}
            }
            .tb-progress[type=gray] > div {
              background-color: ${colors.gray}
            }
            `
        ]
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGV4dGJ1cy9jb21wb25lbnRzL3Byb2dyZXNzL3Byb2dyZXNzLmNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlILFdBQVcsRUFDWCxlQUFlLEVBRWYsVUFBVSxFQUFZLFFBQVEsRUFBRSxRQUFRLEVBQzNDLE1BQU0sZUFBZSxDQUFDO0FBS3ZCLE1BQU0sTUFBTSxHQUFHO0lBQ1gsT0FBTyxFQUFFLFNBQVM7SUFDbEIsSUFBSSxFQUFFLFNBQVM7SUFDZixPQUFPLEVBQUUsU0FBUztJQUNsQixPQUFPLEVBQUUsU0FBUztJQUNsQixNQUFNLEVBQUUsU0FBUztJQUNqQixJQUFJLEVBQUUsU0FBUztJQUNmLElBQUksRUFBRSxTQUFTO0NBQ2xCLENBQUM7QUFPRixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBQyxlQUFlLENBQWlDO0lBQzNFLElBQUksRUFBRSxtQkFBbUI7SUFDekIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxjQUFjO0lBQ2hDLEtBQUssQ0FBQyxJQUFrQztRQUNwQyxNQUFNLFFBQVEsR0FBRyxVQUFVLEVBQUUsQ0FBQztRQUM5QixJQUFJLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBc0IsQ0FBQztRQUN0QyxNQUFNLGdCQUFnQixHQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2Qyx3REFBd0Q7UUFDeEQsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUEsRUFBRTtZQUMxQyxLQUFLLEdBQUMsUUFBUSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBQyxLQUFLLENBQUMsQ0FBQTtRQUN6QyxDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU87WUFDSCxNQUFNLENBQUMsWUFBb0IsRUFBRSxVQUFxQjtnQkFDOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUM3RixNQUFNLEVBQUUsR0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxFQUFFLEtBQUssQ0FBQyxFQUN0RSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFDdkUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFDckQsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUMxRSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDbEYsQ0FBQztnQkFDRixPQUFPLEVBQUUsQ0FBQTtZQUViLENBQUM7U0FDSixDQUFBO0lBQ0wsQ0FBQztDQUVKLENBQUMsQ0FBQTtBQUNGLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFpQjtJQUNqRCxTQUFTLEVBQUUsaUJBQWlCO0lBRTVCLEtBQUssQ0FBQyxPQUFvQjtRQUN0QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssYUFBYSxDQUFBO0lBQ3pGLENBQUM7SUFDRCxJQUFJLENBQUMsT0FBb0IsRUFBRSxPQUFpQixFQUFFLFVBQXNCO1FBRWhFLE1BQU0sS0FBSyxHQUFlO1lBQ3RCLElBQUksRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFFLFNBQVM7WUFDN0MsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN2RCxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHO1lBQy9DLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDaEQsQ0FBQTtRQUVELHVFQUF1RTtRQUN2RSxPQUFPLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsTUFBTSxFQUFFO1lBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQWtEc0IsTUFBTSxDQUFDLE9BQU87OztrQ0FHZCxNQUFNLENBQUMsSUFBSTs7O2tDQUdYLE1BQU0sQ0FBQyxPQUFPOzs7a0NBR2QsTUFBTSxDQUFDLE9BQU87OztrQ0FHZCxNQUFNLENBQUMsTUFBTTs7O2tDQUdiLE1BQU0sQ0FBQyxJQUFJOzs7a0NBR1gsTUFBTSxDQUFDLElBQUk7O2FBRWhDO1NBQ0o7S0FDSjtDQUNKLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudERhdGEsXHJcbiAgICBDb21wb25lbnRJbnN0YW5jZSxcclxuICAgIENvbXBvbmVudE1ldGhvZHMsXHJcbiAgICBDb250ZW50VHlwZSxcclxuICAgIGRlZmluZUNvbXBvbmVudCwgU2xvdCwgU2xvdFJlbmRlcixcclxuICAgIFRyYW5zbGF0b3IsXHJcbiAgICB1c2VDb250ZXh0LCB1c2VTbG90cywgdXNlU3RhdGUsIFZFbGVtZW50XHJcbn0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuaW1wb3J0IHtDb21wb25lbnRMb2FkZXIsIFNsb3RQYXJzZXJ9IGZyb20gXCJAdGV4dGJ1cy9icm93c2VyXCI7XHJcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gXCJAdGFuYm8vZGlcIjtcclxuaW1wb3J0IHt0b2RvTGlzdFN0YXRlfSBmcm9tIFwiLi4vdG9kb0xpc3QvdG9kb0xpc3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7U2xvdExpdGVyYWx9IGZyb20gXCJAdGV4dGJ1cy9jb3JlXCI7XHJcbmNvbnN0IGNvbG9ycyA9IHtcclxuICAgIHByaW1hcnk6ICcjMTI5NmRiJyxcclxuICAgIGluZm86ICcjNmFkMWVjJyxcclxuICAgIHN1Y2Nlc3M6ICcjMTViZDlhJyxcclxuICAgIHdhcm5pbmc6ICcjZmY5OTAwJyxcclxuICAgIGRhbmdlcjogJyNFNzRGNUUnLFxyXG4gICAgZGFyazogJyM0OTUwNjAnLFxyXG4gICAgZ3JheTogJyNiYmJlYzQnXHJcbn07XHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3Jlc3NTdGF0ZSB7XHJcbiAgICB0eXBlOnN0cmluZyAsLy98J3ByaW1hcnknIHwgJ2luZm8nIHwgJ3N1Y2Nlc3MnIHwgJ3dhcm5pbmcnIHwgJ2RhbmdlcicgfCAnZ3JheScgfCAnZGFyayc7XHJcbiAgICBwcm9ncmVzczogbnVtYmVyLFxyXG4gICAgbWF4OiBudW1iZXIsXHJcbiAgICBtaW46IG51bWJlclxyXG59XHJcbmV4cG9ydCBjb25zdCBwcm9ncmVzc0NvbXBvbmVudD1kZWZpbmVDb21wb25lbnQ8Q29tcG9uZW50TWV0aG9kcyxQcm9ncmVzc1N0YXRlPih7XHJcbiAgICBuYW1lOiBcInByb2dyZXNzQ29tcG9uZW50XCIsXHJcbiAgICB0eXBlOiBDb250ZW50VHlwZS5CbG9ja0NvbXBvbmVudCxcclxuICAgIHNldHVwKGRhdGE6IENvbXBvbmVudERhdGE8UHJvZ3Jlc3NTdGF0ZT4pOiBDb21wb25lbnRNZXRob2RzIHtcclxuICAgICAgICBjb25zdCBpbmplY3RvciA9IHVzZUNvbnRleHQoKTtcclxuICAgICAgICBsZXQgc3RhdGU9ZGF0YS5zdGF0ZSBhcyBQcm9ncmVzc1N0YXRlO1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZUNvbnRyb2xsZXI9dXNlU3RhdGUoc3RhdGUpO1xyXG4gICAgICAgIC8vdXNlU3RhdGUoe2ZpbGw6ZmFsc2UsdHlwZTonaW5mbycsc2xvdDpzbG90cy50b0pTT04oKX0pXHJcbiAgICAgICAgY2hhbmdlQ29udHJvbGxlci5vbkNoYW5nZS5zdWJzY3JpYmUobmV3U3RhdGU9PntcclxuICAgICAgICAgICAgc3RhdGU9bmV3U3RhdGU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VDb250cm9sbGVyJyxzdGF0ZSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlbmRlcihpc091dHB1dE1vZGU6Ym9vbGVhbiwgc2xvdFJlbmRlcjpTbG90UmVuZGVyKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gTWF0aC5yb3VuZCgoc3RhdGUucHJvZ3Jlc3MgLSBzdGF0ZS5taW4pIC8gKHN0YXRlLm1heCAtIHN0YXRlLm1pbikgKiAxMDApICsgJyUnO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWw9VkVsZW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBPYmplY3QuYXNzaWduKHtjbGFzczpcInRiLXByb2dyZXNzXCJ9LCBzdGF0ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBWRWxlbWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzOiBcInRiLXByb2dyZXNzLW1pblwiIH0sIHN0YXRlLm1pbiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBWRWxlbWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgd2lkdGg6IHZhbHVlIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWRWxlbWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzOiBcInRiLXByb2dyZXNzLXZhbHVlXCIgfSwgdmFsdWUpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZFbGVtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3M6IFwidGItcHJvZ3Jlc3MtbWF4XCIgfSwgc3RhdGUubWF4KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbFxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KVxyXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NDb21wb25lbnRMb2FkZXI6Q29tcG9uZW50TG9hZGVyPXtcclxuICAgIGNvbXBvbmVudDogcHJvZ3Jlc3NDb21wb25lbnQsXHJcblxyXG4gICAgbWF0Y2goZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdkaXYnICYmIGVsZW1lbnQuY2xhc3NOYW1lID09PSAndGItcHJvZ3Jlc3MnXHJcbiAgICB9LFxyXG4gICAgcmVhZChlbGVtZW50OiBIVE1MRWxlbWVudCwgY29udGV4dDogSW5qZWN0b3IsIHNsb3RQYXJzZXI6IFNsb3RQYXJzZXIpIDpDb21wb25lbnRJbnN0YW5jZXtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhdGU6UHJvZ3Jlc3NTdGF0ZT17XHJcbiAgICAgICAgICAgIHR5cGU6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0eXBlJyl8fFwicHJpbWFyeVwiLFxyXG4gICAgICAgICAgICBwcm9ncmVzczogTnVtYmVyKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdwcm9ncmVzcycpKSB8fCAwLFxyXG4gICAgICAgICAgICBtYXg6IE51bWJlcihlbGVtZW50LmdldEF0dHJpYnV0ZSgnbWF4JykpIHx8IDEwMCxcclxuICAgICAgICAgICAgbWluOiBOdW1iZXIoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ21pbicpKSB8fCAwXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NvbnN0IGNvbXBvbmVudCA9IG5ldyBUb2RvTGlzdENvbXBvbmVudChsaXN0Q29uZmlnLm1hcChpID0+IGkuc2xvdCkpO1xyXG4gICAgICAgIHJldHVybiBwcm9ncmVzc0NvbXBvbmVudC5jcmVhdGVJbnN0YW5jZShjb250ZXh0LHtzdGF0ZTpzdGF0ZX0pO1xyXG4gICAgfSxcclxuICAgIHJlc291cmNlczoge1xyXG4gICAgICAgIHN0eWxlczogW1xyXG4gICAgICAgICAgICBgXHJcbiAgICAgICAgICAgIC50Yi1wcm9ncmVzcyB7XHJcbiAgICAgICAgICAgICAgbWFyZ2luOiAyZW0gMCAxZW07XHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcclxuICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiA2cHg7XHJcbiAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC50Yi1wcm9ncmVzcyA+IGRpdiB7XHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2FhYTtcclxuICAgICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLnRiLXByb2dyZXNzID4gc3BhbiB7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgICAgIGJvdHRvbTogMTAwJTtcclxuICAgICAgICAgICAgICBmb250LXNpemU6MTJweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAudGItcHJvZ3Jlc3MtdmFsdWUge1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgICAgICByaWdodDogMDtcclxuICAgICAgICAgICAgICBib3R0b206IDEwMCU7XHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcclxuICAgICAgICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgICBwYWRkaW5nOiAzcHggOHB4O1xyXG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDUwJSkgdHJhbnNsYXRlWSgtNHB4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAudGItcHJvZ3Jlc3MtdmFsdWU6YWZ0ZXIge1xyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IFwiXCI7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgICAgIHRvcDogMTAwJTtcclxuICAgICAgICAgICAgICBsZWZ0OiA1MCU7XHJcbiAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IC00cHg7XHJcbiAgICAgICAgICAgICAgd2lkdGg6IDA7XHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiAwO1xyXG4gICAgICAgICAgICAgIGJvcmRlci13aWR0aDogNHB4O1xyXG4gICAgICAgICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiAjMDAwIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC50Yi1wcm9ncmVzcy1taW4ge1xyXG4gICAgICAgICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLnRiLXByb2dyZXNzLW1heCB7XHJcbiAgICAgICAgICAgICAgcmlnaHQ6IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLnRiLXByb2dyZXNzW3R5cGU9cHJpbWFyeV0gPiBkaXYge1xyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLnByaW1hcnl9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLnRiLXByb2dyZXNzW3R5cGU9aW5mb10gPiBkaXYge1xyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLmluZm99XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLnRiLXByb2dyZXNzW3R5cGU9c3VjY2Vzc10gPiBkaXYge1xyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLnN1Y2Nlc3N9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLnRiLXByb2dyZXNzW3R5cGU9d2FybmluZ10gPiBkaXYge1xyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLndhcm5pbmd9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLnRiLXByb2dyZXNzW3R5cGU9ZGFuZ2VyXSA+IGRpdiB7XHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcnMuZGFuZ2VyfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC50Yi1wcm9ncmVzc1t0eXBlPWRhcmtdID4gZGl2IHtcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9ycy5kYXJrfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC50Yi1wcm9ncmVzc1t0eXBlPWdyYXldID4gZGl2IHtcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9ycy5ncmF5fVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGBcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG59Il19