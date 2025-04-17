'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plugin } from '@/types/plugin';

interface PluginCardProps {
  plugin: Plugin;
  onAddToCart: (plugin: Plugin) => void;
}

export default function PluginCard({ plugin, onAddToCart }: PluginCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-minecraft-green mb-2">{plugin.name}</h3>
        <p className="text-gray-600 mb-4">{plugin.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-minecraft-green">R$ {plugin.price.toFixed(2)}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(plugin)}
            className="px-4 py-2 bg-minecraft-green text-white rounded-lg hover:bg-minecraft-green/90 transition-colors"
          >
            Adicionar ao Carrinho
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
