import { ExcelComponent } from "@core/ExcelComponent";

import { createTable} from "@/components/table/table.template";

import { resizeHandler } from "./table.resize"; 
import { TableSelection } from '@/components/table/TableSelection'; 
import {$} from '@core/dom'

import {matrix} from '@/components/table/table.functions'
export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root, options) {
    super($root, { name: 'Table',
      listeners: ["mousedown", "keydown", "input"],
    ...options
    });
  }
  toHTML() {
    return createTable();
  }

  prepare(){}

  init() { 
    super.init(); 
    this.selection = new TableSelection(); 
    
    this.selectCell(this.$root.findOneEl('[data-id="0:0"]')) 
     
    this.$on('formula:input', text => {
      this.selection.current.txtget(text)}) 
  
  
  
    this.$on('formula:done', () => {
      this.selection.current.focus()
    }
    )}
    selectCell($cell) {
      this.selection.select($cell)
      this.$emit('table:select', $cell)
    }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizeHandler(this.$root, event);
    }if (event.target.dataset.type === 'cell'){
      const $target = $(event.target)
      if (event.shiftKey) { console.log('a')
      
        const $cells = matrix($target, this.selection.current)

        .map(id => this.$root.findOneEl(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target) }
    
  }
}




onKeydown(event) {
  const keys = [
    'Enter', 
    'Tab', 
    'ArrowLeft', 
    'ArrowRight', 
    'ArrowDown', 
    'ArrowUp'
  ]
  const {key} = event
  if (keys.includes(key) && !event.shiftKey) {
    event.preventDefault()
    const id = this.selection.current.id(true)
    const $next = this.$root.findOneEl(nextSelector(key, id))
    this.selectCell($next)
  }}

onInput(event) {
  this.$emit('table:input', $(event.target))
}}
  function nextSelector(key, {col, row}) { const MIN_VALUE = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1 
      break

      

  }
      return `[data-id="${row}:${col}"]`
}
  

  