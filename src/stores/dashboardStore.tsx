import create from "zustand";
import produce from "immer";

type Card = {
  id: number;
  title: string;
};

type List = {
  id: number;
  title: string;
  cards: Card[];
};

type ListState = {
  lists: List[];
  getList: (listId: number) => List | undefined;
  createList: (title: string) => void;
  deleteList: (listId: number) => void;
  changeListTitle: (listId: number, newTitle: string) => void;
  addCard: (listId: number, title: string) => void;
  getCard: (listId: number, cardId: number) => Card | undefined;
};

export const useDashboardStore = create<ListState>((set, get) => ({
  lists: [],
  getList: (listId) => get().lists.find((list) => list.id === listId),
  createList: (title) =>
    set((state) => ({
      lists: [
        ...state.lists,
        {
          id: Math.floor(Math.random() * 1000),
          title,
          cards: [],
        } as List,
      ],
    })),
  deleteList: (listId) =>
    set((state) => ({
      lists: state.lists.filter((list) => list.id !== listId),
    })),
  changeListTitle: (listId, newTitle) =>
    set((state) => ({
      lists: state.lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            title: newTitle,
          };
        } else return list;
      }),
    })),
  addCard: (listId, title) =>
    set((state) => ({
      lists: state.lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            cards: [
              ...list.cards,
              { id: Math.floor(Math.random() * 1000), title },
            ],
          };
        } else return list;
      }),
    })),
  getCard: (listId, cardId) =>
    get()
      .getList(listId)
      ?.cards.find((card) => card.id === cardId),
}));
