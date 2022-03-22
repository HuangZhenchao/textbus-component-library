import {createElement} from "@textbus/browser";

function cssMin(str) {
    return str
        .replace(/\s*(?=[>{}:;,[])/g, '')
        .replace(/([>{}:;,])\s*/g, '$1')
        .replace(/;}/g, '}').replace(/\s+/, ' ').trim();
}
export const concatHTML=(contents,styleLink) => {
    const html=createElement('html',{})
    const head=createElement('head',{})
    const body=createElement('body',{})
    body.innerHTML=contents.content;
    html.append(head);html.append(body);
    
    //console.log(doc.documentElement.outerHTML);
    //创建一个输出doc，
    const links:any = [];
    const scripts:any=[];
    const componentStyles = contents.resourcesList.map(i => i.resources).map(metadata => {
        var _a, _b;
        if (Array.isArray(metadata.links)) {
            links.push(...metadata.links);
            
        }
        if (Array.isArray(metadata.scripts)) {            
            scripts.push(...metadata.scripts)
        }
        return [((_a = metadata.styles) === null || _a === void 0 ? void 0 : _a.join('')) || '', ((_b = metadata.editModeStyles) === null || _b === void 0 ? void 0 : _b.join('')) || ''].join('');
    }).join('');
    links.forEach(link => {
        const linkEle = createElement('link');
        Object.assign(linkEle, link);
        head.appendChild(linkEle);
    });
    scripts.forEach(scriptSrc=>{
        const scriptEle = createElement('script') as HTMLScriptElement;
        scriptEle.src=scriptSrc;
        head.appendChild(scriptEle);
    })
    if(styleLink){
        const link={
            rel: 'stylesheet',        
            href: styleLink,    
        }
        const linkEle = createElement('link');
        Object.assign(linkEle, link);
        head.appendChild(linkEle);
    }else{
        const docStyles = cssMin([componentStyles, ...(contents.styleSheets || [])].join(''));
        const style = createElement('style');
        style.innerHTML=docStyles
        head.appendChild(style);
    }
    
    return html.outerHTML
}
export function concatStyle(contents){
    const componentStyles = contents.resourcesList.map(i => i.resources).map(metadata => {
        var _a, _b;
        return [((_a = metadata.styles) === null || _a === void 0 ? void 0 : _a.join('')) || '', ((_b = metadata.editModeStyles) === null || _b === void 0 ? void 0 : _b.join('')) || ''].join('');
    }).join('');
    const docStyles = cssMin([componentStyles, ...(contents.styleSheets || [])].join(''));
    return docStyles
    //return styleLink
}