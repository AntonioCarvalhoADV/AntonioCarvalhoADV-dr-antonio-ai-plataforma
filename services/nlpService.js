// services/nlpService.js

// Simula a análise de texto pela API NLP.
// Em um cenário real, isso faria uma chamada de API para o backend NLP/IA Manus.
export const analisarTextoComNLP = async (textoDocumento) => {
  console.log("NLP Service (Mock): Recebido texto para análise:", textoDocumento.substring(0, 100) + "...");

  // Simula um tempo de processamento
  await new Promise(resolve => setTimeout(resolve, 2500));

  // Simula a extração de entidades, resumo e classificação
  const entidadesExtraidas = [
    { tipo: "PESSOA", texto: "Dr. Antonio Carvalho" },
    { tipo: "ORGANIZACAO", texto: "Manus IA" },
    { tipo: "LOCAL", texto: "São Paulo" },
    { tipo: "DATA", texto: "13 de maio de 2025" },
    { tipo: "PROCESSO", texto: "0012345-67.2024.8.26.0001" }
  ];

  const resumoDoTexto = `Este é um resumo gerado automaticamente (mock) do documento fornecido. O documento parece tratar de questões jurídicas complexas envolvendo ${entidadesExtraidas[0].texto} e ${entidadesExtraidas[1].texto}, com possíveis implicações na cidade de ${entidadesExtraidas[2].texto}. A data principal mencionada é ${entidadesExtraidas[3].texto}.`;

  const classificacaoDocumento = {
    tipo: "Petição Inicial",
    area: "Cível",
    risco: Math.random() > 0.5 ? "Alto" : "Médio", // Aleatório para simulação
    tags: ["contrato", "litígio", "indenização"]
  };

  const leadGerado = {
    id: `lead_${Date.now()}`,
    nomeDocumento: "Documento Analisado (Mock)",
    clientePotencial: entidadesExtraidas.find(e => e.tipo === "PESSOA")?.texto || "Cliente Desconhecido",
    resumo: resumoDoTexto.substring(0, 150) + "...",
    status: "Novo",
    risco: classificacaoDocumento.risco,
    consultorAtribuido: null,
    dataCriacao: new Date().toISOString(),
    detalhesCompletos: {
      entidades: entidadesExtraidas,
      resumoCompleto: resumoDoTexto,
      classificacao: classificacaoDocumento,
      textoOriginal: textoDocumento
    }
  };

  console.log("NLP Service (Mock): Análise concluída. Lead gerado:", leadGerado.id);
  return {
    success: true,
    entidades: entidadesExtraidas,
    resumo: resumoDoTexto,
    classificacao: classificacaoDocumento,
    lead: leadGerado
  };
};

