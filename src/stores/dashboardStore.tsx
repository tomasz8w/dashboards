/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from 'uuid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export type Card = {
  id: string;
  listId: string;
  title: string;
  creationDate: number;
  description: string;
  order: number;
};

export type List = {
  id: string;
  title: string;
  order: number;
};

type ListState = {
  lists: List[];
  cards: Card[];
  getListsSorted: () => List[];
  getList: (listId: string) => List | undefined;
  swapListOrder: (listA: string, listB: string) => void;
  createList: (title: string) => void;
  deleteList: (listId: string) => void;
  changeListTitle: (listId: string, newTitle: string) => void;
  getListCards: (listId: string) => Card[];
  addCard: (listId: string, title: string) => void;
  getCard: (cardId: string) => Card | undefined;
  changeCardTitle: (cardId: string, newTitle: string) => void;
  changeCardDescription: (cardId: string, newDescription: string) => void;
  swapCardOrder: (cardA: string, cardB: string) => void;
};

export const useDashboardStore = create<ListState>(
  persist(
    (set, get) => ({
      lists: [],
      cards: [],
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
      getListCards: (listId) =>
        get()
          .cards.filter((card) => card.listId === listId)
          .sort((a, b) => a.order - b.order),
      addCard: (listId, title) =>
        set((state) => ({
          cards: [
            ...state.cards,
            {
              id: uuidv4(),
              listId,
              title,
              creationDate: Date.now(),
              description: '',
              order: state.getListCards(listId).length,
            },
          ],
        })),
      getCard: (cardId) => get().cards.find((card) => card.id === cardId),
      changeCardTitle: (cardId, newTitle) =>
        set((state) => ({
          cards: state.cards.map((card) => {
            if (card.id === cardId) {
              return {
                ...card,
                title: newTitle,
              };
            }
            return card;
          }),
        })),
      changeCardDescription: (cardId, newDescription) =>
        set((state) => ({
          cards: state.cards.map((card) => {
            if (card.id === cardId) {
              return {
                ...card,
                description: newDescription,
              };
            }
            return card;
          }),
        })),
      swapCardOrder: (cardA, cardB) =>
        set((state) => ({
          cards: state.cards.map((card) => {
            if (card.id === cardA) {
              return {
                ...card,
                order: state.getCard(cardB)?.order ?? card.order,
              };
            }
            if (card.id === cardB) {
              return {
                ...card,
                order: state.getCard(cardA)?.order ?? card.order,
              };
            }
            return card;
          }),
        })),
    }),
    {
      name: 'store',
    }
  )
);
