# Vitalis — Mi Rutina

App **móvil** que ayuda a personas de 65 a 85 años a mantener fuerza y autonomía con una sesión guiada de «Levantarse de la silla» (8 repeticiones + 30 s de descanso), con salida segura si duele y aviso a la familia.

> Proyecto interdisciplinar Monlau · 2.º DAM / 2.º DAW · Curso 2026-2027
> Equipo **NexoTeam**: Isaac, Iker, Enzo · Tema del reto: la soledad de las personas mayores

## Alcance

**SOLO APP MÓVIL** (decisión DEC-01, 16/10/2026). Diseñada para 390 × 844 px y verificada entre 320 y 768 px. Las pantallas `*/Desktop` del Figma son referencia visual y no se implementan. Ver [docs/decisiones.md](docs/decisiones.md).

Todo se guarda en el propio dispositivo (`localStorage`): **sin servidor, sin cuentas, sin analíticas y sin peticiones a terceros**.

## Documentación

Antes de tocar nada, leer en este orden:

1. [docs/AGENTS.md](docs/AGENTS.md) — cómo se trabaja aquí (personas y asistentes de IA).
2. [docs/constitution.md](docs/constitution.md) — reglas que no se negocian.
3. [docs/spec.md](docs/spec.md) — requisitos RF-xx / RNF-xx y casos límite.
4. [docs/plan.md](docs/plan.md) — tecnologías, arquitectura y datos.
5. [docs/tasks.md](docs/tasks.md) — tareas T-xx y su estado.
6. [docs/decisiones.md](docs/decisiones.md) — decisiones posteriores al SDD inicial.
7. [uso-ia.md](uso-ia.md) — registro del uso de IA.
8. [validacion.md](validacion.md) — qué se ha comprobado, cómo y con qué resultado.

Prototipo de Figma: [Vitalis — NexoTeam (Pantallas)](https://www.figma.com/design/qs3XbPY89nY10Wf2JxxdI0/Vitalis-%E2%80%94-NexoTeam--Pantallas-) · textos exportados en [docs/figma/](docs/figma/).

## Estado

**Prototipo recorrible** (T-01 y T-01c hechas). El flujo móvil completo funciona de punta a punta:

Inicio → Ejercicio (preparación + pasos) → «Terminar ejercicio» → confirmar → **Sesión registrada**
y la salida segura: «Me duele» → «Pausar sesión» → **Sesión pausada** (sin registro).

**Comprobado automáticamente:** 51 tests unitarios y de componentes + 28 pruebas e2e en dos perfiles de móvil (Chromium/Android y WebKit/iPhone), con auditoría axe sin violaciones *serious* ni *critical*.

### Limitaciones conocidas

- Los **tokens de color** salen de las capturas de Figma, no de las variables del archivo: el conector de Figma agotó el límite del plan Starter (tarea T-02b). El contraste sí está verificado con `npm run check:contrast`.
- **No hay servicios simulados ni servidor:** todo es local con `localStorage`. No hay nada que arrancar aparte de la app.
- **DEC-01 (solo móvil) está pendiente de confirmar** por el resto del equipo (tarea T-00b).
- Falta el **test con personas de 65+ años** (T-20) y el informe de **Lighthouse** (T-22).

## Puesta en marcha

Requisitos previos: **Node.js 20 o superior** y npm (probado con Node 24 y npm 11).

```bash
npm install          # instalar dependencias
npm run dev          # servidor local en http://localhost:5173
```

### Comandos de comprobación

```bash
npm run check        # todo: lint + tipos + contraste + unitarios + e2e
npm run lint         # ESLint + jsx-a11y
npm run typecheck    # tsc --noEmit
npm run test         # Vitest + Testing Library (51 tests)
npm run test:e2e     # Playwright + axe (28 tests × 2 perfiles de móvil)
npm run check:contrast  # contraste de los tokens de color (WCAG AA)
npm run build        # build de producción
```

La primera vez que ejecutes los e2e hace falta bajar los navegadores:

```bash
npx playwright install chromium webkit
```

### Datos ficticios

La app arranca vacía (sin ninguna sesión registrada), que es el estado inicial de la usuaria. Para cargar o borrar datos de prueba, abre la consola del navegador:

```js
// Simular una sesión hecha hoy
localStorage.setItem('vitalis.sessionRecords.v1', JSON.stringify([
  { id: 'demo-1', exerciseId: 'sit-to-stand', status: 'completed',
    completedAt: new Date().toISOString(), schemaVersion: 1 },
]));

// Volver a empezar de cero
localStorage.removeItem('vitalis.sessionRecords.v1');
```

No hay variables de entorno que configurar (ver [.env.example](.env.example)): el MVP no usa servidor, cuentas ni claves de terceros.

**Para verlo en el móvil:** `npm run dev` imprime una dirección `Network:` (por ejemplo `http://192.168.1.40:5173`). Ábrela en el móvil estando en la misma wifi. Es la forma correcta de probarlo: la app está diseñada solo para móvil.

## Convenciones

- Una rama por tarea: `T-xx-descripcion-corta`; *pull request* revisado por otro integrante.
- Commits en español con el ID de tarea: `T-11: guardar registro al confirmar`.
- Código en inglés, textos de la interfaz en español y solo en `src/content/exercises.ts`.

## Privacidad

No se guardan nombres, contactos, teléfonos ni datos de salud. «Avisar a la familia» usa la hoja de compartir del sistema: la app no lee ni envía contactos. Ningún dato personal real entra en este repositorio (regla P-7).
