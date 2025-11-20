# 🚀 Guia Passo a Passo - RAV 2026

## 📋 Análise do Projeto

Este é um sistema interativo de quiz/arquétipos para o evento RAV 2026 que inclui:

- ✅ Sistema de quiz para identificar arquétipos (6 tipos diferentes)
- ✅ Captura de fotos via webcam
- ✅ Geração de QR Code para compartilhamento
- ✅ Sistema de ranking e estatísticas
- ✅ Armazenamento de dados no Firebase
- ✅ Interface moderna com animações

**Status Atual:** O projeto está funcionalmente completo, mas precisa de configuração do Firebase para funcionar completamente.

---

## 🎯 PASSO 1: Instalar Dependências

Primeiro, vamos garantir que todas as dependências estão instaladas:

```bash
npm install
```

**O que isso faz:**

- Instala todas as bibliotecas necessárias (React, Firebase, QR Code, etc.)
- Cria a pasta `node_modules` com todas as dependências

**Tempo estimado:** 2-5 minutos

---

## 🔥 PASSO 2: Configurar Firebase

O projeto precisa do Firebase para:

- Armazenar dados dos participantes (Firestore)
- Fazer upload das imagens capturadas (Storage)
- Gerar estatísticas e ranking

### 2.1 Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Adicionar projeto"** ou **"Create a project"**
3. Digite o nome: `rav-2026` (ou outro nome de sua escolha)
4. Desative o Google Analytics (ou mantenha ativo, sua escolha)
5. Clique em **"Criar projeto"**

### 2.2 Configurar Firestore Database

1. No menu lateral, clique em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. Escolha **"Começar no modo de teste"** (para desenvolvimento)
4. Escolha a localização (ex: `southamerica-east1` para Brasil)
5. Clique em **"Ativar"**

**⚠️ IMPORTANTE:** Para produção, você precisará configurar regras de segurança adequadas.

### 2.3 Configurar Storage

1. No menu lateral, clique em **"Storage"**
2. Clique em **"Começar"**
3. Aceite as regras padrão (modo de teste)
4. Escolha a mesma localização do Firestore
5. Clique em **"Concluir"**

### 2.4 Obter Credenciais do Firebase

1. No menu lateral, clique no ícone de **⚙️ Configurações** > **Configurações do projeto**
2. Role até a seção **"Seus apps"**
3. Clique no ícone **`</>`** (Web)
4. Registre um app (nome: `rav-2026-web`)
5. **COPIE as credenciais** que aparecem:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "rav-2026.firebaseapp.com",
  projectId: "rav-2026",
  storageBucket: "rav-2026.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
};
```

---

## ⚙️ PASSO 3: Configurar o Código

### 3.1 Atualizar Configuração do Firebase

Abra o arquivo `src/utils/firebase.ts` e substitua as credenciais vazias pelas suas credenciais do Firebase:

```typescript
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_AUTH_DOMAIN_AQUI",
  projectId: "SEU_PROJECT_ID_AQUI",
  storageBucket: "SEU_STORAGE_BUCKET_AQUI",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID_AQUI",
  appId: "SEU_APP_ID_AQUI",
};
```

### 3.2 Ativar Upload Real de Imagens

No mesmo arquivo `src/utils/firebase.ts`, descomente as linhas do Storage:

1. Descomente a linha 3:

```typescript
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
```

2. Descomente a linha 18:

```typescript
const storage = getStorage(app);
```

3. Descomente o código REAL IMPLEMENTATION (linhas 36-46) e comente o código MOCK

### 3.3 Inicializar Firestore

Precisamos conectar o Firestore. Vamos atualizar o arquivo `src/utils/firestore.ts` para inicializar corretamente.

**Ação necessária:** O código já está preparado, mas precisamos garantir que o Firestore seja inicializado quando o app iniciar.

---

## 🧪 PASSO 4: Testar Localmente

### 4.1 Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

Isso vai:

- Iniciar o servidor Vite
- Abrir automaticamente em `http://localhost:5173`
- Habilitar hot-reload (mudanças aparecem automaticamente)

