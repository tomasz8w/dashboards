import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { List } from 'models';

const useDragAndDropList = (
  list: List | undefined,
  onOrderChanged: (listAId: string, listBId: string) => void
) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'list',
    item: list,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, dropRef] = useDrop({
    accept: 'list',
    hover: (item: List) => {
      if (list === undefined) return;
      if (item.id === list.id) return;

      onOrderChanged(item.id, list.id);
    },
  });

  dragRef(dropRef(ref));

  return { ref, isDragging };
};

export default useDragAndDropList;
