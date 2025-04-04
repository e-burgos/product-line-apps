import { useTokenStore } from '../store/use-token-store';
import { useApiMutation, useApiQuery } from '..';
import useInitCloudDB from '../../auth/hooks/use-init-cloud-db';

export const usePrescriptionQueries = () => {
  const { tokenData } = useTokenStore();
  const { currentUser } = useInitCloudDB();

  const useGetUserPrescriptions = () => {
    const query = useApiQuery({
      id: 'get-user-prescriptions',
      axiosOptions: {
        method: 'get',
      },
      queryOptions: {
        enabled: tokenData?.accessToken ? true : false,
      },
    });
    return query;
  };

  const useGetAllUserPrescriptions = (owner?: string) => {
    const query = useApiQuery({
      id: 'get-prescriptions',
      axiosOptions: {
        method: 'get',
        params: {
          owner: owner || tokenData?.claims?.email || currentUser?.email,
        },
      },
      queryOptions: {
        enabled: tokenData?.accessToken ? true : false,
      },
    });
    return query;
  };

  const getAllUserPrescriptionsMutation = useApiMutation({
    id: 'get-prescriptions',
    axiosOptions: {
      method: 'get',
    },
  });

  const userPrescriptions = useGetUserPrescriptions();
  const allUserPrescriptions = useGetAllUserPrescriptions();

  return {
    userPrescriptions,
    allUserPrescriptions,
    getAllUserPrescriptionsMutation,
    useGetUserPrescriptions,
    useGetAllUserPrescriptions,
  };
};

export default usePrescriptionQueries;
