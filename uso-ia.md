# uso-ia.md · Registro del uso de IA en la fase SDD

> Equipo NexoTeam · Isaac, Iker, Enzo
> Capturas en [evidencias-ia/](evidencias-ia/)

> **Nota para el equipo (borrar antes de entregar):** los campos marcados con **[EQUIPO]** solo los podéis rellenar vosotros, porque recogen **vuestra** revisión y vuestras decisiones. Lo que puntúa es esa revisión crítica, no las propuestas de la IA. Los datos de herramienta, modo y prompts de los casos 1 y 2 son reales y salen de la sesión con Claude.

---

## Caso 1 · Entender el SDD, leer el prototipo y repartir el trabajo

| Apartado | Detalle |
| --- | --- |
| **Tarea y objetivo** | Entender qué pide la entrega SDD, extraer el alcance real del prototipo de Figma y repartir los archivos entre los tres integrantes. Corresponde a **spec.md** (alcance, dudas) y **tasks.md** (reparto). |
| **Herramienta o agente** | Claude (app de Claude), con los conectores de **Figma** y de documentos activados. Modelo configurado en la sesión: `claude-opus-5-5`; la herramienta avisa de que el modelo que responde puede variar. |
| **Modo de trabajo** | Agente con herramientas (la IA podía leer el archivo de Figma y crear un documento compartido). Se eligió porque las capturas de pantalla no permitían leer el texto pequeño de los frames. |
| **Contexto facilitado** | Enunciado de la entrega (PDF), tres capturas del archivo de Figma y, más adelante, el PDF de ideación de Vitalis. |

**Prompts relevantes (textuales):**

1. «divide esto entre iker isaak enzo con el proyecto de figma Vitalis — NexoTeam (Pantallas)»
2. «esto es y expplica de va el SSD este» (con las tres capturas de Figma)
3. Refinamiento: «leelo» (para que leyera el Figma directamente en lugar de las capturas)
4. «con el docs reparte el trabajo y antes explica que es lo de SSD»
5. «aqui tienes el contexto extendido para que tengas todo lo necestaio» (con el PDF de ideación)

**Qué propuso la IA**

- Un reparto por archivo con un responsable y dos revisores, y un orden de trabajo (constitution y spec en paralelo, luego plan y AGENTS, luego tasks).
- Una explicación del SDD y de EARS, y unos primeros requisitos RF-01 a RF-09.
- Avisos de coherencia: el tema del reto es la soledad, pero el Figma la trata como «beneficio secundario»; el Figma excluye los datos persistentes y plan.md exige explicar cómo se guardan; la portada no tenía los nombres del equipo; el stack de la ideación (React Native, Firebase, Node + PostgreSQL…) no cabe en un MVP.

**Errores y limitaciones de la IA que detectamos**

- Con solo las capturas, la IA afirmó que el MVP no tocaba la soledad. Al leer después los datos del Figma descubrió que **SesiónRegistrada ya tiene un botón «Avisar a la familia»**. Su primera conclusión era incompleta porque partía de imágenes ilegibles.
- Los primeros requisitos se basaban en capturas y la propia IA avisó de que eran aproximados. Tras leer el Figma cambiaron los textos de los botones (por ejemplo, «Estoy lista, empezar» y «Sí, registrar sesión»).
- Escribió «Isaak» siguiendo el Figma, cuando la ideación pone «Isaac».
- El conector de Figma del plan Starter llegó a su límite de llamadas y no pudo leer todas las páginas con capturas.

**Revisión humana [EQUIPO]**

| Propuesta de la IA | Decisión | Motivo | Cómo lo comprobamos |
| --- | --- | --- | --- |
| Reparto de archivos (Iker → spec, Isaac → plan y AGENTS, Enzo → constitution y tasks) | [aceptado / modificado / descartado] | | |
| Usar «Avisar a la familia» como conexión con la soledad | | | |
| Dejar fuera el stack completo de la ideación | | | |
| Corregir «Isaak» → «Isaac» en el Figma | | | |

**Evidencia:** [evidencias-ia/01-lectura-figma.png](evidencias-ia/01-lectura-figma.png) — la IA lee el Figma con el conector y corrige lo que había dicho a partir de las capturas.

---

## Caso 2 · Borrador de los cinco documentos SDD

| Apartado | Detalle |
| --- | --- |
| **Tarea y objetivo** | Obtener un primer borrador coherente de **constitution.md, spec.md, plan.md, tasks.md y AGENTS.md** para revisarlo y corregirlo en equipo. |
| **Herramienta o agente** | Claude (app de Claude), en la misma sesión que el caso 1. Modelo configurado: `claude-opus-5-5` (puede variar). |
| **Modo de trabajo** | Agente con herramientas: leyó los PDF, consultó el Figma y generó los archivos Markdown y el ZIP. |
| **Contexto facilitado** | Enunciado, PDF de ideación de Vitalis, Figma (brief, user flow, wireframes, pantallas de ReadyForDev, handoff y checklist) y la conversación del caso 1. |

