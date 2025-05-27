import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtém o session_id da URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId) {
      setSessionId(sessionId);
      // Verifica se a sessão é válida
      verifySession(sessionId);
    }

    // Redireciona após 5 segundos
    setTimeout(() => {
      navigate('/');
    }, 5000);
  }, [navigate]);

  const verifySession = async (sessionId) => {
    try {
      const response = await fetch(`/api/verify-session?session_id=${sessionId}`);
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Sessão inválida:', data.error);
        navigate('/cancel');
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error);
      navigate('/cancel');
    }
  };

  const handleManageBilling = async () => {
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.url;
      } else {
        console.error('Erro ao criar sessão do portal:', data.error);
      }
    } catch (error) {
      console.error('Erro ao processar o portal:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-xl text-center">
        <div className="mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" version="1.1">
            <defs/>
            <g id="Flow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="0-Default" transform="translate(-121.000000, -40.000000)" fill="#E184DF">
                <path d="M127,50 L126,50 C123.238576,50 121,47.7614237 121,45 C121,42.2385763 123.238576,40 126,40 L135,40 L135,56 L133,56 L133,42 L129,42 L129,56 L127,56 L127,50 Z M127,48 L127,42 L126,42 C124.343146,42 123,43.3431458 123,45 C123,46.6568542 124.343146,48 126,48 L127,48 Z" id="Pilcrow"/>
              </g>
            </g>
          </svg>
          <h2 className="text-3xl font-bold mt-4">Parabéns!</h2>
          <p className="text-gray-300 mt-2">Sua assinatura foi ativada com sucesso!</p>
        </div>
        <button
          onClick={handleManageBilling}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 shadow-lg transform hover:scale-105 mt-6"
        >
          Gerenciar Assinatura
        </button>
        <p className="text-gray-400 mt-4">Você será redirecionado em 5 segundos...</p>
      </div>
    </div>
  );
};

export default Success;
