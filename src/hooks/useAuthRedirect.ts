import { useEffect } from 'react';

export function useAuthRedirect() {
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('forza_logged_in') === 'true';
    if (!isLoggedIn) {

      const currentPath = window.location.pathname;
      window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
    }
  }, []);

  return null;
}