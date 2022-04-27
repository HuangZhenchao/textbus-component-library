export declare class Request {
    /**
     * get方法
     * @param {string} url 路径
     * @param {object} params 参数
     */
    static get: (url: string, params?: any) => Promise<any>;
    static post: (url: string, params?: any) => Promise<any>;
}
