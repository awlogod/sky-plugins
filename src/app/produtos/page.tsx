import Link from 'next/link';

export default function ProdutosPage() {
  return (
    <main className="min-h-screen bg-minecraft-light py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-minecraft-green mb-8">Produtos</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card de Plugins */}
          <Link href="/plugins" className="card hover:scale-105 transition-transform">
            <div className="aspect-video bg-minecraft-gray mb-4 rounded-lg flex items-center justify-center">
              <span className="text-6xl">📦</span>
            </div>
            <h2 className="text-3xl font-bold text-minecraft-green mb-4">Plugins</h2>
            <p className="text-gray-600 mb-4">
              Descubra nossa coleção de plugins exclusivos para seu servidor Minecraft.
              Desde sistemas de rank até minigames completos.
            </p>
            <div className="flex justify-end">
              <button className="btn-primary">Ver Plugins</button>
            </div>
          </Link>

          {/* Card de Servidores */}
          <Link href="/servidores" className="card hover:scale-105 transition-transform">
            <div className="aspect-video bg-minecraft-gray mb-4 rounded-lg flex items-center justify-center">
              <span className="text-6xl">🖥️</span>
            </div>
            <h2 className="text-3xl font-bold text-minecraft-green mb-4">Servidores</h2>
            <p className="text-gray-600 mb-4">
              Alugue um servidor de alta performance para seu projeto.
              Suporte 24/7 e configuração personalizada.
            </p>
            <div className="flex justify-end">
              <button className="btn-primary">Ver Servidores</button>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
