# 📱 Fluxo Completo do Aplicativo RAV 2026

Este documento descreve o fluxo completo do aplicativo, desde a tela inicial até o compartilhamento da foto.

---

## 🎯 Visão Geral do Fluxo

```
Tela Inicial → Recap → Registro → Quiz → Captura → Resultado → QR Code → Download
```

---

## 1️⃣ **TELA INICIAL (RestingScreen)**

**Arquivo:** `src/screens/RestingScreen.tsx`

**O que acontece:**
- ✅ Exibe o **logo da Adubos Real**
- ✅ Mostra informações sobre o evento RAV 2026
- ✅ Exibe animações de fundo (partículas flutuantes)
- ✅ Botão **"VER MEU FUTURO"** para iniciar
- ✅ Botão **"Estatísticas"** (opcional) no canto superior direito

**Ações do usuário:**
- Clica em **"VER MEU FUTURO"** → Vai para tela de Recap

**Dados coletados:** Nenhum ainda

---

## 2️⃣ **TELA DE RECAP (RecapScreen)**

**Arquivo:** `src/screens/RecapScreen.tsx`

**O que acontece:**
- ✅ Mostra conquistas de 2024/2025
- ✅ Exibe números recordes (+150%)
- ✅ Transição automática após alguns segundos
- ✅ Call to action para 2026

**Ações do usuário:**
- Aguarda a transição automática → Vai para tela de Registro

**Dados coletados:** Nenhum ainda

---

## 3️⃣ **TELA DE REGISTRO (RegistrationScreen)**

**Arquivo:** `src/screens/RegistrationScreen.tsx`

**O que acontece:**
- ✅ Campo para digitar o **nome** do participante
- ✅ Seleção de **área** (TXF, PSA, DTN, HFV)
- ✅ Botão **"Continuar"**

**Ações do usuário:**
- Digita o nome
- Seleciona a área
- Clica em **"Continuar"** → Vai para tela de Quiz

**Dados coletados:**
- `participantName`: Nome do participante
- `participantArea`: Área selecionada (TXF, PSA, DTN, HFV)

---

## 4️⃣ **TELA DE QUIZ (QuizScreen)**

**Arquivo:** `src/screens/QuizScreen.tsx`

**O que acontece:**
- ✅ Exibe **3 perguntas** sobre estilo de trabalho
- ✅ Cada pergunta tem múltiplas opções (cards clicáveis)
- ✅ Não há respostas "erradas" - todas são válidas
- ✅ O sistema calcula o **arquétipo** baseado nas respostas

**Arquétipos possíveis:**
- 🌱 **O Pioneiro** - Inovador e visionário
- 🎯 **O Estrategista** - Analítico e planejador
- 🤝 **O Conectador** - Mestre em relacionamentos
- ⚡ **O Executor** - Alta energia e ação
- 🌾 **O Cultivador** - Visão de longo prazo
- 💡 **O Visionário** - Liderança inspiradora

**Ações do usuário:**
- Responde as 3 perguntas clicando nos cards
- Após a última resposta → Vai para tela de Captura

**Dados coletados:**
- `userArchetype`: Arquétipo identificado (pioneer, strategist, connector, executor, cultivator, visionary)

---

## 5️⃣ **TELA DE CAPTURA (CaptureScreen)**

**Arquivo:** `src/screens/CaptureScreen.tsx`

**O que acontece:**
- ✅ Solicita acesso à **câmera** do dispositivo
- ✅ Exibe preview da câmera em formato **vertical (9:16)** - estilo Instagram Stories
- ✅ Overlay futurista com cantos verdes e mira central
- ✅ Botão de captura grande no centro inferior
- ✅ **Contagem regressiva** de 3 segundos antes de capturar
- ✅ Após capturar, mostra animação "Analisando seu futuro..."

**Ações do usuário:**
- Permite acesso à câmera
- Enquadra o rosto no quadro verde
- Clica no botão de captura
- Aguarda contagem regressiva (3, 2, 1)
- Foto é capturada automaticamente
- Aguarda animação de análise → Vai para tela de Resultado

**Dados coletados:**
- `capturedImage`: Foto em formato base64 (data URL)

**Processamento:**
- Foto é capturada em **1080x1920 pixels** (Full HD Stories)
- Crop central automático para garantir proporção correta

---

## 6️⃣ **TELA DE RESULTADO (ResultScreen)**

**Arquivo:** `src/screens/ResultScreen.tsx`

**O que acontece:**

### 6.1 Revelação Inicial
- ✅ Animação de revelação do arquétipo (3 segundos)
- ✅ Ícone e nome do arquétipo aparecem com animação

