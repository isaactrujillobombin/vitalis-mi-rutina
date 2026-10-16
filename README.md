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

**Prototipo recorrible** (T-01 y T-01c hechas). El flujo móvil completo funciona de punta a punta:

Inicio → Ejercicio (preparación + pasos) → «Terminar ejercicio» → confirmar → **Sesión registrada**
y la salida segura: «Me duele» → «Pausar sesión» → **Sesión pausada** (sin registro).

⚠️ **Es un prototipo, no el producto final.** Todavía **no hay tests ni ESLint** (tarea T-01b), así que la regla C-2 de la constitución está sin cumplir. Las tareas T-05 a T-15 rehacen cada pantalla con sus tests antes de que nada entre en `main`.

## Puesta en marcha

```bash
npm install      # instalar dependencias
npm run dev      # servidor local en http://localhost:5173
npm run typecheck
npm run build
```

**Para verlo en el móvil:** `npm run dev` imprime una dirección `Network:` (por ejemplo `http://192.168.1.40:5173`). Ábrela en el móvil estando en la misma wifi. Es la forma correcta de probarlo: la app está diseñada solo para móvil.

## Convenciones

- Una rama por tarea: `T-xx-descripcion-corta`; *pull request* revisado por otro integrante.
- Commits en español con el ID de tarea: `T-11: guardar registro al confirmar`.
- Código en inglés, textos de la interfaz en español y solo en `src/content/exercises.ts`.

## Privacidad

No se guardan nombres, contactos, teléfonos ni datos de salud. «Avisar a la familia» usa la hoja de compartir del sistema: la app no lee ni envía contactos. Ningún dato personal real entra en este repositorio (regla P-7).
