import ace from 'ace-builds'
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/mode-javascript";
ace.config.setModuleUrl('ace/mode/javascript_worker', require('file-loader?esModule=false!ace-builds/src-noconflict/worker-javascript.js'))
ace.config.setModuleUrl('ace/theme/xcode', require('file-loader?esModule=false!ace-builds/src-noconflict/theme-xcode.js'))

export interface FormAceEditorParams {
    label: string;
    name: string;
    placeholder?: string;
    value?: string;
    validateFn?(value: any): string;
}

export class FormAceEditor {
    name: any;
    elementRef: any;
    input: any;
    feedbackEle: any;
    config: any;
    sub: any;
    btn: any;
    editor: any;
    constructor(config:FormAceEditorParams) {
        this.config=config;
        this.name = config.name;
        this.elementRef=document.createElement('div');
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

        this.editor = ace.edit(this.input)
        this.editor.setTheme('ace/theme/xcode');
        //let jsMode = ace.require('ace/mode/javascript').Mode;
        this.editor.session.setMode('ace/mode/javascript');
        this.editor.setValue(config.value)
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