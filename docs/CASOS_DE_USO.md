# Casos de Uso - CHEGOU

## Personas

### 👨‍🔧 Seu Manoel - Zelador
- 58 anos, trabalha há 15 anos no condomínio
- Usa WhatsApp diariamente
- Não tem muita experiência com tecnologia
- Recebe ~30 correspondências por dia
- **Dor**: Perde muito tempo ligando para avisar moradores

### 👩‍💼 Carla - Moradora Executiva
- 35 anos, trabalha o dia todo fora
- Sempre esquece de buscar correspondências
- Prefere notificação digital
- **Dor**: Perde correspondências importantes

### 👨‍💼 Roberto - Síndico
- 45 anos, síndico há 2 anos
- Quer modernizar o condomínio
- Preocupado com custos
- **Dor**: Moradores reclamam que não sabem quando tem correspondência

---

## 📖 Casos de Uso Detalhados

### Caso 1: Correspondência Simples

**Contexto**: Segunda-feira, 10h da manhã. Chega uma carta para o Apt 301.

**Fluxo Atual (Sem CHEGOU)**:
1. Seu Manoel vê a carta na portaria
2. Lê a etiqueta: "João Silva - Apt 301"
3. Anota num caderno
4. Pega o telefone e liga para o ramal 301
5. Não atende (morador está trabalhando)
6. Tenta de novo às 12h - não atende
7. Deixa bilhete debaixo da porta
8. João só vê o bilhete 3 dias depois
9. **Tempo total**: 15 min + 3 dias de atraso

**Fluxo Novo (Com CHEGOU)**:
1. Seu Manoel vê a carta
2. Abre o celular (chegou.com.br já aberto)
3. Clica "Nova Correspondência"
4. Tira foto da etiqueta (3 segundos)
5. Digita "301" e confirma "João Silva"
6. Clica "Registrar"
7. ✅ João recebe WhatsApp instantâneo
8. João vê a notificação no trabalho e programa para buscar no fim do dia
9. **Tempo total**: 30 segundos + notificação imediata

---

### Caso 2: Múltiplas Correspondências no Mesmo Horário

**Contexto**: Chegam 10 encomendas dos Correios de uma vez.

**Fluxo Atual (Sem CHEGOU)**:
1. Seu Manoel separa todas as encomendas
2. Anota todos os apartamentos no caderno
3. Começa a ligar para cada um
4. Leva 30-40 minutos para avisar todos
5. Alguns não atendem, precisa religar depois
6. **Problema**: Encomendas ficam acumuladas

**Fluxo Novo (Com CHEGOU)**:
1. Seu Manoel pega cada encomenda
2. Foto + seleciona morador (30s cada)
3. Em 5 minutos registra todas
4. Todos recebem notificação simultânea
5. Moradores vão buscando ao longo do dia
6. **Eficiência**: 80% menos tempo

---

### Caso 3: Morador Esquecido

**Contexto**: Carla esqueceu que tinha correspondência há 1 semana.

**Fluxo Atual (Sem CHEGOU)**:
- Bilhete perdeu-se
- Ninguém lembra
- Correspondência fica na portaria indefinidamente

**Fluxo Novo (Com CHEGOU)**:
- Carla abre o link da notificação antiga
- Vê a foto: "Ah! É o cartão do banco!"
- Desce para buscar imediatamente
- Seu Manoel marca como "Retirada" no sistema

---

### Caso 4: Dúvida sobre Correspondência

**Contexto**: João recebe notificação mas não tem certeza se é importante.

**Fluxo Atual (Sem CHEGOU)**:
- Precisa ligar para portaria
- Seu Manoel tenta descrever a carta
- João não consegue decidir se é urgente

**Fluxo Novo (Com CHEGOU)**:
- João clica no link da foto
- Vê que é propaganda
- Decide buscar só no fim de semana
- **Benefício**: Evita viagem desnecessária

---

### Caso 5: Final de Semana

**Contexto**: Sábado, Seu Manoel não está. Chega correspondência.

**Fluxo Atual (Sem CHEGOU)**:
- Porteiro eventual não sabe o processo
- Correspondência fica sem registrar
- Segunda-feira gera confusão

**Fluxo Novo (Com CHEGOU)**:
- Porteiro eventual faz login (usuário compartilhado ou próprio)
- Segue mesmo processo simples
- Tudo fica registrado no sistema
- Segunda-feira, Seu Manoel vê histórico completo

---

## 🎯 User Stories (Para Desenvolvimento)

### Zelador

```
Como zelador,
Quero tirar foto da correspondência e selecionar o morador rapidamente,
Para avisar todos os moradores em poucos minutos.

Critérios de Aceite:
✅ Foto abre câmera do celular
✅ Busca morador por apartamento ou nome
✅ Confirmação visual antes de enviar
✅ Notificação enviada automaticamente
✅ Processo completo < 30 segundos
```

```
Como zelador,
Quero ver lista de correspondências pendentes,
Para saber quais ainda não foram retiradas.

Critérios de Aceite:
✅ Lista separada: Pendentes / Retiradas
✅ Ordem cronológica (mais recente primeiro)
✅ Mostrar foto miniatura
✅ Mostrar há quanto tempo chegou
✅ Botão "Marcar como Retirada" visível
```

```
Como zelador,
Quero marcar correspondência como retirada,
Para manter controle do que já foi entregue.

Critérios de Aceite:
✅ Um clique para marcar
✅ Confirmação visual (cor muda)
✅ Move para lista "Retiradas"
✅ Registra data/hora da retirada
```

### Morador

```
Como morador,
Quero receber notificação no WhatsApp quando chegar correspondência,
Para não precisar ficar perguntando na portaria.

Critérios de Aceite:
✅ Mensagem clara e objetiva
✅ Indica data/hora que chegou
✅ Inclui link para ver foto (opcional)
✅ Chega em < 1 minuto após registro
```

