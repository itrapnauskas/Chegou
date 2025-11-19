# CHEGOU - Modelo de Negócio Micro-SaaS 💰

## 🎯 Público-Alvo Principal

### Tier 1: Síndicos Profissionais
- Gerenciam 5-20 condomínios
- Já cobram taxa de administração
- Buscam ferramentas para eficiência
- **Dor**: Recebem reclamações de múltiplos condomínios
- **Pagamento**: Podem incluir na taxa de administração

### Tier 2: Administradoras de Condomínios
- Gerenciam 20-200+ condomínios
- Já têm infraestrutura tecnológica
- Buscam diferencial competitivo
- **Dor**: Escala manual não funciona
- **Pagamento**: Orçamento anual para tecnologia

### Tier 3: Condomínios Individuais (Auto-serviço)
- 1 condomínio
- Síndico residente (não profissional)
- Menor poder de compra
- **Dor**: Modernizar condomínio
- **Pagamento**: Rateio entre moradores

---

## 💰 Modelo de Pricing (Multi-tier)

### Opção 1: Por Condomínio
```
🏢 STARTER (1 condomínio)
R$ 49/mês ou R$ 490/ano (2 meses grátis)
- Até 50 unidades
- 1 usuário zelador
- WhatsApp ilimitado
- Histórico 3 meses
- Suporte por email

🏢 PROFESSIONAL (1 condomínio)
R$ 99/mês ou R$ 990/ano
- Até 200 unidades
- 3 usuários (zelador, síndico, porteiro)
- WhatsApp + SMS fallback
- Histórico ilimitado
- Relatórios mensais
- Suporte prioritário

🏢🏢🏢 ENTERPRISE (3+ condomínios)
R$ 69/mês por condomínio
- Condomínios ilimitados (mínimo 3)
- Usuários ilimitados
- Multi-tenant (1 painel central)
- White-label (logo da administradora)
- API acesso
- Suporte dedicado
```

### Opção 2: Por Unidade (Escalável)
```
💳 PAY AS YOU GO
R$ 1,50 por unidade/mês
- Mínimo: R$ 50/mês (33 unidades)
- Ideal para: 50-500 unidades
- Desconto progressivo:
  - 100+ unidades: R$ 1,20/un
  - 500+ unidades: R$ 0,90/un
  - 1000+ unidades: R$ 0,60/un
```

### Opção 3: Freemium (Ganho de Mercado)
```
🆓 FREE
- 1 condomínio
- Até 10 unidades
- 50 notificações/mês
- Marca d'água "Powered by CHEGOU"
- Histórico 30 dias

💎 PREMIUM
R$ 79/mês
- Remove limitações
- Remove marca d'água
- Features completas
```

---

## 🎯 RECOMENDAÇÃO: Modelo Híbrido

### Para Condomínios Individuais (B2C)
```
R$ 59/mês (até 100 unidades)
R$ 99/mês (até 300 unidades)
+ R$ 0,50/unidade adicional
```

### Para Administradoras (B2B)
```
R$ 599/mês (até 10 condomínios)
R$ 99/mês por condomínio adicional
ou
R$ 0,80/unidade (todas unidades gerenciadas)

Exemplo: Administradora com 30 condomínios (2.000 unidades)
- Opção 1: R$ 599 + (20 × R$99) = R$ 2.579/mês
- Opção 2: 2.000 × R$0,80 = R$ 1.600/mês ✅
```

---

## 📦 O que ENTREGAR para cada Tier

### ✅ MVP (Todos os Planos)
- [x] Registro correspondência (foto)
- [x] Busca morador
- [x] Notificação WhatsApp automática
- [x] Lista pendentes/retiradas
- [x] Marcar como retirado
- [x] Histórico básico (30-90 dias)

### ✅ Features ESSENCIAIS (Professional+)
- [x] **Multi-usuário**: Zelador, porteiro, síndico
- [x] **Relatórios**: Exportar CSV mensal
- [x] **Dashboard**: Métricas básicas (total mês, média/dia)
- [x] **Edição moradores**: CRUD completo
- [x] **Histórico ilimitado**
- [x] **Notificação SMS fallback** (morador sem WhatsApp)

