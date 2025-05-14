import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
      {/* Footer pode ser adicionado aqui se necessário */}
    </div>
  );
}
