import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { UserForm } from '@components/UserForm/UserForm';

function CreateUserPage() {
  return (
    <Layout
      title="Crea un empleado"
      description="A continuación podrás crear un nuevo empleado para tu empresa"
    >
      <UserForm />
    </Layout>
  );
}

export default withProtection(CreateUserPage);
