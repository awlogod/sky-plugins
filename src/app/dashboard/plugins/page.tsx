'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function UserPluginsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-minecraft-light to-minecraft-green/10">
        <div className="text-2xl font-minecraft text-minecraft-green animate-pulse">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-minecraft-light to-minecraft-green/10 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-5xl font-minecraft text-minecraft-green mb-2">Meus Plugins</h1>
              <p className="text-gray-600">Gerencie seus plugins adquiridos</p>
            </div>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-minecraft-green text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-minecraft hover:shadow-minecraft-lg"
            >
              Voltar ao Dashboard
            </Link>
          </div>

          {/* Filtros */}
          <div className="card p-6 bg-white/90 backdrop-blur-sm mb-8">
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-minecraft-green text-white rounded-lg">
                Todos
              </button>
              <button className="px-4 py-2 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors">
                Ativos
              </button>
              <button className="px-4 py-2 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors">
                Expirados
              </button>
            </div>
          </div>

          {/* Lista de Plugins */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((plugin) => (
              <motion.div
                key={plugin}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: plugin * 0.1 }}
                className="card p-6 bg-white/90 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">📦</span>
                  <div>
                    <h3 className="text-xl font-bold text-minecraft-green">Plugin {plugin}</h3>
                    <p className="text-gray-600">Versão 1.0.0</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Ativo
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Expira em</span>
                    <span className="font-bold">30 dias</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Última atualização</span>
                    <span>01/01/2024</span>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <button className="w-full px-4 py-2 bg-minecraft-green text-white rounded-lg hover:bg-opacity-90 transition-colors">
                    Baixar
                  </button>
                  <button className="w-full px-4 py-2 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors">
                    Ver Detalhes
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mensagem quando não há plugins */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center py-12"
          >
            <span className="text-6xl mb-4 block">📦</span>
            <p className="text-gray-600 text-lg">Você ainda não adquiriu nenhum plugin</p>
            <Link
              href="/plugins"
              className="inline-block mt-4 px-6 py-3 bg-minecraft-green text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-minecraft hover:shadow-minecraft-lg"
            >
              Explorar Plugins
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
