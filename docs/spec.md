# spec.md · Vitalis — Mi Rutina (MVP)

> Proyecto interdisciplinar Monlau · 2.º DAM / 2.º DAW · Curso 2026-2027
> Tema del reto: la soledad de las personas mayores
> Estado: borrador para revisión del equipo · última actualización: 15/10/2026
>
> ⚠️ **Pendiente de actualizar con DEC-01 (solo app móvil).** Ver `decisiones.md`: hasta que se revise este archivo, DEC-01 manda en todo lo relativo a la plataforma (RF-02, RF-03, CA-05.2 y RF-10 quedan afectados).

## 0. Equipo e integrantes

**Equipo:** NexoTeam

| Integrante | Rol principal en el SDD | Rol principal en el desarrollo |
| --- | --- | --- |
| G0X-01 | plan.md, AGENTS.md | Datos, registro de sesiones, integración y despliegue |
| G0X-02 | spec.md | Componentes de interfaz, Inicio, ruta de dolor y pausa |
| G0X-03 | constitution.md, tasks.md | Preparación, Ejercicio, pruebas e2e y privacidad |

**Prototipo de Figma:** [Vitalis — NexoTeam (Pantallas)](https://www.figma.com/design/qs3XbPY89nY10Wf2JxxdI0/Vitalis-%E2%80%94-NexoTeam--Pantallas-)
Páginas de referencia: `00_Cover · 01_Brief · 02_UserFlow · 03_Wireframes`, `04_UI · 05_Components · 06_Prototype` y `07_ReadyForDev`.

**Documentos relacionados:** [constitution.md](constitution.md) · [plan.md](plan.md) · [tasks.md](tasks.md) · [decisiones.md](decisiones.md) · [AGENTS.md](AGENTS.md) · [uso-ia.md](../uso-ia.md)

---

## 1. Problema y usuarios

### 1.1 Problema

A partir de los 65 años, la pérdida de fuerza y de masa ósea avanza más rápido si no hay actividad física dirigida. El ejercicio no se abandona por desinterés, sino **por miedo a caerse o a lesionarse** y porque las apps de fitness hablan otro idioma: calorías, series, «quema grasa». Ese miedo lleva a moverse menos, y moverse menos lleva a salir menos y a relacionarse menos.

**Relación con la soledad.** Vitalis no es una app de videollamadas, pero ataca dos causas de aislamiento:

1. **Pérdida de autonomía:** quien no se siente segura moviéndose sale menos de casa.
2. **Falta de motivos de contacto:** compartir «he hecho mi rutina» da a la familia una razón diaria para hablar, sin necesidad de tener «algo importante que contar».

El MVP cubre la primera causa con la sesión guiada y la segunda con la acción mínima **«Avisar a la familia»** (RF-12), que ya está diseñada en Figma. El bloque completo «Reto en Familia» queda fuera del MVP (ver §3.2).

### 1.2 Usuarios

| Tipo | Descripción | Necesidades que condicionan el diseño |
| --- | --- | --- |
| **Usuaria principal** | Persona de 65 a 85 años, autónoma, sin experiencia en gimnasio, con miedo a lesionarse y poca experiencia digital. Persona de referencia: Rosa, 78 años, vive sola, osteoporosis, hijos fuera de la ciudad («No necesito una app que me trate como si tuviera veinte años»). En Figma aparece como «Carmen». | Botones grandes, pocas decisiones por pantalla, lenguaje llano, salida segura si algo duele, confirmación explícita antes de registrar. |
| **Familiar (cuidador)** | Hijos o hijas de 40 a 55 años que viven lejos. | Saber que su familiar se mantiene activa. En el MVP solo **recibe** el aviso por el canal que elija la usuaria (WhatsApp, SMS, correo); no usa la app. |

### 1.3 Objetivo del MVP

> **Que una persona mayor pueda completar y registrar, sin ayuda y sin miedo, una sesión breve de «Levantarse de la silla» (8 repeticiones + descanso de 30 s), con una salida segura si siente dolor, y avisar a su familia de que la ha hecho.**

Indicador de éxito para el piloto: al menos 2 de cada 3 participantes de 65 años o más completan la tarea sin instrucciones de clic (guion de la página `08_Test` de Figma).

---

## 2. Glosario

| Término | Significado en este proyecto |
| --- | --- |
| **Sesión** | Un bloque del ejercicio «Levantarse de la silla»: 8 repeticiones y un descanso de 30 s. |
| **Sesión pendiente** | Estado inicial del día: no hay ningún registro completado hoy. |
| **Registro** | Dato guardado en el dispositivo que indica que una sesión se ha completado, con fecha y hora. |
| **Sesión pausada** | La usuaria ha parado por dolor o voluntad propia. **No** genera registro de completado. |
| **Ancho móvil** | Ventana de 768 px de ancho o menos. |
| **Ancho escritorio** | Ventana de más de 768 px de ancho. |

---

## 3. Alcance

### 3.1 Funcionalidades incluidas (MVP)

| ID | Funcionalidad | Pantallas de Figma |
| --- | --- | --- |
| F1 | Inicio con la sesión del día y su estado | Inicio/Desktop, Inicio/Mobile |
| F2 | Preparación del espacio antes de empezar | Preparación/Desktop (integrada en Ejercicio/Mobile) |
| F3 | Guía escrita del ejercicio paso a paso | Ejercicio/Desktop, Ejercicio/Mobile |
| F4 | Confirmación explícita antes de registrar | ConfirmarRegistro/Desktop, ConfirmarRegistro/Mobile |
| F5 | Registro de la sesión en el propio dispositivo | SesiónRegistrada/Desktop, SesiónRegistrada/Mobile |
| F6 | Salida segura por dolor y pausa sin registro | AvisoDolor/Desktop, AvisoDolor/Mobile, SesiónPausada/Desktop, SesiónPausada/Mobile |
| F7 | Avisar a la familia de la sesión hecha | Botón «Avisar a la familia» en SesiónRegistrada |

### 3.2 Funcionalidades excluidas (y por qué)

| Excluida | Motivo |
| --- | --- |
| **Las pantallas de escritorio (`*/Desktop`)** | DEC-01 (16/10/2026): el MVP es solo app móvil. El recorrido móvil cubre el flujo completo y el piloto se hace en un móvil. |
| Cuentas, login y perfiles | No hacen falta para probar la tarea; añaden datos personales que proteger. |
| Catálogo de rutinas y sesiones de varios ejercicios | El Figma recorta el alcance a un único ejercicio completo. |
| **Mi Plato** (registro nutricional) | Fuera del recorrido prototipado; exige base de datos de alimentos y validación profesional. Aparece en la hoja de ruta de la ideación: es la primera ampliación tras el MVP. |
| **Reto en Familia** completo (desafíos, progreso compartido, rol de cuidador) | Necesita backend, cuentas y roles cruzados. En el MVP se sustituye por el aviso puntual de F7. |
| Vídeo, audio y lectura por voz (TTS) | No hay vídeo ni audio entregado en el diseño; la guía es escrita. TTS es la primera mejora de accesibilidad prevista. |
| Contador automático de repeticiones y temporizador de descanso | No están diseñados en Figma; la usuaria sigue su propio ritmo. Ver duda D-07. |
| Integración con Google Fit / Apple Health | Fuera del MVP; el registro manual es la vía principal según la ideación. |
| Notificaciones push y servidor | No hay backend en el MVP; todo se guarda en el dispositivo. |
| Cuestionario inicial de patologías | Requiere criterio clínico; el MVP muestra un aviso de consultar con el médico (RNF-10). |
| Datos de demostración de Mi Plato y Reto en Familia como cifras reales | Mostrar cifras inventadas a la usuaria podría confundirla; se muestran como tarjetas «Próximamente» sin números (ver D-04). |

---

## 4. Requisitos funcionales

Sintaxis EARS: **Cuando** (evento) · **Mientras** (estado) · **Si … entonces** (condición no deseada) · **Donde** (opción) · sin palabra clave (ubicuo).

### Inicio

**RF-01 — Mostrar la sesión del día**
Cuando la usuaria abra la aplicación, el sistema mostrará la pantalla Inicio con un saludo según la hora del día, la tarjeta «Mi Rutina · Hoy» con el ejercicio «Levantarse de la silla», las insignias «Nivel 1 · Con silla», «8 repeticiones» y «~5 minutos», el estado de la sesión del día y el botón «Empezar ahora».

- **CA-01.1** Si no existe ningún registro con fecha de hoy, la tarjeta mostrará el estado «Pendiente».
- **CA-01.2** El saludo será «Buenos días» de 06:00 a 13:59, «Buenas tardes» de 14:00 a 20:59 y «Buenas noches» de 21:00 a 05:59, según la hora del dispositivo.
- **CA-01.3** El botón «Empezar ahora» es la acción principal y la primera acción alcanzable con el teclado dentro del contenido.

**RF-02 — Ir a la preparación (escritorio)** · ⚠️ *Fuera de alcance por DEC-01*
Cuando la usuaria pulse «Empezar ahora» en ancho escritorio, el sistema mostrará la pantalla Preparación con el título «Prepara tu espacio», la lista de comprobaciones y los botones «Estoy lista, empezar» y «Volver al inicio».

- **CA-02.1** La lista incluye, como mínimo: silla firme sin ruedas, silla apoyada contra la pared y espacio despejado alrededor. → **Se conserva**: esta lista es la que RF-04 integra en Ejercicio.
- **CA-02.2** «Volver al inicio» lleva a Inicio sin cambiar el estado de la sesión.

**RF-03 — Empezar el ejercicio (escritorio)** · ⚠️ *Fuera de alcance por DEC-01*
Cuando la usuaria pulse «Estoy lista, empezar», el sistema mostrará la pantalla Ejercicio.

**RF-04 — Preparación integrada (móvil)**
Mientras la ventana tenga ancho móvil, cuando la usuaria pulse «Empezar ahora», el sistema mostrará directamente la pantalla Ejercicio con la lista de preparación de RF-02 situada **antes** de las instrucciones.

- **CA-04.1** En ancho móvil no se muestra una pantalla de Preparación separada, pero la preparación no desaparece.

### Ejercicio

**RF-05 — Guía del ejercicio**
Mientras la usuaria esté en la pantalla Ejercicio, el sistema mostrará el título «Levantarse de la silla», los pasos numerados del movimiento, las insignias «8 repeticiones» y «Descanso 30 s», el aviso de salud (RNF-10) y las acciones «Terminar ejercicio» y «Me duele».

- **CA-05.1** Los pasos se muestran como lista ordenada (1, 2, 3…), con una sola acción por paso.
- **CA-05.2** ⚠️ *Fuera de alcance por DEC-01.* En ancho escritorio también se muestra el botón «Pausar sesión» en el resumen lateral. En móvil la pausa se alcanza por «Me duele» → «Pausar sesión».
- **CA-05.3** «Me duele» se ve sin desplazarse en una ventana de 390 × 844 px.

**RF-06 — Pedir confirmación antes de registrar**
Cuando la usuaria pulse «Terminar ejercicio», el sistema abrirá la ventana ConfirmarRegistro con el título «¿Registrar esta sesión?», un resumen («Levantarse de la silla · 8 repeticiones») y los botones «Sí, registrar sesión» y «Cancelar».

- **CA-06.1** Al abrirse, el foco del teclado pasa al título o al primer botón de la ventana.

**RF-07 — Registrar la sesión**
Cuando la usuaria pulse «Sí, registrar sesión», el sistema guardará en el dispositivo un registro con el identificador del ejercicio, el estado «completada» y la fecha y hora, y mostrará la pantalla SesiónRegistrada con el texto «Sesión registrada» y el botón «Volver al inicio».

- **CA-07.1** Tras registrar y recargar la página, el registro sigue existiendo.
- **CA-07.2** La pantalla SesiónRegistrada solo se muestra si el guardado ha terminado correctamente (ver RF-15).

**RF-08 — Cancelar la confirmación**
Si la usuaria pulsa «Cancelar» o la tecla Esc en ConfirmarRegistro, entonces el sistema cerrará la ventana, volverá a la pantalla Ejercicio y **no** guardará ningún registro.

- **CA-08.1** Al cerrarse, el foco vuelve al botón «Terminar ejercicio».

### Dolor y pausa

**RF-09 — Aviso de dolor**
Cuando la usuaria pulse «Me duele», el sistema abrirá la ventana AvisoDolor con el título «Para el ejercicio», un texto que indique parar y sentarse, y los botones «Pausar sesión» y «Volver sin registrar».

- **CA-09.1** Abrir AvisoDolor no guarda ningún registro.

**RF-10 — Sesión pausada**
Cuando la usuaria pulse «Pausar sesión» (en AvisoDolor), el sistema mostrará la pantalla SesiónPausada con el texto «No registrada como completada» y los botones «Volver al inicio» y «Volver a la guía».

> DEC-01: se elimina la variante de escritorio «Revisar preparación»; en móvil siempre es «Volver a la guía».

- **CA-10.1** Una sesión pausada no cuenta como completada en Inicio.
- **CA-10.2** El estado se comunica con icono y texto, no solo con color.

**RF-11 — Volver sin registrar**
Cuando la usuaria pulse «Volver sin registrar», el sistema mostrará Inicio con la sesión en el mismo estado que tenía antes de empezar.

**RF-14 — Día sin ejercicio**
Cuando la usuaria pulse «Hoy tengo dolor o no puedo» en Inicio, el sistema mostrará un mensaje breve que valide la decisión de descansar y recuerde consultar con su médico si el dolor persiste, sin guardar ningún registro.

### Registro y familia

**RF-12 — Avisar a la familia**
Cuando la usuaria pulse «Avisar a la familia» en SesiónRegistrada, el sistema abrirá la hoja de compartir del dispositivo con un mensaje ya escrito («Hoy he hecho mi rutina de Vitalis: Levantarse de la silla, 8 repeticiones.») para que ella elija a quién enviarlo.

- **CA-12.1** Si el navegador no permite la hoja de compartir, el sistema mostrará dos opciones: «Enviar por WhatsApp» (enlace con el mensaje) y «Copiar mensaje».
- **CA-12.2** El sistema no guarda ni envía contactos, nombres ni teléfonos: el destinatario lo elige la usuaria fuera de la app.
- **CA-12.3** Si la usuaria cancela la hoja de compartir, sigue en SesiónRegistrada sin mensaje de error.

**RF-13 — Sesión hecha hoy**
Cuando exista al menos un registro con fecha de hoy, Inicio mostrará en la tarjeta el estado «Hecha hoy» con icono de confirmación y la hora del último registro.

- **CA-13.1** A las 00:00 del día siguiente, la tarjeta vuelve a «Pendiente».

### Errores y navegación

**RF-15 — Fallo al guardar**
Si el dispositivo no permite guardar el registro (almacenamiento lleno, bloqueado o en modo privado), entonces el sistema mantendrá abierta ConfirmarRegistro, mostrará el aviso «No hemos podido guardar la sesión. Inténtalo de nuevo.» y el botón «Reintentar», y **no** mostrará SesiónRegistrada.

**RF-16 — Doble pulsación**
Mientras se esté guardando un registro, el sistema desactivará el botón «Sí, registrar sesión», de modo que una doble pulsación genere **un solo** registro.

**RF-17 — Acceso directo a pantallas de resultado**
Si la usuaria abre directamente la dirección de SesiónRegistrada o SesiónPausada sin venir del flujo, entonces el sistema la redirigirá a Inicio.

**RF-18 — Datos guardados dañados**
Si los registros guardados en el dispositivo no se pueden leer (formato incorrecto), entonces el sistema los tratará como vacíos, mostrará la sesión como «Pendiente» y no se bloqueará.

**RF-19 — Secciones futuras**
Donde la interfaz muestre «Mi Plato» o «Familia» (tarjetas de Inicio y navegación), el sistema las presentará como «Próximamente», sin cifras y sin navegación funcional.

---

## 5. Requisitos no funcionales (verificables)

| ID | Requisito | Cómo se verifica |
| --- | --- | --- |
| **RNF-01** | Toda zona pulsable mide como mínimo 48 × 48 px. | Inspección en el navegador + test e2e que mide los botones del flujo. |
| **RNF-02** | El texto de cuerpo mide como mínimo 18 px y los títulos 24 px. Con zoom del 200 % no se pierde contenido ni funcionalidad. | Revisión de tokens CSS + prueba manual con zoom 200 %. |
| **RNF-03** | Contraste mínimo 4,5:1 en texto y 3:1 en bordes de botones e iconos (WCAG 2.2 AA). | axe-core sin violaciones de contraste. |
| **RNF-04** | Ningún estado (pendiente, hecha, pausada, error) se comunica solo con color: siempre icono + texto. | Revisión manual de las pantallas en escala de grises. |
| **RNF-05** | Todo el flujo se completa solo con teclado; el foco es visible; las ventanas modales retienen el foco, se cierran con Esc (equivale a «Cancelar») y devuelven el foco al botón que las abrió. | Test e2e con teclado + prueba manual. |
| **RNF-06** | 0 violaciones de gravedad *serious* o *critical* de axe-core en Inicio, Ejercicio, ConfirmarRegistro, AvisoDolor, SesiónRegistrada y SesiónPausada. | `@axe-core/playwright` en la suite e2e. |
| **RNF-07** | Sin desplazamiento horizontal entre 320 px y 768 px de ancho (DEC-01: ya no se prueba 1440 px). | Test e2e a 320, 390 y 768 px. |
| **RNF-08** | La aplicación no envía datos a ningún servidor ni a terceros: sin analíticas, sin cookies de terceros y sin fuentes o scripts externos. | Test e2e que falla si hay peticiones a dominios distintos del propio. |
| **RNF-09** | Lighthouse (móvil): Accesibilidad ≥ 95 y Rendimiento ≥ 85 en Inicio. | Informe de Lighthouse adjunto a la entrega final. |
| **RNF-10** | Ejercicio muestra el aviso: «Este contenido es orientativo y no sustituye el consejo de tu médico.» | Test de componente que comprueba el texto. |
| **RNF-11** | Textos en español con frases de 20 palabras o menos, sin anglicismos ni jerga de gimnasio («series», «reps», «workout»). | Revisión del archivo de contenidos por dos integrantes. |
| **RNF-12** | Cada botón e icono con significado tiene nombre accesible; los iconos decorativos se ocultan al lector de pantalla. | axe-core + prueba con lector de pantalla (NVDA o VoiceOver) en el flujo principal. |

---

## 6. Casos límite

| ID | Situación | Comportamiento esperado | Requisito |
| --- | --- | --- | --- |
| CL-01 | La usuaria pulsa dos veces seguidas «Sí, registrar sesión». | Se guarda un solo registro. | RF-16 |
| CL-02 | El almacenamiento del dispositivo está lleno, bloqueado o en modo privado. | Aviso y «Reintentar»; no se muestra éxito. | RF-15 |
| CL-03 | Los datos guardados están corruptos. | Se ignoran; la sesión aparece «Pendiente»; la app no se bloquea. | RF-18 |
| CL-04 | Se recarga la página en mitad del ejercicio. | Vuelve a la pantalla Ejercicio con la sesión pendiente; no se crea registro. | RF-05, RF-07 |
| CL-05 | Se abre directamente `/rutina/registrada` o `/rutina/pausada`. | Redirección a Inicio. | RF-17 |
| CL-06 | La usuaria registra una segunda sesión el mismo día. | Se permite; se guarda otro registro e Inicio muestra la hora del último. | RF-07, RF-13 |
| CL-07 | La sesión se registra a las 23:59 y se abre la app a las 00:01. | La tarjeta muestra «Pendiente» (nuevo día). | CA-13.1 |
| CL-08 | La usuaria pulsa «Me duele» y después «Volver sin registrar». | Inicio con el mismo estado de antes; ningún registro nuevo. | RF-09, RF-11 |
| CL-09 | El navegador no permite compartir o la usuaria cancela. | Alternativas WhatsApp / Copiar; cancelar no muestra error. | RF-12 |
| CL-10 | Se gira el móvil o se cambia el ancho de la ventana durante el ejercicio. | El contenido se recoloca sin perder el paso actual ni el estado. | RF-04, RNF-07 |
| CL-11 | Zoom del navegador al 200 % en móvil. | Todo el texto y los botones siguen visibles y usables. | RNF-02 |
| CL-12 | Títulos largos (por ejemplo, «¿Registrar esta sesión?» en varias líneas en 350 px). | El texto se parte en varias líneas sin cortarse ni solaparse con los botones. | RNF-07 |
| CL-13 | La app se abre en un navegador de escritorio (ancho > 768 px). | DEC-01: el diseño móvil se muestra centrado, con ancho máximo de 390 px. Nada se rompe. | DEC-01, RNF-07 |

---

## 7. Dudas pendientes

| ID | Duda | Responsable | Fecha límite propuesta |
| --- | --- | --- | --- |
| D-01 | ~~Plataforma del MVP~~ **Resuelta (15/10/2026):** web adaptable (React + Vite) en lugar de React Native, porque cubre los dos diseños de Figma con un solo código y el piloto se comparte con un enlace (plan.md §2). **Actualizada (16/10/2026, DEC-01):** sigue siendo web con React + Vite, pero **solo con el diseño móvil**. | Todo el equipo | Antes de empezar T-01 |
| D-02 | ~~Mi Plato~~ **Resuelta (15/10/2026):** fuera del MVP, como primera mejora futura; el Figma solo prototipa Mi Rutina. | Todo el equipo | — |
| D-03 | **Persona:** la ideación usa a «Rosa, 78 años» y el Figma a «Carmen». Unificar en todos los documentos y pantallas. | G0X-02 | Antes de entregar |
| D-04 | **Datos de demostración · decidido (15/10/2026):** «Próximamente» sin cifras (RF-19). Pendiente: actualizar las tarjetas de Inicio en Figma. | G0X-02 | Fase de desarrollo |
| D-05 | **«Hoy tengo dolor o no puedo»:** el Figma no define a qué pantalla lleva. El spec propone un mensaje en Inicio (RF-14). Confirmar o diseñar la pantalla. | G0X-02 | Fase de desarrollo |
| D-06 | **Nombre en el saludo:** el Figma muestra «Buenos días, Carmen», pero sin cuentas no hay nombre. ¿Saludo sin nombre o un campo opcional guardado en el dispositivo? | Todo el equipo | Fase de desarrollo |
| D-07 | **Contador de repeticiones / temporizador de 30 s:** ¿ayudan a la usuaria o la presionan? Decidir tras el test de usabilidad. | G0X-03 | Tras T-20 |
| D-08 | **Pendientes del Figma:** test con una persona que no haya construido el diseño, revisión en Present, retorno de Hover de Button/Primary, acceso del docente al archivo y recurso Community. | G0X-02 | Antes de entregar |
| D-09 | **Grafía de un nombre del equipo en Figma:** estaba mal escrito. Resuelto en la entrega final: los documentos usan solo códigos G0X-NN (protección de datos del enunciado). | G0X-02 | ✔ Resuelta |
| D-10 | **Texto de los pasos del ejercicio:** validar con una fuente fiable (fisioterapeuta o guía oficial de ejercicio para mayores) antes del piloto. | G0X-03 | Antes de T-20 |
| D-11 | **DEC-01 (solo móvil):** pendiente de que G0X-02 y G0X-03 lo confirmen y de actualizar plan.md y tasks.md. | Todo el equipo | Antes de empezar T-02 |

---

## 8. Trazabilidad

| Requisito | Pantalla de Figma | Tareas |
| --- | --- | --- |
| RF-01 | Inicio/Mobile | T-08 |
| ~~RF-02, RF-03~~ | ~~Preparación/Desktop~~ | Fuera de alcance (DEC-01) |
| RF-04 | Ejercicio/Mobile | T-10 |
| RF-05 | Ejercicio/Mobile | T-05, T-10 |
| RF-06, RF-07, RF-08 | ConfirmarRegistro/Mobile | T-11, T-16 |
| RF-09, RF-10, RF-11 | AvisoDolor/Mobile, SesiónPausada/Mobile | T-12, T-17 |
| RF-12 | SesiónRegistrada (botón «Avisar a la familia») | T-13 |
| RF-13 | Inicio | T-06, T-08 |
| RF-14 | Inicio (acción «Hoy tengo dolor o no puedo») | T-08 |
| RF-15, RF-16 | ConfirmarRegistro | T-06, T-11, T-14 |
| RF-17 | — (navegación) | T-15 |
| RF-18 | — (datos) | T-06 |
| RF-19 | Inicio, navegación | T-07, T-08 |
| RNF-01 … RNF-12 | Todas | T-02, T-03, T-04, T-18, T-19 |
