// Dados que a empresa precisa confirmar antes da publicação.
// Trocar aqui muda a página inteira.

export const site = {
  nome: "Maxx Alumínio",
  cidade: "Bragança Paulista, SP",
  tiktokPerfil: "https://www.tiktok.com/@maxxaluminio2026",

  // Links das lojas oficiais. Enquanto estiverem vazios, os botões de compra
  // levam para a seção "Como comprar".
  lojas: [
    { id: "shopee", nome: "Shopee", url: "https://br.shp.ee/Ajx2X93" },
    {
      id: "mercadolivre",
      nome: "Mercado Livre",
      url: "https://www.mercadolivre.com.br/pagina/dywjrqls",
    },
    {
      id: "tiktok",
      nome: "TikTok",
      url: "https://www.tiktok.com/@maxxaluminio2026",
    },
  ],

  // Canal do orçamento sob medida. Com um número de WhatsApp (só dígitos,
  // com DDI: 5511999999999) o botão abre a conversa com o pedido pronto.
  // Vazio: o pedido é copiado e o cliente envia pelo chat de uma das lojas.
  orcamentoWhatsapp: "",

  // Preços da planilha "VALORES E PESO". Ligar só depois de conferir com os anúncios.
  mostrarPrecos: false,

  // Faixa aceita pelo medidor, em cm. Limites reais dependem de avaliação técnica.
  limites: { larguraMin: 30, larguraMax: 150, alturaMin: 30, alturaMax: 120 },
};

export type Loja = (typeof site.lojas)[number];
