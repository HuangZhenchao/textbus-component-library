import { Slot, ContentType } from "@textbus/core";
import {Injector} from "@tanbo/di";
import { ButtonToolConfig, ToolType } from "@textbus/editor";

export interface ComponentCreator {
    example: string | HTMLElement;
    name: string;
    category?: string;
    create(injector:Injector): void;
}
export  class SlotComplete extends Slot{
    constructor(){
      super([ContentType.Text,ContentType.BlockComponent,ContentType.InlineComponent])
    }
}
export interface componentStyle{
  width?:string;
  height?:string;
  margin?:string;
  float?:string;
}

