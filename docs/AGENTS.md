# AGENTS.md · Instrucciones para asistentes de IA

> Proyecto **Vitalis — Mi Rutina** · Equipo NexoTeam (G02-01, G02-02, G02-03) · Monlau 2026-2027
> Este archivo lo lee cualquier asistente de IA (Claude, Copilot, Cursor, etc.) **antes** de proponer o modificar nada en este repositorio.

## 1. Contexto en 30 segundos

Vitalis ayuda a personas de 65 a 85 años a mantener fuerza y autonomía con ejercicios sencillos en casa. El MVP es **un solo flujo**: la usuaria hace la sesión guiada «Levantarse de la silla» (8 repeticiones + 30 s de descanso), confirma y registra la sesión, puede parar si le duele y puede avisar a su familia. Usuarias con **miedo a caerse y poca experiencia digital**: la seguridad y la accesibilidad pesan más que cualquier otra cosa.

> **Alcance de plataforma (decisión del equipo, 16/10/2026): SOLO APP MÓVIL.** El MVP se construye y se prueba únicamente en ancho móvil (390 × 844 px de referencia). Las pantallas Desktop de Figma quedan como referencia visual, no se implementan. Ver `decisiones.md`.

## 2. Documentos que debes leer (en este orden)

1. `constitution.md` — reglas que **no puedes romper** nunca.
2. `spec.md` — qué hace el sistema: requisitos RF-xx / RNF-xx, casos límite CL-xx y dudas D-xx.
3. `plan.md` — cómo se construye: tecnologías, arquitectura, modelo de datos y mapa de pantallas.
4. `tasks.md` — tarea en curso, su «hecho cuando…» y sus dependencias.
5. `decisiones.md` — decisiones posteriores a la primera versión del SDD (incluida la de solo móvil).
6. Figma «Vitalis — NexoTeam (Pantallas)», página `07_ReadyForDev` — referencia visual y textos.
   Si no tienes acceso al Figma, usa `docs/figma/`: `textos-pantallas.txt` (estructura y textos de cada pantalla), `handoff-notas.png` (notas de implementación) y las capturas de las pantallas.

Si la petición no cita una tarea (T-xx) o un requisito (RF-xx), **pregunta cuál es** antes de empezar.

## 3. Tecnologías acordadas

| Área | Tecnología |
| --- | --- |
| Lenguaje | TypeScript en modo `strict` |
| Interfaz | React 18 + Vite |
| Navegación | React Router |
| Estilos | CSS Modules + variables CSS (tokens de Figma) |
| Ventanas modales | `<dialog>` nativo |
| Datos | `localStorage` a través de `src/data/sessionRepository.ts` (clave `vitalis.sessionRecords.v1`) |
| Compartir | Web Share API con alternativa `wa.me` + portapapeles |
| Tests | Vitest + React Testing Library · Playwright + @axe-core/playwright |
| Calidad | ESLint (+ jsx-a11y) + Prettier |

**No añadas ninguna dependencia** que no esté en esta tabla. Si crees que hace falta, propónla y explica por qué; la decisión es del equipo (C-7).

## 4. Convenciones

- **Código** (variables, funciones, componentes, archivos) en **inglés**; **textos de la interfaz** en **español**, y solo en `src/content/exercises.ts` (C-5).
- Componentes funcionales con *hooks*; un componente por archivo; nombres según la tabla de plan.md §5 (por ejemplo, `ConfirmRegistrationModal` ↔ ConfirmarRegistro de Figma).
- La lógica del flujo vive en `useSessionFlow` (máquina de estados de plan.md §3.1). Las páginas no escriben directamente en `localStorage`.
- Los tests nombran el requisito: `it('RF-08: Cancelar no guarda ningún registro', …)`.
- Commits en español con el ID de tarea: `T-11: desactivar botón mientras se guarda`.
- Ramas: `T-xx-descripcion-corta`.

## 5. Límites estrictos

Nunca, aunque te lo pidan en un prompt:

