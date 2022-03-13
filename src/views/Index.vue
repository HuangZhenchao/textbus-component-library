<template>
    <div id="editor1" style="width:100%;height: 100vh;"></div>
</template>

<script lang="ts">   
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { createEditor, Toolbar } from '@textbus/editor';
    import {detailComponentLoader} from '../../bundles/components/detail/detail.component'
    import {TextbusApp, TextbusConfig} from '../../bundles/textbus'
    import { api } from '@/utils/axios/api';
    //import { h } from 'vue';
    @Component
    export default class Index extends Vue {
        filePath: string="";
        textbus!: TextbusApp;
        config:TextbusConfig={
            uploadFilePromise:api.upload.image,
            cbSaveHTML:this.cbSaveHTML,
            cbSaveJSON:this.cbSaveJSON,
            saveInterval:10000
        }
        @Prop() private msg!: string;
        mounted(){
            
            this.textbus=new TextbusApp(document.getElementById('editor1'),this.config)           
        }
        cbSaveHTML(content){
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
