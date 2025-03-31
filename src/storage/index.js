import { createStore } from "vuex";
import sailpunk from "./sailpunk";
import dataInfo from "./dataInfo";

const store = createStore({
  modules: {
    sailpunk: sailpunk,
    dataInfo: dataInfo,
  },
});

export default store;
