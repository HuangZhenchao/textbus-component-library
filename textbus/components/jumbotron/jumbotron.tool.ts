import { ButtonTool,ButtonToolConfig, headingComponent} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import { jumbotronComponent, JumbotronSlot, jumbotronState } from './jumbotron.component'

export function jumbotronToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '巨幕',
        tooltip:'巨幕',
        onClick() {
            const state:jumbotronState={
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundImage: './',
                minHeight: '200px',
                
            }
            let slot=new JumbotronSlot()
            const headingSlot=new Slot([ContentType.Text,
                ContentType.InlineComponent]);
            headingSlot.write('hello world!');
            slot.write(headingComponent.createInstance(injector,{state:'h1',slots:[headingSlot]}))
            const component = jumbotronComponent.createInstance(injector, {slots:[slot],state:state})
            commander.insert(component)
            selection.setPosition(headingSlot, headingSlot.length)
        }
    }
}

export function jumbotronTool(){
    return new ButtonTool(jumbotronToolConfigFactory)
}
export const jumbotronExample=`<img src="data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg width="100" height="70" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#6ad1ec"/><stop offset="100%" stop-color="#fff"/></linearGradient></defs><g><rect fill="url(#bg)" height="100%" width="100%"/></g><path fill="#fff" opacity="0.3" d="M81.25 28.125c0 5.178-4.197 9.375-9.375 9.375s-9.375-4.197-9.375-9.375 4.197-9.375 9.375-9.375 9.375 4.197 9.375 9.375z"></path><path fill="#fff" opacity="0.3"  d="M87.5 81.25h-75v-12.5l21.875-37.5 25 31.25h6.25l21.875-18.75z"></path><text font-family="Helvetica, Arial, sans-serif" font-size="12" x="10" y="25" stroke-width="0.3" stroke="#000" fill="#000000">Hello, world!</text><text font-family="Helvetica, Arial, sans-serif" font-size="6" x="10" y="40" stroke-width="0" stroke="#000" fill="#000000">我是 TextBus 富文本编辑器。</text><text font-family="Helvetica, Arial, sans-serif" font-size="6" x="10" y="50" stroke-width="0" stroke="#000" fill="#000000">别来无恙？</text></svg>')}">`;