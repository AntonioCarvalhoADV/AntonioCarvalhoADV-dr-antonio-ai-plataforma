import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace('/login');
      }
    }, [user, loading, router]);

    if (loading || !user) {
      // Pode mostrar um spinner de carregamento aqui enquanto verifica a autenticação
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <p className="text-gray-700 text-xl">Carregando...</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

