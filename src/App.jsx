import { useState } from 'react';
import Header from './components/Header.jsx';
import StoryPanel from './components/StoryPanel.jsx';
import CaseFile from './components/CaseFile.jsx';
import EndingScreen from './components/EndingScreen.jsx';
import Modal from './components/Modal.jsx';
import { useGame } from './hooks/useGame.js';

export default function App() {
  const {
    activeCaseId,
    activeCase,
    allCases,
    currentNode,
    collectedClueIds,
    decisionHistory,
    gameStatus,
    currentEnding,
    isCaseFileOpen,
    newlyUnlockedClues,
    errorMessage,
    hasSave,
    selectCase,
    startNewGame,
    resumeGame,
    makeChoice,
    resetGame,
    returnToMenu,
    toggleCaseFile,
  } = useGame();

  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const totalClues = Object.keys(activeCase.clues || {}).length;

  // Sıfırlama onayı
  const handleConfirmReset = () => {
    resetGame();
    setIsResetConfirmOpen(false);
  };

  return (
    <div className="game-app-root">
      {/* Sinematik arka plan ışık ve sis katmanları */}
      <div className="ambient-background" aria-hidden="true">
        <div className="ambient-spotlight"></div>
        <div className="ambient-grain"></div>
        <div className="ambient-rain-effect"></div>
      </div>

      {/* AÇILIŞ / VAKA SEÇİM EKRANI */}
      {gameStatus === 'idle' && (
        <main className="welcome-screen" role="main">
          <div className="welcome-card">
            <div className="welcome-tag">
              <span className="noir-diamond" aria-hidden="true">♦</span>
              <span>İNTERAKTİF DEDEKTİFLİK ARŞİVİ</span>
            </div>

            <h1 className="welcome-title">PLOTTWIST</h1>
            <p className="welcome-subtitle">
              Her ipucu bir sır, her seçim yeni bir son.
            </p>

            {/* Vaka Seçici Kartları */}
            <section className="case-selector-section" aria-label="Vaka Dosyaları">
              <div className="case-selector-heading">
                <span className="selector-label">SORUŞTURMA DOSYALARI</span>
                <span className="selector-count">{allCases.length} Vaka Mevcut</span>
              </div>

              <div className="case-cards-grid" role="radiogroup" aria-label="Vaka Seçimi">
                {allCases.map((c, index) => {
                  const isSelected = c.id === activeCaseId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`case-selection-card ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => selectCase(c.id)}
                      id={`case-card-${c.id}`}
                    >
                      <div className="case-card-top">
                        <span className="case-num-badge">VAKA #{index + 1}</span>
                        <span className="case-diff-badge">{c.difficulty || 'Orta'}</span>
                      </div>
                      <h3 className="case-card-title">{c.title}</h3>
                      <p className="case-card-sub">{c.subtitle}</p>
                      <div className="case-card-meta">
                        <span className="case-meta-location">📍 {c.location}</span>
                        <span className="case-meta-duration">⏱ {c.duration || '15 Dk'}</span>
                      </div>
                      {isSelected && (
                        <div className="selected-indicator">
                          <span className="indicator-dot"></span>
                          <span>SEÇİLEN DOSYA</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Aktif Seçili Vaka Brifingi */}
            <div className="welcome-case-preview">
              <div className="preview-label">SEÇİLİ DOSYA BRİFİNGİ</div>
              <h2 className="preview-case-title">
                Vaka: {activeCase.title} — {activeCase.subtitle}
              </h2>
              <div className="preview-submeta">
                <span><strong>Kurban:</strong> {activeCase.victim}</span>
                <span>•</span>
                <span><strong>Zaman:</strong> {activeCase.time}</span>
              </div>
              <p className="preview-briefing">{activeCase.briefing}</p>
            </div>

            <div className="welcome-actions">
              {hasSave && (
                <button
                  type="button"
                  id="btn-resume-game"
                  className="btn-primary btn-glow"
                  onClick={resumeGame}
                >
                  <span className="btn-icon">▶</span>
                  Kaldığın Yerden Devam Et
                </button>
              )}

              <button
                type="button"
                id="btn-start-game"
                className={hasSave ? 'btn-secondary' : 'btn-primary btn-glow'}
                onClick={() => startNewGame(activeCaseId)}
              >
                <span className="btn-icon">🔍</span>
                Bu Vakayı Soruşturmaya Başla
              </button>

              <button
                type="button"
                id="btn-how-to-play"
                className="btn-tertiary"
                onClick={() => setIsHowToPlayOpen(true)}
              >
                Nasıl Oynanır?
              </button>
            </div>

            <footer className="welcome-footer">
              <span>PlotTwist Dedektiflik Serisi • Çoklu Vakalar • Orijinal Olay Örgüleri</span>
            </footer>
          </div>
        </main>
      )}

      {/* HİKÂYE VE SORUŞTURMA EKRANI */}
      {(gameStatus === 'playing' || gameStatus === 'error') && (
        <div className="investigation-screen">
          <Header
            caseTitle={activeCase.title}
            chapter={currentNode?.chapter || 1}
            chapterTitle={currentNode?.chapterTitle}
            clueCount={collectedClueIds.length}
            totalClues={totalClues}
            onOpenCaseFile={() => toggleCaseFile(true)}
            onReturnToMenu={returnToMenu}
            onPromptReset={() => setIsResetConfirmOpen(true)}
          />

          <StoryPanel
            node={currentNode}
            clues={activeCase.clues}
            collectedClueIds={collectedClueIds}
            newlyUnlockedClues={newlyUnlockedClues}
            onMakeChoice={makeChoice}
            onOpenCaseFile={() => toggleCaseFile(true)}
            errorMessage={errorMessage}
            onReturnToMenu={returnToMenu}
          />
        </div>
      )}

      {/* FİNAL EKRANI */}
      {gameStatus === 'ended' && (
        <EndingScreen
          ending={currentEnding}
          clueCount={collectedClueIds.length}
          totalClues={totalClues}
          decisionHistory={decisionHistory}
          onPlayAgain={() => startNewGame(activeCaseId)}
          onReturnToMenu={returnToMenu}
        />
      )}

      {/* VAKA DOSYASI (İPUÇLARI & ŞÜPHELİLER) ÇEKMECESİ */}
      <CaseFile
        isOpen={isCaseFileOpen}
        onClose={() => toggleCaseFile(false)}
        collectedClueIds={collectedClueIds}
        caseData={activeCase}
        clues={activeCase.clues}
      />

      {/* NASIL OYNANIR MODALI */}
      <Modal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
        title="Dedektiflik El Kitabı"
        id="modal-how-to-play"
        footer={
          <button
            type="button"
            className="btn-primary"
            onClick={() => setIsHowToPlayOpen(false)}
          >
            Anladım, Soruşturmaya Hazırım
          </button>
        }
      >
        <div className="how-to-play-content">
          <section className="guide-rule-item">
            <h3 className="guide-rule-title">
              <span className="guide-step-badge">1</span> Vaka Seçimi
            </h3>
            <p className="guide-rule-text">
              Ana menüden dilediğiniz cinayet dosyasını seçebilirsiniz: Köşk cinayeti (Kırmızı Mühür), tiyatro prömiyeri (Sessiz Sahne) veya sanat galerisi vurgunu (Gölgeli Galeri).
            </p>
          </section>

          <section className="guide-rule-item">
            <h3 className="guide-rule-title">
              <span className="guide-step-badge">2</span> Olay Yerini İncele
            </h3>
            <p className="guide-rule-text">
              Her sahnede karşına çıkan ipuçları otomatik olarak <strong>Vaka Dosyası</strong>na kaydedilir.
              Aynı ipucu tekrar bulunsa bile çoğaltılmaz.
            </p>
          </section>

          <section className="guide-rule-item">
            <h3 className="guide-rule-title">
              <span className="guide-step-badge">3</span> Seçimlerin Kaderi Belirler
            </h3>
            <p className="guide-rule-text">
              Verdiğin kararlar hikâyenin akışını doğrudan değiştirir. Bazı kritik sorgu hamleleri
              yalnızca gerekli maddi delilleri topladığında açılır.
            </p>
          </section>

          <section className="guide-rule-item">
            <h3 className="guide-rule-title">
              <span className="guide-step-badge">4</span> Finaller ve Kanıt Yeterliliği
            </h3>
            <p className="guide-rule-text">
              Doğru çözüme ulaşmak yalnızca doğru şüpheliyi seçmekle olmaz; mahkemeyi ikna edecek
              kritik maddi delilleri de toplamış olman gerekir.
            </p>
          </section>
        </div>
      </Modal>

      {/* OYUNU SIFIRLAMA ONAY MODALI */}
      <Modal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        title="Soruşturmayı Sıfırla"
        id="modal-reset-confirm"
        footer={
          <div className="modal-button-group">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsResetConfirmOpen(false)}
            >
              İptal
            </button>
            <button
              type="button"
              id="btn-confirm-reset"
              className="btn-danger"
              onClick={handleConfirmReset}
            >
              Evet, Sıfırla
            </button>
          </div>
        }
      >
        <p className="confirm-prompt-text">
          Aktif soruşturmayı baştan başlatmak istediğinize emin misiniz? Topladığınız tüm ipuçları,
          karar geçmişiniz ve kaydedilmiş oyun durumu kalıcı olarak temizlenecektir.
        </p>
      </Modal>
    </div>
  );
}
