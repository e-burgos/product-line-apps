import { CSSProperties, useEffect, useRef, useState } from 'react';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface TooltipProps {
  children: ReactNode;
  text: string;
  style?: CSSProperties;
}

export function Tooltip({ children, text, style = {} }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 4,
        left: rect.left + rect.width / 2,
      });
    }
  }, [visible]);

  if (!text) {
    return <>{children}</>;
  }

  return (
    <div
      ref={triggerRef}
      style={{ display: 'inline-block', ...style }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'fixed',
              top: `${position.top}px`,
              left: `${position.left}px`,
              transform: 'translate(-50%, -100%)',
              padding: '6px 12px',
              borderRadius: '4px',
              background: '#444A57',
              color: '#FFF',
              fontSize: '10px',
              lineHeight: '14px',
              whiteSpace: 'nowrap',
              zIndex: 9999,
            }}
          >
            {text}
          </div>,
          document.body,
        )}
    </div>
  );
}
