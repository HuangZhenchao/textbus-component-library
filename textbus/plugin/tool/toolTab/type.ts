import { Injector } from "@textbus/core";
import { ButtonToolConfig, DialogToolConfig, ToolType } from "@textbus/editor";

export interface ToolTabItem{    
    toolFactory: (injector: Injector)=>ButtonToolConfig|DialogToolConfig;
    config:{
        label:string;
        type:ToolType
        card?:string|HTMLElement;
    }    
  }
  export interface ToolTabPanel{    
    category:string;
    items:ToolTabItem[];
  }