### ✅ Features VALIOSAS (Enterprise)
- [x] **Multi-condomínio**: 1 login, N condomínios
- [x] **Painel central**: Visão geral todos condomínios
- [x] **White-label**: Logo e cores da administradora
- [x] **Permissões granulares**: Zelador só vê seu condomínio
- [x] **API REST**: Integração com outros sistemas
- [x] **Webhook**: Notificar sistema externo
- [x] **Importação CSV**: Cadastro moradores em massa
- [x] **Subdomain personalizado**: administradora.chegou.app

### ✅ Features COMPETITIVAS (Diferencial)
- [x] **OCR Automático**: Sugestão morador pela foto (IA)
- [x] **QR Code**: Morador escaneia para confirmar retirada
- [x] **App Mobile Nativo**: Melhor UX para zelador
- [x] **Modo Offline**: Funciona sem internet, sincroniza depois
- [x] **Analytics Avançado**: Tempo médio retirada, pico horários
- [x] **Integração Correios**: Rastreamento automático

---

## ❌ O que NÃO ENTREGAR (Custo × Valor)

### ❌ Não Fazer no MVP
- ❌ **OCR Automático**: Complexo, caro, erro alto inicialmente
- ❌ **App Mobile Nativo**: PWA resolve 90% dos casos
- ❌ **Integração Correios**: API limitada e pouco valor
- ❌ **Chat Interno**: WhatsApp já existe
- ❌ **Sistema de Multas**: Fora do escopo
- ❌ **Gestão Financeira**: Existem sistemas melhores
- ❌ **Reserva de Áreas**: Produto diferente

### ❌ Não Fazer Nunca (Foco)
- ❌ **ERP de Condomínio**: Muito complexo
- ❌ **Ata de Assembleia**: Nicho diferente
- ❌ **Controle de Acesso**: Hardware necessário
- ❌ **CFTV**: Produto completamente diferente

### 🤔 Fazer SÓ se Clientes Pedirem MUITO
- 🤔 **Notificação Visitante**: Pode ser v2.0
- 🤔 **Registro de Ocorrências**: Pode complementar
- 🤔 **Achados e Perdidos**: Feature simples, pode adicionar

---

## 🚀 Roadmap de Features (Priorização)

### Fase 1: MVP (Mês 1-2)
```
✅ Registro correspondência + foto
✅ Notificação WhatsApp (Baileys)
✅ CRUD moradores
✅ Lista correspondências
✅ Marcar como retirado
✅ Autenticação básica
```

### Fase 2: PMF - Product Market Fit (Mês 3-4)
```
✅ Multi-usuário (zelador + síndico)
✅ Relatório CSV exportável
✅ Dashboard métricas básicas
✅ SMS fallback (Twilio)
✅ Histórico ilimitado
✅ Melhorias UX (feedback clientes)
```

### Fase 3: B2B Ready (Mês 5-6)
```
✅ Multi-condomínio (multi-tenant)
✅ Painel administradora
✅ Permissões granulares
✅ Importação CSV moradores
✅ White-label básico (logo)
✅ API REST documentada
```

### Fase 4: Escala e Diferenciação (Mês 7-12)
```
✅ OCR automático (Tesseract.js ou Cloud Vision)
✅ App mobile nativo (React Native)
✅ QR Code retirada
✅ Modo offline (PWA)
✅ Analytics avançado
✅ Webhooks
```

---

## 💡 Funcionalidades "Killer" para Administradoras

### 1. Painel Multi-Condomínio
```
┌─────────────────────────────────────┐
│ Dashboard Administradora XYZ        │
├─────────────────────────────────────┤
│                                     │
│ 📊 Visão Geral (30 condomínios)    │
│                                     │
│ Total correspondências: 1.247 (mês)│
│ Média por condomínio: 41,5/mês     │
│ Tempo médio retirada: 18h          │
│                                     │
│ 🏢 Top 5 Condomínios (volume):     │
│ 1. Condomínio Solar - 89 corresp. │
│ 2. Residencial Park - 76 corresp. │
│ ...                                │
│                                     │
│ ⚠️ Alertas:                         │
│ • 3 correspondências >7 dias        │
│ • 2 zeladores sem usar (esta sem.) │
│                                     │
│ [Ver Todos] [Relatório Mensal]     │
└─────────────────────────────────────┘
```

### 2. White-Label Completo
- Logo da administradora no topo
- Cores personalizadas
- Domínio: `xyzadministradora.chegou.app`
- Email notificação: `noreply@xyzadministradora.com.br`
- WhatsApp da administradora (não CHEGOU)

