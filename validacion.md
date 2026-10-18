# validacion.md · Vitalis — Mi Rutina

> Qué se ha comprobado del MVP, cómo, con qué resultado y dónde está la evidencia.
> Fecha de la validación: **19/10/2026** (actualizada para la entrega final) · Commit validado: el de esta misma entrega.
> Documentos de referencia: [docs/spec.md](docs/spec.md) · [docs/constitution.md](docs/constitution.md) · [docs/tasks.md](docs/tasks.md)

## 0. Cómo reproducir todo esto

```bash
npm install
npx playwright install chromium webkit   # solo la primera vez
npm run check                            # lint + tipos + contraste + unitarios + e2e
```

`npm run check` es lo que genera todas las evidencias de este documento. Cada test lleva en su nombre el ID del requisito que valida (regla C-2), así que la columna «Evidencia» se puede buscar literalmente en la salida.

## 1. Resumen

| Comprobación | Herramienta | Resultado |
| --- | --- | --- |
| Lint y accesibilidad al escribir | ESLint 9 + jsx-a11y | **0 avisos** |
| Tipos | TypeScript 5.9 `strict` | **0 errores** |
| Contraste de los tokens | `scripts/check-contrast.mjs` | **18/18 pares** cumplen |
| Unitarios y de componentes | Vitest + Testing Library | **57/57 pasan** |
| End-to-end | Playwright · perfil Android (Chromium) | **28/28 pasan** |
| End-to-end | Playwright · perfil iPhone (WebKit) | **28/28 pasan** en la última ejecución completa · 2 tests inestables (ver §9) |
| Accesibilidad automática | @axe-core/playwright, 6 pantallas | **0 violaciones** *serious* / *critical* |
| Build de producción | Vite 7 | **correcto** |
| Rendimiento y accesibilidad | Lighthouse 12.2.1 · móvil, build de producción | **Rendimiento 100 · Accesibilidad 100 · Buenas prácticas 100** · [informe](docs/lighthouse/inicio-movil.report.html) |

**Total: 113 comprobaciones automáticas** (57 unitarias + 28 × 2 perfiles de e2e), más el informe de Lighthouse.

**Capturas de evidencia** (390 × 844, generadas con Playwright sobre la app real) en [docs/capturas-app/](docs/capturas-app/):

| Situación | Captura |
| --- | --- |
| Flujo principal: Inicio pendiente → Ejercicio → Confirmar → Registrada → Inicio «Hecha hoy» | [01](docs/capturas-app/01-inicio-pendiente.png) · [02](docs/capturas-app/02-ejercicio.png) · [03](docs/capturas-app/03-confirmar-registro.png) · [04](docs/capturas-app/04-sesion-registrada.png) · [05](docs/capturas-app/05-inicio-hecha-hoy.png) |
| Ruta de dolor: «Me duele» → Sesión pausada | [06](docs/capturas-app/06-me-duele.png) · [07](docs/capturas-app/07-sesion-pausada.png) |
| **Caso de error** (RF-15): el almacenamiento falla al guardar y aparece «Reintentar» | [08](docs/capturas-app/08-error-guardado.png) |
| «Hoy tengo dolor o no puedo» (RF-14) | [09](docs/capturas-app/09-hoy-no-puedo.png) |

---

## 2. Flujo principal

La tarea que el MVP tiene que permitir: completar y registrar una sesión sin ayuda.

| Paso | Requisito | Comprobación | Resultado | Evidencia (nombre del test) |
| --- | --- | --- | --- | --- |
| Inicio muestra la sesión del día como «Pendiente» | RF-01, CA-01.1 | e2e + componente | ✅ | `RF-01: Inicio muestra la sesión del día como pendiente` |
| El saludo cambia según la hora | CA-01.2 | componente, 4 franjas horarias | ✅ | `CA-01.2: saluda «Buenos días» a las 10:00` (y 15:00, 22:00, 03:00) |
| «Empezar ahora» lleva al ejercicio | RF-04 | e2e | ✅ | `RF-04 (S-4): la preparación se ve antes que los pasos` |
| La preparación se ve **antes** que los pasos | RF-04, S-4 | e2e (compara posición en pantalla) + componente | ✅ | mismo test; mide la `y` de ambos títulos |
| La guía muestra pasos numerados e insignias | RF-05, CA-05.1 | componente | ✅ | `CA-05.1: los pasos son una lista ordenada` |
| «Terminar ejercicio» pide confirmación | RF-06 | e2e + componente | ✅ | `RF-06: «Terminar ejercicio» abre la confirmación` |
| Confirmar guarda y muestra «Sesión registrada» | RF-07 | e2e | ✅ | `RF-07 y RF-13 (CA-07.1): registrar y que siga ahí tras recargar` |
| El registro sobrevive a recargar la página | CA-07.1 | e2e | ✅ | mismo test |
| Inicio pasa a «Hecha hoy» con la hora | RF-13 | e2e + unitario | ✅ | `RF-13: con un registro de hoy, aparece como hecha y con su hora` |
| Todo el flujo se puede hacer solo con teclado | RNF-05 | e2e | ✅ | `RNF-05: el flujo completo se hace solo con teclado` |

