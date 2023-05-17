import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// export enum Categories {
//   "TO_DO" = "TO_DO",
//   "DOING" = "DOING",
//   "DONE" = "DONE",
// }

export let defaultCategories = ["해야할 일", "하는 중", "완료"];

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom({
  key: "category",
  default: defaultCategories[0],
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: defaultCategories,
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
