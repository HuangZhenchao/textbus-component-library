import { ButtonTool,ButtonToolConfig, headingComponent} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import { jumbotronComponent, JumbotronSlot, jumbotronState } from './jumbotron.component'

export function jumbotronToolConfigFactory(injector):ButtonToolConfig {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
        label: '插入 jumbotron 组件',
        tooltip:'插入 jumbotron 组件',
        onClick() {
            const state:jumbotronState={
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundImage: './',
                minHeight: '200px',
                slot:new JumbotronSlot()
            }
            const headingSlot=new Slot([ContentType.Text,
                ContentType.InlineComponent]);
            headingSlot.write('hello world!');
            state.slot.write(headingComponent.createInstance(injector,{type:'h1',slot:headingSlot}))
            const component = jumbotronComponent.createInstance(injector, state)
            commander.insert(component)
            selection.setLocation(headingSlot, headingSlot.length)
        }
    }
}

export function jumbotronTool(){
    return new ButtonTool(jumbotronToolConfigFactory)
}