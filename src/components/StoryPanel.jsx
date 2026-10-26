import ChoiceButton from './ChoiceButton.jsx';
import { CLUES } from '../data/mysteryStory.js';

export default function StoryPanel({
  node,
  clues = CLUES,
  collectedClueIds = [],
  newlyUnlockedClues = [],
  onMakeChoice,
  onOpenCaseFile,
  errorMessage,
  onReturnToMenu,
}) {
  // Düğüm bulunamadığında veya hata durumunda çöküşü önleyen koruma
  if (!node) {
    return (
      <main className="story-container" role="main">
        <div className="story-error-card">
          <div className="error-icon" aria-hidden="true">⚠️</div>
          <h2 className="error-title">Vaka Dosyasında Bir Boşluk Oluştu</h2>
          <p className="error-desc">
            {errorMessage || 'Aradığınız soruşturma sahnesine ulaşılamadı. Hikâye kaydı bozulmuş veya geçersiz bir yola sapılmış olabilir.'}
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={onReturnToMenu}
            id="btn-error-return-menu"
          >
            Ana Menüye Dön
          </button>
        </div>
      </main>
    );
  }

  // Sahne atmosferi için simgesel etiketler
  const sceneBadges = {
    manor_front: { label: 'Malikane Girişi', time: '23:45', icon: '🏛️' },
    study_room: { label: 'Çalışma Masası & Ceset', time: '23:50', icon: '🕯️' },
    mansion_hall: { label: 'Giriş Holü & Vestiyer', time: '23:48', icon: '🧥' },
    balcony_rain: { label: 'Fransız Balkonu', time: '23:52', icon: '🌧️' },
    study_fireplace: { label: 'Şömine & Kül Tabakası', time: '23:55', icon: '🔥' },
    library_archive: { label: 'Gizli Arşiv Odası', time: '00:05', icon: '📜' },
    police_radio: { label: 'Boğaz Bahçesi — Telsiz', time: '00:15', icon: '📻' },
    suspects_lounge: { label: 'Şüpheliler Salonu', time: '00:20', icon: '👥' },
    interrogation_murat: { label: 'Sorgu: Murat Soyer', time: '00:25', icon: '💼' },
    murat_panic: { label: 'Çapraz Sorgu: Murat Soyer', time: '00:30', icon: '⚡' },
    interrogation_leyla: { label: 'Sorgu: Leyla Erdem', time: '00:35', icon: '📿' },
    leyla_relief: { label: 'İtiraf: Leyla Erdem', time: '00:40', icon: '🗝️' },
    interrogation_selin: { label: 'Sorgu: Selin Arman', time: '00:45', icon: '🍷' },
    selin_breakdown: { label: 'İtiraf: Selin Arman', time: '00:50', icon: '💧' },
    accusation_chamber: { label: 'Büyük Hüküm Salonu', time: '01:00', icon: '⚖️' },
  };

  const sceneMeta = sceneBadges[node.sceneType] || {
    label: 'Olay Mahalli',
    time: 'Gece Yarısı',
    icon: '🔍',
  };

  return (
    <main className="story-container" role="main">
      <article className="story-card" id={`story-node-${node.id}`}>
        {/* Sahne Başlığı ve Atmosfer Barı */}
        <div className="scene-status-bar">
          <div className="scene-location-pill">
            <span className="scene-icon" aria-hidden="true">{sceneMeta.icon}</span>
            <span className="scene-text">{sceneMeta.label}</span>
          </div>
          <div className="scene-time-pill">
            <span className="noir-clock-icon" aria-hidden="true">⏱</span>
            <span>{sceneMeta.time}</span>
          </div>
        </div>

        <header className="story-header">
          <span className="chapter-eyebrow">{node.chapterTitle}</span>
          <h1 className="story-heading">{node.title}</h1>
        </header>

        {/* Yeni Kanıt Bildirimi */}
        {newlyUnlockedClues.length > 0 && (
          <aside className="clue-unlocked-banner" role="status" aria-live="polite">
            <div className="banner-icon" aria-hidden="true">📌</div>
            <div className="banner-content">
              <strong>YENİ KANIT BULUNDU</strong>
              <div className="banner-clues-list">
                {newlyUnlockedClues.map((id) => {
                  const clue = clues[id];
                  return (
                    <span key={id} className="clue-tag">
                      {clue ? clue.title : id}
                    </span>
                  );
                })}
              </div>
            </div>
            <button
              type="button"
              className="btn-banner-casefile"
              onClick={onOpenCaseFile}
              title="Vaka Dosyasını Aç"
            >
              Dosyayı İncele
            </button>
          </aside>
        )}

        {/* Hikâye Anlatım Metni */}
        <div className="story-prose">
          {Array.isArray(node.text) ? (
            node.text.map((paragraph, idx) => (
              <p key={idx} className="story-paragraph">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="story-paragraph">{node.text}</p>
          )}
        </div>

        {/* Karar Seçenekleri */}
        <section className="story-choices-section" aria-label="Karar Seçenekleri">
          <h2 className="choices-title">
            <span className="choices-line" aria-hidden="true"></span>
            <span className="choices-title-text">DEDEKTİFİN KARARI</span>
            <span className="choices-line" aria-hidden="true"></span>
          </h2>

          <div className="choices-list" role="group">
            {node.choices && node.choices.length > 0 ? (
              node.choices.map((choice, index) => {
                // Kilit kontrolü
                let isLocked = false;
                let missingClueNames = [];

                if (Array.isArray(choice.requiredClueIds) && choice.requiredClueIds.length > 0) {
                  const missing = choice.requiredClueIds.filter(
                    (id) => !collectedClueIds.includes(id)
                  );
                  if (missing.length > 0) {
                    isLocked = true;
                    missingClueNames = missing.map((id) => (clues[id] ? clues[id].title : id));
                  }
                }

                return (
                  <ChoiceButton
                    key={choice.id}
                    choice={choice}
                    index={index}
                    onClick={onMakeChoice}
                    isLocked={isLocked}
                    missingClueNames={missingClueNames}
                  />
                );
              })
            ) : (
              <div className="no-choices-prompt">
                <p>Bu sahnede verilecek karar kalmadı.</p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={onReturnToMenu}
                >
                  Ana Menüye Dön
                </button>
              </div>
            )}
          </div>
        </section>
      </article>
    </main>
  );
}
