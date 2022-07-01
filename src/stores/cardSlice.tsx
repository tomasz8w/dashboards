import { Card } from 'models';
import { v4 as uuidv4 } from 'uuid';
import { StateCreator } from 'zustand';

import { DashboardSlice } from './dashboardSlice';
import { ListSlice } from './listSlice';

export interface CardSlice {
  cards: Card[];
  addCard: (listId: string, title: string) => void;
  getCard: (cardId: string) => Card | undefined;
  getCardsFromList: (listId: string) => Card[];
  deleteCard: (cardId: string) => void;
  changeCardTitle: (cardId: string, newTitle: string) => void;
  changeCardDescription: (cardId: string, newDescription: string) => void;
  changeCardContent: (cardId: string, newContent: string) => void;
  swapCardOrder: (cardA: string, cardB: string) => void;
  changeCardList: (cardId: string, destListId: string) => void;
}

export const createCardSlice: StateCreator<
  ListSlice & CardSlice & DashboardSlice,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  CardSlice
> = (set, get) => ({
  cards: [],
  addCard: (listId, title) =>
    set((state) => ({
      cards: [
        ...state.cards,
        {
          id: uuidv4(),
          listId,
          title: `Karta ${state.getCardsFromList(listId).length}`,
          creationDate: Date.now(),
          description: '',
          content: '',
          order: state.getCardsFromList(listId).length,
        },
      ],
    })),
  getCard: (cardId) => get().cards.find((card) => card.id === cardId),
  getCardsFromList: (listId) =>
    get()
      .cards.filter((card) => card.listId === listId)
      .sort((a, b) => a.order - b.order),
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
  deleteCard: (cardId: string) =>
    set((state) => ({
      cards: [...state.cards.filter((card) => card.id !== cardId)],
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
  changeCardContent: (cardId, newContent) =>
    set((state) => ({
      cards: state.cards.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            content: newContent,
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
  changeCardList: (cardId, destListId) =>
    set((state) => {
      const srcCard = state.cards.find((card) => card.id === cardId);
      if (!srcCard) return { cards: [...state.cards] };
      // change listId and assign order on moving card
      const movingCard = {
        ...srcCard,
        listId: destListId,
        order: state.getCardsFromList(destListId).length,
      };
      // reorder cards on src list
      const reorderSrcListCards = state
        .getCardsFromList(srcCard.listId)
        .map((card, index) => ({ ...card, order: index }))
        .filter((card) => card.id !== cardId);
      const rest = state.cards.filter(
        (card) => card.id !== cardId && card.listId !== srcCard.listId
      );
      return {
        cards: [...rest, ...reorderSrcListCards, movingCard],
      };
    }),
});
