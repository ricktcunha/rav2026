# ✅ Configuração do Firebase - COMPLETA

## O que foi configurado:

✅ **Credenciais do Firebase** adicionadas em `src/utils/firebase.ts`
✅ **Storage** ativado e configurado para upload de imagens
✅ **Firestore** inicializado automaticamente
✅ **Upload real de imagens** implementado (não é mais mock)

## 📋 Próximos Passos IMPORTANTES:

### 1. Configurar Regras de Segurança do Firestore

No Firebase Console (https://console.firebase.google.com/):
1. Vá em **Firestore Database** > **Regras**
2. Cole as seguintes regras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /participants/{document=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

3. Clique em **Publicar**

### 2. Configurar Regras de Segurança do Storage

No Firebase Console:
1. Vá em **Storage** > **Regras**
2. Cole as seguintes regras:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /captures/{allPaths=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

3. Clique em **Publicar**

⚠️ **ATENÇÃO:** Essas regras permitem acesso público. Para produção, considere implementar autenticação.

### 3. Verificar se Firestore e Storage estão ativados

No Firebase Console, verifique:
- ✅ Firestore Database está criado e ativo
- ✅ Storage está criado e ativo

### 4. Testar o projeto

```bash
npm run dev
```

Depois teste:
1. O fluxo completo do quiz
2. A captura de foto
3. A geração do QR Code
4. As estatísticas

## 🎉 Status Atual:

- ✅ Firebase configurado
- ✅ Código atualizado
- ⚠️ **FALTA:** Configurar regras de segurança (passos 1 e 2 acima)

Após configurar as regras, o projeto estará 100% funcional!

