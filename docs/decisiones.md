# decisiones.md · Vitalis — Decisiones posteriores al SDD inicial

> Equipo NexoTeam · Isaac, Iker, Enzo
> Aquí se anotan las decisiones tomadas después de la primera versión de los documentos SDD (15/10/2026), para no perder el motivo ni la fecha. Cada decisión indica qué documentos quedan pendientes de actualizar.

---

## DEC-01 · El MVP es solo app móvil

| Apartado | Detalle |
| --- | --- |
| **Fecha** | 16/10/2026 |
| **Propuesta por** | Isaac |
| **Estado** | Propuesta aplicada al repositorio · **pendiente de confirmación de Iker y Enzo** (M-2) |

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
