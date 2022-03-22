import {blockquoteToolConfigFactory, ButtonTool,ButtonToolConfig} from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import {detailComponent, detailState} from './detail.component'

export function detailToolConfigFactory(injector):ButtonToolConfig {
  const commander = injector.get(Commander)
  const detailion = injector.get(Selection)
  return {
    label: '商品详情',
    tooltip:'商品详情',
    onClick() {

      const detailData={
        slots: [new Slot([ContentType.Text]),new Slot([ContentType.Text]),new Slot([ContentType.Text]),new Slot([ContentType.Text])],

      }
      const component = detailComponent.createInstance(injector, detailData)
      commander.insert(component)
    }
  }
}

export function detailTool(){
  return new ButtonTool(detailToolConfigFactory);
}
