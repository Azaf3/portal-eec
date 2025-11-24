import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import FilterSection from '../components/FilterSection';
import SkeletonCard from '../components/SkeletonCard';
import eventsData from '../data/eventsData';

const Eventos = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    date: '',
    modality: ''
  });

  useEffect(() => {
    setTimeout(() => {
      setEvents(eventsData);
      setFilteredEvents(eventsData);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let filtered = events;

    if (filters.search) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter(event => event.category === filters.type);
    }

    if (filters.modality) {
      filtered = filtered.filter(event => 
        filters.modality === 'presencial' ? event.location !== 'Online' : event.location === 'Online'
      );
    }

    setFilteredEvents(filtered);
  }, [filters, events]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ search: '', type: '', date: '', modality: '' });
  };

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setShowSubscriptionForm(false);
    setFormSubmitted(false);
    setFormData({ nome: '', email: '', telefone: '', cpf: '' });
  };

  const handleSubscribe = () => {
    setShowSubscriptionForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Inscrição enviada:', { ...formData, evento: selectedEvent.title });
    setFormSubmitted(true);
    setTimeout(() => {
      closeModal();
    }, 3000);
  };

  return (
    <div className="container mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          Todos os Eventos
        </h1>
        <p className="text-xl text-gray-600">
          Explore nossa agenda completa e encontre o evento perfeito para você
        </p>
      </div>

      <FilterSection
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
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
            <p className="text-gray-600">
              Mostrando <span className="font-bold gradient-brand-text">{filteredEvents.length}</span> evento(s)
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Nenhum evento encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros ou buscar por outros termos
          </p>
        </div>
      )}

      {/* Modal com Backdrop Blur */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fadeIn"
          onClick={closeModal}
        >
          <div 
            className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Header */}
            <div className="relative h-72 overflow-hidden rounded-t-3xl">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-xl hover:bg-white rounded-full flex items-center justify-center text-gray-800 transition-all shadow-xl hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="p-10">
              <h2 className="text-4xl font-black text-gray-800 mb-4">
                {selectedEvent.title}
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {selectedEvent.description}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-700">
                  <div className="w-12 h-12 rounded-2xl bg-[#2B9BB8]/10 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-[#2B9BB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Data e Horário</p>
                    <p className="text-base font-semibold">{new Date(selectedEvent.date).toLocaleDateString('pt-BR')} às {selectedEvent.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <div className="w-12 h-12 rounded-2xl bg-[#2B9BB8]/10 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-[#2B9BB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Localização</p>
                    <p className="text-base font-semibold">{selectedEvent.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <div className="w-12 h-12 rounded-2xl bg-[#2B9BB8]/10 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-[#2B9BB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Instrutor</p>
                    <p className="text-base font-semibold">{selectedEvent.instructor}</p>
                  </div>
                </div>
              </div>
              
              {/* Formulário de Inscrição ou Botão */}
              {formSubmitted ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">Inscrição Confirmada!</h3>
                  <p className="text-green-600">Enviamos um e-mail de confirmação para você.</p>
                </div>
              ) : showSubscriptionForm ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2B9BB8] focus:outline-none transition-all"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2B9BB8] focus:outline-none transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                      <input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2B9BB8] focus:outline-none transition-all"
                        placeholder="(11) 98765-4321"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">CPF</label>
                      <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2B9BB8] focus:outline-none transition-all"
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowSubscriptionForm(false)}
                      className="flex-1 px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3.5 bg-[#2B9BB8] hover:bg-[#2D5A8C] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                    >
                      Confirmar Inscrição
                    </button>
                  </div>
                </form>
              ) : (
                <button 
                  onClick={handleSubscribe}
                  className="w-full px-8 py-4 bg-[#2B9BB8] hover:bg-[#2D5A8C] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Inscrever-se Agora
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Eventos;
