/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import Button, { ButtonProps } from '../button';
import { DrawerContainer } from './drawer-container';
import { Sidebar } from './sidebar';
import { SidebarMenu } from './sidebar-menu';
import { IMenuItem } from '../../types';

interface DrawerProps {
  onClose?: () => void;
  children?: React.ReactNode;
  type: 'sidebar' | 'sidebar-menu';
  buttonProps?: ButtonProps;
  className?: string;
  menuItems?: IMenuItem[];
  position?: 'left' | 'right';
  title?: string;
  actionContent?: React.ReactNode;
  backdrop?: boolean;
}

export function Drawer({
  onClose,
  children,
  type,
  buttonProps,
  className,
  menuItems,
  position = 'left',
  title,
  actionContent,
  backdrop = true,
}: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeDrawer = () => {
    setIsOpen(false);
    onClose?.();
  };

  const renderDrawer = () => {
    switch (type) {
      case 'sidebar':
        return (
          <Sidebar
            onClose={closeDrawer}
            children={children}
            className={className}
            title={title}
          />
        );
      case 'sidebar-menu':
        return (
          <SidebarMenu
            onClose={closeDrawer}
            children={children}
            className={className}
            menuItems={menuItems || []}
            title={title}
            actionContent={actionContent}
          />
        );
      default:
        return (
          <Sidebar
            onClose={closeDrawer}
            children={children}
            className={className}
          />
        );
    }
  };

  return (
    <>
      <Button
        {...buttonProps}
        onClick={() => {
          setIsOpen(!isOpen);
          // @ts-ignore
          buttonProps?.onClick?.();
        }}
      >
        {buttonProps?.title || 'Open'}
      </Button>
      <DrawerContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        position={position}
        backdrop={backdrop}
      >
        {renderDrawer()}
      </DrawerContainer>
    </>
  );
}

export default Drawer;