---

## 3. Caso de error · RF-15, el almacenamiento falla

**Qué simula:** el móvil no deja guardar (almacenamiento lleno, bloqueado o Safari en modo privado). Es el caso límite **CL-02**.

**Cómo se provoca:** se sustituye `localStorage.setItem` por una función que lanza una excepción.

| Qué se comprueba | Resultado | Evidencia |
| --- | --- | --- |
| `save()` devuelve `{ ok: false }` en vez de lanzar y romper la app | ✅ | `RF-15 (CL-02): si el almacenamiento falla, devuelve error en vez de lanzar` |
| El flujo se queda en `saveError`, **no** navega a «Sesión registrada» | ✅ | `RF-15: si el guardado falla, queda en «saveError» y no navega` |
| La ventana sigue abierta y muestra el aviso exacto del spec | ✅ | `RF-15: si el guardado falla, se ve el aviso y no se navega` |
| El aviso usa `role="alert"`, así que el lector de pantalla lo anuncia | ✅ | `RF-15: con error, avisa en un role="alert" y ofrece «Reintentar»` |
| «Reintentar» funciona cuando el almacenamiento vuelve a ir bien | ✅ | `RF-15: desde el error se puede reintentar y acabar registrada` |

Texto comprobado literalmente: «No hemos podido guardar la sesión. Inténtalo de nuevo.»

---

## 4. Caso límite · CL-01, doble pulsación en «Sí, registrar sesión»

**Por qué importa:** la usuaria objetivo tiene poca experiencia digital; la doble pulsación involuntaria es frecuente. RF-16 existe para que eso **no** cree dos registros.

**🐛 Aquí el test encontró un fallo real.** La primera versión de `useSessionFlow` se fiaba del estado del reducer para bloquear la segunda llamada. Pero React no actualiza ese estado hasta el siguiente render, así que **las dos llamadas veían el mismo estado y guardaban las dos**. El botón desactivado tapaba el síntoma en la interfaz, pero la lógica estaba mal: cualquier otra forma de llamar a `confirmSave()` habría duplicado el registro.

| Qué se comprueba | Antes de corregir | Después | Evidencia |
| --- | --- | --- | --- |
| Dos llamadas seguidas a `confirmSave()` crean **un** registro | ❌ creaba 2 | ✅ crea 1 | `RF-16 (CL-01): una segunda confirmación mientras guarda no crea otro registro` |
| El botón se desactiva mientras guarda | ✅ | ✅ | `RF-16 (CL-01): mientras guarda, el botón está desactivado` |
| Una doble pulsación real solo lanza un guardado | ✅ | ✅ | `RF-16: una doble pulsación solo lanza un guardado` |
| Se puede registrar una segunda sesión **a propósito** | ✅ | ✅ | `CL-06: se permite una segunda sesión el mismo día` |

**Corrección:** una marca con `useRef` que se pone de forma síncrona y solo se libera si el guardado falla, para que «Reintentar» siga valiendo. Está comentado en [src/features/session/useSessionFlow.ts](src/features/session/useSessionFlow.ts).

---

## 5. Otros casos límite comprobados

| ID | Situación | Resultado | Evidencia |
| --- | --- | --- | --- |
| CL-03 | Los datos guardados están dañados | ✅ se ignoran, aparece «Pendiente», la app no se bloquea | `RF-18 (CL-03): con datos dañados, la app arranca y muestra «Pendiente»` |
| CL-04 | Recargar en mitad del ejercicio | ✅ vuelve a Ejercicio, sin crear registro | `CL-04: recargar en mitad del ejercicio no crea ningún registro` |
| CL-05 | Abrir directamente `/rutina/registrada` o `/rutina/pausada` | ✅ redirige a Inicio | `RF-17 (CL-05): entrar directo a las pantallas de resultado lleva a Inicio` |
| CL-06 | Segunda sesión el mismo día | ✅ se permite, se guardan 2 | `CL-06: permite una segunda sesión el mismo día` |
| CL-07 | Registrada a las 23:59, abierta a las 00:01 | ✅ vuelve a «Pendiente» | `CL-07: registrada a las 23:59, consultada a las 00:01 del día siguiente, vuelve a pendiente` |
| CL-08 | «Me duele» → «Volver sin registrar» | ✅ Inicio igual que antes, sin registro | `CL-08: «Me duele» → «Volver sin registrar» deja Inicio como estaba` |

