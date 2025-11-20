# 💰 Estimativa de Custos e Limites - Firebase (Plano Spark)

Esta análise considera o plano gratuito (Spark) do Firebase e a configuração atual do app RAV 2026.

## 📊 Resumo da Capacidade Diária

| Recurso                     | Limite Diário       | Consumo Unitário  | Capacidade Estimada            |
| :-------------------------- | :------------------ | :---------------- | :----------------------------- |
| **Participantes**           | N/A                 | N/A               | **~1.000 a 2.000 pessoas/dia** |
| **Downloads de Fotos**      | 1 GiB/dia           | ~500 KB/foto      | **~2.000 downloads/dia**       |
| **Visualizar Estatísticas** | 50.000 leituras/dia | 100 leituras/view | **500 visualizações/dia**      |

---

## 1. Firebase Storage (Imagens) - ⚠️ O MAIOR GARGALO

As imagens geradas são Full HD (1080x1920) em JPG (qualidade 0.9).

- **Tamanho estimado:** 300KB a 600KB (média: **500KB**)

### Limites Gratuitos:

- **Armazenamento Total:** 5 GiB (~10.000 fotos armazenadas)
- **Download (Bandwidth):** 1 GiB por dia

### Cenário Real:

- Se cada participante gerar 1 foto e baixar 1 vez:

  - 1 Upload (500KB) + 1 Download (500KB) = 1MB de tráfego.
  - **Limite:** ~1.000 participantes por dia.

- Se a foto for muito compartilhada e 10 pessoas baixarem:
  - 5MB por foto.
  - **Limite:** ~200 participantes por dia.

### 💡 Sugestão de Otimização:

Reduzir a qualidade do JPG de `0.9` para `0.7` ou `0.8` pode reduzir o tamanho pela metade (250KB) sem perda visual perceptível no celular, dobrando sua capacidade para **4.000 downloads/dia**.

---

## 2. Firestore (Banco de Dados)

### Limites Gratuitos:

- **Escritas:** 20.000 por dia
- **Leituras:** 50.000 por dia

### Consumo do App:

- **Salvar Participante:** 1 escrita (Insignificante, suporta 20.000 pessoas/dia).
- **Ver Estatísticas:** O código atual lê os **últimos 100 participantes** (`limit(100)`).
  - Cada vez que abre a tela de estatísticas = **100 leituras**.
  - **Limite:** 50.000 / 100 = **500 visualizações da tela de estatísticas por dia**.

### 💡 Sugestão de Otimização:

Se o evento for muito grande, a tela de estatísticas pode consumir o limite rápido.

- **Solução:** Criar um documento único de "contadores" que é atualizado a cada novo cadastro, em vez de ler 100 documentos toda vez.

---

## 3. Hosting

- **Limite:** 360 MB/dia de transferência.
- O app tem ~1MB.
- Suporta cerca de **360 acessos completos por dia** (carregamento do site).
- **Obs:** O cache do navegador ajuda muito aqui, então o número real de usuários pode ser bem maior (1000+).

---

## 🚀 Conclusão

O aplicativo suporta tranquilamente um evento de pequeno/médio porte (**até 500-800 pessoas**) no plano gratuito, assumindo um uso normal.

**Ponto de Atenção:**
Se você espera **mais de 1.000 pessoas** ou muitos downloads da mesma foto, considere:

1. Otimizar a compressão da imagem (reduzir para 0.7).
2. Monitorar o consumo no Firebase Console durante o evento.
3. Se necessário, o plano Blaze (pago conforme o uso) é muito barato (centavos de dólar por GB excedente).

---

### Como monitorar

Acesse o [Console do Firebase](https://console.firebase.google.com/project/adubosreal-rav2026/usage) e verifique as abas **Storage** e **Database** para ver o consumo em tempo real.
