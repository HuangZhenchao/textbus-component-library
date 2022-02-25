<!--
 * @Description: 
 * @Version: 1.0.0
 * @Autor: lqc
 * @Date: 2020-05-28 15:36:25
 * @LastEditors: lqc
 * @LastEditTime: 2020-06-01 13:58:50
 * @FilePath: \cesiumVueClean\src\components\CesiumViewer\index.vue
-->
<template>
  <div>
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {Cesium,initViewer} from './Viewer'

export default {
  mounted() {
    initViewer("cesiumContainer");
  },
  methods: {
  }
}
</script>

<style scoped>
#cesiumContainer {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
