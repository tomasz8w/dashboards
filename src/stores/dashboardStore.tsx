/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from 'uuid';
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
  order: number;
  cards: Card[];
};

type ListState = {
  lists: List[];
  getListsSorted: () => List[];
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
      getListsSorted: () => get().lists.sort((a, b) => a.order - b.order),
      getList: (listId) => get().lists.find((list) => list.id === listId),
      createList: (title) =>
        set((state) => ({
          lists: [
            ...state.lists,
            {
              id: uuidv4(),
              title,
              order: state.lists.length,
              cards: [],
            } as List,
          ],
        })),
      deleteList: (listId) =>
        set((state) => ({
          lists: state
            .getListsSorted()
            .filter((list) => list.id !== listId)
            .map((list, index) => ({ ...list, order: index })),
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
                    id: uuidv4(),
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
