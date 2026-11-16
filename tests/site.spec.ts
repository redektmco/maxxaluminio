import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("não apresenta violações automáticas WCAG A/AA", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("o medidor sincroniza controles, atalhos e arraste com o pedido", async ({
  page,
  isMobile,
}) => {
  await page
    .locator(".size-presets")
    .getByRole("button", { name: "40 × 60", exact: true })
    .click();
  await expect(page.getByLabel("Altura", { exact: true })).toHaveValue("40");
  await expect(page.getByLabel("Largura", { exact: true })).toHaveValue("60");
  const handle = page.getByRole("button", { name: /Arrastar para ajustar/ });
  await handle.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByLabel("Largura", { exact: true })).toHaveValue("61");
  if (!isMobile) {
    await handle.scrollIntoViewIfNeeded();
    const box = await handle.boundingBox();
    await page.mouse.move(box!.x + 22, box!.y + 22);
    await page.mouse.down();
    await page.mouse.move(box!.x + 55, box!.y + 45, { steps: 6 });
    await page.mouse.up();
    expect(
      Number(await page.getByLabel("Largura", { exact: true }).inputValue()),
    ).toBeGreaterThan(61);
    expect(
      Number(await page.getByLabel("Altura", { exact: true }).inputValue()),
    ).toBeGreaterThan(40);
  }
  await page
    .getByLabel("Observações (opcional)", { exact: true })
    .fill("Entrega em Bragança Paulista");
  await expect(page.locator("#pedido-resumo")).toContainText(
    "Observações: Entrega em Bragança Paulista",
  );
});

