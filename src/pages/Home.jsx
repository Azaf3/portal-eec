import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import FilterSection from '../components/FilterSection';
import SkeletonCard from '../components/SkeletonCard';
import eventsData from '../data/eventsData';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    date: '',
    modality: ''
  });

  useEffect(() => {
    setTimeout(() => {
      const featured = eventsData.filter(event => event.featured);
      setFeaturedEvents(featured);
      setFilteredEvents(featured);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let filtered = featuredEvents;

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
  }, [filters, featuredEvents]);

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
    <>
      <div className="w-full relative h-40 md:h-48 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=600&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B9BB8]/70 to-[#2D5A8C]/70"></div>
        </div>

        <div className="relative z-10 container mx-auto px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-xl md:text-3xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Conectando você ao conhecimento
          </h1>
          <p className="text-sm md:text-base text-white/95 font-light tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Eventos em destaque para você
          </p>
        </div>
      </div>

      <div className="container mx-auto px-8 py-12">
        <FilterSection 
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Eventos em <span className="gradient-brand-text">Destaque</span>
          </h2>
          <p className="text-gray-600">{filteredEvents.length} eventos encontrados</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-12 text-center">
            <p className="text-gray-600">Nenhum evento encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>

      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fadeIn"
          onClick={closeModal}
        >
          <div 
            className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 overflow-hidden rounded-t-3xl">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                loading="lazy"
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

            <div className="p-6">
              <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-3">
                {selectedEvent.title}
              </h2>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
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
    </>
  );
};

export default Home;
