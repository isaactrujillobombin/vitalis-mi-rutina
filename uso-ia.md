# uso-ia.md · Registro del uso de IA en la fase SDD

> Equipo NexoTeam · G0X-01, G0X-02, G0X-03
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
- Copió del Figma un nombre del equipo mal escrito, distinto del de la ideación.
- El conector de Figma del plan Starter llegó a su límite de llamadas y no pudo leer todas las páginas con capturas.

**Revisión humana**

| Propuesta de la IA | Decisión | Motivo | Cómo lo comprobamos |
| --- | --- | --- | --- |
| Reparto de archivos (G0X-02 → spec, G0X-01 → plan y AGENTS, G0X-03 → constitution y tasks) | **Modificado** | Investigamos si era el reparto más adecuado: mantuvimos lo que encajaba y cambiamos lo que no. | Lo contrastamos con lo que cada uno conocía mejor del proyecto. |
| Usar «Avisar a la familia» como conexión con la soledad | **Aceptado** | Conecta a las personas mayores con su familia y, a la vez, las motiva a hacer ejercicio y a llevar una vida plena. | RF-12 en spec.md; el botón está en SesiónRegistrada ([captura 04](docs/capturas-app/04-sesion-registrada.png)). |
| Dejar fuera el stack completo de la ideación | **Aceptado** | No daba tiempo a montarlo todo en el MVP. | El flujo principal funciona completo sin servidor ([validacion.md](validacion.md) §2). |
| Corregir la grafía de un nombre del equipo en el Figma | **Aceptado · corregido** | Era un error de escritura. Además, desde la entrega final los documentos usan códigos de grupo (DEC-03). | Revisado en el archivo de Figma. |

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

**Decisiones que propuso la IA y revisión del equipo**

| # | Propuesta de la IA | Decisión | Motivo | Cómo lo comprobamos |
| --- | --- | --- | --- | --- |
| 1 | Web adaptable (React + Vite) en lugar de React Native | **Aceptado** | Una sola app cubre los dos diseños de Figma (escritorio y móvil) y el piloto se enseña con un enlace, sin instalar nada. React Native queda para después del MVP. | Contrastado con las páginas Desktop y Mobile de `07_ReadyForDev`. |
| 2 | Guardar los registros en `localStorage`, sin servidor ni cuentas | **Aceptado, con límite** | Basta para el MVP, sabiendo que si la persona cambia de móvil o borra los datos pierde el historial. Una versión futura podría añadir copia de seguridad. | Tests `RNF-08 (P-3)` y `P-1` en `privacidad.spec.ts`. |
| 3 | Excluir Mi Plato del MVP, aunque la hoja de ruta de la ideación lo incluye | **Aceptado** | El Figma solo prototipa Mi Rutina; incluir Mi Plato duplicaba el trabajo para el tiempo disponible. Queda como primera mejora futura. | Contrastado con el brief y el handoff del Figma («Solo se prototipa Mi Rutina»). |
| 4 | Sustituir las cifras de demostración de Mi Plato y Familia por «Próximamente» | **Aceptado (modifica el Figma)** | No queremos enseñar datos inventados (700/1000 mg de calcio…) a una persona mayor: podría creérselos. | Pendiente de actualizar las tarjetas de Inicio en Figma (D-04). |
| 5 | «Hoy tengo dolor o no puedo» muestra un mensaje en Inicio (el Figma no lo define) | **Aceptado** | Un mensaje amable que valida descansar evita que la persona se sienta mal por no hacer el ejercicio, y no la saca de Inicio ni la obliga a decidir nada más. | Test de RF-14 y [captura 09](docs/capturas-app/09-hoy-no-puedo.png). |
| 6 | Saludo por hora y sin nombre | **Aceptado** | El saludo por hora ya resulta cercano y evita una pantalla de configuración que a una persona con poca experiencia digital le costaría. Además no guardamos datos personales. | Test de CA-01.2 en `HomePage.test.tsx`, que también comprueba que no aparece ningún nombre. |
| 7 | Estimación de 81 h y reparto de tareas por persona | **Aceptado como guía · poco realista** | La IA hizo más rápido parte del código, pero revisar, probar y documentar nos llevó más tiempo del previsto. | Comparando lo planificado en tasks.md con el trabajo real. |
| 8 | Requisitos no funcionales con cifras concretas (48 px, 18 px, axe, Lighthouse ≥ 95) | **Aceptado y mejorado** | Con una cifra se puede comprobar si se cumple. Al final superamos el mínimo: botones de 56-60 px y Lighthouse 100. | `npm run check` y el [informe de Lighthouse](docs/lighthouse/inicio-movil.report.html). |

