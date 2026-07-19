import { requestAxios } from "@/assets/scripts/api";

const worldsData = {
  state: () => ({
    character: {},
    mapObject: {}
  }),
  getters: {
    MAP_OBJECT: (state) => (project) => {
      const data = state.mapObject[project];
      
      if (data == null) return {};
      return data;
    },
    MAP_OBJECT_BY_ID: (state) => (project, id) => {
      return state.mapObject[project][id];
    },
    CHARACTER: (state) => (project) => {
      const data = state.character[project];

      if (data == null) return {};
      return data;
    },
    CHARACTER_BY_TAG: (state) => (project, tag) => {
      const data = state.character[project];
      return Object.entries(data)
        .filter(([key, value]) => value.group === tag)
        .map(([key, value]) => key);
    },
    CHARACTER_BY_ID: (state) => (project, id) => {
      const data = state.character[project][id];

      if (data == null) return {};
      return data;
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