import {capitalize} from '@core/utils' 
export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {

      throw new Error('No $root privided for Domlistener!')
    }

    
    this.$root = $root 
    this.listeners = listeners
  }
  initDOMListeners() {
    this.listeners.forEach(listener => { //то же самое что и addeventlistener
    const capitalizes = getNameListener(listener); const name = this.name || ''
    if (!this[capitalizes]) {throw new Error(`Capitalize ${capitalizes} is not implemented in ${name} component`)}
    
    
    this[capitalizes] = this[capitalizes].bind(this)
    this.$root.on(listener, this[capitalizes])
    
  }
    
    )}
  removeDOMListeners() {
    this.listeners.forEach(listener => {
    const capitalizes = getNameListener(listener);
    this.$root.off(listener, this[capitalizes]);
    
    }  
    ); }
} //input => onInput

function getNameListener(eventName) {
  return 'on' + capitalize(eventName)

}



