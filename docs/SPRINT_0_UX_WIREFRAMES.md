# 🎨 UX Design & Wireframes - CHEGOU MVP
**Agente**: Sarah Chen (UI/UX Designer)
**Sprint**: 0 - Planejamento
**Data**: 2025-11-19

---

## 🎯 Design Principles

1. **Mobile-First**: 80% dos zeladores usam celular Android
2. **Speed Over Beauty**: Função > forma, velocidade crítica
3. **Thumb-Friendly**: Botões grandes (min 44px), fácil alcance
4. **High Contrast**: Legibilidade em luz solar (portaria)
5. **Minimal Clicks**: Máximo 3 toques para qualquer ação

---

## 🎨 Design System

### Cores

```css
/* Primary (Verde - "Chegou!") */
--primary-50: #f0fdf4
--primary-100: #dcfce7
--primary-500: #22c55e  /* Main */
--primary-600: #16a34a  /* Hover */
--primary-700: #15803d  /* Active */

/* Neutral (Cinza) */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-500: #6b7280
--gray-700: #374151
--gray-900: #111827

/* Status */
--success: #22c55e   /* Verde */
--warning: #f59e0b   /* Laranja */
--error: #ef4444     /* Vermelho */
--info: #3b82f6      /* Azul */

/* Backgrounds */
--bg-primary: #ffffff
--bg-secondary: #f9fafb
--bg-dark: #111827
```

### Tipografia

```css
/* Font Family */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

/* Font Sizes (mobile-first) */
--text-xs: 0.75rem    /* 12px */
--text-sm: 0.875rem   /* 14px */
--text-base: 1rem     /* 16px */
--text-lg: 1.125rem   /* 18px */
--text-xl: 1.25rem    /* 20px */
--text-2xl: 1.5rem    /* 24px */
--text-3xl: 1.875rem  /* 30px */

/* Line Heights */
--leading-tight: 1.25
--leading-normal: 1.5
--leading-relaxed: 1.75

/* Font Weights */
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

### Spacing

```css
/* Baseado em escala 4px */
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-5: 1.25rem   /* 20px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
--space-12: 3rem     /* 48px */
--space-16: 4rem     /* 64px */
```

### Componentes Base

#### Button
```css
/* Primary Button */
.btn-primary {
  background: var(--primary-500);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  min-height: 48px; /* Touch-friendly */
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: all 0.2s;
}

.btn-primary:hover {
  background: var(--primary-600);
}

.btn-primary:active {
  background: var(--primary-700);
  transform: scale(0.98);
}

/* Secondary Button */
.btn-secondary {
  background: white;
  color: var(--gray-700);
  border: 1px solid var(--gray-300);
  /* ... mesmo resto do primary */
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--gray-700);
  /* ... */
}
```

#### Input
```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  font-size: 16px; /* Evita zoom no iOS */
  min-height: 48px;
  transition: border 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--primary-50);
}

.input::placeholder {
  color: var(--gray-400);
}
```

#### Card
```css
.card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

---

## 📱 Wireframes Detalhados

### Tela 1: Login

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│         📬                      │
│      CHEGOU                     │
│                                 │
│  Sistema de Correspondências    │
│                                 │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Email                   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Senha              👁   │   │
│  └─────────────────────────┘   │
│                                 │
│  [ Esqueci minha senha ]        │
│                                 │
│  ┌─────────────────────────┐   │
│  │      ENTRAR             │   │
│  └─────────────────────────┘   │
│                                 │
│                                 │
│  Não tem conta? Falar com       │
│  administradora                 │
│                                 │
└─────────────────────────────────┘

Estados:
- Input vazio: border cinza
- Input focado: border verde + sombra
- Erro: border vermelho + mensagem
- Loading: botão com spinner
```

---

### Tela 2: Home - Lista Correspondências (Zelador)

```
┌─────────────────────────────────┐
│ ☰  CHEGOU           🔔  [Sair] │ ← Header fixo
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │  ➕ NOVA CORRESPONDÊNCIA │   │ ← CTA Principal
│  └─────────────────────────┘   │
│                                 │
│  ────── Pendentes (3) ──────    │
│                                 │
│  ┌───────────────────────────┐ │
│  │ 📦  [Foto mini]           │ │
│  │     Apt 301 - João Silva  │ │
│  │     Hoje às 14:30         │ │
│  │                           │ │
│  │  [👁️ Ver]  [✅ Retirar]   │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ 📦  [Foto mini]           │ │
│  │     Apt 205 - Maria Costa │ │
│  │     Hoje às 12:15         │ │
│  │                           │ │
│  │  [👁️ Ver]  [✅ Retirar]   │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ 📦  [Foto mini]           │ │
│  │     Apt 102 - Pedro Lima  │ │
│  │     Há 2 horas            │ │
│  │                           │ │
│  │  [👁️ Ver]  [✅ Retirar]   │ │
│  └───────────────────────────┘ │
│                                 │
│  ────── Retiradas Hoje (12) ──  │
│                                 │
│  ┌───────────────────────────┐ │
│  │ ✅  Apt 405 - Ana Souza   │ │
│  │     Retirado às 15:45     │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ ✅  Apt 501 - Carlos Melo │ │
│  │     Retirado às 14:20     │ │
│  └───────────────────────────┘ │
│                                 │
│  [Carregar mais...]             │
│                                 │
└─────────────────────────────────┘

