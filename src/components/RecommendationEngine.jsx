// src/components/RecommendationEngine.jsx
import React, { useState } from 'react';

const RecommendationEngine = () => {
  const [preference, setPreference] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

  const getRecommendations = async () => {
    setLoading(true);
    setError('');
    setRecommendations([]);

    if (!TMDB_API_KEY) {
      setError('Chave da API do TMDB não configurada. Verifique o arquivo .env');
      setLoading(false);
      console.warn('TMDB API Key is missing.');
      return;
    }

    try {
      let chatHistory = [];
      const prompt = `Dada a preferência do usuário: "${preference}", sugira 3-5 títulos de filmes ou séries que estariam disponíveis em um grande catálogo de IPTV. Para cada sugestão, forneça um 'title' (título original ou em português, como for mais comum), 'genre' (gênero principal, ex: "Ação", "Comédia", "Ficção Científica") e uma 'shortDescription' (breve descrição em português, 1-2 frases). Responda apenas com um array JSON desses objetos. Exemplo de formato de um item: {"title": "Nome do Filme", "genre": "Ação", "shortDescription": "Uma breve descrição do filme."}`;
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const geminiPayload = {
        contents: chatHistory,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                "title": { "type": "STRING" },
                "genre": { "type": "STRING" },
                "shortDescription": { "type": "STRING" }
              },
              required: ["title", "genre", "shortDescription"]
            }
          }
        }
      };

      const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

      const geminiResponse = await fetch(geminiApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiPayload)
      });

      if (!geminiResponse.ok) {
        const errorData = await geminiResponse.json().catch(() => ({}));
        console.error('Erro na API Gemini:', errorData);
        throw new Error(`Erro na API Gemini: ${geminiResponse.status} - ${errorData.error?.message || 'Erro desconhecido'}`);
      }
      
      const geminiResult = await geminiResponse.json();
      let parsedRecommendations = [];

      if (geminiResult.candidates && geminiResult.candidates.length > 0 &&
          geminiResult.candidates[0].content && geminiResult.candidates[0].content.parts &&
          geminiResult.candidates[0].content.parts.length > 0) {
        const jsonText = geminiResult.candidates[0].content.parts[0].text;
        try {
            parsedRecommendations = JSON.parse(jsonText);
            if (!Array.isArray(parsedRecommendations)) {
                throw new Error("A resposta da IA não é um array JSON válido.");
            }
        } catch (parseError) {
            setError('Erro ao processar recomendações da IA. Formato inválido.');
            console.error('Erro ao fazer parse do JSON da Gemini:', parseError, "JSON recebido:", jsonText);
            setLoading(false);
            return;
        }
      } else {
        setError('Não foi possível obter recomendações de texto da IA. Tente novamente.');
        console.error('Estrutura de resposta inesperada da Gemini:', geminiResult);
        setLoading(false);
        return;
      }

      const recommendationsWithImages = await Promise.all(
        parsedRecommendations.map(async (rec) => {
          let imageUrl = `https://placehold.co/500x750/1a202c/e2e8f0?text=${encodeURIComponent(rec.title)}`;
          try {
            const tmdbSearchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(rec.title)}&language=pt-BR&include_adult=false`;
            const tmdbResponse = await fetch(tmdbSearchUrl);
            if (!tmdbResponse.ok) {
                console.warn(`Erro ao buscar no TMDB para "${rec.title}": ${tmdbResponse.status}`);
                return { ...rec, imageUrl }; // Retorna com placeholder
            }
            const tmdbData = await tmdbResponse.json();
            if (tmdbData.results && tmdbData.results.length > 0) {
              const relevantResult = tmdbData.results.find(item => item.poster_path && (item.media_type === 'movie' || item.media_type === 'tv'));
              if (relevantResult && relevantResult.poster_path) {
                imageUrl = `https://image.tmdb.org/t/p/w500${relevantResult.poster_path}`;
              }
            }
          } catch (tmdbError) {
            console.error(`Erro ao buscar imagem TMDB para ${rec.title}:`, tmdbError);
          }
          return { ...rec, imageUrl };
        })
      );
      setRecommendations(recommendationsWithImages);
    } catch (err) {
      setError(`Erro ao buscar recomendações: ${err.message}`);
      console.error('Erro em getRecommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="recomendacoes" className="bg-gray-800 text-white py-16 px-4">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-4">
          Recomendações Personalizadas ✨
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Descreva o que você gostaria de assistir e deixe a IA te surpreender!
        </p>
        <div className="max-w-2xl mx-auto mb-10">
          <textarea
            className="w-full p-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 resize-y min-h-[100px]"
            placeholder="Ex: Quero um filme de ficção científica com muita ação e uma história envolvente..."
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            rows="3"
          ></textarea>
          <button
            onClick={getRecommendations}
            disabled={loading || !preference.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Gerando Recomendações...' : 'Obter Recomendações ✨'}
          </button>
        </div>
        {error && <p className="text-red-500 text-lg mb-4 bg-red-100 border border-red-400 p-3 rounded-md">{error}</p>}
        {recommendations.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-gray-900 rounded-lg shadow-xl p-6 text-left flex flex-col transform transition-transform hover:scale-105 duration-300">
                <img
                  src={rec.imageUrl}
                  alt={`Capa de ${rec.title}`}
                  className="w-full h-auto rounded-md mb-4 object-cover aspect-[2/3]"
                  loading="lazy"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/500x750/1a202c/e2e8f0?text=Imagem+Indisponivel'; }}
                />
                <h3 className="text-xl font-bold text-blue-400 mb-2 truncate" title={rec.title}>{rec.title}</h3>
                <p className="text-blue-300 text-sm mb-1"><span className="font-semibold">Gênero:</span> {rec.genre}</p>
                <p className="text-gray-200 text-sm flex-grow line-clamp-4">{rec.shortDescription}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecommendationEngine;