```
Como morador,
Quero ver foto da correspondência,
Para decidir se preciso buscar urgente.

Critérios de Aceite:
✅ Link funciona sem login
✅ Foto em boa qualidade
✅ Carrega rápido (< 3s)
✅ Funciona em qualquer celular
```

### Síndico/Admin

```
Como síndico,
Quero cadastrar novos moradores,
Para manter sistema atualizado.

Critérios de Aceite:
✅ Formulário simples (nome, apt, telefone)
✅ Validação de telefone (formato WhatsApp)
✅ Editar dados existentes
✅ Desativar morador (mudança)
```

```
Como síndico,
Quero ver quantas correspondências foram registradas,
Para justificar investimento no sistema.

Critérios de Aceite:
✅ Total do mês
✅ Média por dia
✅ Tempo médio até retirada
✅ Exportar relatório simples
```

---

## 🔄 Jornada Completa do Usuário

### Primeiro Uso (Onboarding)

**Dia 1 - Setup Inicial**
1. Síndico contrata CHEGOU
2. Recebe link de acesso
3. Cadastra Seu Manoel (zelador)
4. Importa lista de moradores (CSV ou manual)

**Dia 2 - Treinamento**
1. Demonstração para Seu Manoel (5 min)
2. Primeiro registro supervisionado
3. Seu Manoel testa sozinho com 2-3 correspondências
4. **Resultado**: Aprende em < 15 minutos

**Semana 1 - Adoção**
1. Seu Manoel usa para todas correspondências
2. Moradores começam a receber notificações
3. Feedback inicial positivo
4. **Meta**: 100% correspondências no sistema

**Mês 1 - Consolidação**
1. Sistema vira rotina
2. Moradores acostumam com notificações
3. Reclamações na portaria diminuem 90%
4. **Resultado**: ROI positivo

---

## 📊 Métricas de Sucesso Real

### Métricas do Zelador
- ⏱️ **Tempo médio por correspondência**: 30s (antes: 5-10min)
- 📉 **Redução de ligações**: -95%
- 😊 **Satisfação do zelador**: 9/10

### Métricas do Morador
- 📱 **Taxa de notificação vista**: >90% (WhatsApp)
- ⏰ **Tempo médio até retirada**: <24h (antes: 3-5 dias)
- 📦 **Correspondências esquecidas**: -80%

### Métricas do Condomínio
- 💰 **Economia de tempo**: ~2h/dia
- 📞 **Redução reclamações**: -70%
- 🎯 **Adoção do sistema**: >95% (após 1 mês)

---

## 🚨 Problemas Potenciais e Soluções

### Problema 1: "Morador não tem WhatsApp"
**Solução MVP**: Telefone alternativo ou busca presencial
**Solução v1.1**: SMS fallback

### Problema 2: "Foto ficou ruim/desfocada"
**Solução MVP**: Retirar foto novamente
**Solução v1.1**: Preview antes de confirmar

### Problema 3: "Morador não busca há semanas"
**Solução MVP**: Zelador liga (caso excepcional)
**Solução v1.2**: Lembrete automático após 7 dias

### Problema 4: "Internet da portaria caiu"
**Solução MVP**: Espera voltar (raro)
**Solução v1.1**: Modo offline (salva local, sincroniza depois)

### Problema 5: "Zelador esqueceu senha"
**Solução MVP**: Síndico reseta senha
**Solução v1.1**: Recuperação automática por email

---

## 💡 Insights para Validação

### Perguntas para Zeladores/Porteiros:
- [ ] Quantas correspondências recebe por dia?
- [ ] Quanto tempo gasta avisando moradores?
- [ ] Como avisa hoje? (ligação, interfone, bilhete)
- [ ] Qual maior dificuldade no processo atual?
- [ ] Usa WhatsApp? Confortável com celular?

### Perguntas para Moradores:
- [ ] Com que frequência recebe correspondência?
- [ ] Como é avisado hoje?
- [ ] Já perdeu correspondência importante?
- [ ] Prefere notificação por qual canal?
- [ ] Pagaria quanto por esse serviço?

### Perguntas para Síndicos:
- [ ] Recebe reclamações sobre correspondências?
- [ ] Quanto tempo zelador gasta nisso?
- [ ] Já pensou em digitalizar processo?
- [ ] Qual orçamento para esse tipo de solução?
- [ ] Condomínio tem internet na portaria?

---

## 🎬 Pitch de Vendas (Elevator Pitch)

**Versão 30 segundos**:
> "CHEGOU é um sistema que permite o zelador tirar uma foto da correspondência e o morador receber notificação automática no WhatsApp em 30 segundos. Simples assim. Economiza 2 horas por dia e elimina 90% das reclamações."

**Versão 1 minuto**:
> "Sabe quando chega correspondência e o zelador precisa ficar ligando para avisar cada morador? Com CHEGOU, ele só tira uma foto pelo celular, seleciona o apartamento, e pronto - o morador recebe WhatsApp automático com a notificação. Tudo em menos de 30 segundos. Não precisa app, funciona no navegador. O morador até vê foto da correspondência para saber se é urgente. Resultado: zelador economiza 2h por dia, moradores não perdem mais correspondências, e o síndico reduz reclamações em 90%. Quer testar grátis no seu condomínio?"

---

## 🔮 Visão de Longo Prazo

**Ano 1**: Sistema de correspondências
**Ano 2**: Gestão completa de portaria (visitantes, entregas, ocorrências)
**Ano 3**: Plataforma de comunicação do condomínio
**Ano 5**: Super app de condomínios (assembleia, boletos, reservas)

**Mas o MVP é só**: Foto → Morador → WhatsApp 📬✅
