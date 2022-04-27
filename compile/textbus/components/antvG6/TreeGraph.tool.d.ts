import { DialogTool } from '@textbus/editor';
import { TabViewControl } from '../../utils/form/tabForm';
export declare function TreeGraphToolConfigFactory(injector: any): {
    iconClasses: string[];
    label: string;
    tooltip: any;
    viewController: TabViewControl;
    queryState(): {
        state: any;
        value: {
            style: {
                size: {
                    width: any;
                    height: any;
                };
                margin: any;
                float: any;
            };
            code: {
                code: any;
            };
            data: {
                data: any;
            };
        } | null;
    };
    useValue(value: any): void;
};
export declare function TreeGraphTool(): DialogTool;
