import type { Metadata } from "next";
import "@fontsource-variable/archivo";
import "./globals.css";
import "./hero.css";

export const metadata: Metadata = {
  title: "Maxx Alumínio | Janelas na medida da sua obra",
  description:
    "Janelas basculantes maxim-ar direto do fabricante. Conheça os modelos, escolha entre preto e branco e prepare seu pedido em medida padrão ou sob medida.",
  applicationName: "Maxx Alumínio",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Maxx Alumínio | Janelas na medida da sua obra",
    description:
      "Fabricação própria. Janelas de alumínio em medidas padrão ou sob medida.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
