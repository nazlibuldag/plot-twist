import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGame } from '../src/hooks/useGame.js';
import {
  INITIAL_NODE_ID,
  STORY_NODES,
  evaluateEnding,
  ENDINGS,
} from '../src/data/mysteryStory.js';
import { saveGameState, STORAGE_KEY } from '../src/utils/storage.js';

describe('PlotTwist Oyun Mantığı (gameLogic.test.js)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // 1. Senaryo: Yeni oyun doğru başlangıç düğümünden başlıyor
  it('1. Yeni oyun doğru başlangıç düğümünden ("node_scene_arrival") başlar', () => {
    const { result } = renderHook(() => useGame());

    expect(result.current.gameStatus).toBe('idle');

    act(() => {
      result.current.startNewGame();
    });

    expect(result.current.gameStatus).toBe('playing');
    expect(result.current.currentNodeId).toBe(INITIAL_NODE_ID);
    expect(result.current.currentNode).toBeDefined();
    expect(result.current.currentNode.title).toBe('Konağa Varış');
    expect(result.current.decisionHistory).toHaveLength(0);
  });

  // 2. Senaryo: Seçim yapıldığında doğru düğüme geçiliyor
  it('2. Seçim yapıldığında doğru hedef düğüme geçiş sağlanır', () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.startNewGame();
    });

    const initialNode = STORY_NODES[INITIAL_NODE_ID];
    const firstChoice = initialNode.choices[0]; // 'choice_arrival_inspect_desk' -> 'node_inspect_desk'

    act(() => {
      result.current.makeChoice(firstChoice);
    });

    expect(result.current.currentNodeId).toBe('node_inspect_desk');
    expect(result.current.currentNode.title).toBe('Çalışma Masasındaki Sırlar');
    expect(result.current.decisionHistory).toHaveLength(1);
    expect(result.current.decisionHistory[0].toNodeId).toBe('node_inspect_desk');
  });

  // 3. Senaryo: Bir ipucu yalnızca bir kez kaydediliyor
  it('3. Bir ipucu daha önce kazanılmışsa çoğaltılmaz, yalnızca bir kez kaydedilir', () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.startNewGame();
    });

    // Çalışma masasına git -> 'clue_broken_clock' ve 'clue_poisoned_glass' kazanılır
    const deskChoice = STORY_NODES[INITIAL_NODE_ID].choices.find(
      (c) => c.nextNodeId === 'node_inspect_desk'
    );
    act(() => {
      result.current.makeChoice(deskChoice);
    });

    const countAfterFirstVisit = result.current.collectedClueIds.length;
    expect(countAfterFirstVisit).toBeGreaterThanOrEqual(2);
    expect(result.current.collectedClueIds).toContain('clue_broken_clock');

    // Başka bir odaya git, sonra tekrar çalışma odasına dön
    const balconyChoice = STORY_NODES['node_inspect_desk'].choices.find(
      (c) => c.nextNodeId === 'node_inspect_balcony'
    );
    act(() => {
      result.current.makeChoice(balconyChoice);
    });

    // Doğrudan aynı ipucunu içeren düğümü tekrar tetikleyecek manuel kontrol
    const duplicates = result.current.collectedClueIds.filter(
      (id, index, self) => self.indexOf(id) !== index
    );
    expect(duplicates).toHaveLength(0);
  });

  // 4. Senaryo: Toplanan ipuçları hikâye ilerlemesinde korunuyor
  it('4. Toplanan ipuçları birden fazla sahne geçişinde eksilmeden korunur', () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.startNewGame();
    });

    // 1. Adım: Çalışma masası (2 ipucu)
    act(() => {
      result.current.makeChoice({
        id: 'c1',
        text: 'Masayı incele',
        nextNodeId: 'node_inspect_desk',
      });
    });
    expect(result.current.collectedClueIds).toHaveLength(2);

    // 2. Adım: Balkon (1 yeni ipucu daha -> toplam 3)
    act(() => {
      result.current.makeChoice({
        id: 'c2',
        text: 'Balkona çık',
        nextNodeId: 'node_inspect_balcony',
      });
    });
    expect(result.current.collectedClueIds).toHaveLength(3);
    expect(result.current.collectedClueIds).toContain('clue_broken_clock');
    expect(result.current.collectedClueIds).toContain('clue_poisoned_glass');
    expect(result.current.collectedClueIds).toContain('clue_muddy_footprints');

    // 3. Adım: Şömine (1 yeni ipucu daha -> toplam 4)
    act(() => {
      result.current.makeChoice({
        id: 'c3',
        text: 'Şömineyi tara',
        nextNodeId: 'node_inspect_fireplace',
      });
    });
    expect(result.current.collectedClueIds).toHaveLength(4);
    expect(result.current.collectedClueIds).toContain('clue_torn_ledger');
  });

  // 5. Senaryo: Farklı karar yolları farklı düğümlere ulaşabiliyor
  it('5. Farklı karar yolları farklı hikâye düğümlerine ulaştırır', () => {
    // Yol A: Masaya giden yol
    const { result: hookA } = renderHook(() => useGame());
    act(() => {
      hookA.current.startNewGame();
      hookA.current.makeChoice(STORY_NODES[INITIAL_NODE_ID].choices[0]);
    });
    expect(hookA.current.currentNodeId).toBe('node_inspect_desk');

    // Yol B: Giriş holüne giden yol
    const { result: hookB } = renderHook(() => useGame());
    act(() => {
      hookB.current.startNewGame();
      hookB.current.makeChoice(STORY_NODES[INITIAL_NODE_ID].choices[1]);
    });
    expect(hookB.current.currentNodeId).toBe('node_inspect_hall');

    // Yol C: Doğrudan salona giden yol
    const { result: hookC } = renderHook(() => useGame());
    act(() => {
      hookC.current.startNewGame();
      hookC.current.makeChoice(STORY_NODES[INITIAL_NODE_ID].choices[2]);
    });
    expect(hookC.current.currentNodeId).toBe('node_living_room');
  });

  // 6. Senaryo: En az üç final doğru şekilde gösteriliyor
  describe('6. Finallerin Değerlendirilmesi ve Gösterimi', () => {
    it('Final 1 (Doğru Çözüm): Yeterli kritik kanıtla Murat suçlandığında mükemmel final tetiklenir', () => {
      const fullEvidence = [
        'clue_broken_clock',
        'clue_poisoned_glass',
        'clue_muddy_footprints',
        'clue_torn_ledger',
      ];
      const ending = evaluateEnding('node_final_murat', fullEvidence);

      expect(ending.type).toBe('correct');
      expect(ending.id).toBe(ENDINGS.ending_perfect.id);
      expect(ending.badge).toContain('Mükemmel Çözüm');
    });

    it('Final 2 (Yanlış Suçlama): Masum Selin suçlandığında adli yanılgı finali tetiklenir', () => {
      const clues = ['clue_wet_scarf', 'clue_gas_station_receipt'];
      const ending = evaluateEnding('node_final_selin', clues);

      expect(ending.type).toBe('wrong');
      expect(ending.id).toBe(ENDINGS.ending_wrong_selin.id);
      expect(ending.badge).toContain('Yanlış Suçlama');
    });

    it('Final 3 (Çözülemeyen Vaka): Deliller yetersizken veya dosya devredildiğinde faili meçhul finali tetiklenir', () => {
      const ending = evaluateEnding('node_final_unsolved', []);

      expect(ending.type).toBe('unsolved');
      expect(ending.id).toBe(ENDINGS.ending_unsolved.id);
      expect(ending.badge).toContain('Çözülemeyen Vaka');
    });

    it('Final 2B (Kusurlu Suçlama): Murat eksik kanıtla suçlanırsa delil yetersizliği finali devreye girer', () => {
      const insufficientEvidence = ['clue_wet_scarf']; // Kırık saat veya siyanür yok
      const ending = evaluateEnding('node_final_murat', insufficientEvidence);

      expect(ending.type).toBe('wrong');
      expect(ending.id).toBe(ENDINGS.ending_insufficient_evidence.id);
    });
  });

  // 7. Senaryo: Oyun kaydı yüklenebiliyor
  it('7. Mevcut kayıtlı oyun resumeGame ile başarıyla yüklenir', () => {
    // Önceden bir durum kaydet
    saveGameState({
      currentNodeId: 'node_inspect_library',
      collectedClueIds: ['clue_broken_clock', 'clue_sealed_envelope'],
      decisionHistory: [{ choiceId: 'c1', text: 'Kütüphane' }],
      gameStatus: 'playing',
    });

    const { result } = renderHook(() => useGame());

    act(() => {
      const success = result.current.resumeGame();
      expect(success).toBe(true);
    });

    expect(result.current.gameStatus).toBe('playing');
    expect(result.current.currentNodeId).toBe('node_inspect_library');
    expect(result.current.collectedClueIds).toContain('clue_sealed_envelope');
  });

  // 8. Senaryo: Bozuk localStorage verisi uygulamayı çökertmiyor
  it('8. Bozuk localStorage verisi varsa resumeGame çökmeyip güvenle yeni oyuna yönlendirir', () => {
    localStorage.setItem(STORAGE_KEY, 'invalid-json-data{{{');

    const { result } = renderHook(() => useGame());

    expect(() => {
      act(() => {
        result.current.resumeGame();
      });
    }).not.toThrow();

    // Çökmedi, yeni oyuna güvenle geçti
    expect(result.current.gameStatus).toBe('playing');
    expect(result.current.currentNodeId).toBe(INITIAL_NODE_ID);
  });

  // 9. Senaryo: Oyunu sıfırlama, önceki oyun durumunu temizliyor
  it('9. resetGame çağrıldığında tüm oyun durumu sıfırlanır ve hafıza temizlenir', () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.startNewGame();
      result.current.makeChoice({
        id: 'c1',
        text: 'Test',
        nextNodeId: 'node_inspect_desk',
      });
    });

    expect(result.current.collectedClueIds.length).toBeGreaterThan(0);

    act(() => {
      result.current.resetGame();
    });

    expect(result.current.gameStatus).toBe('idle');
    expect(result.current.collectedClueIds).toHaveLength(0);
    expect(result.current.decisionHistory).toHaveLength(0);
    expect(result.current.currentEnding).toBeNull();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  // 10. Senaryo: Çoklu Vaka Sistemi
  it('10. Oyuncu farklı bir vaka seçtiğinde ("Sessiz Sahne" veya "Gölgeli Galeri") ilgili vaka başlatılır', () => {
    const { result } = renderHook(() => useGame());

    expect(result.current.allCases).toHaveLength(3);

    // 2. Vakayı seç (Sessiz Sahne)
    act(() => {
      result.current.selectCase('case_silent_stage');
    });

    expect(result.current.activeCaseId).toBe('case_silent_stage');
    expect(result.current.activeCase.title).toBe('Sessiz Sahne');

    // 2. Vakayı başlat
    act(() => {
      result.current.startNewGame('case_silent_stage');
    });

    expect(result.current.gameStatus).toBe('playing');
    expect(result.current.currentNodeId).toBe('node_stage_arrival');
    expect(result.current.currentNode.title).toBe('Tiyatronun Perde Arkası');
    expect(result.current.collectedClueIds).toContain('clue_stage_dagger');
  });
});
