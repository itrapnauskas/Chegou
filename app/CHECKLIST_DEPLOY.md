# ✅ CHECKLIST - Preparação para Deploy

Use este checklist para garantir que tudo está funcionando antes de fazer deploy.

---

## 🏠 AMBIENTE LOCAL

### Pré-requisitos Instalados

- [ ] Node.js 18+ instalado (`node -v`)
- [ ] Docker Desktop instalado e rodando (`docker -v`)
- [ ] Git instalado (`git --version`)

### Setup Local Completo

- [ ] Executou `./setup.sh` ou setup manual
- [ ] Arquivo `.env.local` criado e configurado
- [ ] Dependências instaladas (`node_modules/` existe)
- [ ] PostgreSQL rodando no Docker (`docker-compose ps`)
- [ ] Migrations executadas (tabelas criadas)
- [ ] Seed executado (dados de teste)
- [ ] Diretório `public/uploads/` criado

### Servidor Local Funcionando

- [ ] `npm run dev` inicia sem erros
- [ ] Acessa http://localhost:3000 sem erros
- [ ] Console do navegador sem erros críticos
- [ ] Console do terminal sem erros críticos

---

## 🔐 AUTENTICAÇÃO

- [ ] Página de login carrega (`/login`)
- [ ] Login com credenciais corretas funciona
  - Email: `zelador@chegou.com`
  - Senha: `zelador123`
- [ ] Redirecionamento automático para `/` após login
- [ ] Logout funciona
- [ ] Tentativa de acesso sem login redireciona para `/login`
- [ ] Token JWT salvo no localStorage

---

## 📦 CORRESPONDÊNCIAS

### Listagem (Home `/`)

- [ ] Página home carrega sem erros
- [ ] Lista de correspondências aparece
- [ ] Cards de correspondências têm foto, morador, status
- [ ] Estatísticas no topo (Total, Pendentes, Retiradas)
- [ ] Filtro "Todos" funciona
- [ ] Filtro "Pendente" funciona
- [ ] Filtro "Retirado" funciona

### Visualização

- [ ] Clicar em "Ver" abre modal com foto grande
- [ ] Modal mostra informações completas (morador, data, status)
- [ ] Fechar modal funciona

### Marcar como Retirado

- [ ] Botão "Marcar como Retirado" aparece em pendentes
- [ ] Clicar marca como retirado no banco
- [ ] Status atualiza na interface
- [ ] Botão desaparece após marcar

### Nova Correspondência (`/nova`)

- [ ] Página `/nova` carrega
- [ ] Fluxo de 2 passos aparece (Foto → Morador)
- [ ] **Passo 1 - Câmera**:
  - [ ] Webcam abre (permite permissão)
  - [ ] Captura foto funciona
  - [ ] Preview da foto aparece
  - [ ] Botão "Tirar outra foto" funciona
  - [ ] Avança para passo 2
- [ ] **Passo 2 - Morador**:
  - [ ] Preview da foto continua visível
  - [ ] Campo de busca de morador funciona
  - [ ] Busca por apartamento funciona
  - [ ] Busca por nome funciona
  - [ ] Selecionar morador funciona
  - [ ] Botão "Registrar" habilitado após seleção
- [ ] **Upload**:
  - [ ] Clicar em "Registrar" inicia upload
  - [ ] Loading aparece
  - [ ] Upload completa sem erros
  - [ ] Foto salva em `public/uploads/condominios/.../`
  - [ ] Correspondência criada no banco
  - [ ] Notificação WhatsApp logada no console
  - [ ] Redirecionamento para home
  - [ ] Nova correspondência aparece na lista

---

## 👥 MORADORES

### Listagem (`/moradores`)

- [ ] Página `/moradores` carrega
- [ ] Lista de moradores aparece
- [ ] Cards mostram apartamento, nome, telefone
- [ ] Badge "Ativo/Inativo" aparece
- [ ] Estatísticas no topo (Total, Ativos)

### Busca

- [ ] Campo de busca funciona
- [ ] Buscar por apartamento filtra corretamente
- [ ] Buscar por nome filtra corretamente
- [ ] Buscar por telefone filtra corretamente
- [ ] Limpar busca restaura lista completa

### Cadastro

- [ ] Botão "Novo Morador" abre modal
- [ ] Campos: Apartamento, Nome, Telefone
- [ ] Validação de campos funciona
- [ ] Salvar cria morador no banco
- [ ] Modal fecha após salvar
- [ ] Novo morador aparece na lista
- [ ] Toast de sucesso aparece

---

## 📊 DASHBOARD

### Métricas (`/dashboard`)

- [ ] Página `/dashboard` carrega
- [ ] **4 cards principais**:
  - [ ] Total do Mês (número correto)
  - [ ] Média por Dia (cálculo correto)
  - [ ] Pendentes (número correto)
  - [ ] Retiradas no Mês (número correto)
- [ ] **Tempo Médio de Retirada**:
  - [ ] Valor em horas calculado corretamente
  - [ ] Barra de progresso aparece
  - [ ] Cor da barra condizente (verde/amarelo/vermelho)
  - [ ] Label "Excelente/Bom/Atenção"
- [ ] **Taxa de Retirada**:
  - [ ] Porcentagem calculada corretamente
  - [ ] Gráfico circular aparece
  - [ ] Texto descritivo correto
- [ ] **Cards de Insights**:
  - [ ] Meta de Atendimento (mensagem adequada)
  - [ ] Insights (mensagem baseada em volume)

---

## 📱 RESPONSIVIDADE

### Mobile (< 640px)

