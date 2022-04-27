0.73.1 2022/4/27
改变项目结构
src-测试代码
textbus-ts源码，textbus的组件、插件、工具，ts格式
compile-ts编译为js
bundles-打包为可标签引用的js、css，js模块名为textbusLib，使用见test.html

0.55.1 2022/4/07
新增插件——字数统计


0.51.1 2022/3/22
  对应 "@textbus/editor": "^2.0.0-alpha.51"
  补充说明文档,把组件控制放在右键菜单中
# 本项目基于textbus 2.0，包含以下内容
1、从 textbus 1 迁移过来的组件和插件

2、自定义的组件

3、对文件上传和保存进行了一些封装

## 安装

Github

npm安装
> npm install @huangzc/textbus --save

## 使用方法

### 只引入组件，示例如下,详见bundles/defaultOptions.ts或textbus 2项目，自行配置
> import {alertComponentLoader,alertTool} from '@huangzc/textbus'

### vue中，作为tetxbus入口

```
</template>
  <div id="editor"></div>
</template>
```

```
import {Vue } from 'vue-property-decorator';
import {TextbusApp, TextbusConfig} from '@huangzc/textbus'

export default class Home extends Vue {
  textbus!: TextbusApp;
  config:TextbusConfig={
    outputSetting:{
          cbSaveHTML:this.cbSaveHTML,//
          saveInterval:10000,
          bConcatHtml:true,
          styleLink:"http://loaclhost:8002/upload/textbus.component.style.css"
      },
      uploadFilePromise:api.upload.image,
  }

  mounted(){
    this.textbus=new TextbusApp(document.getElementById('editor'),this.config)
  }
  cbSaveHTML(content){          
    const form = new FormData();
    form.append('filePath',this.filePath)
    form.append('content',content)
    api.u.note(form).then(response=>{//自行配置axios
        let result=response.data;
        console.log('保存HTML',result);
    })
  }
  newContent(data){
    typeof(data)==='string'?
      this.filePath=data:this.filePath="upload/note/article.json"//自行配置axios访问参数       
    const form = new FormData();
    form.append('filePath',this.filePath)
    api.r.note(form).then(response=>{//自行配置axios
        let result=response.data;
        if(result.code==0){
            this.textbus.replaceContent(result.content);//重置内容
        }else{
            console.log(result.message)
        }
    })
  }
}
```

## OutputSetting和TextbusConfig结构如下
```
export interface OutputSetting{
    cbSaveJSON?: Function;//保存JSON格式的回调
    cbSaveHTML?: Function;//保存HTML格式的回调
    saveInterval?:number;//保存间隔，默认为0，有更改则保存
    bConcatHtml?: Boolean;//保存HTML时会把getContents的数据拼接为完整HTML
    styleLink?:string;//保存HTML时会把组件样式替换为一个link，应该先导出组件样式
}

export interface TextbusConfig{
    uploadFilePromise?: Function;
    componentLoaders?: [];
    formatLoaders?: [];
    toolFactories?: [];
    host?: string | HTMLElement;
    outputSetting:OutputSetting
}
```
导出组件样式
 > console.log("printstyle",concatStyle(this.textbus.editor.getContents())) 输出到控制台
# 组件库完善状态
组件（1.0迁移，放在toolbar里）src/textbus/component/

  已完成：

    alert:警告框
    imageCard：卡片
    todoList:待办事项
    wordExplain:名词解释
    katex:数学公式
    timeline:时间轴
    step:步骤条
    progress:进度条
    
    jumbotron:巨幕
    map:地图
  
  未完成：
    
  
组件（新）

已完成：
    images：多图上传
  
  
插件（1.0迁移）src/textbus/plugin/

  已完成：
    outline：概览、大纲
  
插件（新）

  已完成：
    layout.plugin 对布局做了些更改，插入左边栏放置outline概览
