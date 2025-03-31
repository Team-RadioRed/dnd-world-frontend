import { requestAxios } from "@/assets/scripts/api";

const sailpunk = {
  state: () => ({
    mapObjects: null,
    characters: null,
    mapData: {
      tileSize: 256,
      minScale: 0.5,
      maxScale: 2,
      cols: 14,
      rows: 10,
    },
  }),
  getters: {
    MAP_OBJECTS(state) {
      return state.mapObject;
    },
    MAP_DATA(state) {
      return state.mapData;
    },
    CHARACTERS(state) {
      return state.characters;
    },
  },
  mutations: {
    MAP_OBJECTS(state, value) {
      state.mapObject = value;
    },
    CHARACTERS(state, value) {
      state.characters = value;
    },
  },
  actions: {
    async LOAD_MAP_OBJECTS(context) {
      const mapObject = context.getters.MAP_OBJECTS;

      if (mapObject != null) return;

      const newMapObject = await requestAxios("/api/mapObject");
      context.commit("MAP_OBJECTS", newMapObject);
    },
    async LOAD_CHARACTERS(context) {
      const characters = context.getters.CHARACTERS;

      if (characters != null) return;

      const newCharacters = await requestAxios("/api/character");
      context.commit("CHARACTERS", newCharacters);
    },
  },
};

export default sailpunk;
