import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 h-screen">
      <nav>
        <ul>
          <li className="mb-2"><Link href="/painel" className="text-blue-600 hover:underline">Painel de Leads</Link></li>
          <li className="mb-2"><Link href="/upload" className="text-blue-600 hover:underline">Upload de Documento</Link></li>
          <li className="mb-2"><Link href="/documentos/gerador" className="text-blue-600 hover:underline">Gerador de Peças</Link></li>
          {/* Adicionar mais links de navegação conforme necessário */}
        </ul>
      </nav>
    </aside>
  );
}

