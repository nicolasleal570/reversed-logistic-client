import { useContext } from 'react';
import { UserContext } from '@contexts/UserContext/UserContext';

export function useUser() {
  const { user, setUser, loading, setLoading } = useContext(UserContext);

  return { user, setUser, loading, setLoading };
}
