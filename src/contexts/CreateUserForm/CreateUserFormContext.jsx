import React, { useState } from 'react';
import { INITIAL_PERMISSIONS } from './initialPermissionsValue';
import { parseCookies } from '@utils/parseCookies';
import { createUser } from '@api/methods';

export const CreateUserFormContext = React.createContext({
  personalInformation: undefined,
});

export default function CreateUserFormContextProvider({ children }) {
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
      console.log({ token, data });

      if (token) {
        const { data: msg } = await createUser(data, token);
        console.log(msg);
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