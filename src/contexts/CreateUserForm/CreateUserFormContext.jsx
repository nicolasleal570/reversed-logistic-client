import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from '@utils/parseCookies';
import { createUser } from '@api/users/methods';
import { INITIAL_PERMISSIONS } from './initialPermissionsValue';

export const CreateUserFormContext = React.createContext({
  personalInformation: undefined,
});

export default function CreateUserFormContextProvider({ children }) {
  const router = useRouter();
  const [personalInformation, setPersonalInformation] = useState({
    fullName: '',
    email: '',
  });
  const [roleInformation, setRoleInformation] = useState({ role: '' });
  const [permissionsInformation, setPermissionsInformation] =
    useState(INITIAL_PERMISSIONS);

  const onCreateUser = async () => {
    try {
      const data = {
        ...personalInformation,
        password: Math.random().toString(36).slice(2),
        roleId: Number.parseInt(roleInformation.role, 10),
        //...permissionsInformation,
      };

      const { token } = parseCookies() ?? {};

      if (token) {
        await createUser(data, token);
        router.push('/users');
      }
    } catch (error) {
      console.log('[Register User]', error);
    }
  };

  return (
    <CreateUserFormContext.Provider
      value={{
        personalInformation,
        setPersonalInformation,
        roleInformation,
        setRoleInformation,
        permissionsInformation,
        setPermissionsInformation,
        onCreateUser,
      }}
    >
      {children}
    </CreateUserFormContext.Provider>
  );
}
