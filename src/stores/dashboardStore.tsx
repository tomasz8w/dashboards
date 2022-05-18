/* eslint-disable import/prefer-default-export */
import { uid } from 'react-uid';

import create from 'zustand';
import { persist } from 'zustand/middleware';

type Card = {
  id: string;
  title: string;
  creationDate: number;
  description: string;
};

type List = {
  id: string;
  title: string;
  cards: Card[];
};

type ListState = {
  lists: List[];
  getList: (listId: string) => List | undefined;
  createList: (title: string) => void;
  deleteList: (listId: string) => void;
  changeListTitle: (listId: string, newTitle: string) => void;
  addCard: (listId: string, title: string) => void;
  getCard: (listId: string, cardId: string) => Card | undefined;
  changeCardTitle: (listId: string, cardId: string, newTitle: string) => void;
  changeCardDescription: (
    listId: string,
    cardId: string,
    newDescription: string
  ) => void;
};

export const useDashboardStore = create<ListState>(
  persist(
    (set, get) => ({
      lists: [],
      getList: (listId) => get().lists.find((list) => list.id === listId),
      createList: (title) =>
        set((state) => ({
          lists: [
            ...state.lists,
            {
              id: uid(`${title}_${state.lists.length}`),
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
            }
            return list;
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
                  {
                    id: uid(`${listId}_${title}_${list.cards.length}`),
                    title,
                    creationDate: Date.now(),
                    description: '',
                  },
                ],
              };
            }
            return list;
          }),
        })),
      getCard: (listId, cardId) =>
        get()
          .getList(listId)
          ?.cards.find((card) => card.id === cardId),
      changeCardTitle: (listId, cardId, newTitle) =>
        set((state) => ({
          lists: state.lists.map((list) => {
            if (list.id === listId) {
              return {
                ...list,
                cards: list.cards.map((card) => {
                  if (card.id === cardId) {
                    return {
                      ...card,
                      title: newTitle,
                    };
                  }
                  return card;
                }),
              };
            }
            return list;
          }),
        })),
      changeCardDescription: (listId, cardId, newDescription) =>
        set((state) => ({
          lists: state.lists.map((list) => {
            if (list.id === listId) {
              return {
                ...list,
                cards: list.cards.map((card) => {
                  if (card.id === cardId) {
                    return {
                      ...card,
                      description: newDescription,
                    };
                  }
                  return card;
                }),
              };
            }
            return list;
          }),
        })),
    }),
    {
      name: 'store',
    }
  )
);
