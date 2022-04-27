const CesiumIonToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
".eyJqdGkiOiI2NTI4ZWQ1Yi0zMjMxLTRjYmItODFiZS0zZjExOWFhNjljMTUiLCJpZCI6NDM3OTAsImlhdCI6MTYxMzEzNTY0Nn0" +
".rPvMtZjhe_qs8NA6UZLEhkKyz4bDZXjFGqXqMHfbwpI";
const tdtToken='85dcab3699b288cd780476d37fa35805'
// 服务域名
var tdtUrl = 'https://t{s}.tianditu.gov.cn/'
// 服务负载子域
var subdomains = ['0', '1', '2', '3', '4', '5', '6', '7']

//let Cesium=window.Cesium;
//console.log("Cesium",window[Cesium],window.Cesium)
export class CesiumApp {
    Cesium: any;    
    tdtImageryProvider: any;
    localTerrainProvider: any;
    tdtProviderViewModel: any;
    defaultTerrainProviderViewModel: any;
    constructor(Cesium, data){
        this.Cesium = Cesium;
        Cesium.Ion.defaultAccessToken=CesiumIonToken;
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
        this.tdtProviderViewModel=new Cesium.ProviderViewModel({
            name : '天\u00ad地\u00ad图影像',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
            tooltip : '国产天地图',
            creationFunction : function() {
                return [this.tdtImageryProvider.img_w,this.tdtImageryProvider.cia_w,this.tdtImageryProvider.ibo_w];//,Provider_TDT_cia,Provider_TDT_ibo

            }
        })

        this.defaultTerrainProviderViewModel=new Cesium.ProviderViewModel({
            name : 'srtm-90m中国区域',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
            tooltip : 'srtm-90m中国区域',
            creationFunction : function() {
                return this.localTerrainProvider;//,Provider_TDT_cia,Provider_TDT_ibo
            }
        })
    }
    
    CreateViewer=(container) =>{
        var viewer=new this.Cesium.Viewer(container, {
            baseLayerPicker: true,
            fullscreenButton: true,
            geocoder: false,
            homeButton: false,
            navigationHelpButton: false,
            sceneModePicker: true,
            timeline: false,
            animation: false,
    
        })
        viewer._cesiumWidget._creditContainer.style.display = 'none'
        viewer.scene.globe.showGroundAtmosphere = false
        /*
        var center = Cesium.Cartesian3.fromDegrees(116.435314,39.960521);//camera视野的中心点坐标
        var heading = Cesium.Math.toRadians(20.0);
        var pitch = Cesium.Math.toRadians(-90.0);
        var range = 50000.0;
        viewer.camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, range));
        */
        
        var defaultImageryProviderViewModels=viewer.baseLayerPicker.viewModel.imageryProviderViewModels
        defaultImageryProviderViewModels.push(this.tdtProviderViewModel)
        viewer.baseLayerPicker.viewModel.imageryProviderViewModels=defaultImageryProviderViewModels

        
        viewer.baseLayerPicker.viewModel.terrainProviderViewModels.push(this.defaultTerrainProviderViewModel)

        viewer.camera.setView({
            destination : this.Cesium.Cartesian3.fromDegrees(116.435314,39.960521, 115000.0), // 设置位置
          
            orientation: {
              heading : this.Cesium.Math.toRadians(0.0), // 方向
              pitch : this.Cesium.Math.toRadians(-90.0),// 倾斜角度
              roll : 0
            }
        });
        
    }
}
