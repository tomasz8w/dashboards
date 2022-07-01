/* eslint-disable import/prefer-default-export */
import { List } from 'models';
import { v4 as uuidv4 } from 'uuid';
import { StateCreator } from 'zustand';

import { CardSlice } from './cardSlice';
import { DashboardSlice } from './dashboardSlice';

export interface ListSlice {
  lists: List[];
  getListsSorted: (dashboardId: string) => List[];
  getList: (listId: string) => List | undefined;
  swapListOrder: (listA: string, listB: string) => void;
  createList: (dashboardId: string, title: string) => void;
  deleteList: (listId: string) => void;
  clearList: (listId: string) => void;
  changeListTitle: (listId: string, newTitle: string) => void;
}

export const createListSlice: StateCreator<
  ListSlice & CardSlice & DashboardSlice,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  ListSlice
> = (set, get) => ({
  lists: [],
  getListsSorted: (dashboardId) =>
    get()
      .lists.filter((list) => list.dashboardId === dashboardId)
      .sort((a, b) => a.order - b.order),
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
  createList: (dashboardId, title) =>
    set((state) => ({
      lists: [
        ...state.lists,
        {
          id: uuidv4(),
          dashboardId,
          title,
          order: state.lists.length,
        } as List,
      ],
    })),
  deleteList: (listId) =>
    set((state) => ({
      lists: state.lists.filter((list) => list.id !== listId),
      cards: state.cards.filter((card) => card.listId !== listId),
    })),
  clearList: (listId) =>
    get()
      .getCardsFromList(listId)
      .forEach((card) => get().deleteCard(card.id)),
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
