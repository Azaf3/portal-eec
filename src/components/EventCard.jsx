import React from 'react';

const EventCard = ({ event, onCardClick }) => {
  const { title, description, date, time, location, category, image, availableSpots, spots, instructor } = event;
  
  const categoryColors = {
    workshop: 'bg-blue-500',
    palestra: 'bg-purple-500',
    hackathon: 'bg-red-500',
    curso: 'bg-green-500'
  };

  const spotsPercentage = (availableSpots / spots) * 100;
  const spotsColor = spotsPercentage > 50 ? 'text-green-400' : spotsPercentage > 20 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div 
      onClick={() => onCardClick && onCardClick(event)}
      className="glass rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group"
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={image} 
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className={`absolute top-4 left-4 ${categoryColors[category]} px-3 py-1 rounded-full text-white text-sm font-semibold uppercase`}>
          {category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-200 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-300 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(date).toLocaleDateString('pt-BR')} às {time}
          </div>
          
          <div className="flex items-center text-gray-300 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>
          
          <div className="flex items-center text-gray-300 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {instructor}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <span className={`font-semibold ${spotsColor}`}>
            {availableSpots} vagas disponíveis
          </span>
          <button className="px-4 py-2 bg-primary hover:bg-secondary text-white rounded-lg transition-colors font-medium">
            Ver Mais
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
