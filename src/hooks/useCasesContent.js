import { useRouter } from 'next/router';
import * as casesAPI from '@api/cases/methods';

const {
  createCaseContent: createCaseContentAPI,
  updateCaseContent: updateCaseContentAPI,
} = casesAPI;

export function useCasesContent() {
  const router = useRouter();

  const createCaseContent = async (data, token) => {
    try {
      const { description, ...rest } = data;
      const res = await createCaseContentAPI(
        { description: description || undefined, ...rest },
        token
      );

      router.push(`/flavors/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCaseContent = async (caseId, data, token, onFinish) => {
    try {
      const { description, ...rest } = data;
      const res = await updateCaseContentAPI(
        caseId,
        { description: description || undefined, ...rest },
        token
      );

      onFinish && onFinish();
    } catch (error) {
      console.log(error);
    }
  };

  return { createCaseContent, updateCaseContent };
}
