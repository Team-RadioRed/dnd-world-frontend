import { requestAxios } from "@/assets/scripts/api";
import { toRaw } from "vue";

const worldsCollection = {
  state: () => ({
    world: {},
    currentWorlData: {},
  }),
  getters: {
    WORLD(state) {
      const data = state.world;

      if (data == null) return {};
      return data;
    },
    WORLD_BY_PROJECT: state => (project) => {
      const dataProject = state.world[project]

      if (dataProject == null) return {};

      return dataProject;
    },
    WORLD_BY_NAME: (state) => (project, name) => {
      const dataProject = state.world[project]

      if (dataProject == null) return {};

      const data = dataProject[name];

      if (data == null) return {};
      return data;
    },
    WORLD_CONFIG(state) {
      return state.currentWorlData;
    }
  },
  mutations: {
    WORLD(state, { project, name, value }) {
      if (state.world[project] == null) state.world[project] = {};
      state.world[project][name] = value;
    },
    WORLD_CONFIG(state, data) {
      state.currentWorlData = data;
    },
    WORLD_CONFIG_STATE(state, {key, name, value}) {
      if (state.currentWorlData[key] == null) return;

      const property = name == null ? 
        state.currentWorlData[key] : 
        state.currentWorlData[key][name];
      if (property == null) return;
      if (property.state == null) return;

      property.state = value;
    }
  },
  actions: {
    async LOAD_WORLD(context) {
      // Проверка есть ли данные в хранилище
      const world = context.getters.WORLD;
      if (Object.keys(world).length !== 0) return;

      // Запрос данных
      const newWorld = await requestAxios("/api/worlds");

      Object.entries(newWorld).forEach(([projectName, projectValue]) => {
        Object.entries(projectValue).forEach(([worldName, worldValue]) => {
          // Удаление лишних полей
          delete worldValue.name;
          delete worldValue["_id"];

          // Сохранение данных о мире
          const worldData = {
            project: projectName,
            name: worldName,
            value: worldValue,
          }
          context.commit("WORLD", worldData);
        });
      });
    },
    async LOAD_WORLD_DATA(context, { project, name }) {
      const worldData = context.getters.WORLD_BY_NAME(project, name);

      const worldConfig = {};

      // Filter
      worldConfig.filter = {};
      worldData.filters.forEach((data) => {
        const rawFilter = toRaw(data);
        const filterData = structuredClone(rawFilter);

        filterData.state = filterData.defaulState ?? false;
        delete filterData.name;
        delete filterData.defaulState;

        worldConfig.filter[data.name] = filterData;
      });

      // Group
      worldConfig.group = {};
      worldData.bottomPanel.forEach((data) => {
        const rawPanel = toRaw(data);
        const panelData = structuredClone(rawPanel);

        delete panelData.name;

        worldConfig.group[data.name] = panelData;
      });
      
      // Layer
      worldConfig.layer = {};
      worldData.layers.forEach((data) => {
        const rawLayer = toRaw(data);
        const layerData = structuredClone(rawLayer);

        layerData.state = layerData.defaulState ?? false;
        delete layerData.name;
        delete layerData.defaulState;

        worldConfig.layer[data.name] = layerData;
      });

      // Params
      const rawParams = toRaw(worldData.params);
      const paramsData = structuredClone(rawParams);
      worldConfig.params = paramsData;

      // World
      const otherWorlds = context.getters.WORLD_BY_PROJECT(project);
      worldConfig.world = {}
      Object.entries(otherWorlds).forEach(([worldName, data]) => {
        if (worldName === name) return;

        worldConfig.world[worldName] = {
          displayName: data.title
        };
      });

      console.log("worldConfig", worldConfig);
      context.commit("WORLD_CONFIG", worldConfig);
    }
  }
};

export default worldsCollection;
