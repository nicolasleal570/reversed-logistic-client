import { useRouter } from 'next/router';
import * as casesAPI from '@api/cases/methods';

const { createCase: createCaseAPI, updateCase: updateCaseAPI } = casesAPI;

export function useCases() {
  const router = useRouter();

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

  const updateCase = async (caseId, data, token, onFinish) => {
    try {
      const { description, ...rest } = data;
      const res = await updateCaseAPI(
        caseId,
        { description: description || undefined, ...rest },
        token
      );

      onFinish && onFinish();
    } catch (error) {
      console.log(error);
    }
  };

  return { createCase, updateCase };
}
