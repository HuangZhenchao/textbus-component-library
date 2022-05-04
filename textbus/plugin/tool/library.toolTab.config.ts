import { ToolType } from "@textbus/editor";
import { alertToolConfigFactory, alertExample, imageCardToolConfigFactory, jumbotronToolConfigFactory, imageCardExample, jumbotronExample, katexInlineToolConfigFactory, cesiumToolConfigFactory, mapExample, TreeGraphToolConfigFactory, katexExample, katexBlockToolConfigFactory, progressToolConfigFactory, progressExample, stepToolConfigFactory, timelineExample, timelineToolConfigFactory, todoListExample, todoListToolConfigFactory, wordExplainExample, wordExplainToolConfigFactory, stepExample } from "../../components/_public-api";
import { ToolTabPanel, ToolTabItem } from "./toolTab/type";

export const toolTabConfig:ToolTabPanel[]=[
    {
        category:"容器",
        items:[
            {toolFactory:alertToolConfigFactory,config:{label:"警示框",type:ToolType.Button,card:alertExample}} as ToolTabItem,
            {toolFactory:imageCardToolConfigFactory,config:{label:"卡片",type:ToolType.Dialog,card:imageCardExample}} as ToolTabItem,
            {toolFactory:jumbotronToolConfigFactory,config:{label:"巨幕",type:1,card:jumbotronExample}} as ToolTabItem,
            {toolFactory:katexInlineToolConfigFactory,config:{label:"行内公式",type:ToolType.Button,card:katexExample}} as ToolTabItem,
            {toolFactory:katexBlockToolConfigFactory,config:{label:"块级公式",type:ToolType.Button,card:katexExample}} as ToolTabItem,
            {toolFactory:cesiumToolConfigFactory,config:{label:"地图",type:ToolType.Button,card:mapExample}} as ToolTabItem,
            {toolFactory:TreeGraphToolConfigFactory,config:{label:"树图",type:ToolType.Dialog}} as ToolTabItem,
            {toolFactory:progressToolConfigFactory,config:{label:"进度条",type:ToolType.Button,card:progressExample}} as ToolTabItem,
            {toolFactory:stepToolConfigFactory,config:{label:"步骤条",type:ToolType.Button,card:stepExample}} as ToolTabItem,
            {toolFactory:timelineToolConfigFactory,config:{label:"时间轴",type:ToolType.Button,card:timelineExample}} as ToolTabItem,
            {toolFactory:todoListToolConfigFactory,config:{label:"待办事项",type:ToolType.Button,card:todoListExample}} as ToolTabItem,
            {toolFactory:wordExplainToolConfigFactory,config:{label:"名词解释",type:ToolType.Button,card:wordExplainExample}} as ToolTabItem,
        ]
    } as ToolTabPanel
]