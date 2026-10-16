# Vitalis — Mi Rutina

App **móvil** que ayuda a personas de 65 a 85 años a mantener fuerza y autonomía con una sesión guiada de «Levantarse de la silla» (8 repeticiones + 30 s de descanso), con salida segura si duele y aviso a la familia.

> Proyecto interdisciplinar Monlau · 2.º DAM / 2.º DAW · Curso 2026-2027
> Equipo **NexoTeam**: Isaac, Iker, Enzo · Tema del reto: la soledad de las personas mayores

## Alcance

**SOLO APP MÓVIL** (decisión DEC-01, 16/10/2026). Diseñada para 390 × 844 px y verificada entre 320 y 768 px. Las pantallas `*/Desktop` del Figma son referencia visual y no se implementan. Ver [docs/sdd/decisiones.md](docs/sdd/decisiones.md).

Todo se guarda en el propio dispositivo (`localStorage`): **sin servidor, sin cuentas, sin analíticas y sin peticiones a terceros**.

## Documentación

Antes de tocar nada, leer en este orden:

1. [AGENTS.md](AGENTS.md) — cómo se trabaja aquí (personas y asistentes de IA).
2. [docs/sdd/constitution.md](docs/sdd/constitution.md) — reglas que no se negocian.
3. [docs/sdd/spec.md](docs/sdd/spec.md) — requisitos RF-xx / RNF-xx y casos límite.
4. [docs/sdd/plan.md](docs/sdd/plan.md) — tecnologías, arquitectura y datos.
5. [docs/sdd/tasks.md](docs/sdd/tasks.md) — tareas T-xx y su estado.
6. [docs/sdd/decisiones.md](docs/sdd/decisiones.md) — decisiones posteriores al SDD inicial.
7. [docs/sdd/uso-ia.md](docs/sdd/uso-ia.md) — registro del uso de IA.

Prototipo de Figma: [Vitalis — NexoTeam (Pantallas)](https://www.figma.com/design/qs3XbPY89nY10Wf2JxxdI0/Vitalis-%E2%80%94-NexoTeam--Pantallas-) · textos exportados en [docs/figma/](docs/figma/).

## Estado

El proyecto está en **T-01**: crear el proyecto Vite `react-ts`. Todavía no hay código de aplicación.

## Puesta en marcha

Pendiente de T-01. Cuando exista el proyecto, estos serán los comandos:

```bash
npm ci           # instalar dependencias
npm run dev      # servidor local
npm run lint     # ESLint + jsx-a11y
npm run typecheck
npm run test     # Vitest + Testing Library
npm run test:e2e # Playwright + axe (perfil móvil)
npm run build
```

## Convenciones

- Una rama por tarea: `T-xx-descripcion-corta`; *pull request* revisado por otro integrante.
- Commits en español con el ID de tarea: `T-11: guardar registro al confirmar`.
- Código en inglés, textos de la interfaz en español y solo en `src/content/exercises.ts`.

## Privacidad

No se guardan nombres, contactos, teléfonos ni datos de salud. «Avisar a la familia» usa la hoja de compartir del sistema: la app no lee ni envía contactos. Ningún dato personal real entra en este repositorio (regla P-7).
