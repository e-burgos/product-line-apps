import { Fragment } from 'react';
import { RadioGroup } from '@headlessui/react';
import { useTheme } from '../use-theme';
import cn from 'classnames';
import { Dialog, Transition } from '@headlessui/react';
import Button from '../../components/buttons';
import Scrollbar from '../../components/common/scrollbar';
import { Close } from '../../components/icons/close';
import { Sun } from '../../components/icons/sun';
import { Moon } from '../../components/icons/moon';
import { LeftAlign } from '../../components/icons/left-align';
import { RightAlign } from '../../components/icons/right-align';
import { ModernLayoutIcon } from '../../components/icons/modern-layout-icon';
import { RetroLayoutIcon } from '../../components/icons/retro-layout-icon';
import { MinimalLayoutIcon } from '../../components/icons/minimal-layout-icon';
import { ClassicLayoutIcon } from '../../components/icons/classic-layout-icon';
import { ColorPreset, LAYOUT_OPTIONS, LayoutOptions } from '../config';

// Component: SwitcherButton
interface SwitcherButtonProps {
  onClick?: () => void;
  checked: boolean;
  title: string;
}
function SwitcherButton({
  onClick,
  checked,
  title,
  children,
}: React.PropsWithChildren<SwitcherButtonProps>) {
  return (
    <div onClick={onClick} className="group cursor-pointer">
      <span
        className={cn(
          'flex h-[70px] items-center justify-center rounded-lg text-center text-sm font-medium uppercase tracking-wide transition-all',
          checked
            ? 'bg-white shadow-large dark:bg-gray-600'
            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-gray-700'
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          'mt-3 block text-center text-sm transition-all',
          checked
            ? 'text-brand dark:text-white'
            : 'text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
        )}
      >
        {title}
      </span>
    </div>
  );
}

// Component: ThemeSwitcher
function ThemeSwitcher() {
  const { mode, setMode } = useTheme();
  return (
    <div className="px-6 pt-8">
      <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
        Mode
      </h4>
      <RadioGroup
        value={mode}
        onChange={setMode}
        className="grid grid-cols-2 gap-5"
      >
        <RadioGroup.Option value="light">
          {({ checked }) => (
            <SwitcherButton
              onClick={() => setMode('light')}
              title={'Light'}
              checked={checked}
            >
              <Sun />
            </SwitcherButton>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value="dark">
          {({ checked }) => (
            <SwitcherButton
              onClick={() => setMode('dark')}
              title={'Dark'}
              checked={checked}
            >
              <Moon />
            </SwitcherButton>
          )}
        </RadioGroup.Option>
      </RadioGroup>
    </div>
  );
}

// Component: DirectionSwitcher
function DirectionSwitcher() {
  const { direction, setDirection } = useTheme();
  return (
    <div className="px-6 pt-8">
      <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
        Direction
      </h4>
      <RadioGroup
        value={direction}
        onChange={setDirection}
        className="grid grid-cols-2 gap-5"
      >
        <RadioGroup.Option value="ltr">
          {({ checked }) => (
            <SwitcherButton
              onClick={() => setDirection('ltr')}
              title={'LTR'}
              checked={checked}
            >
              <LeftAlign />
            </SwitcherButton>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value="rtl">
          {({ checked }) => (
            <SwitcherButton
              onClick={() => setDirection('rtl')}
              title={'RTL'}
              checked={checked}
            >
              <RightAlign />
            </SwitcherButton>
          )}
        </RadioGroup.Option>
      </RadioGroup>
    </div>
  );
}

// Component: LayoutSwitcher
const LayoutIcons: Record<string, JSX.Element> = {
  [LAYOUT_OPTIONS.MODERN]: <ModernLayoutIcon />,
  [LAYOUT_OPTIONS.MINIMAL]: <MinimalLayoutIcon />,
  [LAYOUT_OPTIONS.RETRO]: <RetroLayoutIcon />,
  [LAYOUT_OPTIONS.CLASSIC]: <ClassicLayoutIcon />,
};

function LayoutSwitcher() {
  const { layout, setLayout } = useTheme();
  return (
    <div className="px-6 pt-8">
      <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
        Layout
      </h4>
      <RadioGroup
        value={layout}
        onChange={setLayout}
        className="grid grid-cols-2 gap-5 "
      >
        {LayoutOptions.map((option) => (
          <RadioGroup.Option key={option.label} value={option.value}>
            {({ checked }) => (
              <SwitcherButton
                onClick={() => setLayout(option.value as LAYOUT_OPTIONS)}
                title={option.label}
                checked={checked}
              >
                {LayoutIcons[option.value]}
              </SwitcherButton>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
}

// Component: ColorSwitcher
function ColorSwitcher() {
  const { preset, setPreset } = useTheme();
  return (
    <div className="px-6 pt-8">
      <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
        Color
      </h4>
      <RadioGroup
        value={preset}
        onChange={setPreset}
        className="grid grid-cols-3 gap-5 "
      >
        {ColorPreset.map((item, index) => (
          <RadioGroup.Option value={item} key={index}>
            {({ checked }) => (
              <SwitcherButton
                onClick={() => setPreset(item)}
                title={item.label}
                checked={checked}
              >
                <span
                  className="h-8 w-8 rounded-full"
                  style={{ backgroundColor: item.value }}
                />
              </SwitcherButton>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
}

export function SettingsDrawer() {
  const { isSettingsOpen, setIsSettingsOpen, settingActions } = useTheme();
  return (
    <Transition appear show={isSettingsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
        onClose={() => setIsSettingsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Panel className="fixed inset-0 bg-gray-700 bg-opacity-0" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-out duration-300"
          enterFrom="ltr:translate-x-full rtl:-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in duration-300"
          leaveFrom="translate-x-0"
          leaveTo="ltr:translate-x-full rtl:-translate-x-full"
        >
          <div className="fixed inset-y-0 w-80 max-w-full bg-white/95 shadow-[0_0_80px_rgba(17,24,39,0.2)] backdrop-blur ltr:right-0 rtl:left-0 dark:bg-dark/90">
            <div className="h-full w-full">
              <div className="flex h-16 items-center justify-between gap-6 border-b border-dashed border-gray-200 px-6 dark:border-gray-700">
                <h3 className="text-base font-medium uppercase text-gray-900 dark:text-white">
                  Personalización
                </h3>
                <Button
                  variant="ghost"
                  size="mini"
                  shape="circle"
                  onClick={() => setIsSettingsOpen(false)}
                >
                  <Close className="h-auto w-3" />
                </Button>
              </div>

              <Scrollbar style={{ height: 'calc(100% - 64px)' }}>
                <div className="pb-8">
                  <ThemeSwitcher />
                  <DirectionSwitcher />
                  <LayoutSwitcher />
                  <ColorSwitcher />
                </div>
              </Scrollbar>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default SettingsDrawer;
