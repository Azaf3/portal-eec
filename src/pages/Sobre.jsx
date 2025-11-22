import React from 'react';

const Sobre = () => {
  const team = [
    { name: "João Silva", role: "Coordenador", image: "https://i.pravatar.cc/150?img=12" },
    { name: "Maria Santos", role: "Vice-Coordenadora", image: "https://i.pravatar.cc/150?img=5" },
    { name: "Carlos Mendes", role: "Desenvolvedor", image: "https://i.pravatar.cc/150?img=33" },
    { name: "Ana Costa", role: "Designer", image: "https://i.pravatar.cc/150?img=9" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="glass-strong rounded-2xl p-8 md:p-12 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Sobre o <span className="neon-text">Portal EEC</span>
        </h1>
        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
          Somos uma comunidade apaixonada por tecnologia, inovação e educação. 
          Nossa missão é conectar pessoas, compartilhar conhecimento e transformar vidas através da tecnologia.
        </p>
      </section>

      {/* Mission, Vision, Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-strong rounded-xl p-6">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-white mb-3">Missão</h3>
          <p className="text-gray-200">
            Promover eventos de qualidade que capacitem profissionais e estudantes 
            na área de tecnologia, fomentando inovação e networking.
          </p>
        </div>

        <div className="glass-strong rounded-xl p-6">
          <div className="text-4xl mb-4">🔭</div>
          <h3 className="text-2xl font-bold text-white mb-3">Visão</h3>
          <p className="text-gray-200">
            Ser referência nacional em eventos de tecnologia e inovação, 
            criando uma comunidade forte e colaborativa.
          </p>
        </div>

        <div className="glass-strong rounded-xl p-6">
          <div className="text-4xl mb-4">💎</div>
          <h3 className="text-2xl font-bold text-white mb-3">Valores</h3>
          <p className="text-gray-200">
            Excelência, colaboração, inovação, inclusão e aprendizado contínuo 
            são os pilares que guiam todas as nossas ações.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="glass-strong rounded-xl p-8 md:p-12 mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">📖</span>
          Nossa História
        </h2>
        <div className="space-y-4 text-gray-200">
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
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">👥</span>
          Nossa Equipe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div key={index} className="glass-strong rounded-xl p-6 text-center hover:scale-105 transition-all">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary"
              />
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-gray-300">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="glass-strong rounded-xl p-8 md:p-12 mt-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Quer fazer parte da nossa história?
        </h2>
        <p className="text-xl text-gray-200 mb-6">
          Entre em contato conosco e descubra como você pode contribuir ou participar dos nossos eventos.
        </p>
        <button className="px-8 py-4 bg-primary hover:bg-secondary text-white rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-xl">
          Fale Conosco
        </button>
      </section>
    </div>
  );
};

export default Sobre;
