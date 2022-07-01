/* eslint-disable import/prefer-default-export */
import { Dashboard } from 'models';
import { v4 as uuidv4 } from 'uuid';
import { StateCreator } from 'zustand';

import { CardSlice } from './cardSlice';
import { ListSlice } from './listSlice';

export interface DashboardSlice {
  dashboards: Dashboard[];
  selectedDashboard: string | undefined;
  setSelectedDashboard: (dashboardId: string) => void;
  resetDashboard: (dashboardId: string) => void;
  createDashboard: (name: string) => void;
  deleteDashboard: (dashboardId: string) => void;
  changeDashboardName: (dashboardId: string, newName: string) => void;
}

export const createDashboardSlice: StateCreator<
  ListSlice & CardSlice & DashboardSlice,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  DashboardSlice
> = (set, get) => ({
  dashboards: [],
  selectedDashboard: undefined,
  setSelectedDashboard: (dashboardId) =>
    set(() => ({ selectedDashboard: dashboardId })),
  resetDashboard: (dashboardId) =>
    get()
      .lists.filter((list) => list.dashboardId === dashboardId)
      .forEach((list) => get().deleteList(list.id)),
  createDashboard: (name) => {
    const id = uuidv4();
    set((state) => ({
      dashboards: [
        ...state.dashboards,
        {
          id,
          name,
        } as Dashboard,
      ],
      selectedDashboard: id,
    }));
  },
  deleteDashboard: (dashboardId) => {
    get()
      .lists.filter((list) => list.dashboardId === dashboardId)
      .forEach((list) => get().deleteList(list.id));
    set((state) => ({
      selectedDashboard: '',
      dashboards: state.dashboards.filter(
        (dashboard) => dashboard.id !== dashboardId
      ),
    }));
  },
  changeDashboardName: (dashboardId, newName) =>
    set((state) => ({
      dashboards: state.dashboards.map((dashboard) => {
        if (dashboard.id === dashboardId) {
          return {
            ...dashboard,
            title: newName,
          };
        }
        return dashboard;
      }),
    })),
});
