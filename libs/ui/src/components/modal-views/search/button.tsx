import Button from '../../button';
import { SearchIcon } from '../../icons/search';
import { useModalViewStore } from '../useModalViewStore';

export default function SearchButton({ ...props }) {
  const { openModal } = useModalViewStore();
  return (
    <Button
      shape="circle"
      aria-label="Search"
      onClick={() => openModal('SEARCH_VIEW')}
      {...props}
    >
      <SearchIcon className="h-auto w-3.5 sm:w-auto" />
    </Button>
  );
}
