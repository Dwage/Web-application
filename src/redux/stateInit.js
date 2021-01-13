import { defaultStyles, defaultTitle } from "@core/uconstants"; import {clone} from '@core/utils'             

const defaultState = {
  rowState: {},
  colState: {},
  stylesState: {},
  dataState: {},
  currentText: "",

  currentStyles: defaultStyles,
  title: defaultTitle,
  openedDate: new Date().toJSON()
};
const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: "",
});


export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}
