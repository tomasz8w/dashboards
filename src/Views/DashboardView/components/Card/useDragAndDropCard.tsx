import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Card } from 'models';

const useDragAndDropCard = (
  card: Card | undefined,
  onListChanged: (cardAId: string, cardBId: string) => void,
  onOrderChanged: (cardAId: string, cardBId: string) => void
) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'card',
    item: card,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, dropRef] = useDrop({
    accept: 'card',
    hover: (item: Card) => {
      if (card === undefined) return;
      if (item.id === card.id) return;

      if (item.listId !== card.listId) {
        onListChanged(item.id, card.listId);
        return;
      }

      onOrderChanged(item.id, card.id);
    },
  });

  dragRef(dropRef(ref));

  return { ref, isDragging };
};

export default useDragAndDropCard;
