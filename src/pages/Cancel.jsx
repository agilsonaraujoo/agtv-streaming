import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redireciona para a página inicial após 5 segundos
    setTimeout(() => {
      navigate('/');
    }, 5000);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-4">Pagamento Cancelado</h2>
        <p className="text-gray-300 mb-6">
          Mudou de ideia? Sem problemas! Você pode voltar a qualquer momento para assinar.
        </p>
        <button
          onClick={() => navigate('/planos')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 shadow-lg transform hover:scale-105"
        >
          Escolher Outro Plano
        </button>
        <p className="text-gray-400 mt-4">Você será redirecionado em 5 segundos...</p>
      </div>
    </div>
  );
};

export default Cancel;