Sugerencias para revisar el borrador: comprobad cada RF contra las pantallas de Figma, recorred la máquina de estados de plan.md §3.1 con el prototipo en Present, revisad si las horas de tasks.md son realistas para vuestro horario y quitad lo que no sepáis explicar.

**Evidencia:** [evidencias-ia/02-propuesta-stack-y-soledad.png](evidencias-ia/02-propuesta-stack-y-soledad.png) — la IA propone recortar el stack de la ideación y meter una conexión mínima con la familia en el MVP (base de las decisiones 1 a 3).

---

## Caso 3 · [EQUIPO] Revisión de casos límite o desglose de tareas

> Lo hace G0X-02 o G0X-03 con **ChatGPT**. Pegad este prompt y, debajo, la sección 6 (Casos límite) y la sección 4 (Requisitos funcionales) de spec.md. Haced captura de la respuesta y rellenad la tabla.
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
- **No cambió el alcance por su cuenta en silencio:** creó `decisiones.md` con DEC-01, marcó en spec.md los requisitos afectados (RF-02, RF-03, CA-05.2, RF-10) en vez de borrarlos, y dejó la decisión como «pendiente de confirmar por G0X-02 y G0X-03» (regla M-2 y H-5).
- Añadió M-4 a la constitución, CL-13 (qué pasa si se abre en un navegador ancho) y la tarea T-00b para cerrar la decisión.

**Revisión humana**

| Propuesta de la IA | Decisión | Motivo | Cómo lo comprobamos |
| --- | --- | --- | --- |
| Eliminar T-09 (Preparación/Desktop) y absorberla en T-10 | **Aceptado** | Al ser solo móvil esa pantalla sobraba, y la preparación sigue apareciendo siempre antes de los pasos, que era lo importante para la seguridad (S-4). | Test de RF-04 (la preparación va antes de los pasos) y [captura 02](docs/capturas-app/02-ejercicio.png). |
| Marcar RF-02 y RF-03 como fuera de alcance en vez de borrarlos | **Aceptado** | Queda constancia de qué se pensó al principio y por qué se quitó, y el profesorado puede seguir el cambio de alcance. | Siguen en spec.md §4, marcados como fuera de alcance por DEC-01. |
| Nuevo reparto de horas (77 h en lugar de 81) | **Aceptado** | Mantuvimos el reparto entre los tres para que nadie cargara con más trabajo al recortar el alcance. | Resumen del reparto en tasks.md. |
| CL-13: contenido centrado a 390 px en pantallas anchas | **Aceptado** | Es la consecuencia lógica de hacer solo app móvil: no prometemos una experiencia de escritorio que no hemos diseñado. | Test `RNF-07: sin desplazamiento horizontal entre 320 y 768 px`. |

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

**Revisión humana**

| Propuesta de la IA | Decisión | Motivo | Cómo lo comprobamos |
| --- | --- | --- | --- |
| Corregir RF-16 con una marca `useRef` en vez de solo con el botón desactivado | **Aceptado** | Pulsar dos veces sin querer es muy habitual en personas con poca experiencia digital (CL-01), y un registro duplicado confundiría a la usuaria. | Test de componente: una doble pulsación crea un solo registro. |
| Que el test de privacidad falle si aparece cualquier petición externa (RNF-08) | **Aceptado** | Le decimos a la usuaria que sus datos no salen del móvil, y este test es la forma de demostrar que es verdad. | Test `RNF-08 (P-3): no se pide nada a dominios de terceros`. |
| Verificar el contraste con un script propio en vez de a mano | **Aceptado, pero no basta** | El script no sabe si un color se ve bien o se parece al Figma: eso lo tuvimos que revisar a ojo. | `npm run check:contrast` (18 pares) y revisión de las capturas de la app. |
| Dejar fuera de la validación automática RF-12 (Web Share) y declararlo en validacion.md | **Insuficiente · modificado** | Queremos al menos un test con la función de compartir simulada para comprobar también la alternativa de WhatsApp y copiar. | Pendiente: test con `navigator.share` simulado (validacion.md §9). |

---

## Caso 6 · Rediseño visual con un agente: propuestas, elección y correcciones

| Apartado | Detalle |
| --- | --- |
| **Tarea y objetivo** | T-03: componentes `Button`, `Badge` y `Card`. La primera versión «se veía pobre» frente al Figma; se pide acercarla al diseño y mejorarla. |
| **Herramienta o agente** | Claude Code (extensión de VS Code). Modelo visible: `claude-opus-5-5`. |
| **Modo de trabajo** | Agente con herramientas: lee el código, edita, ejecuta `npm run check` y hace capturas con Playwright para comprobar el resultado. |
| **Contexto facilitado** | El repositorio con los documentos SDD, una captura de la página `06_Prototype` del Figma ([06-captura-figma-referencia.png](evidencias-ia/06-captura-figma-referencia.png)) y capturas de la app con los fallos señalados. |
| **Prompts relevantes (textuales)** | «mejoralo muchisimo visualmetne esta fatal y que sea parecido al figma» · «saca tus mejores diseñoss y inventa como podriamos mejorarlo» · «este pero mas refinado estilo apple» · «la animacion esta fatal arregla el espacing» |

