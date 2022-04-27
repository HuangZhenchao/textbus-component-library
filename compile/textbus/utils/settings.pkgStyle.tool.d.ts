import { QueryStateType } from '@textbus/core';
import { DialogTool, Form } from "@textbus/editor";
export declare let bPkg: boolean;
export declare let styleLink: string;
export declare function pkgStyleToolConfigFactory(injector: any): {
    iconClasses: string[];
    label: string;
    tooltip: any;
    viewController: Form;
    queryState(): {
        state: QueryStateType;
        value: null;
    };
    useValue(formValue: any): void;
};
export declare function pkgStyleTool(): DialogTool;
