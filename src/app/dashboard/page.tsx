'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { FaCrown, FaMedal, FaTrophy } from 'react-icons/fa';

interface TopBuyer {
  id: string;
  name: string;
  avatar: string;
  totalSpent: number;
  rank: number;
}

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [topBuyers, setTopBuyers] = useState<TopBuyer[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Simulação de dados dos top compradores
    const mockTopBuyers: TopBuyer[] = [
      {
        id: '1',
        name: 'Player1',
        avatar: '/avatars/player1.png',
        totalSpent: 1500.00,
        rank: 1
      },
      {
        id: '2',
        name: 'Player2',
        avatar: '/avatars/player2.png',
        totalSpent: 1200.00,
        rank: 2
      },
      {
        id: '3',
        name: 'Player3',
        avatar: '/avatars/player3.png',
        totalSpent: 900.00,
        rank: 3
      },
      {
        id: '4',
        name: 'Player4',
        avatar: '/avatars/player4.png',
        totalSpent: 800.00,
        rank: 4
      },
      {
        id: '5',
        name: 'Player5',
        avatar: '/avatars/player5.png',
        totalSpent: 700.00,
        rank: 5
      }
    ];
    setTopBuyers(mockTopBuyers);
  }, []);

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
              <h1 className="text-5xl font-minecraft text-minecraft-green mb-2">Dashboard</h1>
              <p className="text-gray-600">Bem-vindo de volta, {user.nome}! 👋</p>
            </div>
            <button
              onClick={logout}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-minecraft hover:shadow-minecraft-lg"
            >
              Sair
            </button>
          </div>

          {/* Grid Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Perfil do Usuário */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card p-8 bg-white/90 backdrop-blur-sm"
            >
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  <span className="text-6xl">{user.avatar || '👤'}</span>
                  <div className="absolute -bottom-2 -right-2 bg-minecraft-green text-white text-xs px-2 py-1 rounded-full">
                    Online
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-minecraft-green">{user.nome}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="mt-6">
                <span className={`px-4 py-2 rounded-lg text-sm font-bold shadow-minecraft ${
                  user.rank === 'Nemo' ? 'bg-gray-200 text-gray-800' :
                  user.rank === 'Pro' ? 'bg-blue-200 text-blue-800' :
                  user.rank === 'Vip' ? 'bg-purple-200 text-purple-800' :
                  user.rank === 'Mvp' ? 'bg-yellow-200 text-yellow-800' :
                  user.rank === 'Alfa' ? 'bg-orange-200 text-orange-800' :
                  'bg-red-200 text-red-800'
                }`}>
                  {user.rank || 'Nemo'}
                </span>
              </div>
            </motion.div>

            {/* Estatísticas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card p-8 bg-white/90 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-minecraft text-minecraft-green mb-6">Estatísticas</h3>
              <div className="space-y-6">
                {[
                  { label: 'Compras Realizadas', value: '0', icon: '🛒' },
                  { label: 'Plugins Ativos', value: '0', icon: '📦' },
                  { label: 'Servidores Ativos', value: '0', icon: '🖥️' },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-minecraft-light/50 rounded-lg">
                    <span className="text-3xl">{stat.icon}</span>
                    <div>
                      <p className="text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-minecraft-green">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Ações Rápidas */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card p-8 bg-white/90 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-minecraft text-minecraft-green mb-6">Ações Rápidas</h3>
              <div className="space-y-4">
                {[
                  { label: 'Ver Meus Plugins', icon: '📦' },
                  { label: 'Gerenciar Servidores', icon: '🖥️' },
                  { label: 'Histórico de Compras', icon: '📝' },
                ].map((action, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-4 px-6 py-4 bg-minecraft-green text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-minecraft hover:shadow-minecraft-lg"
                  >
                    <span className="text-2xl">{action.icon}</span>
                    <span className="font-bold">{action.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Atividades Recentes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card p-8 mt-8 bg-white/90 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-minecraft text-minecraft-green mb-6">Atividades Recentes</h3>
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">📝</span>
              <p className="text-gray-600 text-lg">Nenhuma atividade recente</p>
              <p className="text-gray-500 text-sm mt-2">Suas atividades aparecerão aqui</p>
            </div>
          </motion.div>

          {/* Ranks Mensais */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card p-6 bg-white/90 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-minecraft-green">Ranks Mensais</h2>
                <div className="flex items-center gap-2">
                  <FaTrophy className="text-yellow-500" />
                  <span className="text-sm text-gray-600">Top Compradores</span>
                </div>
              </div>

              <div className="space-y-4">
                {topBuyers.map((buyer, index) => (
                  <motion.div
                    key={buyer.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      buyer.rank <= 3
                        ? 'bg-gradient-to-r from-yellow-50 to-yellow-100'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={buyer.avatar}
                          alt={buyer.name}
                          className="w-12 h-12 rounded-full border-2 border-minecraft-green"
                        />
                        {buyer.rank <= 3 && (
                          <div className="absolute -top-2 -right-2">
                            {buyer.rank === 1 && (
                              <FaCrown className="text-yellow-500 text-xl" />
                            )}
                            {buyer.rank === 2 && (
                              <FaMedal className="text-gray-400 text-xl" />
                            )}
                            {buyer.rank === 3 && (
                              <FaMedal className="text-yellow-700 text-xl" />
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-minecraft-green">{buyer.name}</h3>
                        <p className="text-sm text-gray-600">
                          Total gasto: R$ {buyer.totalSpent.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${
                        buyer.rank === 1 ? 'text-yellow-500' :
                        buyer.rank === 2 ? 'text-gray-400' :
                        buyer.rank === 3 ? 'text-yellow-700' :
                        'text-gray-600'
                      }`}>
                        #{buyer.rank}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Os ranks são atualizados mensalmente com base no valor total de compras.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Footer do Dashboard */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Sky Plugins Dashboard • {new Date().getFullYear()}</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
