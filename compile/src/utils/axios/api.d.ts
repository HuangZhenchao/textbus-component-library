declare class api {
    static upload: {
        image: (param: any) => Promise<any>;
    };
    static r: {
        note: (param: any) => Promise<any>;
    };
    static u: {
        note: (param: any) => Promise<any>;
    };
}
export { api };
