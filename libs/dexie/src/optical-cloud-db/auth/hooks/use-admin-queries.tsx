import { useToastStore } from 'libs/ui/src/hooks';
import { useAdminStore } from './use-admin-store';
import { useApiMutation, useApiQuery } from '../../api';
import { dexieClientId, dexieClientSecret } from '../../const';
import { useCallback, useEffect } from 'react';

export const useAdminQueries = () => {
  const { addToast } = useToastStore();
  const { setTokenData, tokenData } = useAdminStore();

  const postToken = useApiMutation({
    id: 'post-token',
    auth: 'none',
    axiosOptions: {
      method: 'post',
      data: {
        grant_type: 'client_credentials',
        scopes: [
          'ACCESS_DB',
          'IMPERSONATE',
          'MANAGE_DB',
          'GLOBAL_READ',
          'GLOBAL_WRITE',
          'DELETE_DB',
        ],
        client_id: dexieClientId,
        client_secret: dexieClientSecret,
      },
    },
    mutationOptions: {
      onSuccess: (data) => {
        setTokenData(data?.data);
        addToast({
          id: 'api-success',
          variant: 'success',
          title: 'Token Creado',
          message: 'El token ha sido creado con éxito',
        });
      },
      onError: (error) => {
        addToast({
          id: 'api-error',
          variant: 'destructive',
          title: 'Error Crear Token',
          message: error?.response?.data?.message || 'Error al crear token',
        });
      },
    },
  });

  const getToken = useCallback(() => {
    postToken.mutate({});
  }, [postToken]);

  const getValidatedToken = useApiMutation({
    id: 'get-token-validate',
    axiosOptions: {
      method: 'get',
    },
    mutationOptions: {
      onSuccess: () => {
        addToast({
          id: 'api-success',
          variant: 'success',
          title: 'Token Validado',
          message: 'Token validado con éxito',
        });
      },
      onError: (error) => {
        addToast({
          id: 'api-error',
          variant: 'destructive',
          title: 'Error Validar Token',
          message: error?.response?.data?.message || 'Error al validar token',
        });
        getToken();
      },
    },
  });

  const getValidatedTokenMutation = useCallback(() => {
    getValidatedToken.mutate({});
  }, [getValidatedToken]);

  const verifiedTokenMutation = useCallback(() => {
    if (tokenData === null) getToken();
    if (tokenData !== null) getValidatedTokenMutation();
    if (
      tokenData?.accessTokenExpiration &&
      tokenData?.accessTokenExpiration < Date.now()
    )
      getToken();
  }, [getToken, getValidatedTokenMutation, tokenData]);

  useEffect(() => {
    verifiedTokenMutation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllUsersMutation = useApiMutation({
    id: 'get-users',
    axiosOptions: {
      method: 'get',
    },
  });

  const getAllUsers = useApiQuery({
    id: 'get-users',
    axiosOptions: {
      method: 'get',
    },
    queryOptions: {
      enabled: tokenData?.accessToken ? true : false,
    },
  });

  const getAllUserPrescriptions = useApiMutation({
    id: 'get-user-prescriptions',
    axiosOptions: {
      method: 'get',
    },
  });

  const usePostDeactivateUserMutation = (payload: {
    userId: string;
    deactivated: boolean;
  }) => {
    return useApiMutation({
      id: 'post-users',
      invalidateQueriesByIds: ['get-users'],
      axiosOptions: {
        method: 'post',
        data: [
          {
            userId: payload.userId,
            deactivated: payload.deactivated,
          },
        ],
      },
    });
  };

  return {
    tokenData,
    getValidatedToken,
    verifiedTokenMutation,
    getAllUsersMutation,
    getAllUsers,
    usePostDeactivateUserMutation,
    getAllUserPrescriptions,
  };
};

export default useAdminQueries;
