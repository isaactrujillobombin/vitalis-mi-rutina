import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

/** T-18 · RNF-03, RNF-06, RNF-12: 0 violaciones serious o critical. */

async function auditar(page: Page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();

  const graves = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  // Si falla, el mensaje dice qué regla y en qué elemento, para poder arreglarlo.
  expect(
    graves.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target).join(', ')}`),
  ).toEqual([]);
}

test('RNF-06: Inicio sin violaciones graves', async ({ page }) => {
  await page.goto('/');
  await auditar(page);
});

test('RNF-06: Ejercicio sin violaciones graves', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();
  await auditar(page);
});

test('RNF-06: ConfirmarRegistro sin violaciones graves', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();
  await page.getByRole('button', { name: 'Terminar ejercicio' }).click();
  await auditar(page);
});

test('RNF-06: AvisoDolor sin violaciones graves', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();
  await page.getByRole('button', { name: /Me duele/ }).click();
  await auditar(page);
});

test('RNF-06: SesiónRegistrada sin violaciones graves', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();
  await page.getByRole('button', { name: 'Terminar ejercicio' }).click();
  await page.getByRole('button', { name: 'Sí, registrar sesión' }).click();
  await auditar(page);
});

test('RNF-06: SesiónPausada sin violaciones graves', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();
  await page.getByRole('button', { name: /Me duele/ }).click();
  await page.getByRole('button', { name: 'Pausar sesión' }).click();
  await auditar(page);
});

test('RNF-01 (A-1): todos los botones del flujo miden 48 px o más', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();
  // Medir cuando la pantalla de Ejercicio ya está pintada, no durante la navegación.
  await expect(page.getByRole('button', { name: 'Terminar ejercicio' })).toBeVisible();

  for (const boton of await page.getByRole('button').all()) {
    if (!(await boton.isVisible())) continue;
    const caja = await boton.boundingBox();
    const nombre = (await boton.textContent()) ?? '?';
    expect(caja?.height ?? 0, `alto de «${nombre.trim()}»`).toBeGreaterThanOrEqual(48);
    expect(caja?.width ?? 0, `ancho de «${nombre.trim()}»`).toBeGreaterThanOrEqual(48);
  }
});

test('RNF-07: sin desplazamiento horizontal entre 320 y 768 px', async ({ page }) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Empezar ahora' }).click();

    const desborda = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(desborda, `hay scroll horizontal a ${width} px`).toBe(false);
  }
});

test('RNF-02: el texto de cuerpo mide 18 px o más', async ({ page }) => {
  await page.goto('/');
  const size = await page.evaluate(() => parseFloat(getComputedStyle(document.body).fontSize));
  expect(size).toBeGreaterThanOrEqual(18);
});
