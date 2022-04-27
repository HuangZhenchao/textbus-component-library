import ace from 'ace-builds';
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/mode-javascript";
ace.config.setModuleUrl('ace/mode/javascript_worker', require('file-loader?esModule=false!ace-builds/src-noconflict/worker-javascript.js'));
ace.config.setModuleUrl('ace/theme/xcode', require('file-loader?esModule=false!ace-builds/src-noconflict/theme-xcode.js'));
export class FormAceEditor {
    constructor(config) {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "elementRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "input", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "feedbackEle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sub", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "btn", {
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
        this.config = config;
        this.name = config.name;
        this.elementRef = document.createElement('div');
        this.elementRef.classList.add('textbus-form-group-column');
        this.elementRef.innerHTML = `
    <div class="textbus-control-label-column">${config.label}</div>
    <div class="textbus-control-value-column">
      <div class="textbus-input-group-column textbus-input-block">
        <div name="${config.name}" class="ace-container textbus-form-control textbus-input-block""></div>
     </div>
     <div class="textbus-control-feedback-invalid"></div>
   </div>`;
        this.input = this.elementRef.querySelector('.ace-container');
        this.feedbackEle = this.elementRef.querySelector('.textbus-control-feedback-invalid');
        this.editor = ace.edit(this.input);
        this.editor.setTheme('ace/theme/xcode');
        //let jsMode = ace.require('ace/mode/javascript').Mode;
        this.editor.session.setMode('ace/mode/javascript');
        this.editor.setValue(config.value);
    }
    reset() {
        this.editor.setValue(this.config.value);
    }
    update(value) {
        this.uploaded();
        this.editor.setValue((value !== null && value !== void 0 ? value : this.config.value) || '');
    }
    getAttr() {
        return {
            name: this.name,
            value: this.editor.getValue()
        };
    }
    validate() {
        var _a, _b;
        const feedback = (_b = (_a = this.config).validateFn) === null || _b === void 0 ? void 0 : _b.call(_a, this.getAttr().value);
        this.feedbackEle.innerText = feedback || '';
        return !feedback;
    }
    uploaded() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.input.disabled = false;
        if (this.btn) {
            this.btn.classList.remove('textbus-btn-loading');
            this.btn.children[0].className = 'textbus-icon-upload';
        }
    }
}
//# sourceMappingURL=form-textarea.js.map
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1hY2UtZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGV4dGJ1cy91dGlscy9mb3JtL2Zvcm0tYWNlLWVkaXRvci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sWUFBWSxDQUFBO0FBQzVCLE9BQU8sdUNBQXVDLENBQUM7QUFDL0MsT0FBTywyQ0FBMkMsQ0FBQztBQUNuRCxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSxPQUFPLENBQUMsMkVBQTJFLENBQUMsQ0FBQyxDQUFBO0FBQzNJLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxxRUFBcUUsQ0FBQyxDQUFDLENBQUE7QUFVMUgsTUFBTSxPQUFPLGFBQWE7SUFTdEIsWUFBWSxNQUEwQjtRQVJ0Qzs7Ozs7V0FBVTtRQUNWOzs7OztXQUFnQjtRQUNoQjs7Ozs7V0FBVztRQUNYOzs7OztXQUFpQjtRQUNqQjs7Ozs7V0FBWTtRQUNaOzs7OztXQUFTO1FBQ1Q7Ozs7O1dBQVM7UUFDVDs7Ozs7V0FBWTtRQUVSLElBQUksQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUc7Z0RBQ1ksTUFBTSxDQUFDLEtBQUs7OztxQkFHdkMsTUFBTSxDQUFDLElBQUk7OztVQUd0QixDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUV0RixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEMsdURBQXVEO1FBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0lBQ0QsS0FBSztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNELE1BQU0sQ0FBQyxLQUFLO1FBQ1IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBQ0QsT0FBTztRQUNILE9BQU87WUFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7U0FDaEMsQ0FBQztJQUNOLENBQUM7SUFDRCxRQUFRO1FBQ0osSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ1gsTUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUM1QyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxRQUFRO1FBQ0osSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMxQjtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUM7U0FDMUQ7SUFDTCxDQUFDO0NBQ0o7QUFDRCx5Q0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYWNlIGZyb20gJ2FjZS1idWlsZHMnXHJcbmltcG9ydCBcImFjZS1idWlsZHMvc3JjLW5vY29uZmxpY3QvdGhlbWUteGNvZGVcIjtcclxuaW1wb3J0IFwiYWNlLWJ1aWxkcy9zcmMtbm9jb25mbGljdC9tb2RlLWphdmFzY3JpcHRcIjtcclxuYWNlLmNvbmZpZy5zZXRNb2R1bGVVcmwoJ2FjZS9tb2RlL2phdmFzY3JpcHRfd29ya2VyJywgcmVxdWlyZSgnZmlsZS1sb2FkZXI/ZXNNb2R1bGU9ZmFsc2UhYWNlLWJ1aWxkcy9zcmMtbm9jb25mbGljdC93b3JrZXItamF2YXNjcmlwdC5qcycpKVxyXG5hY2UuY29uZmlnLnNldE1vZHVsZVVybCgnYWNlL3RoZW1lL3hjb2RlJywgcmVxdWlyZSgnZmlsZS1sb2FkZXI/ZXNNb2R1bGU9ZmFsc2UhYWNlLWJ1aWxkcy9zcmMtbm9jb25mbGljdC90aGVtZS14Y29kZS5qcycpKVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGb3JtQWNlRWRpdG9yUGFyYW1zIHtcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBwbGFjZWhvbGRlcj86IHN0cmluZztcclxuICAgIHZhbHVlPzogc3RyaW5nO1xyXG4gICAgdmFsaWRhdGVGbj8odmFsdWU6IGFueSk6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZvcm1BY2VFZGl0b3Ige1xyXG4gICAgbmFtZTogYW55O1xyXG4gICAgZWxlbWVudFJlZjogYW55O1xyXG4gICAgaW5wdXQ6IGFueTtcclxuICAgIGZlZWRiYWNrRWxlOiBhbnk7XHJcbiAgICBjb25maWc6IGFueTtcclxuICAgIHN1YjogYW55O1xyXG4gICAgYnRuOiBhbnk7XHJcbiAgICBlZGl0b3I6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzpGb3JtQWNlRWRpdG9yUGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWc9Y29uZmlnO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IGNvbmZpZy5uYW1lO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYuY2xhc3NMaXN0LmFkZCgndGV4dGJ1cy1mb3JtLWdyb3VwLWNvbHVtbicpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5pbm5lckhUTUwgPSBgXHJcbiAgICA8ZGl2IGNsYXNzPVwidGV4dGJ1cy1jb250cm9sLWxhYmVsLWNvbHVtblwiPiR7Y29uZmlnLmxhYmVsfTwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInRleHRidXMtY29udHJvbC12YWx1ZS1jb2x1bW5cIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInRleHRidXMtaW5wdXQtZ3JvdXAtY29sdW1uIHRleHRidXMtaW5wdXQtYmxvY2tcIj5cclxuICAgICAgICA8ZGl2IG5hbWU9XCIke2NvbmZpZy5uYW1lfVwiIGNsYXNzPVwiYWNlLWNvbnRhaW5lciB0ZXh0YnVzLWZvcm0tY29udHJvbCB0ZXh0YnVzLWlucHV0LWJsb2NrXCJcIj48L2Rpdj5cclxuICAgICA8L2Rpdj5cclxuICAgICA8ZGl2IGNsYXNzPVwidGV4dGJ1cy1jb250cm9sLWZlZWRiYWNrLWludmFsaWRcIj48L2Rpdj5cclxuICAgPC9kaXY+YDtcclxuICAgICAgICB0aGlzLmlucHV0ID0gdGhpcy5lbGVtZW50UmVmLnF1ZXJ5U2VsZWN0b3IoJy5hY2UtY29udGFpbmVyJyk7XHJcbiAgICAgICAgdGhpcy5mZWVkYmFja0VsZSA9IHRoaXMuZWxlbWVudFJlZi5xdWVyeVNlbGVjdG9yKCcudGV4dGJ1cy1jb250cm9sLWZlZWRiYWNrLWludmFsaWQnKTtcclxuXHJcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBhY2UuZWRpdCh0aGlzLmlucHV0KVxyXG4gICAgICAgIHRoaXMuZWRpdG9yLnNldFRoZW1lKCdhY2UvdGhlbWUveGNvZGUnKTtcclxuICAgICAgICAvL2xldCBqc01vZGUgPSBhY2UucmVxdWlyZSgnYWNlL21vZGUvamF2YXNjcmlwdCcpLk1vZGU7XHJcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2Vzc2lvbi5zZXRNb2RlKCdhY2UvbW9kZS9qYXZhc2NyaXB0Jyk7XHJcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0VmFsdWUoY29uZmlnLnZhbHVlKVxyXG4gICAgfVxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0VmFsdWUodGhpcy5jb25maWcudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy51cGxvYWRlZCgpO1xyXG4gICAgICAgIHRoaXMuZWRpdG9yLnNldFZhbHVlKCh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwID8gdmFsdWUgOiB0aGlzLmNvbmZpZy52YWx1ZSkgfHwgJycpO1xyXG4gICAgfVxyXG4gICAgZ2V0QXR0cigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVkaXRvci5nZXRWYWx1ZSgpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHZhbGlkYXRlKCkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgY29uc3QgZmVlZGJhY2sgPSAoX2IgPSAoX2EgPSB0aGlzLmNvbmZpZykudmFsaWRhdGVGbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIHRoaXMuZ2V0QXR0cigpLnZhbHVlKTtcclxuICAgICAgICB0aGlzLmZlZWRiYWNrRWxlLmlubmVyVGV4dCA9IGZlZWRiYWNrIHx8ICcnO1xyXG4gICAgICAgIHJldHVybiAhZmVlZGJhY2s7XHJcbiAgICB9XHJcbiAgICB1cGxvYWRlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdWIpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbnB1dC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLmJ0bi5jbGFzc0xpc3QucmVtb3ZlKCd0ZXh0YnVzLWJ0bi1sb2FkaW5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuLmNoaWxkcmVuWzBdLmNsYXNzTmFtZSA9ICd0ZXh0YnVzLWljb24tdXBsb2FkJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm9ybS10ZXh0YXJlYS5qcy5tYXAiXX0=