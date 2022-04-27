// request.ts
import axios from "./index";
export class Request {
}
/**
 * get方法
 * @param {string} url 路径
 * @param {object} params 参数
 */
Object.defineProperty(Request, "get", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (url, params) => {
        return new Promise((resolve, reject) => {
            axios.get(url, { params: params }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
});
Object.defineProperty(Request, "post", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (url, params) => {
        return new Promise((resolve, reject) => {
            console.log('qs', url, params);
            axios.post(url, params).then(res => {
                console.log('res', res);
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlscy9heGlvcy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSxTQUFTLENBQUM7QUFHNUIsTUFBTSxPQUFPLE9BQU87O0FBQ2hCOzs7O0dBSUc7QUFDSDs7OztXQUFhLENBQUMsR0FBVyxFQUFFLE1BQVksRUFBRSxFQUFFO1FBQ3ZDLE9BQU8sSUFBSSxPQUFPLENBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDeEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0dBQUE7QUFFRDs7OztXQUFjLENBQUMsR0FBVyxFQUFFLE1BQVksRUFBRSxFQUFFO1FBQ3hDLE9BQU8sSUFBSSxPQUFPLENBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzVCLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0dBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZXF1ZXN0LnRzXHJcbmltcG9ydCBheGlvcyBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQgcXMgZnJvbSBcInFzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVxdWVzdCB7XHJcbiAgICAvKipcclxuICAgICAqIGdldOaWueazlVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCDot6/lvoRcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMg5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXQgPSAodXJsOiBzdHJpbmcsIHBhcmFtcz86IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgYXhpb3MuZ2V0KHVybCwgeyBwYXJhbXM6IHBhcmFtcyB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwb3N0ID0gKHVybDogc3RyaW5nLCBwYXJhbXM/OiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdxcycsdXJsLHBhcmFtcylcclxuICAgICAgICAgICAgYXhpb3MucG9zdCh1cmwsIHBhcmFtcykudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlcycscmVzKVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=