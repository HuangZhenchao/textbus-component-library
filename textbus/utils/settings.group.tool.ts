import { GroupToolConfig,GroupTool, ToolType, DialogTool, DropdownMenu } from '@textbus/editor';
import { I18n } from '@textbus/editor';
import { pkgStyleToolConfigFactory } from './settings.pkgStyle.tool';
export function settingsObjectToolConfigFactory(injector):GroupToolConfig{
    const i18n = injector.get(I18n);
    return {
        iconClasses:['textbus-icon-components'],
        items: [//Object.assign(Object.assign({}, preToolConfigFactory(injector)), { type: ToolType.Select, label: i18n.get('plugins.toolbar.insertObjectTool.sourceCode') }),
            //Object.assign(Object.assign({}, lineHeightToolConfigFactory(injector)), { type: ToolType.Select, label: i18n.get('plugins.toolbar.insertObjectTool.lineHeight') }),
            //Object.assign(Object.assign({}, letterSpacingToolConfigFactory(injector)), { type: ToolType.Select, label: i18n.get('plugins.toolbar.insertObjectTool.letterSpacing') }),
            //Object.assign(Object.assign({}, emojiToolConfigFactory(injector)), { type: ToolType.Dropdown, label: i18n.get('plugins.toolbar.insertObjectTool.emoji') }),
            //Object.assign(Object.assign({}, audioToolConfigFactory(injector)), { type: ToolType.Dialog, label: i18n.get('plugins.toolbar.insertObjectTool.audio') }),
            //Object.assign(Object.assign({}, videoToolConfigFactory(injector)), { type: ToolType.Dialog, label: i18n.get('plugins.toolbar.insertObjectTool.video') }),
            //Object.assign(Object.assign({}, superscriptToolConfigFactory(injector)), { type: ToolType.Button, label: i18n.get('plugins.toolbar.insertObjectTool.superscript') }),
            //Object.assign(Object.assign({}, subscriptToolConfigFactory(injector)), { type: ToolType.Button, label: i18n.get('plugins.toolbar.insertObjectTool.subscript') }),
            //Object.assign(Object.assign({}, codeToolConfigFactory(injector)), { type: ToolType.Button, label: i18n.get('plugins.toolbar.insertObjectTool.code') }),
            Object.assign(Object.assign({}, pkgStyleToolConfigFactory(injector)), { type: ToolType.Dialog}) as DropdownMenu,
            
            
            //Object.assign(Object.assign({}, leftToRightToolConfigFactory(injector)), { type: ToolType.Button, label: i18n.get('plugins.toolbar.insertObjectTool.leftToRight') }),
            //Object.assign(Object.assign({}, rightToLeftToolConfigFactory(injector)), { type: ToolType.Button, label: i18n.get('plugins.toolbar.insertObjectTool.rightToLeft') })
            ]//[todoListTool,timelineTool,stepTool],
    };
}
export function settingsGroupTool(){
    return new GroupTool(settingsObjectToolConfigFactory);
}