<template>
    <div id="editor" style="width:1500px;height: 600px;"></div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import {createEditor} from "../textbus/createEditor"

    //import { h } from 'vue';

    @Component
    export default class Home extends Vue {
        @Prop() private msg!: string;
        mounted(){
          const editor = createEditor(document.getElementById('editor')!)

          editor.onChange.subscribe(() => {
            //console.log(editor.getContents())
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
