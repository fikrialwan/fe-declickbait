import { atom, selector } from "recoil";
import services from "../process/service";

const reload = atom({
  key: "reload",
  default: 0,
});


const stateId = atom({
  key: "stateId",
  default: 0,
})

const getDataset = selector({
  key: "getDataset",
  get: async ({ get }) => {
    get(reload);
    const dataset = await services.getBerita();
    return dataset.data.data;
  },
  set: ({ set }, value) => {
    set(reload, (v) => v + 1);
  },
});

const getDatatrain = selector({
  key: "getDatatrain",
  get: async ({ get }) => {
    get(reload);
    const datatrain = await services.getBeritaByType("train");
    return datatrain.data.data;
  },
  set: ({ set }, value) => {
    set(reload, (v) => v + 1);
  },
});

const getDatatest = selector({
  key: "getDatatest",
  get: async ({ get }) => {
    get(reload);
    const datatest = await services.getBeritaByType("test");
    return datatest.data.data;
  },
  set: ({ set }, value) => {
    set(reload, (v) => v + 1);
  },
});

const getSumber = selector({
  key: "getSumber",
  get: async () => {
    const sumberBerita = await services.getSumber();
    return sumberBerita.data.data;
  },
});

const getCommons = selector({
  key: "getCommons",
  get: async ({ get }) => {
    get(reload);
    const commons = await services.getCommons();
    return commons.data.data;
  },
  set: ({ set }, value) => {
    set(reload, (v) => v + 1);
  },
});

const getTotal = selector({
  key: "getTotal",
  get: async () => {
    const total = await services.getTotal();
    return total.data.data;
  },
});

const getTotalTrain = selector({
  key: "getTotal",
  get: async () => {
    const total = await services.getTotal("train");
    return total.data.data;
  },
});

const getTotalTest = selector({
  key: "getTotal",
  get: async () => {
    const total = await services.getTotal("test");
    return total.data.data;
  },
});

const getKata = selector({
  key: "getKata",
  get: async ({ get }) => {
    const id = get(stateId);
    const kata = await services.getKata(id);
    return kata.data.data[0];
  }
});

export {
  getDataset,
  getDatatest,
  getDatatrain,
  getSumber,
  getCommons,
  getTotal,
  getTotalTest,
  getTotalTrain,
  getKata,
  stateId,
};
