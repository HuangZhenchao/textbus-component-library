<template>
    <div id="main" style="width:100%;height: 100vh;">
      <div style="width:55%;"><TreeAndList /></div>
      <div style="width:45%;">
        <Textbus :ref="textbus" :uploadFilePromise="uploadImage" :toolFactories="toolFactories" :cbSaveJSON="saveJSON"  :cbSaveHTML="saveHTML"/>
        
        </div>
      
    </div>
</template>

<script lang="ts">
    import { api } from '@/utils/axios/api';
import qs from 'qs';
import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import Textbus from "../../bundles/textbus.vue"
import TreeAndList from "./TreeAndList.vue"
    //import { h } from 'vue';
    @Component({
        components: {
            Textbus,TreeAndList
        }
    })
    
    export default class Home extends Vue {
      @Ref() readonly textbus!:Textbus;
      filePath: string="";
       data(){
         return {
           uploadImage:api.upload.image,
           toolFactories:null
         }
       }
       newContent(){
         typeof(this.$route.query.filePath)==='string'?
            this.filePath=this.$route.query.filePath:this.filePath="upload/json/article.json"
         
          console.log('createEditor',this.filePath)
          const form = new FormData();
          form.append('filePath',this.filePath)
          api.r.cnote(form).then(response=>{
              let content=response.data.data;
              console.log(content)
              //content='<p><div>123</div></p>';
              //const editor = createEditor(document.getElementById('editor')!,content,api.upload.image);
              /*  */
              this.textbus.replaceContent('s');
          })
       }
       saveJSON(content){
          const form = new FormData();
          form.append('filePath',this.filePath)
          form.append('content',content)
          api.u.cnote(form).then(response=>{
              let result=response.data;
              console.log('result',result);
              //content='<p><div>123</div></p>';
              //const editor = createEditor(document.getElementById('editor')!,content,api.upload.image);
              /*  */              
          })
       }
       saveHTML(content){
          const form = new FormData();
          form.append('filePath',this.filePath)
          form.append('content',content)
          api.u.notehtml(form).then(response=>{
              let result=response.data;
              console.log('result',result);
              //content='<p><div>123</div></p>';
              //const editor = createEditor(document.getElementById('editor')!,content,api.upload.image);
              /*  */ 
          })
       }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main{
  display: flex;
}
</style>
