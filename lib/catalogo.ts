export type Acabamento = "preto" | "branco";
export type Modelo = "simples" | "grade" | "duas";

export type Produto = {
  id: string;
  nome: string; // nome comercial: altura x largura
  altura: number; // cm
  largura: number; // cm
  modelo: Modelo;
  ambiente: string;
  fotos: Partial<Record<Acabamento, string>>;
  estudio?: boolean; // foto de estúdio em fundo branco
  preco?: Partial<Record<Acabamento, number>>;
  peso?: string;
};

export const modelos: Record<Modelo, string> = {
  simples: "Basculante maxim-ar",
  grade: "Basculante com grade",
  duas: "Basculante de duas seções",
};

export const catalogo: Produto[] = [
  {
    id: "60x60",
    nome: "60x60",
    altura: 60,
    largura: 60,
    modelo: "simples",
    ambiente: "Banheiro",
    fotos: {
      preto: "/img/prod/60x60-preto.webp",
      branco: "/img/prod/60x60-branco.webp",
    },
    estudio: true,
    preco: { preto: 249.9, branco: 239.9 },
    peso: "3,5 kg",
  },
  {
    id: "60x60-grade",
    nome: "60x60 com grade",
    altura: 60,
    largura: 60,
    modelo: "grade",
    ambiente: "Casa térrea",
    fotos: { preto: "/img/real/60x60-grade-preto.webp" },
    preco: { preto: 269.9, branco: 259.9 },
    peso: "4 kg",
  },
  {
    id: "50x50",
    nome: "50x50",
    altura: 50,
    largura: 50,
    modelo: "simples",
    ambiente: "Banheiro pequeno",
    fotos: {
      preto: "/img/prod/50x50-preto.webp",
      branco: "/img/prod/50x50-branco.webp",
    },
    estudio: true,
    preco: { preto: 229.9, branco: 219.9 },
    peso: "3 kg",
  },
  {
    id: "40x40",
    nome: "40x40",
    altura: 40,
    largura: 40,
    modelo: "simples",
    ambiente: "Lavabo",
    fotos: {
      preto: "/img/prod/40x40-preto.webp",
      branco: "/img/prod/40x40-branco.webp",
    },
    estudio: true,
  },
  {
    id: "40x60",
    nome: "40x60",
    altura: 40,
    largura: 60,
    modelo: "simples",
    ambiente: "Cozinha",
    fotos: {
      preto: "/img/real/40x60-preto.webp",
      branco: "/img/real/40x60-branco.webp",
    },
    preco: { preto: 239.9, branco: 229.9 },
    peso: "2,8 kg",
  },
  {
    id: "60x40",
    nome: "60x40",
    altura: 60,
    largura: 40,
    modelo: "simples",
    ambiente: "Banheiro",
    fotos: {
      preto: "/img/real/60x40-preto.webp",
      branco: "/img/real/60x40-branco.webp",
    },
    preco: { preto: 239.9, branco: 229.9 },
    peso: "2,8 kg",
  },
  {
    id: "50x60",
    nome: "50x60",
    altura: 50,
    largura: 60,
    modelo: "simples",
    ambiente: "Banheiro",
    fotos: { preto: "/img/real/50x60-preto.webp" },
    preco: { preto: 269.9, branco: 259.9 },
    peso: "3,5 kg",
  },
  {
    id: "40x80",
    nome: "40x80",
    altura: 40,
    largura: 80,
    modelo: "simples",
    ambiente: "Cozinha e lavanderia",
    fotos: {
      preto: "/img/real/40x80-preto.webp",
      branco: "/img/real/40x80-branco.webp",
    },
    preco: { preto: 279.9, branco: 269.9 },
    peso: "4,8 kg",
  },
  {
    id: "60x80",
    nome: "60x80",
    altura: 60,
    largura: 80,
    modelo: "simples",
    ambiente: "Cozinha e sala",
    fotos: {
      preto: "/img/real/60x80-preto.webp",
      branco: "/img/real/60x80-branco.webp",
    },
  },
  {
    id: "60x80-grade",
    nome: "60x80 com grade",
    altura: 60,
    largura: 80,
    modelo: "grade",
    ambiente: "Casa térrea",
    fotos: {
      preto: "/img/real/60x80-grade-preto.webp",
      branco: "/img/real/60x80-grade-branco.webp",
    },
  },
  {
    id: "60x120",
    nome: "60x120 duas seções",
    altura: 60,
    largura: 120,
    modelo: "duas",
    ambiente: "Sala e cozinha",
    fotos: { branco: "/img/real/60x120-branco.webp" },
    preco: { preto: 500, branco: 490 },
    peso: "7,5 kg",
  },
];

export function acharPadrao(largura: number, altura: number, modelo: Modelo) {
  return catalogo.find(
    (p) => p.largura === largura && p.altura === altura && p.modelo === modelo,
  );
}

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
