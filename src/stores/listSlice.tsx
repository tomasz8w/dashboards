/* eslint-disable import/prefer-default-export */
import { List } from 'models';
import { v4 as uuidv4 } from 'uuid';
import { StateCreator } from 'zustand';

import { CardSlice } from './cardSlice';

export interface ListSlice {
  lists: List[];
  resetStore: () => void;
  getListsSorted: () => List[];
  getList: (listId: string) => List | undefined;
  swapListOrder: (listA: string, listB: string) => void;
  createList: (title: string) => void;
  deleteList: (listId: string) => void;
  changeListTitle: (listId: string, newTitle: string) => void;
}

export const createListSlice: StateCreator<
  ListSlice & CardSlice,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  ListSlice
> = (set, get) => ({
  lists: [],
  resetStore: () => get().lists.forEach((list) => get().deleteList(list.id)),
  getListsSorted: () => get().lists.sort((a, b) => a.order - b.order),
  getList: (listId) => get().lists.find((list) => list.id === listId),
  swapListOrder: (listA, listB) =>
    set((state) => ({
      lists: state.lists.map((list) => {
        if (list.id === listA) {
          return {
            ...list,
            order: state.getList(listB)?.order ?? list.order,
          };
        }
        if (list.id === listB) {
          return {
            ...list,
            order: state.getList(listA)?.order ?? list.order,
          };
        }
        return list;
      }),
    })),
  createList: (title) =>
    set((state) => ({
      lists: [
        ...state.lists,
        {
          id: uuidv4(),
          title,
          order: state.lists.length,
        } as List,
      ],
    })),
  deleteList: (listId) =>
    set((state) => ({
      lists: state
        .getListsSorted()
        .filter((list) => list.id !== listId)
        .map((list, index) => ({ ...list, order: index })),
      cards: state.cards.filter((card) => card.listId !== listId),
    })),
  changeListTitle: (listId, newTitle) =>
    set((state) => ({
      lists: state.lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            title: newTitle,
          };
        }
        return list;
      }),
    })),
});
