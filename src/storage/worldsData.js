import { requestAxios } from "@/assets/scripts/api";

const worldsData = {
  state: () => ({
    // Данные миров, разделены по блокам
    characters: {},
    mapObject: {},
    charactersDictionary: {},
    subPage: {},

    // Отображаемые параметры мира
    isShowProvince: true,
    isShowCapital: true,
    isShowTown: true,
  }),
  getters: {
    // Геттеры на данные
    MAP_OBJECTS: (state) => (project) => {
      return state.mapObject[project];
    },
    CHARACTERS_ALL: (state) => (project) => {
      return state.characters[project];
    },
    CHARACTERS: (state) => (project, section) => {
      return state.characters[project][section];
    },
    CHARACTER_BY_NAME: (state) => (project, id) => {
      return state.charactersDictionary[project][id];
    },
    SUB_PAGE: (state) => (project) => {
      return state.subPage[project];
    },
    SUB_PAGE_BY_NAME: (state) => (project, id) => {
      return state.subPage[project][id];
    },
    // Геттеры на видимость
    SHOW_PROVINCE(state) {
      return state.isShowProvince;
    },
    SHOW_CAPITAL(state) {
      return state.isShowCapital;
    },
    SHOW_TOWN(state) {
      return state.isShowTown;
    },
  },
  mutations: {
    // Сеттеры на данные
    MAP_OBJECTS(state, { project, value }) {
      state.mapObject[project] = value;
    },
    CHARACTERS(state, { project, value }) {
      console.log(project, value);
      state.characters[project] = value;
    },
    CHARACTERS_STATE(state, { project, section, value }) {
      state.characters[project][section] = value;
    },
    CHARACTERS_DICTIONARY(state, { project, value }) {
      state.charactersDictionary[project] = value;
    },
    SUB_PAGE(state, { project, value }) {
      state.subPage[project] = value;
    },
    // Сеттеры на видимость
    SHOW_PROVINCE(state, value) {
      state.isShowProvince = value;
    },
    SHOW_CAPITAL(state, value) {
      state.isShowCapital = value;
    },
    SHOW_TOWN(state, value) {
      state.isShowTown = value;
    },
  },
  actions: {
    async LOAD_MAP_OBJECTS(context, project) {
      const mapObject = context.getters.MAP_OBJECTS(project);
      if (mapObject) return;

      const newMapObject = await requestAxios("/api/mapObject", {
        project: project,
      });
      const mapObjectCollection = {};
      newMapObject.forEach((object, index) => {
        if (mapObjectCollection[object["type"]] == null) {
          mapObjectCollection[object["type"]] = [];
        }
        mapObjectCollection[object["type"]].push(object);
      });

      context.commit("MAP_OBJECTS", {
        project: project,
        value: mapObjectCollection,
      });
    },
    async LOAD_CHARACTERS(context, project) {
      const characters = context.getters.CHARACTERS_ALL(project);
      if (characters) return;

      const newCharacters = await requestAxios("/api/character", {
        project: project,
      });
      const charactersObject = {};
      const charactersDictionary = {};
      console.log(newCharacters);

      newCharacters.forEach((character) => {
        // Добавление персонажа в словарь
        charactersDictionary[character["_id"]] = character;

        // Добавление персонажа в группу
        if (character["group"] == null) return;

        if (charactersObject[character["group"]] == null)
          charactersObject[character["group"]] = [];
        charactersObject[character["group"]].push(character["_id"]);
      });

      context.commit("CHARACTERS", {
        project: project,
        value: charactersObject,
      });
      context.commit("CHARACTERS_DICTIONARY", {
        project: project,
        value: charactersDictionary,
      });
    },
    async LOAD_ADDITIONAL_PAGE(context, project) {
      const subPage = context.getters.SUB_PAGE(project);
      if (subPage) return;

      const newSubPage = await requestAxios("/api/subPage", {
        project: project,
      });
      const subPageObject = {};

      newSubPage.forEach((page) => {
        subPageObject[page["_id"]] = page;
      });

      context.commit("SUB_PAGE", {
        project: project,
        value: subPageObject,
      });
    },
  },
};

export default worldsData;
