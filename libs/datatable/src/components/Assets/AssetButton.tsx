import React, { useState } from 'react';
import useTableColors from '../../hooks/useTableColors';

interface AssetButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  sx?: React.CSSProperties;
  className?: string;
  bgColor?: 'row' | 'header' | 'actionHover' | 'paper' | 'actionBg';
  onHover?: React.MouseEventHandler<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const AssetButton: React.FC<AssetButtonProps> = ({
  children,
  disabled,
  active,
  sx,
  className,
  bgColor,
  onClick,
  onHover,
}) => {
  const { colors } = useTableColors();
  const [hover, setHover] = useState<boolean>(false);

  const getBgColor = () => {
    switch (bgColor) {
      case 'row':
        return colors?.rowBg;
      case 'header':
        return colors?.headerBg;
      case 'actionHover':
        return colors?.actionHover;
      case 'paper':
        return colors?.paperBg;
      case 'actionBg':
        return colors?.actionBg;
      default:
        return 'transparent';
    }
  };

  return (
    <button
      {...{
        onMouseEnter: (e) => {
          onHover && onHover(e);
          setHover(true);
        },
        onMouseLeave: () => setHover(false),
        disabled: disabled,
        onClick: onClick,
        className,
        style: {
          cursor: disabled ? 'not-allowed' : 'pointer',
          backgroundColor: bgColor
            ? getBgColor()
            : disabled
            ? colors?.actionHover
            : hover || active
            ? colors?.actionHover
            : 'transparent',
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
