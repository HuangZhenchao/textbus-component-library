// index.ts
import axios from "axios";
// 取消重复请求
const pending = [];
const CancelToken = axios.CancelToken;
// 移除重复请求
const removePending = (config) => {
    for (const key in pending) {
        const item = +key;
        const list = pending[key];
        // 当前请求在数组中存在时执行函数体
        if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
            // 执行取消操作
            list.cancel('操作太频繁，请稍后再试');
            // 从数组中移除记录
            pending.splice(item, 1);
        }
    }
};
/* 实例化请求配置 */
const instance = axios.create({
    headers: {
        //php 的 post 传输请求头一定要这个 不然报错 接收不到值
        //"Content-Type": "application/json;charset=UTF-8",
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin-Type": '*'
    },
    // 请求时长
    timeout: 1000 * 30,
    // 请求的base地址 TODO:这块以后根据不同的模块调不同的api
    //baseURL: process.env.VUE_APP_API_URL,
    //     ? "测试"
    //     : "正式",
    // 表示跨域请求时是否需要使用凭证
    withCredentials: false,
});
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
/*
instance.interceptors.request.use(
    config => {

        removePending(config);
        config.cancelToken = new CancelToken((c) => {
            pending.push({ url: config.url, method: config.method, params: config.params, data: config.data, cancel: c });
        });
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
        // const token = store.state.token;
        // localStorage.setItem('token', token);

        if (storage.get(store.state.Roles)) {
            store.state.Roles
            config.headers.Authorization = storage.get(store.state.Roles);
        }
        return config;
    },
    error => {
        message.error(error.data.error.message);
        return Promise.reject(error.data.error.message);
    }

)

// 响应拦截器
instance.interceptors.response.use(
    function (config) {
        dataList.show = true
        removePending(config.config);
        // 请求成功
        if (config.status === 200 || config.status === 204) {
            setTimeout(() => {
                dataList.show = false
            }, 400)
            return Promise.resolve(config);
        } else {
            return Promise.reject(config);
        }
        // 请求失败
    },
    function (error) {

        const { response } = error;
        if (response) {
            errorHandle(response.status, response.data.message);

            // 超时重新请求
            const config = error.config;
            // 全局的请求次数,请求的间隙
            const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];

            if (config && RETRY_COUNT) {
                // 设置用于跟踪重试计数的变量
                config.__retryCount = config.__retryCount || 0;
                // 检查是否已经把重试的总数用完
                if (config.__retryCount >= RETRY_COUNT) {
                    return Promise.reject(response || { message: error.message });
                }
                // 增加重试计数
                config.__retryCount++;
                // 创造新的Promise来处理指数后退
                const backoff = new Promise<void>((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, RETRY_DELAY || 1);
                });
                // instance重试请求的Promise
                return backoff.then(() => {
                    return instance(config);
                });
            }

            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 后续增加断网情况下做的一些操作
            store.commit('networkState', false);
        }
    }
)

 */
