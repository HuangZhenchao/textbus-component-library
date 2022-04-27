const CesiumIonToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
    ".eyJqdGkiOiI2NTI4ZWQ1Yi0zMjMxLTRjYmItODFiZS0zZjExOWFhNjljMTUiLCJpZCI6NDM3OTAsImlhdCI6MTYxMzEzNTY0Nn0" +
    ".rPvMtZjhe_qs8NA6UZLEhkKyz4bDZXjFGqXqMHfbwpI";
const tdtToken = '85dcab3699b288cd780476d37fa35805';
// 服务域名
var tdtUrl = 'https://t{s}.tianditu.gov.cn/';
// 服务负载子域
var subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];
//let Cesium=window.Cesium;
//console.log("Cesium",window[Cesium],window.Cesium)
export class CesiumApp {
    constructor(Cesium, data) {
        Object.defineProperty(this, "Cesium", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tdtImageryProvider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "localTerrainProvider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tdtProviderViewModel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "defaultTerrainProviderViewModel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "CreateViewer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (container) => {
                var viewer = new this.Cesium.Viewer(container, {
                    baseLayerPicker: true,
                    fullscreenButton: true,
                    geocoder: false,
                    homeButton: false,
                    navigationHelpButton: false,
                    sceneModePicker: true,
                    timeline: false,
                    animation: false,
                });
                viewer._cesiumWidget._creditContainer.style.display = 'none';
                viewer.scene.globe.showGroundAtmosphere = false;
                /*
                var center = Cesium.Cartesian3.fromDegrees(116.435314,39.960521);//camera视野的中心点坐标
                var heading = Cesium.Math.toRadians(20.0);
                var pitch = Cesium.Math.toRadians(-90.0);
                var range = 50000.0;
                viewer.camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, range));
                */
                var defaultImageryProviderViewModels = viewer.baseLayerPicker.viewModel.imageryProviderViewModels;
                defaultImageryProviderViewModels.push(this.tdtProviderViewModel);
                viewer.baseLayerPicker.viewModel.imageryProviderViewModels = defaultImageryProviderViewModels;
                viewer.baseLayerPicker.viewModel.terrainProviderViewModels.push(this.defaultTerrainProviderViewModel);
                viewer.camera.setView({
                    destination: this.Cesium.Cartesian3.fromDegrees(116.435314, 39.960521, 115000.0),
                    orientation: {
                        heading: this.Cesium.Math.toRadians(0.0),
                        pitch: this.Cesium.Math.toRadians(-90.0),
                        roll: 0
                    }
                });
            }
        });
        this.Cesium = Cesium;
        Cesium.Ion.defaultAccessToken = CesiumIonToken;
        this.tdtImageryProvider = {
            img_w: new Cesium.UrlTemplateImageryProvider({
                url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + tdtToken,
                subdomains: subdomains,
                tilingScheme: new Cesium.WebMercatorTilingScheme(),
                maximumLevel: 18,
            }),
            cia_w: new Cesium.UrlTemplateImageryProvider({
                url: tdtUrl + 'DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=' + tdtToken,
                subdomains: subdomains,
                tilingScheme: new Cesium.WebMercatorTilingScheme(),
                maximumLevel: 18,
            }),
            ibo_w: new Cesium.UrlTemplateImageryProvider({
                url: tdtUrl + 'DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=' + tdtToken,
                subdomains: subdomains,
                tilingScheme: new Cesium.WebMercatorTilingScheme(),
                maximumLevel: 18,
            })
        };
        this.localTerrainProvider = new Cesium.CesiumTerrainProvider({
            //url:"http://t0.tianditu.gov.cn/ter_w/wmts?tk=85dcab3699b288cd780476d37fa35805"
            url: "http://106.55.148.203:801/90mDem"
        });
        this.tdtProviderViewModel = new Cesium.ProviderViewModel({
            name: '天\u00ad地\u00ad图影像',
            iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
            tooltip: '国产天地图',
            creationFunction: function () {
                return [this.tdtImageryProvider.img_w, this.tdtImageryProvider.cia_w, this.tdtImageryProvider.ibo_w]; //,Provider_TDT_cia,Provider_TDT_ibo
            }
        });
        this.defaultTerrainProviderViewModel = new Cesium.ProviderViewModel({
            name: 'srtm-90m中国区域',
            iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
            tooltip: 'srtm-90m中国区域',
            creationFunction: function () {
                return this.localTerrainProvider; //,Provider_TDT_cia,Provider_TDT_ibo
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlld2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdGV4dGJ1cy9jb21wb25lbnRzL21hcC9DZXNpdW1WaWV3ZXIvVmlld2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sY0FBYyxHQUFDLHNDQUFzQztJQUMzRCxzR0FBc0c7SUFDdEcsOENBQThDLENBQUM7QUFDL0MsTUFBTSxRQUFRLEdBQUMsa0NBQWtDLENBQUE7QUFDakQsT0FBTztBQUNQLElBQUksTUFBTSxHQUFHLCtCQUErQixDQUFBO0FBQzVDLFNBQVM7QUFDVCxJQUFJLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUV6RCwyQkFBMkI7QUFDM0Isb0RBQW9EO0FBQ3BELE1BQU0sT0FBTyxTQUFTO0lBTWxCLFlBQVksTUFBTSxFQUFFLElBQUk7UUFMeEI7Ozs7O1dBQVk7UUFDWjs7Ozs7V0FBd0I7UUFDeEI7Ozs7O1dBQTBCO1FBQzFCOzs7OztXQUEwQjtRQUMxQjs7Ozs7V0FBcUM7UUFnRHJDOzs7O21CQUFhLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3ZCLElBQUksTUFBTSxHQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO29CQUN6QyxlQUFlLEVBQUUsSUFBSTtvQkFDckIsZ0JBQWdCLEVBQUUsSUFBSTtvQkFDdEIsUUFBUSxFQUFFLEtBQUs7b0JBQ2YsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLG9CQUFvQixFQUFFLEtBQUs7b0JBQzNCLGVBQWUsRUFBRSxJQUFJO29CQUNyQixRQUFRLEVBQUUsS0FBSztvQkFDZixTQUFTLEVBQUUsS0FBSztpQkFFbkIsQ0FBQyxDQUFBO2dCQUNGLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE9B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QUFBO1FBRUYsSUFBSSxDQUFDLCtCQUErQixHQUFDLElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDO1lBQzlELElBQUksRUFBRyxjQUFjO1lBQ3JCLE9BQU8sRUFBRyxNQUFNLENBQUMsY0FBYyxDQUFDLG1EQUFtRCxDQUFDO1lBQ3BGLE9BQU8sRUFBRyxjQUFjO1lBQ3hCLGdCQUFnQixFQUFHO2dCQUNmLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUEsb0NBQW9DO1lBQ3pFLENBQUM7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDO0NBMENKIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ2VzaXVtSW9uVG9rZW49XCJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjlcIiArXHJcblwiLmV5SnFkR2tpT2lJMk5USTRaV1ExWWkwek1qTXhMVFJqWW1JdE9ERmlaUzB6WmpFeE9XRmhOamxqTVRVaUxDSnBaQ0k2TkRNM09UQXNJbWxoZENJNk1UWXhNekV6TlRZME5uMFwiICtcclxuXCIuclB2TXRaamhlX3FzOE5BNlVaTEVoa0t5ejRiRFpYakZHcVhxTUhmYndwSVwiO1xyXG5jb25zdCB0ZHRUb2tlbj0nODVkY2FiMzY5OWIyODhjZDc4MDQ3NmQzN2ZhMzU4MDUnXHJcbi8vIOacjeWKoeWfn+WQjVxyXG52YXIgdGR0VXJsID0gJ2h0dHBzOi8vdHtzfS50aWFuZGl0dS5nb3YuY24vJ1xyXG4vLyDmnI3liqHotJ/ovb3lrZDln59cclxudmFyIHN1YmRvbWFpbnMgPSBbJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNyddXHJcblxyXG4vL2xldCBDZXNpdW09d2luZG93LkNlc2l1bTtcclxuLy9jb25zb2xlLmxvZyhcIkNlc2l1bVwiLHdpbmRvd1tDZXNpdW1dLHdpbmRvdy5DZXNpdW0pXHJcbmV4cG9ydCBjbGFzcyBDZXNpdW1BcHAge1xyXG4gICAgQ2VzaXVtOiBhbnk7ICAgIFxyXG4gICAgdGR0SW1hZ2VyeVByb3ZpZGVyOiBhbnk7XHJcbiAgICBsb2NhbFRlcnJhaW5Qcm92aWRlcjogYW55O1xyXG4gICAgdGR0UHJvdmlkZXJWaWV3TW9kZWw6IGFueTtcclxuICAgIGRlZmF1bHRUZXJyYWluUHJvdmlkZXJWaWV3TW9kZWw6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKENlc2l1bSwgZGF0YSl7XHJcbiAgICAgICAgdGhpcy5DZXNpdW0gPSBDZXNpdW07XHJcbiAgICAgICAgQ2VzaXVtLklvbi5kZWZhdWx0QWNjZXNzVG9rZW49Q2VzaXVtSW9uVG9rZW47XHJcbiAgICAgICAgdGhpcy50ZHRJbWFnZXJ5UHJvdmlkZXIgPSB7XHJcbiAgICAgICAgICAgIGltZ193OiBuZXcgQ2VzaXVtLlVybFRlbXBsYXRlSW1hZ2VyeVByb3ZpZGVyKHtcclxuICAgICAgICAgICAgICAgIHVybDogdGR0VXJsICsgJ0RhdGFTZXJ2ZXI/VD1pbWdfdyZ4PXt4fSZ5PXt5fSZsPXt6fSZ0az0nICsgdGR0VG9rZW4sXHJcbiAgICAgICAgICAgICAgICBzdWJkb21haW5zOiBzdWJkb21haW5zLFxyXG4gICAgICAgICAgICAgICAgdGlsaW5nU2NoZW1lOiBuZXcgQ2VzaXVtLldlYk1lcmNhdG9yVGlsaW5nU2NoZW1lKCksXHJcbiAgICAgICAgICAgICAgICBtYXhpbXVtTGV2ZWw6IDE4LFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgY2lhX3c6IG5ldyBDZXNpdW0uVXJsVGVtcGxhdGVJbWFnZXJ5UHJvdmlkZXIoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiB0ZHRVcmwgKyAnRGF0YVNlcnZlcj9UPWNpYV93Jng9e3h9Jnk9e3l9Jmw9e3p9JnRrPScgKyB0ZHRUb2tlbixcclxuICAgICAgICAgICAgICAgIHN1YmRvbWFpbnM6IHN1YmRvbWFpbnMsXHJcbiAgICAgICAgICAgICAgICB0aWxpbmdTY2hlbWU6IG5ldyBDZXNpdW0uV2ViTWVyY2F0b3JUaWxpbmdTY2hlbWUoKSxcclxuICAgICAgICAgICAgICAgIG1heGltdW1MZXZlbDogMTgsXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBpYm9fdzogbmV3IENlc2l1bS5VcmxUZW1wbGF0ZUltYWdlcnlQcm92aWRlcih7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHRkdFVybCArICdEYXRhU2VydmVyP1Q9aWJvX3cmeD17eH0meT17eX0mbD17en0mdGs9JyArIHRkdFRva2VuLFxyXG4gICAgICAgICAgICAgICAgc3ViZG9tYWluczogc3ViZG9tYWlucyxcclxuICAgICAgICAgICAgICAgIHRpbGluZ1NjaGVtZTogbmV3IENlc2l1bS5XZWJNZXJjYXRvclRpbGluZ1NjaGVtZSgpLFxyXG4gICAgICAgICAgICAgICAgbWF4aW11bUxldmVsOiAxOCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubG9jYWxUZXJyYWluUHJvdmlkZXIgPSBuZXcgQ2VzaXVtLkNlc2l1bVRlcnJhaW5Qcm92aWRlcih7XHJcbiAgICAgICAgICAgIC8vdXJsOlwiaHR0cDovL3QwLnRpYW5kaXR1Lmdvdi5jbi90ZXJfdy93bXRzP3RrPTg1ZGNhYjM2OTliMjg4Y2Q3ODA0NzZkMzdmYTM1ODA1XCJcclxuICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xMDYuNTUuMTQ4LjIwMzo4MDEvOTBtRGVtXCJcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnRkdFByb3ZpZGVyVmlld01vZGVsPW5ldyBDZXNpdW0uUHJvdmlkZXJWaWV3TW9kZWwoe1xyXG4gICAgICAgICAgICBuYW1lIDogJ+WkqVxcdTAwYWTlnLBcXHUwMGFk5Zu+5b2x5YOPJyxcclxuICAgICAgICAgICAgaWNvblVybCA6IENlc2l1bS5idWlsZE1vZHVsZVVybCgnV2lkZ2V0cy9JbWFnZXMvSW1hZ2VyeVByb3ZpZGVycy9vcGVuU3RyZWV0TWFwLnBuZycpLFxyXG4gICAgICAgICAgICB0b29sdGlwIDogJ+WbveS6p+WkqeWcsOWbvicsXHJcbiAgICAgICAgICAgIGNyZWF0aW9uRnVuY3Rpb24gOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbdGhpcy50ZHRJbWFnZXJ5UHJvdmlkZXIuaW1nX3csdGhpcy50ZHRJbWFnZXJ5UHJvdmlkZXIuY2lhX3csdGhpcy50ZHRJbWFnZXJ5UHJvdmlkZXIuaWJvX3ddOy8vLFByb3ZpZGVyX1REVF9jaWEsUHJvdmlkZXJfVERUX2lib1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuZGVmYXVsdFRlcnJhaW5Qcm92aWRlclZpZXdNb2RlbD1uZXcgQ2VzaXVtLlByb3ZpZGVyVmlld01vZGVsKHtcclxuICAgICAgICAgICAgbmFtZSA6ICdzcnRtLTkwbeS4reWbveWMuuWfnycsXHJcbiAgICAgICAgICAgIGljb25VcmwgOiBDZXNpdW0uYnVpbGRNb2R1bGVVcmwoJ1dpZGdldHMvSW1hZ2VzL0ltYWdlcnlQcm92aWRlcnMvb3BlblN0cmVldE1hcC5wbmcnKSxcclxuICAgICAgICAgICAgdG9vbHRpcCA6ICdzcnRtLTkwbeS4reWbveWMuuWfnycsXHJcbiAgICAgICAgICAgIGNyZWF0aW9uRnVuY3Rpb24gOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsVGVycmFpblByb3ZpZGVyOy8vLFByb3ZpZGVyX1REVF9jaWEsUHJvdmlkZXJfVERUX2lib1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgQ3JlYXRlVmlld2VyPShjb250YWluZXIpID0+e1xyXG4gICAgICAgIHZhciB2aWV3ZXI9bmV3IHRoaXMuQ2VzaXVtLlZpZXdlcihjb250YWluZXIsIHtcclxuICAgICAgICAgICAgYmFzZUxheWVyUGlja2VyOiB0cnVlLFxyXG4gICAgICAgICAgICBmdWxsc2NyZWVuQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBnZW9jb2RlcjogZmFsc2UsXHJcbiAgICAgICAgICAgIGhvbWVCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uSGVscEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIHNjZW5lTW9kZVBpY2tlcjogdHJ1ZSxcclxuICAgICAgICAgICAgdGltZWxpbmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhbmltYXRpb246IGZhbHNlLFxyXG4gICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICB2aWV3ZXIuX2Nlc2l1bVdpZGdldC5fY3JlZGl0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB2aWV3ZXIuc2NlbmUuZ2xvYmUuc2hvd0dyb3VuZEF0bW9zcGhlcmUgPSBmYWxzZVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIGNlbnRlciA9IENlc2l1bS5DYXJ0ZXNpYW4zLmZyb21EZWdyZWVzKDExNi40MzUzMTQsMzkuOTYwNTIxKTsvL2NhbWVyYeinhumHjueahOS4reW/g+eCueWdkOagh1xyXG4gICAgICAgIHZhciBoZWFkaW5nID0gQ2VzaXVtLk1hdGgudG9SYWRpYW5zKDIwLjApO1xyXG4gICAgICAgIHZhciBwaXRjaCA9IENlc2l1bS5NYXRoLnRvUmFkaWFucygtOTAuMCk7XHJcbiAgICAgICAgdmFyIHJhbmdlID0gNTAwMDAuMDtcclxuICAgICAgICB2aWV3ZXIuY2FtZXJhLmxvb2tBdChjZW50ZXIsIG5ldyBDZXNpdW0uSGVhZGluZ1BpdGNoUmFuZ2UoaGVhZGluZywgcGl0Y2gsIHJhbmdlKSk7XHJcbiAgICAgICAgKi9cclxuICAgICAgICBcclxuICAgICAgICB2YXIgZGVmYXVsdEltYWdlcnlQcm92aWRlclZpZXdNb2RlbHM9dmlld2VyLmJhc2VMYXllclBpY2tlci52aWV3TW9kZWwuaW1hZ2VyeVByb3ZpZGVyVmlld01vZGVsc1xyXG4gICAgICAgIGRlZmF1bHRJbWFnZXJ5UHJvdmlkZXJWaWV3TW9kZWxzLnB1c2godGhpcy50ZHRQcm92aWRlclZpZXdNb2RlbClcclxuICAgICAgICB2aWV3ZXIuYmFzZUxheWVyUGlja2VyLnZpZXdNb2RlbC5pbWFnZXJ5UHJvdmlkZXJWaWV3TW9kZWxzPWRlZmF1bHRJbWFnZXJ5UHJvdmlkZXJWaWV3TW9kZWxzXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHZpZXdlci5iYXNlTGF5ZXJQaWNrZXIudmlld01vZGVsLnRlcnJhaW5Qcm92aWRlclZpZXdNb2RlbHMucHVzaCh0aGlzLmRlZmF1bHRUZXJyYWluUHJvdmlkZXJWaWV3TW9kZWwpXHJcblxyXG4gICAgICAgIHZpZXdlci5jYW1lcmEuc2V0Vmlldyh7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uIDogdGhpcy5DZXNpdW0uQ2FydGVzaWFuMy5mcm9tRGVncmVlcygxMTYuNDM1MzE0LDM5Ljk2MDUyMSwgMTE1MDAwLjApLCAvLyDorr7nva7kvY3nva5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBvcmllbnRhdGlvbjoge1xyXG4gICAgICAgICAgICAgIGhlYWRpbmcgOiB0aGlzLkNlc2l1bS5NYXRoLnRvUmFkaWFucygwLjApLCAvLyDmlrnlkJFcclxuICAgICAgICAgICAgICBwaXRjaCA6IHRoaXMuQ2VzaXVtLk1hdGgudG9SYWRpYW5zKC05MC4wKSwvLyDlgL7mlpzop5LluqZcclxuICAgICAgICAgICAgICByb2xsIDogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuIl19