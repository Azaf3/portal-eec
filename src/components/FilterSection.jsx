import React from 'react';

const FilterSection = ({ selectedCategory, onCategoryChange, searchTerm, onSearchChange }) => {
  const categories = [
    { value: 'todos', label: 'Todos' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'palestra', label: 'Palestra' },
    { value: 'hackathon', label: 'Hackathon' },
    { value: 'curso', label: 'Curso' }
  ];

  return (
    <div className="glass-strong rounded-xl p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Search Input */}
        <div>
          <label className="block text-white font-medium mb-2">
            Buscar Eventos
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Digite o nome do evento..."
              className="w-full px-4 py-3 pl-10 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            <svg 
              className="w-5 h-5 text-gray-300 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-white font-medium mb-2">
            Filtrar por Categoria
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => onCategoryChange(category.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
