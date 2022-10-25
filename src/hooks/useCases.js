import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import * as casesAPI from '@api/cases/methods';
import { useCallback } from 'react';
import { useNotify } from './useNotify';

const {
  fetchCases: fetchCasesAPI,
  createCase: createCaseAPI,
  updateCase: updateCaseAPI,
  handleCaseStateAfterPickupDone: handleCaseStateAfterPickupDoneAPI,
  deleteCase: deleteCaseAPI,
  recoveryCase: recoveryCaseAPI,
} = casesAPI;

export function useCases() {
  const router = useRouter();
  const [cookies] = useCookies();
  const { asyncNotify } = useNotify();

  const fetchCases = useCallback(
    async (params) => {
      try {
        return asyncNotify(fetchCasesAPI(cookies.token, params), {
          pending: 'Obteniendo cases...',
          success: 'Se obtuvieron los cases.',
          error: 'Tuvimos problemas para obtener los cases. Intenta de nuevo.',
        });
      } catch (error) {
        console.log(error);
      }
    },
    [asyncNotify, cookies]
  );

  const createCase = async (data, token) => {
    try {
      const { description, ...rest } = data;
      const res = await asyncNotify(
        createCaseAPI(
          { description: description || undefined, ...rest },
          token
        ),
        {
          pending: 'Creando un case...',
          success: 'Se creó correctamente.',
          error:
            'Tuvimos problemas con la creación del case. Intenta de nuevo.',
        }
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

        return asyncNotify(
          updateCaseAPI(
            caseId,
            { description: description || undefined, ...rest },
            token ?? cookies.token
          ),
          {
            pending: 'Verificando información...',
            success: 'Se actualizó el case correctamente.',
            error: 'Tuvimos problemas al actualizar el case. Intenta de nuevo.',
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    [cookies, asyncNotify]
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

  const deleteCase = async (caseId, token) => {
    try {
      return asyncNotify(deleteCaseAPI(caseId, token ?? cookies.token), {
        pending: 'Inhabilitando el case...',
        success: 'Se inhabilitó el case correctamente.',
        error: {
          render({ data: err }) {
            return (
              err?.response?.data?.message ??
              'Tuvimos problemas para inhabilitar el case. Intenta de nuevo.'
            );
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const recoveryCase = async (caseId) => {
    try {
      return asyncNotify(recoveryCaseAPI(caseId, cookies.token), {
        pending: 'Recuperando el case...',
        success: 'Se recuperó el case correctamente.',
        error: 'Tuvimos problemas para recuperar el case. Intenta de nuevo.',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createCase,
    updateCase,
    handleCaseStateAfterPickupDone,
    deleteCase,
    fetchCases,
    recoveryCase,
  };
}
