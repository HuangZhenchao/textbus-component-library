import { LinkJumpTipPlugin, Toolbar, } from '@textbus/editor';
//导入ComponentLoader
import { audioComponentLoader, blockComponentLoader, blockquoteComponentLoader, headingComponentLoader, imageComponentLoader, listComponentLoader, paragraphComponentLoader, preComponentLoader, tableComponentLoader, videoComponentLoader } from "@textbus/editor";
import { alertComponentLoader, todoListComponentLoader, timelineComponentLoader, stepComponentLoader, wordExplainComponentLoader, progressComponentLoader, katexInlineComponentLoader, imageCardComponentLoader, jumbotronComponentLoader, cesiumComponentLoader, detailComponentLoader } from "./components/_public-api";
//FormatLoader
import { boldFormatLoader, italicFormatLoader, colorFormatLoader, fontFamilyFormatLoader, fontSizeFormatLoader, letterSpacingFormatLoader, lineHeightFormatLoader, strikeThroughFormatLoader, subscriptFormatLoader, superscriptFormatLoader, underlineFormatLoader, codeFormatLoader, blockBackgroundColorFormatLoader, linkFormatLoader, textBackgroundColorFormatLoader, textAlignFormatLoader, textIndentFormatLoader, verticalAlignFormatLoader, dirFormatLoader } from "@textbus/editor";
//Tool
import { historyBackTool, historyForwardTool, defaultGroupTool, headingTool, boldTool, italicTool, strikeThroughTool, underlineTool, olTool, ulTool, fontSizeTool, textIndentTool, colorTool, textBackgroundTool, insertParagraphBeforeTool, insertParagraphAfterTool, fontFamilyTool, linkTool, unlinkTool, imageTool, textAlignTool, tableAddTool, tableRemoveTool, cleanTool } from "@textbus/editor";
import { libraryGroupTool, libraryDropdownTool } from "./plugin/_public-api";
import { OutlinesPlugin } from './plugin/_public-api';
import { TreeGraphComponentLoader } from './components/antvG6/TreeGraph.component';
import { LibraryDrawerPlugin } from './plugin/library.drawer.plugin';
import { pageConfigComponentLoader } from './components/_config/config.component';
import { PageConfigPlugin } from './plugin/page-config.plugin/pageConfig.plugin';
//const controlPanel=new UIControlPanel();
export const defaultComponentLoader = [
    pageConfigComponentLoader,
    alertComponentLoader,
    todoListComponentLoader,
    timelineComponentLoader,
    stepComponentLoader,
    wordExplainComponentLoader,
    progressComponentLoader,
    katexInlineComponentLoader,
    //katexBlockComponentLoader,
    imageCardComponentLoader,
    jumbotronComponentLoader,
    cesiumComponentLoader,
    detailComponentLoader,
    TreeGraphComponentLoader,
    audioComponentLoader,
    blockComponentLoader,
    blockquoteComponentLoader,
    headingComponentLoader,
    imageComponentLoader,
    listComponentLoader,
    paragraphComponentLoader,
    preComponentLoader,
    tableComponentLoader,
    videoComponentLoader, //视频组件
];
export const defaultFormatLoaders = [
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
];
export const defaultToolFactories = [
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
    [libraryGroupTool],
    [libraryDropdownTool], //自定义组件库
    //[imagesTool,imageCardTool],
    //[katexGroupTool],//自定义,
    //[settingsGroupTool]
];
export const defaultOptions = {
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
    formatLoaders: defaultFormatLoaders,
    plugins: [
        //工具栏配置
        new Toolbar(defaultToolFactories),
        new LinkJumpTipPlugin(),
        new OutlinesPlugin(),
        //new WordCountPlugin(),
        //new WordCountSelected(),
        new LibraryDrawerPlugin(true),
        new LibraryDrawerPlugin(false),
        new PageConfigPlugin()
    ],
    providers: [],
    //content:'<p>ddd</p>',
    placeholder: "占位测试"
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdE9wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXh0YnVzL2RlZmF1bHRPcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFLSCxpQkFBaUIsRUFDakIsT0FBTyxHQUNWLE1BQU0saUJBQWlCLENBQUM7QUFDekIsbUJBQW1CO0FBQ25CLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSx5QkFBeUIsRUFBRSxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRSx3QkFBd0IsRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3JRLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSx1QkFBdUIsRUFBRSx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBRSwwQkFBMEIsRUFBRSx1QkFBdUIsRUFBRSwwQkFBMEIsRUFBRSx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFULGNBQWM7QUFDZCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUUsb0JBQW9CLEVBQUUseUJBQXlCLEVBQUUsc0JBQXNCLEVBQUUseUJBQXlCLEVBQUUscUJBQXFCLEVBQUUsdUJBQXVCLEVBQUUscUJBQXFCLEVBQUUsZ0JBQWdCLEVBQUUsZ0NBQWdDLEVBQUUsZ0JBQWdCLEVBQUUsK0JBQStCLEVBQUUscUJBQXFCLEVBQUUsc0JBQXNCLEVBQUUseUJBQXlCLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL2QsTUFBTTtBQUNOLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFB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O0lBQ0wsYUFBYSxFQUFDLG9CQUFvQjtJQUNsQyxPQUFPLEVBQUU7UUFDTCxPQUFPO1FBQ1AsSUFBSSxPQUFPLENBQUMsb0JBQW9CLENBQUM7UUFDakMsSUFBSSxpQkFBaUIsRUFBRTtRQUN2QixJQUFJLGNBQWMsRUFBRTtRQUNwQix3QkFBd0I7UUFDeEIsMEJBQTBCO1FBQzFCLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDO1FBQzdCLElBQUksbUJBQW1CLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksZ0JBQWdCLEVBQUU7S0FDekI7SUFDRCxTQUFTLEVBQUMsRUFBRTtJQUNaLHVCQUF1QjtJQUN2QixXQUFXLEVBQUUsTUFBTTtDQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIGJsb2NrcXVvdGVUb29sLFxyXG4gICAgRWRpdG9yQ29udHJvbGxlcixcclxuICAgIEVkaXRvck9wdGlvbnMsXHJcbiAgICBMYXlvdXQsXHJcbiAgICBMaW5rSnVtcFRpcFBsdWdpbixcclxuICAgIFRvb2xiYXIsXHJcbn0gZnJvbSAnQHRleHRidXMvZWRpdG9yJztcclxuLy/lr7zlhaVDb21wb25lbnRMb2FkZXJcclxuaW1wb3J0IHsgYXVkaW9Db21wb25lbnRMb2FkZXIsIGJsb2NrQ29tcG9uZW50TG9hZGVyLCBibG9ja3F1b3RlQ29tcG9uZW50TG9hZGVyLCBoZWFkaW5nQ29tcG9uZW50TG9hZGVyLCBpbWFnZUNvbXBvbmVudExvYWRlciwgbGlzdENvbXBvbmVudExvYWRlciwgcGFyYWdyYXBoQ29tcG9uZW50TG9hZGVyLCBwcmVDb21wb25lbnRMb2FkZXIsIHRhYmxlQ29tcG9uZW50TG9hZGVyLCB2aWRlb0NvbXBvbmVudExvYWRlciB9IGZyb20gXCJAdGV4dGJ1cy9lZGl0b3JcIjtcclxuaW1wb3J0IHsgYWxlcnRDb21wb25lbnRMb2FkZXIsIHRvZG9MaXN0Q29tcG9uZW50TG9hZGVyLCB0aW1lbGluZUNvbXBvbmVudExvYWRlciwgc3RlcENvbXBvbmVudExvYWRlciwgd29yZEV4cGxhaW5Db21wb25lbnRMb2FkZXIsIHByb2dyZXNzQ29tcG9uZW50TG9hZGVyLCBrYXRleElubGluZUNvbXBvbmVudExvYWRlciwgaW1hZ2VDYXJkQ29tcG9uZW50TG9hZGVyLCBqdW1ib3Ryb25Db21wb25lbnRMb2FkZXIsIGNlc2l1bUNvbXBvbmVudExvYWRlciwgZGV0YWlsQ29tcG9uZW50TG9hZGVyIH0gZnJvbSBcIi4vY29tcG9uZW50cy9fcHVibGljLWFwaVwiO1xyXG4vL0Zvcm1hdExvYWRlclxyXG5pbXBvcnQgeyBib2xkRm9ybWF0TG9hZGVyLCBpdGFsaWNGb3JtYXRMb2FkZXIsIGNvbG9yRm9ybWF0TG9hZGVyLCBmb250RmFtaWx5Rm9ybWF0TG9hZGVyLCBmb250U2l6ZUZvcm1hdExvYWRlciwgbGV0dGVyU3BhY2luZ0Zvcm1hdExvYWRlciwgbGluZUhlaWdodEZvcm1hdExvYWRlciwgc3RyaWtlVGhyb3VnaEZvcm1hdExvYWRlciwgc3Vic2NyaXB0Rm9ybWF0TG9hZGVyLCBzdXBlcnNjcmlwdEZvcm1hdExvYWRlciwgdW5kZXJsaW5lRm9ybWF0TG9hZGVyLCBjb2RlRm9ybWF0TG9hZGVyLCBibG9ja0JhY2tncm91bmRDb2xvckZvcm1hdExvYWRlciwgbGlua0Zvcm1hdExvYWRlciwgdGV4dEJhY2tncm91bmRDb2xvckZvcm1hdExvYWRlciwgdGV4dEFsaWduRm9ybWF0TG9hZGVyLCB0ZXh0SW5kZW50Rm9ybWF0TG9hZGVyLCB2ZXJ0aWNhbEFsaWduRm9ybWF0TG9hZGVyLCBkaXJGb3JtYXRMb2FkZXIgfSBmcm9tIFwiQHRleHRidXMvZWRpdG9yXCI7XHJcbi8vVG9vbFxyXG5pbXBvcnQgeyBoaXN0b3J5QmFja1Rvb2wsIGhpc3RvcnlGb3J3YXJkVG9vbCwgZGVmYXVsdEdyb3VwVG9vbCwgaGVhZGluZ1Rvb2wsIGJvbGRUb29sLCBpdGFsaWNUb29sLCBzdHJpa2VUaHJvdWdoVG9vbCwgdW5kZXJsaW5lVG9vbCwgb2xUb29sLCB1bFRvb2wsIGZvbnRTaXplVG9vbCwgdGV4dEluZGVudFRvb2wsIGNvbG9yVG9vbCwgdGV4dEJhY2tncm91bmRUb29sLCBpbnNlcnRQYXJhZ3JhcGhCZWZvcmVUb29sLCBpbnNlcnRQYXJhZ3JhcGhBZnRlclRvb2wsIGZvbnRGYW1pbHlUb29sLCBsaW5rVG9vbCwgdW5saW5rVG9vbCwgaW1hZ2VUb29sLCB0ZXh0QWxpZ25Ub29sLCB0YWJsZUFkZFRvb2wsIHRhYmxlUmVtb3ZlVG9vbCwgY2xlYW5Ub29sIH0gZnJvbSBcIkB0ZXh0YnVzL2VkaXRvclwiO1xyXG5pbXBvcnQgeyBsaWJyYXJ5R3JvdXBUb29sLGxpYnJhcnlEcm9wZG93blRvb2x9IGZyb20gXCIuL3BsdWdpbi9fcHVibGljLWFwaVwiO1xyXG5pbXBvcnQgeyBzZXR0aW5nc0dyb3VwVG9vbCwgfSBmcm9tIFwiLi91dGlscy9zZXR0aW5ncy5ncm91cC50b29sXCI7XHJcblxyXG5cclxuaW1wb3J0IHtPdXRsaW5lc1BsdWdpbixXb3JkQ291bnRQbHVnaW4sV29yZENvdW50U2VsZWN0ZWR9IGZyb20gJy4vcGx1Z2luL19wdWJsaWMtYXBpJ1xyXG5pbXBvcnQgeyBUcmVlR3JhcGhDb21wb25lbnRMb2FkZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvYW50dkc2L1RyZWVHcmFwaC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMaWJyYXJ5RHJhd2VyUGx1Z2luIH0gZnJvbSAnLi9wbHVnaW4vbGlicmFyeS5kcmF3ZXIucGx1Z2luJztcclxuaW1wb3J0IHsgcGFnZUNvbmZpZ0NvbXBvbmVudExvYWRlciB9IGZyb20gJy4vY29tcG9uZW50cy9fY29uZmlnL2NvbmZpZy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQYWdlQ29uZmlnUGx1Z2luIH0gZnJvbSAnLi9wbHVnaW4vcGFnZS1jb25maWcucGx1Z2luL3BhZ2VDb25maWcucGx1Z2luJztcclxuXHJcbi8vY29uc3QgY29udHJvbFBhbmVsPW5ldyBVSUNvbnRyb2xQYW5lbCgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb21wb25lbnRMb2FkZXI9W1xyXG4gICAgcGFnZUNvbmZpZ0NvbXBvbmVudExvYWRlcixcclxuICAgIGFsZXJ0Q29tcG9uZW50TG9hZGVyLC8vXHJcbiAgICB0b2RvTGlzdENvbXBvbmVudExvYWRlcixcclxuICAgIHRpbWVsaW5lQ29tcG9uZW50TG9hZGVyLFxyXG4gICAgc3RlcENvbXBvbmVudExvYWRlcixcclxuICAgIHdvcmRFeHBsYWluQ29tcG9uZW50TG9hZGVyLFxyXG4gICAgcHJvZ3Jlc3NDb21wb25lbnRMb2FkZXIsXHJcbiAgICBrYXRleElubGluZUNvbXBvbmVudExvYWRlcixcclxuICAgIC8va2F0ZXhCbG9ja0NvbXBvbmVudExvYWRlcixcclxuICAgIGltYWdlQ2FyZENvbXBvbmVudExvYWRlciwvL1xyXG4gICAganVtYm90cm9uQ29tcG9uZW50TG9hZGVyLFxyXG4gICAgY2VzaXVtQ29tcG9uZW50TG9hZGVyLFxyXG4gICAgZGV0YWlsQ29tcG9uZW50TG9hZGVyLFxyXG4gICAgVHJlZUdyYXBoQ29tcG9uZW50TG9hZGVyLFxyXG5cclxuICAgIGF1ZGlvQ29tcG9uZW50TG9hZGVyLC8v6Z+z6aKR57uE5Lu2XHJcbiAgICBibG9ja0NvbXBvbmVudExvYWRlciwvL1xyXG4gICAgYmxvY2txdW90ZUNvbXBvbmVudExvYWRlciwvL1xyXG4gICAgaGVhZGluZ0NvbXBvbmVudExvYWRlciwvL1xyXG4gICAgaW1hZ2VDb21wb25lbnRMb2FkZXIsLy/lm77niYfnu4Tku7ZcclxuICAgIGxpc3RDb21wb25lbnRMb2FkZXIsLy9cclxuICAgIHBhcmFncmFwaENvbXBvbmVudExvYWRlciwvL+auteiQvee7hOS7tlxyXG4gICAgcHJlQ29tcG9uZW50TG9hZGVyLC8vXHJcbiAgICB0YWJsZUNvbXBvbmVudExvYWRlciwvL+ihqOagvOe7hOS7tlxyXG4gICAgdmlkZW9Db21wb25lbnRMb2FkZXIsLy/op4bpopHnu4Tku7ZcclxuXVxyXG5leHBvcnQgY29uc3QgZGVmYXVsdEZvcm1hdExvYWRlcnM9W1xyXG4gICAgYm9sZEZvcm1hdExvYWRlcixcclxuICAgIGl0YWxpY0Zvcm1hdExvYWRlcixcclxuICAgIGNvbG9yRm9ybWF0TG9hZGVyLFxyXG4gICAgZm9udEZhbWlseUZvcm1hdExvYWRlcixcclxuICAgIGZvbnRTaXplRm9ybWF0TG9hZGVyLFxyXG4gICAgbGV0dGVyU3BhY2luZ0Zvcm1hdExvYWRlcixcclxuICAgIGxpbmVIZWlnaHRGb3JtYXRMb2FkZXIsXHJcbiAgICBzdHJpa2VUaHJvdWdoRm9ybWF0TG9hZGVyLFxyXG4gICAgc3Vic2NyaXB0Rm9ybWF0TG9hZGVyLFxyXG4gICAgc3VwZXJzY3JpcHRGb3JtYXRMb2FkZXIsXHJcbiAgICB1bmRlcmxpbmVGb3JtYXRMb2FkZXIsXHJcbiAgICBjb2RlRm9ybWF0TG9hZGVyLFxyXG4gICAgYmxvY2tCYWNrZ3JvdW5kQ29sb3JGb3JtYXRMb2FkZXIsXHJcbiAgICBsaW5rRm9ybWF0TG9hZGVyLFxyXG4gICAgdGV4dEJhY2tncm91bmRDb2xvckZvcm1hdExvYWRlcixcclxuICAgIHRleHRBbGlnbkZvcm1hdExvYWRlcixcclxuICAgIHRleHRJbmRlbnRGb3JtYXRMb2FkZXIsXHJcbiAgICB2ZXJ0aWNhbEFsaWduRm9ybWF0TG9hZGVyLFxyXG4gICAgZGlyRm9ybWF0TG9hZGVyXHJcbl1cclxuXHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0VG9vbEZhY3Rvcmllcz1bXHJcbiAgICBbaGlzdG9yeUJhY2tUb29sLCBoaXN0b3J5Rm9yd2FyZFRvb2xdLC8v5Y6G5Y+y6K6w5b2V55qE5ZCO6YCA44CB5YmN6L+bXHJcbiAgICBbZGVmYXVsdEdyb3VwVG9vbF0sLy/pu5jorqTnmoTnu4Tku7bnu4TvvIzljIXmi6zmupDku6PnoIHnrYlcclxuICAgIFtoZWFkaW5nVG9vbF0sLy/moIfpophcclxuICAgIFtib2xkVG9vbCwgaXRhbGljVG9vbCwgc3RyaWtlVGhyb3VnaFRvb2wsIHVuZGVybGluZVRvb2xdLC8v5qC85byP77ya5Yqg57KXXHJcbiAgICBbb2xUb29sLCB1bFRvb2xdLC8v5YiX6KGoXHJcbiAgICBbZm9udFNpemVUb29sLCB0ZXh0SW5kZW50VG9vbF0sLy/lrZfkvZPlpKflsI/vvIznvKnov5tcclxuICAgIFtjb2xvclRvb2wsIHRleHRCYWNrZ3JvdW5kVG9vbF0sLy/popzoibLjgIHog4zmma/popzoibJcclxuICAgIFtpbnNlcnRQYXJhZ3JhcGhCZWZvcmVUb29sLCBpbnNlcnRQYXJhZ3JhcGhBZnRlclRvb2xdLC8v5YmN6Z2i5o+S5YWl5q616JC977yM5ZCO6Z2i5o+S5YWl5q616JC9XHJcbiAgICBbZm9udEZhbWlseVRvb2xdLC8v5a2X5L2TXHJcbiAgICBbbGlua1Rvb2wsIHVubGlua1Rvb2xdLC8v6ZO+5o6l5ZKM5Y+W5raI6ZO+5o6lXHJcbiAgICBbaW1hZ2VUb29sXSwvL+WbvueJh1xyXG4gICAgW3RleHRBbGlnblRvb2xdLC8v5paH5pys5a+56b2QXHJcbiAgICBbdGFibGVBZGRUb29sLCB0YWJsZVJlbW92ZVRvb2xdLC8v6KGo5qC8XHJcbiAgICBbY2xlYW5Ub29sXSwvL+a4hemZpOagvOW8j1xyXG5cclxuICAgIFxyXG4gICAgW2xpYnJhcnlHcm91cFRvb2xdLC8v6Ieq5a6a5LmJ57uEXHJcbiAgICBbbGlicmFyeURyb3Bkb3duVG9vbF0sLy/oh6rlrprkuYnnu4Tku7blupNcclxuICAgIC8vW2ltYWdlc1Rvb2wsaW1hZ2VDYXJkVG9vbF0sXHJcbiAgICAvL1trYXRleEdyb3VwVG9vbF0sLy/oh6rlrprkuYksXHJcbiAgICAvL1tzZXR0aW5nc0dyb3VwVG9vbF1cclxuXVxyXG5cclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPcHRpb25zOkVkaXRvck9wdGlvbnMgPSB7XHJcbiAgICBlZGl0aW5nU3R5bGVTaGVldHM6IFtcclxuICAgICAgICBgW3N0eWxlKj1jb2xvcl06bm90KFtzdHlsZSo9YmFja2dyb3VuZC1jb2xvcl0pXHJcbiAgICAgICAgICAgIGEge2NvbG9yOiBpbmhlcml0O31gLFxyXG4gICAgICAgIGBhIHt0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgY29sb3I6ICM0NDlmZGI7IGN1cnNvcjogdGV4dDt9YCxcclxuICAgICAgICBgW3RleHRidXMtZWRpdGFibGU9b2ZmXSA+ICoge1xyXG4gICAgICAgICAgICB1c2VyLXNlbGVjdDogdGV4dDtcclxuICAgICAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4gICAgICAgICAgfWBcclxuICAgIF0sXHJcblxyXG4gICAgLy/nu4Tku7bliqDovb1cclxuICAgIGNvbXBvbmVudExvYWRlcnM6IGRlZmF1bHRDb21wb25lbnRMb2FkZXIsXHJcbiAgICAvLy/moLzlvI9cclxuICAgIGZvcm1hdExvYWRlcnM6ZGVmYXVsdEZvcm1hdExvYWRlcnMsXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgLy/lt6XlhbfmoI/phY3nva5cclxuICAgICAgICBuZXcgVG9vbGJhcihkZWZhdWx0VG9vbEZhY3RvcmllcyksXHJcbiAgICAgICAgbmV3IExpbmtKdW1wVGlwUGx1Z2luKCksXHJcbiAgICAgICAgbmV3IE91dGxpbmVzUGx1Z2luKCksXHJcbiAgICAgICAgLy9uZXcgV29yZENvdW50UGx1Z2luKCksXHJcbiAgICAgICAgLy9uZXcgV29yZENvdW50U2VsZWN0ZWQoKSxcclxuICAgICAgICBuZXcgTGlicmFyeURyYXdlclBsdWdpbih0cnVlKSxcclxuICAgICAgICBuZXcgTGlicmFyeURyYXdlclBsdWdpbihmYWxzZSksXHJcbiAgICAgICAgbmV3IFBhZ2VDb25maWdQbHVnaW4oKVxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczpbXSxcclxuICAgIC8vY29udGVudDonPHA+ZGRkPC9wPicsXHJcbiAgICBwbGFjZWhvbGRlcjogXCLljaDkvY3mtYvor5VcIlxyXG59OyJdfQ==