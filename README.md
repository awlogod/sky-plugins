# Sky Plugins

Loja online especializada em plugins e servidores Minecraft.

## Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- Stripe (para pagamentos)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/sky-plugins.git
cd sky-plugins
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=sua_chave_publica_stripe
STRIPE_SECRET_KEY=sua_chave_secreta_stripe
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
src/
├── app/              # Rotas e páginas da aplicação
├── components/       # Componentes reutilizáveis
├── lib/             # Funções utilitárias e configurações
├── styles/          # Estilos globais
└── types/           # Definições de tipos TypeScript
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
