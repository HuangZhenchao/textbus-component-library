import { fromEvent,sampleTime } from '@tanbo/stream';
import {Editor, Layout} from '@textbus/editor'
import {createElement, createTextNode, DOC_CONTAINER, EDITABLE_DOCUMENT, Plugin, SelectionBridge} from "@textbus/browser";
import {Commander, Injector, Renderer, RootComponentRef, Selection, VElement} from "@textbus/core";
import {pageConfigComponent, PageConfigState} from "../../components/_config/config.component"
import { JsNewGuid } from '../../_public-api';
import { getComponentsByName } from '../../utils/component/getComponents';
export class PageConfigPlugin implements Plugin{
    subs: any[];
    private renderer!: Renderer;
    doc!: HTMLElement;
    lastState:PageConfigState;
    rootComponentRef!: RootComponentRef;
    layout!: Layout;
    scroller!: HTMLElement;
    constructor(){
        this.subs=[]
        this.lastState={
            pageID:"",
            scrollTop:0
        }
        
    }
    setup(injector: Injector): void {
        this.layout=injector.get(Layout);
        //this.layout.container.parentNode.prepend(this.leftContainer);
        this.scroller=this.layout.scroller
        this.doc=injector.get(DOC_CONTAINER);
        this.renderer=injector.get(Renderer);
        this.rootComponentRef = injector.get(RootComponentRef);
        let selection=injector.get(Selection);
        let selectionBridge=injector.get(SelectionBridge);
        let commander=injector.get(Commander)
        let editor=injector.get(Editor)
        
        //editor.onReady.subscribe(()=>{
        //    console.log(this.layout.sub)
        //    this.layout.sub.unsubscribe()
        //})
        
        
        this.subs.push(
            //selection.onChange.subscribe(()=>{
                //console.log("selection.onChange")
            //}),
            this.renderer.onViewChecked.subscribe(()=>{
                let rootSlot=this.rootComponentRef.component.slots.get(0)!
                let components=getComponentsByName(this.rootComponentRef.component,"pageConfigComponent");
                
                if(components.length==0){
                    rootSlot.retain(0);
                    rootSlot.insert(pageConfigComponent.createInstance(injector,
                        {state:{pageID:JsNewGuid(),scrollTop:0}}));
                    //rootSlot.retain(0);
                    //const location = selection.findLastPosition(rootSlot);
                    //console.log(rootSlot,location.slot,location.offset)
                    //selection.setPosition(location.slot, location.offset)
                    //selection.restore();
                    return;
                }else{
                    let component=components[0];
                    let state=component.toJSON().state as PageConfigState;
                    //pageID不同，是新页面，加载页面设置
                    //console.log(this.lastState.pageID)
                    if(state.pageID!=this.lastState.pageID){
                        console.log(state.scrollTop)
                        this.lastState=state;
                        let storageString=localStorage.getItem(state.pageID);
                        let storageJson=JSON.parse(storageString||"{}");
                        this.scroller.scrollTo({top:storageJson.scrollTop})
                    }
                }

            }),
            
            fromEvent(this.scroller,"scroll").pipe(sampleTime(1000)).subscribe((ev)=>{
                //console.log((ev.target as HTMLElement).scrollTop)
                localStorage.setItem(this.lastState.pageID,JSON.stringify({scrollTop:(ev.target as HTMLElement).scrollTop}));
                //let component=getComponentsByName(this.rootComponentRef.component,"pageConfigComponent")[0];
                //if(component){
                    //component.updateState(draft=>{
                    //    draft.scrollTop=(ev.target as HTMLElement).scrollTop;
                    //})
                //}
            })
        )

    }
    
}

