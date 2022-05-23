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