### 4.2 Testar o Fluxo Completo

1. **Tela Inicial (Resting):**

   - Deve mostrar animações e botão "TOCAR"
   - Clique em "TOCAR"

2. **Tela de Recap:**

   - Deve mostrar informações sobre 2024/2025
   - Aguarde a transição automática

3. **Tela de Registro:**

   - Digite seu nome
   - Selecione sua área
   - Clique em "Continuar"

4. **Tela de Quiz:**

   - Responda as 3 perguntas
   - Seu arquétipo será calculado

5. **Tela de Captura:**

   - **Permita acesso à câmera** quando solicitado
   - Aguarde a contagem regressiva
   - Sua foto será capturada

6. **Tela de Resultado:**

   - Veja seu arquétipo revelado
   - Clique em "GERAR QR CODE"
   - A imagem será enviada para o Firebase
   - Um QR Code será gerado

7. **Estatísticas:**
   - Clique em "Ver Estatísticas"
   - Deve mostrar dados dos participantes salvos

---

## 🐛 PASSO 5: Resolver Problemas Comuns

### Problema: Câmera não funciona

**Solução:**

- Certifique-se de permitir acesso à câmera no navegador
- Use HTTPS em produção (câmera não funciona em HTTP local em alguns navegadores)
- Teste em diferentes navegadores (Chrome, Firefox, Edge)

### Problema: Firebase não conecta

**Solução:**

- Verifique se as credenciais estão corretas
- Verifique se o Firestore está ativado
- Verifique as regras de segurança do Firestore (devem permitir leitura/escrita)

### Problema: QR Code não gera

**Solução:**

- Verifique se o upload da imagem funcionou
- Verifique o console do navegador para erros
- Certifique-se de que o Storage está configurado

### Problema: Estatísticas não aparecem

**Solução:**

- Verifique se há dados salvos no Firestore
- Verifique as regras de segurança do Firestore
- Verifique o console para erros

---

## 📦 PASSO 6: Preparar para Produção

### 6.1 Configurar Regras de Segurança do Firestore

No Firebase Console > Firestore Database > Regras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /participants/{document=**} {
      allow read: if true;  // Permite leitura pública
      allow write: if true; // Permite escrita pública (ajuste conforme necessário)
    }
  }
}
```

**⚠️ ATENÇÃO:** Para produção, implemente autenticação adequada!

### 6.2 Configurar Regras de Segurança do Storage

No Firebase Console > Storage > Regras:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /captures/{allPaths=**} {
      allow read: if true;  // Permite leitura pública
      allow write: if true; // Permite escrita pública (ajuste conforme necessário)
    }
  }
}
```

### 6.3 Build para Produção

```bash
npm run build
```

Isso cria a pasta `dist` com os arquivos otimizados para produção.

### 6.4 Deploy

Você pode fazer deploy em:

- **Firebase Hosting** (recomendado)
- **Vercel**
- **Netlify**
- **GitHub Pages**

---

## 📝 Checklist Final

Antes de considerar o projeto pronto:

- [ ] Dependências instaladas (`npm install`)
- [ ] Firebase configurado com credenciais corretas
- [ ] Firestore Database criado e ativado
- [ ] Storage criado e ativado
- [ ] Código atualizado com credenciais reais
- [ ] Upload de imagens funcionando
- [ ] QR Code gerando corretamente
- [ ] Estatísticas carregando dados
- [ ] Testado em navegador local
- [ ] Regras de segurança configuradas
- [ ] Build de produção testado

---

## 🎉 Próximos Passos

Após completar todos os passos:

1. **Personalizar conteúdo:** Edite os arquétipos em `src/data/archetypes.ts`
2. **Ajustar design:** Modifique cores e estilos em `src/index.css`
3. **Adicionar features:** Implemente melhorias conforme necessário
4. **Fazer deploy:** Coloque online para uso real

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique o console do navegador (F12)
2. Verifique os logs do Firebase Console
3. Revise este guia passo a passo
4. Consulte a documentação do Firebase

**Boa sorte com o projeto RAV 2026! 🚀**
