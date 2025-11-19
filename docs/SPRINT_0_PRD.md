# 📋 PRD - Product Requirements Document
**Agente**: Marcus Silva (Product Manager)
**Sprint**: 0 - Planejamento
**Data**: 2025-11-19

---

## 🎯 Visão do Produto

**CHEGOU** é um sistema SaaS para gestão de correspondências em condomínios que permite zeladores registrarem correspondências via foto e notificarem moradores automaticamente via WhatsApp.

### Problema
- Zeladores gastam 2-3h/dia avisando moradores sobre correspondências
- Moradores perdem correspondências importantes (não sabem que chegou)
- Processo manual: telefone, interfone, bilhetes → ineficiente

### Solução
Sistema onde zelador:
1. Tira foto da correspondência (30s)
2. Seleciona morador
3. Sistema envia WhatsApp automático

**Economia**: 90% do tempo do zelador + eliminação de 80% correspondências esquecidas

---

## 👥 Personas

### Persona 1: Seu Manoel (Zelador)
- **Idade**: 58 anos
- **Contexto**: 15 anos no condomínio, usa WhatsApp, pouca experiência com tecnologia
- **Dor**: Passa 2h/dia ligando para moradores
- **Objetivo**: Avisar todos rapidamente sem perder tempo

### Persona 2: Carla (Moradora)
- **Idade**: 35 anos, executiva
- **Contexto**: Trabalha o dia todo, sempre esquece correspondências
- **Dor**: Perde documentos importantes
- **Objetivo**: Ser avisada digitalmente quando chegar correspondência

### Persona 3: Roberto (Síndico/Administrador)
- **Idade**: 45 anos
- **Contexto**: Quer modernizar condomínio, gerencia 5-20 condomínios
- **Dor**: Recebe muitas reclamações sobre correspondências
- **Objetivo**: Reduzir reclamações e aumentar eficiência

---

## 🎯 Objetivos de Negócio

### Objetivos Primários
1. **Reduzir tempo de avisos em 90%**: De 2-3h/dia para 15-20min/dia
2. **Aumentar taxa de retirada**: >70% em 24h (hoje: 40% em 3-5 dias)
3. **Gerar MRR**: R$ 3.000 MRR em 3 meses (50 condomínios)

### Objetivos Secundários
1. Satisfação zelador: NPS > 50
2. Churn: < 5%/mês
3. Onboarding: < 1h do cadastro ao primeiro uso

---

## ✅ Escopo do MVP (Must Have)

### Feature 1: Autenticação Multi-tenant
**Como** síndico/administrador
**Quero** fazer login no sistema
**Para** acessar meus condomínios

**Acceptance Criteria**:
- [x] Login com email/senha
- [x] JWT token com expiração 7 dias
- [x] Middleware de autenticação em rotas protegidas
- [x] Logout funcional
- [x] Suporte multi-tenant (1 usuário → N condomínios)

### Feature 2: Cadastro de Moradores
**Como** síndico
**Quero** cadastrar moradores (nome, apartamento, telefone)
**Para** que zelador possa selecionar ao registrar correspondência

**Acceptance Criteria**:
- [x] CRUD completo (criar, ler, atualizar, deletar)
- [x] Campos: nome, apartamento, telefone (WhatsApp), status (ativo/inativo)
- [x] Validação telefone (formato +55 11 99999-9999)
- [x] Busca por nome ou apartamento
- [x] Importação CSV (100+ moradores de uma vez)
- [x] Morador pode ter múltiplos telefones (principal + secundário)

### Feature 3: Registro de Correspondência (CORE)
**Como** zelador
**Quero** tirar foto da correspondência e selecionar morador rapidamente
**Para** registrar e notificar em < 30 segundos

**Acceptance Criteria**:
- [x] Câmera web/mobile funcional
- [x] Preview foto antes de confirmar
- [x] Upload foto (< 5MB, formatos: JPG, PNG, HEIC)
- [x] Busca morador (autocomplete por apt ou nome)
- [x] Confirmação visual antes de enviar
- [x] Tempo total < 30s (medido)
- [x] Funciona offline (salva local, sincroniza depois) - NICE TO HAVE v1.1

### Feature 4: Notificação WhatsApp Automática (CORE)
**Como** sistema
**Quero** enviar WhatsApp automático ao morador
**Para** notificar que correspondência chegou

**Acceptance Criteria**:
- [x] Integração Baileys (WhatsApp não-oficial)
- [x] Mensagem template customizável
- [x] Envio < 1 minuto após registro
- [x] Retry automático se falhar (3 tentativas)
- [x] Log de notificações (enviada/falhou)
- [x] Link para ver foto (opcional, público com hash)
- [x] Fallback SMS se WhatsApp falhar - NICE TO HAVE v1.2

