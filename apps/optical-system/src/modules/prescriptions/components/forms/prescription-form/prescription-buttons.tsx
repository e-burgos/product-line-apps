import { FC } from 'react';
import Button from 'libs/ui/src/components/button/button';
import { FieldErrors, UseFormReset, UseFormWatch } from 'react-hook-form';
import { usePrescriptionStore } from '../../../hooks/use-prescription-store';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PrescriptionFormData } from './validations';
import { useCustomerStore } from '@optical-system-app/modules/customers/hooks/use-customer-store';

interface PrescriptionButtonsProps {
  selectedTab: number;
  setSelectedTab: (value: number) => void;
  type?: 'create' | 'update';
  reset: UseFormReset<PrescriptionFormData>;
  isValid: boolean;
  errors: FieldErrors<PrescriptionFormData>;
  watch: UseFormWatch<PrescriptionFormData>;
}

export const PrescriptionButtons: FC<PrescriptionButtonsProps> = ({
  type = 'create',
  selectedTab,
  setSelectedTab,
  reset,
  isValid,
  errors,
  watch,
}) => {
  const { currentCustomer, setCurrentCustomer } = useCustomerStore();
  const { setOpenCreateModal } = usePrescriptionStore();

  const handleDisable = () => {
    switch (selectedTab) {
      case 0:
        if (
          errors.receiptNumber ||
          errors.date ||
          !watch('receiptNumber') ||
          !watch('date') ||
          currentCustomer === null
        ) {
          return true;
        }
        break;
      case 1:
        if (
          errors.nearRightSphere ||
          errors.nearRightCylinder ||
          errors.nearRightAxis ||
          errors.nearLeftSphere ||
          errors.nearLeftCylinder ||
          errors.nearLeftAxis ||
          errors.farRightCylinder ||
          errors.farRightSphere ||
          errors.farRightAxis ||
          errors.farLeftCylinder ||
          errors.farLeftSphere ||
          errors.farLeftAxis
        ) {
          return true;
        }
        break;
      case 2:
        if (
          errors.doctorName ||
          errors.frameDesc ||
          errors.framePrice ||
          errors.crystalDesc ||
          errors.crystalPrice ||
          errors.contactlensDesc ||
          errors.contactlensPrice ||
          errors.arrangementDesc ||
          errors.arrangementPrice
        ) {
          return true;
        }
        break;
      case 3:
        if (
          errors.paymentMethod ||
          errors.cashDeposit ||
          errors.creditCardDeposit ||
          errors.creditCardType ||
          errors.creditCardNumber ||
          errors.creditCardInstallments
        ) {
          return true;
        }
        break;
      case 4:
        if (
          watch('paymentMethod') === undefined ||
          errors.paymentMethod ||
          errors.cashDeposit ||
          errors.creditCardDeposit ||
          errors.creditCardType ||
          errors.creditCardNumber ||
          errors.creditCardInstallments
        ) {
          return true;
        }
        break;
      default:
        break;
    }
    return false;
  };

  return (
    <>
      {selectedTab !== 3 && (
        <div className="w-full flex justify-center gap-2 mt-6 px-2">
          {selectedTab !== 0 && (
            <Button
              size="medium"
              shape="rounded"
              variant="ghost"
              type="button"
              disabled={selectedTab === 0}
              onClick={() => {
                setSelectedTab(selectedTab - 1);
              }}
            >
              <div className="flex items-center gap-1">
                <ChevronLeft className="h-5 w-5" />
                {'Anterior'}
              </div>
            </Button>
          )}
          {selectedTab === 0 && (
            <Button
              size="medium"
              shape="rounded"
              variant="ghost"
              type="button"
              onClick={() => {
                reset();
                setCurrentCustomer(null);
                setOpenCreateModal(false);
              }}
            >
              Cerrar
            </Button>
          )}
          <Button
            size="medium"
            shape="rounded"
            variant="solid"
            type="button"
            disabled={handleDisable()}
            onClick={() => {
              setSelectedTab(selectedTab + 1);
            }}
          >
            <div className="flex items-center gap-1">
              {'Siguiente'}
              <ChevronRight className="h-5 w-5" />
            </div>
          </Button>
        </div>
      )}
      {selectedTab === 3 && (
        <div className="w-full flex justify-center gap-2 mt-6 px-2">
          <Button
            size="medium"
            shape="rounded"
            variant="ghost"
            type="button"
            onClick={() => {
              setSelectedTab(selectedTab - 1);
            }}
          >
            <div className="flex items-center gap-1">
              <ChevronLeft className="h-5 w-5" />
              {'Anterior'}
            </div>
          </Button>
          <Button
            size="medium"
            shape="rounded"
            variant="ghost"
            type="button"
            onClick={() => {
              reset();
              setCurrentCustomer(null);
              setOpenCreateModal(false);
            }}
          >
            Cerrar
          </Button>
          <Button
            size="medium"
            shape="rounded"
            type="submit"
            disabled={!isValid}
          >
            {type === 'create' ? 'Guardar' : 'Actualizar'}
          </Button>
        </div>
      )}
    </>
  );
};

export default PrescriptionButtons;
