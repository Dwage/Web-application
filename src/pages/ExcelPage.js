import { Formula } from "@/components/formula/Formula";
import { Table } from "@/components/table/Table";
import { Toolbar } from "@/components/toolbar/Toolbar";

import { Header } from "@/components/header/Header";
import { Excel } from "@/components/excel/Excel";
import { createStore } from "@core/createStore";
import { normalizeInitialState } from "@/redux/stateInit";
import { rootReducer } from "@/redux/rootReducer";
import { storage, debounceBD } from "@core/utils";

import {Page} from '@core/Page'
function storageName(param) {return 'excel:' + param}


export class ExcelPage extends Page {
  getRoot() {
    
    const params = this.params ? this.params : Date.now().toString() 

    const state = storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitialState(state)); 
    const stateListener = debounceBD((state) => {
  console.log("state", state), storage(storageName(params), state);
    }, 300);

    store.subscribe(stateListener);

     this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });
  return this.excel.getRoot();
  
  }

  afterRender() {
    this.excel.init()
  }
  
  destroy() { 
    this.excel.destroy()}
}