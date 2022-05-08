import { fromEvent,sampleTime } from '@tanbo/stream';
import {Editor, Layout} from '@textbus/editor'
import {createElement, createTextNode, DOC_CONTAINER, EDITABLE_DOCUMENT, Plugin} from "@textbus/browser";
import {Commander, Injector, Renderer, RootComponentRef, Selection, VElement} from "@textbus/core";
import {pageConfigComponent} from "../../components/_config/config.component"
import { JsNewGuid } from '../../_public-api';
export class PageConfigPlugin implements Plugin{
    subs: any[];
    private renderer!: Renderer;
    doc!: HTMLElement;
    lastPageID:string="";
    rootComponentRef!: RootComponentRef;
    constructor(){
        this.subs=[]
        
    }
    setup(injector: Injector): void {
        //this.layout=injector.get(Layout);
        //this.layout.container.parentNode.prepend(this.leftContainer);
        this.doc=injector.get(DOC_CONTAINER);
        this.renderer=injector.get(Renderer);
        this.rootComponentRef = injector.get(RootComponentRef);
        let selection=injector.get(Selection);
        let commander=injector.get(Commander)
        let editor=injector.get(Editor)
        
        this.subs.push(
            this.renderer.onViewChecked.pipe(sampleTime(1000)).subscribe(()=>{
                let rootSlot=this.rootComponentRef.component.slots.get(0)!
                let node=this.doc.querySelector(".tb-page-config");
                
                if(node==null){
                    rootSlot.retain(0);
                    rootSlot.insert(pageConfigComponent.createInstance(injector,
                        {state:{pageID:JsNewGuid(),scrollTop:0}}));
                    //rootSlot.retain(0);
                    const location = selection.findLastPosition(rootSlot);
                    console.log(rootSlot,location.slot,location.offset)
                    selection.setPosition(location.slot, location.offset)
                    //selection.restore();
                    return;
                }
            })
        )
    }
    
}

