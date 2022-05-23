import { ComponentInstance } from "@textbus/core";

export function getComponentsByName(startComponent,name):ComponentInstance[] {
    const components = [];
    function fn(component, result) {
        //console.log(component);
        //console.log(component.tagName);
        //if (/h[1-6]/.test(component.tagName)) {
        if (component.name==name) {
            result.push(component);
        }
        component.slots.toArray().forEach(slot => {
            slot.content.data.forEach(childComponent=>{
                if (typeof childComponent === 'string') {
                    return;
                }
                fn(childComponent, result);
            });
            /*
            if (typeof i === 'string') {
                return;
            }
            fn(i, result);*/
        });
    }
    fn(startComponent, components);
    //console.log(components);
    return components;
}