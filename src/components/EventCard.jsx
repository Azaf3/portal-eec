import React from 'react';

const EventCard = ({ event, onCardClick, isFavorite, onToggleFavorite, view = 'grid' }) => {
  const { title, date, time, location, image, featured } = event;
  const isOnline = location === 'Online';

  const handleFavClick = (e) => {
    e.stopPropagation();
    onToggleFavorite && onToggleFavorite(event.id);
  };

  if (view === 'list') {
    return (
      <div onClick={() => onCardClick && onCardClick(event)} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex gap-4 p-4">
        <img src={image} alt={title} loading="lazy" className="w-40 h-28 object-cover rounded-lg flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <button onClick={handleFavClick} className="ml-4 p-2 rounded-full bg-white/80 hover:bg-white text-red-500">
              {isFavorite ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4 8.11 4 9.6 4.8 10.44 6.09 11.28 4.8 12.77 4 14.38 4 16.88 4 18.88 6 18.88 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>
              )}
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{new Date(date).toLocaleDateString('pt-BR')} às {time} • {location}</p>
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">{event.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onCardClick && onCardClick(event)}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={image} 
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {featured && (
          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-white text-xs font-semibold shadow-lg bg-[#2D5A8C]">
            Destaque
          </div>
        )}
        {onToggleFavorite && (
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button onClick={handleFavClick} className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-red-500 hover:scale-105 transition-transform">
              {isFavorite ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4 8.11 4 9.6 4.8 10.44 6.09 11.28 4.8 12.77 4 14.38 4 16.88 4 18.88 6 18.88 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>
              )}
            </button>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
          {title}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{new Date(date).toLocaleDateString('pt-BR')} às {time}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span>{location}</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      </div>
    </div>
  );
};

export default EventCard;
