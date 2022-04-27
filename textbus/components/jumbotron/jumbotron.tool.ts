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