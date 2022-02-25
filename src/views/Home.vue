<template>
    <div id="editor" style="width:1500px;height: 600px;"></div>
</template>

<script lang="ts">
    import { api } from '@/utils/axios/api';
import qs from 'qs';
import { Component, Prop, Vue } from 'vue-property-decorator';
import {createEditor} from "../../bundles/createEditor"

    //import { h } from 'vue';

    @Component
    export default class Home extends Vue {
        @Prop() private msg!: string;
        mounted(){
          let filePath=this.$route.query.filePath;
          //alert(filePath)
          filePath=(typeof(filePath)==='string'?filePath:"public/json/article.json") ;
          console.log('createEditor',filePath)
          const form = new FormData();
          form.append('filePath',filePath)
          api.r.json(form).then(response=>{
              let content=response.data.data;
              content='<p><div>123</div></p>'
              const editor = createEditor(document.getElementById('editor')!,content)

              editor.onChange.subscribe(() => {
                //console.log(editor.getContents())
              })
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