### Feature 5: Lista de Correspondências
**Como** zelador
**Quero** ver lista de correspondências pendentes e retiradas
**Para** controlar o que já foi entregue

**Acceptance Criteria**:
- [x] Duas listas: Pendentes / Retiradas
- [x] Ordenação cronológica (mais recente primeiro)
- [x] Miniatura da foto
- [x] Informações: morador, apartamento, data/hora
- [x] Indicador "há quanto tempo" (ex: "3h atrás", "2 dias")
- [x] Botão "Marcar como Retirada" (1 clique)
- [x] Filtro por data/morador/apartamento

### Feature 6: Marcar como Retirada
**Como** zelador
**Quero** marcar correspondência como retirada ao entregar
**Para** manter histórico organizado

**Acceptance Criteria**:
- [x] Botão visível em cada correspondência pendente
- [x] Confirmação visual (cor muda, move para lista "Retiradas")
- [x] Registra data/hora exata da retirada
- [x] Não pode desfazer (irreversível)
- [x] Opcional: Assinatura digital do morador - v2.0

### Feature 7: Dashboard Básico
**Como** síndico
**Quero** ver métricas básicas do mês
**Para** entender volume e eficiência

**Acceptance Criteria**:
- [x] Total correspondências mês
- [x] Média por dia
- [x] Tempo médio até retirada
- [x] % pendentes vs retiradas
- [x] Top 5 moradores (mais correspondências)

---

## 🚫 Fora do Escopo MVP (Won't Have)

### Features NÃO incluídas
- ❌ OCR automático (complexo, v1.5+)
- ❌ App mobile nativo (PWA resolve, v2.0)
- ❌ Integração Correios API (pouco valor)
- ❌ Chat zelador ↔ morador (WhatsApp já existe)
- ❌ Sistema de multas por atraso
- ❌ QR Code para retirada (v1.5)
- ❌ Notificação push (v1.2)
- ❌ Modo offline completo (v1.1)
- ❌ Multi-idioma (BR only MVP)

---

## 📊 User Stories Completas

### Epic 1: Autenticação

#### US-001: Login de Usuário
```
Como administrador/síndico
Quero fazer login com email e senha
Para acessar o sistema de forma segura

Acceptance Criteria:
- Email validado (formato correto)
- Senha mínimo 8 caracteres
- Token JWT gerado (7 dias expiração)
- Redirect para dashboard após login
- Mensagem de erro se credenciais inválidas

Estimativa: 3 pontos
Prioridade: CRÍTICA
```

#### US-002: Logout
```
Como usuário logado
Quero fazer logout
Para sair do sistema com segurança

Acceptance Criteria:
- Botão "Sair" visível no header
- Token invalidado ao fazer logout
- Redirect para página de login
- Local storage limpo

Estimativa: 1 ponto
Prioridade: ALTA
```

### Epic 2: Gestão de Moradores

#### US-003: Cadastrar Morador
```
Como síndico
Quero cadastrar novo morador (nome, apt, telefone)
Para que zelador possa selecionar ao registrar correspondência

Acceptance Criteria:
- Formulário com 4 campos: nome, apartamento, telefone, status
- Validação telefone WhatsApp (+55 11 99999-9999)
- Apartamento único (não duplicar)
- Feedback visual ao salvar
- Morador aparece na busca imediatamente

Estimativa: 3 pontos
Prioridade: CRÍTICA
```

#### US-004: Listar Moradores
```
Como zelador/síndico
Quero ver lista de todos moradores
Para consultar e gerenciar cadastros

Acceptance Criteria:
- Lista paginada (20 por página)
- Busca por nome ou apartamento
- Ordenação alfabética (nome ou apt)
- Mostrar status (ativo/inativo)
- Ações: Editar, Desativar

Estimativa: 3 pontos
Prioridade: ALTA
```

#### US-005: Editar Morador
```
Como síndico
Quero editar dados do morador
Para manter cadastro atualizado

Acceptance Criteria:
- Formulário pré-preenchido
- Mesmas validações do cadastro
- Feedback visual ao salvar
- Histórico de alterações (opcional v1.1)

Estimativa: 2 pontos
Prioridade: ALTA
```

#### US-006: Importar Moradores CSV
```
Como síndico
Quero importar lista de moradores via CSV
Para cadastrar 100+ moradores de uma vez

Acceptance Criteria:
- Upload arquivo CSV (< 1MB)
- Validação formato (nome, apt, telefone)
- Preview antes de importar (mostra erros)
- Importação em lote (100+ registros)
- Relatório de sucesso/erro

Estimativa: 5 pontos
Prioridade: MÉDIA (v1.1)
```

### Epic 3: Registro de Correspondência

