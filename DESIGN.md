---
name: Maxx Alumínio
description: Janelas de alumínio apresentadas pela medida, pelo acabamento e pelo produto real.
colors:
  paper: "#f5f4ef"
  white: "#fff"
  ink: "#191a17"
  muted: "#62645c"
  border: "#d8d9d0"
  amber: "#f3b44d"
  amber-dark: "#77500b"
  error: "#a52624"
  dark-hover: "#373930"
  amber-hover: "#ffd08a"
  field-border: "#909486"
  factory-surface: "#e9eadd"
  inverse-muted: "#b8bcac"
typography:
  display:
    fontFamily: '"Archivo Variable", sans-serif'
    fontSize: "clamp(3rem, 5.8vw, 5.5rem)"
    fontWeight: 730
    lineHeight: 1.01
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '"Archivo Variable", sans-serif'
    fontSize: "clamp(2.1rem, 3.8vw, 3.4rem)"
    fontWeight: 660
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  dimension:
    fontFamily: '"Archivo Variable", sans-serif'
    fontSize: "2.35rem"
    fontWeight: 580
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  title:
    fontFamily: '"Archivo Variable", sans-serif'
    fontSize: "1.3rem"
    fontWeight: 600
    letterSpacing: "-0.03em"
  body:
    fontFamily: '"Archivo Variable", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: '"Archivo Variable", sans-serif'
    fontSize: "0.76rem"
    fontWeight: 500
  button:
    fontFamily: '"Archivo Variable", sans-serif'
    fontSize: "0.9rem"
    fontWeight: 600
rounded:
  fine: "2px"
  control: "3px"
  form: "4px"
  circular: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  field: "20px"
  lg: "24px"
  xl: "32px"
  panel: "36px"
  section-heading: "40px"
  wide: "48px"
  section-mobile: "64px"
  section: "100px"
components:
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "16px 24px"
  button-dark-hover:
    backgroundColor: "{colors.dark-hover}"
  button-amber:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "16px 24px"
  button-amber-hover:
    backgroundColor: "{colors.amber-hover}"
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "16px 24px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  filter:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  finish-option:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
  finish-option-selected:
    backgroundColor: "{colors.white}"
  dimension-input:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    rounded: "{rounded.fine}"
    padding: "14px 8px 14px 14px"
  request-form:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.form}"
    padding: "36px"
  navigation:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  product-card:
    textColor: "{colors.ink}"
  store-window:
    textColor: "{colors.white}"
    rounded: "{rounded.fine}"
  size-simulator:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "24px"
---

# Design System: Maxx Alumínio

## Overview

**Creative North Star: "Medida e produto real"**

Síntese descritiva da implementação: fotografia real, dimensões legíveis e controles diretos. O preto, o branco e o âmbar acompanham o logo oficial. A apresentação combina áreas claras para comparação com áreas escuras para navegação e acesso aos canais oficiais.

O sistema serve principalmente a quem consulta pelo celular durante a obra. Texto simples, unidades explícitas, foco visível e alternativas ao arraste mantêm as decisões acessíveis.

**Key Characteristics:**

- Fotografias reais no catálogo, ambiente ilustrativo identificado no hero e medidas em centímetros.
- Tipografia única, títulos compactos e números tabulares nas dimensões.
- Formas retas, contornos finos e controles com cantos discretos.
- Janela basculante como interação de acesso às lojas.

## Colors

### Primary

O âmbar (`amber`) destaca ações e trechos sobre fundos escuros. O âmbar escuro (`amber-dark`) serve ao destaque textual e ao foco sobre fundos claros. As variantes de hover estão no frontmatter.

### Neutral

Carvão (`ink`) para texto e seções escuras; papel (`paper`) para a base; branco (`white`) para catálogo e formulário. Cinza secundário (`muted`), cinza inverso (`inverse-muted`), borda (`border`) e contorno de campo (`field-border`) organizam informação sem competir com o produto. A área da fábrica usa a superfície levemente esverdeada (`factory-surface`). Vermelho (`error`) sinaliza validação.

## Typography

Archivo Variable, hospedada localmente, atende a todos os papéis. O frontmatter registra os valores principais; o corpo mantém entrelinha aberta e os títulos usam espaçamento negativo.

- **Display:** o hero fotográfico usa `clamp(3.6rem, 6.1vw, 6rem)`. Até (1100px), `clamp(3.6rem, 6.5vw, 4.5rem)`; até (900px), `clamp(2.7rem, 10.3vw, 3.8rem)`; até (340px), (2.3rem). O título branco destaca a segunda linha em âmbar.
- **Headline:** títulos de seção, com quebra balanceada.
- **Dimension:** medida comercial; números tabulares. No catálogo móvel, (1.9rem); até (380px), (2.25rem).
- **Title:** cabeçalho do formulário. O guia de compra usa títulos de (1.6rem).
- **Body / Label:** texto explicativo e identificação dos campos. As descrições de seção variam com o contexto; não há uma escala proporcional única.

