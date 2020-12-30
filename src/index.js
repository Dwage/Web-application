import { Formula } from "@/components/formula/Formula";
import { Table } from "@/components/table/Table";
import { Toolbar } from "@/components/toolbar/Toolbar";

import { Header } from "@/components/header/Header";
import { Excel } from "@/components/excel/Excel";
import "./scss/index.scss";

import { createStore } from "@core/createStore";
import { rootReducer } from "@/redux/rootReducer";
import { storage, debounceBD } from "@core/utils";
import { stateInit } from "@/redux/stateInit";

const store = createStore(rootReducer, stateInit);

const stateListener = debounceBD((state) => {
  console.log("state", state), storage("excel-state", state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel("#app", {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
