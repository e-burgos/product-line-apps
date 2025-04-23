import { infiniteMenuItems } from '../../../data/home';
import InfiniteMenu from '../../ui/InfiniteMenu';

const MenuSection = () => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-transparent">
      <InfiniteMenu items={infiniteMenuItems} />
    </div>
  );
};

export default MenuSection;
