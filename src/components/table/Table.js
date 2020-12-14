import { ExcelComponent } from "@core/ExcelComponent";

import { createTable} from "@/components/table/table.template";

import { resizeHandler } from "./table.resize";
export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      listeners: ["mousedown", "mouseup", "mousemove"],
    });
  }
  toHTML() {
    return createTable();
  }

  onMouseup() {
    console.log("mouseup");
  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizeHandler(this.$root, event);
    }
  }
}
