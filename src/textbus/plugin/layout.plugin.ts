import {createElement} from "@textbus/browser";
import {Injectable} from "@tanbo/di";
import {Layout} from "@textbus/editor";

@Injectable()
export class LayoutPlugin{
    leftContainer: HTMLElement;
    rightContainer: HTMLElement;
    private layout: any;
    constructor() {

        this.leftContainer = createElement('div', {
            classes: ['textbus-ui-left']
        })
        this.rightContainer = createElement('div', {
            classes: ['textbus-ui-right']
        })
    }
    setup(injector){
        this.layout=injector.get(Layout);
        this.layout.container.parentNode.prepend(this.leftContainer);
        this.layout.container.parentNode.appendChild(this.rightContainer);
    }
    rightShow(elementRef){
        this.rightContainer.childNodes.forEach(child=>{
            this.rightContainer.removeChild(child);
        })
        this.rightContainer.appendChild(elementRef)
    }
    rightDisplay(elementRef){
        this.rightContainer.removeChild(elementRef);
    }

}