---

## 6. Ruta de dolor y pausa · la que no puede fallar

| Requisito | Comprobación | Resultado | Evidencia |
| --- | --- | --- | --- |
| RF-09 | «Me duele» abre el aviso y **no** guarda nada (CA-09.1) | ✅ | `RF-09: «Me duele» abre el aviso y no guarda nada (CA-09.1)` |
| RF-10 | «Pausar sesión» lleva a SesiónPausada sin registro | ✅ | `RF-09 y RF-10: «Me duele» → «Pausar sesión» lleva a SesiónPausada sin registrar` |
| RF-10, CA-10.2 | El estado se comunica con icono **y** texto | ✅ | se comprueba el texto «No registrada como completada» |
| RF-11 | «Volver sin registrar» deja Inicio como estaba | ✅ | `CL-08: …` |
| RF-14 | «Hoy tengo dolor o no puedo» valida el descanso, sin guardar | ✅ | `RF-14: «Hoy tengo dolor o no puedo» valida el descanso y no registra nada` |
| **S-1** | **«Me duele» visible sin desplazarse en 390 × 844** | ✅ | `S-1 (CA-05.3): «Me duele» se ve sin desplazarse` (usa `toBeInViewport`) |
| **S-2** | **La pausa no castiga: sin rachas ni mensajes de fracaso** | ✅ | `S-2: la pantalla de pausa no castiga ni habla de rachas` |
| **S-3**, RNF-10 | El aviso de salud está visible | ✅ | `RNF-10 (S-3): el aviso de salud está visible` |
| **S-5** | Ningún texto anima a hacer más repeticiones | ✅ | `S-5: ningún texto anima a hacer más repeticiones` |

---

## 7. Accesibilidad

| Requisito | Comprobación | Resultado |
| --- | --- | --- |
| RNF-06 | axe-core en las 6 pantallas (Inicio, Ejercicio, ConfirmarRegistro, AvisoDolor, SesiónRegistrada, SesiónPausada) | ✅ **0 violaciones** *serious* / *critical* |
| RNF-01, A-1 | Todos los botones visibles del flujo miden ≥ 48 × 48 px (medido en el navegador) | ✅ |
| RNF-02, A-2 | El texto de cuerpo mide ≥ 18 px | ✅ 18 px |
| RNF-03, A-3 | 15 pares texto/fondo ≥ 4,5:1 y bordes ≥ 3:1 | ✅ el más justo: botón principal **5,41:1** |
| RNF-05 | Las ventanas usan `<dialog>`: retienen el foco y Esc cierra | ✅ `RF-08 (RNF-05): Esc cancela la confirmación` |
| RNF-05 | La ventana tiene nombre accesible desde su título | ✅ `RNF-05: la ventana tiene nombre accesible a partir de su título` |
| RNF-07 | Sin desplazamiento horizontal a 320, 390 y 768 px | ✅ |
| RNF-12 | Botones e iconos con nombre accesible; los decorativos ocultos | ✅ cubierto por axe |

---

## 8. Privacidad

| Requisito | Comprobación | Resultado |
| --- | --- | --- |
| RNF-08, P-3 | Un test recorre el flujo y **falla si aparece cualquier petición a otro dominio** | ✅ 0 peticiones externas |
| P-1 | Lo guardado tiene exactamente 5 campos: `id`, `exerciseId`, `status`, `completedAt`, `schemaVersion` | ✅ comprobado en unitario y en e2e |
| P-2 | No hay cookies, ni propias ni de terceros | ✅ `P-2: no hay cookies propias ni de terceros` |
| P-4 | «Avisar a la familia» usa la hoja del sistema; la app no toca contactos | ⚠️ **ver §9** |
| P-7 | Sin credenciales en el repositorio; `.env` en `.gitignore` y `.env.example` sin valores | ✅ |

---

## 9. Lo que NO se ha podido validar

Esta sección es tan importante como las anteriores. Nada de lo de aquí debe darse por bueno.

