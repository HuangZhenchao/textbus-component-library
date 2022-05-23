<template>
    <div id="editor" style="width:100%;height: 100vh;"></div>
</template>

<script lang="ts">   
    import { Component, Prop, Vue,Watch} from 'vue-property-decorator';
    import { ContextMenu, createEditor, Toolbar } from '@textbus/editor';
    import {TextbusApp, TextbusConfig} from '../../textbus/_public-api'
    import { api } from '@/utils/axios/api';
    //import { h } from 'vue';
    import '@textbus/editor/bundles/textbus.min.css'
    import '../../bundles/textbusLib.min.css'
    import {fromEvent, sampleTime } from '@tanbo/stream';
    @Component
    export default class Index extends Vue {
        status:Number=0
        filePath: string="";
        textbus!: TextbusApp;
        config:TextbusConfig={
            outputSetting:{
                //cbSaveHTML:this.cbSaveHTML,
                //saveInterval:2000,
                bConcatHtml:false,
                styleLink:"http://106.55.148.203:8002/upload/textbus.component.style.css"
            },
            uploadFilePromise:api.upload.image,
        }
        @Watch('$route')
        onRouteChange(val,oldVal){
            console.log("onRouteChange",val,oldVal);
            typeof(this.$route.query.filePath)==='string'?
            this.filePath=this.$route.query.filePath:""
            this.newContent()
        }

        newContent(){
            console.log('读取路径：',this.filePath);
              const form = new FormData();
              form.append('filePath',this.filePath)
              api.r.note(form).then(response=>{
                  let result=response.data;
                  if(result.code==0){
                    this.textbus.replaceContent(result.content);
                  }else{
                      this.status=1
                      console.log(result.message)
                  }
              })
        }
       mounted(){
         typeof(this.$route.query.filePath)==='string'?
            this.filePath=this.$route.query.filePath:this.filePath="D:/test.html"
         this.textbus=new TextbusApp(document.getElementById('editor'),this.config)
          
          this.textbus.editor.onReady.subscribe(()=>{
              this.newContent();
          })
          
          
       }
       cbSaveHTML(content){
           if(this.status!=0){
               return;
           }
          const form = new FormData();
          form.append('filePath',this.filePath)
          form.append('content',content)
          api.u.note(form).then(response=>{
              let result=response.data;
              //console.log('保存JSON数据',result,this.textbus.editor.layout.scroller.scrollTop);
              //content='<p><div>123</div></p>';
              //const editor = createEditor(document.getElementById('editor')!,content,api.upload.image);
              /*  */              
          })
          
       }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#editor{
  display: flex;
}
</style>
