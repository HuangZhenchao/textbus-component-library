import { Request } from "./request";
class api {
}
/* api接口模块 */
Object.defineProperty(api, "upload", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
        // 基于Base模块封装调用
        image: (param) => Request.post(`/api/upload/image`, param),
    }
});
Object.defineProperty(api, "r", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
        cnote: (param) => Request.post('/api/r/cnote', param)
    }
});
Object.defineProperty(api, "u", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
        cnote: (param) => Request.post('/api/u/cnote', param),
        notehtml: (param) => Request.post('/api/u/notehtml', param),
    }
});
export { api };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWxzL2F4aW9zL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRXBDLE1BQU0sR0FBRzs7QUFDTCxhQUFhO0FBQ2I7Ozs7V0FBdUI7UUFDbkIsZUFBZTtRQUNmLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBQyxLQUFLLENBQUM7S0FDNUQ7R0FBQTtBQUNEOzs7O1dBQWdCO1FBQ1osS0FBSyxFQUFDLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxLQUFLLENBQUM7S0FDcEQ7R0FBQTtBQUNEOzs7O1dBQWdCO1FBQ1osS0FBSyxFQUFDLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxLQUFLLENBQUM7UUFDakQsUUFBUSxFQUFDLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFDLEtBQUssQ0FBQztLQUMxRDtHQUFBO0FBRUwsT0FBTyxFQUNILEdBQUcsRUFDTixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8g5YW25Lit5L2/55SoIGluc3RhbGwg55qE55uu55qE5Zyo5LqOIHRz5ZyobWFpbi50c+S4rVxyXG4vLyDkuI3og73pgJrov4dWdWUucHJvdG90eXBlLiRBcGnov5nkuKrmlrnlvI/nm7TmjqXosIPnlKhcclxuLy/vvIzlnKjlhajlsYDmlrnms5XkuK3kvJror7TliLDkvb/nlKgg5o+S5Lu255qE5pa55byP5Y675oyC6L2944CCXHJcbi8vIGFwaS50c1xyXG5pbXBvcnQgeyBCYXNlIH0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSBcIi4vcmVxdWVzdFwiO1xyXG5cclxuY2xhc3MgYXBpIHtcclxuICAgIC8qIGFwaeaOpeWPo+aooeWdlyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB1cGxvYWQgPSB7XHJcbiAgICAgICAgLy8g5Z+65LqOQmFzZeaooeWdl+Wwgeijheiwg+eUqFxyXG4gICAgICAgIGltYWdlOiAocGFyYW0pID0+IFJlcXVlc3QucG9zdChgL2FwaS91cGxvYWQvaW1hZ2VgLHBhcmFtKSxcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgcj17XHJcbiAgICAgICAgY25vdGU6KHBhcmFtKT0+UmVxdWVzdC5wb3N0KCcvYXBpL3IvY25vdGUnLHBhcmFtKVxyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyB1PXtcclxuICAgICAgICBjbm90ZToocGFyYW0pPT5SZXF1ZXN0LnBvc3QoJy9hcGkvdS9jbm90ZScscGFyYW0pLFxyXG4gICAgICAgIG5vdGVodG1sOihwYXJhbSk9PlJlcXVlc3QucG9zdCgnL2FwaS91L25vdGVodG1sJyxwYXJhbSksXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHtcclxuICAgIGFwaVxyXG59XHJcbiJdfQ==