import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import FilterSection from '../components/FilterSection';
import SkeletonCard from '../components/SkeletonCard';
import eventsData from '../data/eventsData';

const Eventos = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      setEvents(eventsData);
      setFilteredEvents(eventsData);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    // Aplica filtros
    let filtered = events;

    // Filtro de categoria
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [selectedCategory, searchTerm, events]);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Todos os Eventos
        </h1>
        <p className="text-xl text-gray-200">
          Explore nossa agenda completa e encontre o evento perfeito para você
        </p>
      </div>

      <FilterSection
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <>
          <div className="mb-6">
            <p className="text-gray-200">
              Mostrando <span className="font-bold text-white">{filteredEvents.length}</span> evento(s)
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="glass-strong rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Nenhum evento encontrado
          </h3>
          <p className="text-gray-200">
            Tente ajustar os filtros ou buscar por outros termos
          </p>
        </div>
      )}

      {/* Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="glass-strong rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
              >
                ✕
              </button>
            </div>
            
            <div className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                {selectedEvent.title}
              </h2>
              
              <p className="text-gray-200 mb-6">
                {selectedEvent.description}
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-200">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(selectedEvent.date).toLocaleDateString('pt-BR')} às {selectedEvent.time}
                </div>
                
                <div className="flex items-center text-gray-200">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {selectedEvent.location}
                </div>
                
                <div className="flex items-center text-gray-200">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {selectedEvent.instructor}
                </div>
              </div>
              
              <button className="w-full px-6 py-4 bg-primary hover:bg-secondary text-white rounded-lg font-bold text-lg transition-all hover:scale-105">
                Inscrever-se Agora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Eventos;
