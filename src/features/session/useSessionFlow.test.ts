import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { list } from '../../data/sessionRepository';
import { useSessionFlow } from './useSessionFlow';

describe('useSessionFlow · máquina de estados (plan.md §3.1)', () => {
  it('empieza en «exercising»', () => {
    const { result } = renderHook(() => useSessionFlow());
    expect(result.current.state).toBe('exercising');
  });

  it('RF-06: «Terminar ejercicio» abre la confirmación', () => {
    const { result } = renderHook(() => useSessionFlow());
    act(() => result.current.finish());
    expect(result.current.state).toBe('confirming');
  });

  it('RF-08: Cancelar vuelve al ejercicio y no guarda ningún registro', () => {
    const { result } = renderHook(() => useSessionFlow());
    act(() => result.current.finish());
    act(() => result.current.cancel());

    expect(result.current.state).toBe('exercising');
    expect(list()).toHaveLength(0);
  });

  it('RF-07: confirmar guarda y pasa a «registered»', () => {
    const { result } = renderHook(() => useSessionFlow());
    act(() => result.current.finish());
    act(() => result.current.confirmSave());

    expect(result.current.state).toBe('registered');
    expect(list()).toHaveLength(1);
  });

  it('RF-15: si el guardado falla, queda en «saveError» y no navega', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('bloqueado');
    });
    const { result } = renderHook(() => useSessionFlow());
    act(() => result.current.finish());
    act(() => result.current.confirmSave());

    expect(result.current.state).toBe('saveError');
    setItem.mockRestore();
  });

  it('RF-15: desde el error se puede reintentar y acabar registrada', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
      throw new Error('bloqueado');
    });
    const { result } = renderHook(() => useSessionFlow());
    act(() => result.current.finish());
    act(() => result.current.confirmSave());
    expect(result.current.state).toBe('saveError');

    act(() => result.current.confirmSave());
    expect(result.current.state).toBe('registered');
    setItem.mockRestore();
  });

  it('RF-09 (CA-09.1): «Me duele» no guarda nada', () => {
    const { result } = renderHook(() => useSessionFlow());
    act(() => result.current.reportPain());

    expect(result.current.state).toBe('pain');
    expect(list()).toHaveLength(0);
  });

  it('RF-10: pausar lleva a «paused» sin crear registro', () => {
    const { result } = renderHook(() => useSessionFlow());
    act(() => result.current.reportPain());
    act(() => result.current.pause());

    expect(result.current.state).toBe('paused');
    expect(list()).toHaveLength(0);
  });

  it('RF-11: cerrar el aviso de dolor vuelve al ejercicio sin registrar', () => {
    const { result } = renderHook(() => useSessionFlow());
    act(() => result.current.reportPain());
    act(() => result.current.cancel());

    expect(result.current.state).toBe('exercising');
    expect(list()).toHaveLength(0);
  });

  it('RF-16 (CL-01): una segunda confirmación mientras guarda no crea otro registro', () => {
    const { result } = renderHook(() => useSessionFlow());
    act(() => result.current.finish());
    act(() => {
      result.current.confirmSave();
      result.current.confirmSave();
    });

    expect(list()).toHaveLength(1);
  });
});
