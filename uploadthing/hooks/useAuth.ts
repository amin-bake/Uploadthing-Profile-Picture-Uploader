// hooks/useAuth.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuth = (redirectPath: string) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // If no token is present, redirect to the specified path
    if (!token) {
      router.push(redirectPath);
    }
  }, [router, redirectPath]);

  return;
};

export default useAuth;
