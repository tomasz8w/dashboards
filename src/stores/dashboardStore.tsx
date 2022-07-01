/* eslint-disable import/prefer-default-export */
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { CardSlice, createCardSlice } from './cardSlice';
import { ListSlice, createListSlice } from './listSlice';

export const useDashboardStore = create<ListSlice & CardSlice>()(
  devtools(
    persist((...a) => ({
      ...createListSlice(...a),
      ...createCardSlice(...a),
    }))
  )
);
