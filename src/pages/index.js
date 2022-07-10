import { useRouter } from 'next/router';
import { withProtection } from '@components/withProtection';

function HomePage() {
  const router = useRouter();

  return (
    <h1 className="text-3xl font-bold underline bg-red-400">
      HOLA MUNDO!
      <button
        className="text-3xl font-bold underline bg-red-400"
        onClick={() => {
          router.push('/about');
        }}
      >
        HOLA MUNDO!
      </button>
    </h1>
  );
}

export default withProtection(HomePage);
