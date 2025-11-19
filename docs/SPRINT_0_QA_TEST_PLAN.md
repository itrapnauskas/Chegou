# ✅ QA Test Plan - CHEGOU MVP
**Agente**: Ricardo Oliveira (QA Engineer)
**Sprint**: 0 - Planejamento
**Data**: 2025-11-19

---

## 🎯 Estratégia de Testes

### Pirâmide de Testes
```
        ╱╲
       ╱E2E╲         10% - Testes E2E (Playwright)
      ╱────╲
     ╱ Inte╲        30% - Testes Integração (API + DB)
    ╱──────╲
   ╱  Unit  ╲       60% - Testes Unitários (Jest + RTL)
  ╱──────────╲
```

### Coverage Target
- **Unit**: > 80%
- **Integration**: > 70%
- **E2E**: Fluxos críticos (100%)

---

## 🧪 Testes E2E (End-to-End)

### Stack
- **Framework**: Playwright
- **Browsers**: Chromium, Firefox, WebKit (mobile)
- **CI/CD**: GitHub Actions

### Fluxos Críticos

#### E2E-001: Registrar Correspondência (Happy Path)
```typescript
// tests/e2e/registrar-correspondencia.spec.ts
import { test, expect } from '@playwright/test'

test('deve registrar correspondência e notificar morador', async ({ page }) => {
  // 1. Login
  await page.goto('/login')
  await page.fill('input[name="email"]', 'zelador@teste.com')
  await page.fill('input[name="senha"]', 'senha123')
  await page.click('button[type="submit"]')

  // Aguardar redirect
  await page.waitForURL('/')

  // 2. Clicar "Nova Correspondência"
  await page.click('text=NOVA CORRESPONDÊNCIA')
  await page.waitForURL('/nova')

  // 3. Tirar foto (mock camera)
  const fileInput = await page.locator('input[type="file"]')
  await fileInput.setInputFiles('tests/fixtures/correspondencia.jpg')

  await page.click('text=Continuar')

  // 4. Buscar morador
  await page.fill('input[placeholder*="Digite apt"]', '301')
  await page.waitForSelector('text=Apt 301 - João Silva')
  await page.click('text=Apt 301 - João Silva')

  // 5. Registrar
  await page.click('text=REGISTRAR E NOTIFICAR')

  // 6. Verificar sucesso
  await expect(page.locator('text=registrada')).toBeVisible()
  await expect(page.locator('text=João Silva')).toBeVisible()
  await expect(page.locator('text=notificado')).toBeVisible()

  // 7. Verificar apareceu na lista
  await page.goto('/')
  await expect(page.locator('text=Apt 301 - João Silva')).toBeVisible()
  await expect(page.locator('text=Pendente')).toBeVisible()
})

test.describe('Edge Cases', () => {
  test('deve permitir retirar foto e tentar novamente', async ({ page }) => {
    // Login e navegação...

    // Tirar foto
    await page.setInputFiles('input[type="file"]', 'foto1.jpg')
    await page.click('text=Continuar')

    // Voltar
    await page.click('text=Tirar Outra')

    // Nova foto
    await page.setInputFiles('input[type="file"]', 'foto2.jpg')
    await page.click('text=Continuar')

    // Verificar que foto2 está sendo usada
    const img = await page.locator('img[alt="Foto capturada"]')
    expect(await img.getAttribute('src')).toContain('foto2.jpg')
  })

  test('deve mostrar erro se morador não selecionado', async ({ page }) => {
    // Login e navegação...
    // Tirar foto...

    // Tentar registrar sem selecionar morador
    await page.click('text=REGISTRAR E NOTIFICAR')

    // Verificar erro
    await expect(page.locator('text=Selecione um morador')).toBeVisible()
  })
})
```

#### E2E-002: Marcar como Retirada
```typescript
test('deve marcar correspondência como retirada', async ({ page }) => {
  await page.goto('/')

  // Verificar existe pendente
  const pendente = page.locator('text=Apt 301').first()
  await expect(pendente).toBeVisible()

  // Clicar "Retirar"
  await pendente.locator('button:has-text("Retirar")').click()

  // Confirmar
  await page.click('text=Confirmar')

  // Verificar toast sucesso
  await expect(page.locator('text=Marcada como retirada')).toBeVisible()

  // Verificar sumiu de pendentes
  await expect(page.locator('section:has-text("Pendentes")'))
    .not.toContainText('Apt 301')

  // Verificar apareceu em retiradas
  await expect(page.locator('section:has-text("Retiradas")'))
    .toContainText('Apt 301')
})
```

