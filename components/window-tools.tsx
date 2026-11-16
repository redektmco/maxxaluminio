"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { useMedida } from "./medida";
import { acharPadrao } from "@/lib/catalogo";
import { site } from "@/lib/site";

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export function WindowSizer() {
  const { largura, altura, cor, modelo, setLargura, setAltura } = useMedida();
  const area = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
  } | null>(null);
  const width = Number.isFinite(largura) ? clamp(largura, 30, 150) : 60;
  const height = Number.isFinite(altura) ? clamp(altura, 30, 120) : 60;
  const match = acharPadrao(largura, altura, modelo);
  function move(e: PointerEvent<HTMLButtonElement>) {
    if (!drag.current) return;
    setLargura(
      clamp(
        Math.round(
          drag.current.width +
            (e.clientX - drag.current.x) / drag.current.scale,
        ),
        30,
        150,
      ),
    );
    setAltura(
      clamp(
        Math.round(
          drag.current.height +
            (e.clientY - drag.current.y) / drag.current.scale,
        ),
        30,
        120,
      ),
    );
  }
  return (
    <div className="sizer">
      <div className="sizer-stage" ref={area}>
        <div
          className="sizer-window"
          data-color={cor}
          style={{
            width: `${(width / 150) * 100}%`,
            height: `${(height / 120) * 100}%`,
          }}
        >
          <svg
            viewBox="0 0 300 300"
            preserveAspectRatio="none"
            role="img"
            aria-label={`Prévia ilustrativa da janela ${cor}, largura ${largura || "não informada"} cm e altura ${altura || "não informada"} cm`}
          >
            <defs>
              <pattern
                id="glass-pattern"
                patternUnits="userSpaceOnUse"
                width="7"
                height="7"
              >
                <rect width="7" height="7" fill="#d9deda" />
                <path
                  d="m0 2 3 2 4-2M1 7l3-3 3 2"
                  stroke="#b7c2bd"
                  strokeWidth=".7"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect
              x="9"
              y="9"
              width="282"
              height="282"
              fill="url(#glass-pattern)"
              stroke={cor === "preto" ? "#242622" : "#fefefe"}
              strokeWidth="17"
              vectorEffect="non-scaling-stroke"
            />
            <rect
              x="4"
              y="4"
              width="292"
              height="292"
              fill="none"
              stroke="#73796e"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M145 283h10v12h-10z"
              fill={cor === "preto" ? "#111" : "#73796e"}
            />
          </svg>
          <span className="sizer-width" aria-hidden="true">
            {width} cm
          </span>
          <span className="sizer-height" aria-hidden="true">
            {height} cm
          </span>
          <button
            type="button"
            className="resize-handle"
            aria-label="Arrastar para ajustar largura e altura; use as setas do teclado para ajustes de um centímetro"
            onPointerDown={(e) => {
              if (e.button !== 0) return;
              e.currentTarget.setPointerCapture(e.pointerId);
              drag.current = {
                x: e.clientX,
                y: e.clientY,
                width,
                height,
                scale: area.current!.clientWidth / 150,
              };
            }}
            onPointerMove={move}
            onPointerUp={() => {
              drag.current = null;
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
            onLostPointerCapture={() => {
              drag.current = null;
            }}
            onKeyDown={(e) => {
              if (
                ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
                  e.key,
                )
              ) {
                e.preventDefault();
                if (e.key === "ArrowLeft" || e.key === "ArrowRight")
                  setLargura(
                    clamp(width + (e.key === "ArrowRight" ? 1 : -1), 30, 150),
                  );
                else
                  setAltura(
                    clamp(height + (e.key === "ArrowDown" ? 1 : -1), 30, 120),
                  );
              }
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              aria-hidden="true"
            >
              <path d="m7 17 10-10M7 7h10v10" />
            </svg>
          </button>
        </div>
      </div>
      <p className="sizer-hint">
        Arraste o canto ou use os controles abaixo. Prévia ilustrativa de
        proporção, sem escala de instalação.
      </p>
      <div className="sizer-sliders">
        <label>
          Largura <strong>{width} cm</strong>
          <input
            type="range"
            aria-label="Largura no simulador"
            min={site.limites.larguraMin}
            max={site.limites.larguraMax}
            value={width}
            onChange={(e) => setLargura(Number(e.target.value))}
          />
        </label>
        <label>
          Altura <strong>{height} cm</strong>
          <input
            type="range"
            aria-label="Altura no simulador"
            min={site.limites.alturaMin}
            max={site.limites.alturaMax}
            value={height}
            onChange={(e) => setAltura(Number(e.target.value))}
          />
        </label>
      </div>
      <div
        className="size-presets"
        role="group"
        aria-label="Medidas rápidas, altura por largura"
      >
        {[
          [40, 40],
          [50, 50],
          [60, 60],
          [40, 60],
          [60, 80],
          [60, 120],
        ].map(([a, l]) => (
          <button
            key={`${a}-${l}`}
            type="button"
            aria-pressed={altura === a && largura === l}
            onClick={() => {
              setAltura(a);
              setLargura(l);
            }}
          >
            {a} × {l}
          </button>
        ))}
      </div>
      <p className="sizer-result" role="status">
        {match
          ? `Modelo ${match.nome} encontrado no catálogo. Confira a disponibilidade na loja.`
          : "Outra medida? Prepare o pedido ao lado para avaliação técnica."}
      </p>
    </div>
  );
}

export function FinishComparison() {
  const [position, setPosition] = useState(50);
  return (
    <section
      className="finish-section section-pad"
      id="acabamentos"
      aria-labelledby="finish-title"
    >
      <div className="wrap finish-layout">
        <div
          className="comparison"
          style={{ "--split": `${position}%` } as CSSProperties}
        >
          <Image
            src="/img/compare-branco.webp"
            width={800}
            height={640}
            alt="Janela com pintura eletrostática branca"
            sizes="(max-width:760px) 90vw, 45vw"
          />
          <div className="comparison-black">
            <Image
              src="/img/compare-preto.webp"
              width={800}
              height={640}
              alt="Mesma janela com pintura eletrostática preta"
              sizes="(max-width:760px) 90vw, 45vw"
            />
          </div>
          <span className="comparison-label label-black" aria-hidden="true">
            Preto
          </span>
          <span className="comparison-label label-white" aria-hidden="true">
            Branco
          </span>
          <div className="comparison-line" aria-hidden="true">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              >
                <path d="m8 8-4 4 4 4m8-8 4 4-4 4" />
              </svg>
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            aria-label="Comparar acabamento preto e branco"
            aria-valuetext={`${position}% preto e ${100 - position}% branco`}
            onChange={(e) => setPosition(Number(e.target.value))}
          />
        </div>
        <div className="finish-copy">
          <h2 id="finish-title">
            Branco ou preto?
            <br />O acabamento é seu.
          </h2>
          <p>
            O branco acompanha ambientes claros. O preto destaca o desenho da
            janela. Os dois recebem pintura eletrostática sobre o alumínio.
          </p>
          <p className="comparison-instruction">
            Arraste a divisória para comparar. Pelo teclado, use as setas.
          </p>
          <dl className="spec-list">
            <div>
              <dt>Seu espaço</dt>
              <dd>Banheiro, cozinha, sala ou lavanderia</dd>
            </div>
            <div>
              <dt>Seu modelo</dt>
              <dd>Com grade, sem grade ou duas seções</dd>
            </div>
            <div>
              <dt>Sua escolha</dt>
              <dd>O mesmo cuidado nos dois acabamentos</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

export function BuyingGuide() {
  return (
    <section
      className="buying-section section-pad"
      id="como-comprar"
      aria-labelledby="buying-title"
    >
      <div className="wrap">
        <div className="section-heading">
          <h2 id="buying-title">
            Da escolha à compra.
            <br />
            Sem complicar.
          </h2>
          <p>Medida padrão ou personalizada: cada pedido tem seu caminho.</p>
        </div>
        <div className="buying-columns">
          <article>
            <h3>Medida padrão</h3>
            <ol>
              <li>Escolha a medida, o modelo e o acabamento no catálogo.</li>
              <li>
                Abra uma loja oficial e confira o anúncio, o frete e a
                disponibilidade.
              </li>
              <li>Finalize a compra pela plataforma escolhida.</li>
            </ol>
            <a className="button button-dark" href="#lojas">
              Abrir lojas oficiais
            </a>
          </article>
          <article>
            <h3>Sob medida</h3>
            <ol>
              <li>Meça o vão com o profissional da sua obra.</li>
              <li>
                Prepare o pedido com as dimensões, o modelo e o acabamento.
              </li>
              <li>
                Envie no chat da loja e aguarde a avaliação técnica e o
                orçamento.
              </li>
            </ol>
            <a className="button button-dark" href="#pedido">
              Informar minhas medidas
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
