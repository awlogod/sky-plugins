import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sky Plugins',
  description: 'Plugins e Servidores Minecraft de alta qualidade',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Minecraft&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <nav className="bg-minecraft-dark text-white shadow-minecraft-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <a href="/" className="text-3xl font-bold text-minecraft-green hover:text-minecraft-light transition-colors">Sky Plugins</a>
                <div className="flex items-center gap-2">
                  <a
                    href="/produtos"
                    className="px-4 py-2 text-white hover:bg-minecraft-green/20 rounded-lg transition-colors border border-transparent hover:border-minecraft-green"
                  >
                    Produtos
                  </a>
                  <a
                    href="/sobre"
                    className="px-4 py-2 text-white hover:bg-minecraft-green/20 rounded-lg transition-colors border border-transparent hover:border-minecraft-green"
                  >
                    Sobre
                  </a>
                  <a
                    href="/contato"
                    className="px-4 py-2 text-white hover:bg-minecraft-green/20 rounded-lg transition-colors border border-transparent hover:border-minecraft-green"
                  >
                    Contato
                  </a>
                  <a
                    href="/carrinho"
                    className="px-4 py-2 text-white hover:bg-minecraft-green/20 rounded-lg transition-colors border border-transparent hover:border-minecraft-green flex items-center gap-2"
                  >
                    <span>🛒</span>
                    <span>Carrinho</span>
                  </a>
                  <a
                    href="/auth"
                    className="px-4 py-2 bg-minecraft-green text-white rounded-lg hover:bg-minecraft-light transition-colors shadow-minecraft hover:shadow-minecraft-lg"
                  >
                    Entrar
                  </a>
                </div>
              </div>
            </div>
          </nav>
          {children}
          <footer className="bg-minecraft-dark text-white py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-minecraft-green">Sky Plugins</h3>
                  <p>Sua loja de confiança para plugins e servidores Minecraft</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-minecraft-green">Links Rápidos</h3>
                  <ul className="space-y-2">
                    <li><a href="/produtos" className="hover:text-minecraft-green transition-colors">Produtos</a></li>
                    <li><a href="/sobre" className="hover:text-minecraft-green transition-colors">Sobre</a></li>
                    <li><a href="/contato" className="hover:text-minecraft-green transition-colors">Contato</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-minecraft-green">Contato</h3>
                  <p>Email: contato@skyplugins.com</p>
                  <p>Discord: discord.gg/skyplugins</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-minecraft-gray text-center">
                <p>&copy; {new Date().getFullYear()} Sky Plugins. Todos os direitos reservados.</p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
