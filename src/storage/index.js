import { createStore } from "vuex";
import dataInfo from "./dataInfo";
import worldsData from "./worldsData";
import worldsCollection from "./worldsCollection";

const store = createStore({
  modules: {
    worldsData: worldsData,
    worldsCollection: worldsCollection,
    dataInfo: dataInfo,
  },
});

export default store;
