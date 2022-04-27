import { Form, FormConfig, FormRadio, FormTextField, I18n } from "@textbus/editor";
import { SizeSetter } from "./SizeSetter.FormItem";

export function getStyleControlFormConfig(injector){
    const i18n = injector.get(I18n);
    const childI18n = i18n.getContext('plugins.toolbar.imageTool.view');
    const StyleControlFormConfig:FormConfig={
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
    }
    return StyleControlFormConfig
}
