import { requestAxios } from "@/assets/scripts/api";

const worldsCollection = {
  state: () => ({
    // Общая информация по всем мирам
    worlds: [],
    // Фильтры мира по отображению
    filters: {},
  }),
  getters: {
    WORLDS(state) {
      return state.worlds;
    },
    WORLD: (state) => (name) => {
      return state.worlds.find((world) => world.name === name);
    },
    FILTER_VALUE: (state) => (project, name) => {
      return state.filters[project].find((filter) => filter.name === name);
    },
    FILTERS: (state) => (project) => {
      return state.filters[project] ? state.filters[project] : [];
    },
  },
  mutations: {
    WORLDS(state, value) {
      state.worlds = value;
    },
    FILTERS(state, { project, value }) {
      state.filters[project] = value;
    },
    FILTER_STATE(state, { project, name, value }) {
      state.filters[project].find((filter) => filter.name === name).state =
        value;
    },
  },
  actions: {
    async LOAD_WORLDS(context) {
      // Проверка есть ли данные в хранилище
      const worlds = context.getters.WORLDS;
      if (worlds.length !== 0) return;

      // Запрос данных
      const newData = await requestAxios("/api/worlds");
      // Сохранение фильтров
      newData.forEach((data) => {
        if (!data.filters) return;
        // Добавляем базовое значение
        data.filters.forEach((filter) => {
          filter.state = true;
        });
        // Сохранение
        context.commit("FILTERS", {
          project: data.name,
          value: data.filters,
        });
      });
      // Сохранение данных в хранилище
      context.commit("WORLDS", newData);
    },
  },
};

export default worldsCollection;
