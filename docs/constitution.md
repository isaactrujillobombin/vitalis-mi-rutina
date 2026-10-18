# constitution.md · Vitalis — Principios del proyecto

> Equipo NexoTeam · G0X-01, G0X-02, G0X-03
> Estas reglas **no se negocian durante el desarrollo**. Si una tarea, una propuesta de la IA o una decisión técnica entra en conflicto con ellas, gana la constitución. Para cambiarlas hace falta el acuerdo de los tres integrantes, una nota en el historial de cambios del final y la actualización de los documentos afectados.

Orden de prioridad ante un conflicto: **1. Seguridad de la usuaria → 2. Accesibilidad → 3. Privacidad → 4. Alcance del MVP → 5. Calidad del código.**

---

## 1. Seguridad física de la usuaria

Nuestras usuarias tienen miedo a caerse. La app nunca debe empujarlas a seguir si algo va mal.

| ID | Regla |
| --- | --- |
| S-1 | La acción **«Me duele»** está visible en todo momento durante el ejercicio, sin desplazarse en 390 × 844 px. |
| S-2 | Parar nunca se castiga: una sesión pausada no muestra mensajes de fracaso, rachas perdidas ni penalizaciones. |
| S-3 | La app **no diagnostica ni da consejo médico**. Preparación y Ejercicio muestran: «Este contenido es orientativo y no sustituye el consejo de tu médico.» |
| S-4 | La preparación (silla firme sin ruedas, contra la pared, espacio despejado) se muestra **siempre antes** de las instrucciones, también en móvil. |
| S-5 | Ningún texto anima a superar el número de repeticiones indicado ni a «esforzarse más». |
| S-6 | Los textos de los ejercicios se validan con una fuente fiable antes del piloto (ver D-10 en spec.md). |

## 2. Accesibilidad para personas de 65 a 85 años

Objetivo mínimo: **WCAG 2.2 nivel AA**, con reglas más estrictas donde nuestras usuarias lo necesitan.

| ID | Regla |
| --- | --- |
| A-1 | Zonas pulsables de **48 × 48 px como mínimo**, separadas al menos 8 px entre sí. |
| A-2 | Texto de cuerpo de **18 px como mínimo**; la interfaz funciona con zoom del 200 %. |
| A-3 | Contraste de 4,5:1 en texto y 3:1 en componentes. |
| A-4 | **Una acción principal por pantalla**, siempre con el mismo estilo (Button/Primary de Figma). |
| A-5 | Los estados se comunican con **icono + texto**, nunca solo con color. |
| A-6 | Todo el flujo se puede completar con teclado, con foco visible. Las ventanas modales retienen el foco y se cierran con Esc. |
| A-7 | Lenguaje llano: frases de 20 palabras o menos, tuteo cercano, sin jerga de gimnasio ni anglicismos («series», «reps», «workout»). |
| A-8 | No hay acciones con límite de tiempo: la usuaria va a su ritmo. |
| A-9 | Cada pantalla nueva pasa axe-core sin violaciones *serious* o *critical* antes de fusionarse. |

## 3. Protección de datos

Los datos de ejercicio de una persona mayor son datos sensibles en la práctica: revelan su estado físico y sus rutinas.

| ID | Regla |
| --- | --- |
| P-1 | **Minimización:** el MVP solo guarda el identificador del ejercicio, el estado y la fecha y hora del registro. Nada más. |
| P-2 | **Todo se queda en el dispositivo** (`localStorage`). No hay servidor, cuentas ni sincronización en el MVP. |
| P-3 | **Cero terceros:** sin analíticas, sin cookies de terceros, sin fuentes, iconos ni scripts cargados desde CDN externos. |
| P-4 | «Avisar a la familia» usa la hoja de compartir del sistema: la app **no lee, guarda ni envía** contactos, nombres ni teléfonos. |
| P-5 | No se piden datos de salud (patologías, medicación, peso) en el MVP. |
| P-6 | Las pruebas con usuarias reales usan datos ficticios; no se graban caras ni voces sin consentimiento por escrito. |
| P-7 | Ningún dato personal real de usuarias o compañeros aparece en el repositorio, en capturas de evidencias ni en prompts enviados a la IA. |

## 4. Calidad del código

| ID | Regla |
| --- | --- |
| C-1 | TypeScript en modo `strict`; no se permite `any` salvo comentario que lo justifique. |
| C-2 | Cada requisito funcional (RF-xx) tiene al menos un test automático que lo cubre; el ID aparece en el nombre del test. |
| C-3 | Antes de fusionar en `main`: lint, tests unitarios, tests e2e y build pasan sin errores. |
| C-4 | Ramas cortas por tarea (`T-xx-descripcion`) y *pull request* revisado por **otro** integrante. |
| C-5 | Los textos de la interfaz viven en un único archivo de contenidos, no repartidos por los componentes. |
| C-6 | Componentes pequeños y con una responsabilidad; los nombres siguen las pantallas y componentes de Figma (tabla de plan.md §5). |
| C-7 | No se añade ninguna dependencia nueva sin acordarlo en el equipo y anotarlo en plan.md. |
| C-8 | Mensajes de commit en español con el ID de tarea: `T-11: guardar registro al confirmar`. |

## 5. Revisión humana de las propuestas de la IA

La IA es una herramienta del equipo, no un integrante. **Quien acepta una propuesta de la IA es responsable de ella como si la hubiera escrito.**

| ID | Regla |
| --- | --- |
| H-1 | Ningún código o texto generado por IA entra en `main` sin que una persona lo haya leído entero, ejecutado y entendido. |
| H-2 | Toda propuesta de la IA se contrasta con spec.md y con esta constitución antes de aceptarla. Si añade funcionalidades fuera del alcance, se descarta. |
| H-3 | Si la IA cambia un texto visible para la usuaria, una persona lo revisa con las reglas A-7 y S-3 a S-5. |
| H-4 | Los usos relevantes de la IA (requisitos, plan, tareas, código no trivial) se registran en uso-ia.md con prompt, resultado y decisión. |
| H-5 | La IA no decide el alcance, la seguridad ni la privacidad: propone; el equipo decide. |
| H-6 | Cada integrante debe poder explicar cualquier parte del código o de los documentos, la haya generado la IA o no. |
| H-7 | Se ejecutan siempre los tests indicados en AGENTS.md después de un cambio propuesto por la IA; si fallan, no se acepta. |

## 6. Alcance

| ID | Regla |
| --- | --- |
| M-1 | El MVP es **un ejercicio completo** («Levantarse de la silla») con confirmación, salida por dolor, pausa y aviso a la familia. Nada más. |
| M-2 | Una funcionalidad nueva entra en el MVP solo si las tres personas están de acuerdo, cabe en el tiempo disponible y se añade antes a spec.md y tasks.md. |
| M-3 | Lo que se descarta se anota en spec.md §3.2 con el motivo, para no volver a discutirlo. |
| M-4 | **El MVP es solo app móvil.** Las pantallas y comportamientos exclusivos de escritorio quedan fuera (ver `decisiones.md`, DEC-01). |

---

## Historial de cambios

| Fecha | Cambio | Acordado por |
| --- | --- | --- |
| 15/10/2026 | Primera versión para la entrega SDD. | Pendiente de aprobación de G0X-01, G0X-02 y G0X-03 |
| 16/10/2026 | Se añade M-4: el alcance del MVP se reduce a app móvil (DEC-01 en `decisiones.md`). | Propuesto por G0X-01 · pendiente de confirmar G0X-02 y G0X-03 |
