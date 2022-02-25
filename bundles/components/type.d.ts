import {Injector} from "@tanbo/di";

export interface ComponentCreator {
    example: string | HTMLElement;
    name: string;
    category?: string;
    create(injector:Injector): void;
}