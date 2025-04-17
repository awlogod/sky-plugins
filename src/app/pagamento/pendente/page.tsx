'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PagamentoPendentePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-minecraft-light to-minecraft-green/10 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="card p-8 bg-white/90 backdrop-blur-sm">
            <div className="text-6xl mb-4">⏳</div>
            <h1 className="text-4xl font-minecraft text-yellow-600 mb-4">
              Pagamento em Análise
            </h1>
            <p className="text-gray-600 mb-8">
              Seu pagamento está sendo processado. Você receberá um e-mail assim que o pagamento for confirmado.
            </p>
            <div className="space-y-4">
              <Link
                href="/dashboard"
                className="block w-full px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors shadow-minecraft hover:shadow-minecraft-lg"
              >
                Ver Status do Pedido
              </Link>
              <Link
                href="/produtos"
                className="block w-full px-6 py-3 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors"
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
