'use client';

import { useState } from 'react';
import Link from 'next/link';

type ServerType = 'todos' | 'skywars' | 'bedwars' | 'rankup' | 'outros';

export default function ServidoresPage() {
  const [selectedType, setSelectedType] = useState<ServerType>('todos');

  const serverTypes = [
    { id: 'todos', name: 'Todos' },
    { id: 'skywars', name: 'Sky Wars' },
    { id: 'bedwars', name: 'Bed Wars' },
    { id: 'rankup', name: 'Rank Up' },
    { id: 'outros', name: 'Outros' },
  ];

  const plans = [
    {
      name: 'Básico',
      price: 'R$ 49,90',
      features: [
        'Acesso ao Servidor Básico',
        'Suporte por Ticket',
        'Atualizações por 1 mês',
        'Plugins Básicos',
        'Configuração Inicial',
      ],
      recommended: false,
    },
    {
      name: 'Padrão',
      price: 'R$ 99,90',
      features: [
        'Acesso ao Servidor Completo',
        'Suporte por Ticket e Discord',
        'Atualizações por 3 meses',
        'Plugins Premium',
        'Configuração Personalizada',
        'Sistema de Rank Exclusivo',
        'Acesso a Plugins Exclusivos',
      ],
      recommended: true,
    },
    {
      name: 'Avançado',
      price: 'R$ 149,90',
      features: [
        'Acesso ao Servidor Completo',
        'Suporte Prioritário 24/7',
        'Atualizações por 6 meses',
        'Todos os Plugins Premium',
        'Configuração Avançada',
        'Sistema de Rank Exclusivo',
        'Plugins Exclusivos',
        'Skins Personalizadas',
        'Comandos VIP',
      ],
      recommended: false,
    },
    {
      name: 'Premium',
      price: 'R$ 249,90',
      features: [
        'Acesso ao Servidor Completo',
        'Suporte VIP 24/7',
        'Atualizações Vitalícias',
        'Todos os Plugins Premium',
        'Configuração Premium',
        'Sistema de Rank Exclusivo',
        'Plugins Exclusivos',
        'Skins Personalizadas',
        'Comandos VIP',
        'Acesso a Novos Plugins',
        'Setup Personalizado',
        'Treinamento de Administração',
      ],
      recommended: false,
    },
  ];

  const servers = [
    {
      type: 'skywars',
      name: 'Sky Wars Pro',
      description: 'Servidor de Sky Wars completo com sistema de ranks, kits e loja.',
      price: 'R$ 79,90',
      features: [
        'Sistema de Ranks Exclusivo',
        'Kits Personalizados',
        'Loja de Cosméticos',
        'Anti-Cheat Configurado',
        'Mapas Exclusivos',
      ],
    },
    {
      type: 'bedwars',
      name: 'Bed Wars Ultimate',
      description: 'Servidor de Bed Wars com recursos avançados e personalização.',
      price: 'R$ 79,90',
      features: [
        'Modo Solo e Duo',
        'Sistema de Kits',
        'Loja de Cosméticos',
        'Anti-Cheat Configurado',
        'Mapas Exclusivos',
      ],
    },
    {
      type: 'rankup',
      name: 'Rank Up Master',
      description: 'Servidor de Rank Up com sistema econômico avançado.',
      price: 'R$ 89,90',
      features: [
        'Sistema Econômico',
        'Lojas Personalizadas',
        'Kits Exclusivos',
        'Sistema de Vip',
        'Anti-Cheat Configurado',
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-minecraft-light py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-minecraft-green mb-8">Servidores Minecraft</h1>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-8">
          {serverTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id as ServerType)}
              className={`px-6 py-2 rounded-lg font-bold transition-colors ${
                selectedType === type.id
                  ? 'bg-minecraft-green text-white'
                  : 'bg-white text-minecraft-green border-2 border-minecraft-green hover:bg-minecraft-green hover:text-white'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* Servidores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {servers
            .filter((server) => selectedType === 'todos' || server.type === selectedType)
            .map((server) => (
              <div key={server.name} className="card">
                <h2 className="text-2xl font-bold text-minecraft-green mb-2">
                  {server.name}
                </h2>
                <p className="text-gray-600 mb-4">{server.description}</p>
                <p className="text-3xl font-bold mb-4">{server.price}</p>
                <ul className="space-y-2 mb-6">
                  {server.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-minecraft-green mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full btn-primary">Comprar Agora</button>
              </div>
            ))}
        </div>

        {/* Planos de Fidelização */}
        <h2 className="text-3xl font-bold text-minecraft-green mb-8 text-center">
          Planos de Fidelização
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card relative ${
                plan.recommended
                  ? 'border-2 border-minecraft-green transform scale-105'
                  : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-minecraft-green text-white px-4 py-1 rounded-full text-sm font-bold">
                  RECOMENDADO
                </div>
              )}
              <h2 className="text-2xl font-bold text-minecraft-green mb-2">
                {plan.name}
              </h2>
              <p className="text-3xl font-bold mb-4">{plan.price}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-minecraft-green mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full btn-primary">Assinar Plano</button>
            </div>
          ))}
        </div>

        {/* Informações Adicionais */}
        <div className="mt-12 card">
          <h2 className="text-2xl font-bold text-minecraft-green mb-4">
            Por que escolher nossos servidores?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Plugins Exclusivos</h3>
              <p>Desenvolvemos plugins exclusivos para melhorar sua experiência.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Suporte Dedicado</h3>
              <p>Nossa equipe está sempre disponível para ajudar você.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Atualizações Constantes</h3>
              <p>Mantemos nossos servidores sempre atualizados com as últimas features.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
