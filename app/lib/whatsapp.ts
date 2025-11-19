// WhatsApp Integration with Baileys
// Note: Baileys requires additional setup and QR code scanning on first run

import { prisma } from './prisma'

// Mock implementation for development
// Replace with actual Baileys implementation in production

interface WhatsAppMessage {
  to: string // Phone number with country code
  message: string
}

/**
 * Send WhatsApp message
 *
 * In production, this will use Baileys library:
 * - First run: Scan QR code to authenticate
 * - Subsequent runs: Use saved session
 *
 * For now, just logs the message (development mode)
 */
export async function enviarWhatsApp(correspondenciaId: string): Promise<void> {
  try {
    // Fetch correspondencia with morador data
    const corresp = await prisma.correspondencia.findUnique({
      where: { id: correspondenciaId },
      include: {
        morador: true,
        condominio: true,
      },
    })

    if (!corresp) {
      throw new Error('Correspondência não encontrada')
    }

    // Build message
    const linkFoto = `${process.env.NEXT_PUBLIC_APP_URL}/foto/${corresp.fotoHash}`

    const mensagem = `📬 *CHEGOU Correspondência!*

Olá ${corresp.morador.nome},

Você tem uma correspondência aguardando na portaria.

📅 Chegou em: ${new Date(corresp.criadoEm).toLocaleString('pt-BR')}
📷 Ver foto: ${linkFoto}

Retire na portaria em horário comercial.

---
${corresp.condominio.nome}`

    // In development: just log
    if (process.env.NODE_ENV === 'development') {
      console.log('📱 WhatsApp (DEV MODE):')
      console.log('To:', corresp.morador.telefone)
      console.log('Message:', mensagem)
      console.log('---')

      // Simulate success
      await prisma.correspondencia.update({
        where: { id: correspondenciaId },
        data: {
          notificadoEm: new Date(),
          notificacaoStatus: 'ENVIADA',
        },
      })

      await prisma.logNotificacao.create({
        data: {
          correspondenciaId,
          telefone: corresp.morador.telefone,
          mensagem,
          status: 'ENVIADA',
          tentativas: 1,
        },
      })

      return
    }

    // TODO: Production implementation with Baileys
    // Uncomment when ready to use Baileys:
    /*
    import makeWASocket, { useMultiFileAuthState } from '@whiskeysockets/baileys'

    const { state, saveCreds } = await useMultiFileAuthState(
      process.env.WHATSAPP_SESSION_PATH || './auth_info_baileys'
    )

    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: true, // First time: scan QR code
    })

    sock.ev.on('creds.update', saveCreds)

    const telefone = corresp.morador.telefone.replace(/\D/g, '') + '@s.whatsapp.net'

    await sock.sendMessage(telefone, { text: mensagem })

    await prisma.correspondencia.update({
      where: { id: correspondenciaId },
      data: {
        notificadoEm: new Date(),
        notificacaoStatus: 'ENVIADA',
      },
    })

    await prisma.logNotificacao.create({
      data: {
        correspondenciaId,
        telefone: corresp.morador.telefone,
        mensagem,
        status: 'ENVIADA',
        tentativas: 1,
      },
    })
    */

  } catch (error) {
    console.error('❌ Erro ao enviar WhatsApp:', error)

    // Log error
    await prisma.correspondencia.update({
      where: { id: correspondenciaId },
      data: {
        notificacaoStatus: 'FALHOU',
        notificacaoErro: String(error),
      },
    })

    await prisma.logNotificacao.create({
      data: {
        correspondenciaId,
        telefone: '',
        mensagem: '',
        status: 'FALHOU',
        erro: String(error),
        tentativas: 1,
      },
    })

    throw error
  }
}

/**
 * Setup WhatsApp connection (first time)
 * Run this manually to scan QR code
 */
export async function setupWhatsApp() {
  console.log('🔧 WhatsApp Setup')
  console.log('In production, this will open QR code for scanning')
  console.log('For now (development), WhatsApp is mocked')

  // TODO: Implement actual Baileys setup
  /*
  import makeWASocket, { useMultiFileAuthState } from '@whiskeysockets/baileys'

  const { state, saveCreds } = await useMultiFileAuthState('./auth_info_baileys')

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', (update) => {
    const { connection } = update
    if (connection === 'open') {
      console.log('✅ WhatsApp conectado!')
    }
  })
  */
}
