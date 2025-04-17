import Image from 'next/image';
import { Plugin } from '@/types/plugin';

interface PluginCardProps {
  plugin: Plugin;
}

export default function PluginCard({ plugin }: PluginCardProps) {
  return (
    <div className="card hover:scale-105 transition-transform">
      <div className="aspect-video bg-minecraft-gray mb-4 rounded-lg flex items-center justify-center">
        <span className="text-4xl">🖼️</span>
      </div>
      <h3 className="text-2xl font-bold text-minecraft-green mb-2">{plugin.name}</h3>
      <p className="text-gray-600 mb-4">{plugin.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-minecraft-green">R$ {plugin.price.toFixed(2)}</span>
        <button className="btn-primary">Comprar</button>
      </div>
    </div>
  );
}
