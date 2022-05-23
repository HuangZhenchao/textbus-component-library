import { FormRadio, FormTextField, I18n } from "@textbus/editor";
import { SizeSetter } from "./SizeSetter.FormItem";
export function getStyleControlFormConfig(injector) {
    const i18n = injector.get(I18n);
    const childI18n = i18n.getContext('plugins.toolbar.imageTool.view');
    const StyleControlFormConfig = {
        items: [
            new SizeSetter('size', childI18n.getContext('sizeSetter')),
            new FormTextField({
                label: "边距设置",
                name: 'margin',
                value: "0px 0px 0px 0px",
                placeholder: "0px 0px 0px 0px",
                validateFn(value) {
                    if (!value) {
                        return childI18n.get('validateErrorMessage');
                    }
                    return false;
                }
            }),
            new FormRadio({
                label: childI18n.get('float.label'),
                name: 'float',
                values: [{
                        label: childI18n.get('float.noFloatLabel'),
                        value: 'none',
                        default: true
                    }, {
                        label: childI18n.get('float.floatToLeftLabel'),
                        value: 'left'
                    }, {
                        label: childI18n.get('float.floatToRightLabel'),
                        value: 'right'
                    }]
            }),
            /*
            new FormTextField({
              label: childI18n.get('linkLabel'),
              name: 'src',
              placeholder: childI18n.get('linkInputPlaceholder'),
              canUpload: true,
              uploadType: 'image',
              uploadBtnText: childI18n.get('uploadBtnText'),
              uploadMultiple: true,
              fileUploader,
              validateFn(value) {
                  if (!value) {
                      return childI18n.get('validateErrorMessage');
                  }
                  return false;
              }
          }),*/
        ]
    };
    return StyleControlFormConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3R5bGVDb250cm9sLkZvcm1PcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXh0YnVzL3V0aWxzL2Zvcm0vU3R5bGVDb250cm9sLkZvcm1PcHRpb24udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFbkQsTUFBTSxVQUFVLHlCQUF5QixDQUFDLFFBQVE7SUFDOUMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDcEUsTUFBTSxzQkFBc0IsR0FBWTtRQUNwQyxLQUFLLEVBQUU7WUFDSCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxRCxJQUFJLGFBQWEsQ0FBQztnQkFDaEIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLGlCQUFpQjtnQkFDeEIsV0FBVyxFQUFFLGlCQUFpQjtnQkFDOUIsVUFBVSxDQUFDLEtBQUs7b0JBQ2QsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDVixPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztxQkFDOUM7b0JBQ0QsT0FBTyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQzthQUNGLENBQUM7WUFDRixJQUFJLFNBQVMsQ0FBQztnQkFDWixLQUFLLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7Z0JBQ25DLElBQUksRUFBRSxPQUFPO2dCQUNiLE1BQU0sRUFBRSxDQUFDO3dCQUNQLEtBQUssRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO3dCQUMxQyxLQUFLLEVBQUUsTUFBTTt3QkFDYixPQUFPLEVBQUUsSUFBSTtxQkFDZCxFQUFFO3dCQUNELEtBQUssRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO3dCQUM5QyxLQUFLLEVBQUUsTUFBTTtxQkFDZCxFQUFFO3dCQUNELEtBQUssRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO3dCQUMvQyxLQUFLLEVBQUUsT0FBTztxQkFDZixDQUFDO2FBQ0gsQ0FBQztZQUNGOzs7Ozs7Ozs7Ozs7Ozs7O2VBZ0JHO1NBQ0o7S0FDTixDQUFBO0lBQ0QsT0FBTyxzQkFBc0IsQ0FBQTtBQUNqQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybSwgRm9ybUNvbmZpZywgRm9ybVJhZGlvLCBGb3JtVGV4dEZpZWxkLCBJMThuIH0gZnJvbSBcIkB0ZXh0YnVzL2VkaXRvclwiO1xyXG5pbXBvcnQgeyBTaXplU2V0dGVyIH0gZnJvbSBcIi4vU2l6ZVNldHRlci5Gb3JtSXRlbVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0eWxlQ29udHJvbEZvcm1Db25maWcoaW5qZWN0b3Ipe1xyXG4gICAgY29uc3QgaTE4biA9IGluamVjdG9yLmdldChJMThuKTtcclxuICAgIGNvbnN0IGNoaWxkSTE4biA9IGkxOG4uZ2V0Q29udGV4dCgncGx1Z2lucy50b29sYmFyLmltYWdlVG9vbC52aWV3Jyk7XHJcbiAgICBjb25zdCBTdHlsZUNvbnRyb2xGb3JtQ29uZmlnOkZvcm1Db25maWc9e1xyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgIG5ldyBTaXplU2V0dGVyKCdzaXplJywgY2hpbGRJMThuLmdldENvbnRleHQoJ3NpemVTZXR0ZXInKSksXHJcbiAgICAgICAgICAgIG5ldyBGb3JtVGV4dEZpZWxkKHtcclxuICAgICAgICAgICAgICBsYWJlbDogXCLovrnot53orr7nva5cIixcclxuICAgICAgICAgICAgICBuYW1lOiAnbWFyZ2luJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogXCIwcHggMHB4IDBweCAwcHhcIixcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCIwcHggMHB4IDBweCAwcHhcIixcclxuICAgICAgICAgICAgICB2YWxpZGF0ZUZuKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZEkxOG4uZ2V0KCd2YWxpZGF0ZUVycm9yTWVzc2FnZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIG5ldyBGb3JtUmFkaW8oe1xyXG4gICAgICAgICAgICAgIGxhYmVsOiBjaGlsZEkxOG4uZ2V0KCdmbG9hdC5sYWJlbCcpLFxyXG4gICAgICAgICAgICAgIG5hbWU6ICdmbG9hdCcsXHJcbiAgICAgICAgICAgICAgdmFsdWVzOiBbe1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6IGNoaWxkSTE4bi5nZXQoJ2Zsb2F0Lm5vRmxvYXRMYWJlbCcpLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHRydWVcclxuICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogY2hpbGRJMThuLmdldCgnZmxvYXQuZmxvYXRUb0xlZnRMYWJlbCcpLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdsZWZ0J1xyXG4gICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBjaGlsZEkxOG4uZ2V0KCdmbG9hdC5mbG9hdFRvUmlnaHRMYWJlbCcpLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdyaWdodCdcclxuICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgbmV3IEZvcm1UZXh0RmllbGQoe1xyXG4gICAgICAgICAgICAgIGxhYmVsOiBjaGlsZEkxOG4uZ2V0KCdsaW5rTGFiZWwnKSxcclxuICAgICAgICAgICAgICBuYW1lOiAnc3JjJyxcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogY2hpbGRJMThuLmdldCgnbGlua0lucHV0UGxhY2Vob2xkZXInKSxcclxuICAgICAgICAgICAgICBjYW5VcGxvYWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgdXBsb2FkVHlwZTogJ2ltYWdlJyxcclxuICAgICAgICAgICAgICB1cGxvYWRCdG5UZXh0OiBjaGlsZEkxOG4uZ2V0KCd1cGxvYWRCdG5UZXh0JyksXHJcbiAgICAgICAgICAgICAgdXBsb2FkTXVsdGlwbGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgZmlsZVVwbG9hZGVyLFxyXG4gICAgICAgICAgICAgIHZhbGlkYXRlRm4odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkSTE4bi5nZXQoJ3ZhbGlkYXRlRXJyb3JNZXNzYWdlJyk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pLCovXHJcbiAgICAgICAgICBdXHJcbiAgICB9XHJcbiAgICByZXR1cm4gU3R5bGVDb250cm9sRm9ybUNvbmZpZ1xyXG59XHJcbiJdfQ==