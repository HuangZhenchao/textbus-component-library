import {
    audioComponentLoader,
    blockBackgroundColorFormatLoader,
    blockComponentLoader,
    blockquoteComponentLoader,
    boldFormatLoader,
    boldTool,
    cleanTool,
    codeFormatLoader,
    colorFormatLoader,
    colorTool,
    defaultGroupTool,
    dirFormatLoader,
    Editor,
    EditorOptions,
    fontFamilyFormatLoader,
    fontFamilyTool,
    fontSizeFormatLoader,
    fontSizeTool,
    headingComponentLoader,
    headingTool,
    historyBackTool,
    historyForwardTool,
    imageComponentLoader,
    imageTool,
    insertParagraphAfterTool,
    insertParagraphBeforeTool,
    italicFormatLoader,
    italicTool,
    letterSpacingFormatLoader,
    lineHeightFormatLoader,
    linkFormatLoader,
    LinkJumpTipPlugin,
    linkTool,
    listComponentLoader,
    olTool,
    paragraphComponentLoader,
    preComponentLoader,
    strikeThroughFormatLoader,
    strikeThroughTool,
    subscriptFormatLoader,
    superscriptFormatLoader,
    tableAddTool,
    tableComponentLoader,
    tableRemoveTool,
    textAlignFormatLoader,
    textAlignTool,
    textBackgroundColorFormatLoader,
    textBackgroundTool,
    textIndentFormatLoader,
    textIndentTool,
    Toolbar,
    ulTool,
    underlineFormatLoader,
    underlineTool,
    unlinkTool,
    verticalAlignFormatLoader,
    videoComponentLoader,
} from '@textbus/editor';
import '@textbus/editor/bundles/textbus.min.css'
//import './components/component-library.plugin.scss'
//import './plugin/outlines-plugin/outlines.css'
import {alertComponentLoader} from './components/alert/alert.component';
//import {alertTool} from './alert/alert.tool'
import {myGroupTool} from './group.tool'
import {imageCardComponentLoader} from './components/imageCard/imageCard.component'
import {OutlinesPlugin} from './plugin/outlines-plugin/outlines.plugin'
//import {ComponentLibraryPlugin} from './components/component-library.plugin'
import {LayoutPlugin} from './plugin/layout.plugin'
import {UIControlPanel} from "./components/control-panel.plugin";
import {libraryTool} from "./components/library.tool";

const layoutPlugin=new LayoutPlugin();
const controlPanel=new UIControlPanel();
import {api} from '../src/utils/axios/api'
import {imagesTool} from "./components/images/iamges.tool";
import {imageCardTool} from "./components/imageCard/imageCard.tool";
import {todoListTool} from "./components/todoList/todoList.tool";
import {todoListComponentLoader} from "./components/todoList/todoList.component";
import {Commander, Translator} from "@textbus/core";
import {timelineComponentLoader} from "./components/timeline/timeline.component";
import {timelineTool} from "./components/timeline/timeline.tool";
import {stepTool} from "./components/step/step.tool";
import {stepComponentLoader} from "./components/step/step.component";
import {wordExplainComponentLoader} from "./components/wordExplain/wordExplain.component";
import { progressComponentLoader } from './components/progress/progress.component';
import { katexInlineComponentLoader } from './components/katex/katex.component';

import { katexInlineTool } from './components/katex/katex.tool';
import { katexGroupTool } from './components/katex/katex.goup.tool';
import { jumbotronTool } from './components/jumbotron/jumbotron.tool';
import { jumbotronComponentLoader } from './components/jumbotron/jumbotron.component';
import { baiduMapTool } from './components/map/baiduMap.tool';
import { baiduMapComponentLoader } from './components/map/baiduMap.component';
import { tdtMapComponentLoader } from './components/map/tdtMap.component';
import { tdtMapTool } from './components/map/tdtMap.tool';
import { OutputPlugin } from './plugin/output.plugin';
import { cesiumComponentLoader } from './components/map/cesium.component';
import { cesiumTool } from './components/map/cesium.tool';
import { selectTool } from './components/select/select.tool';
import { selectComponentLoader } from './components/select/select.component';


export const defaultOptions:EditorOptions = {
    editingStyleSheets: [
        `[style*=color]:not([style*=background-color])
   a {color: inherit;}`,
        `a {text-decoration: underline; color: #449fdb; cursor: text;}`
    ],
    //处理文件上传的方法
    uploader(config) {
        console.log('uploader')
        const fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('multiple','multiple');//多选
        switch (config.uploadType) {
            case 'image':
                fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
                break;
            case 'video':
                fileInput.setAttribute('accept', 'video/mp4');
                break;
            case 'audio':
                fileInput.setAttribute('accept', 'audio/ogg, audio/wav, audio/mpeg');
                break;
            default:
                fileInput.setAttribute('accept', '*');
        }

        fileInput.style.cssText = 'position: absolute; left: -9999px; top: -9999px; opacity: 0';
        const promise =  new Promise<string>(resolve => {
            fileInput.addEventListener('change', event => {
                const form = new FormData();
                const el=event.target as HTMLInputElement;

                for (const file of el.files!) {
                    //console.log('arrayBuffer',file.arrayBuffer())
                    form.append('file', file);
                }
                form.append('filename', 'file');
                console.log(typeof el.files,el.files!)
                document.body.removeChild(fileInput);
                api.upload.image(form).then(response => {
                    let result=response.data;
                    let src=''
                    result.data.forEach((i)=>{
                        src+=i.path+';';
                    })
                    resolve(src);
                })

            })
        })
        document.body.appendChild(fileInput);
        fileInput.click();
        return promise;

    },
    //组件加载
    componentLoaders: [
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
        selectComponentLoader,

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
    ],
    ///格式
    formatLoaders: [
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
    ],
    plugins: [
        //工具栏配置
        new Toolbar([
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

            [myGroupTool],//自定义组
            [libraryTool],//自定义组件库
            //[imagesTool,imageCardTool],
            [katexGroupTool],//自定义,
            [jumbotronTool,baiduMapTool,tdtMapTool,cesiumTool,selectTool]

        ]),
        new LinkJumpTipPlugin(),
        new OutlinesPlugin(),
        new OutputPlugin(),
        //new ComponentLibraryPlugin(),
        controlPanel,
        layoutPlugin
    ],
    providers:[
        {provide:LayoutPlugin,useValue:layoutPlugin},
        {provide:UIControlPanel,useValue:controlPanel}
        ],
    //content:'<p>ddd</p>',
    content: `<div textbus-editable="off" class="tb-alert tb-alert-fill tb-alert-primary">
                <div>这是 Alert 组件，这里的内容是不可以编辑的</div>
                <div textbus-editable="on"><br></div></div>`,
    placeholder: "占位12"
};
export function createEditor(selector,content) {
    
        defaultOptions.content=content;
        const editor=new Editor(selector, defaultOptions);
    
        return editor;
    
    
}
//# sourceMappingURL=create-editor.js.map