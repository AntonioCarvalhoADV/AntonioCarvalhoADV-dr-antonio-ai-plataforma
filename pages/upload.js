import { useState } from 'react';
import { extrairTextoDocumento } from '../services/nepService.js';
import { analisarTextoComNLP } from '../services/nlpService.js';
import Link from 'next/link';
import withAuth from '../contexts/withAuth'; // Importar o HOC

function UploadPage() { // Renomear para que o HOC possa envolvê-la
  const [arquivo, setArquivo] = useState(null);
  const [processando, setProcessando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const handleFileChange = (event) => {
    setArquivo(event.target.files[0]);
    setResultado(null);
    setErro('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!arquivo) {
      setErro('Por favor, selecione um arquivo.');
      return;
    }

    setProcessando(true);
    setErro('');
    setResultado(null);

    try {
      const resultadoNep = await extrairTextoDocumento(arquivo);
      if (!resultadoNep.success) {
        throw new Error('Falha ao extrair texto do documento (NEP Mock).');
      }

      const resultadoNlp = await analisarTextoComNLP(resultadoNep.texto);
      if (!resultadoNlp.success) {
        throw new Error('Falha ao analisar texto com NLP (NLP Mock).');
      }

      if (typeof window !== 'undefined') {
        const leadsAtuais = JSON.parse(localStorage.getItem('leadsGerados') || '[]');
        leadsAtuais.push(resultadoNlp.lead);
        localStorage.setItem('leadsGerados', JSON.stringify(leadsAtuais));
      }

      setResultado({
        nep: resultadoNep,
        nlp: resultadoNlp,
      });

    } catch (e) {
      console.error("Erro no processamento:", e);
      setErro(e.message || 'Ocorreu um erro ao processar o documento.');
    } finally {
      setProcessando(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Upload de Documento</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 mb-1">
            Selecione o documento (PDF, DOCX, TXT):
          </label>
          <input 
            type="file" 
            id="fileUpload"
            onChange={handleFileChange} 
            accept=".pdf,.docx,.txt"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
          />
        </div>
        <button 
          type="submit" 
          disabled={processando || !arquivo}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {processando ? 'Processando...' : 'Enviar e Analisar Documento'}
        </button>
      </form>

      {erro && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 border border-red-400 rounded-md">
          <p className="font-semibold">Erro:</p>
          <p>{erro}</p>
        </div>
      )}

      {resultado && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-md">
          <h2 className="text-xl font-semibold mb-3">Processamento Concluído!</h2>
          <p className="mb-2">O documento foi processado e um novo lead foi gerado.</p>
          <p className="font-semibold">ID do Lead Gerado: {resultado.nlp.lead.id}</p>
          <div className="mt-4">
            <Link href="/painel" className="text-blue-600 hover:underline">
              Ver Painel de Leads
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(UploadPage); // Envolver a página com o HOC
