import {QueryStateType} from "@textbus/core";
import { DropdownTool, DropdownToolConfig} from "@textbus/editor";

import { toolTabConfig } from "./library.toolTab.config";
import { CardToolTab } from "./toolTab/CardToolTab.plugin";

export function libraryToolConfigFactory(injector):DropdownToolConfig {
    //const commander = injector.get(Commander);
    //iconClasses: ['textbus-icon-emoji'],
    //console.log("libraryToolConfigFactory",toolTabConfig)
    return {
        label:'组件库',
        iconClasses:['textbus-icon-components'],
        tooltip: '组件库',
        viewController: new CardToolTab(injector,toolTabConfig),//new LibraryTab(injector),//
        queryState() {
            return {
                state: QueryStateType.Normal,
                value: null
            };
        },
        useValue(value) {
            //commander.insert(value);
        }
    };

}
export function libraryDropdownTool(){
    return new DropdownTool(libraryToolConfigFactory);
}