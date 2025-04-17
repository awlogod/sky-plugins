'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

type ServerStatus = 'online' | 'offline' | 'maintenance';

interface Server {
  id: string;
  name: string;
  type: string;
  status: ServerStatus;
  players: number;
  maxPlayers: number;
  uptime: string;
  lastRestart: string;
}

export default function ServersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [servers, setServers] = useState<Server[]>([]);

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
              <h1 className="text-5xl font-minecraft text-minecraft-green mb-2">Meus Servidores</h1>
              <p className="text-gray-600">Gerencie seus servidores Minecraft</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors shadow-minecraft hover:shadow-minecraft-lg"
              >
                Voltar ao Dashboard
              </Link>
              <Link
                href="/servidores"
                className="px-6 py-3 bg-minecraft-green text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-minecraft hover:shadow-minecraft-lg"
              >
                Novo Servidor
              </Link>
            </div>
          </div>

          {/* Filtros */}
          <div className="card p-6 bg-white/90 backdrop-blur-sm mb-8">
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-minecraft-green text-white rounded-lg">
                Todos
              </button>
              <button className="px-4 py-2 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors">
                Online
              </button>
              <button className="px-4 py-2 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors">
                Offline
              </button>
              <button className="px-4 py-2 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors">
                Em Manutenção
              </button>
            </div>
          </div>

          {/* Lista de Servidores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3].map((server) => (
              <motion.div
                key={server}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: server * 0.1 }}
                className="card p-6 bg-white/90 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">🖥️</span>
                  <div>
                    <h3 className="text-xl font-bold text-minecraft-green">Servidor {server}</h3>
                    <p className="text-gray-600">SkyWars</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Online
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Jogadores</span>
                    <span className="font-bold">12/50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Uptime</span>
                    <span>99.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Último Reinício</span>
                    <span>01/01/2024</span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="px-4 py-2 bg-minecraft-green text-white rounded-lg hover:bg-opacity-90 transition-colors">
                    Reiniciar
                  </button>
                  <button className="px-4 py-2 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors">
                    Configurar
                  </button>
                  <button className="px-4 py-2 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors">
                    Logs
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                    Desligar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mensagem quando não há servidores */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center py-12"
          >
            <span className="text-6xl mb-4 block">🖥️</span>
            <p className="text-gray-600 text-lg">Você ainda não possui nenhum servidor</p>
            <Link
              href="/servidores"
              className="inline-block mt-4 px-6 py-3 bg-minecraft-green text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-minecraft hover:shadow-minecraft-lg"
            >
              Alugar Servidor
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
