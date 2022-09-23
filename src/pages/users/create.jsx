import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { CustomSidebar } from '@components/CustomSidebar/CustomSidebar';
import { PersonalInformation } from '@components/CreateUser/PersonalInformation';
import { AssignRole } from '@components/CreateUser/AssignRole';
import { AssignPermissions } from '@components/CreateUser/AssignPermissions/AssignPermissions';
import { CreateUserSummary } from '@components/CreateUser/CreateUserSummary/CreateUserSummary';
import CreateUserFormContextProvider from '@contexts/CreateUserForm/CreateUserFormContext';
import { fetchRoles } from '@api/roles/methods';
import { parseCookies } from '@utils/parseCookies';
import { useFormStepper } from '@hooks/useFormStepper';
import { fetchPermissions } from '@api/permissions/methods';

const steps = [
  {
    title: 'Información personal',
    description: 'Ingresa toda la información personal respectiva del usuario',
  },
  {
    title: 'Asigna un rol', description: 'Asigna el rol del empleado',
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

function CreateUserPage({ roles, permissions }) {
  const { currentStep, onChangeStep } = useFormStepper(steps);

  return (
    <CreateUserFormContextProvider>
      <Layout
        title={steps[currentStep].title}
        description={steps[currentStep].description}
        customSubSidebar={
          <CustomSidebar
            currentStep={currentStep}
            steps={steps}
            title="Crea un usuario"
          />
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
            permissions={permissions}
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
  let permissions = [];
  if (data.token) {
    try {
      const res = await fetchRoles(data.token);
      const { data: permissionsData } = await fetchPermissions(data.token);
      roles = res.data;
      permissions = permissionsData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    roles: roles ?? [],
    permissions: permissions ?? [],
  };
};

export default withProtection(CreateUserPage);