**Resultado.**

1. La IA **no empezó a cambiar código directamente**: AGENTS.md exige una tarea T-xx, así que preguntó en cuál encajaba (se eligió T-03) y creó la rama `T-03-componentes-figma`.
2. El conector de Figma **volvió a agotar el límite del plan Starter**; se trabajó con una captura.
3. Propuso **tres direcciones visuales** en un lienzo de diseño (A · Azul confianza, B · Luz de mañana, C · Bloques grandes). Se eligió la A ([06-propuesta-a-elegida.png](evidencias-ia/06-propuesta-a-elegida.png)) y se aplicó con acabado de estilo iOS (DEC-02).
4. Nuevo componente `Card`, iconos SVG propios en lugar de emojis, logo en SVG, ilustración animada que respeta «Reducir movimiento» y 3 pares nuevos en el verificador de contraste.

**Errores de la IA que detectó la revisión humana o las pruebas.**

| Error | Cómo se detectó | Corrección |
| --- | --- | --- |
| Las insignias de la tarjeta azul salían blancas: una regla CSS nueva pisaba a la de la tarjeta | Captura del equipo ([06-fallo-insignias-tarjeta.png](evidencias-ia/06-fallo-insignias-tarjeta.png)) | Regla específica para insignias dentro de la tarjeta azul |
| La primera animación «estiraba» la figura y quedaba mal | Revisión del equipo («la animacion esta fatal») | Ilustración nueva con dos posturas que se funden |
| «No me sale nada»: la app en blanco | La IA abrió la página con Playwright y leyó el error de consola: caché de Vite desfasada tras un `git stash` suyo | Reinicio del servidor de desarrollo; el código estaba bien |
| `Button` ignoraba el `className` recibido | La propia IA al revisar su cambio | Unir clases en lugar de sobrescribirlas |

**Lo que la IA rechazó y por qué.**

- **Backend y cuentas** («que sea un app funcional no solo front end»): lo prohíben P-2, P-3 y RNF-08. Explicó que la app ya funciona sin servidor y propuso alternativas dentro del spec.
- **Contador o temporizador**: excluidos en spec.md §3.2.
- **Una foto de una persona real como «logo»**: no la incorporó (datos personales, P-1 y límite 9 de AGENTS.md), y la borró de la carpeta temporal cuando se le pidió.

**Revisión humana**

| Propuesta de la IA | Decisión | Motivo | Cómo lo comprobamos |
| --- | --- | --- | --- |
| Dirección A con estilo iOS | **Aceptado** | El azul marino transmite seriedad y calma, y el estilo iOS, limpio y con mucho espacio, resulta familiar y fácil de leer para personas mayores. | Comparada con la captura de `06_Prototype` y con las [capturas de la app](docs/capturas-app/). |
| Ilustración animada en la tarjeta de Inicio (no está en spec ni en Figma) | **Aceptado** | Explica el ejercicio de un vistazo, va lenta para no meter prisa (A-8) y se para sola si el móvil pide reducir el movimiento. | Anotada en decisiones.md (DEC-02); las capturas se generan con «reducir movimiento» activado. |
| Botones lado a lado en Ejercicio («Terminar» y «Me duele») | **Aceptado** | «Me duele» está siempre a la vista sin desplazarse, que es nuestra regla de seguridad más importante (S-1). | Test e2e de CA-05.3 a 390 × 844 y [captura 02](docs/capturas-app/02-ejercicio.png). |
| Logo redibujado en SVG en lugar de usar el PNG | **Aceptado** | El SVG se ve nítido a cualquier tamaño y con fondo transparente; el PNG se veía borroso a 30 px y llevaba fondo gris. | Revisado en la cabecera de la app y en el icono de la pestaña. |

---

## Caso 7 · Validación para la entrega final: capturas, Lighthouse y protección de datos

| Apartado | Detalle |
| --- | --- |
| **Tarea y objetivo** | Comparar el repositorio con el enunciado de la entrega final y cerrar lo que la IA puede hacer sola. |
| **Herramienta o agente** | Claude Code (extensión de VS Code). Modelo visible: `claude-opus-5-5`. |
| **Modo de trabajo** | Agente con herramientas, en la rama `entrega-final-documentacion`. |
| **Contexto facilitado** | El PDF del enunciado de la entrega final y el repositorio. |
| **Prompts relevantes (textuales)** | «me preocupa la funcionalidad que falta segun este docs» · y, pegando su propia lista, «haz esto» |

