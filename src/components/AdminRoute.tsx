import { useEffect } from 'preact/hooks';
import { useUser } from '../hooks/useUser.ts';

interface AdminRouteProps {
  children: preact.ComponentChildren;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && (!user || user.role === 0)) {
      globalThis.location.replace('/');
    }
  }, [user, loading]);

  if (loading) return null;

  return <>{children}</>;
}