#### E2E-003: Busca de Morador
```typescript
test('deve buscar morador por apartamento', async ({ page }) => {
  await page.goto('/nova')
  // Tirar foto...

  // Buscar por apartamento
  await page.fill('input[placeholder*="Digite apt"]', '301')

  // Aguardar resultados
  await page.waitForSelector('text=Resultados')

  // Verificar resultado
  await expect(page.locator('text=Apt 301 - João Silva')).toBeVisible()
})

test('deve buscar morador por nome', async ({ page }) => {
  await page.goto('/nova')
  // Tirar foto...

  // Buscar por nome
  await page.fill('input[placeholder*="Digite apt"]', 'joão')

  // Verificar resultado
  await expect(page.locator('text=Apt 301 - João Silva')).toBeVisible()
})

test('deve mostrar "nenhum resultado" se não encontrar', async ({ page }) => {
  await page.goto('/nova')
  // Tirar foto...

  // Buscar inexistente
  await page.fill('input[placeholder*="Digite apt"]', 'XYZ999')

  // Verificar mensagem
  await expect(page.locator('text=Nenhum morador encontrado')).toBeVisible()
})
```

#### E2E-004: Login/Logout
```typescript
test('deve fazer login com credenciais válidas', async ({ page }) => {
  await page.goto('/login')

  await page.fill('input[name="email"]', 'teste@chegou.com')
  await page.fill('input[name="senha"]', 'senha123')
  await page.click('button[type="submit"]')

  await page.waitForURL('/')
  await expect(page.locator('text=NOVA CORRESPONDÊNCIA')).toBeVisible()
})

test('deve mostrar erro com credenciais inválidas', async ({ page }) => {
  await page.goto('/login')

  await page.fill('input[name="email"]', 'invalido@teste.com')
  await page.fill('input[name="senha"]', 'errado')
  await page.click('button[type="submit"]')

  await expect(page.locator('text=Credenciais inválidas')).toBeVisible()
})

test('deve fazer logout', async ({ page }) => {
  // Login...
  await page.goto('/')

  // Logout
  await page.click('text=Sair')

  // Verificar redirect para login
  await page.waitForURL('/login')
})
```

#### E2E-005: Modal Foto
```typescript
test('deve abrir modal ao clicar "Ver"', async ({ page }) => {
  await page.goto('/')

  await page.click('button:has-text("Ver")').first()

  // Verificar modal abriu
  await expect(page.locator('dialog')).toBeVisible()
  await expect(page.locator('img[alt="Correspondência"]')).toBeVisible()
})

test('deve fechar modal ao clicar fora', async ({ page }) => {
  await page.goto('/')
  await page.click('button:has-text("Ver")').first()

  // Clicar fora (overlay)
  await page.click('dialog', { position: { x: 0, y: 0 } })

  // Verificar fechou
  await expect(page.locator('dialog')).not.toBeVisible()
})
```

### Performance Tests
```typescript
test('página inicial deve carregar em < 2s', async ({ page }) => {
  const start = Date.now()

  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const loadTime = Date.now() - start

  expect(loadTime).toBeLessThan(2000)
})

test('busca de morador deve retornar em < 500ms', async ({ page }) => {
  await page.goto('/nova')

  const start = Date.now()

  await page.fill('input[placeholder*="Digite apt"]', '301')
  await page.waitForSelector('text=Apt 301')

  const searchTime = Date.now() - start

  expect(searchTime).toBeLessThan(500)
})
```

---

## 🔌 Testes de Integração (API)

### Setup
```typescript
// tests/integration/setup.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function setupTestDB() {
  // Limpar banco
  await prisma.correspondencia.deleteMany()
  await prisma.morador.deleteMany()
  await prisma.usuario.deleteMany()
  await prisma.condominio.deleteMany()

  // Criar dados de teste
  const condominio = await prisma.condominio.create({
    data: { nome: 'Teste Condomínio' }
  })

  const usuario = await prisma.usuario.create({
    data: {
      email: 'teste@chegou.com',
      senha: await bcrypt.hash('senha123', 10),
      nome: 'Usuário Teste',
      condominioId: condominio.id
    }
  })

  const morador = await prisma.morador.create({
    data: {
      nome: 'João Silva',
      apartamento: '301',
      telefone: '+5511999999999',
      condominioId: condominio.id
    }
  })

  return { condominio, usuario, morador }
}

export async function cleanupTestDB() {
  await prisma.$disconnect()
}
```

