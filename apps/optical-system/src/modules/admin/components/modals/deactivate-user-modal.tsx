import React from 'react';
import Modal from 'libs/ui/src/components/modal';
import Button from 'libs/ui/src/components/button';
import { UserRoundXIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../hooks/use-user-store';
import { useAdminQueries } from '@product-line/dexie';

interface DeactivateUserModalProps {
  showButton?: boolean;
  userId?: string;
  backToCustomers?: boolean;
}

const DeactivateUserModal: React.FC<DeactivateUserModalProps> = ({
  showButton,
  userId,
  backToCustomers,
}) => {
  const navigate = useNavigate();
  const { openDeactivateUserModal, setOpenDeactivateUserModal, currentUser } =
    useUserStore();
  const { usePostDeactivateUserMutation } = useAdminQueries();

  const { mutate } = usePostDeactivateUserMutation({
    userId: userId || currentUser?.userId,
    deactivated: currentUser?.deactivated ? false : true,
  });

  const handleDelete = async () => {
    if (currentUser !== undefined) {
      mutate(
        {},
        {
          onSuccess: () => {
            setOpenDeactivateUserModal(false);
            if (backToCustomers) navigate('/admin');
          },
        }
      );
    }
  };

  return (
    <>
      {showButton && (
        <Button
          variant="solid"
          shape="rounded"
          size="small"
          onClick={() => setOpenDeactivateUserModal(true)}
        >
          <div className="flex items-center">
            <UserRoundXIcon className="h-4 w-4" />
          </div>
        </Button>
      )}
      <Modal
        isOpen={openDeactivateUserModal}
        className="w-[500px]"
        setIsOpen={setOpenDeactivateUserModal}
        text={{
          title: `${currentUser?.deactivated ? 'Activar' : 'Desactivar'} a ${
            userId || currentUser?.data?.displayName || currentUser?.userId
          } `,
          content: `¿Estás seguro de que deseas ${
            currentUser?.deactivated ? 'activar' : 'desactivar'
          } este usuario?`,
        }}
        onSubmit={handleDelete}
      />
    </>
  );
};

export default DeactivateUserModal;
