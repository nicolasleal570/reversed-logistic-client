import { useRouter } from 'next/router';
import {
  createProcessStep as createProcessStepMethod,
  updateProcessStep as updateProcessStepMethod,
} from '@api/process-steps/methods';
import { useNotify } from './useNotify';

export function useProcessStep() {
  const router = useRouter();
  const { asyncNotify } = useNotify();

  const createProcessStep = async (data, token) => {
    try {
      const { description, ...rest } = data;
      const res = await asyncNotify(
        createProcessStepMethod(
          { description: description || undefined, ...rest },
          token
        ),
        {
          pending: 'Creando paso de limpieza...',
          success: 'Se creó un nuevo paso de limpieza correctamente',
          error:
            'Tuvimos problemas creando el paso de limpieza. Intenta de nuevo.',
        }
      );

      router.push(`/clean-steps/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProcessStep = async (caseId, data, token) => {
    try {
      const { description, ...rest } = data;

      return asyncNotify(
        updateProcessStepMethod(
          caseId,
          { description: description || undefined, ...rest },
          token
        ),
        {
          pending: 'Valindando información...',
          success: 'Se actualizó el  paso de limpieza correctamente',
          error:
            'Tuvimos problemas actualizando el paso de limpieza. Intenta de nuevo.',
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return { createProcessStep, updateProcessStep };
}
