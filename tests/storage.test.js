import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  saveGameState,
  loadGameState,
  clearGameState,
  hasSavedGame,
  STORAGE_KEY,
} from '../src/utils/storage.js';

describe('Storage Modülü (storage.js)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('Oyun durumunu geçerli şema ile localStorage\'a kaydeder (Senaryo 7 hazırlığı)', () => {
    const mockState = {
      currentNodeId: 'node_inspect_desk',
      collectedClueIds: ['clue_broken_clock'],
      decisionHistory: [{ choiceId: 'choice_arrival_inspect_desk', text: 'Masa incelendi' }],
      gameStatus: 'playing',
      currentEnding: null,
    };

    const saved = saveGameState(mockState);
    expect(saved).toBe(true);

    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw);
    expect(parsed.data.currentNodeId).toBe('node_inspect_desk');
    expect(parsed.data.collectedClueIds).toContain('clue_broken_clock');
  });

  it('Kayıtlı oyun durumunu başarıyla geri yükler (Senaryo 7: Oyun kaydı yüklenebiliyor)', () => {
    const stateToSave = {
      currentNodeId: 'node_inspect_balcony',
      collectedClueIds: ['clue_broken_clock', 'clue_muddy_footprints'],
      decisionHistory: [],
      gameStatus: 'playing',
      currentEnding: null,
    };

    saveGameState(stateToSave);
    const loaded = loadGameState();

    expect(loaded).not.toBeNull();
    expect(loaded.currentNodeId).toBe('node_inspect_balcony');
    expect(loaded.collectedClueIds).toHaveLength(2);
    expect(loaded.collectedClueIds).toContain('clue_muddy_footprints');
    expect(hasSavedGame()).toBe(true);
  });

  it('Bozuk veya geçersiz localStorage verisi durumunda uygulamayı çökertmez ve null döner (Senaryo 8)', () => {
    // 1. Durum: Geçersiz JSON string
    localStorage.setItem(STORAGE_KEY, '{{bozuk-json-verisi%%');
    expect(() => loadGameState()).not.toThrow();
    expect(loadGameState()).toBeNull();

    // 2. Durum: data objesi eksik veya geçersiz tip
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, data: null }));
    expect(loadGameState()).toBeNull();

    // 3. Durum: currentNodeId string değil
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, data: { currentNodeId: 12345 } })
    );
    expect(loadGameState()).toBeNull();

    // 4. Durum: localStorage hatası (örn. quota exceeded / güvenlik kısıtı)
    vi.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() => {
      throw new Error('SecurityError: Access denied');
    });
    expect(() => loadGameState()).not.toThrow();
    expect(loadGameState()).toBeNull();
  });

  it('Oyunu sıfırlama işlemi localStorage kaydını temizler (Senaryo 9)', () => {
    saveGameState({
      currentNodeId: 'node_inspect_fireplace',
      collectedClueIds: ['clue_torn_ledger'],
      decisionHistory: [],
      gameStatus: 'playing',
    });

    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();

    const cleared = clearGameState();
    expect(cleared).toBe(true);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(hasSavedGame()).toBe(false);
  });
});
