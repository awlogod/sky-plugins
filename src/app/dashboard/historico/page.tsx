'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Purchase {
  id: string;
  date: string;
  product: string;
  type: 'plugin' | 'server';
  price: number;
  status: 'completed' | 'pending' | 'cancelled';
  invoice: string;
}

export default function PurchaseHistoryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [purchases, setPurchases] = useState<Purchase[]>([]);

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
              <h1 className="text-5xl font-minecraft text-minecraft-green mb-2">Histórico de Compras</h1>
              <p className="text-gray-600">Acompanhe todas as suas transações</p>
            </div>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors shadow-minecraft hover:shadow-minecraft-lg"
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
                Plugins
              </button>
              <button className="px-4 py-2 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors">
                Servidores
              </button>
              <button className="px-4 py-2 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors">
                Concluídas
              </button>
              <button className="px-4 py-2 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors">
                Pendentes
              </button>
            </div>
          </div>

          {/* Lista de Compras */}
          <div className="space-y-6">
            {[1, 2, 3].map((purchase) => (
              <motion.div
                key={purchase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: purchase * 0.1 }}
                className="card p-6 bg-white/90 backdrop-blur-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">
                      {purchase % 2 === 0 ? '🖥️' : '🧩'}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-minecraft-green">
                        {purchase % 2 === 0 ? 'Servidor SkyWars' : 'Plugin SkyPvP'}
                      </h3>
                      <p className="text-gray-600">Compra #{purchase}</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-2">
                    <span className="text-2xl font-bold text-minecraft-green">
                      R$ {purchase * 29.90}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Concluída
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-gray-600">Data</p>
                      <p className="font-medium">01/01/2024</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tipo</p>
                      <p className="font-medium">
                        {purchase % 2 === 0 ? 'Servidor' : 'Plugin'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Fatura</p>
                      <p className="font-medium">#SKY{purchase}2024</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Status</p>
                      <p className="font-medium text-green-600">Concluída</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <button className="px-4 py-2 bg-minecraft-green text-white rounded-lg hover:bg-opacity-90 transition-colors">
                    Ver Detalhes
                  </button>
                  <button className="px-4 py-2 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors">
                    Baixar Fatura
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mensagem quando não há compras */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center py-12"
          >
            <span className="text-6xl mb-4 block">📦</span>
            <p className="text-gray-600 text-lg">Você ainda não realizou nenhuma compra</p>
            <Link
              href="/produtos"
              className="inline-block mt-4 px-6 py-3 bg-minecraft-green text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-minecraft hover:shadow-minecraft-lg"
            >
              Explorar Produtos
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
