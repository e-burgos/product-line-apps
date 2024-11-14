import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';
import cn from 'classnames';
import { Menu } from 'libs/ui/src/components/menu';
import { Transition } from 'libs/ui/src/components/transition';
import { ChevronForward } from 'libs/ui/src/components/icons/chevron-forward';
import { PowerIcon } from 'libs/ui/src/components/icons/power';
import { MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { WalletOptions } from './wagmi-options';

export function WalletConnect({
  btnClassName,
  profilePath,
}: {
  btnClassName?: string;
  profilePath?: string;
}) {
  const router = useNavigate();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { data } = useBalance({ address });
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName ?? '' });
  const balance = data?.formatted;

  return (
    <>
      {address ? (
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <div className="relative flex-shrink-0">
            <Menu>
              <MenuButton className="block h-10 w-10 overflow-hidden rounded-full border-3 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large dark:border-gray-700 sm:h-12 sm:w-12"></MenuButton>
              <Transition
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <MenuItems className="absolute -right-0 mt-3 w-72 origin-top-right rounded-lg bg-white shadow-large dark:bg-gray-900 sm:-right-0">
                  <MenuItem>
                    <div className="border-b border-dashed border-gray-200 p-3 dark:border-gray-700">
                      <button
                        onClick={() => router(profilePath || '/')}
                        className="flex min-w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                      >
                        {ensAvatar ? (
                          <img
                            alt="ENS Avatar"
                            className="h-8 w-8 rounded-full border-2 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:border-gray-700"
                            src={ensAvatar}
                          />
                        ) : (
                          <span className="h-8 w-8 rounded-full border-2 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:border-gray-700"></span>
                        )}
                        <span className="grow uppercase">
                          {ensName ? `${ensName}` : 'View Your Profile'}
                        </span>
                        <ChevronForward />
                      </button>
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <MenuItem>
                      <div className="border-b border-dashed border-gray-200 px-6 py-5 dark:border-gray-700">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium -tracking-tighter text-gray-600 dark:text-gray-400">
                            Balance
                          </span>
                          <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm tracking-tighter dark:bg-gray-800">
                            {address.slice(0, 6)}
                            {'...'}
                            {address.slice(address.length - 6)}
                          </span>
                        </div>
                        <div className="mt-3 font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                          {balance} ETH
                        </div>
                      </div>
                    </MenuItem>
                  </MenuItem>
                  <MenuItem>
                    <div className="p-3">
                      <div
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                        onClick={() => disconnect()}
                      >
                        <PowerIcon />
                        <span className="grow uppercase">Disconnect</span>
                      </div>
                    </div>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <div className="relative flex-shrink-0">
            <Menu>
              <MenuButton
                className={cn('shadow-main hover:shadow-large', btnClassName)}
              >
                <span className="relative inline-flex shrink-0 items-center justify-center overflow-hidden text-center text-xs font-medium tracking-wider outline-none transition-all sm:text-sm bg-brand border-brand hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none text-white rounded-full px-5 sm:px-8 h-10 sm:h-12">
                  CONNECT
                </span>
              </MenuButton>
              <Transition
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <MenuItems className="absolute -right-0 mt-3 w-72 origin-top-right rounded-lg bg-white shadow-large dark:bg-gray-900 sm:-right-0">
                  <WalletOptions />
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      )}
    </>
  );
}

export default WalletConnect;
