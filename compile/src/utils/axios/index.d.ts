declare const instance: import("axios").AxiosInstance;
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
export default instance;
