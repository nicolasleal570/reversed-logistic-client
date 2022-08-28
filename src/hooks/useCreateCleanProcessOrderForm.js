import { useContext } from 'react';
import { CreateCleanProcessOrderFormContext } from '@contexts/CreateCleanProcessOrderFormContent/CreateCleanProcessOrderFormContext';

export function useCreateCleanProcessOrderForm() {
  const context = useContext(CreateCleanProcessOrderFormContext);

  return context;
}
