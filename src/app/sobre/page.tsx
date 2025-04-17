'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-minecraft-light to-minecraft-green/10">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/minecraft-bg.png')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-minecraft text-minecraft-green mb-6"
          >
            Nossa História
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            De jogadores apaixonados a desenvolvedores de sucesso
          </motion.p>
        </div>
      </section>

      {/* História */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="card p-8 mb-12"
            >
              <h2 className="text-3xl font-minecraft text-minecraft-green mb-6">
                Como Tudo Começou
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Em 2018, um grupo de amigos apaixonados por Minecraft se reuniu com um sonho em comum: criar experiências únicas e memoráveis para outros jogadores. O que começou como um hobby logo se transformou em uma missão.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Nossa primeira criação foi um simples plugin de ranks, desenvolvido para nosso próprio servidor. Para nossa surpresa, outros jogadores começaram a pedir para usar nosso plugin. Foi assim que nasceu a Sky Plugins.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card p-8 mb-12"
            >
              <h2 className="text-3xl font-minecraft text-minecraft-green mb-6">
                Nossa Missão
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Acreditamos que cada servidor Minecraft é um mundo único, com sua própria história para contar. Nossa missão é fornecer as ferramentas necessárias para que essas histórias se tornem realidade.
              </p>
              <p className="text-lg text-gray-700">
                Desenvolvemos cada plugin e servidor pensando na experiência do jogador, na performance e na diversão. Queremos que cada linha de código que escrevemos contribua para criar momentos inesquecíveis.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="card p-8"
            >
              <h2 className="text-3xl font-minecraft text-minecraft-green mb-6">
                Onde Estamos Hoje
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Hoje, somos uma equipe de 15 desenvolvedores apaixonados, atendendo mais de 10.000 servidores em todo o mundo. Nossos plugins e servidores são usados por comunidades grandes e pequenas, cada uma criando sua própria história no universo do Minecraft.
              </p>
              <p className="text-lg text-gray-700">
                Mas não importa o quanto cresçamos, nunca esqueceremos nossas raízes. Continuamos sendo aqueles mesmos jogadores apaixonados, agora com a missão de ajudar outros a criar suas próprias aventuras.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-minecraft text-minecraft-green text-center mb-12">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '❤️',
                title: 'Paixão',
                description: 'Amamos o que fazemos e isso se reflete em cada linha de código',
              },
              {
                icon: '⚡',
                title: 'Inovação',
                description: 'Estamos sempre buscando novas formas de melhorar a experiência',
              },
              {
                icon: '🤝',
                title: 'Comunidade',
                description: 'Valorizamos cada membro da nossa comunidade e suas histórias',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="card text-center p-6"
              >
                <span className="text-5xl mb-4">{value.icon}</span>
                <h3 className="text-2xl font-bold text-minecraft-green mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-minecraft text-minecraft-green text-center mb-12">
            Nossa Equipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex',
                role: 'Fundador & CEO',
                avatar: '👨‍💻',
                description: 'Apaixonado por Minecraft desde 2012, lidera nossa equipe com visão e dedicação',
              },
              {
                name: 'Maria',
                role: 'Desenvolvedora Chefe',
                avatar: '👩‍💻',
                description: 'Especialista em plugins com mais de 5 anos de experiência',
              },
              {
                name: 'Pedro',
                role: 'Designer de Experiência',
                avatar: '🎨',
                description: 'Responsável por tornar nossos produtos intuitivos e divertidos',
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="card text-center p-6"
              >
                <span className="text-6xl mb-4">{member.avatar}</span>
                <h3 className="text-2xl font-bold text-minecraft-green mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <p className="text-gray-700">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-minecraft-green/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-minecraft text-minecraft-green mb-8">
            Faça Parte da Nossa História
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de jogadores que já confiam em nossos produtos
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/produtos" className="btn-primary text-lg px-8 py-3">
              Ver Produtos
            </a>
            <a href="/contato" className="btn-secondary text-lg px-8 py-3">
              Fale Conosco
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
