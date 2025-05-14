import { useState, useEffect } from 'react';
import Link from 'next/link';
import CardLead from '../components/CardLead';
import withAuth from '../contexts/withAuth'; // Importar o HOC

function PainelPage() { // Renomear para que o HOC possa envolvê-la
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const leadsArmazenados = JSON.parse(localStorage.getItem('leadsGerados') || '[]');
      setLeads(leadsArmazenados.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao)));
      setLoading(false);
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Painel de Leads</h1>
        <Link href="/upload" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Novo Upload
        </Link>
      </div>

      {loading && <p>Carregando leads...</p>}

      {!loading && leads.length === 0 && (
        <p className="text-gray-600">Nenhum lead encontrado. Faça um <Link href="/upload" className="text-blue-600 hover:underline">novo upload</Link> para começar.</p>
      )}

      {!loading && leads.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.map(lead => (
            <div key={lead.id}>
              <CardLead lead={lead} />
              <Link href={`/documento/${lead.id}`} className="mt-1 inline-block text-sm text-blue-600 hover:underline">
                Ver detalhes do documento
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default withAuth(PainelPage); // Envolver a página com o HOC
