import { requestAxios } from "@/assets/scripts/api";

const worlds = {
  state: () => ({
    worlds: {},
  }),
  getters: {
    WORLDS(state) {
      return state.worlds;
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
      if (Object.keys(worlds).length !== 0) return;

      // Запрос данных
      const newData = await requestAxios("/api/worlds");
      // Сохранение данных в хранилище
      context.commit("WORLDS", newData);
    },
  },
};

export default worlds;
