import Modal from 'libs/ui/src/components/modal';
import { useAuthStore } from '../hooks/use-auth-store';
import useInitCloudDB from '../hooks/use-init-cloud-db';

export const UserDataModal = () => {
  const { openUserDataModal, setOpenUserDataModal } = useAuthStore();
  const { currentUser } = useInitCloudDB();

  return (
    <Modal
      isOpen={openUserDataModal}
      setIsOpen={setOpenUserDataModal}
      className="w-1/3"
      text={{
        title: 'Datos del usuario',
      }}
      hideButtons
    >
      <div>
        <h1>Email: {currentUser?.email}</h1>
        <h1>User ID: {currentUser?.userId}</h1>
      </div>
    </Modal>
  );
};

export default UserDataModal;
