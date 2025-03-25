/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ButtonHTMLAttributes,
  cloneElement,
  forwardRef,
  ReactElement,
  RefObject,
} from 'react';
import { cn } from '../../../common/helpers/cn';
import styles from './icon-style.module.css';

type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  ref?: RefObject<any>;
  icon: ReactElement;
  isPinned?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const sizes: Record<IconButtonProps['size'], number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, isPinned, size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          styles.iconButtonWrapper,
          isPinned && styles.pinned,
          className,
        )}
        {...props}
      >
        {cloneElement(icon, {
          size: icon?.props?.size || sizes?.[size] || sizes.md,
          color: icon?.props?.color || 'inherit',
        })}
      </button>
    );
  },
);
