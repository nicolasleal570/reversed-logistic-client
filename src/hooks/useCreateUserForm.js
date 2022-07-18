import { useContext } from 'react';
import { CreateUserFormContext } from '@contexts/CreateUserForm/CreateUserFormContext';

export function useCreateUserForm() {
  const context = useContext(CreateUserFormContext);

  return context;
}
