export default function ModalResumo({ isOpen, onClose, titulo, conteudo }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{titulo || 'Resumo do Documento'}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-2xl">&times;</button>
        </div>
        <div className="text-gray-700">
          {conteudo || 'Conteúdo do resumo indisponível.'}
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
