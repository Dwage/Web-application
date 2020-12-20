const CODES = {
  A: 65,
  Z: 90,
};
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}


function toCell(row) {



  return function(_, col) { 
    return `<div class="cell" data-type="cell"
    contenteditable data-col="${col}"
    data-id="${row}:${col}"></div>`;
}
}
function toCol(chars) {
  return `<div class="column" data-type="resizeable" data-col="${chars}">
  ${chars}<div class="col-resize" data-resize = "col"></div></div>`;
}

function createRow(index, conten) {
  const resize = index
    ? `<div class="row-resize" data-resize = "row" id=${index}></div>`
    : "";
  return `<div class="row" data-type="resizeable" ><div class="row-info">${
    index ? index : ""
  }${resize}</div><div class="row-data">${conten}</div></div>`;
}

function toCha2(_, index) {
  return String.fromCharCode(CODES.A + index);
}


export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill("")
    .map(toChar)
    .map(toCol)
    .join("");
  
  rows.push(createRow(null, cols));
  
  for (let row = 0; row <= rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill("")
      
      .map(toCell(row))
      .join("");
    rows.push(createRow(row + 1, cells));
  }
  return rows.join("");
}
