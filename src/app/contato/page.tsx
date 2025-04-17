'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

export default function ContatoPage() {
  const { data: session } = useSession();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar ticket');
      }

      setSuccess(true);
      setSubject('');
      setMessage('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao criar ticket');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-minecraft-green mb-4">Contato</h1>
        <p className="text-gray-600">Entre em contato conosco</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulário de Contato */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-minecraft-green mb-6">Abrir Ticket</h2>

          {!session ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Você precisa estar logado para abrir um ticket</p>
              <a
                href="/auth"
                className="px-6 py-3 bg-minecraft-green text-white rounded-lg hover:bg-minecraft-light transition-colors"
              >
                Fazer Login
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assunto
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-minecraft-green focus:ring-2 focus:ring-minecraft-green/20 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-minecraft-green focus:ring-2 focus:ring-minecraft-green/20 transition-colors h-32"
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              {success && (
                <div className="text-green-500 text-sm">
                  Ticket criado com sucesso! Um canal foi criado no Discord para você.
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-6 py-3 rounded-lg transition-colors ${
                  isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-minecraft-green text-white hover:bg-minecraft-light'
                }`}
              >
                {isLoading ? 'Enviando...' : 'Enviar Ticket'}
              </button>
            </form>
          )}
        </motion.div>

        {/* Informações de Contato */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-minecraft-green mb-6">Outros Contatos</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-minecraft-green mb-2">Email</h3>
              <p className="text-gray-600">contato@skyplugins.com</p>
              <p className="text-sm text-gray-500">Resposta em até 24 horas</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-minecraft-green mb-2">Discord</h3>
              <p className="text-gray-600">discord.gg/skyplugins</p>
              <p className="text-sm text-gray-500">Suporte ao vivo 24/7</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-minecraft-green mb-2">Horário de Atendimento</h3>
              <p className="text-gray-600">Segunda a Sexta: 9h às 18h</p>
              <p className="text-gray-600">Sábado: 9h às 12h</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
