import { DOMListener } from "@core/DOMListener";

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.unsubscribers = []
    this.name = options.name || "";
    this.prepare();
  
    this.emitter = options.emitter
  }
  prepare() {
    
  }
  toHTML() {
    return "";}
  
  
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  
  $on(event, fn) { // Subscribe on event

    const unsub = this.emitter.subscribe(event, fn); this.unsubscribers.push(unsub)
  }
  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub())
  }
}
