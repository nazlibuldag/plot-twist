import { CASE_INFO } from '../data/mysteryStory.js';

export default function Header({
  caseTitle,
  chapter,
  chapterTitle,
  clueCount,
  totalClues = 7,
  onOpenCaseFile,
  onReturnToMenu,
  onPromptReset,
}) {
  const displayCaseTitle = caseTitle || CASE_INFO.title;

  return (
    <header className="app-header" role="banner">
      <div className="header-brand-group">
        <button
          type="button"
          className="brand-logo-btn"
          onClick={onReturnToMenu}
          title="Ana Menüye Dön"
          aria-label="PlotTwist Ana Menü"
        >
          <span className="brand-badge-symbol">♦</span>
          <span className="brand-title">PLOTTWIST</span>
        </button>
        <div className="header-case-meta">
          <span className="case-name">Vaka: {displayCaseTitle}</span>
          <span className="case-sep" aria-hidden="true">/</span>
          <span className="chapter-label">
            {chapterTitle || `Bölüm ${chapter || 1}`}
          </span>
        </div>
      </div>

      <div className="header-actions-group">
        <button
          type="button"
          id="btn-case-file-toggle"
          className="btn-case-file"
          onClick={onOpenCaseFile}
          aria-label={`Vaka Dosyası: ${clueCount} / ${totalClues} ipucu toplandı`}
        >
          <svg
            className="icon-briefcase"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span className="btn-text">Vaka Dosyası</span>
          <span className="clue-badge" id="clue-counter-badge">
            {clueCount}/{totalClues}
          </span>
        </button>

        <button
          type="button"
          id="btn-header-menu"
          className="btn-header-secondary"
          onClick={onReturnToMenu}
          title="Ana Menüye Dön"
        >
          Menü
        </button>

        <button
          type="button"
          id="btn-header-reset"
          className="btn-header-danger"
          onClick={onPromptReset}
          title="Soruşturmayı Baştan Başlat"
        >
          Sıfırla
        </button>
      </div>
    </header>
  );
}
