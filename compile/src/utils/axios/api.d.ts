declare class api {
    static upload: {
        image: (param: any) => Promise<any>;
    };
    static r: {
        cnote: (param: any) => Promise<any>;
    };
    static u: {
        cnote: (param: any) => Promise<any>;
        notehtml: (param: any) => Promise<any>;
    };
}
export { api };
