import { useEffect, useState } from 'react';
import useComponentEventListener from './useComponentEventListener';

export const useScrollableTable = (tableId: string) => {
  const { element: containerElement } = useComponentEventListener(
    `${tableId}-container`
  );

  const { element: headerElement } = useComponentEventListener(
    `${tableId}-header-fixed`
  );

  const [scrollX, setScrollX] = useState<number>(0);

  const containerWith = containerElement?.clientWidth;

  const isScrollable =
    (containerElement?.scrollWidth ?? 0) > (containerElement?.clientWidth ?? 0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.target as HTMLDivElement;
    setScrollX(target.scrollLeft);
  };

  useEffect(() => {
    headerElement?.scrollTo(scrollX, 0);
    containerElement?.scrollTo(scrollX, 0);
  }, [scrollX, headerElement, containerElement]);

  return {
    containerWith,
    isScrollable,
    scrollX,
    handleScroll,
  };
};

export default useScrollableTable;