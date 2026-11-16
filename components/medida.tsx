"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Acabamento, Modelo } from "@/lib/catalogo";

type Medida = {
  largura: number;
  altura: number;
  cor: Acabamento;
  modelo: Modelo;
  quantidade: number;
  setLargura: (v: number) => void;
  setAltura: (v: number) => void;
  setCor: (v: Acabamento) => void;
  setModelo: (v: Modelo) => void;
  setQuantidade: (v: number) => void;
};

const Ctx = createContext<Medida | null>(null);

export function MedidaProvider({ children }: { children: ReactNode }) {
  const [largura, setLargura] = useState(60);
  const [altura, setAltura] = useState(60);
  const [cor, setCor] = useState<Acabamento>("preto");
  const [modelo, setModelo] = useState<Modelo>("simples");
  const [quantidade, setQuantidade] = useState(1);
  const value = useMemo(
    () => ({ largura, altura, cor, modelo, quantidade, setLargura, setAltura, setCor, setModelo, setQuantidade }),
    [largura, altura, cor, modelo, quantidade],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useMedida() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useMedida fora do MedidaProvider");
  return v;
}