### API Tests
```typescript
// tests/integration/correspondencias.test.ts
import { setupTestDB, cleanupTestDB } from './setup'
import { POST } from '@/app/api/correspondencias/route'

describe('POST /api/correspondencias', () => {
  beforeAll(setupTestDB)
  afterAll(cleanupTestDB)

  it('deve criar correspondência com dados válidos', async () => {
    const request = new Request('http://localhost/api/correspondencias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token'
      },
      body: JSON.stringify({
        moradorId: 'morador-id',
        fotoUrl: 'https://storage.com/foto.jpg'
      })
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.correspondencia).toBeDefined()
    expect(data.correspondencia.status).toBe('PENDENTE')
  })

  it('deve retornar 400 se moradorId não fornecido', async () => {
    const request = new Request('http://localhost/api/correspondencias', {
      method: 'POST',
      body: JSON.stringify({
        fotoUrl: 'https://storage.com/foto.jpg'
      })
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
  })

  it('deve retornar 404 se morador não existe', async () => {
    const request = new Request('http://localhost/api/correspondencias', {
      method: 'POST',
      body: JSON.stringify({
        moradorId: 'nao-existe',
        fotoUrl: 'https://storage.com/foto.jpg'
      })
    })

    const response = await POST(request)

    expect(response.status).toBe(404)
  })
})
```

---

## 🧪 Testes Unitários

### Componentes
```typescript
// tests/unit/MoradorSearch.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MoradorSearch } from '@/components/morador/MoradorSearch'
import { api } from '@/lib/api/moradores'

jest.mock('@/lib/api/moradores')

describe('MoradorSearch', () => {
  it('deve renderizar input de busca', () => {
    render(<MoradorSearch onSelect={jest.fn()} />)

    expect(screen.getByPlaceholderText(/digite apartamento/i)).toBeInTheDocument()
  })

  it('deve mostrar resultados ao digitar', async () => {
    const mockMoradores = [
      { id: '1', nome: 'João Silva', apartamento: '301', telefone: '+5511999999999' }
    ]

    ;(api.buscar as jest.Mock).mockResolvedValue(mockMoradores)

    render(<MoradorSearch onSelect={jest.fn()} />)

    const input = screen.getByPlaceholderText(/digite apartamento/i)
    fireEvent.change(input, { target: { value: '301' } })

    await waitFor(() => {
      expect(screen.getByText('Apt 301 - João Silva')).toBeInTheDocument()
    })
  })

  it('deve chamar onSelect ao clicar no resultado', async () => {
    const mockOnSelect = jest.fn()
    const mockMoradores = [
      { id: '1', nome: 'João Silva', apartamento: '301', telefone: '+5511999999999' }
    ]

    ;(api.buscar as jest.Mock).mockResolvedValue(mockMoradores)

    render(<MoradorSearch onSelect={mockOnSelect} />)

    const input = screen.getByPlaceholderText(/digite apartamento/i)
    fireEvent.change(input, { target: { value: '301' } })

    await waitFor(() => {
      const resultado = screen.getByText('Apt 301 - João Silva')
      fireEvent.click(resultado)
    })

    expect(mockOnSelect).toHaveBeenCalledWith(mockMoradores[0])
  })
})
```

### Hooks
```typescript
// tests/unit/useAuth.test.ts
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/lib/hooks/useAuth'
import { api } from '@/lib/api/auth'

jest.mock('@/lib/api/auth')

describe('useAuth', () => {
  it('deve iniciar com user null', () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('deve fazer login com sucesso', async () => {
    const mockUser = { id: '1', nome: 'Teste', email: 'teste@chegou.com' }
    const mockToken = 'token-123'

    ;(api.login as jest.Mock).mockResolvedValue({
      user: mockUser,
      token: mockToken
    })

    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.login('teste@chegou.com', 'senha123')
    })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.token).toBe(mockToken)
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('deve fazer logout', async () => {
    const { result } = renderHook(() => useAuth())

    // Simular login primeiro
    await act(async () => {
      await result.current.login('teste@chegou.com', 'senha123')
    })

    // Logout
    act(() => {
      result.current.logout()
    })

    expect(result.current.user).toBeNull()
    expect(result.current.token).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })
})
```

