import React from 'react';

const FilterSection = ({ filters, onFilterChange, onClearFilters }) => {
  const activeFiltersCount = Object.values(filters).filter(val => val !== '').length;

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-12 border border-blue-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2B9BB8] rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Filtrar Eventos</h3>
        </div>
        {activeFiltersCount > 0 && (
          <div className="px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-sm font-bold text-[#2D5A8C]">{activeFiltersCount} filtro(s) ativo(s)</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        <div className="relative">
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#2B9BB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Buscar eventos
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Digite para buscar..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#2B9BB8] focus:ring-4 focus:ring-blue-100 transition-all hover:border-gray-300"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Tipo de evento */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#2B9BB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Tipo de evento
          </label>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange('type', e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#2B9BB8] focus:ring-4 focus:ring-blue-100 transition-all hover:border-gray-300 cursor-pointer"
          >
            <option value="">Todos os tipos</option>
            <option value="workshop">🛠️ Workshop</option>
            <option value="palestra">🎤 Palestra</option>
            <option value="hackathon">💻 Hackathon</option>
            <option value="curso">📚 Curso</option>
            <option value="festival">🎉 Festival</option>
            <option value="feira">🎪 Feira</option>
          </select>
        </div>

        {/* Data do evento */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#2B9BB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Data do evento
          </label>
          <select
            value={filters.date}
            onChange={(e) => onFilterChange('date', e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#2B9BB8] focus:ring-4 focus:ring-blue-100 transition-all hover:border-gray-300 cursor-pointer"
          >
            <option value="">Todas as datas</option>
            <option value="hoje">📅 Hoje</option>
            <option value="semana">📆 Esta semana</option>
            <option value="mes">🗓️ Este mês</option>
          </select>
        </div>

        {/* Modalidade */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#2B9BB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Modalidade
          </label>
          <select
            value={filters.modality}
            onChange={(e) => onFilterChange('modality', e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#2B9BB8] focus:ring-4 focus:ring-blue-100 transition-all hover:border-gray-300 cursor-pointer"
          >
            <option value="">Todas</option>
            <option value="presencial">🏢 Presencial</option>
            <option value="online">🌐 Online</option>
          </select>
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <button
          onClick={onClearFilters}
          className="w-full md:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group"
        >
          <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Limpar filtros
        </button>
      )}
    </div>
  );
};

export default FilterSection;
