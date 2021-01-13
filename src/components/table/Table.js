import { ExcelComponent } from "@core/ExcelComponent";

import { createTable } from "@/components/table/table.template";

import { resizeHandler } from "./table.resize";
import { TableSelection } from "@/components/table/TableSelection";
import { $ } from "@core/dom";

import { matrix } from "@/components/table/table.functions";

import { defaultStyles } from "@core/uconstants";
import * as action from "@/redux/action";
import { parse } from "@core/uparse";
export class Table extends ExcelComponent {
  static className = "excel__table";
  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    });
  }

  toHTML() {
    return createTable(20, this.store.getState());
  }

  prepare() {}

  init() {
    super.init();
    this.selection = new TableSelection();

    this.selectCell(this.$root.findOneEl('[data-id="0:0"]'));
    this.$on("formula:input", value => { 
      try{this.selection.current
        .attribute("data-value", value)
        .text(parse(value));} catch(e) {value = ""}
      this.updateTextInState(value);  
    });
    this.$on("formula:done", () => {
      this.selection.current.focus();
    });
    this.$on("toolbar:applyStyle", (value) => {
      this.selection.applyStyle(value);

      this.$dispatch(
        action.applyStyle({ value, ids: this.selection.selectedIds })
      );
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit("table:select", $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(action.changeStyles(styles));
    console.log("styles", styles);
  }
  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(action.createResize(data));
      console.log("f", data);
    } catch {}
  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      this.resizeTable(event);
    }
    if (event.target.dataset.type === "cell") {
      const $target = $(event.target);
      if (event.shiftKey) {
        

        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.findOneEl(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      "Enter",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "ArrowUp",
    ];
    const { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.findOneEl(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  updateTextInState(value) {
    this.$dispatch(
      action.changeText({ id: this.selection.current.id(), value })
    );
  }
  onInput(event) {
    this.$emit("table:input", $(event.target));
    this.updateTextInState($(event.target).text());
  }
}
function nextSelector(key, { col, row }) {
  const MIN_VALUE = 0;
  switch (key) {
    case "Enter":
    case "ArrowDown":
      row++;
      break;
    case "Tab":
    case "ArrowRight":
      col++;
      break;
    case "ArrowLeft":
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case "ArrowUp":
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
  }
  return `[data-id="${row}:${col}"]`;
}
