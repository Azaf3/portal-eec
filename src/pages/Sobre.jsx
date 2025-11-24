import React from 'react';

const Sobre = () => {
  const team = [
    { name: "João Silva", role: "Coordenador", image: "https://i.pravatar.cc/150?img=12" },
    { name: "Maria Santos", role: "Vice-Coordenadora", image: "https://i.pravatar.cc/150?img=5" },
    { name: "Carlos Mendes", role: "Desenvolvedor", image: "https://i.pravatar.cc/150?img=33" },
    { name: "Ana Costa", role: "Designer", image: "https://i.pravatar.cc/150?img=9" }
  ];

  return (
    <div className="container mx-auto px-8 py-12">
      {/* Hero Section */}
      <section className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 mb-12 text-center shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Sobre o <span className="text-[#2B9BB8]">Portal EEC</span>
        </h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Conectando pessoas através de tecnologia, inovação e educação.
        </p>
      </section>

      {/* Mission, Vision, Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-md">
          <div className="w-12 h-12 mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-[#2B9BB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Missão</h3>
          <p className="text-gray-600">
            Promover eventos de qualidade que capacitem profissionais e estudantes 
            na área de tecnologia, fomentando inovação e networking.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-md">
          <div className="w-12 h-12 mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-[#2D5A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Visão</h3>
          <p className="text-gray-600">
            Ser referência nacional em eventos de tecnologia e inovação, 
            criando uma comunidade forte e colaborativa.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-md">
          <div className="w-12 h-12 mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-[#2B9BB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Valores</h3>
          <p className="text-gray-600">
            Excelência, colaboração, inovação, inclusão e aprendizado contínuo 
            são os pilares que guiam todas as nossas ações.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 md:p-12 mb-12 shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <div className="w-10 h-10 mr-3 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-[#2D5A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          Nossa História
        </h2>
        <div className="space-y-4 text-gray-600">
          <p>
            O Portal EEC nasceu em 2020 com o objetivo de democratizar o acesso ao conhecimento 
            em tecnologia. Começamos com pequenos workshops presenciais e, ao longo dos anos, 
            crescemos exponencialmente.
          </p>
          <p>
            Hoje, somos uma das principais plataformas de eventos tech do Brasil, com mais de 
            5.000 participantes ativos, 150+ eventos realizados e parcerias com as maiores 
            empresas do mercado.
          </p>
          <p>
            Nossa comunidade é formada por estudantes, profissionais, palestrantes e empresas 
            que compartilham a mesma paixão: transformar o mundo através da tecnologia.
          </p>
        </div>
      </section>

      {/* Team */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <div className="w-10 h-10 mr-3 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-[#2B9BB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          Nossa Equipe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 text-center hover:shadow-xl transition-all shadow-md">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#2B9BB8]"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Sobre;
