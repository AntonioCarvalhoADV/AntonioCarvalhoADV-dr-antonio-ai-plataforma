import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Plataforma Dr. Antonio AI</title>
        <meta name="description" content="Núcleo Inteligente de Apoio Jurídico e Comercial" />
        <link rel="icon" href="/favicon.ico" /> {/* Certifique-se de adicionar um favicon.ico em public/ */}
      </Head>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Bem-vindo à Plataforma Dr. Antonio AI</h2>
        <p className="mb-2">
          Este é o Núcleo Inteligente de Apoio Jurídico e Comercial, projetado para automatizar o recebimento, extração e análise de documentos jurídicos, organizar leads e registrar a atuação processual.
        </p>
        <p>
          Utilize o menu lateral para navegar pelas funcionalidades disponíveis, como Upload de Documentos e Painel de Leads.
        </p>
        {/* Adicionar mais conteúdo ou links para funcionalidades aqui */}
      </div>
    </>
  );
}
