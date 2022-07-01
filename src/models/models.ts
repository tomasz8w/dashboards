export type Card = {
  id: string;
  listId: string;
  title: string;
  creationDate: number;
  description: string;
  content: string;
  order: number;
};

export type List = {
  id: string;
  dashboardId: string;
  title: string;
  order: number;
};

export type Dashboard = {
  id: string;
  name: string;
};
