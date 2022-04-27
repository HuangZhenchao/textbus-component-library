import { Editor, Layout } from '@textbus/editor';
import { createElement, createTextNode, SelectionBridge } from "@textbus/browser";
import { Renderer } from "@textbus/core";
export class WordCountSelected {
    constructor() {
        Object.defineProperty(this, "layout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "container", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "eleCountChinese", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "eleCountLetter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "eleCountNum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "editor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "eleCountPunctuation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "selectionBridge", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.eleCountChinese = createTextNode("0");
        this.eleCountPunctuation = createTextNode("0");
        this.eleCountLetter = createTextNode("0");
        this.eleCountNum = createTextNode("0");
        this.container = createElement('div', {
            classes: ['textbus-plugin-wordcount'],
            styles: {
                //float:"right"
                "font-size": "12px",
                //height:"30px",
                "text-align": "center",
                display: "flex",
                margin: "0px 10px"
            },
            children: [
                createElement("div", {
                    styles: {
                        padding: "7px 10px"
                    },
                    children: [createTextNode("选择")]
                }),
                createElement("div", {
                    children: [
                        createTextNode("中文-"),
                        this.eleCountChinese,
                        createTextNode(" 标点-"),
                        this.eleCountPunctuation,
                        createElement('br'),
                        createTextNode(" 字母-"),
                        this.eleCountLetter,
                        createTextNode(" 数字-"),
                        this.eleCountNum,
                    ]
                })
            ],
        });
    }
    setup(injector) {
        this.layout = injector.get(Layout);
        this.editor = injector.get(Editor);
        this.selectionBridge = injector.get(SelectionBridge);
        this.layout.bottom.appendChild(this.container);
        this.renderer = injector.get(Renderer);
        this.selectionBridge.onSelectionChange.subscribe((range) => {
            var content = this.editor.getContents().content;
            if (!range) {
                return;
            }
            content = range.toString();
            var regChinese = /[\u4e00-\u9fa5]/g;
            var regPunctuation = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
            var regLetter = /[a-zA-z]/g;
            var regNum = /\d/g;
            var matchChinese = content.match(regChinese);
            var matchPunctuation = content.match(regPunctuation);
            var matchLetter = content.match(regLetter);
            var matchNum = content.match(regNum);
            this.eleCountChinese.textContent = matchChinese ? matchChinese.length.toString() : "0";
            this.eleCountPunctuation.textContent = matchPunctuation ? matchPunctuation.length.toString() : "0";
            this.eleCountLetter.textContent = matchLetter ? matchLetter.length.toString() : "0";
            this.eleCountNum.textContent = matchNum ? matchNum.length.toString() : "0";
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29yZENvdW50U2VsZWN0ZWQucGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGV4dGJ1cy9wbHVnaW4vd29yZC1jb3VudC9Xb3JkQ291bnRTZWxlY3RlZC5wbHVnaW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDOUMsT0FBTyxFQUFDLGFBQWEsRUFBRSxjQUFjLEVBQVMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDdkYsT0FBTyxFQUFXLFFBQVEsRUFBNkIsTUFBTSxlQUFlLENBQUM7QUFDN0UsTUFBTSxPQUFPLGlCQUFpQjtJQVUxQjtRQVRBOzs7OztXQUFvQjtRQUNwQjs7Ozs7V0FBdUI7UUFDdkI7Ozs7O1dBQW9CO1FBQ3BCOzs7OztXQUFzQjtRQUN0Qjs7Ozs7V0FBb0I7UUFDcEI7Ozs7O1dBQWlCO1FBQ2pCOzs7OztXQUFnQjtRQUNoQjs7Ozs7V0FBeUI7UUFDekI7Ozs7O1dBQWtDO1FBRTlCLElBQUksQ0FBQyxlQUFlLEdBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxtQkFBbUIsR0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFdBQVcsR0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsS0FBSyxFQUFFO1lBQ2xDLE9BQU8sRUFBRSxDQUFDLDBCQUEwQixDQUFDO1lBQ3JDLE1BQU0sRUFBQztnQkFDSCxlQUFlO2dCQUNmLFdBQVcsRUFBQyxNQUFNO2dCQUNsQixnQkFBZ0I7Z0JBQ2hCLFlBQVksRUFBQyxRQUFRO2dCQUNyQixPQUFPLEVBQUMsTUFBTTtnQkFDZCxNQUFN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USxFQUFFLENBQUEsQ0FBQyxDQUFBLEdBQUcsQ0FBQTtRQUN4RSxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzYW1wbGVUaW1lIH0gZnJvbSAnQHRhbmJvL3N0cmVhbSc7XHJcbmltcG9ydCB7RWRpdG9yLCBMYXlvdXR9IGZyb20gJ0B0ZXh0YnVzL2VkaXRvcidcclxuaW1wb3J0IHtjcmVhdGVFbGVtZW50LCBjcmVhdGVUZXh0Tm9kZSwgUGx1Z2luLFNlbGVjdGlvbkJyaWRnZX0gZnJvbSBcIkB0ZXh0YnVzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtJbmplY3RvciwgUmVuZGVyZXIsIFJvb3RDb21wb25lbnRSZWYsIFZFbGVtZW50fSBmcm9tIFwiQHRleHRidXMvY29yZVwiO1xyXG5leHBvcnQgY2xhc3MgV29yZENvdW50U2VsZWN0ZWQgaW1wbGVtZW50cyBQbHVnaW57XHJcbiAgICBwcml2YXRlIGxheW91dDogYW55O1xyXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IGFueTtcclxuICAgIHJlbmRlcmVyITogUmVuZGVyZXI7XHJcbiAgICBlbGVDb3VudENoaW5lc2U6IFRleHQ7XHJcbiAgICBlbGVDb3VudExldHRlcjpUZXh0O1xyXG4gICAgZWxlQ291bnROdW06VGV4dDtcclxuICAgIGVkaXRvciE6IEVkaXRvcjtcclxuICAgIGVsZUNvdW50UHVuY3R1YXRpb246IGFueTtcclxuICAgIHNlbGVjdGlvbkJyaWRnZSE6IFNlbGVjdGlvbkJyaWRnZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5lbGVDb3VudENoaW5lc2U9Y3JlYXRlVGV4dE5vZGUoXCIwXCIpO1xyXG4gICAgICAgIHRoaXMuZWxlQ291bnRQdW5jdHVhdGlvbj1jcmVhdGVUZXh0Tm9kZShcIjBcIik7XHJcbiAgICAgICAgdGhpcy5lbGVDb3VudExldHRlcj1jcmVhdGVUZXh0Tm9kZShcIjBcIik7XHJcbiAgICAgICAgdGhpcy5lbGVDb3VudE51bT1jcmVhdGVUZXh0Tm9kZShcIjBcIik7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1wbHVnaW4td29yZGNvdW50J10sXHJcbiAgICAgICAgICAgIHN0eWxlczp7XHJcbiAgICAgICAgICAgICAgICAvL2Zsb2F0OlwicmlnaHRcIlxyXG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjpcIjEycHhcIixcclxuICAgICAgICAgICAgICAgIC8vaGVpZ2h0OlwiMzBweFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6XCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6XCJmbGV4XCIsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW46XCIwcHggMTBweFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KFwiZGl2XCIse1xyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlczp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6XCI3cHggMTBweFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjpbY3JlYXRlVGV4dE5vZGUoXCLpgInmi6lcIildXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIix7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVUZXh0Tm9kZShcIuS4reaWhy1cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlQ291bnRDaGluZXNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVUZXh0Tm9kZShcIiDmoIfngrktXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZUNvdW50UHVuY3R1YXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2JyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRleHROb2RlKFwiIOWtl+avjS1cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlQ291bnRMZXR0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRleHROb2RlKFwiIOaVsOWtly1cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlQ291bnROdW0sXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0dXAoaW5qZWN0b3I6IEluamVjdG9yKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQ9aW5qZWN0b3IuZ2V0KExheW91dCk7XHJcbiAgICAgICAgdGhpcy5lZGl0b3I9aW5qZWN0b3IuZ2V0KEVkaXRvcik7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25CcmlkZ2U9aW5qZWN0b3IuZ2V0KFNlbGVjdGlvbkJyaWRnZSlcclxuICAgICAgICB0aGlzLmxheW91dC5ib3R0b20uYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXI9aW5qZWN0b3IuZ2V0KFJlbmRlcmVyKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbkJyaWRnZS5vblNlbGVjdGlvbkNoYW5nZS5zdWJzY3JpYmUoKHJhbmdlKSA9PntcclxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLmVkaXRvci5nZXRDb250ZW50cygpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGlmKCFyYW5nZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29udGVudD1yYW5nZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB2YXIgcmVnQ2hpbmVzZSA9IC9bXFx1NGUwMC1cXHU5ZmE1XS9nO1xyXG4gICAgICAgICAgICB2YXIgcmVnUHVuY3R1YXRpb24gPSAvW1xcdTMwMDJ8XFx1ZmYxZnxcXHVmZjAxfFxcdWZmMGN8XFx1MzAwMXxcXHVmZjFifFxcdWZmMWF8XFx1MjAxY3xcXHUyMDFkfFxcdTIwMTh8XFx1MjAxOXxcXHVmZjA4fFxcdWZmMDl8XFx1MzAwYXxcXHUzMDBifFxcdTMwMDh8XFx1MzAwOXxcXHUzMDEwfFxcdTMwMTF8XFx1MzAwZXxcXHUzMDBmfFxcdTMwMGN8XFx1MzAwZHxcXHVmZTQzfFxcdWZlNDR8XFx1MzAxNHxcXHUzMDE1fFxcdTIwMjZ8XFx1MjAxNHxcXHVmZjVlfFxcdWZlNGZ8XFx1ZmZlNV0vZztcclxuICAgICAgICAgICAgdmFyIHJlZ0xldHRlciA9IC9bYS16QS16XS9nO1xyXG4gICAgICAgICAgICB2YXIgcmVnTnVtID0gL1xcZC9nO1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2hDaGluZXNlPWNvbnRlbnQubWF0Y2gocmVnQ2hpbmVzZSk7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaFB1bmN0dWF0aW9uPWNvbnRlbnQubWF0Y2gocmVnUHVuY3R1YXRpb24pO1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2hMZXR0ZXI9Y29udGVudC5tYXRjaChyZWdMZXR0ZXIpO1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2hOdW09Y29udGVudC5tYXRjaChyZWdOdW0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5lbGVDb3VudENoaW5lc2UudGV4dENvbnRlbnQ9bWF0Y2hDaGluZXNlP21hdGNoQ2hpbmVzZS5sZW5ndGgudG9TdHJpbmcoKTpcIjBcIlxyXG4gICAgICAgICAgICB0aGlzLmVsZUNvdW50UHVuY3R1YXRpb24udGV4dENvbnRlbnQ9bWF0Y2hQdW5jdHVhdGlvbj9tYXRjaFB1bmN0dWF0aW9uLmxlbmd0aC50b1N0cmluZygpOlwiMFwiXHJcbiAgICAgICAgICAgIHRoaXMuZWxlQ291bnRMZXR0ZXIudGV4dENvbnRlbnQ9bWF0Y2hMZXR0ZXI/bWF0Y2hMZXR0ZXIubGVuZ3RoLnRvU3RyaW5nKCk6XCIwXCJcclxuICAgICAgICAgICAgdGhpcy5lbGVDb3VudE51bS50ZXh0Q29udGVudD1tYXRjaE51bT9tYXRjaE51bS5sZW5ndGgudG9TdHJpbmcoKTpcIjBcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iXX0=