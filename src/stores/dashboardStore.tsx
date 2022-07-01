/* eslint-disable import/prefer-default-export */
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { CardSlice, createCardSlice } from './cardSlice';
import { DashboardSlice, createDashboardSlice } from './dashboardSlice';
import { ListSlice, createListSlice } from './listSlice';

export const useDashboardStore = create<
  ListSlice & CardSlice & DashboardSlice
>()(
  devtools(
    persist((...a) => ({
      ...createListSlice(...a),
      ...createCardSlice(...a),
      ...createDashboardSlice(...a),
    }))
  )
);
