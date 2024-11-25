import React, { Dispatch, SetStateAction } from 'react';
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
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ColumnOrderState } from '@tanstack/react-table';

interface DragDropTableContextProps {
  children: React.ReactNode;
  columnOrder: ColumnOrderState;
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>;
}

const DragDropTableContext: React.FC<DragDropTableContextProps> = ({
  children,
  columnOrder,
  setColumnOrder,
}) => {
  function handleColumnDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active?.id !== over?.id) {
      const oldIndex = columnOrder?.indexOf(active?.id as string);
      const newIndex = columnOrder?.indexOf(over?.id as string);
      const newState = arrayMove(columnOrder, oldIndex, newIndex);
      setColumnOrder(newState);
      return newState;
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleColumnDragEnd}
      sensors={sensors}
    >
      {children}
    </DndContext>
  );
};

export default DragDropTableContext;
