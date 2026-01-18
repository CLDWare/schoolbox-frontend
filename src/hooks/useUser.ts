import { useEffect, useState } from 'preact/hooks';

interface UserData {
  id: number;
  email: string;
  google_sub: string;
  role: number;
  joinedAt: string;
  name: string;
  display_name: string;
  default_question: string;
}

interface ApiResponse {
  status: number;
  success: boolean;
  message: string;
  data: UserData;
  timestamp: string;
}

export function useUser() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/me')
      .then(async (response) => {
        const data: ApiResponse = await response.json();
        if (data.success && data.status === 200) {
          setUser(data.data);
        } else {
          setError(data.message || 'Unknown error');
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { user, loading, error };
}