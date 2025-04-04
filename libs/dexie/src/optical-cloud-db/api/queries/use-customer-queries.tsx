import { useApiQuery } from '../api';
import { useTokenStore } from '../store/use-token-store';
import useInitCloudDB from '../../auth/hooks/use-init-cloud-db';

export const useCustomerQueries = () => {
  const { tokenData } = useTokenStore();
  const { currentUser } = useInitCloudDB();

  const useGetCustomers = (owner?: string) => {
    const query = useApiQuery({
      id: 'get-customers',
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

  const customers = useGetCustomers(currentUser?.email);

  return {
    customers,
    useGetCustomers,
  };
};

export default useCustomerQueries;
