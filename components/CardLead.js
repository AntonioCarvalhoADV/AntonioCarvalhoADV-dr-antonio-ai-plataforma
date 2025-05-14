export default function CardLead({ lead }) {
  // Exemplo de dados do lead: { id: 1, nome: 'Lead Exemplo', risco: 'Alto', status: 'Novo', consultor: 'N/A' }
  if (!lead) {
    return <p>Carregando lead...</p>;
  }

  return (
    <div className="border rounded-lg p-4 shadow-lg mb-4">
      <h3 className="text-lg font-semibold mb-2">{lead.nome || 'Nome do Lead Indisponível'}</h3>
      <p><strong>Risco:</strong> {lead.risco || 'N/D'}</p>
      <p><strong>Status:</strong> {lead.status || 'N/D'}</p>
      <p><strong>Consultor:</strong> {lead.consultor || 'N/A'}</p>
      {/* Adicionar mais detalhes e ações do lead aqui */}
      <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Ver Detalhes
      </button>
    </div>
  );
}
