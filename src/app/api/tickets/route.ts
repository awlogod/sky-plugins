import { NextResponse } from 'next/server';
import { createTicketChannel } from '@/lib/discord';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { subject, message } = await request.json();

    if (!subject || !message) {
      return NextResponse.json(
        { error: 'Assunto e mensagem são obrigatórios' },
        { status: 400 }
      );
    }

    // Cria o canal de ticket no Discord
    const channel = await createTicketChannel(
      session.user.id,
      session.user.name || 'usuário'
    );

    // Aqui você pode adicionar a lógica para enviar a mensagem inicial no canal
    // com o assunto e a mensagem do ticket

    return NextResponse.json({
      success: true,
      channelId: channel.id,
      message: 'Ticket criado com sucesso!'
    });

  } catch (error) {
    console.error('Erro ao criar ticket:', error);
    return NextResponse.json(
      { error: 'Erro ao criar ticket' },
      { status: 500 }
    );
  }
}