## Layout

Contêiner central de até (1280px), com (56px) por lado; até (1100px), (32px); até (760px), (20px). Seções usam (100px) de respiro vertical, reduzido a (64px) no celular.

Catálogo em três colunas, duas até (760px) e uma até (380px). Lojas em três colunas, empilhadas até (760px). Formulário, fábrica, comparação de acabamentos e dúvidas passam de duas colunas para uma nesse mesmo limite. Altura e largura continuam lado a lado no formulário. O cabeçalho fixo mede (96px), ou (80px) no celular.

## Elevation & Depth

A maior parte da página usa alternância de superfícies e bordas. As sombras ficam no menu móvel, no desenho do simulador e nas janelas das lojas. Estas usam perspectiva de (1000px), moldura com `0 15px 28px #0003` e folha com `0 4px 10px #0004`; aberta, a folha recebe `0 28px 30px #0005`.

A fotografia do hero se acomoda em (1.3s), com escala de (1.025) a (1) e luminosidade de (0.85) a (1); imagens do catálogo ampliam em (0.5s) e folhas das lojas giram em (0.75s), com a curva registrada no sidecar. `prefers-reduced-motion` remove animações, transições e rotação das lojas; a seleção permanece visível por cor e borda.

## Shapes

Retângulos predominam: campos e detalhes de (2px), botões e imagens do catálogo de (3px), formulário de (4px). Contornos normalmente têm (1px). Amostras de acabamento e puxadores de arraste são circulares; os controles de arraste medem (44px).

## Components

- **Hero fotográfico:** fotografia arquitetônica de ambiente, gerada a partir da referência do produto, identificada como “Ambiente ilustrativo”. Desktop com fotografia ampla, sombra lateral para leitura, título sobreposto, ação âmbar e ação de contorno. Até (900px), fotografia acima do texto sobre carvão; os dois caminhos continuam visíveis. A faixa inferior informa fabricação própria e aponta para os acabamentos. Imagem WebP local de aproximadamente (174kB); a origem e o prompt ficam em `.impeccable/assets/hero-architecture.json`.
- **Botões:** três variantes — carvão, âmbar e contorno. Altura mínima de (54px), foco externo de (3px), deslocamento de (1px) ao pressionar. Links textuais têm altura mínima de (44px).
- **Filtros e acabamento:** estado anunciado por `aria-pressed`; filtros selecionados invertem para carvão. Acabamento selecionado ganha contorno, superfície e marca de confirmação. A escolha de acabamento é compartilhada entre catálogo, simulador e pedido.
- **Cartões:** fotografia sobre papel, indicação do modelo e medida comercial em altura × largura. A ação preenche modelo e dimensões exatos no pedido. O catálogo inicia com seis modelos e permite expandir ou filtrar.
- **Campos e pedido:** rótulos persistentes, unidade ao lado do número, borda vermelha e texto em erros. Foco de (2px) nos campos. O formulário valida as faixas de consulta, distingue medida do catálogo de avaliação técnica e prepara uma mensagem copiável. Com o canal atual, a cópia exige envio posterior no chat da loja; não representa pedido enviado.
- **Navegação:** links sobre carvão. Até (760px), botão de menu com `aria-expanded`; escolher um destino fecha o menu. Escape fecha e devolve foco ao botão.
- **Janelas das lojas:** links nativos para Shopee, Mercado Livre e perfil oficial do TikTok, em nova aba. Hover ou foco gira a folha em (16°); clique deixa a última escolhida em (62°) e destaca a moldura. Esse estado dura enquanto o componente está montado, sem persistência após recarregar.
- **Simulador:** prévia ilustrativa de proporção, com cotas, arraste, controles de faixa e seis medidas rápidas. As setas no puxador ajustam (1cm) por vez. Dimensões compartilham estado com o pedido; os intervalos são de consulta, sem prometer viabilidade técnica.
- **Comparação:** duas fotografias do mesmo produto, divisória móvel e controle de faixa de (0–100), iniciado em (50). Permite arraste e setas, com percentual anunciado. A divisória não muda o acabamento escolhido no pedido.
- **Dúvidas:** `details` e `summary` nativos, separadores finos e símbolo que gira ao expandir.

## Do's and Don'ts

### Do:

- **Do** preservar o logo oficial e as fotografias reais.
- **Do** identificar altura, largura e unidade; no nome comercial, usar altura × largura.
- **Do** manter foco visível, alternativas de teclado ao arraste e redução de movimento.
- **Do** informar seleção, validação e cópia em texto, além da cor.

### Don't:

- **Don't** apresentar limites do simulador como limites técnicos de fabricação.
- **Don't** sugerir que copiar o pedido já o enviou ou que o perfil TikTok é um checkout.
- **Don't** adicionar preços, estoque, prazos ou garantias sem confirmação da empresa.
