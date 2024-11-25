import { useEffect, useState } from 'react';
import styles from '../common/styles/main.module.css';
import useComponentEventListener from './useComponentEventListener';

export const useHeaderSticky = (tableId: string) => {
  const { position: tablePosition } = useComponentEventListener(
    `${tableId}-table`
  );

  const { element: containerElement } = useComponentEventListener(
    `${tableId}-container`
  );

  const { element: headerElement } = useComponentEventListener(
    `${tableId}-header-fixed`
  );

  const [headerFixed, setHeaderFixed] = useState<boolean>(false);
  const [headerAnimation, setHeaderAnimation] = useState<string>('');

  useEffect(() => {
    if (
      tablePosition?.y !== undefined &&
      tablePosition.y < 0 &&
      containerElement &&
      -tablePosition?.y < containerElement.offsetHeight - 80
    ) {
      setHeaderAnimation(styles.slideTop);
      setHeaderFixed(true);
    }
    if (
      tablePosition?.y !== undefined &&
      tablePosition.y > 56 &&
      containerElement &&
      -tablePosition?.y < containerElement.offsetHeight - 56
    ) {
      setHeaderAnimation(styles.slideOutTop);
      setHeaderFixed(false);
    }
    if (
      containerElement &&
      tablePosition?.y !== undefined &&
      -tablePosition.y > containerElement.offsetHeight - 56
    ) {
      setHeaderAnimation(styles.slideOutTop);
    }
    if (
      containerElement &&
      tablePosition?.y !== undefined &&
      -tablePosition.y > containerElement.offsetHeight
    ) {
      setHeaderFixed(false);
    }
  }, [headerElement, containerElement, tablePosition]);

  return {
    headerFixed,
    headerAnimation,
  };
};

export default useHeaderSticky;
