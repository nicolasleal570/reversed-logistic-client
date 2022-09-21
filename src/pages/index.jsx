import { withProtection } from '@components/withProtection';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function IndexPage() {
  const router = useRouter();

  useEffect(() => router.push('/home'), [router]);

  return null;
}

export default withProtection(IndexPage);
