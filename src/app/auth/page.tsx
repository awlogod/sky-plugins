'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

type AuthMode = 'login' | 'register';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [error, setError] = useState<string | null>(null);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (mode === 'register') {
        if (formData.senha !== formData.confirmarSenha) {
          setError('As senhas não coincidem!');
          return;
        }
        await register(formData.nome, formData.email, formData.senha);
      } else {
        await login(formData.email, formData.senha);
      }
    } catch (error) {
      setError('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-minecraft-light to-minecraft-green/10 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card p-8"
          >
            <div className="flex justify-center mb-8">
              <div className="flex space-x-4">
                <button
                  onClick={() => setMode('login')}
                  className={`px-6 py-2 rounded-lg font-bold transition-colors ${
                    mode === 'login'
                      ? 'bg-minecraft-green text-white'
                      : 'bg-white text-minecraft-green border-2 border-minecraft-green hover:bg-minecraft-green hover:text-white'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode('register')}
                  className={`px-6 py-2 rounded-lg font-bold transition-colors ${
                    mode === 'register'
                      ? 'bg-minecraft-green text-white'
                      : 'bg-white text-minecraft-green border-2 border-minecraft-green hover:bg-minecraft-green hover:text-white'
                  }`}
                >
                  Registrar
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-minecraft text-minecraft-green text-center mb-6">
              {mode === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {mode === 'register' && (
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
              )}

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
                <label className="block text-gray-700 mb-2">Senha</label>
                <input
                  type="password"
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-minecraft-gray rounded-lg focus:outline-none focus:border-minecraft-green"
                  required
                />
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-gray-700 mb-2">Confirmar Senha</label>
                  <input
                    type="password"
                    value={formData.confirmarSenha}
                    onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-minecraft-gray rounded-lg focus:outline-none focus:border-minecraft-green"
                    required
                  />
                </div>
              )}

              {mode === 'login' && (
                <div className="flex justify-end">
                  <Link
                    href="/recuperar-senha"
                    className="text-minecraft-green hover:underline text-sm"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className="w-full btn-primary text-lg py-3"
              >
                {mode === 'login' ? 'Entrar' : 'Registrar'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {mode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
                <button
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="text-minecraft-green hover:underline font-bold"
                >
                  {mode === 'login' ? 'Registre-se' : 'Faça login'}
                </button>
              </p>
            </div>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou continue com</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-minecraft-gray rounded-lg hover:bg-minecraft-green/10 transition-colors"
                >
                  <span className="text-2xl">🎮</span>
                  <span>Minecraft</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-minecraft-gray rounded-lg hover:bg-minecraft-green/10 transition-colors"
                >
                  <span className="text-2xl">💬</span>
                  <span>Discord</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
