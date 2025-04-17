'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  type: 'plugin' | 'server';
  price: number;
  quantity: number;
}

export default function CarrinhoPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carrega itens do localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsLoading(false);
  }, []);

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-minecraft-light to-minecraft-green/10">
        <div className="text-2xl font-minecraft text-minecraft-green animate-pulse">Carregando...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-minecraft-light to-minecraft-green/10 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
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

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <span className="text-6xl mb-4 block">🛒</span>
              <h2 className="text-2xl font-bold text-minecraft-green mb-4">Seu carrinho está vazio</h2>
              <p className="text-gray-600 mb-8">Adicione itens ao seu carrinho para continuar</p>
              <Link
                href="/produtos"
                className="px-6 py-3 bg-minecraft-green text-white rounded-lg hover:bg-minecraft-light transition-colors shadow-minecraft hover:shadow-minecraft-lg"
              >
                Ver Produtos
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lista de Itens */}
              <div className="lg:col-span-2">
                <div className="card p-6 bg-white/90 backdrop-blur-sm">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 border-b border-gray-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-minecraft-light rounded-lg flex items-center justify-center">
                            <span className="text-2xl">
                              {item.type === 'plugin' ? '📦' : '🖥️'}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-bold text-minecraft-green">{item.name}</h3>
                            <p className="text-gray-600">
                              {item.type === 'plugin' ? 'Plugin' : 'Servidor'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-minecraft-green">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                              R$ {item.price.toFixed(2)} cada
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remover
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resumo do Pedido */}
              <div>
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
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between">
                        <span className="font-bold">Total</span>
                        <span className="text-2xl font-bold text-minecraft-green">
                          R$ {subtotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/checkout"
                      className="block w-full mt-4 px-6 py-3 bg-minecraft-green text-white rounded-lg hover:bg-minecraft-light transition-colors shadow-minecraft hover:shadow-minecraft-lg text-center"
                    >
                      Finalizar Compra
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
