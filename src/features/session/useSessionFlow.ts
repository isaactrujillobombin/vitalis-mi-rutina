import { useCallback, useReducer } from 'react';
import { save } from '../../data/sessionRepository';

/**
 * Máquina de estados del flujo (plan.md §3.1), reducida a móvil por DEC-01.
 * Solo la transición «guardando → registrada» escribe en el almacenamiento.
 */
export type FlowState =
  | 'exercising'
  | 'confirming'
  | 'saving'
  | 'saveError'
  | 'pain'
  | 'registered'
  | 'paused';

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

  /** RF-07 y RF-15: guarda y decide a qué estado vamos según el resultado. */
  const confirmSave = useCallback(() => {
    dispatch({ type: 'SAVE_START' });
    const result = save();
    dispatch({ type: result.ok ? 'SAVE_OK' : 'SAVE_FAIL' });
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