test("a comparação de acabamento responde ao teclado", async ({ page }) => {
  const comparison = page.getByRole("slider", {
    name: "Comparar acabamento preto e branco",
  });
  await comparison.focus();
  await page.keyboard.press("ArrowRight");
  await expect(comparison).toHaveValue("51");
  await expect(comparison).toHaveAttribute(
    "aria-valuetext",
    "51% preto e 49% branco",
  );
});

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("carrega sem erros, com imagens reais e sem overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await expect(page).toHaveTitle(/Maxx Alumínio/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A janela certa.",
  );
  for (const img of await page.locator("img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        img.evaluate(
          (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("filtra modelos e expande o catálogo completo", async ({ page }) => {
  const catalog = page.locator("#catalogo");
  await expect(catalog.locator("article")).toHaveCount(6);
  await catalog.getByRole("button", { name: "Com grade", exact: true }).click();
  await expect(catalog.locator("article")).toHaveCount(2);
  await expect(catalog.locator("article[data-modelo=grade]")).toHaveCount(2);
  await catalog
    .getByRole("button", { name: "Duas seções", exact: true })
    .click();
  await expect(catalog.locator("article")).toHaveCount(1);
  await catalog.getByRole("button", { name: "Todos os modelos" }).click();
  await catalog
    .getByRole("button", { name: "Ver todos os 11 modelos" })
    .click();
  await expect(catalog.locator("article")).toHaveCount(11);
});

test("sincroniza acabamento e leva a seleção correta ao pedido", async ({
  page,
}) => {
  const catalog = page.locator("#catalogo");
  await catalog.getByRole("button", { name: "Branco", exact: true }).click();
  await expect(page.locator(".hero-image img")).toHaveAttribute(
    "src",
    "/img/compare-branco.webp",
  );
  await catalog.getByRole("button", { name: "Com grade", exact: true }).click();
  await expect(catalog.locator("article").first()).toContainText(
    "Foto na cor preto",
  );
  await catalog
    .getByRole("link", {
      name: "Escolher esta medida — janela 60x60 com grade",
      exact: true,
    })
    .click();
  await expect(page.getByLabel("Largura", { exact: true })).toHaveValue("60");
  await expect(page.getByLabel("Altura", { exact: true })).toHaveValue("60");
  await expect(page.getByLabel("Modelo", { exact: true })).toHaveValue("grade");
  await expect(page.locator("#pedido-resumo")).toContainText(
    "Acabamento: branco",
  );
});

test("não confunde medida padrão de outro modelo e valida campos", async ({
  page,
}) => {
  await page.getByLabel("Largura", { exact: true }).fill("40");
  await page.getByLabel("Altura", { exact: true }).fill("40");
  await page.getByLabel("Modelo", { exact: true }).selectOption("grade");
  await expect(page.locator(".match-status")).toContainText(
    "Vamos avaliar sua medida.",
  );
  await page.getByLabel("Largura", { exact: true }).fill("0");
  await page.getByRole("button", { name: "Copiar meu pedido" }).click();
  await expect(page.getByLabel("Largura", { exact: true })).toBeFocused();
  await expect(page.locator("#largura-error")).toContainText(
    "entre 30 e 150 cm",
  );
  await page.getByLabel("Largura", { exact: true }).fill("70.5");
  await page.getByLabel("Quantidade", { exact: true }).fill("1.5");
  await page.getByRole("button", { name: "Copiar meu pedido" }).click();
  await expect(page.locator("#quantidade-error")).toContainText(
    "sem casas decimais",
  );
  await page.getByLabel("Quantidade", { exact: true }).fill("2");
  await expect(page.locator("#pedido-resumo")).toContainText(
    "Largura: 70.5 cm",
  );
});

test("copia o pedido sem simular envio e recupera falha de permissão", async ({
  page,
  context,
  browserName,
}) => {
  test.skip(browserName !== "chromium");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copiar meu pedido" }).click();
  await expect(
    page.getByRole("button", { name: "Pedido copiado" }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Altura: 60 cm\nLargura: 60 cm",
  );
  await expect(page.locator(".copy-feedback")).toContainText(
    "ainda não foi enviado",
  );
  await page.getByLabel("Largura", { exact: true }).fill("80");
  await expect(
    page.getByRole("button", { name: "Copiar meu pedido" }),
  ).toBeVisible();
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new Error("permissão negada");
    };
  });
  await page.getByRole("button", { name: "Copiar meu pedido" }).click();
  await expect(page.locator("#pedido-resumo")).toBeFocused();
  await expect(page.locator(".copy-feedback")).toContainText(
    "Selecione e copie",
  );
});

test("as janelas abrem cada canal oficial em nova aba", async ({
  page,
  context,
}) => {
  const stores = [
    ["Shopee", "https://br.shp.ee/Ajx2X93"],
    ["Mercado Livre", "https://www.mercadolivre.com.br/pagina/dywjrqls"],
    ["TikTok", "https://www.tiktok.com/@maxxaluminio2026"],
  ];
  // Isola o teste de redes externas sem efetuar compras nem enviar mensagens.
  for (const [name, url] of stores) {
    await context.route(url, (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: "<html><body>Canal oficial</body></html>",
      }),
    );
    const windowLink = page.locator(`.store-window[href="${url}"]`);
    const popupPromise = page.waitForEvent("popup");
    await windowLink.click();
    const popup = await popupPromise;
    await popup.waitForURL(url);
    await expect(windowLink).toHaveClass(/is-open/);
    await windowLink
      .locator(".window-sash")
      .evaluate((el) =>
        Promise.all(el.getAnimations().map((animation) => animation.finished)),
      );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator(".store-note")).toContainText(
      `${name} aberto em outra aba`,
    );
    await popup.close();
  }
});

test("navegação, FAQ e redução de movimento funcionam", async ({
  page,
  isMobile,
}) => {
  if (isMobile) {
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Dúvidas", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Abrir menu" }),
    ).toHaveAttribute("aria-expanded", "false");
  } else {
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Dúvidas", exact: true })
      .click();
  }
  await page
    .getByText("Como leio as medidas das janelas?", { exact: true })
    .click();
  await expect(page.locator("details[open]")).toContainText("altura × largura");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator(".window-sash")
      .first()
      .evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe("0s");
  await page.goto("/pagina-inexistente");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Essa janela não está por aqui.",
  );
});
