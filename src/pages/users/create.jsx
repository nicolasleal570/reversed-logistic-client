import { useState } from 'react';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { CustomSidebar } from '@components/CreateUser/CustomSidebar';
import { PersonalInformation } from '@components/CreateUser/PersonalInformation';
import { AssignRole } from '@components/CreateUser/AssignRole';
import { AssignPermissions } from '@components/CreateUser/AssignPermissions/AssignPermissions';
import { CreateUserSummary } from '@components/CreateUser/CreateUserSummary/CreateUserSummary';
import CreateUserFormContextProvider from '@contexts/CreateUserForm/CreateUserFormContext';
import { fetchRoles } from '@api/methods';
import { parseCookies } from '@utils/parseCookies';

const steps = [
  {
    title: 'Información personal',
    description: 'Ingresa toda la información personal respectiva del usuario',
  },
  {
    title: 'Asigna un rol',
    description: 'Asigna el rol del empleado',
  },
  {
    title: 'Asigna permisos',
    description:
      'Asigna los permisos del empleado sobre los módulos de la empresa',
  },
  {
    title: 'Resúmen de los datos',
    description:
      'Aquí se muestra un resúmen de los datos que ingresaste para el nuevo empleado.',
  },
];

function CreateUserPage({ roles }) {
  const [currentStep, setCurrentStep] = useState(0);

  const onChangeStep = (step) => {
    const nextStep = step ?? currentStep + 1;
    if (steps[nextStep]) {
      setCurrentStep(nextStep);
    }
  };

  return (
    <CreateUserFormContextProvider>
      <Layout
        title={steps[currentStep].title}
        description={steps[currentStep].description}
        customSubSidebar={
          <CustomSidebar currentStep={currentStep} steps={steps} />
        }
      >
        {currentStep === 0 && (
          <PersonalInformation
            currentStep={currentStep}
            onChangeStep={onChangeStep}
          />
        )}
        {currentStep === 1 && (
          <AssignRole
            roles={roles}
            currentStep={currentStep}
            onChangeStep={onChangeStep}
          />
        )}
        {currentStep === 2 && (
          <AssignPermissions
            currentStep={currentStep}
            onChangeStep={onChangeStep}
          />
        )}
        {currentStep === 3 && (
          <CreateUserSummary
            roles={roles}
            currentStep={currentStep}
            onChangeStep={onChangeStep}
          />
        )}
      </Layout>
    </CreateUserFormContextProvider>
  );
}

CreateUserPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let roles = [];
  if (data.token) {
    try {
      const res = await fetchRoles(data.token);
      roles = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    roles: roles ?? [],
  };
};

export default withProtection(CreateUserPage);
