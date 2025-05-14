// services/nepService.js

// Simula a extração de texto de um arquivo.
// Em um cenário real, isso faria uma chamada de API para o backend NEP.
export const extrairTextoDocumento = async (arquivo) => {
  console.log("NEP Service (Mock): Recebido arquivo para extração:", arquivo.name);

  // Simula um tempo de processamento
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simula a extração de texto com base no tipo de arquivo (muito simplificado)
  let textoExtraido = "";
  if (arquivo.name.endsWith(".pdf")) {
    textoExtraido = `Conteúdo extraído do PDF (mock): ${arquivo.name}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
  } else if (arquivo.name.endsWith(".docx")) {
    textoExtraido = `Conteúdo extraído do DOCX (mock): ${arquivo.name}. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
  } else {
    textoExtraido = `Conteúdo extraído de arquivo de texto (mock): ${arquivo.name}. Este é um texto simples para simulação.

Segunda linha do texto.
Terceira linha com alguns detalhes a mais.`;
  }

  console.log("NEP Service (Mock): Texto extraído:", textoExtraido.substring(0, 100) + "...");
  return {
    success: true,
    texto: textoExtraido,
    paginas: Math.ceil(textoExtraido.length / 500) // Simula número de páginas
  };
};

