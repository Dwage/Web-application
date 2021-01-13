import {ExcelComponent} from '@core/ExcelComponent'; import {$} from '@core/dom'; import {changeTitle} from '@/redux/action'; import {defaultTitle} from '@core/uconstants'; import {debounceBD} from '@core/utils'; import {ActiveRoute} from '@core/routes/ActiveRoute'                                     
export class Header extends ExcelComponent {
  static className = 'excel__header'
  
  constructor($root, options) {
    super($root, {
    
      listeners: ["input", "click"],
      name: 'Header',  
      ...options })
  }
  prepare() {this.onInput = debounceBD(this.onInput, 300)}
  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `<input type="text" class="input" value="${title}" />

    <div>

      <div class="button" data-button="remove">
        <i class="material-icons" data-button="remove">delete</i>
      </div>

      <div class="button" data-button="exit">
        <i class="material-icons" data-button="exit">exit_to_app</i>
      </div>

    </div>`
    
  }
  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')
    if (decision) {
      localStorage.removeItem('excel:' + ActiveRoute.param)
      ActiveRoute.navigate('')
    }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')

    }
  }
  onInput(event) { 
    const $target = $(event.target); this.$dispatch(changeTitle($target.text()))
  }
}