---

## 📱 Testes Mobile (Responsivo)

```typescript
test('deve funcionar em mobile viewport', async ({ page }) => {
  // Configurar viewport mobile
  await page.setViewportSize({ width: 375, height: 667 })

  await page.goto('/')

  // Verificar botão principal é grande (thumb-friendly)
  const botao = page.locator('text=NOVA CORRESPONDÊNCIA')
  const box = await botao.boundingBox()

  expect(box?.height).toBeGreaterThanOrEqual(48) // Min 48px
})

test('deve abrir câmera traseira no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })

  await page.goto('/nova')

  // Mock navigator.mediaDevices.getUserMedia
  await page.evaluate(() => {
    navigator.mediaDevices.getUserMedia = jest.fn().mockResolvedValue({
      getTracks: () => [{ stop: () => {} }]
    })
  })

  // Verificar constraint facingMode: 'environment'
  const constraints = await page.evaluate(() => {
    return navigator.mediaDevices.getUserMedia.mock.calls[0][0]
  })

  expect(constraints.video.facingMode).toBe('environment')
})
```

---

## 🔒 Security Tests

```typescript
test('deve proteger rotas autenticadas', async ({ page }) => {
  // Tentar acessar sem login
  await page.goto('/')

  // Deve redirecionar para login
  await page.waitForURL('/login')
})

test('deve invalidar token expirado', async ({ page }) => {
  // Login com token que expira em 1s
  // ...

  // Aguardar expiração
  await page.waitForTimeout(2000)

  // Tentar acessar rota protegida
  await page.goto('/')

  // Deve redirecionar para login
  await page.waitForURL('/login')
})

test('não deve aceitar SQL injection', async ({ page }) => {
  await page.goto('/nova')

  // Tentar SQL injection na busca
  await page.fill('input[placeholder*="Digite apt"]', "'; DROP TABLE moradores; --")

  // Não deve quebrar
  await expect(page.locator('text=Nenhum morador encontrado')).toBeVisible()
})
```

---

## 🎯 Checklist de QA (Manual)

### Funcional
- [ ] Login funciona com credenciais corretas
- [ ] Login rejeita credenciais incorretas
- [ ] Câmera abre no mobile e desktop
- [ ] Foto é capturada corretamente
- [ ] Busca de morador retorna resultados
- [ ] Correspondência é registrada
- [ ] WhatsApp é enviado (verificar manualmente)
- [ ] Lista mostra correspondências pendentes
- [ ] Marcar como retirada funciona
- [ ] Histórico de retiradas aparece
- [ ] Dashboard mostra métricas corretas

### UX
- [ ] Loading states visíveis
- [ ] Mensagens de erro claras
- [ ] Toasts de sucesso aparecem
- [ ] Animações suaves (não travando)
- [ ] Navegação intuitiva
- [ ] Botões fáceis de clicar (mobile)

### Performance
- [ ] Página inicial < 2s
- [ ] Busca morador < 500ms
- [ ] Upload foto < 5s (5MB)
- [ ] Sem layout shift (CLS < 0.1)
- [ ] Lighthouse score > 90

### Acessibilidade
- [ ] Navegação por Tab funciona
- [ ] Screen reader lê corretamente
- [ ] Contraste adequado (4.5:1)
- [ ] Foco visível
- [ ] Alt text em imagens

### Compatibilidade
- [ ] Chrome (desktop + mobile)
- [ ] Firefox
- [ ] Safari (iOS)
- [ ] Edge
- [ ] Android Chrome

---

## 📊 Relatórios

### Coverage Report
```bash
npm run test:coverage

# Output
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files           |   82.5  |   78.3   |   85.1  |   83.2  |
 components/        |   85.2  |   80.1   |   88.3  |   86.0  |
 lib/hooks/         |   78.9  |   72.5   |   82.0  |   79.5  |
 app/api/           |   83.1  |   80.8   |   84.2  |   84.0  |
--------------------|---------|----------|---------|---------|
```

### Lighthouse CI
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v10
        with:
          configPath: './lighthouserc.json'
```

---

**Assinado**: Ricardo Oliveira (QA Engineer)
**Revisado**: CEO Claude
**Status**: ✅ APROVADO - Testes prontos para implementação
