import { useMemo } from 'react';
import { toast } from 'react-toastify';

export function useNotify() {
  const kind = useMemo(
    () => ({
      success: (msg, params) => toast.success(msg, params),
      error: (msg, params) => toast.error(msg, params),
      warn: (msg, params) => toast.warn(msg, params),
      info: (msg, params) => toast.info(msg, params),
      custom: (msg, params) => toast.custom(msg, params),
    }),
    []
  );

  const notify = async (kindKey, msg, params = {}) => {
    if (kind[kindKey]) {
      kind[kindKey](msg, params);
    }
  };

  const asyncNotify = async (promise, { pending, success, error }) => {
    return toast.promise(promise, { pending, success, error });
  };

  return {
    notify,
    asyncNotify,
  };
}
