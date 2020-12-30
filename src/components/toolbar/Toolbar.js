import { ExcelStateComponent } from "@core/ExcelStateComponent";
import { createToolbar } from "@/components/toolbar/toolbar.template.js";
import { $ } from "@core/dom";

import { a } from "@core/utils";
import { defaultStyles } from "@core/uconstants";
export class Toolbar extends ExcelStateComponent {
  static className = "excel__toolbar";

  constructor($root, options) {
    super($root, {
      name: "Toolbar",
      listeners: ["click"],
      subscribe: ["currentStyles"],
      ...options,
    });
  }
  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }
  toHTML() {
    return this.template;
  }
  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }
  onClick(event) {
    const $target = $(event.target);

    if ($target.data.type === "button") {
      const value = JSON.parse($target.data.value);

      this.$emit("toolbar:applyStyle", value);
    }
  }
}
