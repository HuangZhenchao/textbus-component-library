import { DialogTool, Form } from "@textbus/editor";
export declare function imageCardToolConfigFactory(injector: any): {
    iconClasses: string[];
    label: string;
    tooltip: any;
    viewController: Form;
    queryState(): {
        state: any;
        value: {
            src: any;
            margin: any;
            float: any;
            size: {
                width: any;
                height: any;
            };
            maxSize: {
                width: any;
                height: any;
            };
        } | null;
    };
    useValue(formValue: any): void;
};
export declare const imageCardTool: DialogTool;
export declare const imageCardExample: string;
