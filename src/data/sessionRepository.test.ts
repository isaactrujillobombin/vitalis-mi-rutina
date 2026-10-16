import { describe, expect, it, vi } from 'vitest';
import { clear, list, save } from './sessionRepository';

const KEY = 'vitalis.sessionRecords.v1';

describe('sessionRepository', () => {
  it('RF-07: guarda un registro completado con fecha y hora', () => {
    const result = save();

    expect(result.ok).toBe(true);
    const records = list();
    expect(records).toHaveLength(1);
    expect(records[0]?.exerciseId).toBe('sit-to-stand');
    expect(records[0]?.status).toBe('completed');
    expect(Number.isNaN(Date.parse(records[0]?.completedAt ?? ''))).toBe(false);
  });

  it('RF-07 (CA-07.1): el registro sigue ahí al volver a leer', () => {
    save();
    expect(list()).toHaveLength(1);
    expect(list()).toHaveLength(1);
  });

  it('RF-07: solo guarda el ejercicio, el estado y la fecha (P-1, minimización)', () => {
    save();
    expect(Object.keys(list()[0] ?? {}).sort()).toEqual([
      'completedAt',
      'exerciseId',
      'id',
      'schemaVersion',
      'status',
    ]);
  });

  it('CL-06: permite una segunda sesión el mismo día', () => {
    save();
    save();
    expect(list()).toHaveLength(2);
  });

  it('RF-18: si el JSON está dañado, devuelve lista vacía y no lanza', () => {
    window.localStorage.setItem(KEY, 'esto no es JSON');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    expect(list()).toEqual([]);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('RF-18: descarta los registros que no cumplen el formato', () => {
    window.localStorage.setItem(KEY, JSON.stringify([{ id: 'x' }, { nada: true }]));
    expect(list()).toEqual([]);
  });

  it('RF-18: si lo guardado no es una lista, devuelve lista vacía', () => {
    window.localStorage.setItem(KEY, JSON.stringify({ no: 'es una lista' }));
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    expect(list()).toEqual([]);
    warn.mockRestore();
  });

  it('RF-15 (CL-02): si el almacenamiento falla, devuelve error en vez de lanzar', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    const result = save();

    expect(result.ok).toBe(false);
    expect(result).toMatchObject({ error: 'storage-unavailable' });
    setItem.mockRestore();
  });

  it('clear() deja el almacenamiento vacío', () => {
    save();
    clear();
    expect(list()).toEqual([]);
  });
});
