import {ExcelComponent} from '@core/ExcelComponent'

import {$} from '@core/dom'

export class Formula extends ExcelComponent {
 static className = 'excel__formula'

  constructor($root, options) {
    super($root, {


    name: 'Formula',
    listeners: ['input', 'keydown'],
    ...options
    })


  }
  toHTML() {
    return `<div class="info">fx</div>
    <div id="formula" class="input" contenteditable spellcheck="false"></div>`
  }
  init() {
    super.init()
    this.$input = this.$root.findOneEl('#formula')
    this.$on('table:select', $cell => {this.$input.txtget($cell.txtget())})


    this.$on('table:input', $cell => {this.$input.txtget($cell.txtget())})
  }
  
  
  
  
  
  onInput(event) {
    const text = $(event.target).txtget()
    this.emitter.emit('formula:input', text)
  }
 
  onKeydown(event) { const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}