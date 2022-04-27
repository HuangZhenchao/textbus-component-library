import { blockquoteToolConfigFactory, ButtonTool, ButtonToolConfig, DialogTool, I18n, Form, FormRadio, FormTextField, FileUploader, FormSelect, ViewController, FormTextarea, FormItem } from '@textbus/editor'
import { Commander, ContentType, Slot, Selection, Query, QueryStateType, Injector } from '@textbus/core'
import { TreeGraphComponent, TreeGraphState } from './TreeGraph.component'
import { SlotComplete } from '../type'
import { Observable, Subject } from "@tanbo/stream"
import { createElement, createTextNode } from '@textbus/browser';
import { treeGraph } from './TreeGraph/TreeGraph';
import { Tab } from "../../utils/tab";

import { paragraphComponent } from "@textbus/editor"
import { SizeSetter } from '../../utils/form/SizeSetter.FormItem'
import { TabForm,TabViewControl,TabViewControlConfig} from '../../utils/form/tabForm'
import { getStyleControlFormConfig } from '../../utils/form/StyleControl.FormOption'
import { FormAceEditor } from '../../utils/form/form-ace-editor'

export function TreeGraphToolConfigFactory(injector) {
  const i18n = injector.get(I18n);
  const query = injector.get(Query);
  const commander = injector.get(Commander);
  const tabViewControlConfig:TabViewControlConfig={
    title: 'TreeGraph设置',
    tabForms: [
      new TabForm({
        name:"style",
        title:"style设置",
        items:getStyleControlFormConfig(injector).items
      }),
      new TabForm({
        name:"code",
        title:"代码",
        items:[new FormAceEditor({
          label:"代码",
          name:"code",
          value:treeGraph.FunctionString
        })]
      }),
      new TabForm({
        name:"data",
        title:"Data",
        items:[new FormAceEditor({
          label:"Data",
          name:"data",
          value:treeGraph.DataString
        })]
      })
    ]
  }
  return {
    iconClasses: ['textbus-icon-image'],
    label: "AntV-G6树图",
    tooltip: i18n.get('plugins.toolbar.imageTool.tooltip'),
    viewController: new TabViewControl(injector,tabViewControlConfig),
    queryState() {

      var instance;
      const queryState = query.queryWrappedComponent(TreeGraphComponent);
      const instanceState = (instance = queryState.value) === null || instance === void 0 ? void 0 : instance.toJSON().state;
      //console.log("queryState", queryState,instanceState)
      return {
        state: queryState.state,
        value: instanceState ? {
          style:{
            size:{
              width: instanceState.style.width || "100%",
              height: instanceState.style.height || "500px",
            },           
            margin: instanceState.style.margin,
            float: instanceState.style.float,
          },
          code:{
            code: instanceState.code
          },
          data:{
            data:instanceState.data
          }
        } : null
      };
    },
    useValue(value) {      
      if (value) {
        value = {
          style:{
            width: value.style.size.width || "100%",
            height: value.style.size.height || "500px",
            margin: value.style.margin,
            float: value.style.float,
          },          
          code: value.code.code,
          data: value.data.data,
        };
      }
      
      const queryState = query.queryWrappedComponent(TreeGraphComponent);
      console.log("useValue queryState",queryState)
      if (queryState.state === QueryStateType.Enabled) {
        //instance更新
        queryState.value.updateState(draft => {
          Object.assign(draft, value);
        });
      }
      else if (value === null || value === void 0 ? void 0 : value.code) {
        //console.log(value)
        commander.insert(TreeGraphComponent.createInstance(injector, {
          state: value
        }));
        commander.insert(paragraphComponent.createInstance(injector))
      }
    }
  };
}
export function TreeGraphTool() {
  return new DialogTool(TreeGraphToolConfigFactory);
}


