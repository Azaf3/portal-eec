import React, { useState, useEffect, useMemo } from 'react';
import EventCard from '../components/EventCard';
import FilterSection from '../components/FilterSection';
import SkeletonCard from '../components/SkeletonCard';
import eventsData from '../data/eventsData';

const Eventos = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortBy, setSortBy] = useState('dateAsc');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState([]);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(() => new Date());
  const [calendarSelectedDay, setCalendarSelectedDay] = useState(null);
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
  const [page, setPage] = useState(1);
  const perPage = 9;

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(fav);
  }, []);

  useEffect(() => {
    let res = [...events];
    if (filters.search) {
      const s = filters.search.toLowerCase();
      res = res.filter(ev => ev.title.toLowerCase().includes(s) || (ev.description || '').toLowerCase().includes(s));
    }
    if (filters.type) {
      res = res.filter(ev => ev.category === filters.type);
    }
    if (filters.date) {
      res = res.filter(ev => ev.date === filters.date);
    }
    if (filters.modality) {
      res = res.filter(ev => ev.modality === filters.modality);
    }

    
    switch (sortBy) {
      case 'dateAsc':
        res.sort((a,b) => new Date(a.date) - new Date(b.date));
        break;
      case 'dateDesc':
        res.sort((a,b) => new Date(b.date) - new Date(a.date));
        break;
      case 'title_asc':
      case 'titleAsc':
        res.sort((a,b) => a.title.localeCompare(b.title));
        break;
      case 'spots':
        res.sort((a,b) => (b.availableSpots||0) - (a.availableSpots||0));
        break;
      case 'popular':
        res.sort((a,b) => (b.featured?1:0) - (a.featured?1:0));
        break;
      default:
        break;
    }

    setFilteredEvents(res);
    setPage(1);
  }, [filters, events, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / perPage));
  const paginatedEvents = filteredEvents.slice((page - 1) * perPage, page * perPage);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ search: '', type: '', date: '', modality: '' });
  };

  const openModal = (ev) => {
    setSelectedEvent(ev);
    setShowSubscriptionForm(false);
    setFormSubmitted(false);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setShowSubscriptionForm(false);
    setFormSubmitted(false);
  };

  const handleCardClick = (ev) => openModal(ev);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  const calendarDays = useMemo(() => {
    const month = selectedCalendarDate.getMonth();
    const year = selectedCalendarDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }).map((_, i) => ({ label: String(i + 1), iso: i + 1 }));
  }, [selectedCalendarDate]);

  const eventsByDay = useMemo(() => {
    const map = {};
    filteredEvents.forEach(ev => {
      const d = new Date(ev.date).getDate();
      if (!map[d]) map[d] = [];
      map[d].push(ev);
    });
    return map;
  }, [filteredEvents]);

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
            backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=600&fit=crop)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B9BB8]/70 to-[#2D5A8C]/70"></div>
        </div>
        <div className="relative z-10 container mx-auto px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-xl md:text-3xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Todos os Eventos
          </h1>
          <p className="text-sm md:text-base text-white/95 font-light tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Explore nossa agenda completa e encontre o evento perfeito para você
          </p>
        </div>
      </div>

      <div className="container mx-auto px-8 py-12">

      <FilterSection
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Ordenar:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 rounded-xl border border-gray-200 bg-white">
            <option value="dateAsc">Data (próximos)</option>
            <option value="dateDesc">Data (mais recentes)</option>
            <option value="popular">Mais populares</option>
            <option value="spots">Mais vagas</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button title="Grid" onClick={() => setViewMode('grid')} className={`px-3 py-2 rounded-xl border ${viewMode==='grid' ? 'border-[#2B9BB8] bg-[#2B9BB8]/10' : 'border-gray-200 bg-white'}`}>
              Grid
            </button>
            <button title="Lista" onClick={() => setViewMode('list')} className={`px-3 py-2 rounded-xl border ${viewMode==='list' ? 'border-[#2B9BB8] bg-[#2B9BB8]/10' : 'border-gray-200 bg-white'}`}>
              Lista
            </button>
            <button title="Calendário" onClick={() => setViewMode('calendar')} className={`px-3 py-2 rounded-xl border ${viewMode==='calendar' ? 'border-[#2B9BB8] bg-[#2B9BB8]/10' : 'border-gray-200 bg-white'}`}>
              Calendário
            </button>
          </div>

          
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : viewMode === 'calendar' ? (
        <div>
          
          <div className="mb-6 w-full bg-white p-4 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedCalendarDate(new Date(selectedCalendarDate.getFullYear(), selectedCalendarDate.getMonth()-1, 1))} className="px-3 py-2 rounded-xl border">◀</button>
                <div className="font-bold">{selectedCalendarDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</div>
                <button onClick={() => setSelectedCalendarDate(new Date(selectedCalendarDate.getFullYear(), selectedCalendarDate.getMonth()+1, 1))} className="px-3 py-2 rounded-xl border">▶</button>
              </div>
              <div className="text-sm text-gray-600">Clique no dia para ver eventos</div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
              {['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(d => (
                <div key={d} className="text-xs font-semibold text-gray-500">{d}</div>
              ))}

              {(() => {
                const month = selectedCalendarDate.getMonth();
                const year = selectedCalendarDate.getFullYear();
                const firstDay = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month+1, 0).getDate();
                const blanks = Array.from({length:firstDay}).map((_,i) => <div key={'b'+i}></div>);
                const days = Array.from({length: daysInMonth}).map((_,i) => {
                  const day = i+1;
                  const has = eventsByDay[day] && eventsByDay[day].length > 0;
                  return (
                    <button key={day} onClick={() => setCalendarSelectedDay(day)} className={`p-2 rounded-lg ${calendarSelectedDay===day ? 'bg-[#2B9BB8]/20' : 'hover:bg-gray-100'}`}>
                      <div className="text-sm font-medium">{day}</div>
                      {has && <div className="mt-1 w-2 h-2 bg-[#2B9BB8] rounded-full mx-auto"></div>}
                    </button>
                  );
                });
                return [...blanks, ...days];
              })()}
            </div>
          </div>

          <div>
            {calendarSelectedDay ? (
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Eventos em {calendarSelectedDay}/{selectedCalendarDate.getMonth()+1}/{selectedCalendarDate.getFullYear()}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(eventsByDay[calendarSelectedDay] || []).map(ev => (
                    <EventCard key={ev.id} event={ev} onCardClick={handleCardClick} isFavorite={favorites.includes(ev.id)} onToggleFavorite={toggleFavorite} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-gray-600">Selecione um dia do calendário para ver os eventos.</div>
            )}
          </div>
        </div>
      ) : filteredEvents.length > 0 ? (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              Mostrando <span className="font-bold gradient-brand-text">{filteredEvents.length}</span> evento(s)
            </p>
          </div>
          {viewMode === 'list' ? (
            <div className="space-y-4">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} onCardClick={handleCardClick} view="list" isFavorite={favorites.includes(event.id)} onToggleFavorite={toggleFavorite} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event}
                  onCardClick={handleCardClick}
                  isFavorite={favorites.includes(event.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4"></div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Nenhum evento encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros ou buscar por outros termos
          </p>
        </div>
      )}

      
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fadeIn"
          onClick={closeModal}
        >
          <div 
            className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            
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
    </>
  );
};

export default Eventos;
