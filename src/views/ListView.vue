<template>
    <div class="listView" style="width:100%;height: 100%;">
        <div class="treeView"></div>
        <div class="listView"></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
    //import { h } from 'vue';
    @Component({
        components: {
            //Textbus
        }
    })
    
    export default class ListView extends Vue {
      //@Ref() readonly textbus!:Textbus;
       data(){
         return {
           //uploadImage:api.upload.image
         }
       }
       newContent(){
         
       }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tree-and-list{
    display: flex;
}
.treeView{
    width:35%;
}
.listView{
    width:65%;
}
</style>
