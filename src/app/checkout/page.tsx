'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import { createPreference } from '@/lib/mercadopago';

type PaymentMethod = 'credit' | 'pix' | 'mercadopago' | 'boleto' | 'scoins';

interface PaymentOption {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: string;
  fee?: number;
}

interface CreditCardForm {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  installments: number;
}

interface PixForm {
  name: string;
  cpf: string;
  qrCode?: string;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'credit',
    name: 'Cartão de Crédito',
    description: 'Pague em até 12x sem juros',
    icon: '💳',
    fee: 0
  },
  {
    id: 'pix',
    name: 'PIX',
    description: 'Pagamento instantâneo com 5% de desconto',
    icon: '📱',
    fee: -0.05
  },
  {
    id: 'mercadopago',
    name: 'Mercado Pago',
    description: 'Pague com saldo ou boleto',
    icon: '🛒',
    fee: 0
  },
  {
    id: 'boleto',
    name: 'Boleto Bancário',
    description: 'Pagamento em até 2 dias úteis',
    icon: '📄',
    fee: 0
  },
  {
    id: 'scoins',
    name: 'sCoins',
    description: 'Use suas moedas da loja',
    icon: '🪙',
    fee: 0
  }
];

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [showPixForm, setShowPixForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [creditCardForm, setCreditCardForm] = useState<CreditCardForm>({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    installments: 1
  });
  const [pixForm, setPixForm] = useState<PixForm>({
    name: '',
    cpf: '',
    qrCode: undefined
  });

  const [cartItems] = useState([
    {
      id: '1',
      name: 'Plugin SkyPvP',
      type: 'plugin',
      price: 29.90,
      quantity: 1
    },
    {
      id: '2',
      name: 'Servidor SkyWars',
      type: 'server',
      price: 99.90,
      quantity: 1
    }
  ]);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = selectedMethod === 'pix' ? subtotal * 0.05 : 0;
  const total = subtotal - discount;
  const installmentValue = total / creditCardForm.installments;

  const handlePaymentSelection = async (method: PaymentMethod) => {
    setSelectedMethod(method);
    setShowCreditCardForm(method === 'credit');
    setShowPixForm(method === 'pix');

    if (method === 'mercadopago') {
      setIsLoading(true);
      try {
        const items = cartItems.map(item => ({
          title: item.name,
          unit_price: item.price,
          quantity: item.quantity,
          currency_id: 'BRL'
        }));

        const backUrls = {
          success: `${window.location.origin}/pagamento/sucesso`,
          failure: `${window.location.origin}/pagamento/erro`,
          pending: `${window.location.origin}/pagamento/pendente`
        };

        const response = await createPreference(items, backUrls);
        if (response.init_point) {
          window.location.href = response.init_point;
        } else {
          throw new Error('URL de pagamento não disponível');
        }
      } catch (error) {
        console.error('Erro ao criar preferência do Mercado Pago:', error);
        setIsLoading(false);
      }
    } else if (method !== 'pix') {
      setPixForm({ name: '', cpf: '', qrCode: undefined });
    }
  };

  const handleCreditCardChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCreditCardForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPixForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2').trim();
  };

  const formatCPF = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const generatePixQRCode = () => {
    if (!isPixFormValid()) return;
    // Aqui você geraria o QR Code real com os dados do pagamento
    const mockQRCode = `00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865405${total.toFixed(2)}5802BR5913SKY PLUGINS LTDA6008BRASILIA62070503***6304E2CA`;
    setPixForm(prev => ({ ...prev, qrCode: mockQRCode }));
  };

  const handleSubmit = () => {
    if (!selectedMethod) return;
    if (selectedMethod === 'credit' && !isCreditCardFormValid()) return;
    if (selectedMethod === 'pix' && !isPixFormValid()) return;
    // Aqui você implementaria a lógica de processamento do pagamento
    router.push('/pagamento/sucesso');
  };

  const isCreditCardFormValid = () => {
    return (
      creditCardForm.number.replace(/\D/g, '').length === 16 &&
      creditCardForm.name.length >= 3 &&
      creditCardForm.expiry.length === 5 &&
      creditCardForm.cvv.length === 3
    );
  };

  const isPixFormValid = () => {
    return (
      pixForm.name.length >= 3 &&
      pixForm.cpf.replace(/\D/g, '').length === 11
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-minecraft-light to-minecraft-green/10 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-5xl font-minecraft text-minecraft-green mb-2">Finalizar Compra</h1>
              <p className="text-gray-600">Escolha sua forma de pagamento</p>
            </div>
            <Link
              href="/carrinho"
              className="px-6 py-3 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg hover:bg-minecraft-green hover:text-white transition-colors shadow-minecraft hover:shadow-minecraft-lg"
            >
              Voltar ao Carrinho
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-gray-600">{item.name}</span>
                      <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Desconto PIX</span>
                        <span>-R$ {discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between mt-4">
                      <span className="font-bold">Total</span>
                      <span className="text-2xl font-bold text-minecraft-green">
                        R$ {total.toFixed(2)}
                      </span>
                    </div>
                    {selectedMethod === 'credit' && (
                      <div className="mt-4 p-4 bg-minecraft-green/10 rounded-lg">
                        <p className="text-sm text-gray-600">Valor da parcela:</p>
                        <p className="text-xl font-bold text-minecraft-green">
                          {creditCardForm.installments}x de R$ {installmentValue.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Opções de Pagamento */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card p-6 bg-white/90 backdrop-blur-sm"
              >
                <h2 className="text-2xl font-bold text-minecraft-green mb-6">Método de Pagamento</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePaymentSelection(option.id)}
                      disabled={isLoading && selectedMethod === option.id}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        selectedMethod === option.id
                          ? 'border-minecraft-green bg-minecraft-green/10'
                          : 'border-gray-200 hover:border-minecraft-green'
                      } ${isLoading && selectedMethod === option.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{option.icon}</span>
                        <div className="text-left">
                          <h3 className="font-bold text-minecraft-green">{option.name}</h3>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                      </div>
                      {isLoading && selectedMethod === option.id && (
                        <div className="mt-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-minecraft-green"></div>
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Formulário do Cartão de Crédito */}
                {showCreditCardForm && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número do Cartão
                        </label>
                        <input
                          type="text"
                          name="number"
                          value={formatCardNumber(creditCardForm.number)}
                          onChange={handleCreditCardChange}
                          maxLength={19}
                          placeholder="0000 0000 0000 0000"
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-minecraft-green focus:ring-2 focus:ring-minecraft-green/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome no Cartão
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={creditCardForm.name}
                          onChange={handleCreditCardChange}
                          placeholder="Nome como está no cartão"
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-minecraft-green focus:ring-2 focus:ring-minecraft-green/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data de Validade
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          value={formatExpiry(creditCardForm.expiry)}
                          onChange={handleCreditCardChange}
                          maxLength={5}
                          placeholder="MM/AA"
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-minecraft-green focus:ring-2 focus:ring-minecraft-green/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={creditCardForm.cvv}
                          onChange={handleCreditCardChange}
                          maxLength={3}
                          placeholder="000"
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-minecraft-green focus:ring-2 focus:ring-minecraft-green/20 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parcelas
                      </label>
                      <select
                        name="installments"
                        value={creditCardForm.installments}
                        onChange={handleCreditCardChange}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-minecraft-green focus:ring-2 focus:ring-minecraft-green/20 transition-colors"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num}x de R$ {(total / num).toFixed(2)} sem juros
                          </option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* Formulário do PIX */}
                {showPixForm && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 space-y-4"
                  >
                    {!pixForm.qrCode ? (
                      <>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nome Completo
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={pixForm.name}
                              onChange={handlePixChange}
                              placeholder="Digite seu nome completo"
                              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-minecraft-green focus:ring-2 focus:ring-minecraft-green/20 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CPF
                            </label>
                            <input
                              type="text"
                              name="cpf"
                              value={formatCPF(pixForm.cpf)}
                              onChange={handlePixChange}
                              maxLength={14}
                              placeholder="000.000.000-00"
                              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-minecraft-green focus:ring-2 focus:ring-minecraft-green/20 transition-colors"
                            />
                          </div>
                        </div>
                        <button
                          onClick={generatePixQRCode}
                          disabled={!isPixFormValid()}
                          className={`w-full mt-4 px-6 py-3 rounded-lg transition-colors shadow-minecraft hover:shadow-minecraft-lg ${
                            isPixFormValid()
                              ? 'bg-minecraft-green text-white hover:bg-minecraft-light'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Gerar QR Code PIX
                        </button>
                      </>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="bg-white p-4 rounded-lg inline-block">
                          <QRCodeSVG
                            value={pixForm.qrCode}
                            size={200}
                            level="H"
                            includeMargin={true}
                          />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-minecraft-green">Valor: R$ {total.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">Escaneie o QR Code com seu aplicativo de banco</p>
                        </div>
                        <button
                          onClick={() => setPixForm(prev => ({ ...prev, qrCode: undefined }))}
                          className="text-minecraft-green hover:text-minecraft-light transition-colors"
                        >
                          Gerar novo QR Code
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!selectedMethod ||
                    (selectedMethod === 'credit' && !isCreditCardFormValid()) ||
                    (selectedMethod === 'pix' && !pixForm.qrCode)}
                  className={`w-full mt-8 px-6 py-3 rounded-lg transition-colors shadow-minecraft hover:shadow-minecraft-lg ${
                    selectedMethod &&
                    ((selectedMethod !== 'credit' && selectedMethod !== 'pix') ||
                    (selectedMethod === 'credit' && isCreditCardFormValid()) ||
                    (selectedMethod === 'pix' && pixForm.qrCode))
                      ? 'bg-minecraft-green text-white hover:bg-minecraft-light'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {selectedMethod === 'credit' && !isCreditCardFormValid()
                    ? 'Preencha todos os campos do cartão'
                    : selectedMethod === 'pix' && !pixForm.qrCode
                    ? 'Gere o QR Code PIX'
                    : selectedMethod
                    ? 'Finalizar Pagamento'
                    : 'Selecione um método de pagamento'}
                </button>

                <p className="mt-4 text-sm text-gray-600 text-center">
                  Pagamento 100% seguro
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
