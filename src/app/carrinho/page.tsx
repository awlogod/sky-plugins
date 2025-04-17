'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: string;
  name: string;
  type: 'plugin' | 'server';
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Plugin SkyPvP',
      type: 'plugin',
      price: 29.90,
      quantity: 1,
      image: '🧩'
    },
    {
      id: '2',
      name: 'Servidor SkyWars',
      type: 'server',
      price: 99.90,
      quantity: 1,
      image: '🖥️'
    }
  ]);

  const router = useRouter();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = 0;
  const total = subtotal - discount;

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
              <h1 className="text-5xl font-minecraft text-minecraft-green mb-2">Carrinho</h1>
              <p className="text-gray-600">Revise seus itens antes de finalizar a compra</p>
            </div>
            <Link
              href="/produtos"
              className="px-6 py-3 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors shadow-minecraft hover:shadow-minecraft-lg"
            >
              Continuar Comprando
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Itens */}
            <div className="lg:col-span-2">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="card p-8 bg-white/90 backdrop-blur-sm text-center"
                >
                  <span className="text-6xl mb-4 block">🛒</span>
                  <p className="text-gray-600 text-lg mb-4">Seu carrinho está vazio</p>
                  <Link
                    href="/produtos"
                    className="inline-block px-6 py-3 bg-minecraft-green text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-minecraft hover:shadow-minecraft-lg"
                  >
                    Explorar Produtos
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="card p-6 bg-white/90 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-6">
                        <span className="text-4xl">{item.image}</span>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-minecraft-green">{item.name}</h3>
                          <p className="text-gray-600 capitalize">{item.type}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border-2 border-minecraft-green rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-minecraft-green hover:bg-minecraft-green hover:text-white transition-colors"
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-minecraft-green hover:bg-minecraft-green hover:text-white transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-minecraft-green">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                              R$ {item.price.toFixed(2)} cada
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card p-6 bg-white/90 backdrop-blur-sm sticky top-4"
              >
                <h2 className="text-2xl font-bold text-minecraft-green mb-6">Resumo do Pedido</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Desconto</span>
                    <span className="font-medium text-green-600">-R$ {discount.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="text-2xl font-bold text-minecraft-green">
                        R$ {total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className="w-full mt-6 px-6 py-3 bg-minecraft-green text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-minecraft hover:shadow-minecraft-lg"
                  disabled={cartItems.length === 0}
                  onClick={() => router.push('/checkout')}
                >
                  Finalizar Compra
                </button>
                <p className="mt-4 text-sm text-gray-600 text-center">
                  Pagamento seguro via Mercado Pago
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
