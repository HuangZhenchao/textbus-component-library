import { FormItem, FormTextareaParams } from "@textbus/editor";

export class FormTextareaColumn implements FormItem{
    name: string;
    elementRef: HTMLElement;
    input: any;
    readonly feedbackEle: any;
    config: any;
    sub?: any;
    readonly btn?: any;
    constructor(config:FormTextareaParams) {
        this.config=config;
        this.elementRef=document.createElement('div');
        this.name = config.name;
        this.elementRef.classList.add('textbus-form-group-column');
        this.elementRef.innerHTML = `
    <div class="textbus-control-label-column">${config.label}</div>
    <div class="textbus-control-value-column">
      <div class="textbus-input-group-column textbus-input-block">
        <textarea name="${config.name}" class="textbus-form-control textbus-input-block" placeholder="${config.placeholder || ''}">${config.value || ''}</textarea>
     </div>
     <div class="textbus-control-feedback-invalid"></div>
   </div>`;
        this.input = this.elementRef.querySelector('textarea');
        this.feedbackEle = this.elementRef.querySelector('.textbus-control-feedback-invalid');
    }
    reset() {
        this.input.value = this.config.value;
    }
    update(value) {
        this.uploaded();
        this.input.value = (value !== null && value !== void 0 ? value : this.config.value) || '';
    }
    getAttr() {
        return {
            name: this.config.name,
            value: this.input.value
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS10ZXh0YXJlYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91aWtpdC9mb3Jtcy9mb3JtLXRleHRhcmVhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE1BQU0sT0FBTyxZQUFZO0lBUXZCLFlBQW9CLE1BQTBCOzs7OzttQkFBMUI7O1FBUHBCOzs7O21CQUFhLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1dBQUE7UUFDMUM7Ozs7O1dBQVk7UUFDWjs7Ozs7V0FBa0M7UUFDbEM7Ozs7O1dBQTBCO1FBQzFCOzs7OztXQUF3QztRQUN4Qzs7Ozs7V0FBeUM7UUFHdkMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1FBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHO3lDQUNTLE1BQU0sQ0FBQyxLQUFLOzs7MEJBRzNCLE1BQU0sQ0FBQyxJQUFJLG1FQUFtRSxNQUFNLENBQUMsV0FBVyxJQUFJLEVBQUUsS0FBSyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUU7OztVQUc3SSxDQUFBO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUUsQ0FBQTtRQUN2RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLG1DQUFtQyxDQUFFLENBQUE7SUFDeEYsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQWUsQ0FBQTtJQUNoRCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQVc7UUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUN2RCxDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJO1lBQ3RCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7U0FDeEIsQ0FBQTtJQUNILENBQUM7SUFFRCxRQUFROztRQUNOLE1BQU0sUUFBUSxHQUFHLE1BQUEsTUFBQSxJQUFJLENBQUMsTUFBTSxFQUFDLFVBQVUsbURBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQy9ELElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLFFBQVEsSUFBSSxFQUFFLENBQUE7UUFDM0MsT0FBTyxDQUFDLFFBQVEsQ0FBQTtJQUNsQixDQUFDO0lBRU8sUUFBUTtRQUNkLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUE7U0FDdkI7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7UUFDM0IsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUE7WUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFBO1NBQ3ZEO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnQHRhbmJvL3N0cmVhbSdcblxuaW1wb3J0IHsgQXR0clN0YXRlLCBGb3JtVGV4dGFyZWFQYXJhbXMsIEZvcm1JdGVtIH0gZnJvbSAnLi9oZWxwJ1xuXG5leHBvcnQgY2xhc3MgRm9ybVRleHRhcmVhIGltcGxlbWVudHMgRm9ybUl0ZW08c3RyaW5nPiB7XG4gIGVsZW1lbnRSZWYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBuYW1lOiBzdHJpbmdcbiAgcHJpdmF0ZSBpbnB1dDogSFRNTFRleHRBcmVhRWxlbWVudFxuICBwcml2YXRlIHN1Yj86IFN1YnNjcmlwdGlvblxuICBwcml2YXRlIHJlYWRvbmx5IGJ0bj86IEhUTUxCdXR0b25FbGVtZW50XG4gIHByaXZhdGUgcmVhZG9ubHkgZmVlZGJhY2tFbGU6IEhUTUxFbGVtZW50XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IEZvcm1UZXh0YXJlYVBhcmFtcykge1xuICAgIHRoaXMubmFtZSA9IGNvbmZpZy5uYW1lXG4gICAgdGhpcy5lbGVtZW50UmVmLmNsYXNzTGlzdC5hZGQoJ3RleHRidXMtZm9ybS1ncm91cCcpXG4gICAgdGhpcy5lbGVtZW50UmVmLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwidGV4dGJ1cy1jb250cm9sLWxhYmVsXCI+JHtjb25maWcubGFiZWx9PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInRleHRidXMtY29udHJvbC12YWx1ZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRleHRidXMtaW5wdXQtZ3JvdXAgdGV4dGJ1cy1pbnB1dC1ibG9ja1wiPlxuICAgICAgICA8dGV4dGFyZWEgbmFtZT1cIiR7Y29uZmlnLm5hbWV9XCIgY2xhc3M9XCJ0ZXh0YnVzLWZvcm0tY29udHJvbCB0ZXh0YnVzLWlucHV0LWJsb2NrXCIgcGxhY2Vob2xkZXI9XCIke2NvbmZpZy5wbGFjZWhvbGRlciB8fCAnJ31cIj4ke2NvbmZpZy52YWx1ZSB8fCAnJ308L3RleHRhcmVhPlxuICAgICA8L2Rpdj5cbiAgICAgPGRpdiBjbGFzcz1cInRleHRidXMtY29udHJvbC1mZWVkYmFjay1pbnZhbGlkXCI+PC9kaXY+XG4gICA8L2Rpdj5gXG4gICAgdGhpcy5pbnB1dCA9IHRoaXMuZWxlbWVudFJlZi5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpIVxuICAgIHRoaXMuZmVlZGJhY2tFbGUgPSB0aGlzLmVsZW1lbnRSZWYucXVlcnlTZWxlY3RvcignLnRleHRidXMtY29udHJvbC1mZWVkYmFjay1pbnZhbGlkJykhXG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmlucHV0LnZhbHVlID0gdGhpcy5jb25maWcudmFsdWUgYXMgc3RyaW5nXG4gIH1cblxuICB1cGRhdGUodmFsdWU/OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnVwbG9hZGVkKClcbiAgICB0aGlzLmlucHV0LnZhbHVlID0gKHZhbHVlID8/IHRoaXMuY29uZmlnLnZhbHVlKSB8fCAnJ1xuICB9XG5cbiAgZ2V0QXR0cigpOiBBdHRyU3RhdGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHRoaXMuY29uZmlnLm5hbWUsXG4gICAgICB2YWx1ZTogdGhpcy5pbnB1dC52YWx1ZVxuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlKCkge1xuICAgIGNvbnN0IGZlZWRiYWNrID0gdGhpcy5jb25maWcudmFsaWRhdGVGbj8uKHRoaXMuZ2V0QXR0cigpLnZhbHVlKVxuICAgIHRoaXMuZmVlZGJhY2tFbGUuaW5uZXJUZXh0ID0gZmVlZGJhY2sgfHwgJydcbiAgICByZXR1cm4gIWZlZWRiYWNrXG4gIH1cblxuICBwcml2YXRlIHVwbG9hZGVkKCkge1xuICAgIGlmICh0aGlzLnN1Yikge1xuICAgICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKVxuICAgIH1cbiAgICB0aGlzLmlucHV0LmRpc2FibGVkID0gZmFsc2VcbiAgICBpZiAodGhpcy5idG4pIHtcbiAgICAgIHRoaXMuYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3RleHRidXMtYnRuLWxvYWRpbmcnKVxuICAgICAgdGhpcy5idG4uY2hpbGRyZW5bMF0uY2xhc3NOYW1lID0gJ3RleHRidXMtaWNvbi11cGxvYWQnXG4gICAgfVxuICB9XG59XG4iXX0=