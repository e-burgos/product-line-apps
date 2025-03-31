import React from 'react';
import {
  closestCenter,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import {
  restrictToHorizontalAxis,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';
import { TData } from '../../common/types';

interface DragDropWithRowsTableContextProps {
  children: React.ReactNode;
  isColumn: boolean;
  columnOrder: string[];
  data: TData[];
  setColumnOrder: (value: string[]) => void;
  setData: (value: TData[]) => void;
}

const DragDropWithRowsTableContext: React.FC<
  DragDropWithRowsTableContextProps
> = ({ children, isColumn, columnOrder, data, setColumnOrder, setData }) => {
  function handleColumnDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = columnOrder.indexOf(active.id as string);
      const newIndex = columnOrder.indexOf(over.id as string);
      const newState = arrayMove(columnOrder, oldIndex, newIndex);
      setColumnOrder(newState);
      return newState;
    }
  }

  function handleRowDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = Number(active.id);
      const newIndex = Number(over.id);
      const newState = arrayMove(data, oldIndex, newIndex);
      setData(newState);
      return newState;
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={
        isColumn ? [restrictToHorizontalAxis] : [restrictToVerticalAxis]
      }
      onDragEnd={isColumn ? handleColumnDragEnd : handleRowDragEnd}
      sensors={sensors}
    >
      {children}
    </DndContext>
  );
};

export default DragDropWithRowsTableContext;
