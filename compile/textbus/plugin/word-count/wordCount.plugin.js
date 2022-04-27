import { Editor, Layout } from '@textbus/editor';
import { createElement, createTextNode, SelectionBridge } from "@textbus/browser";
import { Renderer } from "@textbus/core";
export class WordCountPlugin {
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
                    children: [createTextNode("全文")]
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
        this.layout.bottom.setAttribute("style", "display:flex");
        this.layout.bottom.appendChild(this.container);
        this.renderer = injector.get(Renderer);
        this.renderer.onViewChecked.pipe().subscribe(() => {
            var content = this.editor.getContents().content;
            var regex = /(<([^>]+)>)/ig;
            content = content.replace(regex, "");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZENvdW50LnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RleHRidXMvcGx1Z2luL3dvcmQtY291bnQvd29yZENvdW50LnBsdWdpbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQTtBQUM5QyxPQUFPLEVBQUMsYUFBYSxFQUFFLGNBQWMsRUFBUyxlQUFlLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RixPQUFPLEVBQVcsUUFBUSxFQUE2QixNQUFNLGVBQWUsQ0FBQztBQUM3RSxNQUFNLE9BQU8sZUFBZTtJQVV4QjtRQVRBOzs7OztXQUFvQjtRQUNwQjs7Ozs7V0FBdUI7UUFDdkI7Ozs7O1dBQW9CO1FBQ3BCOzs7OztXQUFzQjtRQUN0Qjs7Ozs7V0FBb0I7UUFDcEI7Ozs7O1dBQWlCO1FBQ2pCOzs7OztXQUFnQjtRQUNoQjs7Ozs7V0FBeUI7UUFDekI7Ozs7O1dBQWtDO1FBRTlCLElBQUksQ0FBQyxlQUFlLEdBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxtQkFBbUIsR0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFdBQVcsR0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsS0FBSyxFQUFFO1lBQ2xDLE9BQU8sRUFBRSxDQUFDLDBCQUEwQixDQUFDO1lBQ3JDLE1BQU0sRUFBQztnQkFDSCxlQUFlO2dCQUNmLFdBQVcsRUFBQyxNQUFNO2dCQUNsQixnQkFBZ0I7Z0JBQ2hCLFlBQVksRUFBQyxRQUFRO2dCQUNyQixPQUFPLEVBQUMsTUFBTTtnQkFDZCxNQUFNLEVBQUMsVUFBVTthQUNwQjtZ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QUMsV0FBVyxDQUFDLFdBQVcsR0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUEsQ0FBQyxDQUFBLEdBQUcsQ0FBQTtRQUN4RSxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzYW1wbGVUaW1lIH0gZnJvbSAnQHRhbmJvL3N0cmVhbSc7XHJcbmltcG9ydCB7RWRpdG9yLCBMYXlvdXR9IGZyb20gJ0B0ZXh0YnVzL2VkaXRvcidcclxuaW1wb3J0IHtjcmVhdGVFbGVtZW50LCBjcmVhdGVUZXh0Tm9kZSwgUGx1Z2luLFNlbGVjdGlvbkJyaWRnZX0gZnJvbSBcIkB0ZXh0YnVzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtJbmplY3RvciwgUmVuZGVyZXIsIFJvb3RDb21wb25lbnRSZWYsIFZFbGVtZW50fSBmcm9tIFwiQHRleHRidXMvY29yZVwiO1xyXG5leHBvcnQgY2xhc3MgV29yZENvdW50UGx1Z2luIGltcGxlbWVudHMgUGx1Z2lue1xyXG4gICAgcHJpdmF0ZSBsYXlvdXQ6IGFueTtcclxuICAgIHByaXZhdGUgY29udGFpbmVyOiBhbnk7XHJcbiAgICByZW5kZXJlciE6IFJlbmRlcmVyO1xyXG4gICAgZWxlQ291bnRDaGluZXNlOiBUZXh0O1xyXG4gICAgZWxlQ291bnRMZXR0ZXI6VGV4dDtcclxuICAgIGVsZUNvdW50TnVtOlRleHQ7XHJcbiAgICBlZGl0b3IhOiBFZGl0b3I7XHJcbiAgICBlbGVDb3VudFB1bmN0dWF0aW9uOiBhbnk7XHJcbiAgICBzZWxlY3Rpb25CcmlkZ2UhOiBTZWxlY3Rpb25CcmlkZ2U7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuZWxlQ291bnRDaGluZXNlPWNyZWF0ZVRleHROb2RlKFwiMFwiKTtcclxuICAgICAgICB0aGlzLmVsZUNvdW50UHVuY3R1YXRpb249Y3JlYXRlVGV4dE5vZGUoXCIwXCIpO1xyXG4gICAgICAgIHRoaXMuZWxlQ291bnRMZXR0ZXI9Y3JlYXRlVGV4dE5vZGUoXCIwXCIpO1xyXG4gICAgICAgIHRoaXMuZWxlQ291bnROdW09Y3JlYXRlVGV4dE5vZGUoXCIwXCIpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtcGx1Z2luLXdvcmRjb3VudCddLFxyXG4gICAgICAgICAgICBzdHlsZXM6e1xyXG4gICAgICAgICAgICAgICAgLy9mbG9hdDpcInJpZ2h0XCJcclxuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6XCIxMnB4XCIsXHJcbiAgICAgICAgICAgICAgICAvL2hlaWdodDpcIjMwcHhcIixcclxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOlwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OlwiZmxleFwiLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luOlwiMHB4IDEwcHhcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudChcImRpdlwiLHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZXM6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOlwiN3B4IDEwcHhcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46W2NyZWF0ZVRleHROb2RlKFwi5YWo5paHXCIpXVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KFwiZGl2XCIse1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOltcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlVGV4dE5vZGUoXCLkuK3mloctXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZUNvdW50Q2hpbmVzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlVGV4dE5vZGUoXCIg5qCH54K5LVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVDb3VudFB1bmN0dWF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCdicicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVUZXh0Tm9kZShcIiDlrZfmr40tXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZUNvdW50TGV0dGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVUZXh0Tm9kZShcIiDmlbDlrZctXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZUNvdW50TnVtLFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNldHVwKGluamVjdG9yOiBJbmplY3Rvcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGF5b3V0PWluamVjdG9yLmdldChMYXlvdXQpO1xyXG4gICAgICAgIHRoaXMuZWRpdG9yPWluamVjdG9yLmdldChFZGl0b3IpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQnJpZGdlPWluamVjdG9yLmdldChTZWxlY3Rpb25CcmlkZ2UpXHJcbiAgICAgICAgdGhpcy5sYXlvdXQuYm90dG9tLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJkaXNwbGF5OmZsZXhcIilcclxuICAgICAgICB0aGlzLmxheW91dC5ib3R0b20uYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXI9aW5qZWN0b3IuZ2V0KFJlbmRlcmVyKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLm9uVmlld0NoZWNrZWQucGlwZSgpLnN1YnNjcmliZSgoKSA9PntcclxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLmVkaXRvci5nZXRDb250ZW50cygpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHZhciByZWdleCA9IC8oPChbXj5dKyk+KS9pZztcclxuICAgICAgICAgICAgY29udGVudD1jb250ZW50LnJlcGxhY2UocmVnZXgsXCJcIik7XHJcbiAgICAgICAgICAgIHZhciByZWdDaGluZXNlID0gL1tcXHU0ZTAwLVxcdTlmYTVdL2c7XHJcbiAgICAgICAgICAgIHZhciByZWdQdW5jdHVhdGlvbiA9IC9bXFx1MzAwMnxcXHVmZjFmfFxcdWZmMDF8XFx1ZmYwY3xcXHUzMDAxfFxcdWZmMWJ8XFx1ZmYxYXxcXHUyMDFjfFxcdTIwMWR8XFx1MjAxOHxcXHUyMDE5fFxcdWZmMDh8XFx1ZmYwOXxcXHUzMDBhfFxcdTMwMGJ8XFx1MzAwOHxcXHUzMDA5fFxcdTMwMTB8XFx1MzAxMXxcXHUzMDBlfFxcdTMwMGZ8XFx1MzAwY3xcXHUzMDBkfFxcdWZlNDN8XFx1ZmU0NHxcXHUzMDE0fFxcdTMwMTV8XFx1MjAyNnxcXHUyMDE0fFxcdWZmNWV8XFx1ZmU0ZnxcXHVmZmU1XS9nO1xyXG4gICAgICAgICAgICB2YXIgcmVnTGV0dGVyID0gL1thLXpBLXpdL2c7XHJcbiAgICAgICAgICAgIHZhciByZWdOdW0gPSAvXFxkL2c7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaENoaW5lc2U9Y29udGVudC5tYXRjaChyZWdDaGluZXNlKTtcclxuICAgICAgICAgICAgdmFyIG1hdGNoUHVuY3R1YXRpb249Y29udGVudC5tYXRjaChyZWdQdW5jdHVhdGlvbik7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaExldHRlcj1jb250ZW50Lm1hdGNoKHJlZ0xldHRlcik7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaE51bT1jb250ZW50Lm1hdGNoKHJlZ051bSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmVsZUNvdW50Q2hpbmVzZS50ZXh0Q29udGVudD1tYXRjaENoaW5lc2U/bWF0Y2hDaGluZXNlLmxlbmd0aC50b1N0cmluZygpOlwiMFwiXHJcbiAgICAgICAgICAgIHRoaXMuZWxlQ291bnRQdW5jdHVhdGlvbi50ZXh0Q29udGVudD1tYXRjaFB1bmN0dWF0aW9uP21hdGNoUHVuY3R1YXRpb24ubGVuZ3RoLnRvU3RyaW5nKCk6XCIwXCJcclxuICAgICAgICAgICAgdGhpcy5lbGVDb3VudExldHRlci50ZXh0Q29udGVudD1tYXRjaExldHRlcj9tYXRjaExldHRlci5sZW5ndGgudG9TdHJpbmcoKTpcIjBcIlxyXG4gICAgICAgICAgICB0aGlzLmVsZUNvdW50TnVtLnRleHRDb250ZW50PW1hdGNoTnVtP21hdGNoTnVtLmxlbmd0aC50b1N0cmluZygpOlwiMFwiXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSJdfQ==