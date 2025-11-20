# 🚀 RAV 2026 - Visão de Futuro

Sistema interativo de quiz/arquétipos para o evento RAV 2026. Identifique seu perfil através de um quiz personalizado, capture sua foto e compartilhe seu resultado!

## ✨ Funcionalidades

- 🎯 **Quiz Interativo**: Sistema de perguntas que identifica seu arquétipo profissional
- 📸 **Captura de Fotos**: Sistema de captura via webcam com overlay futurista
- 📱 **QR Code**: Geração automática de QR Code para compartilhamento no Instagram
- 📊 **Estatísticas e Ranking**: Dashboard com estatísticas dos participantes
- 🎨 **6 Arquétipos Únicos**: Pioneiro, Estrategista, Conectador, Executor, Cultivador, Visionário
- 🔥 **Firebase Integration**: Armazenamento seguro de dados e imagens

## 🛠️ Tecnologias

- **React 19** + **TypeScript**
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS 4** - Estilização moderna
- **Framer Motion** - Animações fluidas
- **Firebase** - Backend (Firestore + Storage)
- **QRCode** - Geração de QR Codes
- **html2canvas** - Captura de imagens

## 🚀 Como Começar

### Pré-requisitos

- Node.js 18+ instalado
- Conta no Firebase (gratuita)
- Navegador moderno com suporte a câmera

### Instalação Rápida

1. **Clone o repositório**
```bash
git clone https://github.com/ricktcunha/rav2026.git
cd rav2026
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o Firebase**
   - Siga o guia completo em [`GUIA_PASSO_A_PASSO.md`](./GUIA_PASSO_A_PASSO.md)
   - Ou veja o exemplo em [`firebase.config.example.ts`](./firebase.config.example.ts)

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Acesse no navegador**
   - Abra `http://localhost:5173`
   - Permita acesso à câmera quando solicitado

## 📖 Guia Completo

Para configuração detalhada passo a passo, consulte:
**[GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md)**

Este guia inclui:
- ✅ Configuração completa do Firebase
- ✅ Setup do Firestore e Storage
- ✅ Testes e troubleshooting
- ✅ Deploy para produção

## 📁 Estrutura do Projeto

```
rav2026/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── screens/         # Telas principais do app
│   ├── data/           # Dados (arquétipos, perguntas)
│   ├── types/          # Tipos TypeScript
│   └── utils/          # Utilitários (Firebase, Firestore)
├── public/             # Arquivos estáticos
├── dist/               # Build de produção
└── GUIA_PASSO_A_PASSO.md  # Guia completo de setup
```

## 🎯 Fluxo do Sistema

1. **Tela Inicial** → Atrai usuários com animações
2. **Recap** → Mostra conquistas de 2024/2025
3. **Registro** → Coleta nome e área do participante
4. **Quiz** → 3 perguntas que definem o arquétipo
5. **Captura** → Foto com overlay futurista
6. **Resultado** → Revela arquétipo e gera QR Code
7. **Estatísticas** → Dashboard com dados dos participantes

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Preview do build de produção
npm run lint     # Executa o linter
```

## 🔐 Configuração do Firebase

⚠️ **IMPORTANTE**: Antes de usar em produção, configure:

1. **Firestore Database** - Para armazenar participantes
2. **Storage** - Para upload de imagens
3. **Regras de Segurança** - Ajuste conforme necessário

Veja detalhes completos no [GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md)

## 📝 Arquétipos Disponíveis

- 🌱 **O Pioneiro** - Inovador e visionário
- 🎯 **O Estrategista** - Analítico e planejador
- 🤝 **O Conectador** - Mestre em relacionamentos
- ⚡ **O Executor** - Alta energia e ação
- 🌾 **O Cultivador** - Visão de longo prazo
- 💡 **O Visionário** - Liderança inspiradora

## 🐛 Troubleshooting

### Câmera não funciona
- Certifique-se de permitir acesso à câmera
- Use HTTPS em produção (alguns navegadores bloqueiam HTTP)

### Firebase não conecta
- Verifique as credenciais em `src/utils/firebase.ts`
- Confirme que Firestore e Storage estão ativados

### QR Code não gera
- Verifique se o upload da imagem funcionou
- Veja o console do navegador para erros

## 📄 Licença

Este projeto é privado e destinado ao uso interno.

## 👥 Contribuidores

Desenvolvido para o evento RAV 2026.

---

**Precisa de ajuda?** Consulte o [GUIA_PASSO_A_PASSO.md](./GUIA_PASSO_A_PASSO.md) para instruções detalhadas!
