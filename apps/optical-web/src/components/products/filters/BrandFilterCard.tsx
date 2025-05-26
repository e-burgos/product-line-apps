import Collapse from 'libs/ui/src/components/collapse';
import CollectionSelect from 'libs/ui/src/components/collection-select-list';

export function BrandFilterCard() {
  return (
    <Collapse label="Marcas" initialOpen>
      <CollectionSelect onSelect={(value) => console.log(value)} />
    </Collapse>
  );
}
