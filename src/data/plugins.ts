import { Plugin, Category } from '@/types/plugin';

export const categories: Category[] = [
  { id: 'all', name: 'Todos', icon: '📦' },
  { id: 'rankup', name: 'Rank Up', icon: '🏆' },
  { id: 'skywars', name: 'Sky Wars', icon: '☁️' },
  { id: 'bedwars', name: 'Bed Wars', icon: '🛏️' },
  { id: 'others', name: 'Outros', icon: '🔧' },
];

export const plugins: Plugin[] = [
  {
    id: 1,
    name: 'SkyRank',
    category: 'rankup',
    price: 29.99,
    description: 'Sistema completo de ranks com recompensas e permissões',
    image: '/images/plugins/skyrank.png',
  },
  {
    id: 2,
    name: 'SkyWars Pro',
    category: 'skywars',
    price: 39.99,
    description: 'Plugin de SkyWars com kits, loja e estatísticas',
    image: '/images/plugins/skywars.png',
  },
  {
    id: 3,
    name: 'BedWars Ultimate',
    category: 'bedwars',
    price: 49.99,
    description: 'Sistema completo de BedWars com múltiplos mapas',
    image: '/images/plugins/bedwars.png',
  },
  {
    id: 4,
    name: 'Economy Plus',
    category: 'others',
    price: 19.99,
    description: 'Sistema de economia avançado para seu servidor',
    image: '/images/plugins/economy.png',
  },
];
