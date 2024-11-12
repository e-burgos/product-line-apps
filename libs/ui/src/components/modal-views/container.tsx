import cn from 'classnames';
import { Fragment } from 'react';
import { Dialog, DialogPanel, TransitionChild } from '../dialog';
import { Transition } from '../transition';
import Button from '../button';
import { Close } from '../icons/close';
import { useTheme } from '../../themes/use-theme';
import SearchView from './search/view';
import { LAYOUT_OPTIONS } from '../../themes/config';
import { MODAL_VIEW, useModalViewStore } from './useModalViewStore';
import ProfileInfo from '../../blockchain/components/profile/profile-info-view';
import Followers from '../../blockchain/components/profile/followers-view';

function renderModalContent(view: MODAL_VIEW | string) {
  switch (view) {
    case 'SEARCH_VIEW':
      return <SearchView />;
    case 'PROFILE_INFO_VIEW':
      return <ProfileInfo />;
    case 'FOLLOWERS_VIEW':
      return <Followers />;
    default:
      return null;
  }
}

export default function ModalContainer() {
  const { view, isOpen, closeModal } = useModalViewStore();
  const { layout } = useTheme();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden p-4 text-center sm:p-6 lg:p-8 xl:p-10 3xl:p-12"
        onClose={() => null}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPanel
            onClick={() => closeModal()}
            className="fixed inset-0 z-40 cursor-pointer bg-gray-700 bg-opacity-60 backdrop-blur"
          />
        </TransitionChild>

        {/* This element is to trick the browser into centering the modal contents. */}
        {view && view !== 'SEARCH_VIEW' && (
          <span className="inline-block h-full align-middle" aria-hidden="true">
            &#8203;
          </span>
        )}

        {/* This element is need to fix FocusTap headless-ui warning issue */}
        <div className="bg-red w-9 h-9 z-50">
          <Button
            size="small"
            color="gray"
            shape="circle"
            onClick={closeModal}
            className="opacity-50 hover:opacity-80 "
          >
            <Close className="h-auto w-[13px]" />
          </Button>
        </div>

        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-105"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-105"
        >
          <div
            className={cn(
              'relative z-50 inline-block w-full text-left align-middle',
              layout === LAYOUT_OPTIONS.RETRO ? 'sm:w-auto' : 'xs:w-auto'
            )}
          >
            {view && renderModalContent(view)}
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
