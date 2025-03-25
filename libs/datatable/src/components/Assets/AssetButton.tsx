import React from 'react';

interface AssetButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  /**
   * @deprecated unused
   */
  active?: boolean;
  sx?: React.CSSProperties;
  className?: string;
  /**
   * @deprecated unused
   */
  bgColor?: 'row' | 'header' | 'actionHover' | 'paper' | 'actionBg';
  onHover?: React.MouseEventHandler<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const AssetButton: React.FC<AssetButtonProps> = ({
  children,
  disabled,
  sx,
  className,
  onClick,
  onHover,
}) => {
  return (
    <button
      {...{
        onMouseEnter: onHover,
        disabled: disabled,
        onClick: onClick,
        className,
        style: {
          cursor: disabled ? 'not-allowed' : 'pointer',
          borderRadius: '50%',
          border: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 'fit-content',
          height: 'fit-content',
          padding: '4px',
          ...sx,
        },
      }}
    >
      {children}
    </button>
  );
};

export default AssetButton;
