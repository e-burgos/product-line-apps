import { Share2 } from 'lucide-react';
import Button from 'libs/ui/src/components/button/button';
import { Download } from 'lucide-react';
import React from 'react';
import useCustomerData from '@optical-system-app/modules/customers/hooks/use-customer-data';

interface ShareButtonsProps {
  onClickExportExcel?: () => void;
  onClickShare?: () => void;
  entity?: 'customers' | 'prescriptions';
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  onClickExportExcel,
  onClickShare,
  entity,
}) => {
  const { exportToExcel, shareCustomersData } = useCustomerData();

  const handleExportExcel = () => {
    switch (entity) {
      case 'customers':
        exportToExcel();
        break;
      default:
        onClickExportExcel?.();
        break;
    }
  };

  const handleShare = () => {
    switch (entity) {
      case 'customers':
        shareCustomersData();
        break;
      default:
        onClickShare?.();
        break;
    }
  };

  return (
    <>
      {entity && (
        <Button
          variant="ghost"
          size="small"
          shape="rounded"
          onClick={handleExportExcel}
          title="Exportar a Excel"
          className="p-2"
        >
          <Download className="h-4 w-4" />
        </Button>
      )}
      {entity && (
        <Button
          variant="ghost"
          size="small"
          shape="rounded"
          onClick={handleShare}
          title="Compartir"
          className="p-2"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};

export default ShareButtons;
