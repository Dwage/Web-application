import { storage } from "@core/utils";
import { defaultStyles, defaultTitle } from "@core/uconstants";
const defaultState = {
  rowState: {},
  colState: {},
  stylesState: {},
  dataState: {},
  currentText: "",

  currentStyles: defaultStyles,
  title: defaultTitle,
};
const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: "",
});
export const stateInit = storage("excel-state")
  ? normalize(storage("excel-state"))
  : defaultState;
