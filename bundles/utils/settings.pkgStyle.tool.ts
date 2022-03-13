import { Commander, Query, QueryStateType } from '@textbus/core';
import { createElement, createTextNode } from '@textbus/browser';
import {AttrState, DialogTool, Editor, FileUploader, Form, FormItem, FormRadio, FormTextField, I18n, imageComponent} from "@textbus/editor";
import { FormStatic } from '@textbus/editor/bundles/uikit/forms/form-static';
import {concatStyle} from "./output"
export let bPkg=false;
export let styleLink="";
export function pkgStyleToolConfigFactory(injector) {
    const i18n = injector.get(I18n);
    const editor = injector.get(Editor);
    const commander = injector.get(Commander);
    const fileUploader = injector.get(FileUploader);
    const childI18n = i18n.getContext('plugins.toolbar.imageTool.view');
    const btn=document.createElement("div");
    btn.innerText="打印到控制台"
    btn.setAttribute("style","height:30px;line-height:30px;color:#fff;background-color:#0f7fba;text-align:center;cursor:pointer;")
    btn.addEventListener("click",()=>{        
        let style=concatStyle(editor.getContents());
        style=style.replace(";",";\n  ")
        .replace("}",";\n}\n")
        .replace("{","{\n  ")
        
        console.log("1111",style);
        //TODO:或许可以下载文件
    });
    const form = new Form({
        title: "组件style替换为link",
        maxHeight: '260px',
        cancelBtnText: childI18n.get('cancelBtnText'),
        confirmBtnText: childI18n.get('confirmBtnText'),
        items: [
            new FormStatic({
                label: "导出组件style",
                content:btn
            }),
            new FormTextField({
                label: "link href",
                name: 'href',
                value:"http://106.55.148.203:8002/upload/textbus.component.style.css",
                placeholder: childI18n.get('linkInputPlaceholder'),
                validateFn(value) {
                    if (!value) {
                        return childI18n.get('validateErrorMessage');
                    }
                    return false;
                }
            }),
            new FormRadio({
                name:"replace",
                label:"是否替换",
                values:[
                    {label:"是",value:"yes",default:true},
                    {label:"否",value:"no",default:false}
                ]
            })
                  
        ]
    });
    return {
        iconClasses: ['textbus-icon-image'],
        label:'图片批量',
        tooltip: i18n.get('plugins.toolbar.imageTool.tooltip'),
        viewController: form,
        queryState() {
            return {
                state: QueryStateType.Normal,
                value: null
            };
        },
        useValue(formValue) {
            bPkg=formValue.get("replace")
            styleLink=formValue.get("href")
            console.log(bPkg,styleLink)
        }
    };
}
export function pkgStyleTool(){
    return new DialogTool(pkgStyleToolConfigFactory);
}
//# sourceMappingURL=image.tool.js.map