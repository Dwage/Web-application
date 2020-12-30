import {ExcelComponent} from '@core/ExcelComponent'; import {$} from '@core/dom'; import {changeTitle} from '@/redux/action'; import {defaultTitle} from '@core/uconstants'; import {debounceBD} from '@core/utils'                                     
export class Header extends ExcelComponent {
  static className = 'excel__header'
  
  constructor($root, options) {
    super($root, {
    
      listeners: ["input"],
      name: 'Header',  
      ...options })
  }
  prepare() {this.onInput = debounceBD(this.onInput, 300)}
  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `<input type="text" class="input" value="${title}" />

    <div>

      <div class="button">
        <i class="material-icons">delete</i>
      </div>

      <div class="button">
        <i class="material-icons">exit_to_app</i>
      </div>

    </div>`
    
  }
  onInput(event) { 
    const $target = $(event.target); this.$dispatch(changeTitle($target.text()))
  }
}