| Qué | Por qué | Cómo se cerrará |
| --- | --- | --- |
| **RF-12 · «Avisar a la familia»** | La Web Share API no se puede ejercitar de verdad en un navegador automatizado: la hoja de compartir la pinta el sistema operativo, fuera de la página. Solo está comprobado que el botón existe. | Prueba manual en un móvil real (Android e iPhone), apuntada para T-13. La alternativa WhatsApp + copiar tampoco está probada. |
| **Test con usuarias reales (T-20)** | No se ha hecho todavía. **El indicador de éxito del MVP (2 de cada 3 personas completan la tarea sin instrucciones de clic) está sin medir.** | Sesión con 1-2 personas de 65+ años con el guion de `08_Test` de Figma. |
| **Pasos del ejercicio (D-10, S-6)** | Los ha redactado el equipo; **no los ha validado un fisioterapeuta ni una guía oficial**. Es un riesgo físico, no de software. | Validación con fuente fiable antes del piloto. Bloquea T-20. |
| **Lector de pantalla** | axe detecta fallos de marcado, pero no si la experiencia con VoiceOver o TalkBack se entiende. | Recorrido manual con lector, apuntado en T-18. |
| **Zoom al 200 % y escala de grises** | Comprobaciones manuales que aún no se han hecho. | Lista firmada en el PR de T-18. |
| **Tests e2e inestables en WebKit** | `RNF-05: el flujo completo se hace solo con teclado` y `RNF-01 (A-1): todos los botones del flujo miden 48 px o más` fallan de forma intermitente en el perfil iPhone (son problemas de tiempos del test, no de la app: también fallaban antes del rediseño). No se han desactivado (regla 8 de AGENTS.md). | Esperar a que la navegación termine antes de tabular y de medir. |
| **Lighthouse solo en Inicio** | Se ha medido la pantalla de Inicio con el build de producción. El resto de pantallas no se pueden abrir directamente (RF-17 redirige a Inicio). | Medición manual recorriendo el flujo con DevTools. |
| **Tokens de color contra Figma** | Los hex salen de las capturas, no de las variables del archivo: el conector de Figma agotó el límite de llamadas del plan Starter. **El contraste sí está verificado**, pero el parecido con el diseño no. | T-02b. |
| **DEC-01 (solo móvil)** | Decisión aplicada al código pero **pendiente de que la confirmen los otros dos integrantes** y de comentarla con el docente. | T-00b. |
| **Navegadores reales** | Probado en los motores Chromium y WebKit que trae Playwright, no en móviles físicos. | Durante T-20. |

---

## 10. Trazabilidad: requisito → validación

| Requisito | ¿Validado? | Dónde |
| --- | --- | --- |
| RF-01 | ✅ automático | e2e + `HomePage.test.tsx` |
| RF-02, RF-03 | ➖ fuera de alcance | DEC-01 (solo móvil) |
| RF-04 | ✅ automático | e2e + `ExercisePage.test.tsx` |
| RF-05 | ✅ automático | `ExercisePage.test.tsx` |
| RF-06 | ✅ automático | e2e + `ConfirmRegistrationModal.test.tsx` |
| RF-07 | ✅ automático | e2e + `sessionRepository.test.ts` |
| RF-08 | ✅ automático | e2e (clic y Esc) |
| RF-09 | ✅ automático | e2e + componente |
| RF-10 | ✅ automático | e2e |
| RF-11 | ✅ automático | e2e |
| RF-12 | ⚠️ **parcial** | solo existencia del botón · ver §9 |
| RF-13 | ✅ automático | e2e + `useTodayStatus.test.ts` |
| RF-14 | ✅ automático | e2e + componente |
| RF-15 | ✅ automático | 5 tests · ver §3 |
| RF-16 | ✅ automático | 3 tests · ver §4 (bug encontrado y corregido) |
| RF-17 | ✅ automático | e2e |
| RF-18 | ✅ automático | 3 unitarios + e2e |
| RF-19 | ✅ automático | `HomePage.test.tsx` (comprueba que no hay cifras) |
| RNF-01 a RNF-08 | ✅ automático | ver §7 y §8 |
| RNF-09 | ✅ automático | Lighthouse móvil: Rendimiento 100, Accesibilidad 100 · [informe](docs/lighthouse/inicio-movil.report.html) |
| RNF-10, RNF-11 | ✅ / ⚠️ | el aviso sí; la revisión de lenguaje la hacen dos personas (T-05) |
| RNF-12 | ✅ parcial | axe sí; lector de pantalla no |