#### US-007: Tirar Foto da Correspondência
```
Como zelador
Quero tirar foto da correspondência pelo celular
Para registrar visualmente

Acceptance Criteria:
- Câmera abre ao clicar "Nova Correspondência"
- Funciona mobile e desktop (getUserMedia API)
- Preview da foto antes de confirmar
- Botão "Retirar outra" se foto ficou ruim
- Foto salva localmente antes de upload

Estimativa: 5 pontos
Prioridade: CRÍTICA
```

#### US-008: Buscar Morador ao Registrar
```
Como zelador
Quero buscar morador por apartamento ou nome
Para selecionar rapidamente

Acceptance Criteria:
- Autocomplete ao digitar (3+ caracteres)
- Busca por apt: "301" → "Apt 301 - João Silva"
- Busca por nome: "joão" → "Apt 301 - João Silva"
- Máximo 5 resultados
- Seleção com 1 clique

Estimativa: 4 pontos
Prioridade: CRÍTICA
```

#### US-009: Registrar Correspondência
```
Como zelador
Quero registrar correspondência (foto + morador)
Para salvar e notificar morador

Acceptance Criteria:
- Upload foto (< 5MB)
- Associar morador selecionado
- Salvar no banco com status "pendente"
- Disparar notificação WhatsApp automática
- Feedback visual "Correspondência registrada!"
- Tempo total < 30 segundos

Estimativa: 5 pontos
Prioridade: CRÍTICA
```

### Epic 4: Notificação WhatsApp

#### US-010: Enviar WhatsApp Automático
```
Como sistema
Quero enviar WhatsApp automático ao morador
Para notificar que correspondência chegou

Acceptance Criteria:
- Integração Baileys funcional
- Mensagem template: "📬 Olá {nome}, você tem correspondência!"
- Incluir data/hora e link para foto
- Envio < 1 minuto após registro
- Log de envio (sucesso/falha)

Estimativa: 8 pontos
Prioridade: CRÍTICA
```

#### US-011: Visualizar Foto via Link
```
Como morador
Quero clicar no link do WhatsApp e ver foto da correspondência
Para saber se é urgente

Acceptance Criteria:
- Link público com hash único (não indexável)
- Foto em boa qualidade (otimizada para mobile)
- Informações: apt, data/hora chegada
- Sem necessidade de login
- Carrega < 3 segundos

Estimativa: 3 pontos
Prioridade: ALTA
```

### Epic 5: Gestão de Correspondências

#### US-012: Listar Correspondências Pendentes
```
Como zelador
Quero ver lista de correspondências pendentes
Para saber quais ainda não foram retiradas

Acceptance Criteria:
- Ordenação cronológica (mais antiga primeiro)
- Mostrar: miniatura foto, morador, apt, "há X horas/dias"
- Botão "Ver Foto" (modal)
- Botão "Marcar como Retirada"
- Filtro por apartamento/data

Estimativa: 4 pontos
Prioridade: CRÍTICA
```

#### US-013: Marcar como Retirada
```
Como zelador
Quero marcar correspondência como retirada
Para registrar que morador buscou

Acceptance Criteria:
- Botão "Retirar" em cada item pendente
- Confirmação: "Confirma retirada Apt 301?"
- Salva data/hora exata da retirada
- Move para lista "Retiradas"
- Feedback visual "Marcada como retirada!"

Estimativa: 2 pontos
Prioridade: ALTA
```

#### US-014: Listar Correspondências Retiradas
```
Como zelador/síndico
Quero ver histórico de correspondências retiradas
Para consultar quando necessário

Acceptance Criteria:
- Ordenação cronológica (mais recente primeiro)
- Mostrar: foto, morador, apt, data chegada, data retirada
- Filtro por período (hoje, semana, mês, customizado)
- Exportar CSV (opcional v1.1)

Estimativa: 3 pontos
Prioridade: MÉDIA
```

### Epic 6: Dashboard e Relatórios

#### US-015: Dashboard Métricas Básicas
```
Como síndico
Quero ver métricas do mês
Para entender volume e eficiência

Acceptance Criteria:
- Total correspondências mês
- Média por dia
- Tempo médio até retirada (em horas)
- % pendentes vs retiradas
- Gráfico de linha (volume por dia) - opcional v1.1

Estimativa: 5 pontos
Prioridade: MÉDIA
```

---

## 🎨 Requisitos de UX

### Design Principles
1. **Mobile-first**: 80% dos zeladores usam celular
2. **Velocidade**: Cada ação < 2s
3. **Simplicidade**: Máximo 3 cliques para qualquer ação
4. **Visual feedback**: Sempre confirmar ação (toast, animação)
5. **Acessibilidade**: WCAG AA mínimo

### Fluxos Críticos

