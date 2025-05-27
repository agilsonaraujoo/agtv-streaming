// src/components/TrendingContent.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';

const TrendingContent = () => {
  const [trendingItems, setTrendingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollContainerRef = useRef(null);
  const scrollAnimationRef = useRef(null);
  const lastScrollTimeRef = useRef(0);
  const scrollSpeed = 0.1;
  const isInteractingRef = useRef(false);



  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const animateScroll = (timestamp) => {
    if (!scrollContainerRef.current) return;
    if (!lastScrollTimeRef.current) {
      lastScrollTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastScrollTimeRef.current;
    lastScrollTimeRef.current = timestamp;

    const container = scrollContainerRef.current;
    if (container && !isInteractingRef.current) {
      container.scrollLeft += scrollSpeed * deltaTime;
      const originalContentWidth = container.scrollWidth / 2;
      if (container.scrollLeft >= originalContentWidth) {
        container.scrollLeft -= originalContentWidth;
      }
    }
    scrollAnimationRef.current = requestAnimationFrame(animateScroll);
  };

  const startAutoScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      stopAutoScroll();
      lastScrollTimeRef.current = 0;
      scrollAnimationRef.current = requestAnimationFrame(animateScroll);
    }
  }, []); // Adicionando dependências vazias pois usamos apenas refs

  const stopAutoScroll = () => {
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
  };

  useEffect(() => {
    const fetchTrending = async () => {
      if (!TMDB_API_KEY) {
        setError('Chave da API do TMDB não configurada. Verifique o arquivo .env');
        setLoading(false);
        console.warn('TMDB API Key is missing. Please set REACT_APP_TMDB_API_KEY in your .env file.');
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}&language=pt-BR`);
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        if (data.results) {
          const filteredItems = data.results.filter(item => item.poster_path && (item.title || item.name));
          const itemsToDisplay = [...filteredItems, ...filteredItems];
          setTrendingItems(itemsToDisplay);
          setError(''); // Limpa erros anteriores
        } else {
          setError('Não foi possível carregar o conteúdo em alta.');
        }
      } catch (err) {
        setError('Erro ao buscar conteúdo em alta. Verifique sua conexão e a chave da API.');
        console.error('Erro ao buscar trending do TMDB:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
    return () => stopAutoScroll();
  }, [TMDB_API_KEY]);

  useEffect(() => {
    if (trendingItems.length > 0 && !loading && !error && scrollContainerRef.current) {
      startAutoScroll();
    }
  }, [trendingItems, loading, error, scrollContainerRef, startAutoScroll]);

  const handleInteractionStart = () => {
    isInteractingRef.current = true;
    stopAutoScroll();
  };

  const handleInteractionEnd = () => {
    isInteractingRef.current = false;
    setTimeout(() => {
      if (!isInteractingRef.current && scrollContainerRef.current) {
        startAutoScroll();
      }
    }, 2000);
  };

  const scrollManually = (direction) => {
    if (scrollContainerRef.current) {
      handleInteractionStart();
      const container = scrollContainerRef.current;
      const itemWidth = container.querySelector('.flex-none')?.offsetWidth || 300;
      const originalContentWidth = container.scrollWidth / 2;
      const scrollAmount = itemWidth * direction;

      if (direction < 0) {
        if (container.scrollLeft + scrollAmount < 0) {
          container.scrollLeft += originalContentWidth;
          container.style.scrollBehavior = 'auto';
          requestAnimationFrame(() => {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            container.style.scrollBehavior = 'smooth';
          });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        if (container.scrollLeft + scrollAmount >= originalContentWidth) {
          container.scrollLeft -= originalContentWidth;
          container.style.scrollBehavior = 'auto';
          requestAnimationFrame(() => {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            container.style.scrollBehavior = 'smooth';
          });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
      handleInteractionEnd();
    }
  };

  if (loading) {
    return (
      <section id="trending" className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-4">Filmes e Séries do Momento 🔥</h2>
          <p className="text-xl text-indigo-400">Carregando conteúdo em alta...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="trending" className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-4">Filmes e Séries do Momento 🔥</h2>
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (trendingItems.length === 0) {
     return (
      <section id="trending" className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-4">Filmes e Séries do Momento 🔥</h2>
          <p className="text-xl text-gray-400">Nenhum item em alta para exibir no momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="trending" className="bg-gray-900 text-white py-16 px-4 relative">
      <div className="container mx-auto mb-12">
        <h2 className="text-4xl font-extrabold text-white text-center sm:text-5xl lg:text-6xl mb-4">
          Filmes e Séries do Momento 🔥
        </h2>
        <p className="text-xl text-gray-300 text-center mb-8">
          Os títulos mais assistidos!
        </p>
        <div className="relative">
          <button
            onClick={() => scrollManually(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-75 hover:bg-opacity-100 p-3 rounded-full shadow-lg z-20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 hidden md:block"
            aria-label="Rolar para a esquerda"
          >
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-scroll pb-4 hide-scrollbar cursor-grab active:cursor-grabbing"
            style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
            onMouseEnter={handleInteractionStart}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            onTouchCancel={handleInteractionEnd}
            onMouseDown={handleInteractionStart}
            onMouseUp={handleInteractionEnd}
          >
            {trendingItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-none w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 mr-4 snap-center transform transition-transform hover:scale-105 duration-300"
              >
                <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden h-full flex flex-col">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={`Capa de ${item.title || item.name}`}
                    className="w-full h-auto object-cover rounded-t-lg aspect-[2/3]"
                    loading="lazy"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/500x750/1a202c/e2e8f0?text=Poster+Indisponivel'; }}
                  />
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <h3 className="text-lg font-bold text-white mb-1 leading-tight truncate" title={item.title || item.name}>
                      {item.title || item.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{item.media_type === 'movie' ? 'Filme' : 'Série'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollManually(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-75 hover:bg-opacity-100 p-3 rounded-full shadow-lg z-20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 hidden md:block"
            aria-label="Rolar para a direita"
          >
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingContent;
