// 其中使用 install 的目的在于 ts在main.ts中
// 不能通过Vue.prototype.$Api这个方式直接调用
//，在全局方法中会说到使用 插件的方式去挂载。
// api.ts
import { Base } from "./base";
import { Request } from "./request";

class api {
    /* api接口模块 */
    public static upload = {
        // 基于Base模块封装调用
        image: (param) => Request.post(`/api/upload/image`,param),
    }
    public static r={
        json:(param)=>Request.post('/api/r/json',param)
    }
}
export {
    api
}
