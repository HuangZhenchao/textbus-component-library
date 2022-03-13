import {
    EditorOptions,
    LinkJumpTipPlugin,
    Toolbar,
} from '@textbus/editor';
//导入ComponentLoader
import { audioComponentLoader, blockComponentLoader, blockquoteComponentLoader, headingComponentLoader, imageComponentLoader, listComponentLoader, paragraphComponentLoader, preComponentLoader, tableComponentLoader, videoComponentLoader } from "@textbus/editor";
import { alertComponentLoader, todoListComponentLoader, timelineComponentLoader, stepComponentLoader, wordExplainComponentLoader, progressComponentLoader, katexInlineComponentLoader, imageCardComponentLoader, jumbotronComponentLoader, baiduMapComponentLoader, tdtMapComponentLoader, cesiumComponentLoader, detailComponentLoader } from ".";
//FormatLoader
import { boldFormatLoader, italicFormatLoader, colorFormatLoader, fontFamilyFormatLoader, fontSizeFormatLoader, letterSpacingFormatLoader, lineHeightFormatLoader, strikeThroughFormatLoader, subscriptFormatLoader, superscriptFormatLoader, underlineFormatLoader, codeFormatLoader, blockBackgroundColorFormatLoader, linkFormatLoader, textBackgroundColorFormatLoader, textAlignFormatLoader, textIndentFormatLoader, verticalAlignFormatLoader, dirFormatLoader } from "@textbus/editor";
//Tool
import { historyBackTool, historyForwardTool, defaultGroupTool, headingTool, boldTool, italicTool, strikeThroughTool, underlineTool, olTool, ulTool, fontSizeTool, textIndentTool, colorTool, textBackgroundTool, insertParagraphBeforeTool, insertParagraphAfterTool, fontFamilyTool, linkTool, unlinkTool, imageTool, textAlignTool, tableAddTool, tableRemoveTool, cleanTool } from "@textbus/editor";
import { libraryGroupTool} from "./components/public-api";
import { settingsGroupTool } from "./utils/settings.group.tool";

import '@textbus/editor/bundles/textbus.min.css'
import './assets/component-library.plugin.scss'

import {OutlinesPlugin} from './plugin/outlines-plugin/outlines.plugin'

import {UIControlPanel} from "./components/control-panel.plugin";

const controlPanel=new UIControlPanel();

export const defaultComponentLoader=[
    alertComponentLoader,//
    todoListComponentLoader,
    timelineComponentLoader,
    stepComponentLoader,
    wordExplainComponentLoader,
    progressComponentLoader,
    katexInlineComponentLoader,
    //katexBlockComponentLoader,
    imageCardComponentLoader,//
    jumbotronComponentLoader,
    baiduMapComponentLoader,
    tdtMapComponentLoader,
    cesiumComponentLoader,
    detailComponentLoader,

    audioComponentLoader,//音频组件
    blockComponentLoader,//
    blockquoteComponentLoader,//
    headingComponentLoader,//
    imageComponentLoader,//图片组件
    listComponentLoader,//
    paragraphComponentLoader,//段落组件
    preComponentLoader,//
    tableComponentLoader,//表格组件
    videoComponentLoader,//视频组件
]
export const defaultFormatLoaders=[
    boldFormatLoader,
    italicFormatLoader,
    colorFormatLoader,
    fontFamilyFormatLoader,
    fontSizeFormatLoader,
    letterSpacingFormatLoader,
    lineHeightFormatLoader,
    strikeThroughFormatLoader,
    subscriptFormatLoader,
    superscriptFormatLoader,
    underlineFormatLoader,
    codeFormatLoader,
    blockBackgroundColorFormatLoader,
    linkFormatLoader,
    textBackgroundColorFormatLoader,
    textAlignFormatLoader,
    textIndentFormatLoader,
    verticalAlignFormatLoader,
    dirFormatLoader
]

export const defaultToolFactories=[
    [historyBackTool, historyForwardTool],//历史记录的后退、前进
    [defaultGroupTool],//默认的组件组，包括源代码等
    [headingTool],//标题
    [boldTool, italicTool, strikeThroughTool, underlineTool],//格式：加粗
    [olTool, ulTool],//列表
    [fontSizeTool, textIndentTool],//字体大小，缩进
    [colorTool, textBackgroundTool],//颜色、背景颜色
    [insertParagraphBeforeTool, insertParagraphAfterTool],//前面插入段落，后面插入段落
    [fontFamilyTool],//字体
    [linkTool, unlinkTool],//链接和取消链接
    [imageTool],//图片
    [textAlignTool],//文本对齐
    [tableAddTool, tableRemoveTool],//表格
    [cleanTool],//清除格式

    [libraryGroupTool],//自定义组
    //[libraryDropdownTool],//自定义组件库
    //[imagesTool,imageCardTool],
    //[katexGroupTool],//自定义,
    [settingsGroupTool]
]

export const defaultOptions:EditorOptions = {
    editingStyleSheets: [
        `[style*=color]:not([style*=background-color])
            a {color: inherit;}`,
        `a {text-decoration: underline; color: #449fdb; cursor: text;}`,
        `[textbus-editable=off] > * {
            user-select: text;
            cursor: default;
          }`
    ],

    //组件加载
    componentLoaders: defaultComponentLoader,
    ///格式
    formatLoaders:defaultFormatLoaders,
    plugins: [
        //工具栏配置
        new Toolbar(defaultToolFactories),
        new LinkJumpTipPlugin(),
        new OutlinesPlugin(),
        //new ComponentLibraryPlugin(),
        controlPanel,
    ],
    providers:[
            {provide:UIControlPanel,useValue:controlPanel}
        ],
    //content:'<p>ddd</p>',
    placeholder: "占位测试"
};