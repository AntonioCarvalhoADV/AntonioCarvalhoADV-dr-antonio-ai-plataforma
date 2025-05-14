import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import withAuth from "../../contexts/withAuth"; // Corrigido o caminho para o HOC

function DocumentoPage() { // Renomear para que o HOC possa envolvê-la
  const router = useRouter();
  const { id } = router.query;
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && typeof window !== "undefined") {
      const leadsArmazenados = JSON.parse(localStorage.getItem("leadsGerados") || "[]");
      const leadEncontrado = leadsArmazenados.find(l => l.id === id);
      setLead(leadEncontrado);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <p className="p-4">Carregando detalhes do documento...</p>;
  }

  if (!lead) {
    return (
      <div className="p-4">
        <p className="text-red-600">Lead não encontrado.</p>
        <Link href="/painel" className="text-blue-600 hover:underline">
          Voltar ao Painel de Leads
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Detalhes do Documento: {lead.nomeDocumento}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3">Lead ID: {lead.id}</h2>
        <p className="mb-1"><strong>Cliente Potencial:</strong> {lead.clientePotencial}</p>
        <p className="mb-1"><strong>Status:</strong> {lead.status}</p>
        <p className="mb-1"><strong>Risco:</strong> {lead.risco}</p>
        <p className="mb-1"><strong>Consultor Atribuído:</strong> {lead.consultorAtribuido || "N/A"}</p>
        <p className="mb-1"><strong>Data de Criação:</strong> {new Date(lead.dataCriacao).toLocaleString()}</p>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Resumo do Documento:</h3>
        <p className="text-gray-700 mb-3 whitespace-pre-wrap">{lead.detalhesCompletos?.resumoCompleto || "Resumo não disponível."}</p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Entidades Extraídas:</h3>
        {lead.detalhesCompletos?.entidades && lead.detalhesCompletos.entidades.length > 0 ? (
          <ul className="list-disc list-inside mb-3">
            {lead.detalhesCompletos.entidades.map((entidade, index) => (
              <li key={index}><strong>{entidade.tipo}:</strong> {entidade.texto}</li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma entidade extraída.</p>
        )}

        <h3 className="text-lg font-semibold mt-4 mb-2">Classificação do Documento:</h3>
        {lead.detalhesCompletos?.classificacao ? (
          <div className="mb-3">
            <p><strong>Tipo:</strong> {lead.detalhesCompletos.classificacao.tipo}</p>
            <p><strong>Área:</strong> {lead.detalhesCompletos.classificacao.area}</p>
            <p><strong>Tags:</strong> {lead.detalhesCompletos.classificacao.tags?.join(", ")}</p>
          </div>
        ) : (
          <p>Classificação não disponível.</p>
        )}
        
        <div className="mt-6">
          <Link href="/painel" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Voltar ao Painel de Leads
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withAuth(DocumentoPage); // Envolver a página com o HOC
