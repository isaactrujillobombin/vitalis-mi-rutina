import { expect, test } from '@playwright/test';

/**
 * T-19 · RNF-08 y P-1 a P-4.
 * Este test es el que impide que alguien meta una fuente de Google o una analítica
 * sin darse cuenta: si aparece una petición a otro dominio, falla.
 */

test('RNF-08 (P-3): no se pide nada a dominios de terceros', async ({ page, baseURL }) => {
  const propio = new URL(baseURL ?? 'http://localhost:4173').host;
  const externas: string[] = [];

  page.on('request', (request) => {
    const url = new URL(request.url());
    if (url.protocol === 'data:' || url.protocol === 'blob:') return;
    if (url.host !== propio) externas.push(request.url());
  });

  // Recorremos el flujo entero, incluidas las pantallas de resultado.
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();
  await page.getByRole('button', { name: 'Terminar ejercicio' }).click();
  await page.getByRole('button', { name: 'Sí, registrar sesión' }).click();
  await page.waitForTimeout(500);

  expect(externas).toEqual([]);
});

test('P-1: solo se guardan ejercicio, estado y fecha; nada personal', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();
  await page.getByRole('button', { name: 'Terminar ejercicio' }).click();
  await page.getByRole('button', { name: 'Sí, registrar sesión' }).click();

  const guardado = await page.evaluate(() => {
    const raw = window.localStorage.getItem('vitalis.sessionRecords.v1') ?? '[]';
    return JSON.parse(raw) as Record<string, unknown>[];
  });

  expect(guardado).toHaveLength(1);
  expect(Object.keys(guardado[0] ?? {}).sort()).toEqual([
    'completedAt',
    'exerciseId',
    'id',
    'schemaVersion',
    'status',
  ]);
});

test('P-2: no hay cookies propias ni de terceros', async ({ page, context }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar ahora' }).click();

  expect(await context.cookies()).toEqual([]);
});

test('RF-18 (CL-03): con datos dañados, la app arranca y muestra «Pendiente»', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() =>
    window.localStorage.setItem('vitalis.sessionRecords.v1', 'esto no es JSON'),
  );
  await page.reload();

  await expect(page.getByText('Pendiente')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Empezar ahora' })).toBeEnabled();
});
