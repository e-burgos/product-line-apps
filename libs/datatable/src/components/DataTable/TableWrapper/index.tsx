import React, { useMemo } from 'react';
import { cn } from '../../../common/helpers/cn';
import { getCSSColorName } from '../../../common/helpers/theme';
import styles from '../../../common/styles/main.module.css';
import { IDataTableStyles } from '../../../common/types';
import useTableColors from '../../../hooks/useTableColors';
import Spinner from 'libs/ui/src/components/spinner';

export interface TableWrapperProps {
  tableId: string;
  title?: string;
  border?: boolean;
  isFetching?: boolean;
  isEmpty?: boolean;
  headerContainer?: React.ReactNode;
  children: React.ReactNode;
  sx?: IDataTableStyles;
}

const TableWrapper: React.FC<TableWrapperProps> = ({
  tableId,
  title,
  border,
  isFetching,
  headerContainer,
  children,
  isEmpty,
  sx,
}) => {
  const { colors } = useTableColors();

  const handleBorder = () => {
    if (border) return `1px solid ${colors.divider}`;
    if (!border && border !== undefined) return 'none';
    if (title && border === undefined) return `1px solid ${colors.divider}`;
    if (headerContainer && border === undefined)
      return `1px solid ${colors.divider}`;
    return 'none';
  };

  const colorsInject = useMemo(() => {
    return Object.entries(colors).reduce((acc, [colorName, colorValue]) => {
      acc[getCSSColorName(colorName)] = colorValue;

      return acc;
    }, {} as Record<string, string>);
  }, [colors]);

  return (
    <div
      id={`${tableId}-wrapper`}
      className={cn([
        styles.wrapper,
        (title || headerContainer) && styles.borderWrapper,
        (border || border === undefined) && styles.border,
      ])}
      style={{
        backgroundColor: isEmpty ? undefined : colors.defaultBg,
        border: handleBorder(),
        borderRadius: border || title || headerContainer ? '4px' : '0px',
        ...colorsInject,
        ...sx?.wrapper,
      }}
    >
      <div
        id={`${tableId}-wrapper-container`}
        className={cn([styles.wrapperContainer])}
        style={{
          backgroundColor: isEmpty ? undefined : colors.boxBg,
          ...sx?.wrapperContainer,
        }}
      >
        {isFetching && (
          <div
            id={`${tableId}-fetching-container`}
            className={styles.fetchingContainer}
            style={{
              backgroundColor: `${colors.defaultBg}50`,
            }}
          >
            <Spinner size="lg" />
          </div>
        )}
        {headerContainer && (
          <div className={styles.headerContainer} style={{ ...sx?.container }}>
            {headerContainer}
          </div>
        )}
        {title && (
          <div className={styles.titleContainer}>
            <h6 className={styles.title}>{title}</h6>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default TableWrapper;
