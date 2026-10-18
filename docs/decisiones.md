# decisiones.md · Vitalis — Decisiones posteriores al SDD inicial

> Equipo NexoTeam · G02-01, G02-02, G02-03
> Aquí se anotan las decisiones tomadas después de la primera versión de los documentos SDD (15/10/2026), para no perder el motivo ni la fecha. Cada decisión indica qué documentos quedan pendientes de actualizar.

---

## DEC-01 · El MVP es solo app móvil

| Apartado | Detalle |
| --- | --- |
| **Fecha** | 16/10/2026 |
| **Propuesta por** | G02-01 |
| **Estado** | Propuesta aplicada al repositorio · **pendiente de confirmación de G02-02 y G02-03** (M-2) |

**Decisión.** El MVP se construye y se prueba **únicamente en ancho móvil**, con 390 × 844 px como tamaño de referencia. Las pantallas `*/Desktop` del Figma pasan a ser referencia visual y no se implementan.

**Motivo.**

- El recorrido móvil del Figma ya cubre el flujo completo: Inicio → Ejercicio (con la preparación integrada) → ConfirmarRegistro → SesiónRegistrada / SesiónPausada.
- La usuaria objetivo usa el móvil; el piloto con personas mayores se hará en un móvil.
- Reduce el trabajo de T-02 a T-18 casi a la mitad y quita el riesgo de quedarnos sin tiempo (riesgo «falta de tiempo» de plan.md §9).

**Qué cambia respecto al SDD inicial.**

| Elemento | Antes | Ahora |
| --- | --- | --- |
| Pantalla Preparación/Desktop (RF-02, RF-03) | Pantalla propia | No se implementa. La preparación va integrada en Ejercicio (RF-04), que ya lo exige en móvil. |
| «Pausar sesión» del resumen lateral (CA-05.2) | Botón en escritorio | No aplica. La pausa se alcanza por «Me duele» → «Pausar sesión» (RF-09, RF-10). |
| «Revisar preparación» en SesiónPausada (RF-10) | Texto de escritorio | Se usa siempre «Volver a la guía». |
| `AppShell` (T-07) | Barra superior (escritorio) + inferior (móvil) | Solo barra inferior. |
| Tests e2e y responsive (T-16, T-18) | 320 / 390 / 768 / 1440 px | 320 / 390 / 768 px. Sin ancho de escritorio. |

**Qué NO cambia.** Siguen intactos: la constitución salvo el añadido M-4, la seguridad (S-1 a S-6), la accesibilidad (A-1 a A-9), la privacidad (P-1 a P-7), el modelo de datos y la máquina de estados de plan.md §3.1.

**Documentos pendientes de actualizar** (tarea T-00b, ver `tasks.md`):

- [ ] `spec.md` — marcar RF-02 y RF-03 como fuera de alcance, reescribir CA-05.2 y RF-10, ajustar §8 Trazabilidad.
- [ ] `plan.md` — §5 (tabla de pantallas) y §7 (anchos de prueba).
- [ ] `tasks.md` — eliminar o reducir T-09, ajustar horas de T-07, T-12, T-16 y T-18 y rehacer el reparto.
- [ ] Figma — anotar en `07_ReadyForDev` que el flujo Desktop no se implementa.

> Hasta que esos documentos se actualicen, **esta página manda sobre ellos** en todo lo relativo a la plataforma.

---

## DEC-02 · Rediseño visual de estilo iOS sobre los tokens de Figma

| Apartado | Detalle |
| --- | --- |
| **Fecha** | 18-19/10/2026 |
| **Tarea** | T-03 (componentes `Button`, `Badge` y `Card`) |
| **Estado** | Aplicada en la rama `T-03-componentes-figma` · **pendiente de revisión del equipo** (C-4) |

**Decisión.** Se rehace el aspecto de la app a partir de la captura de `06_Prototype` (paleta azul marino + acento naranja) con un acabado de estilo iOS: fondo gris agrupado, tarjetas sin borde con sombra suave, listas con separadores finos, barra inferior translúcida y títulos grandes.

**Cambios visibles (ningún texto de spec.md ni de Figma cambia):**

| Elemento | Antes | Ahora |
| --- | --- | --- |
| Iconos | Emojis (se ven distintos en cada móvil) | Iconos de trazo en SVG propios (`Icon.tsx`), sin librerías ni CDN (P-3, C-7) |
| Logo | Letra «V» | Logo del equipo redibujado en SVG (`Logo.tsx`) y `favicon.svg` |
| Tarjeta de Inicio | Solo texto | Ilustración decorativa animada (sentada ↔ de pie, 8 s por ciclo). Se para con «Reducir movimiento» (A-8) |
| «Me duele» / «Terminar ejercicio» | Apilados | Lado a lado en una barra fija siempre visible (S-1, CA-05.3) |
| Botones | 48 px | 56-60 px de alto |

**Motivo.** La primera versión se veía pobre frente al Figma. Los cambios mantienen todas las reglas de accesibilidad: el contraste se vuelve a verificar (18 pares) y Lighthouse da 100 en Accesibilidad.

**Pendiente.** La ilustración y la animación **no están en spec.md ni en Figma**: el equipo debe aceptarlas o pedir que se quiten. Los colores siguen sacados de capturas (T-02b).

---

## DEC-03 · Solo códigos de grupo en el repositorio

| Apartado | Detalle |
| --- | --- |
| **Fecha** | 19/10/2026 |
| **Motivo** | El enunciado de la entrega final prohíbe nombres, apellidos, correos o fotografías del alumnado en archivos, repositorio y diapositivas. |

**Decisión.** Los nombres del equipo se sustituyen por los códigos **G02-01, G02-02 y G02-03** en todos los documentos. El grupo es el **2DAM-G02**. Los números 01, 02 y 03 no son los números de lista reales: el equipo los asignó así porque no los conocía.

**Pendiente (lo tiene que hacer el equipo):**

- El repositorio actual tiene un nombre personal en la URL y los nombres siguen en el **historial de commits** antiguos. Hay que usar el repositorio que indique el profesorado (con el identificador del grupo) y subir allí un historial limpio.
- Revisar el Figma: su nombre y sus páginas también llevan nombres del equipo.
