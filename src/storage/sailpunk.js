import { requestAxios } from "@/assets/scripts/api";

const sailpunk = {
  state: () => ({
    mapObjects: null,
    characters: null,
    charactersWanderer: [],
    charactersPartners: [],
    charactersGods: [],

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
    CHARACTERS_WANDERER(state) {
      return state.charactersWanderer;
    },
    CHARACTERS_PARTNERS(state) {
      return state.charactersPartners;
    },
    CHARACTERS_GODS(state) {
      return state.charactersGods;
    },
    CHARACTER_BY_NAME: (state) => (id) => {
      if (state.characters == null) return null;

      const result = state.characters.find(
        (character) => character["_id"] === id
      );
      return result;
    },
  },
  mutations: {
    MAP_OBJECTS(state, value) {
      state.mapObject = value;
    },
    CHARACTERS(state, value) {
      state.characters = value;
    },
    CHARACTERS_WANDERER(state, value) {
      state.charactersWanderer = value;
    },
    CHARACTERS_PARTNERS(state, value) {
      state.charactersPartners = value;
    },
    CHARACTERS_GODS(state, value) {
      state.charactersGods = value;
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

      const characterWanderer = newCharacters
        .filter((character) => character.group === "wanderer")
        .map((character) => character["_id"]);
      const characterPartners = newCharacters
        .filter((character) => character.group === "partners")
        .map((character) => character["_id"]);
      const characterGods = newCharacters
        .filter((character) => character.group === "gods")
        .map((character) => character["_id"]);

      context.commit("CHARACTERS_WANDERER", characterWanderer);
      context.commit("CHARACTERS_PARTNERS", characterPartners);
      context.commit("CHARACTERS_GODS", characterGods);
    },
  },
};

export default sailpunk;
