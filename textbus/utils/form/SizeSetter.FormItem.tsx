import { createElement, createTextNode } from "@textbus/browser";

export class SizeSetter {
    elementRef: HTMLElement;
    inputs: HTMLInputElement[];
    name: any;
    constructor(name, i18n) {
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: name
      });
      Object.defineProperty(this, "i18n", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: i18n
      });
      Object.defineProperty(this, "elementRef", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "inputs", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: []
      });
      this.elementRef = createElement('div', {
        classes: ['textbus-form-group'],
        children: [
          createElement('label', {
            classes: ['textbus-control-label'],
            children: [
              createTextNode(i18n.get('label'))
            ]
          }),
          createElement('div', {
            classes: ['textbus-control-value'],
            children: [
              createElement('div', {
                classes: ['textbus-toolbar-image-size-setter'],
                children: [
                  createElement('input', {
                    attrs: { type: 'text', placeholder: i18n.get('widthPlaceholder') },
                    classes: ['textbus-form-control']
                  }),
                  createTextNode(' * '),
                  createElement('input', {
                    attrs: { type: 'text', placeholder: i18n.get('heightPlaceholder') },
                    classes: ['textbus-form-control']
                  })
                ]
              })
            ]
          })
        ]
      });
      this.inputs = Array.from(this.elementRef.querySelectorAll('input'));
    }
    reset() {
      this.inputs.forEach(input => input.value = '');
    }
    update(value) {
      this.inputs[0].value = (value === null || value === void 0 ? void 0 : value.width) || '';
      this.inputs[1].value = (value === null || value === void 0 ? void 0 : value.height) || '';
    }
    getAttr() {
      return {
        name: this.name,
        value: {
          width: this.inputs[0].value,
          height: this.inputs[1].value
        }
      };
    }
    validate() {
      return true;
    }
  }