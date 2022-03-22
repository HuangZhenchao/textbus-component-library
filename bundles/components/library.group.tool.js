import { GroupToolConfig,GroupTool, ToolType } from '@textbus/editor';
import { I18n } from '@textbus/editor';
import {blockquoteToolConfigFactory} from '@textbus/editor';

import { alertToolConfigFactory } from './alert/alert.tool';
import { imageCardToolConfigFactory } from './imageCard/imageCard.tool';
import { imagesToolConfigFactory} from "./images/iamges.tool";
import { wordExplainToolConfigFactory} from "./wordExplain/wordExplain.tool";
import { stepToolConfigFactory} from "./step/step.tool";
import { timelineToolConfigFactory} from "./timeline/timeline.tool";
import { todoListToolConfigFactory} from "./todoList/todoList.tool";
import { progressToolConfigFactory} from "./progress/progress.tool";
import { jumbotronToolConfigFactory } from './jumbotron/jumbotron.tool';
import { baiduMapToolConfigFactory } from './map/baiduMap.tool';
import { tdtMapToolConfigFactory } from './map/tdtMap.tool';
import { cesiumToolConfigFactory } from './map/cesium.tool';
import { detailToolConfigFactory } from './detail/detail.tool';
import { katexInlineToolConfigFactory,katexBlockToolConfigFactory } from './katex/katex.tool';
export function insertObjectToolConfigFactory(injector){
    const i18n = injector.get(I18n);
    return {
        iconClasses:['textbus-icon-components'],
        label:"组件库",
        items: [
            Object.assign(Object.assign({}, alertToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, imagesToolConfigFactory(injector)), { type: ToolType.Dialog}),
            Object.assign(Object.assign({}, imageCardToolConfigFactory(injector)), { type: ToolType.Dialog}),
            Object.assign(Object.assign({}, todoListToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, timelineToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, stepToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, wordExplainToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, progressToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, jumbotronToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, baiduMapToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, tdtMapToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, cesiumToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, detailToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, katexInlineToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, katexBlockToolConfigFactory(injector)), { type: ToolType.Button}),
            ]
    };
}
export function libraryGroupTool(){
    return new GroupTool(insertObjectToolConfigFactory);
}