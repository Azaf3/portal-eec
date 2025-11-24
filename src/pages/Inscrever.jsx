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
    console.log('Formulário enviado:', formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ nome: '', email: '', telefone: '', evento: '', mensagem: '' });
    }, 3000);
  };

  return (
    <div className="container mx-auto px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">Inscreva-se em um Evento</h1>
          <p className="text-xl text-gray-600">Preencha o formulário abaixo e garanta sua vaga!</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-lg">
          {submitted ? (
            <div className="text-center py-12" role="status" aria-live="polite">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Inscrição Enviada com Sucesso!</h2>
              <p className="text-gray-600 text-lg">Em breve você receberá um email de confirmação.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-gray-700 font-semibold mb-2">Nome Completo *</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2B9BB8] focus:ring-4 focus:ring-blue-100 transition-all"
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2B9BB8] focus:ring-4 focus:ring-blue-100 transition-all"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="telefone" className="block text-gray-700 font-semibold mb-2">Telefone *</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2B9BB8] focus:ring-4 focus:ring-blue-100 transition-all"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label htmlFor="evento" className="block text-gray-700 font-semibold mb-2">Escolha o Evento *</label>
                <select
                  id="evento"
                  name="evento"
                  value={formData.evento}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:border-[#2B9BB8] focus:ring-4 focus:ring-blue-100 transition-all"
                >
                  <option value="">Selecione um evento</option>
                  <option value="workshop-react">Workshop de React Avançado</option>
                  <option value="palestra-ia">Palestra: Inteligência Artificial na Prática</option>
                  <option value="hackathon">Hackathon EEC 2025</option>
                  <option value="curso-python">Curso: Python para Ciência de Dados</option>
                  <option value="workshop-figma">Workshop: Design System com Figma</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-gray-700 font-semibold mb-2">Mensagem (Opcional)</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2B9BB8] focus:ring-4 focus:ring-blue-100 transition-all resize-none"
                  placeholder="Alguma dúvida ou comentário?"
                />
              </div>

              <button type="submit" className="btn-brand">Confirmar Inscrição</button>

              <p className="text-sm text-gray-600 text-center">* Campos obrigatórios</p>
            </form>
          )}
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 mt-8 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Informações Importantes</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start"><span className="mr-2">•</span> Após a inscrição, você receberá um email de confirmação em até 24h</li>
            <li className="flex items-start"><span className="mr-2">•</span> As vagas são limitadas e preenchidas por ordem de inscrição</li>
            <li className="flex items-start"><span className="mr-2">•</span> Certificado digital será emitido para quem participar do evento completo</li>
            <li className="flex items-start"><span className="mr-2">•</span> Em caso de dúvidas, entre em contato: contato@portaleec.com.br</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Inscrever;