### 6.2 Visualização do Card
- ✅ Mostra preview do card final com:
  - Foto capturada como fundo
  - Nome do arquétipo em destaque
  - Frase motivacional
  - Nome do participante
  - Informações do evento (RAV 2026, @adubosreal, 2026)

### 6.3 Geração do QR Code
- ✅ Botão **"GERAR QR CODE"**
- ✅ Ao clicar:
  1. Cria um elemento HTML temporário invisível
  2. Monta o card completo com foto, arquétipo e informações
  3. Captura tudo em uma imagem **1080x1920** usando `html2canvas`
  4. Faz **upload da imagem** para Firebase Storage
  5. Gera **QR Code** apontando para a URL direta da imagem

**Ações do usuário:**
- Clica em **"GERAR QR CODE"**
- Aguarda processamento (alguns segundos)
- QR Code aparece na tela

**Dados salvos no Firebase:**
- **Firestore:** Documento na coleção `participants` com:
  - Nome
  - Área
  - Arquétipo
  - Timestamp
  - URL da foto (opcional)
- **Storage:** Imagem JPG em `captures/[timestamp].jpg`

---

## 7️⃣ **COMPARTILHAMENTO (Via QR Code)**

**O que acontece:**
- ✅ Usuário escaneia o QR Code com o celular
- ✅ QR Code aponta para a **URL direta da imagem** no Firebase Storage
- ✅ Navegador do celular abre a imagem diretamente
- ✅ Usuário **pressiona e segura** na imagem para salvar
- ✅ Foto é salva na galeria do celular

**Instruções exibidas:**
1. Escaneie para abrir a foto
2. **Toque e segure na imagem para salvar**
3. Compartilhe e marque @adubosreal

---

## 8️⃣ **ESTATÍSTICAS (StatsScreen)**

**Arquivo:** `src/screens/StatsScreen.tsx`

**Disponível em:**
- Tela inicial (botão "Estatísticas")
- Tela de resultado (botão "Ver Estatísticas")

**O que mostra:**
- ✅ Total de participantes
- ✅ Distribuição por arquétipo (com barras de progresso)
- ✅ Distribuição por área
- ✅ Lista dos últimos 10 participantes

**Dados lidos:**
- Consulta Firestore para buscar todos os participantes
- Limita a 100 resultados mais recentes
- Calcula estatísticas em tempo real

---

## 📊 Resumo do Fluxo de Dados

### Dados Coletados:
1. **Nome** (RegistrationScreen)
2. **Área** (RegistrationScreen)
3. **Arquétipo** (QuizScreen - calculado)
4. **Foto** (CaptureScreen)

### Dados Salvos:
- **Firestore:** `participants` collection
- **Storage:** `captures/[timestamp].jpg`

### Dados Compartilhados:
- **QR Code:** URL direta da imagem no Firebase Storage
- **Imagem:** 1080x1920 JPG otimizado

---

## 🔄 Fluxo de Navegação

```
RestingScreen
    ↓ (clicar "VER MEU FUTURO")
RecapScreen
    ↓ (transição automática)
RegistrationScreen
    ↓ (clicar "Continuar")
QuizScreen
    ↓ (responder 3 perguntas)
CaptureScreen
    ↓ (capturar foto)
ResultScreen
    ↓ (clicar "GERAR QR CODE")
QR Code Gerado
    ↓ (escanear QR Code)
Imagem no Celular
    ↓ (pressionar e segurar)
Foto Salva
    ↓ (compartilhar no Instagram)
Compartilhamento com @adubosreal
```

---

## 🎨 Elementos Visuais

### Cores Principais:
- **Verde Neon:** `#39FF14` (agro-green)
- **Preto:** `#111111` (background)
- **Cinza:** `#1a1a1a` (cards)

### Animações:
- Framer Motion para transições suaves
- Partículas flutuantes na tela inicial
- Revelação do arquétipo com rotação e escala
- Contagem regressiva pulsante

### Responsividade:
- Layout adaptável para desktop e mobile
- Preview vertical da câmera (9:16)
- Card final otimizado para Instagram Stories

---

## ✅ Checklist de Funcionalidades

- [x] Tela inicial com logo e animações
- [x] Tela de recap com informações do evento
- [x] Registro de nome e área
- [x] Quiz com 6 arquétipos possíveis
- [x] Captura de foto em formato Stories (1080x1920)
- [x] Geração de card personalizado
- [x] Upload para Firebase Storage
- [x] Salvamento no Firestore
- [x] Geração de QR Code
- [x] Compartilhamento direto da imagem
- [x] Tela de estatísticas
- [x] Instruções claras para download

---

## 🚀 Pronto para Uso!

O aplicativo está completo e funcional. Cada etapa do fluxo foi testada e otimizada para garantir a melhor experiência do usuário.

