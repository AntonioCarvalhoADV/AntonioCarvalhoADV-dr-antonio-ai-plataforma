import { useAuth } from "../contexts/AuthContext";
import Link from 'next/link';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-xl hover:text-gray-300">Plataforma Dr. Antonio AI</a>
        </Link>
        {user && (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sair
          </button>
        )}
      </div>
    </header>
  );
}