**Resultado.**

- **Auditoría contra el enunciado.** La funcionalidad del MVP estaba completa; lo que faltaba era documentación y entrega. Encontró un problema grave: **los nombres del alumnado** (uno con apellidos) aparecían en 8 documentos y en la URL del repositorio, cuando el enunciado lo prohíbe.
- **Datos personales.** Sustituyó los nombres por códigos G0X-NN (DEC-03). Avisó de que el **historial de git** los conserva y de que eso lo tiene que resolver el equipo.
- **Capturas de evidencia.** Un script de Playwright genera 9 capturas a 390 × 844 de la app real: flujo principal, ruta de dolor, caso de error simulando que `localStorage` falla, y «Hoy no puedo» ([docs/capturas-app/](docs/capturas-app/)).
- **Las capturas destaparon una regresión** que los 113 tests no detectaban: las insignias de Ejercicio se habían quedado sin fondo tras la corrección del Caso 6 ([07-captura-revela-regresion.png](evidencias-ia/07-captura-revela-regresion.png)). Se corrigió y se repitieron las capturas.
- **Lighthouse** (móvil, build de producción): Rendimiento 100 · Accesibilidad 100 · Buenas prácticas 100. Cierra RNF-09.

**Qué aprendimos**

- Los tests comprueban comportamiento y accesibilidad, pero **no si algo se ve bien**: una captura revisada por una persona encontró lo que los tests no veían.
- La IA no marcó como hechas las tareas que nadie había revisado. Las dejó como «funciona, falta revisión del equipo» en tasks.md.

**Revisión humana**

| Propuesta de la IA | Decisión | Motivo | Cómo lo comprobamos |
| --- | --- | --- | --- |
| Códigos G0X-01/02/03 en lugar de nombres | **Aceptado** | El enunciado prohíbe nombres del alumnado en el repositorio, y no nos habíamos dado cuenta de que estaban en 8 documentos, uno con apellidos. | Búsqueda en todo el repositorio: ningún nombre en los archivos actuales. |
| Estado de las tareas en tasks.md sin marcarlas como hechas | **Modificado** | Funcionan y tienen tests, así que preferimos marcarlas como hechas. | 57 tests unitarios y 28 × 2 e2e; tasks.md actualizado. |
| Declarar los dos tests e2e inestables en lugar de desactivarlos | **Aceptado** | Fallaban también antes del rediseño, así que es un problema de tiempos del test y no de la app. | Ejecutados varias veces con y sin los cambios del rediseño. |

---

## Reflexión final

> Redactada a partir de las respuestas del equipo a un cuestionario sobre cada propuesta de la IA (19/10/2026). Las decisiones y opiniones son del equipo; la IA solo les dio forma.

**En qué nos ayudó.** Sobre todo a **entender y ordenar**: qué pedía el SDD y el enunciado, cómo repartir el trabajo en tareas T-xx y qué faltaba para la entrega final. También convirtió el prototipo en una app que funciona con tests, y sus tests encontraron un fallo real de doble registro (Caso 5) que leyendo el código no veíamos.

**En qué se equivocó.** Lo que más nos afectó fueron los **fallos visuales**: el rediseño necesitó varias vueltas (insignias blancas, una primera animación que quedaba mal, el espaciado de la tarjeta y una pantalla en blanco por la caché del servidor). Ningún test los detectaba; los encontramos mirando la app y las capturas. Además, sin acceso al Figma por el límite del plan, trabajó con capturas y sus colores no son los exactos del diseño. Su estimación de horas tampoco fue realista: revisar, probar y documentar llevó más de lo previsto.

**Lo que decidimos nosotros.** El alcance (solo móvil, DEC-01), la dirección visual A con estilo iOS (DEC-02), mantener la animación, marcar las tareas como hechas y pedir más pruebas para «Avisar a la familia». La IA rechazó lo que chocaba con nuestra constitución (servidor, cuentas, contador, una foto de una persona real), pero esas reglas las escribimos nosotros antes.

**Qué aprendimos y qué haríamos distinto.** Lo más importante: **todo lo que genera la IA hay que revisarlo y probarlo**. Funciona rápido, pero se equivoca, y la responsabilidad de lo que entregamos es nuestra. La próxima vez **pediríamos las cosas con más precisión** desde el principio: con peticiones como «mejóralo» hubo que corregir varias veces hasta llegar a lo que queríamos.
