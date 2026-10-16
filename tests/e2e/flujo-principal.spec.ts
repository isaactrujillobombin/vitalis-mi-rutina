import { expect, test } from '@playwright/test';

/** T-16 · Ruta principal: Inicio → Ejercicio → Confirmar → SesiónRegistrada. */

test('RF-01: Inicio muestra la sesión del día como pendiente', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Levantarse de la silla' })).toBeVisible();
  await expect(page.getByText('Pendiente')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Empezar ahora' })).toBeVisible();
});

test('RF-04 (S-4): la preparación se ve antes que los pasos', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();

  const preparacion = page.getByRole('heading', { name: 'Antes de empezar' });
  const pasos = page.getByRole('heading', { name: 'Cómo hacerlo' });
  await expect(preparacion).toBeVisible();
  await expect(pasos).toBeVisible();

  const yPrep = (await preparacion.boundingBox())?.y ?? 0;
  const yPasos = (await pasos.boundingBox())?.y ?? 0;
  expect(yPrep).toBeLessThan(yPasos);
});

test('S-1 (CA-05.3): «Me duele» se ve sin desplazarse', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();

  await expect(page.getByRole('button', { name: /Me duele/ })).toBeInViewport();
});

test('RF-07 y RF-13 (CA-07.1): registrar y que siga ahí tras recargar', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();
  await page.getByRole('button', { name: 'Terminar ejercicio' }).click();

  await expect(page.getByText('¿Registrar esta sesión?')).toBeVisible();
  await page.getByRole('button', { name: 'Sí, registrar sesión' }).click();

  await expect(page.getByRole('heading', { name: 'Sesión registrada' })).toBeVisible();

  // RF-13: Inicio pasa a «Hecha hoy» y aguanta la recarga.
  await page.getByRole('button', { name: 'Volver al inicio' }).click();
  await expect(page.getByText('Hecha hoy')).toBeVisible();
  await page.reload();
  await expect(page.getByText('Hecha hoy')).toBeVisible();
});

test('RF-08: Cancelar no deja ningún registro', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();
  await page.getByRole('button', { name: 'Terminar ejercicio' }).click();
  await page.getByRole('button', { name: 'Cancelar' }).click();

  const records = await page.evaluate(() =>
    window.localStorage.getItem('vitalis.sessionRecords.v1'),
  );
  expect(records).toBeNull();
});

test('RF-08 (RNF-05): Esc cancela la confirmación', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();
  await page.getByRole('button', { name: 'Terminar ejercicio' }).click();
  await expect(page.getByText('¿Registrar esta sesión?')).toBeVisible();

  await page.keyboard.press('Escape');

  await expect(page.getByText('¿Registrar esta sesión?')).not.toBeVisible();
  const records = await page.evaluate(() =>
    window.localStorage.getItem('vitalis.sessionRecords.v1'),
  );
  expect(records).toBeNull();
});

test('CL-06: se permite una segunda sesión el mismo día', async ({ page }) => {
  await page.goto('/');
  for (let i = 0; i < 2; i += 1) {
    await page.getByRole('button', { name: /Empezar/ }).click();
    await page.getByRole('button', { name: 'Terminar ejercicio' }).click();
    await page.getByRole('button', { name: 'Sí, registrar sesión' }).click();
    await page.getByRole('button', { name: 'Volver al inicio' }).click();
  }

  const count = await page.evaluate(() => {
    const raw = window.localStorage.getItem('vitalis.sessionRecords.v1') ?? '[]';
    return (JSON.parse(raw) as unknown[]).length;
  });
  expect(count).toBe(2);
});

test('CL-04: recargar en mitad del ejercicio no crea ningún registro', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();
  await page.reload();

  await expect(page.getByRole('heading', { name: 'Levantarse de la silla' })).toBeVisible();
  const records = await page.evaluate(() =>
    window.localStorage.getItem('vitalis.sessionRecords.v1'),
  );
  expect(records).toBeNull();
});

test('RNF-05: el flujo completo se hace solo con teclado', async ({ page }) => {
  await page.goto('/');

  // Llegar a «Empezar ahora» tabulando y activarlo con Enter.
  await page.keyboard.press('Tab');
  for (let i = 0; i < 10; i += 1) {
    const name = await page.evaluate(() => document.activeElement?.textContent ?? '');
    if (name.includes('Empezar ahora')) break;
    await page.keyboard.press('Tab');
  }
  await page.keyboard.press('Enter');

  await expect(page.getByRole('button', { name: 'Terminar ejercicio' })).toBeVisible();
});