Interações:
- Pull to refresh (atualizar lista)
- Swipe left no item → botão "Retirar"
- Tap foto miniatura → modal foto grande
- Tap "Ver" → modal foto grande
- Tap "Retirar" → confirmar retirada

Visual:
- Pendentes: fundo branco, borda esquerda verde
- Retiradas: fundo cinza claro, opacidade 60%
- Animação ao marcar como retirada (slide out)
```

---

### Tela 3: Nova Correspondência - Passo 1 (Foto)

```
┌─────────────────────────────────┐
│ ←  Nova Correspondência         │
├─────────────────────────────────┤
│                                 │
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │                         │   │
│  │      [PREVIEW           │   │
│  │       CÂMERA]           │   │
│  │                         │   │
│  │                         │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │   📷 TIRAR FOTO         │   │ ← Botão grande
│  └─────────────────────────┘   │
│                                 │
│  ou                             │
│                                 │
│  ┌─────────────────────────┐   │
│  │   📁 Escolher da Galeria│   │
│  └─────────────────────────┘   │
│                                 │
│                                 │
│  Dica: Posicione a câmera       │
│  sobre a etiqueta do destino    │
│                                 │
└─────────────────────────────────┘

Após foto tirada:
┌─────────────────────────────────┐
│ ←  Nova Correspondência         │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │   [FOTO CAPTURADA]      │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │   ✓ CONTINUAR           │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │   ↻ TIRAR OUTRA         │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

---

### Tela 4: Nova Correspondência - Passo 2 (Selecionar Morador)

```
┌─────────────────────────────────┐
│ ←  Nova Correspondência         │
├─────────────────────────────────┤
│                                 │
│  [Foto mini preview]            │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🔍  Digite apt ou nome  │   │ ← Autocomplete
│  └─────────────────────────┘   │
│                                 │
│  Resultados:                    │
│                                 │
│  ┌───────────────────────────┐ │
│  │ ○  Apt 301 - João Silva   │ │ ← Radio button
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ ○  Apt 305 - José Santos  │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ ○  Apt 310 - Joana Costa  │ │
│  └───────────────────────────┘ │
│                                 │
│                                 │
│  ┌─────────────────────────┐   │
│  │ REGISTRAR E NOTIFICAR   │   │ ← Botão primary
│  └─────────────────────────┘   │
│                                 │
│  Morador não encontrado?        │
│  [ Cadastrar novo morador ]     │
│                                 │
└─────────────────────────────────┘

Interação:
- Digitando: busca em tempo real (debounce 300ms)
- Selecionar: radio button marca + scroll até botão
- Enter no teclado: seleciona primeiro resultado
```

---

### Tela 5: Confirmação (Toast/Modal)

```
┌─────────────────────────────────┐
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  ✅                        ║ │
│  ║  Correspondência           ║ │
│  ║  registrada!               ║ │
│  ║                            ║ │
│  ║  João Silva (Apt 301)      ║ │
│  ║  foi notificado via        ║ │
│  ║  WhatsApp.                 ║ │
│  ║                            ║ │
│  ║  [ Registrar outra ]       ║ │
│  ║  [ Ver lista ]             ║ │
│  ╚═══════════════════════════╝ │
│                                 │
└─────────────────────────────────┘

Animação:
- Fade in + slide up
- Auto-close após 5s (se não interagir)
- Som de sucesso (opcional)
```

---

### Tela 6: Modal Ver Foto

```
┌─────────────────────────────────┐
│ ✕                               │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │                         │   │
│  │   [FOTO EM              │   │
│  │    ALTA RESOLUÇÃO]      │   │
│  │                         │   │
│  │                         │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  Apt 301 - João Silva           │
│  Registrado: 19/11/2025 14:30   │
│  Por: Seu Manoel                │
│                                 │
│  ┌─────────────────────────┐   │
│  │   ✅ MARCAR RETIRADA    │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘

Gestos:
- Pinch to zoom (ampliar foto)
- Swipe down to close
- Tap fora da foto: fechar
```

---

### Tela 7: Dashboard (Síndico)

