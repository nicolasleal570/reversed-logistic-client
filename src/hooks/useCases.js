import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import * as casesAPI from '@api/cases/methods';
import { useCallback } from 'react';
import { useNotify } from './useNotify';

const {
  createCase: createCaseAPI,
  updateCase: updateCaseAPI,
  handleCaseStateAfterPickupDone: handleCaseStateAfterPickupDoneAPI,
} = casesAPI;

export function useCases() {
  const router = useRouter();
  const [cookies] = useCookies();
  const { asyncNotify } = useNotify();

  const createCase = async (data, token) => {
    try {
      const { description, ...rest } = data;
      const res = await createCaseAPI(
        { description: description || undefined, ...rest },
        token
      );

      router.push(`/cases/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCase = useCallback(
    async (caseId, data, token) => {
      try {
        const { description, ...rest } = data;
        return updateCaseAPI(
          caseId,
          { description: description || undefined, ...rest },
          token ?? cookies.token
        );
      } catch (error) {
        console.log(error);
      }
    },
    [cookies]
  );

  const handleCaseStateAfterPickupDone = async (caseId, data, token) => {
    try {
      return asyncNotify(
        handleCaseStateAfterPickupDoneAPI(caseId, data, token),
        {
          pending: 'Verificando estatus...',
          success: 'Se guardo el estatus correctamente.',
          error: 'Tuvimos problemas verificando el estatus. Intenta de nuevo.',
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return { createCase, updateCase, handleCaseStateAfterPickupDone };
}
