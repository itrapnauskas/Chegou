# 🚀 CHEGOU - Início Rápido

**Objetivo**: Rodar o sistema 100% localmente em poucos minutos.

---

## ⚡ Setup Automático (5 minutos)

### Pré-requisitos

1. **Node.js 18+**: https://nodejs.org
2. **Docker Desktop**: https://www.docker.com/products/docker-desktop

Verificar instalação:
```bash
node -v && docker -v
```

### Executar Setup

```bash
# 1. Clonar repositório
git clone <seu-repo>
cd Chegou/app

# 2. Executar setup automático
chmod +x setup.sh
./setup.sh

# 3. Iniciar servidor
npm run dev
```

### Acessar Sistema

```
URL: http://localhost:3000/login
Email: zelador@chegou.com
Senha: zelador123
```

---

## 📚 Documentação Completa

- **Setup Local Detalhado**: [app/SETUP_LOCAL.md](app/SETUP_LOCAL.md)
- **Deploy em Produção**: [app/DEPLOY_CLOUD.md](app/DEPLOY_CLOUD.md)
- **Checklist de Testes**: [app/CHECKLIST_DEPLOY.md](app/CHECKLIST_DEPLOY.md)
- **Guia de Desenvolvimento**: [app/README.md](app/README.md)

---

## 🎯 Próximos Passos

1. ✅ **Testar localmente** (use CHECKLIST_DEPLOY.md)
2. ✅ **Fazer ajustes** necessários
3. ✅ **Deploy em produção** (siga DEPLOY_CLOUD.md)

---

## 🆘 Problemas?

### Erro: "Docker not found"
→ Instale Docker Desktop

### Erro: "Port 5432 already in use"
→ Você tem PostgreSQL local rodando. Pare o serviço ou mude a porta no docker-compose.yml

### Erro: "Cannot connect to database"
→ Execute: `docker-compose restart postgres`

### Outros erros
→ Veja troubleshooting completo em: [app/SETUP_LOCAL.md](app/SETUP_LOCAL.md)

---

**Dúvidas?** Leia a documentação completa em `app/SETUP_LOCAL.md`
