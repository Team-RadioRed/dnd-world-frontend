import { requestAxios } from "@/assets/scripts/api";

const worldsCollection = {
  state: () => ({
    // Общая информация по всем мирам
    worlds: [],
  }),
  getters: {
    WORLDS(state) {
      return state.worlds;
    },
    WORLD: (state) => (name) => {
      return state.worlds.find((world) => world.name === name);
    },
  },
  mutations: {
    WORLDS(state, value) {
      state.worlds = value;
    },
  },
  actions: {
    async LOAD_WORLDS(context) {
      // Проверка есть ли данные в хранилище
      const worlds = context.getters.WORLDS;
      if (worlds.length !== 0) return;

      // Запрос данных
      const newData = await requestAxios("/api/worlds");
      // Сохранение данных в хранилище
      context.commit("WORLDS", newData);
    },
  },
};

export default worldsCollection;
