import React, { useState } from 'react';

const Inscrever = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    evento: '',
    mensagem: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica de envio para o backend
    console.log('Formulário enviado:', formData);
    setSubmitted(true);
    
    // Reset após 3 segundos
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        evento: '',
        mensagem: ''
      });
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Inscreva-se em um Evento
          </h1>
          <p className="text-xl text-gray-200">
            Preencha o formulário abaixo e garanta sua vaga!
          </p>
        </div>

        {/* Form */}
        <div className="glass-strong rounded-2xl p-8 md:p-12">
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Inscrição Enviada com Sucesso!
              </h2>
              <p className="text-gray-200 text-lg">
                Em breve você receberá um email de confirmação.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label htmlFor="nome" className="block text-white font-medium mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Digite seu nome completo"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="seu@email.com"
                />
              </div>

              {/* Telefone */}
              <div>
                <label htmlFor="telefone" className="block text-white font-medium mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="(00) 00000-0000"
                />
              </div>

              {/* Evento */}
              <div>
                <label htmlFor="evento" className="block text-white font-medium mb-2">
                  Escolha o Evento *
                </label>
                <select
                  id="evento"
                  name="evento"
                  value={formData.evento}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                >
                  <option value="" className="bg-gray-800">Selecione um evento</option>
                  <option value="workshop-react" className="bg-gray-800">Workshop de React Avançado</option>
                  <option value="palestra-ia" className="bg-gray-800">Palestra: Inteligência Artificial na Prática</option>
                  <option value="hackathon" className="bg-gray-800">Hackathon EEC 2025</option>
                  <option value="curso-python" className="bg-gray-800">Curso: Python para Ciência de Dados</option>
                  <option value="workshop-figma" className="bg-gray-800">Workshop: Design System com Figma</option>
                </select>
              </div>

              {/* Mensagem */}
              <div>
                <label htmlFor="mensagem" className="block text-white font-medium mb-2">
                  Mensagem (Opcional)
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="Alguma dúvida ou comentário?"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-4 bg-primary hover:bg-secondary text-white rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-xl"
              >
                Confirmar Inscrição
              </button>

              <p className="text-sm text-gray-300 text-center">
                * Campos obrigatórios
              </p>
            </form>
          )}
        </div>

        {/* Info Box */}
        <div className="glass rounded-xl p-6 mt-8">
          <h3 className="text-xl font-bold text-white mb-3 flex items-center">
            <span className="mr-2">ℹ️</span>
            Informações Importantes
          </h3>
          <ul className="space-y-2 text-gray-200">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Após a inscrição, você receberá um email de confirmação em até 24h
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              As vagas são limitadas e preenchidas por ordem de inscrição
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Certificado digital será emitido para quem participar do evento completo
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Em caso de dúvidas, entre em contato: contato@portaleec.com.br
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Inscrever;