// 只需要考虑单一职责，这块只封装axios
export default instance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvYXhpb3MvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVztBQUNYLE9BQU8sS0FBcUMsTUFBTSxPQUFPLENBQUM7QUE0RjFELFNBQVM7QUFDVCxNQUFNLE9BQU8sR0FBdUIsRUFBRSxDQUFDO0FBQ3ZDLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7QUFFdEMsU0FBUztBQUNULE1BQU0sYUFBYSxHQUFHLENBQUMsTUFBMEIsRUFBRSxFQUFFO0lBQ2pELEtBQUssTUFBTSxHQUFHLElBQUksT0FBTyxFQUFFO1FBQ3ZCLE1BQU0sSUFBSSxHQUFXLENBQUMsR0FBRyxDQUFDO1FBQzFCLE1BQU0sSUFBSSxHQUFnQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN4TCxTQUFTO1lBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMzQixXQUFXO1lBQ1gsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDM0I7S0FDSjtBQUNMLENBQUMsQ0FBQztBQUVGLGFBQWE7QUFDYixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzFCLE9BQU8sRUFBRTtRQUNMLGtDQUFrQztRQUNsQyxtREFBbUQ7UUFDbkQsY0FBYyxFQUFDLHFCQUFxQjtRQUNwQyxrQ0FBa0MsRUFBRSxHQUFHO0tBQzFDO0lBQ0QsT0FBTztJQUNQLE9BQU8sRUFBRSxJQUFJLEdBQUcsRUFBRTtJQUNsQixvQ0FBb0M7SUFDcEMsdUNBQXVDO0lBQ3ZDLGFBQWE7SUFDYixjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLGVBQWUsRUFBRSxLQUFLO0NBQ3pCLENBQUMsQ0FBQTtBQUVGOzs7R0FHRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Rkc7QUFDSCx1QkFBdUI7QUFDdkIsZUFBZSxRQUFRLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xyXG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NSZXF1ZXN0Q29uZmlnLCBNZXRob2QgfSBmcm9tIFwiYXhpb3NcIjtcclxuLy9pbXBvcnQgcm91dGVyIGZyb20gXCJAL3JvdXRlclwiO1xyXG4vL2ltcG9ydCBzdG9yZSBmcm9tIFwiQC9zdG9yZVwiO1xyXG4vL2ltcG9ydCB7IG1lc3NhZ2UgfSBmcm9tICdhbnQtZGVzaWduLXZ1ZSdcclxuLy9pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcIi4uL3N0b3JhZ2Uvc3RvcmFnZVwiO1xyXG4vL2ltcG9ydCB7IGRhdGFMaXN0IH0gZnJvbSBcIkAvY29tcG9uZW50cy9hc3Bpbi9kYXRhXCI7XHJcblxyXG4vKipcclxuICog6Lez6L2s55m75b2V6aG1XHJcbiAqIOaQuuW4puW9k+WJjemhtemdoui3r+eUse+8jOS7peacn+WcqOeZu+W9lemhtemdouWujOaIkOeZu+W9leWQjui/lOWbnuW9k+WJjemhtemdolxyXG5cclxuY29uc3QgdG9Mb2dpbiA9ICgpID0+IHtcclxuICAgIHJvdXRlci5yZXBsYWNlKHtcclxuICAgICAgICBuYW1lOiAnTG9naW5QYWdlJyxcclxuICAgIH0pO1xyXG59XHJcbiAqL1xyXG4vKipcclxuICog6K+35rGC5aSx6LSl5ZCO55qE6ZSZ6K+v57uf5LiA5aSE55CGXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGF0dXMg6K+35rGC5aSx6LSl55qE54q25oCB56CBXHJcbiAqIEBwYXJhbSBvdGhlclxyXG5cclxuY29uc3QgZXJyb3JIYW5kbGUgPSAoc3RhdHVzOiBudW1iZXIsIG90aGVyOiBzdHJpbmcpID0+IHtcclxuICAgIC8vIOeKtuaAgeeggeWIpOaWrVxyXG4gICAgc3dpdGNoIChzdGF0dXMpIHtcclxuXHJcbiAgICAgICAgY2FzZSAzMDI6IG1lc3NhZ2UuZXJyb3IoJ+aOpeWPo+mHjeWumuWQkeS6hu+8gScpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQwMDpcclxuICAgICAgICAgICAgbWVzc2FnZS5lcnJvcihcIuWPkeWHuueahOivt+axguaciemUmeivr++8jOacjeWKoeWZqOayoeaciei/m+ihjOaWsOW7uuaIluS/ruaUueaVsOaNrueahOaTjeS9nD09PlwiICsgc3RhdHVzKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAvLyA0MDE6IOacqueZu+W9lVxyXG4gICAgICAgIC8vIOacqueZu+W9leWImei3s+i9rOeZu+W9lemhtemdou+8jOW5tuaQuuW4puW9k+WJjemhtemdoueahOi3r+W+hFxyXG4gICAgICAgIC8vIOWcqOeZu+W9leaIkOWKn+WQjui/lOWbnuW9k+WJjemhtemdou+8jOi/meS4gOatpemcgOimgeWcqOeZu+W9lemhteaTjeS9nOOAglxyXG4gICAgICAgIGNhc2UgNDAxOiAvL+mHjeWumuWQkVxyXG4gICAgICAgICAgICBtZXNzYWdlLmVycm9yKFwidG9rZW4655m75b2V5aSx5pWIPT0+XCIgKyBzdGF0dXMgKyBcIjpcIiArIHN0b3JlLnN0YXRlLlJvbGVzKVxyXG4gICAgICAgICAgICBzdG9yYWdlLnJlbW92ZShzdG9yZS5zdGF0ZS5Sb2xlcylcclxuICAgICAgICAgICAgc3RvcmFnZS5nZXQoc3RvcmUuc3RhdGUuUm9sZXMpXHJcbiAgICAgICAgICAgIHJvdXRlci5yZXBsYWNlKHtcclxuICAgICAgICAgICAgICAgIHBhdGg6ICcvTG9naW4nLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gNDAzIHRva2Vu6L+H5pyfXHJcbiAgICAgICAgLy8g5riF6ZmkdG9rZW7lubbot7PovaznmbvlvZXpobVcclxuICAgICAgICBjYXNlIDQwMzpcclxuICAgICAgICAgICAgbWVzc2FnZS5lcnJvcihcIueZu+W9lei/h+acnyznlKjmiLflvpfliLDmjojmnYPvvIzkvYbmmK/orr/pl67mmK/ooqvnpoHmraLnmoQ9PT5cIiArIHN0YXR1cylcclxuICAgICAgICAgICAgLy8gc3RvcmUuY29tbWl0KCd0b2tlbicsIG51bGwpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJvdXRlci5yZXBsYWNlKHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnL0xvZ2luJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0MDQ6XHJcbiAgICAgICAgICAgIG1lc3NhZ2UuZXJyb3IoXCLnvZHnu5zor7fmsYLkuI3lrZjlnKg9PT5cIiArIHN0YXR1cylcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0MDY6XHJcbiAgICAgICAgICAgIG1lc3NhZ2UuZXJyb3IoXCLor7fmsYLnmoTmoLzlvI/kuI3lj6/lvpc9PT5cIiArIHN0YXR1cylcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0MDg6IG1lc3NhZ2UuZXJyb3IoXCIg6K+35rGC6LaF5pe277yBXCIpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDEwOlxyXG4gICAgICAgICAgICBtZXNzYWdlLmVycm9yKFwi6K+35rGC55qE6LWE5rqQ6KKr5rC45LmF5Yig6Zmk77yM5LiU5LiN5Lya5YaN5b6X5Yiw55qEPT0+XCIgKyBzdGF0dXMpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDIyOlxyXG4gICAgICAgICAgICBtZXNzYWdlLmVycm9yKFwi5b2T5Yib5bu65LiA5Liq5a+56LGh5pe277yM5Y+R55Sf5LiA5Liq6aqM6K+B6ZSZ6K+vPT0+XCIgKyBzdGF0dXMpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTAwOlxyXG4gICAgICAgICAgICBtZXNzYWdlLmVycm9yKFwi5pyN5Yqh5Zmo5Y+R55Sf6ZSZ6K+v77yM6K+35qOA5p+l5pyN5Yqh5ZmoPT0+XCIgKyBzdGF0dXMpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTAyOlxyXG4gICAgICAgICAgICBtZXNzYWdlLmVycm9yKFwi572R5YWz6ZSZ6K+vPT0+XCIgKyBzdGF0dXMpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTAzOlxyXG4gICAgICAgICAgICBtZXNzYWdlLmVycm9yKFwi5pyN5Yqh5LiN5Y+v55So77yM5pyN5Yqh5Zmo5pqC5pe26L+H6L295oiW57u05oqkPT0+XCIgKyBzdGF0dXMpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTA0OlxyXG4gICAgICAgICAgICBtZXNzYWdlLmVycm9yKFwi572R5YWz6LaF5pe2PT0+XCIgKyBzdGF0dXMpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIG1lc3NhZ2UuZXJyb3IoXCLlhbbku5bplJnor6/plJnor689PT5cIiArIHN0YXR1cylcclxuICAgIH1cclxufVxyXG4gKi9cclxuLy8g5a6a5LmJ5o6l5Y+jXHJcbmludGVyZmFjZSBQZW5kaW5nVHlwZSB7XHJcbiAgICB1cmw/OiBzdHJpbmc7XHJcbiAgICBtZXRob2Q/OiBNZXRob2Q7XHJcbiAgICBwYXJhbXM6IGFueTtcclxuICAgIGRhdGE6IGFueTtcclxuICAgIGNhbmNlbDogYW55O1xyXG59XHJcbi8vIOWPlua2iOmHjeWkjeivt+axglxyXG5jb25zdCBwZW5kaW5nOiBBcnJheTxQZW5kaW5nVHlwZT4gPSBbXTtcclxuY29uc3QgQ2FuY2VsVG9rZW4gPSBheGlvcy5DYW5jZWxUb2tlbjtcclxuXHJcbi8vIOenu+mZpOmHjeWkjeivt+axglxyXG5jb25zdCByZW1vdmVQZW5kaW5nID0gKGNvbmZpZzogQXhpb3NSZXF1ZXN0Q29uZmlnKSA9PiB7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBwZW5kaW5nKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbTogbnVtYmVyID0gK2tleTtcclxuICAgICAgICBjb25zdCBsaXN0OiBQZW5kaW5nVHlwZSA9IHBlbmRpbmdba2V5XTtcclxuICAgICAgICAvLyDlvZPliY3or7fmsYLlnKjmlbDnu4TkuK3lrZjlnKjml7bmiafooYzlh73mlbDkvZNcclxuICAgICAgICBpZiAobGlzdC51cmwgPT09IGNvbmZpZy51cmwgJiYgbGlzdC5tZXRob2QgPT09IGNvbmZpZy5tZXRob2QgJiYgSlNPTi5zdHJpbmdpZnkobGlzdC5wYXJhbXMpID09PSBKU09OLnN0cmluZ2lmeShjb25maWcucGFyYW1zKSAmJiBKU09OLnN0cmluZ2lmeShsaXN0LmRhdGEpID09PSBKU09OLnN0cmluZ2lmeShjb25maWcuZGF0YSkpIHtcclxuICAgICAgICAgICAgLy8g5omn6KGM5Y+W5raI5pON5L2cXHJcbiAgICAgICAgICAgIGxpc3QuY2FuY2VsKCfmk43kvZzlpKrpopHnuYHvvIzor7fnqI3lkI7lho3or5UnKTtcclxuICAgICAgICAgICAgLy8g5LuO5pWw57uE5Lit56e76Zmk6K6w5b2VXHJcbiAgICAgICAgICAgIHBlbmRpbmcuc3BsaWNlKGl0ZW0sIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qIOWunuS+i+WMluivt+axgumFjee9riAqL1xyXG5jb25zdCBpbnN0YW5jZSA9IGF4aW9zLmNyZWF0ZSh7XHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgLy9waHAg55qEIHBvc3Qg5Lyg6L6T6K+35rGC5aS05LiA5a6a6KaB6L+Z5LiqIOS4jeeEtuaKpemUmSDmjqXmlLbkuI3liLDlgLxcclxuICAgICAgICAvL1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XCIsXHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjpcIm11bHRpcGFydC9mb3JtLWRhdGFcIixcclxuICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbi1UeXBlXCI6ICcqJ1xyXG4gICAgfSxcclxuICAgIC8vIOivt+axguaXtumVv1xyXG4gICAgdGltZW91dDogMTAwMCAqIDMwLFxyXG4gICAgLy8g6K+35rGC55qEYmFzZeWcsOWdgCBUT0RPOui/meWdl+S7peWQjuagueaNruS4jeWQjOeahOaooeWdl+iwg+S4jeWQjOeahGFwaVxyXG4gICAgLy9iYXNlVVJMOiBwcm9jZXNzLmVudi5WVUVfQVBQX0FQSV9VUkwsXHJcbiAgICAvLyAgICAgPyBcIua1i+ivlVwiXHJcbiAgICAvLyAgICAgOiBcIuato+W8j1wiLFxyXG4gICAgLy8g6KGo56S66Leo5Z+f6K+35rGC5pe25piv5ZCm6ZyA6KaB5L2/55So5Yet6K+BXHJcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxyXG59KVxyXG5cclxuLyoqXHJcbiAqIOivt+axguaLpuaIquWZqFxyXG4gKiDmr4/mrKHor7fmsYLliY3vvIzlpoLmnpzlrZjlnKh0b2tlbuWImeWcqOivt+axguWktOS4reaQuuW4pnRva2VuXHJcbiAqL1xyXG4vKlxyXG5pbnN0YW5jZS5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoXHJcbiAgICBjb25maWcgPT4ge1xyXG5cclxuICAgICAgICByZW1vdmVQZW5kaW5nKGNvbmZpZyk7XHJcbiAgICAgICAgY29uZmlnLmNhbmNlbFRva2VuID0gbmV3IENhbmNlbFRva2VuKChjKSA9PiB7XHJcbiAgICAgICAgICAgIHBlbmRpbmcucHVzaCh7IHVybDogY29uZmlnLnVybCwgbWV0aG9kOiBjb25maWcubWV0aG9kLCBwYXJhbXM6IGNvbmZpZy5wYXJhbXMsIGRhdGE6IGNvbmZpZy5kYXRhLCBjYW5jZWw6IGMgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g55m75b2V5rWB56iL5o6n5Yi25Lit77yM5qC55o2u5pys5Zyw5piv5ZCm5a2Y5ZyodG9rZW7liKTmlq3nlKjmiLfnmoTnmbvlvZXmg4XlhrVcclxuICAgICAgICAvLyDkvYbmmK/ljbPkvb90b2tlbuWtmOWcqO+8jOS5n+acieWPr+iDvXRva2Vu5piv6L+H5pyf55qE77yM5omA5Lul5Zyo5q+P5qyh55qE6K+35rGC5aS05Lit5pC65bimdG9rZW5cclxuICAgICAgICAvLyDlkI7lj7DmoLnmja7mkLrluKbnmoR0b2tlbuWIpOaWreeUqOaIt+eahOeZu+W9leaDheWGte+8jOW5tui/lOWbnue7meaIkeS7rOWvueW6lOeahOeKtuaAgeeggVxyXG4gICAgICAgIC8vIOiAjOWQjuaIkeS7rOWPr+S7peWcqOWTjeW6lOaLpuaIquWZqOS4re+8jOagueaNrueKtuaAgeeggei/m+ihjOS4gOS6m+e7n+S4gOeahOaTjeS9nOOAglxyXG4gICAgICAgIC8vIGNvbnN0IHRva2VuID0gc3RvcmUuc3RhdGUudG9rZW47XHJcbiAgICAgICAgLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgdG9rZW4pO1xyXG5cclxuICAgICAgICBpZiAoc3RvcmFnZS5nZXQoc3RvcmUuc3RhdGUuUm9sZXMpKSB7XHJcbiAgICAgICAgICAgIHN0b3JlLnN0YXRlLlJvbGVzXHJcbiAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSBzdG9yYWdlLmdldChzdG9yZS5zdGF0ZS5Sb2xlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9LFxyXG4gICAgZXJyb3IgPT4ge1xyXG4gICAgICAgIG1lc3NhZ2UuZXJyb3IoZXJyb3IuZGF0YS5lcnJvci5tZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IuZGF0YS5lcnJvci5tZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbilcclxuXHJcbi8vIOWTjeW6lOaLpuaIquWZqFxyXG5pbnN0YW5jZS5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKFxyXG4gICAgZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgICAgIGRhdGFMaXN0LnNob3cgPSB0cnVlXHJcbiAgICAgICAgcmVtb3ZlUGVuZGluZyhjb25maWcuY29uZmlnKTtcclxuICAgICAgICAvLyDor7fmsYLmiJDlip9cclxuICAgICAgICBpZiAoY29uZmlnLnN0YXR1cyA9PT0gMjAwIHx8IGNvbmZpZy5zdGF0dXMgPT09IDIwNCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRhdGFMaXN0LnNob3cgPSBmYWxzZVxyXG4gICAgICAgICAgICB9LCA0MDApXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6K+35rGC5aSx6LSlXHJcbiAgICB9LFxyXG4gICAgZnVuY3Rpb24gKGVycm9yKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgcmVzcG9uc2UgfSA9IGVycm9yO1xyXG4gICAgICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBlcnJvckhhbmRsZShyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmRhdGEubWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAvLyDotoXml7bph43mlrDor7fmsYJcclxuICAgICAgICAgICAgY29uc3QgY29uZmlnID0gZXJyb3IuY29uZmlnO1xyXG4gICAgICAgICAgICAvLyDlhajlsYDnmoTor7fmsYLmrKHmlbAs6K+35rGC55qE6Ze06ZqZXHJcbiAgICAgICAgICAgIGNvbnN0IFtSRVRSWV9DT1VOVCwgUkVUUllfREVMQVldID0gWzMsIDEwMDBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZyAmJiBSRVRSWV9DT1VOVCkge1xyXG4gICAgICAgICAgICAgICAgLy8g6K6+572u55So5LqO6Lef6Liq6YeN6K+V6K6h5pWw55qE5Y+Y6YePXHJcbiAgICAgICAgICAgICAgICBjb25maWcuX19yZXRyeUNvdW50ID0gY29uZmlnLl9fcmV0cnlDb3VudCB8fCAwO1xyXG4gICAgICAgICAgICAgICAgLy8g5qOA5p+l5piv5ZCm5bey57uP5oqK6YeN6K+V55qE5oC75pWw55So5a6MXHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLl9fcmV0cnlDb3VudCA+PSBSRVRSWV9DT1VOVCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSB8fCB7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDlop7liqDph43or5XorqHmlbBcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5fX3JldHJ5Q291bnQrKztcclxuICAgICAgICAgICAgICAgIC8vIOWIm+mAoOaWsOeahFByb21pc2XmnaXlpITnkIbmjIfmlbDlkI7pgIBcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhY2tvZmYgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgUkVUUllfREVMQVkgfHwgMSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIGluc3RhbmNl6YeN6K+V6K+35rGC55qEUHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJhY2tvZmYudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlKGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDlpITnkIbmlq3nvZHnmoTmg4XlhrVcclxuICAgICAgICAgICAgLy8gZWc66K+35rGC6LaF5pe25oiW5pat572R5pe277yM5pu05pawc3RhdGXnmoRuZXR3b3Jr54q25oCBXHJcbiAgICAgICAgICAgIC8vIG5ldHdvcmvnirbmgIHlnKhhcHAudnVl5Lit5o6n5Yi2552A5LiA5Liq5YWo5bGA55qE5pat572R5o+Q56S657uE5Lu255qE5pi+56S66ZqQ6JePXHJcbiAgICAgICAgICAgIC8vIOWQjue7reWinuWKoOaWree9keaDheWGteS4i+WBmueahOS4gOS6m+aTjeS9nFxyXG4gICAgICAgICAgICBzdG9yZS5jb21taXQoJ25ldHdvcmtTdGF0ZScsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbilcclxuXHJcbiAqL1xyXG4vLyDlj6rpnIDopoHogIPomZHljZXkuIDogYzotKPvvIzov5nlnZflj6rlsIHoo4VheGlvc1xyXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZVxyXG4iXX0=