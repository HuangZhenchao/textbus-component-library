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
import {UIControlPanel} from "@/textbus/components/control-panel.plugin";
import {libraryTool} from "@/textbus/components/library.tool";
/*
import { PasteUploadEmitterPlugin } from './plugin/paste-upload-emitter-plugin';
import { GuardEndBlockPlugin } from './plugin/guard-end-block-plugin';
import { FullScreenPlugin } from './plugin/full-screen-plugin';
import { ImageAndVideoDragResizePlugin } from './plugin/image-and-video-drag-resize-plugin';
import { TableEditEnhancePlugin } from './plugin/table-edit-enhance-plugin';
import { SourcecodeModePlugin } from './plugin/sourcecode-mode-plugin';
import { DEVICE_OPTIONS, DeviceTogglePlugin } from './plugin/device-toggle-plugin';
*/
const layoutPlugin=new LayoutPlugin();
const controlPanel=new UIControlPanel();
import {api} from '@/utils/axios/api'
import {imagesTool} from "@/textbus/components/images/iamges.tool";
import {imageCardTool} from "@/textbus/components/imageCard/imageCard.tool";
import {todoListTool} from "@/textbus/components/todoList/todoList.tool";
import {todoListComponentLoader} from "@/textbus/components/todoList/todoList.component";
import {Commander, Translator} from "@textbus/core";
import {timelineComponentLoader} from "@/textbus/components/timeline/timeline.component";
import {timelineTool} from "@/textbus/components/timeline/timeline.tool";
import {stepTool} from "@/textbus/components/step/step.tool";
import {stepComponentLoader} from "@/textbus/components/step/step.component";
import {wordExplainComponentLoader} from "@/textbus/components/wordExplain/wordExplain.component";
import { progressComponentLoader } from './components/progress/progress.component';
import { katexComponentLoader } from './components/katex/katex.component';
import { katexTool } from './components/katex/katex.tool';
import { katexGroupTool } from './components/katex/katex.goup.tool';
export const defaultOptions:EditorOptions = {
    editingStyleSheets: [
        `[style*=color]:not([style*=background-color])
   a {color: inherit;}`,
        `a {text-decoration: underline; color: #449fdb; cursor: text;}`
    ],
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
    componentLoaders: [
        alertComponentLoader,//
        todoListComponentLoader,
        timelineComponentLoader,
        stepComponentLoader,
        wordExplainComponentLoader,
        progressComponentLoader,
        katexComponentLoader,
        
        audioComponentLoader,
        blockComponentLoader,
        blockquoteComponentLoader,
        headingComponentLoader,
        imageComponentLoader,
        listComponentLoader,
        paragraphComponentLoader,
        preComponentLoader,
        tableComponentLoader,
        videoComponentLoader,


        imageCardComponentLoader,
    ],
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
        new Toolbar([
            [historyBackTool, historyForwardTool],
            [defaultGroupTool],
            [headingTool],
            [boldTool, italicTool, strikeThroughTool, underlineTool],
            [olTool, ulTool],
            [fontSizeTool, textIndentTool],
            [colorTool, textBackgroundTool],
            [insertParagraphBeforeTool, insertParagraphAfterTool],
            [fontFamilyTool],
            [linkTool, unlinkTool],
            [imageTool],
            [textAlignTool],
            [tableAddTool, tableRemoveTool],
            [cleanTool],

            [myGroupTool],
            [libraryTool],
            //[imagesTool,imageCardTool],
            [katexGroupTool]

        ]),
        new LinkJumpTipPlugin(),
        new OutlinesPlugin(),
        //new ComponentLibraryPlugin(),
        controlPanel,
        layoutPlugin
        /*
        PasteUploadEmitterPlugin,//?
        GuardEndBlockPlugin,
        OutlinesPlugin,
        FullScreenPlugin,
        DeviceTogglePlugin,
        ImageAndVideoDragResizePlugin,
        TableEditEnhancePlugin,
        SourcecodeModePlugin,
        */
    ],
    providers:[
        {provide:LayoutPlugin,useValue:layoutPlugin},
        {provide:UIControlPanel,useValue:controlPanel}
        ],
    content: `<div textbus-editable="off" class="tb-alert tb-alert-fill tb-alert-primary">
                <div>这是 Alert 组件，这里的内容是不可以编辑的</div>
                <div textbus-editable="on"><br></div></div>`,
    placeholder: "占位12"
};
export function createEditor(selector) {
    const editor=new Editor(selector, defaultOptions);

    return editor;
}
//# sourceMappingURL=create-editor.js.map