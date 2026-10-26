export default function ChoiceButton({
  choice,
  index,
  onClick,
  isLocked = false,
  missingClueNames = [],
}) {
  const isAccusation = choice.id.startsWith('choice_accuse_');

  return (
    <button
      type="button"
      id={`choice-${choice.id}`}
      className={`choice-button ${isLocked ? 'is-locked' : ''} ${
        isAccusation ? 'is-accusation' : ''
      }`}
      onClick={() => {
        if (!isLocked) {
          onClick(choice);
        }
      }}
      disabled={isLocked}
      aria-disabled={isLocked}
      aria-label={`${index + 1}. Seçenek: ${choice.text}${
        isLocked ? ' (Kilitli: Gerekli ipucu eksik)' : ''
      }`}
    >
      <div className="choice-indicator">
        <span className="choice-number">{index + 1}</span>
      </div>

      <div className="choice-content">
        <p className="choice-text">{choice.text}</p>
        {isLocked && missingClueNames.length > 0 && (
          <span className="choice-lock-hint">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Gereken Kanıt: {missingClueNames.join(', ')}
          </span>
        )}
      </div>

      <div className="choice-action-arrow" aria-hidden="true">
        {isLocked ? (
          <span className="lock-icon">🔒</span>
        ) : (
          <span className="arrow-symbol">→</span>
        )}
      </div>
    </button>
  );
}
