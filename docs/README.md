# 📚 Documentação de Planejamento - CHEGOU

Esta pasta contém toda a documentação de planejamento e estratégia do projeto CHEGOU.

## 📁 Estrutura

### Planejamento Inicial
- **[MVP_PLANEJAMENTO.md](MVP_PLANEJAMENTO.md)** - Definição do escopo do MVP, o que incluir/excluir
- **[ARQUITETURA_TECNICA.md](ARQUITETURA_TECNICA.md)** - Stack tecnológica, decisões de arquitetura, schema do banco
- **[CASOS_DE_USO.md](CASOS_DE_USO.md)** - Personas, user stories e casos de uso detalhados

### Estratégia de Negócio
- **[MODELO_NEGOCIO_MICROSAAS.md](MODELO_NEGOCIO_MICROSAAS.md)** - Modelo micro-SaaS, pricing tiers (B2C e B2B), projeções financeiras
- **[ESTRUTURA_AGENTES.md](ESTRUTURA_AGENTES.md)** - Metodologia "Factory of Agents" utilizada no desenvolvimento

### Acompanhamento
- **[PROGRESSO_MVP.md](PROGRESSO_MVP.md)** - Status de desenvolvimento do MVP (atualizado durante sprints)

---

## Sprint 0 - Planejamento Detalhado

Documentos criados pela "Factory of Agents" durante a Sprint 0 (planejamento):

### Produto e Requisitos
- **[SPRINT_0_PRD.md](SPRINT_0_PRD.md)** - Product Requirements Document
  - 15 user stories
  - 7 epics (Auth, Moradores, Correspondências, WhatsApp, Dashboard, etc.)
  - Critérios de aceitação
  - Métricas de sucesso

### Arquitetura e Dados
- **[SPRINT_0_DATABASE_SCHEMA.md](SPRINT_0_DATABASE_SCHEMA.md)** - Schema completo do banco de dados
  - 5 models Prisma (Condominio, Usuario, Morador, Correspondencia, LogNotificacao)
  - Relacionamentos e índices
  - APIs REST detalhadas

### Design e UX
- **[SPRINT_0_UX_WIREFRAMES.md](SPRINT_0_UX_WIREFRAMES.md)** - Wireframes e design system
  - Wireframes ASCII de todas as páginas
  - Sistema de cores (verde primary)
  - Componentes reutilizáveis
  - Fluxos de navegação

### Frontend
- **[SPRINT_0_FRONTEND_COMPONENTS.md](SPRINT_0_FRONTEND_COMPONENTS.md)** - Arquitetura de componentes React
  - Estrutura de pastas
  - Lista de componentes (feature + UI)
  - State management (Zustand + React Query)
  - Convenções de código

### Qualidade
- **[SPRINT_0_QA_TEST_PLAN.md](SPRINT_0_QA_TEST_PLAN.md)** - Plano completo de testes
  - Estratégia de testes (unit, integration, e2e)
  - Test cases para cada feature
  - Checklist de validação
  - Ferramentas sugeridas (Jest, Cypress, Playwright)

### Segurança
- **[SPRINT_0_SECURITY_AUDIT.md](SPRINT_0_SECURITY_AUDIT.md)** - Auditoria de segurança
  - OWASP Top 10 mitigations
  - Conformidade LGPD
  - Checklist de segurança
  - Boas práticas implementadas

### Go-to-Market
- **[SPRINT_0_GTM_STRATEGY.md](SPRINT_0_GTM_STRATEGY.md)** - Estratégia de lançamento
  - Público-alvo (B2C e B2B)
  - Canais de aquisição
  - Pricing strategy
  - Roadmap de marketing

### Marketing
- **[SPRINT_0_LANDING_PAGE.md](SPRINT_0_LANDING_PAGE.md)** - Design e copy da landing page
  - Hero section
  - Features
  - Depoimentos
  - Pricing
  - CTA e conversão

### Consolidado Executivo
- **[SPRINT_0_CEO_CONSOLIDADO.md](SPRINT_0_CEO_CONSOLIDADO.md)** - Resumo executivo de tudo
  - Visão geral do projeto
  - Principais decisões
  - Próximos passos
  - Riscos e mitigações

---

## 🎯 Como Usar Esta Documentação

### Se você é Desenvolvedor
1. Leia o [PRD](SPRINT_0_PRD.md) para entender os requisitos
2. Consulte o [Database Schema](SPRINT_0_DATABASE_SCHEMA.md) para o modelo de dados
3. Veja os [Wireframes](SPRINT_0_UX_WIREFRAMES.md) para entender o design
4. Use o [Frontend Components](SPRINT_0_FRONTEND_COMPONENTS.md) como referência de arquitetura

### Se você é Product Manager
1. Comece pelo [MVP Planejamento](MVP_PLANEJAMENTO.md)
2. Revise o [PRD](SPRINT_0_PRD.md)
3. Acompanhe pelo [Progresso MVP](PROGRESSO_MVP.md)
4. Entenda a estratégia em [GTM Strategy](SPRINT_0_GTM_STRATEGY.md)

### Se você é Founder/CEO
1. Leia o [CEO Consolidado](SPRINT_0_CEO_CONSOLIDADO.md) - resumo executivo
2. Entenda o modelo de negócio em [Modelo Negócio](MODELO_NEGOCIO_MICROSAAS.md)
3. Revise a [GTM Strategy](SPRINT_0_GTM_STRATEGY.md)
4. Veja o [Landing Page](SPRINT_0_LANDING_PAGE.md) para marketing

### Se você é Investidor
1. Comece pelo [CEO Consolidado](SPRINT_0_CEO_CONSOLIDADO.md)
2. Veja o [Modelo de Negócio](MODELO_NEGOCIO_MICROSAAS.md) - financials
3. Revise o [PRD](SPRINT_0_PRD.md) - roadmap de produto
4. Consulte [Security Audit](SPRINT_0_SECURITY_AUDIT.md) - compliance

---

## 📖 Documentação Técnica

Para documentação técnica de desenvolvimento e deploy, consulte:

- **[../app/README.md](../app/README.md)** - Setup local, features, troubleshooting
- **[../app/DEPLOY.md](../app/DEPLOY.md)** - Guia completo de deploy em produção

---

## 🔄 Status de Atualização

| Documento | Última Atualização | Status |
|-----------|-------------------|--------|
| MVP_PLANEJAMENTO.md | Sprint 0 | ✅ Final |
| ARQUITETURA_TECNICA.md | Sprint 0 | ✅ Final |
| MODELO_NEGOCIO_MICROSAAS.md | Sprint 0 | ✅ Final |
| PROGRESSO_MVP.md | Sprint 5 | ✅ MVP Completo |
| SPRINT_0_*.md | Sprint 0 | ✅ Referência |

**Nota**: Os documentos de Sprint 0 são documentos de referência e planejamento. O código implementado pode ter pequenas variações baseadas em decisões técnicas durante o desenvolvimento.

---

**Voltar para**: [README principal](../README.md)
