const dataInfo = {
  state: () => ({
    currentObject: null,
    objectShow: false,
    objectList: [],
  }),
  getters: {
    CURRENT_OBJECT(state) {
      return state.currentObject;
    },
    OBJECT_SHOW(state) {
      return state.objectShow;
    },
    OBJECT_LIST(state) {
      return state.objectList;
    },
  },
  mutations: {
    CURRENT_OBJECT(state, value) {
      state.currentObject = value;
    },
    OBJECT_SHOW(state, value) {
      state.objectShow = value;
    },
    OBJECT_LIST_PUST(state, value) {
      state.objectList.push(value);
    },
    OBJECT_LIST_POP(state) {
      if (state.objectList.length <= 0) return;
      state.objectList.pop();
    },
    OBJECT_LIST_CLEAR(state) {
      state.objectList = [];
    },
  },
  actions: {
    OPEN_OBJECT(context, object) {
      context.commit("OBJECT_LIST_PUST", object);
      context.commit("CURRENT_OBJECT", object);
      context.commit("OBJECT_SHOW", true);
    },
    CLOSE_OBJECT(context) {
      context.commit("OBJECT_LIST_POP");
      const objectList = context.getters.OBJECT_LIST;

      if (objectList.length > 0) {
        context.commit("CURRENT_OBJECT", objectList[objectList.length - 1]);
      } else {
        context.commit("CURRENT_OBJECT", null);
        context.commit("OBJECT_SHOW", false);
      }
    },
    CLOSE_ALL(context) {
      context.commit("OBJECT_LIST_CLEAR");
      context.commit("CURRENT_OBJECT", null);
      context.commit("OBJECT_SHOW", false);
    },
  },
};

export default dataInfo;
