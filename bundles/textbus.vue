<template>
    <div id="editor" style="width:100%;height: 100vh;"></div>
</template>

<script lang="ts">
    import { Editor, Toolbar } from '@textbus/editor';
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import {defaultOptions,defaultToolFactories} from "./defaultOptions"
    import { SetUploader } from './utils/uploader';
    import {concatHTML} from "./utils/output"
    //import { h } from 'vue';

    @Component
    export default class Textbus extends Vue {
        @Prop() private uploadFilePromise!: Promise<any>;
        @Prop() private componentLoaders!: [];
        @Prop() private formatLoaders!: [];
        @Prop() private toolFactories!: [];
        @Prop() private host!: string | HTMLElement;
        @Prop() private cbSaveJSON!: Function;
        @Prop() private cbSaveHTML!: Function;
        @Prop() private bConcatHtml: Boolean=true;
        editor: any=undefined;
        mounted(){
            this.componentLoaders?defaultOptions.componentLoaders=this.componentLoaders:'';
            this.formatLoaders?defaultOptions.formatLoaders=this.formatLoaders:'';
            console.log(this.host,this.toolFactories)
            this.toolFactories?
                defaultOptions.plugins![0]=new Toolbar(this.toolFactories,this.host)
                :defaultOptions.plugins![0]=new Toolbar(defaultToolFactories,this.host);

            this.uploadFilePromise?defaultOptions.uploader=SetUploader(this.uploadFilePromise):'';
            this.editor = new Editor(document.getElementById('editor')!,defaultOptions);            
            this.editor.onChange.subscribe(() => {
                //console.log()
                if(this.cbSaveJSON){
                    this.cbSaveJSON(this.editor.getJSON().content)
                }
                if(this.cbSaveHTML){
                    console.log("cbSaveHTML")
                    
                    let content=this.editor.getContents()
                    this.cbSaveHTML(this.bConcatHtml?concatHTML(content):content)
                }
            })
        }
        public replaceContent(content){
            this.editor.replaceContent(content);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#editor{
  display: flex;
}
</style>
