import { ExcelComponent } from "@core/ExcelComponent";

import { $ } from "@core/dom";

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      subscribe: ["currentText"],
      name: "Formula",
      listeners: ["input", "keydown"],
      ...options,
    });
  }

  toHTML() {
    return `<div class="info">fx</div>
    <div id="formula" class="input" contenteditable spellcheck="false"></div>`;
  }
  init() {
    super.init();
    this.$input = this.$root.findOneEl("#formula");
    this.$on("table:select", ($cell) => {
      this.$input.text($cell.data.value);
    });

    //this.$subscribe(state => {this.$input.text(state.currentText)})
  }
  storeChanged(changes) {
    console.log("changes", changes);
  }

  onInput(event) {
    const value = $(event.target).text();
    this.emitter.emit("formula:input", value);
  }

  onKeydown(event) {
    const keys = ["Enter", "Tab"];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit("formula:done");
    }
  }
}
