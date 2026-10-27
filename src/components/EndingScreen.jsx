import { ENDINGS } from '../data/mysteryStory.js';

export default function EndingScreen({
  ending,
  clueCount = 0,
  totalClues = 7,
  decisionHistory = [],
  onPlayAgain,
  onReturnToMenu,
}) {
  const currentEnding = ending || ENDINGS.ending_unsolved;

  // Final türüne göre rozet stilleri
  const statusTypeConfig = {
    correct: {
      themeClass: 'theme-success',
      icon: '🏆',
      defaultRank: 'Usta Başkomiser',
    },
    wrong: {
      themeClass: 'theme-danger',
      icon: '❌',
      defaultRank: 'Hatalı Suçlama',
    },
    unsolved: {
      themeClass: 'theme-warning',
      icon: '📁',
      defaultRank: 'Faili Meçhul',
    },
  };

  const config = statusTypeConfig[currentEnding.type] || statusTypeConfig.unsolved;

  return (
    <main className="ending-container" role="main">
      <article className={`ending-card ${config.themeClass}`} id="ending-card-view">
        <div className="ending-top-badge">
          <span className="ending-type-icon" aria-hidden="true">{config.icon}</span>
          <span className="ending-badge-text">{currentEnding.badge}</span>
        </div>

        <header className="ending-header">
          <span className="ending-rank-tag">Rütbe: {currentEnding.rank || config.defaultRank}</span>
          <h1 className="ending-title">{currentEnding.title}</h1>
          <p className="ending-summary">{currentEnding.summary}</p>
        </header>

        {/* Final Anlatı Metinleri */}
        <section className="ending-narrative-prose">
          {Array.isArray(currentEnding.narrative) ? (
            currentEnding.narrative.map((par, i) => (
              <p key={i} className="ending-paragraph">
                {par}
              </p>
            ))
          ) : (
            <p className="ending-paragraph">{currentEnding.narrative}</p>
          )}
        </section>

        {/* Soruşturma İstatistik ve Karar Raporu */}
        <section className="investigation-report-card">
          <h2 className="report-title">
            <span aria-hidden="true">📋</span> Soruşturma Raporu
          </h2>
          <div className="report-grid">
            <div className="report-metric">
              <span className="metric-label">Toplanan Kanıt</span>
              <span className="metric-val">
                {clueCount} / {totalClues}
              </span>
            </div>
            <div className="report-metric">
              <span className="metric-label">Verilen Kritik Karar</span>
              <span className="metric-val">{decisionHistory.length}</span>
            </div>
            <div className="report-metric">
              <span className="metric-label">Dosya Durumu</span>
              <span className="metric-val capitalize">
                {currentEnding.type === 'correct' ? 'Kapandı (Çözüldü)' : 'Kapanmadı'}
              </span>
            </div>
          </div>

          {/* Oyuncunun Karar Özeti */}
          {decisionHistory.length > 0 && (
            <div className="decision-timeline">
              <h3 className="timeline-title">Karar Geçmişiniz:</h3>
              <ol className="decision-history-list">
                {decisionHistory.map((step, idx) => (
                  <li key={idx} className="timeline-item">
                    <span className="timeline-step-num">#{idx + 1}</span>
                    <span className="timeline-step-text">
                      {step.decisionTag || step.text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>

        {/* Aksiyon Butonları */}
        <footer className="ending-actions-footer">
          <button
            type="button"
            className="btn-primary btn-replay"
            id="btn-play-again"
            onClick={onPlayAgain}
          >
            Tekrar Oyna (Yeni Soruşturma)
          </button>
          <button
            type="button"
            className="btn-secondary"
            id="btn-ending-return-menu"
            onClick={onReturnToMenu}
          >
            Ana Menüye Dön
          </button>
        </footer>
      </article>
    </main>
  );
}