**Prompt relevante (textual):** «completa esto» (con el enunciado adjunto).

**Decisiones que propuso la IA y que el equipo debe validar [EQUIPO]**

| # | Propuesta de la IA | Decisión | Motivo | Cómo lo comprobamos |
| --- | --- | --- | --- | --- |
| 1 | Web adaptable (React + Vite) en lugar de React Native | **Aceptado** | Una sola app cubre los dos diseños de Figma (escritorio y móvil) y el piloto se enseña con un enlace, sin instalar nada. React Native queda para después del MVP. | Contrastado con las páginas Desktop y Mobile de `07_ReadyForDev`. |
| 2 | Guardar los registros en `localStorage`, sin servidor ni cuentas | | | |
| 3 | Excluir Mi Plato del MVP, aunque la hoja de ruta de la ideación lo incluye | **Aceptado** | El Figma solo prototipa Mi Rutina; incluir Mi Plato duplicaba el trabajo para el tiempo disponible. Queda como primera mejora futura. | Contrastado con el brief y el handoff del Figma («Solo se prototipa Mi Rutina»). |
| 4 | Sustituir las cifras de demostración de Mi Plato y Familia por «Próximamente» | **Aceptado (modifica el Figma)** | No queremos enseñar datos inventados (700/1000 mg de calcio…) a una persona mayor: podría creérselos. | Pendiente de actualizar las tarjetas de Inicio en Figma (D-04). |
| 5 | «Hoy tengo dolor o no puedo» muestra un mensaje en Inicio (el Figma no lo define) | | | |
| 6 | Saludo por hora y sin nombre | | | |
| 7 | Estimación de 81 h y reparto de tareas por persona | | | |
| 8 | Requisitos no funcionales con cifras concretas (48 px, 18 px, axe, Lighthouse ≥ 95) | | | |

Sugerencias para revisar el borrador: comprobad cada RF contra las pantallas de Figma, recorred la máquina de estados de plan.md §3.1 con el prototipo en Present, revisad si las horas de tasks.md son realistas para vuestro horario y quitad lo que no sepáis explicar.

**Evidencia:** [evidencias-ia/02-propuesta-stack-y-soledad.png](evidencias-ia/02-propuesta-stack-y-soledad.png) — la IA propone recortar el stack de la ideación y meter una conexión mínima con la familia en el MVP (base de las decisiones 1 a 3).

---

## Caso 3 · [EQUIPO] Revisión de casos límite o desglose de tareas

> Lo hace Iker o Enzo con **ChatGPT**. Pegad este prompt y, debajo, la sección 6 (Casos límite) y la sección 4 (Requisitos funcionales) de spec.md. Haced captura de la respuesta y rellenad la tabla.
>
> *Prompt:* «Eres revisor de requisitos de una app para personas de 65 a 85 años con miedo a caerse. Te paso los requisitos y los casos límite de nuestro MVP. Dime qué casos límite importantes faltan y cuáles de los que tenemos son ambiguos o no se pueden comprobar. No propongas funcionalidades nuevas fuera del alcance.»

| Apartado | Detalle |
| --- | --- |
| **Tarea y objetivo** | Revisar con una segunda IA los casos límite de **spec.md §6**, para encontrar los que faltan o no son verificables. |
| **Herramienta o agente** | ChatGPT · modelo: [el que muestre la app, o «no visible»] |
| **Modo de trabajo** | [conversación / el modo que aparezca, o «sin selector de modo»] |
| **Contexto y prompts** | Secciones 4 y 6 de spec.md + el prompt de arriba. [Añadid los prompts de refinamiento si hicisteis alguno.] |
| **Resultado y revisión humana** | [Qué casos propuso, cuáles añadisteis a spec.md §6, cuáles descartasteis y por qué. Ejemplo de formato: «Propuso X. Lo descartamos porque está fuera del alcance (spec §3.2).»] |
| **Evidencia** | [evidencias-ia/03-revision-casos-limite.png](evidencias-ia/03-revision-casos-limite.png) |

---

## Caso 4 · Creación del repositorio y recorte a solo móvil (DEC-01)

| Apartado | Detalle |
| --- | --- |
| **Tarea y objetivo** | Crear el repositorio privado del proyecto con los documentos SDD y aplicar la decisión del equipo de reducir el MVP a **solo app móvil**. |
| **Herramienta o agente** | Claude Code (terminal, dentro del editor), con acceso a la CLI de GitHub. Modelo: `claude-opus-5`. |
| **Modo de trabajo** | Agente con herramientas: escribe archivos en disco, inicializa git y crea el repositorio con `gh`. |
| **Contexto facilitado** | Los cinco documentos SDD, los textos y capturas del Figma y la instrucción «crea un repositorio privado para este proyecto (SOLO APP MOVIL)». |
| **Prompt relevante (textual)** | «crea un reposotorio privado para este proyecto (SOLO APP MOVIL)» |