### 3. Onboarding Automático
- Administradora cadastra novo condomínio em 2 min
- Sistema gera link de acesso para zelador
- Importa moradores via CSV
- Zelador recebe email com instruções
- **Resultado**: Administradora pode onboarding 10 condomínios/dia

### 4. Relatório Executivo Mensal
```
PDF automático enviado todo dia 1:
- Total correspondências gerenciadas
- Economia de tempo estimada (horas)
- Condomínios mais/menos ativos
- ROI do sistema
- NPS moradores (se implementar)
```

---

## 💸 Análise Financeira (Micro-SaaS)

### Cenário Conservador (Ano 1)
```
Mês 1-3: 5 condomínios × R$59 = R$ 295/mês
Mês 4-6: 15 condomínios × R$59 = R$ 885/mês
Mês 7-9: 30 condomínios × R$59 = R$ 1.770/mês
Mês 10-12: 50 condomínios × R$59 = R$ 2.950/mês

MRR Médio Ano 1: ~R$ 1.475/mês
ARR Ano 1: ~R$ 17.700

Custos:
- Infra (Supabase + Railway): R$ 100/mês
- WhatsApp (Twilio backup): R$ 50/mês
- Marketing (Google Ads): R$ 500/mês
- Domínio + ferramentas: R$ 50/mês

Custo Total: R$ 700/mês
Margem: ~50% (R$775 lucro mês 12)
```

### Cenário Otimista (Ano 1)
```
Fechar 1 administradora com 20 condomínios (mês 6)
- 20 condomínios × R$69 = R$ 1.380/mês
+ 30 condomínios individuais × R$59 = R$ 1.770/mês

MRR: R$ 3.150/mês
ARR: ~R$ 37.800

Margem: ~70% (R$ 2.200 lucro/mês)
```

### Cenário Realista (Ano 2-3)
```
3 administradoras (60 condomínios) = R$ 4.140/mês
+ 50 condomínios individuais = R$ 2.950/mês

MRR: R$ 7.090/mês
ARR: ~R$ 85.000

Margem: ~75% (custos escalam devagar)
Lucro: ~R$ 5.000/mês
```

---

## 🎯 Estratégia de Go-To-Market

### Fase 1: Validação (Mês 1-3)
1. Encontrar 3-5 condomínios piloto (gratuito)
2. Implementar feedback rapidamente
3. Coletar depoimentos e casos de sucesso
4. **Meta**: 100% satisfação pilotos

### Fase 2: Tração Inicial (Mês 4-6)
1. Landing page + SEO básico
2. Google Ads ("sistema correspondência condomínio")
3. Grupos Facebook síndicos
4. Cold email administradoras (100/semana)
5. **Meta**: 20 condomínios pagantes

### Fase 3: Escala B2B (Mês 7-12)
1. Focar em administradoras (1 cliente = 20+ condomínios)
2. Programa de indicação (síndico indica = 1 mês grátis)
3. Parcerias com fornecedores de condomínios
4. Content marketing (blog, YouTube)
5. **Meta**: 3 administradoras + 50 condomínios

### Fase 4: Consolidação (Ano 2)
1. Expandir para outras cidades (São Paulo → Rio → Brasília)
2. Contratar SDR (vendedor)
3. Participar eventos de síndicos
4. Marketplace integração (Superlógica, Síndico NET)
5. **Meta**: R$ 50k MRR

---

## 🏆 Proposta de Valor para Administradoras

### Problema que Resolvemos
> "Você gere 30 condomínios e recebe 50 ligações/dia de zeladores perguntando 'como avisar moradores?' ou de moradores reclamando 'não sabia que tinha correspondência'. Isso consome 2-3 horas/dia da sua equipe."

### Nossa Solução
> "Com CHEGOU, seus 30 zeladores registram correspondências em 30s e moradores recebem WhatsApp automático. Sua equipe economiza 15h/semana e reclamações caem 90%. Tudo em um painel único onde você vê todos os condomínios."

### ROI Claro
```
Economia por condomínio: 2h/dia × R$ 30/h = R$ 60/dia
Mensal: R$ 1.800 economia
Custo CHEGOU: R$ 69/mês
ROI: 2.500% 🚀

Para 30 condomínios:
Economia: R$ 54.000/mês
Custo: R$ 2.070/mês
ROI: 2.500%
```

---

## 🔧 Features APENAS para Administradoras

### 1. Gestão Centralizada
- 1 login → acesso todos condomínios
- Delegar permissões (zelador só vê seu condomínio)
- Painel comparativo de performance

