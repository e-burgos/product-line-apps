import Collapse from 'libs/ui/src/components/collapse';
import { useGridSwitcher } from 'libs/ui/src/hooks/use-grid-switcher';
import { NormalGridIcon } from 'libs/ui/src/components/icons/normal-grid';
import { motion } from 'framer-motion';
import { CompactGridIcon } from 'libs/ui/src/components/icons/compact-grid';

export function GridSwitcher() {
  const { isGridCompact, setIsGridCompact } = useGridSwitcher();
  return (
    <div className="flex overflow-hidden rounded-lg">
      <button
        className={`relative flex h-11 w-11 items-center justify-center bg-gray-100 transition dark:bg-gray-800 ${
          !isGridCompact ? 'z-10 text-white' : 'text-brand dark:text-white'
        }`}
        onClick={() => setIsGridCompact(!isGridCompact)}
        aria-label="Normal Grid"
      >
        {!isGridCompact && (
          <motion.span
            className="absolute bottom-0 left-0 right-0 h-full w-full bg-brand shadow-large"
            layoutId="gridSwitchIndicator"
          />
        )}
        <NormalGridIcon className="relative" />
      </button>
      <button
        className={`relative flex h-11 w-11 items-center justify-center bg-gray-100 transition dark:bg-gray-800 ${
          isGridCompact ? 'z-10 text-white' : 'text-brand dark:text-white'
        }`}
        onClick={() => setIsGridCompact(!isGridCompact)}
        aria-label="Normal Grid"
      >
        {isGridCompact && (
          <motion.span
            className="absolute bottom-0 left-0 right-0 h-full w-full  bg-brand shadow-large"
            layoutId="gridSwitchIndicator"
          />
        )}
        <CompactGridIcon className="relative" />
      </button>
    </div>
  );
}

export function GridFilterCard() {
  return (
    <Collapse label="Vista" initialOpen>
      <GridSwitcher />
    </Collapse>
  );
}