- [ ] Login responsivo
- [ ] Home responsivo
- [ ] Nova correspondência responsivo
- [ ] Câmera funciona no mobile
- [ ] Moradores responsivo
- [ ] Dashboard responsivo
- [ ] Navegação mobile (bottom nav) aparece
- [ ] FAB "Nova Correspondência" aparece
- [ ] Menu sidebar esconde

### Tablet (640px - 1024px)

- [ ] Layout se adapta
- [ ] Sidebar aparece
- [ ] Cards em grid adequado

### Desktop (> 1024px)

- [ ] Layout completo
- [ ] Sidebar fixa
- [ ] Cards em grid de 2-4 colunas

---

## 🗄️ BANCO DE DADOS

### PostgreSQL

- [ ] Container Docker rodando (`docker-compose ps`)
- [ ] Conexão funciona (`psql $DATABASE_URL`)
- [ ] Tabelas criadas:
  - [ ] Condominio
  - [ ] Usuario
  - [ ] Morador
  - [ ] Correspondencia
  - [ ] LogNotificacao

### Dados de Seed

- [ ] 1 condomínio existente
- [ ] 1 usuário zelador existente
- [ ] 8 moradores existentes (Apt 101-402)
- [ ] 5 correspondências de exemplo

### Prisma Studio

- [ ] `npm run prisma:studio` abre sem erros
- [ ] Acessa http://localhost:5555
- [ ] Consegue visualizar e editar dados

---

## 📁 STORAGE LOCAL

### Upload de Fotos

- [ ] Diretório `public/uploads/` existe
- [ ] Permissões corretas (755)
- [ ] Fotos salvas em estrutura:
  ```
  public/uploads/condominios/{id}/correspondencias/YYYY/MM/timestamp-hash.jpg
  ```
- [ ] Fotos acessíveis via URL:
  ```
  http://localhost:3000/uploads/condominios/.../foto.jpg
  ```

---

## 💬 WHATSAPP (Mock)

### Modo Desenvolvimento

- [ ] Variável `NODE_ENV=development` configurada
- [ ] Ao registrar correspondência, mensagem aparece no console:
  ```
  📱 WhatsApp (DEV MODE):
  To: (11) 98765-4321
  Message: 📬 *CHEGOU Correspondência!*
  ...
  ```
- [ ] Status salvo como "ENVIADA" no banco
- [ ] LogNotificacao criado

---

## 🔒 SEGURANÇA

### Variáveis de Ambiente

- [ ] `.env.local` existe e não está no Git
- [ ] `.gitignore` contém `.env.local`
- [ ] `JWT_SECRET` configurado
- [ ] `DATABASE_URL` configurado

### Autenticação

- [ ] Middleware protege rotas privadas
- [ ] Token JWT validado em cada request
- [ ] Senha hashada com bcrypt no banco
- [ ] Logout limpa token do localStorage

### Upload

- [ ] Validação de tipo de arquivo (JPG/PNG/HEIC)
- [ ] Validação de tamanho (máx 5MB)
- [ ] Filename único (timestamp + hash)
- [ ] Path organizado por condomínio/ano/mês

---

## 🧪 TESTES MANUAIS

### Fluxo Completo E2E

1. [ ] Abrir navegador em modo anônimo
2. [ ] Acessar http://localhost:3000
3. [ ] Redirecionar para `/login`
4. [ ] Fazer login com `zelador@chegou.com` / `zelador123`
5. [ ] Ver home com lista de correspondências
6. [ ] Clicar em "Nova Correspondência"
7. [ ] Capturar foto com webcam (ou fazer upload)
8. [ ] Selecionar morador "Maria Santos - Apt 101"
9. [ ] Registrar correspondência
10. [ ] Verificar que foi criada e aparece na home
11. [ ] Abrir modal de visualização
12. [ ] Marcar como retirado
13. [ ] Verificar que status mudou
14. [ ] Ir em Moradores
15. [ ] Cadastrar novo morador
16. [ ] Ir em Dashboard
17. [ ] Verificar métricas
18. [ ] Fazer logout
19. [ ] Verificar redirecionamento para login

### Testes de Erro

- [ ] Login com senha errada → erro
- [ ] Upload sem selecionar morador → erro
- [ ] Upload de arquivo muito grande → erro
- [ ] Upload de arquivo inválido (PDF) → erro
- [ ] Acessar rota protegida sem login → redireciona

---

## 📚 DOCUMENTAÇÃO

### Arquivos Criados

- [ ] `SETUP_LOCAL.md` - Guia de setup local
- [ ] `DEPLOY_CLOUD.md` - Guia de deploy em cloud
- [ ] `docker-compose.yml` - Docker PostgreSQL
- [ ] `.env.local.example` - Template de env vars
- [ ] `setup.sh` - Script automático de setup
- [ ] `CHECKLIST_DEPLOY.md` - Este arquivo

### README

- [ ] `app/README.md` atualizado com instruções
- [ ] Links funcionando
- [ ] Comandos corretos

---

## ✅ PRONTO PARA DEPLOY CLOUD?

Se TODOS os itens acima estiverem marcados:

✅ **SIM! Pode seguir para deploy em produção**
   → Siga: `DEPLOY_CLOUD.md`

❌ **NÃO! Corrija os problemas primeiro**
   → Volte para: `SETUP_LOCAL.md`

---

**Data do checklist**: _____________

**Responsável**: _____________

**Status**: [ ] Aprovado   [ ] Reprovado

**Observações**:
_________________________________________________
_________________________________________________
_________________________________________________