**Qué hizo la IA**

- Creó el repositorio privado `vitalis-mi-rutina` y el primer commit con los documentos SDD.
- **No cambió el alcance por su cuenta en silencio:** creó `decisiones.md` con DEC-01, marcó en spec.md los requisitos afectados (RF-02, RF-03, CA-05.2, RF-10) en vez de borrarlos, y dejó la decisión como «pendiente de confirmar por Iker y Enzo» (regla M-2 y H-5).
- Añadió M-4 a la constitución, CL-13 (qué pasa si se abre en un navegador ancho) y la tarea T-00b para cerrar la decisión.

**Revisión humana [EQUIPO]**

| Propuesta de la IA | Decisión | Motivo | Cómo lo comprobamos |
| --- | --- | --- | --- |
| Eliminar T-09 (Preparación/Desktop) y absorberla en T-10 | | | |
| Marcar RF-02 y RF-03 como fuera de alcance en vez de borrarlos | | | |
| Nuevo reparto de horas (77 h en lugar de 81) | | | |
| CL-13: contenido centrado a 390 px en pantallas anchas | | | |

---

## Caso 5 · Los tests automáticos encuentran un fallo que la revisión a ojo no vio

| Apartado | Detalle |
| --- | --- |
| **Tarea y objetivo** | Añadir el tooling de calidad que faltaba (ESLint + jsx-a11y, Prettier, Vitest + Testing Library, Playwright + axe) y escribir los tests que exige la regla C-2: cada RF con al menos un test que lo nombre. |
| **Herramienta o agente** | Claude Code (terminal). Modelo: `claude-opus-5`. |
| **Modo de trabajo** | Agente con herramientas: escribe los tests, los ejecuta y ve el resultado. |
| **Contexto facilitado** | El repositorio entero, con los documentos SDD ya dentro. |
| **Prompt relevante (textual)** | «haz todo esta bien solo haz el 3 y el 2» (en referencia a T-02, tokens, y T-01b, tooling de tests) |

**Resultado: 51 tests unitarios y de componentes + 28 e2e en dos perfiles de móvil.** Al ejecutarlos por primera vez, **2 fallaron**. Uno era un test mal escrito. El otro era un fallo real del código:

> **RF-16 / CL-01 — doble registro.** `useSessionFlow.confirmSave()` se fiaba del estado del reducer para bloquear una segunda llamada. React no actualiza ese estado hasta el siguiente render, así que dos llamadas seguidas veían el mismo estado y **guardaban dos registros**. El botón desactivado tapaba el síntoma en la interfaz, pero la lógica estaba mal.

Es exactamente el caso límite CL-01 que el equipo había anotado en la fase SDD: una persona mayor con poca experiencia digital pulsando dos veces sin querer. El requisito estaba bien escrito; la implementación no lo cumplía, y **leyendo el código no se veía**.

**Corrección:** una marca con `useRef`, que se pone de forma síncrona y solo se libera si el guardado falla, para que «Reintentar» (RF-15) siga funcionando.

**Qué aprendimos**

- Escribir el caso límite en el spec **no basta**: hay que tener un test que lo ejecute. Haberlo documentado en la fase SDD fue lo que hizo que alguien escribiera ese test.
- La IA también se equivocó al corregirlo: su primera versión reseteaba la marca al final de la función, lo que la dejaba inservible. Lo detectó al volver a ejecutar el test, no al razonarlo.
- Los tests de accesibilidad (axe) obligaron a quitar los `opacity: 0.5` de los elementos «Próximamente», que bajaban el contraste por debajo de 4,5:1 y además comunicaban el estado solo con color (A-3, A-5).

**Revisión humana [EQUIPO]**

| Propuesta de la IA | Decisión | Motivo | Cómo lo comprobamos |
| --- | --- | --- | --- |
| Corregir RF-16 con una marca `useRef` en vez de solo con el botón desactivado | | | |
| Que el test de privacidad falle si aparece cualquier petición externa (RNF-08) | | | |
| Verificar el contraste con un script propio en vez de a mano | | | |
| Dejar fuera de la validación automática RF-12 (Web Share) y declararlo en validacion.md | | | |

---

## Reflexión final [EQUIPO]

> Borrador a reescribir con vuestras palabras (5-8 líneas). Cada integrante debe poder defenderlo.

La IA nos ayudó sobre todo a entender qué pedía el SDD y a convertir el prototipo en requisitos verificables y casos límite que no habíamos previsto (doble pulsación, almacenamiento bloqueado, acceso directo a pantallas). También señaló incoherencias entre la ideación, el Figma y el enunciado. Detectamos que se equivoca cuando trabaja con información incompleta: con capturas ilegibles sacó conclusiones erróneas sobre la soledad. Además, tiende a proponer más alcance y tecnología de la que cabe en un MVP. Decidimos nosotros el alcance final, la plataforma y [completar], y revisamos cada requisito contra el Figma antes de aceptarlo.
