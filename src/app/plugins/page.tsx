'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import PluginCard from '@/components/PluginCard';
import { plugins } from '@/data/plugins';
import { Plugin } from '@/types/plugin';

export default function PluginsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useCart();

  const filteredPlugins = selectedCategory === 'all'
    ? plugins
    : plugins.filter(plugin => plugin.category === selectedCategory);

  const handleAddToCart = (plugin: Plugin) => {
    addToCart({
      id: plugin.id.toString(),
      name: plugin.name,
      type: 'plugin',
      price: plugin.price,
    });
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-minecraft-green mb-4">Plugins</h1>
        <p className="text-gray-600">Escolha os melhores plugins para o seu servidor</p>
      </motion.div>

      <div className="flex justify-center gap-4 mb-8">
        {['all', 'survival', 'minigames', 'economy', 'protection'].map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-lg ${
              selectedCategory === category
                ? 'bg-minecraft-green text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'Todos' : category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPlugins.map((plugin) => (
          <PluginCard
            key={plugin.id}
            plugin={plugin}
            onAddToCart={handleAddToCart}
          />
        ))}
      </motion.div>
    </main>
  );
}
