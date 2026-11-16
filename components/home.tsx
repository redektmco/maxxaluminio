"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent, type SVGProps } from "react";
import {
  acharPadrao,
  brl,
  catalogo,
  modelos,
  type Acabamento,
  type Modelo,
  type Produto,
} from "@/lib/catalogo";
import { site } from "@/lib/site";
import { useMedida } from "./medida";
import { BuyingGuide, FinishComparison, WindowSizer } from "./window-tools";

function Arrow({
  diagonal = false,
  ...props
}: SVGProps<SVGSVGElement> & { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      {...props}
    >
      <path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}

function Check() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function Colors({ dark = false }: { dark?: boolean }) {
  const { cor, setCor } = useMedida();
  return (
    <fieldset className={`colors ${dark ? "colors-dark" : ""}`}>
      <legend>Acabamento</legend>
      <div className="color-options">
        {(["preto", "branco"] as Acabamento[]).map((c) => (
          <button
            key={c}
            type="button"
            className={`color-option ${cor === c ? "selected" : ""}`}
            aria-pressed={cor === c}
            onClick={() => setCor(c)}
          >
            <span className={`swatch swatch-${c}`} />
            {c === "preto" ? "Preto" : "Branco"}
            {cor === c && <Check />}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="header"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="header-inner wrap">
        <a href="#inicio" className="brand" onClick={() => setOpen(false)}>
          <Image
            src="/img/logo-maxx.png"
            width={43}
            height={58}
            alt="Maxx Alumínio"
            priority
          />
          <span>
            Direto de quem
            <br />
            fabrica.
          </span>
        </a>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen(!open)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              d={open ? "m6 6 12 12M6 18 18 6" : "M3 7h18M3 12h18M3 17h18"}
            />
          </svg>
        </button>
        <nav
          id="menu-principal"
          className="navigation"
          data-open={open}
          aria-label="Navegação principal"
        >
          <a href="#catalogo" onClick={() => setOpen(false)}>
            Nossas janelas
          </a>
          <a href="#fabrica" onClick={() => setOpen(false)}>
            A fábrica
          </a>
          <a href="#duvidas" onClick={() => setOpen(false)}>
            Dúvidas
          </a>
          <a
            href="#lojas"
            className="header-store"
            onClick={() => setOpen(false)}
          >
            Lojas oficiais <Arrow diagonal />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const { cor } = useMedida();
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">
          A janela certa.
          <br />
          Na medida
          <br />
          da sua <span>obra.</span>
        </h1>
        <p>
          Do banheiro à cozinha. Janelas de alumínio direto do fabricante, em
          medidas padrão ou feitas para o seu projeto.
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="#catalogo">
            Ver janelas <Arrow />
          </a>
          <a className="text-link" href="#pedido">
            Fazer sob medida <Arrow diagonal />
          </a>
        </div>
        <div className="origin">
          <span className="status-dot" />
          Fabricação própria em {site.cidade}
        </div>
      </div>
      <div className="hero-product">
        <div className="product-spec">
          <span>Basculante maxim-ar</span>
          <span>Linha 25</span>
        </div>
        <div className="hero-image">
          <Image
            src={`/img/compare-${cor}.webp`}
            alt={`Janela basculante maxim-ar ${cor === "preto" ? "preta" : "branca"}, com vidro mini boreal e folha aberta`}
            width={800}
            height={640}
            priority
            sizes="(max-width: 760px) 90vw, 48vw"
          />
          <div className="dimension-height" aria-hidden="true">
            <span>60 cm</span>
          </div>
          <div className="dimension-width" aria-hidden="true">
            <span>60 cm</span>
          </div>
        </div>
        <div className="hero-product-bottom">
          <Colors />
          <p>
            Vidro mini boreal.
            <br />
            Luz, com privacidade.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ produto }: { produto: Produto }) {
  const { cor, setLargura, setAltura, setModelo } = useMedida();
  const fotoCor = produto.fotos[cor]
    ? cor
    : (Object.keys(produto.fotos)[0] as Acabamento);
  function choose() {
    setLargura(produto.largura);
    setAltura(produto.altura);
    setModelo(produto.modelo);
  }
  return (
    <article className="product-card" data-modelo={produto.modelo}>
      <div className={`catalog-image ${produto.estudio ? "studio" : ""}`}>
        <Image
          src={produto.fotos[fotoCor]!}
          alt={`${modelos[produto.modelo]}, altura ${produto.altura} cm e largura ${produto.largura} cm, na cor ${fotoCor}`}
          width={760}
          height={640}
          sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw"
        />
        <span className="product-use">{produto.ambiente}</span>
      </div>
      <div className="product-info">
        <p className="product-model">{modelos[produto.modelo]}</p>
        <h3>
          {produto.altura}
          <span> × </span>
          {produto.largura}
          <small>cm</small>
        </h3>
        <p className="product-dimensions">
          Altura × largura{fotoCor !== cor ? ` · Foto na cor ${fotoCor}` : ""}
        </p>
        {site.mostrarPrecos && produto.preco?.[cor] != null && (
          <p className="price">{brl(produto.preco[cor]!)}</p>
        )}
        <a
          href="#pedido"
          className="product-choose"
          onClick={choose}
          aria-label={`Escolher esta medida — janela ${produto.nome}`}
        >
          Escolher esta medida <Arrow />
        </a>
      </div>
    </article>
  );
}

function Catalog() {
  const [filter, setFilter] = useState<Modelo | "todos">("todos");
  const [expanded, setExpanded] = useState(false);
  const products = catalogo.filter(
    (p) => filter === "todos" || p.modelo === filter,
  );
  const visible = expanded ? products : products.slice(0, 6);
  return (
    <section
      id="catalogo"
      className="catalog-section section-pad"
      aria-labelledby="catalog-title"
    >
      <div className="wrap">
        <div className="section-heading">
          <h2 id="catalog-title">
            Sua obra tem uma medida.
            <br />A gente tem a janela.
          </h2>
          <p>
            Compare os modelos e encontre o seu.
            <br />
            Todas as medidas estão em centímetros.
          </p>
        </div>
        <div className="catalog-toolbar">
          <div
            className="filters"
            role="group"
            aria-label="Filtrar janelas por modelo"
          >
            {(
              [
                ["todos", "Todos os modelos"],
                ["simples", "Sem grade"],
                ["grade", "Com grade"],
                ["duas", "Duas seções"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                aria-pressed={filter === value}
                onClick={() => {
                  setFilter(value);
                  setExpanded(false);
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <Colors />
        </div>
        <p className="catalog-count" role="status">
          {products.length} modelos encontrados
          {!expanded && products.length > 6 ? " · mostrando 6" : ""}
        </p>
        <div className="product-grid">
          {visible.map((p) => (
            <ProductCard key={p.id} produto={p} />
          ))}
        </div>
        {products.length > 6 && (
          <div className="catalog-more">
            <button
              className="button button-outline"
              aria-expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded
                ? "Mostrar menos modelos"
                : `Ver todos os ${products.length} modelos`}
              <Arrow className={expanded ? "arrow-up" : "arrow-down"} />
            </button>
          </div>
        )}
        <div className="custom-prompt">
          <span>Não encontrou a sua medida?</span>
          <a href="#pedido" className="text-link">
            Monte seu pedido sob medida <Arrow diagonal />
          </a>
        </div>
      </div>
    </section>
  );
}

function Stores() {
  const [opened, setOpened] = useState<string | null>(null);
  return (
    <section
      className="stores-section section-pad"
      id="lojas"
      aria-labelledby="stores-title"
    >
      <div className="wrap">
        <div className="section-heading">
          <h2 id="stores-title">
            Abra a janela.
            <br />
            <span>Escolha sua loja.</span>
          </h2>
          <p>
            A Maxx está onde você já compra.
            <br />
            Clique em uma janela e acesse o canal oficial.
          </p>
        </div>
        <div className="store-windows">
          {site.lojas.map((loja, i) => (
            <a
              key={loja.id}
              className={`store-window ${opened === loja.id ? "is-open" : ""}`}
              href={loja.url || "#pedido"}
              target={loja.url ? "_blank" : undefined}
              rel={loja.url ? "noopener noreferrer" : undefined}
              onClick={() => setOpened(loja.id)}
            >
              <div className="window-frame" aria-hidden="true">
                <div className="window-inside">
                  <Arrow diagonal />
                  <span>{opened === loja.id ? "Até lá!" : "Pode entrar."}</span>
                </div>
                <div className="window-sash">
                  <div className="window-glass">
                    <span className="store-wordmark">{loja.nome}</span>
                    <span>{i === 2 ? "Perfil oficial" : "Loja oficial"}</span>
                  </div>
                  <span className="window-handle" />
                </div>
              </div>
              <div className="window-caption">
                <span>{loja.nome}</span>
                <span>
                  {opened === loja.id ? "Abrir novamente" : "Abrir janela"}
                  <Arrow diagonal />
                </span>
              </div>
              <span className="sr-only">Canal oficial, abre em outra aba.</span>
            </a>
          ))}
        </div>
        <p className="store-note" role="status">
          {opened
            ? `${site.lojas.find((l) => l.id === opened)?.nome} aberto em outra aba. Você pode continuar montando seu pedido aqui.`
            : "Preços, frete e disponibilidade são consultados em cada loja. Os canais abrem em uma nova aba."}
        </p>
      </div>
    </section>
  );
}

type FieldName = "largura" | "altura" | "quantidade";

function RequestBuilder() {
  const {
    largura,
    altura,
    cor,
    modelo,
    quantidade,
    setLargura,
    setAltura,
    setModelo,
    setQuantidade,
  } = useMedida();
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {},
  );
  const [copied, setCopied] = useState("");
  const [manualCopy, setManualCopy] = useState(false);
  const [observacoes, setObservacoes] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const validDimension = (v: number, min: number, max: number) =>
    Number.isFinite(v) && v >= min && v <= max;
  const errors: Record<FieldName, string> = {
    largura: validDimension(
      largura,
      site.limites.larguraMin,
      site.limites.larguraMax,
    )
      ? ""
      : `Informe uma largura entre ${site.limites.larguraMin} e ${site.limites.larguraMax} cm.`,
    altura: validDimension(
      altura,
      site.limites.alturaMin,
      site.limites.alturaMax,
    )
      ? ""
      : `Informe uma altura entre ${site.limites.alturaMin} e ${site.limites.alturaMax} cm.`,
    quantidade:
      Number.isInteger(quantidade) && quantidade >= 1 && quantidade <= 999
        ? ""
        : "Informe de 1 a 999 unidades, sem casas decimais.",
  };
  const valid = !Object.values(errors).some(Boolean);
  const padrao = valid ? acharPadrao(largura, altura, modelo) : undefined;
  const pedido = valid
    ? `Olá, Maxx Alumínio! Gostaria de consultar este pedido:\n\nModelo: ${modelos[modelo]}\nAltura: ${altura} cm\nLargura: ${largura} cm\nAcabamento: ${cor}\nQuantidade: ${quantidade} ${quantidade === 1 ? "unidade" : "unidades"}\n${padrao ? "Medida presente no catálogo." : "Pedido sob medida, sujeito à avaliação técnica."}${observacoes.trim() ? `\nObservações: ${observacoes.trim()}` : ""}\n\nPodem confirmar a viabilidade, o valor e o frete?`
    : "Preencha as medidas e a quantidade para preparar seu pedido.";
  async function submit(e: FormEvent) {
    e.preventDefault();
    setTouched({ largura: true, altura: true, quantidade: true });
    if (!valid) {
      const name = (Object.keys(errors) as FieldName[]).find(
        (key) => errors[key],
      );
      form.current
        ?.querySelector<HTMLInputElement>(`[name="${name}"]`)
        ?.focus();
      return;
    }
    if (site.orcamentoWhatsapp) {
      window.open(
        `https://wa.me/${site.orcamentoWhatsapp}?text=${encodeURIComponent(pedido)}`,
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }
    try {
      await navigator.clipboard.writeText(pedido);
      setCopied(pedido);
      setManualCopy(false);
    } catch {
      setManualCopy(true);
      textarea.current?.focus();
      textarea.current?.select();
    }
  }
  const fields: {
    name: FieldName;
    label: string;
    value: number;
    min: number;
    max: number;
    set: (v: number) => void;
    unit: string;
  }[] = [
    {
      name: "largura",
      label: "Largura",
      value: largura,
      min: site.limites.larguraMin,
      max: site.limites.larguraMax,
      set: setLargura,
      unit: "cm",
    },
    {
      name: "altura",
      label: "Altura",
      value: altura,
      min: site.limites.alturaMin,
      max: site.limites.alturaMax,
      set: setAltura,
      unit: "cm",
    },
    {
      name: "quantidade",
      label: "Quantidade",
      value: quantidade,
      min: 1,
      max: 999,
      set: setQuantidade,
      unit: "un.",
    },
  ];
  return (
    <section
      id="pedido"
      className="request-section section-pad"
      aria-labelledby="request-title"
    >
      <div className="wrap request-layout">
        <div className="request-copy">
          <h2 id="request-title">
            A sua medida.
            <br />O nosso trabalho.
          </h2>
          <p>
            Já mediu o vão? Conte o que você precisa e leve seu pedido para o
            chat de uma das nossas lojas.
          </p>
          <WindowSizer />
          <p className="measure-tip">
            <strong>Antes de pedir:</strong> confira as medidas do vão com o
            profissional da obra. A folga de instalação e a viabilidade devem
            ser confirmadas antes da compra.
          </p>
        </div>
        <form ref={form} onSubmit={submit} noValidate className="request-form">
          <div className="form-heading">
            <h3>Monte seu pedido</h3>
            <span>Medidas em cm</span>
          </div>
          <div className="dimension-fields">
            {fields.map((field) => (
              <div className={`field field-${field.name}`} key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <div className="input-unit">
                  <input
                    id={field.name}
                    name={field.name}
                    type="number"
                    inputMode={
                      field.name === "quantidade" ? "numeric" : "decimal"
                    }
                    min={field.min}
                    max={field.max}
                    step={field.name === "quantidade" ? "1" : "any"}
                    value={Number.isNaN(field.value) ? "" : field.value}
                    onChange={(e) => field.set(e.target.valueAsNumber)}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, [field.name]: true }))
                    }
                    required
                    aria-invalid={Boolean(
                      touched[field.name] && errors[field.name],
                    )}
                    aria-describedby={
                      touched[field.name] && errors[field.name]
                        ? `${field.name}-error`
                        : undefined
                    }
                  />
                  <span>{field.unit}</span>
                </div>
                {touched[field.name] && errors[field.name] && (
                  <p className="field-error" id={`${field.name}-error`}>
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="field">
            <label htmlFor="modelo">Modelo</label>
            <select
              id="modelo"
              name="modelo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value as Modelo)}
            >
              {Object.entries(modelos).map(([key, name]) => (
                <option value={key} key={key}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <Colors />
          <div className="field observations">
            <label htmlFor="observacoes">
              Observações <span>(opcional)</span>
            </label>
            <textarea
              id="observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              maxLength={500}
              rows={3}
              placeholder="Ex.: cidade de entrega, dúvida sobre a instalação…"
            />
            <p>{observacoes.length}/500 caracteres</p>
          </div>
          <div
            className={`match-status ${!valid ? "match-invalid" : ""}`}
            role="status"
          >
            {valid && <Check />}
            <div>
              <strong>
                {!valid
                  ? "Confira os campos do pedido"
                  : padrao
                    ? "Essa medida está no catálogo."
                    : "Vamos avaliar sua medida."}
              </strong>
              <p>
                {!valid
                  ? "Use os intervalos indicados nos campos."
                  : padrao
                    ? "Confirme a cor e a disponibilidade na loja."
                    : "A fabricação depende de avaliação técnica. Os intervalos do formulário são apenas para consulta."}
              </p>
            </div>
          </div>
          <label className="summary-label" htmlFor="pedido-resumo">
            Seu pedido, pronto para enviar
          </label>
          <textarea
            ref={textarea}
            id="pedido-resumo"
            rows={8}
            value={pedido}
            readOnly
            spellCheck={false}
          />
          <button type="submit" className="button button-dark request-submit">
            {site.orcamentoWhatsapp
              ? "Pedir orçamento no WhatsApp"
              : copied === pedido && valid
                ? "Pedido copiado"
                : "Copiar meu pedido"}
            {copied === pedido && valid ? <Check /> : <Arrow />}
          </button>
          <p className="copy-feedback" role="status">
            {manualCopy
              ? "Selecione e copie o texto acima. Depois, cole no chat de uma loja."
              : copied === pedido && valid
                ? "Copiado! Agora abra uma loja abaixo e cole no chat. O pedido ainda não foi enviado."
                : "Você confere todos os detalhes antes de enviar. Nenhum pedido é enviado automaticamente."}
          </p>
          <div className="request-stores">
            {site.lojas
              .filter((l) => l.url)
              .map((loja) => (
                <a
                  key={loja.id}
                  href={loja.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {loja.nome}
                  <Arrow diagonal />
                </a>
              ))}
          </div>
        </form>
      </div>
    </section>
  );
}

function Factory() {
  return (
    <section
      id="fabrica"
      className="factory-section section-pad"
      aria-labelledby="factory-title"
    >
      <div className="wrap factory-layout">
        <div className="factory-images">
          <Image
            src="/img/real/fabrica-2.webp"
            alt="Janelas Maxx Alumínio fotografadas na fábrica"
            width={1400}
            height={1050}
            sizes="(max-width: 760px) 90vw, 50vw"
          />
          <div className="detail-image">
            <Image
              src="/img/real/detalhe-fecho.webp"
              alt="Detalhe do fecho da janela de alumínio"
              width={600}
              height={600}
              sizes="(max-width: 760px) 35vw, 20vw"
            />
          </div>
          <span>Da nossa fábrica para a sua obra.</span>
        </div>
        <div className="factory-copy">
          <h2 id="factory-title">
            Tem fábrica.
            <br />
            Tem quem faz.
          </h2>
          <p>
            A Maxx Alumínio fabrica janelas em Bragança Paulista, no interior de
            São Paulo. Você escolhe a medida e o acabamento. A gente cuida da
            fabricação.
          </p>
          <dl className="spec-list">
            <div>
              <dt>Estrutura</dt>
              <dd>Perfis de alumínio · Linha 25</dd>
            </div>
            <div>
              <dt>Vidro</dt>
              <dd>Mini boreal</dd>
            </div>
            <div>
              <dt>Acabamento</dt>
              <dd>Pintura eletrostática preta ou branca</dd>
            </div>
            <div>
              <dt>Compra</dt>
              <dd>Nota fiscal e embalagem reforçada</dd>
            </div>
          </dl>
          <a href="#lojas" className="text-link">
            Conheça nossos canais oficiais <Arrow diagonal />
          </a>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  [
    "Qual a diferença entre basculante e maxim-ar?",
    "No maxim-ar, a folha se projeta para fora com o auxílio dos braços laterais. É esse o sistema dos modelos apresentados aqui, também conhecidos comercialmente como basculantes maxim-ar. Confira o modelo e o espaço de abertura com o instalador.",
  ],
  [
    "Como leio as medidas das janelas?",
    "O nome comercial segue altura × largura. Uma janela 40 × 60 cm tem 40 cm de altura e 60 cm de largura. No pedido, os campos estão separados para você conferir cada medida.",
  ],
  [
    "Vocês fazem janelas sob medida?",
    "Sim. Monte o pedido com largura, altura, modelo e acabamento e envie pelo chat de uma loja oficial. A viabilidade, os limites de fabricação, o valor e o prazo são confirmados após avaliação técnica.",
  ],
  [
    "O vidro mini boreal é transparente?",
    "O mini boreal é um vidro texturizado que permite a entrada de luz e reduz a visão direta através dele. O efeito de privacidade depende da iluminação e da distância em relação ao vidro.",
  ],
  [
    "Como consulto frete, prazo e disponibilidade?",
    "Acesse uma das lojas oficiais e consulte o anúncio ou fale pelo chat. O frete depende do destino, e a disponibilidade e o prazo devem ser confirmados antes de fechar a compra.",
  ],
  [
    "A janela já vem com instalação?",
    "A instalação deve ser combinada com um profissional da sua obra. Antes de comprar, confirme com ele as dimensões do vão, as folgas necessárias, o sentido de montagem e o espaço de abertura.",
  ],
];

export function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div id="inicio" />
      <Header />
      <main id="conteudo">
        <Hero />
        <div className="material-strip">
          <div className="wrap">
            <span>Alumínio linha 25</span>
            <span>Vidro mini boreal</span>
            <span>Preto ou branco</span>
            <span>Padrão ou sob medida</span>
          </div>
        </div>
        <Catalog />
        <Stores />
        <RequestBuilder />
        <FinishComparison />
        <Factory />
        <BuyingGuide />
        <section
          id="duvidas"
          className="faq-section section-pad"
          aria-labelledby="faq-title"
        >
          <div className="wrap faq-layout">
            <div>
              <h2 id="faq-title">
                Antes de abrir
                <br />
                uma nova janela.
              </h2>
              <p>Respostas para escolher com mais segurança.</p>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <span className="faq-plus" aria-hidden="true">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M3 10h14M10 3v14" />
                      </svg>
                    </span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="closing">
          <div className="wrap">
            <h2>
              Vamos abrir espaço
              <br />
              para a sua obra?
            </h2>
            <a href="#lojas" className="button button-dark">
              Escolher uma loja <Arrow diagonal />
            </a>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="wrap footer-top">
          <a href="#inicio" aria-label="Maxx Alumínio — voltar ao início">
            <Image
              src="/img/logo-maxx.png"
              alt="Maxx Alumínio"
              width={60}
              height={81}
            />
          </a>
          <p>
            Janelas de alumínio.
            <br />
            Direto de quem fabrica.
          </p>
          <div>
            <span>Feito em</span>
            <p>{site.cidade}</p>
          </div>
          <a
            className="text-link"
            href={site.tiktokPerfil}
            target="_blank"
            rel="noopener noreferrer"
          >
            Acompanhe no TikTok <Arrow diagonal />
          </a>
        </div>
        <div className="wrap footer-bottom">
          <p>© {new Date().getFullYear()} Maxx Alumínio.</p>
          <p>
            As fotos mostram produtos reais. Confirme as especificações no
            anúncio.
          </p>
          <a href="#inicio">
            Voltar ao topo <Arrow className="arrow-top" />
          </a>
        </div>
      </footer>
    </>
  );
}
