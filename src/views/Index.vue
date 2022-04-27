<template>
    <div id="editor1" style="width:100%;height: 100vh;"></div>
</template>

<script lang="ts">   
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { ContextMenu, createEditor, Toolbar } from '@textbus/editor';
    import {TextbusApp, TextbusConfig} from '../../textbus/_public-api'
    import { api } from '@/utils/axios/api';
    //import { h } from 'vue';
    import '@textbus/editor/bundles/textbus.min.css'
    import '../../bundles/textbus.min.css'
    @Component
    export default class Index extends Vue {
        filePath: string="upload\\cnote\\article.cnote";
        textbus!: TextbusApp;
        
        config:TextbusConfig={
            outputSetting:{
                //cbSaveHTML:this.cbSaveHTML,
                //cbSaveJSON:this.cbSaveJSON,
                saveInterval:10000,
                bConcatHtml:true,
                //styleLink:"http://106.55.148.203:8002/upload/textbus.component.style.css"
            },
            uploadFilePromise:api.upload.image,
            
        }
        @Prop() private msg!: string;
        mounted(){
            
            this.textbus=new TextbusApp(document.getElementById('editor1'),this.config) ;
            this.textbus.editor.onReady.subscribe((value)=>{
                /*
                console.log("ContextMenu",ContextMenu);
                const form = new FormData();
                form.append('filePath',this.filePath)
                api.r.cnote(form).then(response=>{
                    let content=response.data.content;
                    content=JSON.parse(content);
                    console.log("newContent",content);
                    //content='<p><div>123</div></p>';
                    //const editor = createEditor(document.getElementById('editor')!,content,api.upload.image);
                    this.textbus.replaceContent(content);
                })*/
                this.textbus.replaceContent("<p></p>");
                
            })
        }
        cbSaveHTML(content){
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
        cbSaveJSON(content){
            console.log("cbSaveJSON",content);
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
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#editor1{
  display: flex;
}
</style>