### 2. Automação em Escala
- Template de mensagem customizável por condomínio
- Onboarding novo condomínio em 3 cliques
- Importação CSV massiva (1.000 moradores/vez)

### 3. Branding
- Logo administradora (não CHEGOU)
- Domínio personalizado
- Email remetente personalizado

### 4. Relatórios Executivos
- Exportar todos condomínios (CSV/PDF)
- Métricas agregadas
- Benchmarking (seu condomínio vs média)

### 5. API e Integrações
- Integrar com sistema interno
- Webhook (novo morador → sincroniza CRM)
- SSO (login único com sistema administradora)

---

## ⚠️ Armadilhas a Evitar

### ❌ Não Fazer:
1. **Over-engineering**: Manter simples, escalar só quando necessário
2. **Feature creep**: Foco em correspondências, não virar ERP
3. **Pricing muito baixo**: R$ 29/mês não sustenta suporte
4. **Suporte 24/7**: Email em 24h basta para MVP
5. **Customização infinita**: Template branco + logo resolve

### ✅ Focar Em:
1. **Velocidade**: Sistema RÁPIDO (< 2s cada ação)
2. **Simplicidade**: Zelador aprende em 5 min
3. **Confiabilidade**: 99%+ uptime
4. **ROI claro**: Economia de tempo mensurável
5. **Suporte top**: Responder rápido, resolver rápido

---

## 🎁 Programa de Indicação (Growth Hack)

### Para Síndicos
```
Indique outro condomínio → 1 mês grátis para ambos
Indique 5 condomínios → 50% desconto permanente
Indique 10 condomínios → Grátis para sempre
```

### Para Administradoras
```
Traga 50+ condomínios → R$ 0,50/unidade (50% off)
Traga 100+ condomínios → White-label grátis + suporte dedicado
Seja parceiro → Compartilhamento receita (20%)
```

---

## 📈 KPIs de Sucesso

### Produto
- ✅ Tempo registro: < 30s
- ✅ Taxa entrega WhatsApp: > 95%
- ✅ Uptime: > 99%
- ✅ NPS: > 50

### Negócio
- ✅ Churn: < 5%/mês
- ✅ CAC: < R$ 300 (payback 5-6 meses)
- ✅ LTV/CAC: > 3
- ✅ Crescimento MRR: > 15%/mês

### Cliente
- ✅ Onboarding: < 1h (do cadastro ao primeiro uso)
- ✅ Adoção: > 80% uso nos primeiros 7 dias
- ✅ Satisfação zelador: > 8/10
- ✅ Recomendação: > 70%

---

## 🚀 RESUMO EXECUTIVO

**ENTREGAR**:
- ✅ Multi-tenant (multi-condomínio)
- ✅ Foto + notificação WhatsApp automática
- ✅ CRUD moradores + importação CSV
- ✅ Relatórios e dashboard
- ✅ White-label (logo + domínio)
- ✅ API REST (v1.5+)

**NÃO ENTREGAR (agora)**:
- ❌ OCR automático (v2.0)
- ❌ App nativo (PWA resolve)
- ❌ Integração Correios
- ❌ ERP features (financeiro, assembleia)

**PRICING**:
- Individual: R$ 59-99/mês
- Administradora: R$ 0,60-0,80/unidade ou R$ 69/condomínio

**MERCADO**:
- Brasil: ~200.000 condomínios
- TAM: R$ 100M+/ano (R$50/mês × 200k condomínios)
- Foco inicial: São Paulo (50k condomínios)

**META ANO 1**:
- 50 condomínios
- R$ 3.000 MRR
- Validar PMF

**META ANO 2-3**:
- 300+ condomínios
- R$ 20.000 MRR
- Escalar vendas B2B

---

## 💎 Diferencial Competitivo

1. **Único foco**: Correspondências (não ERP genérico)
2. **Velocidade**: 30s registro (concorrentes: 2-3 min)
3. **Preço justo**: R$ 59-99 (concorrentes: R$ 200-500)
4. **WhatsApp grátis**: Baileys (concorrentes cobram SMS)
5. **Multi-tenant nativo**: Feito para administradoras
6. **API-first**: Integração fácil

**Concorrentes**:
- Síndico NET, Superlógica: ERPs caros e complexos
- Planilhas Excel: Manual, sem automação
- Caderno portaria: Século passado

**Nossa vantagem**: Fazer UMA coisa MUITO bem ✅
