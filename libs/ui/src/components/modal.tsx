import React from 'react';
import Button from './button';
import { Dialog, DialogPanel, DialogTitle } from './dialog';
import CardContainer from './forms/card-container';

interface ModalProps {
  isOpen: boolean;
  closeable?: boolean;
  hideButtons?: boolean;
  children?: React.ReactNode;
  buttonContainer?: React.ReactNode;
  text?: {
    title?: string;
    content?: string;
    button?: string;
    backButton?: string;
  };
  setIsOpen: (isOpen: boolean) => void;
  onBack?: () => void;
  onSubmit?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  text,
  closeable = true,
  hideButtons = false,
  children,
  buttonContainer,
  setIsOpen,
  onSubmit,
  onBack,
}) => {
  function close() {
    setIsOpen(false);
  }

  function closeableClose() {
    closeable && setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeableClose}
    >
      <div
        className={`fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-700/90`}
      >
        <div className="flex min-h-full items-center justify-center p-4">
          <CardContainer className="w-full max-w-lg rounded-xl shadow-card duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            <DialogPanel
              transition
              className="w-full overflow-y backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {text?.title && (
                <DialogTitle
                  as="h3"
                  className="font-bold uppercase tracking-wider text-lg mb-4"
                >
                  {text.title}
                </DialogTitle>
              )}
              {text?.content && (
                <p className="mt-4 text-sm/6">{text.content}</p>
              )}
              <div className=" flex flex-col w-full overflow-x-hidden overflow-y-auto max-h-[60vh] p-2">
                {children}
              </div>
              {buttonContainer && <div className="mt-6">{buttonContainer}</div>}
              {!hideButtons && (
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    size="medium"
                    shape="rounded"
                    variant="ghost"
                    onClick={() => {
                      close();
                      onBack && onBack();
                    }}
                  >
                    {text?.backButton || 'Cerrar'}
                  </Button>
                  <Button
                    size="medium"
                    shape="rounded"
                    onClick={() => {
                      onSubmit && onSubmit();
                    }}
                  >
                    {text?.button || 'Aceptar'}
                  </Button>
                </div>
              )}
            </DialogPanel>
          </CardContainer>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;