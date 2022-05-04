import { fromEvent } from "@tanbo/stream";
import { createElement, createTextNode, Plugin } from "@textbus/browser";
import { Layout } from "@textbus/editor";
import { CardToolTab } from "./tool/toolTab/CardToolTab.plugin";
import {toolTabConfig } from "./tool/library.toolTab.config";



export class LibraryDrawerPlugin implements Plugin{
    switchElementRef:HTMLElement;
    switchBtn: HTMLButtonElement;
    subs: any[] = [];
    //libDrawer!: LibraryTab;
    toolTab!:CardToolTab;
    layout: any;
    positionFlag:boolean=true;//组件库面板位置标识，true为工作区，false为右侧容器
    private _expand: boolean = false;
    constructor(positionFlag?:boolean){
        this.positionFlag=positionFlag==undefined?true:positionFlag;
        console.log(positionFlag,this.positionFlag)
        this.switchBtn=createElement('button', {
            attrs: {
              type: 'button',
              title: "组件库",
            },
            classes: ['textbus-status-bar-btn'],
            children: [
              createElement('span', {
                classes: ['textbus-icon-components']
              }),
              createTextNode("组件库")
            ]
          }) as HTMLButtonElement;
        this.switchElementRef=createElement('div', {
            styles:{
                "margin-left": "auto"
            },
            classes: ['textbus-lib-switch'],
            children: [
              this.switchBtn
            ]
        });
        
        this.subs.push(
            fromEvent(this.switchElementRef, 'click').subscribe(() => {
              this.expand = !this.expand;
            })
          )
    }
    set expand(b: boolean) {
        this._expand = b;
        //this.callback(b);
        if (b) {
          this.switchElementRef.classList.add('textbus-status-bar-btn-active');
          if(this.positionFlag){
            (this.layout.workbench as HTMLElement).setAttribute("style","display:flex;");
            //(this.layout.workbench as HTMLElement).appendChild(this.libDrawer.elementRef);
            (this.layout.workbench as HTMLElement).appendChild(this.toolTab.elementRef);
          }else{
            //this.layout.container.parentNode.append(this.libDrawer.elementRef);
            this.layout.container.parentNode.append(this.toolTab.elementRef);
          }
          
        } else {
          this.switchElementRef.classList.remove('textbus-status-bar-btn-active');
          //this.libDrawer.elementRef.remove();
          this.toolTab.elementRef.remove();
        }
    }
    
    get expand() {
        return this._expand;
    }
    
    setup(injector){
        //this.libDrawer=new LibraryTab(injector);
        console.log("LibraryDrawerPlugin",toolTabConfig)
        this.toolTab=new CardToolTab(injector,toolTabConfig);
        //this.libDrawer.elementRef.setAttribute("style","height:100%;");
        this.toolTab.elementRef.setAttribute("style","height:100%;");
        this.layout=injector.get(Layout);
        //this.layout.container.parentNode.prepend(this.leftContainer);
        //this.leftContainer.appendChild(this.container);
        this.layout.bottom.appendChild(this.switchElementRef);
    }
}