#### Fluxo 1: Registrar Correspondência (< 30s)
```
1. Zelador clica "Nova Correspondência" (tela inicial)
2. Câmera abre automaticamente
3. Zelador tira foto (3s)
4. Preview aparece + campo busca morador
5. Zelador digita "301" (2s)
6. Seleciona "Apt 301 - João Silva" (1 clique)
7. Clica "Registrar e Notificar" (1 clique)
8. Feedback: "✅ João Silva notificado!" (toast)
Total: ~20 segundos
```

#### Fluxo 2: Marcar como Retirada (< 10s)
```
1. Zelador vê lista de pendentes (tela inicial)
2. Morador chega: "Vim buscar correspondência, apt 301"
3. Zelador clica "Retirar" no item do apt 301
4. Confirma (1 clique)
5. Feedback: "✅ Marcada como retirada!" (toast)
Total: ~5 segundos
```

---

## 📏 Métricas de Sucesso

### Product Metrics (KPIs)
1. **Tempo de registro**: < 30s (target: 20s)
2. **Taxa de notificação entregue**: > 95%
3. **Tempo médio até retirada**: < 24h (baseline: 3-5 dias)
4. **Adoção**: > 80% zeladores usam diariamente (7 dias)

### Business Metrics
1. **Onboarding time**: < 1h (cadastro → primeiro uso)
2. **NPS**: > 50 (zeladores)
3. **Churn**: < 5%/mês
4. **MRR Growth**: > 15%/mês

### Technical Metrics
1. **Uptime**: > 99%
2. **Page load**: < 2s (mobile 3G)
3. **API latency**: < 500ms (p95)
4. **Error rate**: < 1%

---

## 🔒 Requisitos Não-Funcionais

### Performance
- Page load: < 2s (desktop), < 3s (mobile 3G)
- Upload foto: < 5s (5MB, mobile)
- Autocomplete: < 300ms (100 moradores)
- Dashboard: < 1s (1000 correspondências/mês)

### Segurança
- HTTPS obrigatório (TLS 1.2+)
- Senhas hasheadas (bcrypt, salt 10)
- JWT expiração 7 dias
- Rate limiting: 100 req/min por IP
- Validação input (XSS, SQL injection)
- CORS configurado (whitelist)
- Upload: validar tipo/tamanho arquivo

### Escalabilidade
- Suportar 100 condomínios simultâneos (MVP)
- 1.000 correspondências/mês (MVP)
- 5.000 moradores cadastrados (MVP)
- Plano escalar: 1.000 condomínios (Ano 2)

### Disponibilidade
- Uptime: 99% (MVP), 99.9% (v1.1)
- Backup diário (banco + fotos)
- Recovery time: < 4h

### Acessibilidade
- WCAG AA mínimo
- Navegação por teclado
- Screen reader friendly
- Contraste 4.5:1 (texto)

---

## 🛠️ Dependências Técnicas

### Serviços Externos
1. **Supabase**: Postgres + Storage + Auth (FREE até 500MB)
2. **Baileys**: WhatsApp não-oficial (FREE, open-source)
3. **Vercel**: Hospedagem frontend (FREE)
4. **Railway/Render**: Backend Node.js (FREE tier)

### Riscos
1. **Baileys pode ser bloqueado**: Migrar para Twilio (US$ 0.005/msg)
2. **Supabase free tier limite**: Upgrade para $25/mês
3. **LGPD**: Consentimento moradores (WhatsApp opt-in)

---

## 📅 Timeline (4 Semanas)

### Semana 1: Setup + Auth
- Setup projeto (Next.js, Supabase, Prisma)
- Autenticação (login/logout)
- CRUD moradores
- Deploy staging

### Semana 2: Core Feature
- Registro correspondência (foto + busca)
- Upload storage
- Lista pendentes/retiradas
- Marcar como retirada

### Semana 3: WhatsApp
- Integração Baileys
- Notificação automática
- Link visualizar foto
- Logs de envio

### Semana 4: Dashboard + Polish
- Dashboard métricas
- Importação CSV
- Ajustes UX
- Testes completos
- Deploy produção

---

## ✅ Critérios de Aceite do MVP

### Definition of Done
- [ ] Todas user stories CRÍTICAS implementadas
- [ ] Testes E2E (fluxos principais)
- [ ] Performance: Lighthouse > 90
- [ ] Security audit passou
- [ ] Deploy em produção (chegou.vercel.app)
- [ ] Documentação básica (README)
- [ ] Testado com 1 condomínio piloto

### MVP é Sucesso se:
- [ ] Zelador registra correspondência em < 30s
- [ ] 95%+ notificações entregues
- [ ] 70%+ moradores retiram em 24h
- [ ] NPS zelador > 50
- [ ] Sistema funciona 7 dias sem quebrar

---

**Assinado**: Marcus Silva (Product Manager)
**Revisado**: CEO Claude
**Status**: ✅ APROVADO para desenvolvimento
