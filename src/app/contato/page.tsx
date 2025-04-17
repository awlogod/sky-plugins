'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type TicketType = 'suporte' | 'vendas' | 'parceria' | 'outros';

export default function ContatoPage() {
  const [ticketType, setTicketType] = useState<TicketType>('suporte');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o ticket
    console.log('Ticket enviado:', { ...formData, tipo: ticketType });
    alert('Ticket enviado com sucesso! Entraremos em contato em breve.');
    setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-minecraft-light to-minecraft-green/10 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-minecraft text-minecraft-green text-center mb-12">
          Entre em Contato
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário de Ticket */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="card p-8"
          >
            <h2 className="text-2xl font-minecraft text-minecraft-green mb-6">
              Abrir Ticket
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Tipo de Ticket</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'suporte', label: 'Suporte' },
                    { id: 'vendas', label: 'Vendas' },
                    { id: 'parceria', label: 'Parceria' },
                    { id: 'outros', label: 'Outros' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setTicketType(type.id as TicketType)}
                      className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                        ticketType === type.id
                          ? 'bg-minecraft-green text-white'
                          : 'bg-white text-minecraft-green border-2 border-minecraft-green hover:bg-minecraft-green hover:text-white'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-minecraft-gray rounded-lg focus:outline-none focus:border-minecraft-green"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-minecraft-gray rounded-lg focus:outline-none focus:border-minecraft-green"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Assunto</label>
                <input
                  type="text"
                  value={formData.assunto}
                  onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-minecraft-gray rounded-lg focus:outline-none focus:border-minecraft-green"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Mensagem</label>
                <textarea
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-minecraft-gray rounded-lg focus:outline-none focus:border-minecraft-green h-32"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-lg py-3"
              >
                Enviar Ticket
              </button>
            </form>
          </motion.div>

          {/* Informações de Contato */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="card p-8">
              <h2 className="text-2xl font-minecraft text-minecraft-green mb-6">
                Nossos Canais
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📧</span>
                  <div>
                    <h3 className="text-xl font-bold text-minecraft-green mb-1">
                      Email
                    </h3>
                    <p className="text-gray-700">contato@skyplugins.com</p>
                    <p className="text-gray-600 text-sm">
                      Respondemos em até 24 horas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-3xl">💬</span>
                  <div>
                    <h3 className="text-xl font-bold text-minecraft-green mb-1">
                      Discord
                    </h3>
                    <p className="text-gray-700">discord.gg/skyplugins</p>
                    <p className="text-gray-600 text-sm">
                      Suporte ao vivo 24/7
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-3xl">🕒</span>
                  <div>
                    <h3 className="text-xl font-bold text-minecraft-green mb-1">
                      Horário de Atendimento
                    </h3>
                    <p className="text-gray-700">Segunda a Sexta: 9h às 18h</p>
                    <p className="text-gray-700">Sábado: 9h às 12h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h2 className="text-2xl font-minecraft text-minecraft-green mb-6">
                Redes Sociais
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🎮', name: 'Twitch', link: 'twitch.tv/skyplugins' },
                  { icon: '📱', name: 'Instagram', link: '@skyplugins' },
                  { icon: '🐦', name: 'Twitter', link: '@skyplugins' },
                  { icon: '📺', name: 'YouTube', link: 'youtube.com/skyplugins' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={`https://${social.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-minecraft-green/10 transition-colors"
                  >
                    <span className="text-2xl">{social.icon}</span>
                    <div>
                      <p className="font-bold text-minecraft-green">{social.name}</p>
                      <p className="text-sm text-gray-600">{social.link}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