```
┌─────────────────────────────────┐
│ ☰  CHEGOU           🔔  [Sair] │
├─────────────────────────────────┤
│  📊 Dashboard                   │
│                                 │
│  ┌─ Novembro 2025 ──────────┐  │
│  │                          │  │
│  │  Total Correspondências  │  │
│  │        127               │  │
│  │                          │  │
│  │  Média por dia           │  │
│  │        4,2               │  │
│  │                          │  │
│  │  Tempo médio retirada    │  │
│  │        18 horas          │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌─ Status Atual ───────────┐  │
│  │  ⏳ Pendentes:    3       │  │
│  │  ✅ Retiradas:    124     │  │
│  │  📈 Taxa retirada: 97%    │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌─ Top 5 Moradores ────────┐  │
│  │  1. Apt 301 - 12 corresp │  │
│  │  2. Apt 205 - 9 corresp  │  │
│  │  3. Apt 102 - 8 corresp  │  │
│  │  4. Apt 405 - 7 corresp  │  │
│  │  5. Apt 501 - 6 corresp  │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌─────────────────────────┐   │
│  │  📥 EXPORTAR RELATÓRIO  │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

---

### Tela 8: Cadastro de Morador

```
┌─────────────────────────────────┐
│ ←  Novo Morador                 │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │ Nome completo           │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Apartamento (ex: 301)   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ WhatsApp                │   │
│  │ +55 (11) 99999-9999     │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Telefone 2 (opcional)   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Email (opcional)        │   │
│  └─────────────────────────┘   │
│                                 │
│  Status                         │
│  ○ Ativo   ○ Inativo            │
│                                 │
│                                 │
│  ┌─────────────────────────┐   │
│  │      SALVAR             │   │
│  └─────────────────────────┘   │
│                                 │
│  [ Cancelar ]                   │
│                                 │
└─────────────────────────────────┘

Validações em tempo real:
- Nome: mínimo 3 caracteres
- Apartamento: obrigatório, único
- WhatsApp: máscara automática, validar formato
- Email: validar formato (se preenchido)
```

---

## 🎨 Componentes React (shadcn/ui)

### Instalação
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
```

### Customizações Tailwind

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.1)',
        'card-hover': '0 4px 6px rgba(0,0,0,0.1)',
      }
    }
  }
}
```

---

## 📐 Layout Responsivo

### Breakpoints
```css
/* Mobile First */
/* xs: 0-639px (default) */
/* sm: 640px+ (tablet portrait) */
/* md: 768px+ (tablet landscape) */
/* lg: 1024px+ (desktop) */
/* xl: 1280px+ (large desktop) */
```

### Grid Layout (Desktop)

```
┌───────────────────────────────────────────┐
│ Header                                    │
├──────────┬────────────────────────────────┤
│          │                                │
│ Sidebar  │  Main Content                  │
│          │                                │
│ - Home   │  ┌──────────────────────────┐  │
│ - Nova   │  │                          │  │
│ - Pend.  │  │   Content Area           │  │
│ - Retir. │  │                          │  │
│ - Morad. │  └──────────────────────────┘  │
│ - Dash.  │                                │
│          │                                │
└──────────┴────────────────────────────────┘

Mobile: Sidebar vira bottom nav ou hamburguer menu
```

---

## ♿ Acessibilidade (WCAG AA)

### Checklist
- [x] Contraste mínimo 4.5:1 (texto)
- [x] Contraste mínimo 3:1 (UI components)
- [x] Navegação por teclado (Tab, Enter, Esc)
- [x] Focus visible (outline azul)
- [x] ARIA labels em ícones
- [x] Alt text em imagens
- [x] Headings hierárquicos (h1 → h2 → h3)
- [x] Skip to main content
- [x] Screen reader friendly
- [x] Tamanho mínimo toque: 44x44px

### Exemplo ARIA
```html
<button aria-label="Marcar correspondência como retirada">
  ✅
</button>

<img src="foto.jpg" alt="Correspondência Apt 301 - João Silva">

<input
  type="text"
  placeholder="Digite apartamento"
  aria-label="Buscar morador por apartamento ou nome"
>
```

---

## 🎬 Animações e Microinterações

### Loading States
```css
/* Skeleton loader */
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Transitions
- Button hover: 0.2s
- Modal open/close: 0.3s
- Toast slide in: 0.3s
- Card hover: 0.2s
- Input focus: 0.2s

### Gestures (Mobile)
- Pull to refresh (lista)
- Swipe left to delete
- Pinch to zoom (foto)
- Swipe down to close (modal)

---

## 📱 PWA (Progressive Web App)

### Instalável
```json
// public/manifest.json
{
  "name": "CHEGOU - Correspondências",
  "short_name": "CHEGOU",
  "description": "Sistema de gestão de correspondências",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#22c55e",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Offline Support (v1.1)
- Service Worker
- Cache de fotos recentes
- Sync quando voltar online

---

## 🎯 Performance Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1
- Lighthouse Score: > 90

---

**Assinado**: Sarah Chen (UI/UX Designer)
**Revisado**: CEO Claude
**Status**: ✅ APROVADO - Pronto para implementação
