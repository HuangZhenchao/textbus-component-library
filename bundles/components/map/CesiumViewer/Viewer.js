//Provider->imageryProvider
//Provider->ProviderViewModel->ProviderViewModels->viewer.baseLayerPicker.viewModel.imageryProviderViewModels

import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
    ".eyJqdGkiOiI2NTI4ZWQ1Yi0zMjMxLTRjYmItODFiZS0zZjExOWFhNjljMTUiLCJpZCI6NDM3OTAsImlhdCI6MTYxMzEzNTY0Nn0" +
    ".rPvMtZjhe_qs8NA6UZLEhkKyz4bDZXjFGqXqMHfbwpI";
var token = '85dcab3699b288cd780476d37fa35805'
// 服务域名
var tdtUrl = 'https://t{s}.tianditu.gov.cn/'
// 服务负载子域
var subdomains = ['0', '1', '2', '3', '4', '5', '6', '7']
var localProvider=new Cesium.UrlTemplateImageryProvider({
    url: "/Satellite/test/{z}/{x}/{y}.png",
    //subdomains: subdomains,
    tilingScheme: new Cesium.WebMercatorTilingScheme(),
    maximumLevel: 18,
})
// eslint-disable-next-line no-unused-vars
const Provider_TDT_Img=new Cesium.UrlTemplateImageryProvider({
    url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
    subdomains: subdomains,
    tilingScheme: new Cesium.WebMercatorTilingScheme(),
    maximumLevel: 18,
})
// eslint-disable-next-line no-unused-vars
var Provider_TDT_cia = new Cesium.UrlTemplateImageryProvider({
    url: tdtUrl + 'DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=' + token,
    subdomains: subdomains,
    tilingScheme: new Cesium.WebMercatorTilingScheme(),
    maximumLevel: 18,
})
// eslint-disable-next-line no-unused-vars
var Provider_TDT_ibo = new Cesium.UrlTemplateImageryProvider({
    url: tdtUrl + 'DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=' + token,
    subdomains: subdomains,
    tilingScheme: new Cesium.WebMercatorTilingScheme(),
    maximumLevel: 18,
})

var url="/90mDem/";
// eslint-disable-next-line no-unused-vars
var terrainProvider=new Cesium.CesiumTerrainProvider({
    //url:"http://t0.tianditu.gov.cn/ter_w/wmts?tk=85dcab3699b288cd780476d37fa35805"
    url:url
});

//var terrainProvider=Cesium.EllipsoidTerrainProvider();
//var ellipsoidProvider = new Cesium.EllipsoidTerrainProvider();
var viewer;
export function initViewer(container){
    viewer = new Cesium.Viewer(container, {
        baseLayerPicker: true,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        navigationHelpButton: false,
        sceneModePicker: false,
        timeline: false,
        animation: false,

    })
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    viewer.scene.globe.showGroundAtmosphere = false

//
//
    var providerViewModels=[
        new Cesium.ProviderViewModel({
            name : '天\u00ad地\u00ad图影像',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
            tooltip : '国产天地图',
            creationFunction : function() {
                //return [Provider_TDT_Img,Provider_TDT_cia,Provider_TDT_ibo];//,Provider_TDT_cia,Provider_TDT_ibo
                return localProvider
            }
        }),
        new Cesium.ProviderViewModel({
            name : '天\u00ad地\u00ad图影像',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
            tooltip : '国产天地图',
            creationFunction : function() {
                return [Provider_TDT_Img,Provider_TDT_cia,Provider_TDT_ibo];//,Provider_TDT_cia,Provider_TDT_ibo

            }
        })
    ]
    viewer.baseLayerPicker.viewModel.imageryProviderViewModels=providerViewModels
    viewer.baseLayerPicker.viewModel.selectedImagery=providerViewModels[0]

    viewer.baseLayerPicker.viewModel.terrainProviderViewModels.push(
        new Cesium.ProviderViewModel({
            name : 'srtm-90m中国区域',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
            tooltip : 'srtm-90m中国区域',
            creationFunction : function() {
                return terrainProvider;//,Provider_TDT_cia,Provider_TDT_ibo
            }
        })
    )

    //viewer.terrainProvider=terrainProvider
    //viewer.imageryLayers.addImageryProvider(Provider_TDT_Img)
    //viewer.imageryLayers.addImageryProvider(Provider_TDT_ibo)
}

export default {
    Cesium,viewer
}