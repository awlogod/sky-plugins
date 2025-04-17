'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type UserRank = 'Nemo' | 'Pro' | 'Vip' | 'Mvp' | 'Alfa' | 'Monstro';

interface TopUser {
  name: string;
  purchases: number;
  rank: UserRank;
  avatar: string;
}

export default function Home() {
  const [topUsers, setTopUsers] = useState<TopUser[]>([
    {
      name: 'Notch',
      purchases: 156,
      rank: 'Monstro',
      avatar: '👨‍💻',
    },
    {
      name: 'Dream',
      purchases: 128,
      rank: 'Alfa',
      avatar: '😎',
    },
    {
      name: 'Technoblade',
      purchases: 98,
      rank: 'Mvp',
      avatar: '👑',
    },
    {
      name: 'Skeppy',
      purchases: 76,
      rank: 'Vip',
      avatar: '🎮',
    },
    {
      name: 'BadBoyHalo',
      purchases: 54,
      rank: 'Pro',
      avatar: '🎯',
    },
  ]);

  const rankColors = {
    Nemo: 'text-gray-400',
    Pro: 'text-blue-500',
    Vip: 'text-purple-500',
    Mvp: 'text-yellow-500',
    Alfa: 'text-orange-500',
    Monstro: 'text-red-500',
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-minecraft-light to-minecraft-green/10">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/minecraft-bg.png')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-minecraft text-minecraft-green mb-6"
          >
            Sky Plugins
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            Os melhores plugins e servidores para seu Minecraft
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/produtos" className="btn-primary text-lg px-8 py-3">
              Ver Produtos
            </Link>
            <Link href="/plugins" className="btn-secondary text-lg px-8 py-3">
              Explorar Plugins
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-minecraft text-minecraft-green text-center mb-12">
            Por que nos escolher?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Performance',
                description: 'Plugins otimizados para o melhor desempenho',
              },
              {
                icon: '🛡️',
                title: 'Segurança',
                description: 'Proteção contra exploits e hacks',
              },
              {
                icon: '🎮',
                title: 'Diversão',
                description: 'Recursos exclusivos para melhorar sua experiência',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="card text-center p-6"
              >
                <span className="text-5xl mb-4">{feature.icon}</span>
                <h3 className="text-2xl font-bold text-minecraft-green mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Users Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-minecraft text-minecraft-green text-center mb-12">
            Top Compradores
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="card p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-6">Posição</th>
                      <th className="text-left py-4 px-6">Usuário</th>
                      <th className="text-left py-4 px-6">Compras</th>
                      <th className="text-left py-4 px-6">Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topUsers.map((user, index) => (
                      <motion.tr
                        key={user.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-4 px-6">
                          <span className="text-2xl font-bold text-minecraft-green">
                            #{index + 1}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{user.avatar}</span>
                            <span className="font-bold">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-bold">{user.purchases}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`font-bold ${rankColors[user.rank]}`}
                          >
                            {user.rank}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-minecraft-green/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-minecraft text-minecraft-green mb-8">
            Pronto para começar?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de jogadores que já confiam em nossos produtos
          </p>
          <Link href="/produtos" className="btn-primary text-lg px-8 py-3">
            Explorar Produtos
          </Link>
        </div>
      </section>
    </main>
  );
}
