import { requestAxios } from "@/assets/scripts/api";

const worldsCollection = {
  state: () => ({
    // Общая информация по всем мирам
    worlds: {},
    // Фильтры мира по отображению
    filters: {},
  }),
  getters: {
    WORLDS(state) {
      return state.worlds;
    },
    WORLD: (state) => (name) => {
      return state.worlds[name]?.main;
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
    WORLD_ADD(state, { project, value }) {
      state.worlds[project] = value;
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
      if (Object.keys(worlds).length !== 0) return;

      // Запрос данных
      const newData = await requestAxios("/api/worlds");

      // Обработка данных
      Object.entries(newData).forEach(([worldName, data]) => {
        // TODO: В целом переделать систему фильтров, чтобы не 
        //   надо было обрабатывать на стороне фронта, а не на сервере
        // TODO: Вынести в базу значнеи по умолчанию для фильтров

        // Добавляем статус фильтра. Как включенный по умолчанию
        data["main"].filters.forEach((filter) => {
          filter.state = true;
        });

        // Сохранение фильтров
        const filterData = {
          project: worldName,
          value: data["main"].filters,
        }
        context.commit("FILTERS", filterData);

        // TODO: тоже что и для фильтров
        
        // Обновление слоёв
        data["main"].layers.forEach((layer) => {
          layer.state = layer.defaulState;
        })

        // Сохранение данных о мире
        const worldData = {
          project: worldName,
          value: data,
        }
        context.commit("WORLD_ADD", worldData);
      });
    },
  },
};

export default worldsCollection;
