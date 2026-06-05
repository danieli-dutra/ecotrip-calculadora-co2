# 📌 Requisitos do Projeto — EcoTrip

## 🎯 Objetivo geral

Desenvolver uma aplicação web que calcule a emissão estimada de CO₂ em viagens entre cidades brasileiras, permitindo comparar diferentes meios de transporte e estimar o impacto ambiental da rota.

---

## 🧩 Requisitos funcionais

### 🔍 RF01 — Inserção de origem e destino
- O sistema deve permitir que o usuário informe uma cidade de origem.
- O sistema deve permitir que o usuário informe uma cidade de destino.
- Deve haver suporte a seleção manual de distância caso as cidades não sejam encontradas.

---

### 🏙️ RF02 — Base de cidades brasileiras
- O sistema deve conter uma base interna de cidades brasileiras com:
  - Nome da cidade
  - Estado (UF)
  - Coordenadas geográficas (latitude e longitude)

---

### 🧭 RF03 — Autocomplete de cidades
- O sistema deve sugerir cidades enquanto o usuário digita.
- As sugestões devem ser filtradas por nome e estado.
- O usuário deve poder selecionar uma sugestão para preencher o campo.

---

### 🔄 RF04 — Troca de origem e destino
- O sistema deve permitir inverter origem e destino com um único clique.

---

### 🚗 RF05 — Seleção de meio de transporte
- O usuário deve poder selecionar entre:
  - Bicicleta
  - Ônibus
  - Carro
  - Caminhão
- Cada transporte deve possuir um fator de emissão de CO₂ associado.

---

### 📊 RF06 — Cálculo de distância
- O sistema deve calcular a distância entre duas cidades utilizando coordenadas geográficas.
- Deve ser utilizada a fórmula de Haversine.
- Deve ser aplicada uma margem de ajuste para simular rotas rodoviárias.

---

### 🌱 RF07 — Cálculo de emissão de CO₂
- O sistema deve calcular a emissão total baseada em:
  - distância (km)
  - fator de emissão do transporte (g/km)
- O resultado deve ser convertido para kg de CO₂.

---

### 🌳 RF08 — Equivalência ambiental
- O sistema deve estimar:
  - número de árvores necessárias para absorção equivalente de CO₂
  - créditos de carbono necessários para compensação

---

### 💳 RF09 — Créditos de carbono
- O sistema deve converter emissão em créditos de carbono.
- Deve calcular o custo estimado de compensação.

---

### 📈 RF10 — Comparação entre transportes
- O sistema deve exibir comparação visual entre os meios de transporte.
- Deve representar proporcionalmente as emissões.

---

### 🎨 RF11 — Interface e experiência do usuário
- O sistema deve ser responsivo.
- Deve utilizar animações suaves.
- Deve apresentar feedback visual de carregamento e erro.
- Deve ter design moderno baseado em glassmorphism.

---

## ⚙️ Requisitos não funcionais

### 🚀 RNF01 — Performance
- Cálculos devem ser executados no front-end sem dependência de API externa.

---

### 📱 RNF02 — Responsividade
- A aplicação deve funcionar em dispositivos móveis, tablets e desktop.

---

### 🧠 RNF03 — Usabilidade
- Interface deve ser intuitiva e de fácil compreensão.

---

### 🌐 RNF04 — Compatibilidade
- Deve funcionar nos principais navegadores modernos:
  - Chrome
  - Firefox
  - Edge

---

## 🧱 Regras de negócio

- Bicicleta não gera emissão de CO₂.
- 1 crédito de carbono = 1 tonelada de CO₂.
- Valor médio do crédito: R$ 80,00.
- Distância mínima válida deve ser maior que 0 km.

---

## 📌 Observação

Este documento descreve os requisitos implementados no projeto **EcoTrip**, servindo como base para validação funcional e evolução futura do sistema.