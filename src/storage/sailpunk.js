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
    isShowWandererPanel: false,
    isShowPartnersPanel: false,
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
    CHARACTER_BY_NAME: (state) => (id) => {
      if (state.characters == null) return null;

      const result = state.characters.find(
        (character) => character["_id"] === id
      );
      return result;
    },
    CHARACTERS_WANDERER(state) {
      if (state.characters == null) return [];

      const result = state.characters.filter(
        (character) => character["isWanderer"] === true
      );
      return result;
    },
    CHARACTERS_PARTNERS(state) {
      if (state.characters == null) return [];

      const result = state.characters.filter(
        (character) => character["isPartners"] === true
      );
      return result;
    },
    IS_SHOW_WANDERER_PANEL(state) {
      return state.isShowWandererPanel;
    },
    IS_SHOW_PARTNERS_PANEL(state) {
      return state.isShowPartnersPanel;
    },
  },
  mutations: {
    MAP_OBJECTS(state, value) {
      state.mapObject = value;
    },
    CHARACTERS(state, value) {
      state.characters = value;
    },
    IS_SHOW_WANDERER_PANEL(state, value) {
      state.isShowWandererPanel = value;
    },
    IS_SHOW_PARTNERS_PANEL(state, value) {
      state.isShowPartnersPanel = value;
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
