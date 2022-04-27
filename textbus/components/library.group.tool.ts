import { GroupToolConfig,GroupTool, ToolType, ButtonToolMenu, DialogMenu } from '@textbus/editor';
import { I18n } from '@textbus/editor';
import {blockquoteToolConfigFactory} from '@textbus/editor';

import { alertToolConfigFactory ,imageCardToolConfigFactory,imagesToolConfigFactory,wordExplainToolConfigFactory} from './_public-api';

import { stepToolConfigFactory} from "./step/step.tool";
import { timelineToolConfigFactory} from "./timeline/timeline.tool";
import { todoListToolConfigFactory} from "./todoList/todoList.tool";
import { progressToolConfigFactory} from "./progress/progress.tool";
import { jumbotronToolConfigFactory } from './jumbotron/jumbotron.tool';
import { cesiumToolConfigFactory } from './map/cesium.tool';
import { detailToolConfigFactory } from './detail/detail.tool';
import { katexInlineToolConfigFactory,katexBlockToolConfigFactory } from './katex/katex.tool';
import { TreeGraphToolConfigFactory } from './antvG6/TreeGraph.tool';
export function insertObjectToolConfigFactory(injector){
    const i18n = injector.get(I18n);
    return {
        iconClasses:['textbus-icon-components'],
        label:"组件库",
        items: [
            Object.assign(Object.assign({}, alertToolConfigFactory(injector)), { type: ToolType.Button}) as ButtonToolMenu ,
            Object.assign(Object.assign({}, imagesToolConfigFactory(injector)), { type: ToolType.Dialog}) as DialogMenu ,
            Object.assign(Object.assign({}, imageCardToolConfigFactory(injector)), { type: ToolType.Dialog}) as DialogMenu ,
            Object.assign(Object.assign({}, todoListToolConfigFactory(injector)), { type: ToolType.Button}) as ButtonToolMenu ,
            Object.assign(Object.assign({}, timelineToolConfigFactory(injector)), { type: ToolType.Button}) as ButtonToolMenu ,
            Object.assign(Object.assign({}, stepToolConfigFactory(injector)), { type: ToolType.Button}) as ButtonToolMenu ,
            Object.assign(Object.assign({}, wordExplainToolConfigFactory(injector)), { type: ToolType.Button}) as ButtonToolMenu ,
            Object.assign(Object.assign({}, progressToolConfigFactory(injector)), { type: ToolType.Button}) as ButtonToolMenu ,
            Object.assign(Object.assign({}, jumbotronToolConfigFactory(injector)), { type: ToolType.Button}) as ButtonToolMenu ,
            Object.assign(Object.assign({}, cesiumToolConfigFactory(injector)), { type: ToolType.Button}) as ButtonToolMenu ,
            Object.assign(Object.assign({}, detailToolConfigFactory(injector)), { type: ToolType.Button}) as ButtonToolMenu ,
            Object.assign(Object.assign({}, katexInlineToolConfigFactory(injector)), { type: ToolType.Button}) as ButtonToolMenu ,
            Object.assign(Object.assign({}, katexBlockToolConfigFactory(injector)), { type: ToolType.Button}) as ButtonToolMenu ,
            Object.assign(Object.assign({}, TreeGraphToolConfigFactory(injector)), { type: ToolType.Dialog}) as DialogMenu ,
            ]
    };
}
export function libraryGroupTool(){
    return new GroupTool(insertObjectToolConfigFactory);
}