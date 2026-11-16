# Maxx Alumínio

Site comercial em Next.js 16, React 19 e TypeScript. Catálogo de janelas maxim-ar, acabamentos preto/branco, pedido copiável e acessos interativos aos canais oficiais.

## Executar

Node.js >= 20.9.0 (validado com 24.22.1).

```sh
npm ci
npm run dev
```

## Validar

```sh
npm run build
npm run test:e2e
```

Os testes usam a build de produção na porta 3100, com Chromium nos tamanhos desktop e celular. Usam `/usr/bin/chromium` quando disponível; em outro ambiente, execute `npx playwright install chromium` ou defina `CHROMIUM_PATH`. Cobrem catálogo, cor, pedido, erros, clipboard, links das lojas, menu, FAQ e redução de movimento. As navegações às lojas são interceptadas nos testes, sem fazer compras ou enviar mensagens.

## Conteúdo

- `lib/site.ts`: links oficiais, cidade, WhatsApp opcional, controle de preços e intervalos do formulário.
- `lib/catalogo.ts`: medidas em centímetros, modelos e fotos originais. O nome comercial segue **altura × largura**.
- `DESIGN.md` e `PRODUCT.md`: identidade e informações confirmadas da empresa.
- `public/img/`: fotos reais e logo.

Sem WhatsApp configurado, o visitante copia o pedido e o envia pelo chat de uma loja. O site não envia pedidos, recebe pagamentos nem coleta dados pessoais. Preços ficam ocultos até validação comercial. Estoque, frete, prazos e viabilidade de medidas personalizadas são confirmados nos canais oficiais.

O TikTok fornecido é o perfil oficial. Nenhum domínio público foi assumido para canonical ou sitemap; configure-os quando o domínio definitivo for definido.
