import { useTokenStore } from '../store/use-token-store';
import { useApiMutation, useApiQuery } from '..';
import useInitCloudDB from '../../auth/hooks/use-init-cloud-db';

export const usePrescriptionQueries = () => {
  const { tokenData } = useTokenStore();
  const { currentUser } = useInitCloudDB();

  const useGetUserPrescriptions = (owner: string) => {
    const query = useApiQuery({
      id: 'get-prescriptions',
      axiosOptions: {
        method: 'get',
        params: {
          owner: owner,
        },
      },
      queryOptions: {
        enabled: tokenData?.accessToken ? true : false,
      },
    });
    return query;
  };

  const useGetAllUserPrescriptions = () => {
    const query = useApiQuery({
      id: 'get-prescriptions',
      axiosOptions: {
        method: 'get',
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

  return {
    getAllUserPrescriptionsMutation,
    useGetUserPrescriptions,
    useGetAllUserPrescriptions,
  };
};

export default usePrescriptionQueries;
