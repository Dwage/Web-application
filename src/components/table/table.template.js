import {toInlineStyles} from '@core/utils'; import {defaultStyles} from '@core/uconstants'; import {parse} from '@core/uparse'                       

const CODES = {
  A: 65,
  Z: 90,
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function toCell(state, row) {
  return function (_, col) {
    const id = `${row}:${col}`;
    
    const width = getWidth(state.colState, col);
    const data = state.dataState[id];
    
    const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]})
    return `<div class="cell" style="${styles}; width: ${width}" data-type="cell"
    contenteditable data-col="${col}"
    data-id="${id}" data-value="${data || ''}">${parse(data) || ""}</div>`;
  };
}
function toCol({ col, index, width }) {
  return `<div class="column" style="width:${width}" data-type="resizeable" data-col="${index}">
  ${col}<div class="col-resize" data-resize = "col"></div></div>`;
}
function createRow(index, content, state) {
  const resize = index
    ? `<div class="row-resize" data-resize = "row" id="${index}"></div>`
    : "";
  const height = getHeight(state, index);
  return `<div class="row" data-type="resizeable" data-row="${index}" style="height:${height}"><div class="row-info">${
    index ? index : ""
  }${resize}</div><div class="row-data">${content}</div></div>`;
}
function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + "px";
}
function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + "px";
}
function withWidthFrom(state) {
  return function (col, index) {
    return { col, index, width: getWidth(state.colState, index) };
  };
}

export function createTable(rowsCount = 20, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill("")
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toCol)
    .join("");

  rows.push(createRow(null, cols, {}));

  for (let row = 0; row <= rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill("")

      .map(toCell(state, row))
      .join("");
    rows.push(createRow(row + 1, cells, state.rowState));
  }
  return rows.join("");
}
