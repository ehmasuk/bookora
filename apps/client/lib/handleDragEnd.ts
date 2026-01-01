import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const getChangedOrderItems = <T extends { id: string }>(oldArr: T[], newArr: T[]) => {
  const oldMap = new Map(oldArr.map((item, index) => [item.id, index]));

  return newArr
    .map((item, newIndex) => {
      const oldIndex = oldMap.get(item.id);
      if (oldIndex !== newIndex) {
        return { id: item.id, oldIndex, newIndex };
      }
      return null;
    })
    .filter(Boolean) as { id: string; oldIndex: number; newIndex: number }[];
};

const handleDragEnd = <T extends { id: string }>(
  event: DragEndEvent,
  data: T[]
) => {
  const { active, over } = event;
  if (!over) return null;

  if (active.id === over.id) return null;

  const oldIndex = data.findIndex((item) => item.id === active.id);
  const newIndex = data.findIndex((item) => item.id === over.id);

  if (oldIndex < 0 || newIndex < 0) return null;

  const newOrders = arrayMove(data, oldIndex, newIndex);
  const changedItems = getChangedOrderItems(data, newOrders);

  return {
    newOrders,
    changedItems,
  };
};


export default handleDragEnd;
