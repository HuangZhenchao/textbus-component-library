import { auditTime } from "@tanbo/stream";
import { Editor, Toolbar } from "@textbus/editor";
import { defaultOptions, defaultToolFactories } from "./defaultOptions";
import { concatHTML } from "./utils/output";
import { SetUploader } from "./utils/uploader";
export class TextbusApp {
    constructor(selector, selfConfig) {
        Object.defineProperty(this, "editor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "selector", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "selfConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.selector = selector;
        this.selfConfig = selfConfig;
        selfConfig.componentLoaders ? defaultOptions.componentLoaders = selfConfig.componentLoaders : '';
        selfConfig.formatLoaders ? defaultOptions.formatLoaders = selfConfig.formatLoaders : '';
        console.log(selfConfig.host, selfConfig.toolFactories);
        selfConfig.toolFactories ?
            defaultOptions.plugins[0] = new Toolbar(selfConfig.toolFactories, selfConfig.host)
            : defaultOptions.plugins[0] = new Toolbar(defaultToolFactories, selfConfig.host);
        selfConfig.uploadFilePromise ? defaultOptions.uploader = SetUploader(selfConfig.uploadFilePromise) : '';
        this.editor = new Editor(selector, defaultOptions);
        this.editor.onChange.pipe(auditTime(selfConfig.outputSetting.saveInterval || 0)).subscribe(() => {
            this.onSave();
        });
    }
    replaceContent(content) {
        this.editor.replaceContent(content);
    }
    onSave() {
        let outputSetting = this.selfConfig.outputSetting;
        if (outputSetting.cbSaveJSON) {
            outputSetting.cbSaveJSON(JSON.stringify(this.editor.getJSON().content, null, "  "));
        }
        if (outputSetting.cbSaveHTML != undefined) {
            let content = this.editor.getContents();
            outputSetting.cbSaveHTML(outputSetting.bConcatHtml ? concatHTML(content, outputSetting.styleLink) : content.content);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGJ1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RleHRidXMvdGV4dGJ1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGNBQWMsRUFBQyxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFrQi9DLE1BQU0sT0FBTyxVQUFVO0lBSW5CLFlBQVksUUFBUSxFQUFDLFVBQXdCO1FBSDdDOzs7OztXQUFhO1FBQ2I7Ozs7O1dBQTZCO1FBQzdCOzs7OztXQUEwQjtRQUV0QixJQUFJLENBQUMsUUFBUSxHQUFDLFFBQVEsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFDLFVBQVUsQ0FBQztRQUMzQixVQUFVLENBQUMsZ0JBQWdCLENBQUEsQ0FBQyxDQUFBLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUEsQ0FBQyxDQUFBLEVBQUUsQ0FBQztRQUMzRixVQUFVLENBQUMsYUFBYSxDQUFBLENBQUMsQ0FBQSxjQUFjLENBQUMsYUFBYSxHQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUEsQ0FBQyxDQUFBLEVBQUUsQ0FBQztRQUNsRixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3JELFVBQVUsQ0FBQyxhQUFhLENBQUEsQ0FBQztZQUNyQixjQUFjLENBQUMsT0FBUSxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUNoRixDQUFDLENBQUEsY0FBYyxDQUFDLE9BQVEsQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLE9BQU8sQ0FBQyxvQkFBb0IsRUFBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEYsVUFBVSxDQUFDLGlCQUFpQixDQUFBLENBQUMsQ0FBQSxjQUFjLENBQUMsUUFBUSxHQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFDO1FBRWxHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzFGLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDRCxjQUFjLENBQUMsT0FBTztRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsTUFBTTtRQUNGLElBQUksYUFBYSxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFBO1FBQy9DLElBQUcsYUFBYSxDQUFDLFVBQVUsRUFBQztZQUN4QixhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7U0FDcEY7UUFDRCxJQUFHLGFBQWEsQ0FBQyxVQUFVLElBQUUsU0FBUyxFQUFDO1lBQ25DLElBQUksT0FBTyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDckMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFBLENBQUMsQ0FBQSxVQUFVLENBQUMsT0FBTyxFQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ2xIO0lBQ0wsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXVkaXRUaW1lLCBzYW1wbGVUaW1lIH0gZnJvbSBcIkB0YW5iby9zdHJlYW1cIjtcclxuaW1wb3J0IHsgRWRpdG9yLCBUb29sYmFyIH0gZnJvbSBcIkB0ZXh0YnVzL2VkaXRvclwiO1xyXG5pbXBvcnQgeyBkZWZhdWx0T3B0aW9ucyxkZWZhdWx0VG9vbEZhY3RvcmllcyB9IGZyb20gXCIuL2RlZmF1bHRPcHRpb25zXCI7XHJcbmltcG9ydCB7IGNvbmNhdEhUTUwgfSBmcm9tIFwiLi91dGlscy9vdXRwdXRcIjtcclxuaW1wb3J0IHsgU2V0VXBsb2FkZXIgfSBmcm9tIFwiLi91dGlscy91cGxvYWRlclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPdXRwdXRTZXR0aW5ne1xyXG4gICAgY2JTYXZlSlNPTj86IEZ1bmN0aW9uO1xyXG4gICAgY2JTYXZlSFRNTD86IEZ1bmN0aW9uOyAgICBcclxuICAgIHNhdmVJbnRlcnZhbD86bnVtYmVyO1xyXG4gICAgYkNvbmNhdEh0bWw/OiBCb29sZWFuO1xyXG4gICAgc3R5bGVMaW5rPzpzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGV4dGJ1c0NvbmZpZ3tcclxuICAgIHVwbG9hZEZpbGVQcm9taXNlPzogRnVuY3Rpb247XHJcbiAgICBjb21wb25lbnRMb2FkZXJzPzogW107XHJcbiAgICBmb3JtYXRMb2FkZXJzPzogW107XHJcbiAgICB0b29sRmFjdG9yaWVzPzogW107XHJcbiAgICBob3N0Pzogc3RyaW5nIHwgSFRNTEVsZW1lbnQ7XHJcbiAgICBvdXRwdXRTZXR0aW5nOk91dHB1dFNldHRpbmdcclxufVxyXG5leHBvcnQgY2xhc3MgVGV4dGJ1c0FwcHtcclxuICAgIGVkaXRvcjpFZGl0b3JcclxuICAgIHNlbGVjdG9yOnN0cmluZyB8IEhUTUxFbGVtZW50XHJcbiAgICBzZWxmQ29uZmlnOiBUZXh0YnVzQ29uZmlnO1xyXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3Isc2VsZkNvbmZpZzpUZXh0YnVzQ29uZmlnKXtcclxuICAgICAgICB0aGlzLnNlbGVjdG9yPXNlbGVjdG9yO1xyXG4gICAgICAgIHRoaXMuc2VsZkNvbmZpZz1zZWxmQ29uZmlnO1xyXG4gICAgICAgIHNlbGZDb25maWcuY29tcG9uZW50TG9hZGVycz9kZWZhdWx0T3B0aW9ucy5jb21wb25lbnRMb2FkZXJzPXNlbGZDb25maWcuY29tcG9uZW50TG9hZGVyczonJztcclxuICAgICAgICBzZWxmQ29uZmlnLmZvcm1hdExvYWRlcnM/ZGVmYXVsdE9wdGlvbnMuZm9ybWF0TG9hZGVycz1zZWxmQ29uZmlnLmZvcm1hdExvYWRlcnM6Jyc7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VsZkNvbmZpZy5ob3N0LHNlbGZDb25maWcudG9vbEZhY3RvcmllcylcclxuICAgICAgICBzZWxmQ29uZmlnLnRvb2xGYWN0b3JpZXM/XHJcbiAgICAgICAgICAgIGRlZmF1bHRPcHRpb25zLnBsdWdpbnMhWzBdPW5ldyBUb29sYmFyKHNlbGZDb25maWcudG9vbEZhY3RvcmllcyxzZWxmQ29uZmlnLmhvc3QpXHJcbiAgICAgICAgICAgIDpkZWZhdWx0T3B0aW9ucy5wbHVnaW5zIVswXT1uZXcgVG9vbGJhcihkZWZhdWx0VG9vbEZhY3RvcmllcyxzZWxmQ29uZmlnLmhvc3QpO1xyXG5cclxuICAgICAgICBzZWxmQ29uZmlnLnVwbG9hZEZpbGVQcm9taXNlP2RlZmF1bHRPcHRpb25zLnVwbG9hZGVyPVNldFVwbG9hZGVyKHNlbGZDb25maWcudXBsb2FkRmlsZVByb21pc2UpOicnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZWRpdG9yID0gbmV3IEVkaXRvcihzZWxlY3RvcixkZWZhdWx0T3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5lZGl0b3Iub25DaGFuZ2UucGlwZShhdWRpdFRpbWUoc2VsZkNvbmZpZy5vdXRwdXRTZXR0aW5nLnNhdmVJbnRlcnZhbHx8MCkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25TYXZlKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHJlcGxhY2VDb250ZW50KGNvbnRlbnQpe1xyXG4gICAgICAgIHRoaXMuZWRpdG9yLnJlcGxhY2VDb250ZW50KGNvbnRlbnQpO1xyXG4gICAgfVxyXG4gICAgb25TYXZlKCl7XHJcbiAgICAgICAgbGV0IG91dHB1dFNldHRpbmc9dGhpcy5zZWxmQ29uZmlnLm91dHB1dFNldHRpbmdcclxuICAgICAgICBpZihvdXRwdXRTZXR0aW5nLmNiU2F2ZUpTT04pe1xyXG4gICAgICAgICAgICBvdXRwdXRTZXR0aW5nLmNiU2F2ZUpTT04oSlNPTi5zdHJpbmdpZnkodGhpcy5lZGl0b3IuZ2V0SlNPTigpLmNvbnRlbnQsbnVsbCxcIiAgXCIpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvdXRwdXRTZXR0aW5nLmNiU2F2ZUhUTUwhPXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBjb250ZW50PXRoaXMuZWRpdG9yLmdldENvbnRlbnRzKClcclxuICAgICAgICAgICAgb3V0cHV0U2V0dGluZy5jYlNhdmVIVE1MKG91dHB1dFNldHRpbmcuYkNvbmNhdEh0bWw/Y29uY2F0SFRNTChjb250ZW50LG91dHB1dFNldHRpbmcuc3R5bGVMaW5rKTpjb250ZW50LmNvbnRlbnQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19