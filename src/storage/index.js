import { createStore } from "vuex";
import sailpunk from "./sailpunk";
import dataInfo from "./dataInfo";
import worlds from "./worlds";

const store = createStore({
  modules: {
    worlds: worlds,
    sailpunk: sailpunk,
    dataInfo: dataInfo,
  },
});

export default store;
