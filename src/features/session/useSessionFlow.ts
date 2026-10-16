import { useCallback, useReducer, useRef } from 'react';
import { save } from '../../data/sessionRepository';

/**
 * Máquina de estados del flujo (plan.md §3.1), reducida a móvil por DEC-01.
 * Solo la transición «guardando → registrada» escribe en el almacenamiento.
 */
export type FlowState =
  'exercising' | 'confirming' | 'saving' | 'saveError' | 'pain' | 'registered' | 'paused';

type Action =
  | { type: 'FINISH' } // «Terminar ejercicio»
  | { type: 'CANCEL' } // «Cancelar» o Esc
  | { type: 'SAVE_START' } // «Sí, registrar sesión»
  | { type: 'SAVE_OK' }
  | { type: 'SAVE_FAIL' }
  | { type: 'PAIN' } // «Me duele»
  | { type: 'PAUSE' } // «Pausar sesión»
  | { type: 'BACK_TO_EXERCISE' };

function reducer(state: FlowState, action: Action): FlowState {
  switch (action.type) {
    case 'FINISH':
      return state === 'exercising' ? 'confirming' : state;
    case 'CANCEL':
      // RF-08 y CA-09.1: cancelar nunca guarda nada.
      return state === 'confirming' || state === 'saveError' || state === 'pain'
        ? 'exercising'
        : state;
    case 'SAVE_START':
      // RF-16: desde 'saving' se ignora una segunda pulsación.
      return state === 'confirming' || state === 'saveError' ? 'saving' : state;
    case 'SAVE_OK':
      return state === 'saving' ? 'registered' : state;
    case 'SAVE_FAIL':
      return state === 'saving' ? 'saveError' : state;
    case 'PAIN':
      return state === 'exercising' ? 'pain' : state;
    case 'PAUSE':
      return state === 'pain' ? 'paused' : state;
    case 'BACK_TO_EXERCISE':
      return 'exercising';
    default:
      return state;
  }
}

export function useSessionFlow() {
  const [state, dispatch] = useReducer(reducer, 'exercising' as FlowState);

  /**
   * RF-16 (CL-01): el estado del reducer no se actualiza hasta el siguiente render,
   * así que dos llamadas seguidas a confirmSave() verían las dos `state === 'confirming'`
   * y guardarían dos veces. Esta marca se pone al instante y es la que de verdad
   * impide el doble registro. El botón desactivado es la segunda defensa, no la única.
   */
  const savingRef = useRef(false);

  /** RF-07 y RF-15: guarda y decide a qué estado vamos según el resultado. */
  const confirmSave = useCallback(() => {
    if (savingRef.current) return;
    savingRef.current = true;

    dispatch({ type: 'SAVE_START' });
    const result = save();
    dispatch({ type: result.ok ? 'SAVE_OK' : 'SAVE_FAIL' });

    // Solo se libera si ha fallado, para que «Reintentar» funcione (RF-15).
    // Si ha ido bien, la marca se queda puesta: no hay forma de registrar dos veces.
    if (!result.ok) savingRef.current = false;
  }, []);

  return {
    state,
    finish: () => dispatch({ type: 'FINISH' }),
    cancel: () => dispatch({ type: 'CANCEL' }),
    reportPain: () => dispatch({ type: 'PAIN' }),
    pause: () => dispatch({ type: 'PAUSE' }),
    backToExercise: () => dispatch({ type: 'BACK_TO_EXERCISE' }),
    confirmSave,
  };
}
