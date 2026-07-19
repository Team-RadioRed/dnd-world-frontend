import { requestAxios } from "@/assets/scripts/api";

const worldsData = {
  state: () => ({
    character: {},
    mapObject: {}
  }),
  getters: {
    MAP_OBJECT: (state) => (project) => {
      if (state.mapObject[project] == null) return {};
      return state.mapObject[project];
    },
    MAP_OBJECT_BY_TYPE: (state) => (project, type) => {

    },
    MAP_OBJECT_BY_NAME: (state) => (project, id) => {
      return state.mapObject[project][id];
    },
    CHARACTER: (state) => (project) => {
      if (state.character[project] == null) return {};
      return  state.character[project];
    },
    CHARACTER_BY_TAG: (state) => (project, section) => {
      
    },
    CHARACTER_BY_NAME: (state) => (project, id) => {
      return state.character[project][id];
    }
  },
  mutations: {
    MAP_OBJECT(state, { project, value }) {
      state.mapObject[project] = value;
    },
    CHARACTER(state, { project, value }) {
      state.character[project] = value;
    }
  },
  actions: {
    async LOAD_MAP_OBJECT(context, project) {
      const mapObject = context.getters.MAP_OBJECT(project);
      if (Object.keys(mapObject).length !== 0) return;

      const newMapObject = await requestAxios("/api/mapObject", {
        project: project,
      });
      const mapObjectDictionary = convertToDictionary(newMapObject);
      context.commit("MAP_OBJECT", {
        project: project,
        value: mapObjectDictionary,
      });
    },
    async LOAD_CHARACTER(context, project) {
      const characters = context.getters.CHARACTER(project);
      if (Object.keys(characters).length !== 0) return;

      const newCharacters = await requestAxios("/api/character", {
        project: project,
      });
      const characterDictionary = convertToDictionary(newCharacters);
      context.commit("CHARACTER", {
        project: project,
        value: characterDictionary,
      });
    }
  },
};

export default worldsData;

function convertToDictionary(data) {
  const dictionary = {};
  data.forEach((object) => {
    const id = object["_id"];
    delete object["_id"];
    dictionary[id] = object;
  });
  return dictionary;
}