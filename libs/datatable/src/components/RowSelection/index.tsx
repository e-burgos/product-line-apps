import { HTMLProps, useEffect, useRef } from 'react';
import styles from './row-selection.module.css';

export function RowSelection({
  type = 'checkbox',
  indeterminate,
  ...rest
}: {
  indeterminate?: boolean;
  type?: 'checkbox' | 'radio';
} & HTMLProps<HTMLInputElement>): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  return (
    <input
      type={type}
      ref={ref}
      className={type === 'checkbox' ? styles.checkbox : styles.radio}
      {...rest}
    />
  );
}
