import withAuth from "../../contexts/withAuth";
import Layout from "../../components/Layout";
import { useState } from "react";

function GeradorPecasPage() {
  const [templateSelecionado, setTemplateSelecionado] = useState('');
  const [dadosVariaveis, setDadosVariaveis] = useState({});
  const [pecaGeradaPreview, setPecaGeradaPreview] = useState(''); // Para preview em texto, se mantido
  const [processando, setProcessando] = useState(false);
  const [erro, setErro] = useState('');

  const templatesDisponiveis = [
    { id: 'peticao_inicial_simples', nome: 'Petição Inicial Simples' },
    { id: 'notificacao_extrajudicial', nome: 'Notificação Extrajudicial' },
  ];

  const handleTemplateChange = (event) => {
    setTemplateSelecionado(event.target.value);
    setDadosVariaveis({});
    setPecaGeradaPreview('');
    setErro('');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDadosVariaveis(prev => ({ ...prev, [name]: value }));
  };

  const handleGerarPecaReal = async () => {
    if (!templateSelecionado) {
      alert("Por favor, selecione um template.");
      return;
    }
    setProcessando(true);
    setPecaGeradaPreview('');
    setErro('');

    // URL do backend Flask. Ajustar conforme necessário (ex: variável de ambiente)
    // Para desenvolvimento local, se o Next.js está em 3000 e Flask em 5000, 
    // pode ser necessário configurar um proxy no Next.js ou usar a URL completa.
    // Por simplicidade, vamos assumir que o backend está acessível em /api/flask/
    // que seria configurado no next.config.js para proxy reverso para o Flask.
    // Ou, para teste direto, usar a URL completa do Flask se estiver em outro domínio/porta.
    // const backendUrl = 'http://localhost:5000/api/v1/gerador-pecas/gerar-peca';
    // Para fins de deploy no Render, o frontend e backend podem estar em serviços diferentes.
    // Vamos usar uma URL relativa assumindo que o Next.js pode fazer proxy para o Flask backend.
    // Esta URL precisará ser ajustada para o ambiente de produção.
    const apiUrl = 'https://render-yaml-9fjq.onrender.com/api/v1/gerador-pecas/gerar-peca';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Adicionar token de autenticação se o backend Flask o exigir
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          template_id: templateSelecionado,
          dados_variaveis: dadosVariaveis,
          formato_saida: 'docx'
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `${templateSelecionado}_gerada.docx`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
        // Opcional: Mostrar uma mensagem de sucesso
        // setPecaGeradaPreview("Documento .docx gerado e download iniciado."); 
      } else {
        const errorData = await response.json();
        setErro(errorData.error || `Erro ao gerar documento: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erro na requisição ao backend:", error);
      setErro(`Erro de conexão ao tentar gerar o documento: ${error.message}`);
    }
    setProcessando(false);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-6">Geração Inteligente de Peças Processuais</h1>
        
        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Erro:</strong>
            <span className="block sm:inline"> {erro}</span>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">Selecione o Template:</label>
          <select 
            id="template"
            value={templateSelecionado}
            onChange={handleTemplateChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">-- Escolha um template --</option>
            {templatesDisponiveis.map(template => (
              <option key={template.id} value={template.id}>{template.nome}</option>
            ))}
          </select>
        </div>

        {templateSelecionado && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Dados Variáveis para: {templatesDisponiveis.find(t => t.id === templateSelecionado)?.nome}</h2>
            
            {templateSelecionado === 'peticao_inicial_simples' && (
              <>
                <div className="mb-4">
                  <label htmlFor="nomeAutor" className="block text-sm font-medium text-gray-700">Nome do Autor:</label>
                  <input type="text" name="nomeAutor" id="nomeAutor" value={dadosVariaveis.nomeAutor || ''} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4">
                  <label htmlFor="nomeReu" className="block text-sm font-medium text-gray-700">Nome do Réu:</label>
                  <input type="text" name="nomeReu" id="nomeReu" value={dadosVariaveis.nomeReu || ''} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4">
                  <label htmlFor="objetoAcao" className="block text-sm font-medium text-gray-700">Objeto da Ação:</label>
                  <textarea name="objetoAcao" id="objetoAcao" rows="3" value={dadosVariaveis.objetoAcao || ''} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="valorCausa" className="block text-sm font-medium text-gray-700">Valor da Causa (R$):</label>
                  <input type="number" name="valorCausa" id="valorCausa" value={dadosVariaveis.valorCausa || ''} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2" />
                </div>
                 <div className="mb-4">
                  <label htmlFor="nome_advogado" className="block text-sm font-medium text-gray-700">Nome do Advogado:</label>
                  <input type="text" name="nome_advogado" id="nome_advogado" value={dadosVariaveis.nome_advogado || ''} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2" />
                </div>
                 <div className="mb-4">
                  <label htmlFor="oab_advogado" className="block text-sm font-medium text-gray-700">OAB/UF do Advogado:</label>
                  <input type="text" name="oab_advogado" id="oab_advogado" value={dadosVariaveis.oab_advogado || ''} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2" />
                </div>
              </>
            )}
            {templateSelecionado === 'notificacao_extrajudicial' && (
              <>
                <div className="mb-4">
                  <label htmlFor="nomeNotificante" className="block text-sm font-medium text-gray-700">Nome do Notificante:</label>
                  <input type="text" name="nomeNotificante" id="nomeNotificante" value={dadosVariaveis.nomeNotificante || ''} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4">
                  <label htmlFor="nomeNotificado" className="block text-sm font-medium text-gray-700">Nome do Notificado:</label>
                  <input type="text" name="nomeNotificado" id="nomeNotificado" value={dadosVariaveis.nomeNotificado || ''} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4">
                  <label htmlFor="enderecoNotificado" className="block text-sm font-medium text-gray-700">Endereço do Notificado:</label>
                  <input type="text" name="enderecoNotificado" id="enderecoNotificado" value={dadosVariaveis.enderecoNotificado || ''} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4">
                  <label htmlFor="objetoNotificacao" className="block text-sm font-medium text-gray-700">Objeto da Notificação:</label>
                  <textarea name="objetoNotificacao" id="objetoNotificacao" rows="3" value={dadosVariaveis.objetoNotificacao || ''} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"></textarea>
                </div>
                 <div className="mb-4">
                  <label htmlFor="prazoNotificacao" className="block text-sm font-medium text-gray-700">Prazo para Resposta/Cumprimento:</label>
                  <input type="text" name="prazoNotificacao" id="prazoNotificacao" value={dadosVariaveis.prazoNotificacao || ''} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2" />
                </div>
              </>
            )}

            <button 
              onClick={handleGerarPecaReal} // Alterado para chamar a função real
              disabled={processando}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {processando ? 'Gerando Documento...' : 'Gerar Documento (.docx)'}
            </button>
          </div>
        )}

        {/* A preview em textarea pode ser removida ou adaptada, já que o foco é o download do .docx */}
        {pecaGeradaPreview && (
          <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Status:</h3>
            <textarea 
              readOnly 
              value={pecaGeradaPreview} 
              className="w-full h-20 p-3 border border-gray-300 rounded-md bg-white text-sm font-mono"
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default withAuth(GeradorPecasPage);

