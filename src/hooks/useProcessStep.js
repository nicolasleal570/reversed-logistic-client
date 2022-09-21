import { useRouter } from 'next/router';
import {
  createProcessStep as createProcessStepMethod,
  updateProcessStep as updateProcessStepMethod,
} from '@api/process-steps/methods';

export function useProcessStep() {
  const router = useRouter();

  const createProcessStep = async (data, token) => {
    try {
      const { description, ...rest } = data;
      const res = await createProcessStepMethod(
        { description: description || undefined, ...rest },
        token
      );

      router.push(`/clean-steps/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProcessStep = async (caseId, data, token, onFinish) => {
    try {
      const { description, ...rest } = data;
      await updateProcessStepMethod(
        caseId,
        { description: description || undefined, ...rest },
        token
      );

      onFinish && onFinish();
    } catch (error) {
      console.log(error);
    }
  };

  return { createProcessStep, updateProcessStep };
}
