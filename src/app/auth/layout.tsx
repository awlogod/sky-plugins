import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Autenticação - Sky Plugins',
  description: 'Faça login ou registre-se na Sky Plugins',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
