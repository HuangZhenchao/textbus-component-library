import { GroupToolConfig,GroupTool, ToolType } from '@textbus/editor';
import { I18n } from '@textbus/editor';
import {blockquoteToolConfigFactory} from '@textbus/editor';

import { alertToolConfigFactory } from './components/alert/alert.tool';
import { imageCardToolConfigFactory } from './components/imageCard/imageCard.tool';
import {imagesToolConfigFactory} from "./components/images/iamges.tool";
import {wordExplainToolConfigFactory} from "@/textbus/components/wordExplain/wordExplain.tool";
import {stepToolConfigFactory} from "@/textbus/components/step/step.tool";
import {timelineToolConfigFactory} from "@/textbus/components/timeline/timeline.tool";
import {todoListToolConfigFactory} from "@/textbus/components/todoList/todoList.tool";
import {progressToolConfigFactory} from "@/textbus/components/progress/progress.tool"
export function insertObjectToolConfigFactory(injector){
    const i18n = injector.get(I18n);
    return {
        iconClasses: ['textbus-icon-plus'],
        items: [//Object.assign(Object.assign({}, preToolConfigFactory(injector)), { type: ToolType.Select, label: i18n.get('plugins.toolbar.insertObjectTool.sourceCode') }),
            //Object.assign(Object.assign({}, lineHeightToolConfigFactory(injector)), { type: ToolType.Select, label: i18n.get('plugins.toolbar.insertObjectTool.lineHeight') }),
            //Object.assign(Object.assign({}, letterSpacingToolConfigFactory(injector)), { type: ToolType.Select, label: i18n.get('plugins.toolbar.insertObjectTool.letterSpacing') }),
            //Object.assign(Object.assign({}, emojiToolConfigFactory(injector)), { type: ToolType.Dropdown, label: i18n.get('plugins.toolbar.insertObjectTool.emoji') }),
            //Object.assign(Object.assign({}, audioToolConfigFactory(injector)), { type: ToolType.Dialog, label: i18n.get('plugins.toolbar.insertObjectTool.audio') }),
            //Object.assign(Object.assign({}, videoToolConfigFactory(injector)), { type: ToolType.Dialog, label: i18n.get('plugins.toolbar.insertObjectTool.video') }),
            //Object.assign(Object.assign({}, superscriptToolConfigFactory(injector)), { type: ToolType.Button, label: i18n.get('plugins.toolbar.insertObjectTool.superscript') }),
            //Object.assign(Object.assign({}, subscriptToolConfigFactory(injector)), { type: ToolType.Button, label: i18n.get('plugins.toolbar.insertObjectTool.subscript') }),
            //Object.assign(Object.assign({}, codeToolConfigFactory(injector)), { type: ToolType.Button, label: i18n.get('plugins.toolbar.insertObjectTool.code') }),
            Object.assign(Object.assign({}, alertToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, imagesToolConfigFactory(injector)), { type: ToolType.Dropdown}),
            Object.assign(Object.assign({}, imageCardToolConfigFactory(injector)), { type: ToolType.Dropdown}),
            Object.assign(Object.assign({}, todoListToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, timelineToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, stepToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, wordExplainToolConfigFactory(injector)), { type: ToolType.Button}),
            Object.assign(Object.assign({}, progressToolConfigFactory(injector)), { type: ToolType.Button}),
            //Object.assign(Object.assign({}, leftToRightToolConfigFactory(injector)), { type: ToolType.Button, label: i18n.get('plugins.toolbar.insertObjectTool.leftToRight') }),
            //Object.assign(Object.assign({}, rightToLeftToolConfigFactory(injector)), { type: ToolType.Button, label: i18n.get('plugins.toolbar.insertObjectTool.rightToLeft') })
            ]//[todoListTool,timelineTool,stepTool],
    };
}
export const myGroupTool = new GroupTool(insertObjectToolConfigFactory);