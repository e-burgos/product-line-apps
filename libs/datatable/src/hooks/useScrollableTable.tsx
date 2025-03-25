import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

export const useScrollableTable = (
  tableContainerRef: React.MutableRefObject<HTMLDivElement>,
) => {
  const [scrollX, setScrollX] = useState<number>(0);
  const containerElement = tableContainerRef.current;
  const [containerWith, setContainerWidth] = useState(
    containerElement?.clientWidth,
  );
  const isScrollable =
    containerElement?.scrollWidth > containerElement?.clientWidth;

  const handleScroll = debounce((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    const scrollLeft = target.scrollLeft;
    setScrollX(scrollLeft);
  }, 50);

  useEffect(() => {
    function updateSize() {
      const containerElement = tableContainerRef.current;
      setContainerWidth(containerElement?.clientWidth || 0);
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [tableContainerRef]);

  return {
    containerWith,
    isScrollable,
    scrollX,
    handleScroll,
  };
};

export default useScrollableTable;
