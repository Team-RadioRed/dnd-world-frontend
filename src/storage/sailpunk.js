import { requestAxios } from "@/assets/scripts/api";

const sailpunk = {
  state: () => ({
    mapObjects: null,

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
        // Добавление персонажа в группу
        const groupName =
          character["group"] != null ? character["group"] : "common";

        if (charactersObject[groupName] == null)
          charactersObject[groupName] = [];
        charactersObject[groupName].push(character);

        // Добавление персонажа в словарь
        charactersDictionary[character["_id"]] = character;
      });

      context.commit("CHARACTERS", charactersObject);
      context.commit("CHARACTERS_DICTIONARY", charactersDictionary);
    },
  },
};

export default sailpunk;
