import { Share2 } from 'lucide-react';
import Button from 'libs/ui/src/components/button/button';
import { Download } from 'lucide-react';
import React from 'react';

interface ShareButtonsProps {
  onClickExportExcel?: () => void;
  onClickShare?: () => void;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  onClickExportExcel,
  onClickShare,
}) => {
  return (
    <>
      {onClickExportExcel && (
        <Button
          variant="ghost"
          size="small"
          shape="rounded"
          onClick={() => onClickExportExcel()}
          title="Exportar a Excel"
          className="p-2"
        >
          <Download className="h-4 w-4" />
        </Button>
      )}
      {onClickShare && (
        <Button
          variant="ghost"
          size="small"
          shape="rounded"
          onClick={() => onClickShare()}
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
