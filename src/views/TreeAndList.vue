<template>
    <div class="tree-and-list" style="width:100%;height: 100%;">
        <TreeView />
        <ListView />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
    import TreeView  from './TreeView.vue';
    import ListView  from './ListView.vue';
    @Component({
        components: {
            TreeView,ListView
        }
    })
    
    export default class TreeAndList extends Vue {
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
