/**
 * PlotTwist - LocalStorage Güvenli Veri Saklama Modülü
 * Hata korumalı, şema doğrulamalı yerel kayıt yöneticisi.
 */

export const STORAGE_KEY = 'plottwist_savegame_v1';

/**
 * Oyun durumunu localStorage'a güvenli şekilde kaydeder.
 * @param {Object} state - Saklanacak oyun durumu
 * @returns {boolean} Kayıt başarılı mı?
 */
export function saveGameState(state) {
  if (!state || typeof state !== 'object') {
    return false;
  }

  try {
    const serialized = JSON.stringify({
      version: 1,
      savedAt: new Date().toISOString(),
      data: {
        activeCaseId: state.activeCaseId || 'case_red_seal',
        currentNodeId: state.currentNodeId,
        collectedClueIds: Array.isArray(state.collectedClueIds) ? state.collectedClueIds : [],
        decisionHistory: Array.isArray(state.decisionHistory) ? state.decisionHistory : [],
        gameStatus: state.gameStatus || 'playing',
        currentEnding: state.currentEnding || null,
      },
    });
    localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (error) {
    console.warn('[PlotTwist Storage] Kayıt yapılamadı:', error);
    return false;
  }
}

/**
 * localStorage'dan oyun durumunu güvenle yükler.
 * Veri bozuksa veya eski bir formattaysa uygulamayı çökertmeden null döner.
 * @returns {Object|null} Yüklenen durum veya null
 */
export function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.data) {
      return null;
    }

    const { activeCaseId, currentNodeId, collectedClueIds, decisionHistory, gameStatus, currentEnding } = parsed.data;

    if (typeof currentNodeId !== 'string') {
      return null;
    }

    return {
      activeCaseId: typeof activeCaseId === 'string' ? activeCaseId : 'case_red_seal',
      currentNodeId,
      collectedClueIds: Array.isArray(collectedClueIds) ? collectedClueIds : [],
      decisionHistory: Array.isArray(decisionHistory) ? decisionHistory : [],
      gameStatus: typeof gameStatus === 'string' ? gameStatus : 'playing',
      currentEnding: currentEnding || null,
      savedAt: parsed.savedAt || null,
    };
  } catch (error) {
    console.warn('[PlotTwist Storage] Kayıt okuma hatası, varsayılan duruma geçiliyor:', error);
    return null;
  }
}

/**
 * Kayıtlı oyun olup olmadığını kontrol eder.
 * @returns {boolean}
 */
export function hasSavedGame() {
  const loaded = loadGameState();
  return loaded !== null && loaded.gameStatus === 'playing';
}

/**
 * Mevcut oyun kaydını temizler.
 * @returns {boolean}
 */
export function clearGameState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.warn('[PlotTwist Storage] Kayıt temizlenemedi:', error);
    return false;
  }
}
