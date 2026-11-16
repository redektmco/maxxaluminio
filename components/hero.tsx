import Image from "next/image";
import { site } from "@/lib/site";

function HeroArrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero-cinema" aria-labelledby="hero-title">
      <div className="hero-cinema-stage">
        <figure className="hero-scene">
          <Image
            src="/img/hero-architecture.webp"
            alt="Ambiente ilustrativo: janela maxim-ar preta com vidro texturizado, luz natural e uma bancada de madeira em um banheiro contemporâneo"
            fill
            priority
            sizes="100vw"
          />
          <figcaption>Ambiente ilustrativo</figcaption>
        </figure>
        <div className="hero-photo-shade" aria-hidden="true" />
        <div className="hero-cinema-content wrap">
          <div className="hero-editorial">
            <h1 id="hero-title">
              Mais luz.
              <br />
              <span>Na sua medida.</span>
            </h1>
            <p>
              Janelas de alumínio para a sua obra. Medidas padrão ou sob medida,
              direto de quem fabrica.
            </p>
            <div className="hero-cinema-actions">
              <a className="button button-amber" href="#catalogo">
                Ver janelas <HeroArrow />
              </a>
              <a className="button hero-button-outline" href="#pedido">
                Pedir sob medida <HeroArrow diagonal />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-cinema-details wrap">
        <p className="hero-maker">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            aria-hidden="true"
          >
            <path d="M3 21V8l6 3V6l6 3V3h6v18H3Zm5 0v-5h4v5M17 12h1m-1 4h1" />
          </svg>
          <span>
            Fabricação própria<small>{site.cidade}</small>
          </span>
        </p>
        <p className="hero-specification">
          Linha 25<span>Vidro mini boreal</span>
        </p>
        <a className="hero-finish-link" href="#acabamentos">
          <span className="hero-finish-swatches" aria-hidden="true">
            <i />
            <i />
          </span>
          Preto ou branco
          <HeroArrow diagonal />
        </a>
      </div>
    </section>
  );
}
