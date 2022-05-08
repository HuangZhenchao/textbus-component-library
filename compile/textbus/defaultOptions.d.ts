import { EditorOptions } from '@textbus/editor';
import { defaultGroupTool, headingTool, colorTool, linkTool, unlinkTool, imageTool } from "@textbus/editor";
export declare const defaultComponentLoader: import("@textbus/browser").ComponentLoader[];
export declare const defaultFormatLoaders: (import("@textbus/editor").BlockAttrFormatLoader | import("@textbus/editor").BlockStyleFormatLoader | import("@textbus/editor").InlineTagFormatLoader | import("@textbus/editor").InlineStyleFormatLoader | import("@textbus/editor").InlineTagStyleFormatLoader | import("@textbus/editor").LinkFormatLoader)[];
export declare const defaultToolFactories: ((typeof defaultGroupTool)[] | (typeof headingTool)[] | (typeof colorTool)[] | (typeof linkTool | typeof unlinkTool)[] | (typeof imageTool)[])[];
export declare const defaultOptions: EditorOptions;
