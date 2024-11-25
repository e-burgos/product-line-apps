import { Plus } from 'lucide-react';
import Modal from 'libs/ui/src/components/modal';
import Button from 'libs/ui/src/components/button';
import {
  TabGroup,
  TabItem,
  TabList,
  TabPanel,
  TabPanels,
} from 'libs/ui/src/components/tab';
import { AddBudgetForm } from '../forms/add-budget-form';
import { AddBudgetDetailsForm } from '../forms/add-budget-detail-form';
import { useBudgetStore } from '../hooks/use-budget-store';

const AddBudgetModal = () => {
  const { openCreateModal, setOpenCreateModal } = useBudgetStore();
  return (
    <>
      <Button
        variant="solid"
        shape="rounded"
        size="mini"
        onClick={() => setOpenCreateModal(true)}
      >
        <div className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Agregar
        </div>
      </Button>

      <Modal
        isOpen={openCreateModal}
        setIsOpen={setOpenCreateModal}
        text={{
          title: 'Nuevo Presupuesto',
        }}
        hideButtons
      >
        <TabGroup>
          <TabList className="grid w-full grid-cols-2 mt-4">
            <TabItem>Presupuestos</TabItem>
            <TabItem>Nuevo Detalle</TabItem>
          </TabList>
          <TabPanels className="mt-3">
            <TabPanel className="relative w-full focus:outline-none md:w-auto">
              <AddBudgetForm />
            </TabPanel>
            <TabPanel className="relative w-full focus:outline-none md:w-auto">
              <AddBudgetDetailsForm />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Modal>
    </>
  );
};

export default AddBudgetModal;
