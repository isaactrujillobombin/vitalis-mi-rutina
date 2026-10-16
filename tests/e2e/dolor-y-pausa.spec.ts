import { expect, test } from '@playwright/test';

/** T-17 · Ruta de dolor y pausa. Ninguna acción de aquí puede crear un registro. */

async function records(page: import('@playwright/test').Page) {
  return page.evaluate(() => window.localStorage.getItem('vitalis.sessionRecords.v1'));
}

test('RF-09 y RF-10: «Me duele» → «Pausar sesión» lleva a SesiónPausada sin registrar', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();
  await page.getByRole('button', { name: /Me duele/ }).click();

  await expect(page.getByText('Para el ejercicio')).toBeVisible();
  await page.getByRole('button', { name: 'Pausar sesión' }).click();

  await expect(page.getByRole('heading', { name: 'Sesión pausada' })).toBeVisible();
  await expect(page.getByText('No registrada como completada')).toBeVisible();
  expect(await records(page)).toBeNull();
});

test('CL-08: «Me duele» → «Volver sin registrar» deja Inicio como estaba', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();
  await page.getByRole('button', { name: /Me duele/ }).click();
  await page.getByRole('button', { name: 'Volver sin registrar' }).click();

  await expect(page.getByText('Pendiente')).toBeVisible();
  expect(await records(page)).toBeNull();
});

test('S-2: la pantalla de pausa no castiga ni habla de rachas', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();
  await page.getByRole('button', { name: /Me duele/ }).click();
  await page.getByRole('button', { name: 'Pausar sesión' }).click();

  const texto = (await page.locator('main').textContent()) ?? '';
  expect(texto).not.toMatch(/racha|has fallado|perdido|no lo has conseguido/i);
});

test('RF-10: desde la pausa se puede volver a la guía', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();
  await page.getByRole('button', { name: /Me duele/ }).click();
  await page.getByRole('button', { name: 'Pausar sesión' }).click();
  await page.getByRole('button', { name: 'Volver a la guía' }).click();

  await expect(page.getByRole('button', { name: 'Terminar ejercicio' })).toBeVisible();
});

test('RF-14: «Hoy tengo dolor o no puedo» valida el descanso y no registra nada', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Hoy tengo dolor o no puedo' }).click();

  await expect(page.getByText('Descansar también está bien')).toBeVisible();
  expect(await records(page)).toBeNull();
});

test('RF-17 (CL-05): entrar directo a las pantallas de resultado lleva a Inicio', async ({
  page,
}) => {
  await page.goto('/rutina/registrada');
  await expect(page).toHaveURL(/\/$/);

  await page.goto('/rutina/pausada');
  await expect(page).toHaveURL(/\/$/);
});