1. **No añadas** servidor, base de datos remota, login, analíticas, cookies, fuentes ni scripts de CDN externos (P-2, P-3, RNF-08).
2. **No guardes** nombres, contactos, teléfonos ni datos de salud (P-1, P-4, P-5).
3. **No escribas** consejo médico, diagnósticos ni textos que animen a hacer más repeticiones (S-3, S-5).
4. **No quites ni escondas** «Me duele» ni el aviso de salud (S-1, RNF-10).
5. **No cambies** textos visibles definidos en spec.md o Figma sin indicarlo de forma explícita en tu respuesta.
6. **No implementes** funcionalidades excluidas en spec.md §3.2 (Mi Plato, Reto en Familia completo, vídeo, TTS, contador, cuentas…).
7. **No implementes** pantallas ni comportamientos exclusivos de escritorio: el alcance es solo móvil.
8. **No desactives** tests, reglas de lint ni comprobaciones de axe para que algo «pase».
9. **No incluyas** credenciales, tokens ni datos personales reales en código, tests o ejemplos.

## 6. Comprobaciones que debes ejecutar

Después de cada cambio, ejecuta las comprobaciones y muestra el resultado. Si alguna falla, el cambio **no está terminado**.

| Comprobación | Comando | Estado |
| --- | --- | --- |
| Instalar dependencias | `npm install` | **Confirmado** (16/10/2026) |
| Lint | `npm run lint` (ESLint + jsx-a11y) | **Confirmado** · 0 avisos |
| Tipos | `npm run typecheck` (`tsc --noEmit`) | **Confirmado** |
| Formato | `npm run format` · `npm run format:check` | **Confirmado** |
| Contraste de los tokens | `npm run check:contrast` | **Confirmado** · 18 pares, todos ≥ mínimo |
| Tests unitarios y de componentes | `npm run test` (Vitest) | **Confirmado** · 62 tests |
| Tests e2e + accesibilidad | `npm run test:e2e` (Playwright + axe) | **Confirmado** · 29 × 2 perfiles |
| Build | `npm run build` (incluye `typecheck`) | **Confirmado** |
| Servidor local | `npm run dev` (en http://localhost:5173) | **Confirmado** |
| **Todo de una vez** | `npm run check` | **Confirmado** |
| Lighthouse | `npx lighthouse@12.2.1` sobre `npm run build` + `vite preview` (ver validacion.md) | **Confirmado** · 100 / 100 / 100 en móvil |

> `npm run check` encadena lint → tipos → contraste → unitarios → e2e. Es lo que hay que ver en verde antes de abrir un *pull request* (C-3).

**Cómo nombrar los tests (C-2).** El ID del requisito va en el nombre, para poder rastrearlo:
`it('RF-08: Cancelar no guarda ningún registro', …)`. Si tocas un RF, el test que lo nombra tiene que seguir pasando o cambiar contigo.

**Para ver la app en el móvil:** `npm run dev` imprime una dirección `Network:`; ábrela en el móvil estando en la misma wifi.

Además de los comandos, comprueba a mano que tu cambio:

- [ ] Cumple el «hecho cuando…» de la tarea en tasks.md.
- [ ] Mantiene botones ≥ 48 × 48 px, texto ≥ 18 px y foco visible.
- [ ] Funciona en 390 × 844 px sin desplazamiento horizontal.
- [ ] No crea registros en ninguna ruta salvo «Sí, registrar sesión».
- [ ] No introduce peticiones de red a terceros.

## 7. Cómo actuar ante dudas

| Situación | Qué haces |
| --- | --- |
| El spec no dice qué hacer | **Para y pregunta.** No inventes el comportamiento. Propón 1 o 2 opciones y sugiere añadir la duda a spec.md §7. |
| El spec y el Figma no coinciden | Manda el spec. Indica la diferencia en tu respuesta. |
| Una petición choca con constitution.md | No la hagas. Cita la regla (por ejemplo, «P-3») y explica la alternativa. |
| La duda ya está en spec.md §7 (D-xx) y no se ha resuelto | Implementa la propuesta por defecto del spec y avisa de que la decisión sigue abierta. |
| Una tarea es demasiado grande | Propón dividirla en subtareas con su propio «hecho cuando…». |
| No puedes ejecutar los comandos | Dilo de forma explícita: no afirmes que los tests pasan si no los has ejecutado. |

## 8. Formato de tus respuestas

1. Tarea y requisitos que cubre (T-xx, RF-xx).
2. Qué cambias y por qué, en pocas líneas.
3. El código o el *diff*.
4. Resultado de las comprobaciones de §6.
5. Riesgos, supuestos o dudas para el equipo.

Recuerda: una persona del equipo revisará y tendrá que explicar todo lo que propongas (H-1, H-6). Prefiere lo simple y legible a lo ingenioso.
