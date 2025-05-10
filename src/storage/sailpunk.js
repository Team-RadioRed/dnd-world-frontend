import { requestAxios } from "@/assets/scripts/api";

const sailpunk = {
  state: () => ({
    mapObjects: null,
    subPage: null,

    characters: {},
    charactersDictionary: {},

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
    CHARACTERS: (state) => (section) => {
      return state.characters[section];
    },
    CHARACTERS_ALL(state) {
      return state.characters;
    },
    CHARACTER_BY_NAME: (state) => (id) => {
      return state.charactersDictionary[id];
    },
    SUB_PAGE(state) {
      return state.subPage;
    },
    SUB_PAGE_BY_NAME: (state) => (id) => {
      return state.subPage[id];
    },
  },
  mutations: {
    MAP_OBJECTS(state, value) {
      state.mapObject = value;
    },
    CHARACTERS(state, value) {
      state.characters = value;
    },
    CHARACTERS_STATE(state, { value, section }) {
      state.characters[section] = value;
    },
    CHARACTERS_DICTIONARY(state, value) {
      state.charactersDictionary = value;
    },
    SUB_PAGE(state, value) {
      state.subPage = value;
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
      const characters = context.getters.CHARACTERS_ALL;

      if (Object.keys(characters).length !== 0) return;

      const newCharacters = await requestAxios("/api/character");
      const charactersObject = {};
      const charactersDictionary = {};

      newCharacters.forEach((character) => {
        // Добавление персонажа в словарь
        charactersDictionary[character["_id"]] = character;

        // Добавление персонажа в группу
        if (character["group"] == null) return;

        if (charactersObject[character["group"]] == null)
          charactersObject[character["group"]] = [];
        charactersObject[character["group"]].push(character["_id"]);
      });

      context.commit("CHARACTERS", charactersObject);
      context.commit("CHARACTERS_DICTIONARY", charactersDictionary);
    },
    async LOAD_ADDITIONAL_PAGE(context) {
      const subPage = context.getters.SUB_PAGE;
      if (subPage != null) return;

      const newSubPage = await requestAxios("/api/subPage");
      const subPageObject = {};

      newSubPage.forEach((page) => {
        subPageObject[page["_id"]] = page;
      });

      context.commit("SUB_PAGE", subPageObject);
    },
  },
};

export default sailpunk;
