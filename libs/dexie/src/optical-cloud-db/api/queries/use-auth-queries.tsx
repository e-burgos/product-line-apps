import { useCallback } from 'react';
import { useTokenStore } from '../store/use-token-store';
import { useApiMutation, useApiQuery } from '..';
import { dexieClientId, dexieClientSecret } from '../../const';
import { TokenFinalResponse } from '../types/apiTypes';

export const useAuthQueries = () => {
  const { setTokenData, tokenData } = useTokenStore();

  const postTokenMutation = useApiMutation({
    id: 'post-token',
    auth: 'none',
    axiosOptions: {
      method: 'post',
      data: {
        grant_type: 'client_credentials',
        scopes: ['ACCESS_DB'],
        client_id: dexieClientId,
        client_secret: dexieClientSecret,
      },
    },
    mutationOptions: {
      onSuccess: (data) => {
        setTokenData(data?.data as TokenFinalResponse);
        console.info('Token creado correctamente.');
      },
      onError: (error) => {
        console.error('Error al crear token:', error?.response?.data?.message);
      },
    },
  });

  const postAdminTokenMutation = useApiMutation({
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
        setTokenData(data?.data as TokenFinalResponse);
        console.info('Token de administrador creado correctamente.');
      },
      onError: (error) => {
        console.error(
          'Error al crear token de administrador:',
          error?.response?.data?.message
        );
      },
    },
  });

  const postToken = useCallback(
    (params: { isAdmin: boolean }) => {
      return params.isAdmin ? postAdminTokenMutation : postTokenMutation;
    },
    [postAdminTokenMutation, postTokenMutation]
  );

  const getToken = useCallback(() => {
    postToken({ isAdmin: false }).mutate({});
  }, [postToken]);

  const getAdminToken = useCallback(() => {
    postToken({ isAdmin: true }).mutate({});
  }, [postToken]);

  const getValidatedToken = useApiMutation({
    id: 'get-token-validate',
    axiosOptions: {
      method: 'get',
    },
    mutationOptions: {
      onSuccess: () => {
        console.info('Token validado correctamente.');
      },
      onError: (error) => {
        console.error(
          'Error al validar token:',
          error?.response?.data?.message
        );
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

  // useEffect(() => {
  //   verifiedTokenMutation();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
    getValidatedToken,
    getAllUsersMutation,
    getAllUsers,
    getAllUserPrescriptions,
    verifiedTokenMutation,
    usePostDeactivateUserMutation,
    getToken,
    getAdminToken,
  };
};

export default useAuthQueries;
