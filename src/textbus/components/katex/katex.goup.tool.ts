import { GroupToolConfig,GroupTool, ToolType, ButtonToolConfig, ButtonToolMenu } from '@textbus/editor';
import { I18n } from '@textbus/editor';
import {blockquoteToolConfigFactory} from '@textbus/editor';

import {wordExplainToolConfigFactory} from "@/textbus/components/wordExplain/wordExplain.tool";
import {stepToolConfigFactory} from "@/textbus/components/step/step.tool";
import {timelineToolConfigFactory} from "@/textbus/components/timeline/timeline.tool";
import {todoListToolConfigFactory} from "@/textbus/components/todoList/todoList.tool";
import {progressToolConfigFactory} from "@/textbus/components/progress/progress.tool"
import { katexToolConfigFactory } from './katex.tool';
export function katexGroupToolConfigFactory(injector):GroupToolConfig{
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
            Object.assign(Object.assign({}, katexToolConfigFactory(injector)), { type: ToolType.Button}) as ButtonToolMenu,
            //Object.assign(Object.assign({}, leftToRightToolConfigFactory(injector)), { type: ToolType.Button, label: i18n.get('plugins.toolbar.insertObjectTool.leftToRight') }),
            //Object.assign(Object.assign({}, rightToLeftToolConfigFactory(injector)), { type: ToolType.Button, label: i18n.get('plugins.toolbar.insertObjectTool.rightToLeft') })
            ]//[todoListTool,timelineTool,stepTool],
    };
}
export const katexGroupTool = new GroupTool(katexGroupToolConfigFactory);