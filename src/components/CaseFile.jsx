import { useState, useEffect } from 'react';
import { CLUES, CASE_INFO } from '../data/mysteryStory.js';

export default function CaseFile({
  isOpen,
  onClose,
  collectedClueIds = [],
  caseData = CASE_INFO,
  clues = CLUES,
}) {
  const [activeTab, setActiveTab] = useState('clues'); // 'clues' | 'suspects' | 'case'
  const allCluesList = Object.values(clues);
  const totalClues = allCluesList.length;
  const collectedCount = collectedClueIds.length;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="casefile-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="casefile-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="casefile-title"
      >
        <div className="casefile-topbar">
          <div className="casefile-stamp">
            <span className="stamp-seal">{caseData.title.toUpperCase()}</span>
            <span className="stamp-sub">EMNİYET ARŞİVİ #84-A</span>
          </div>
          <button
            type="button"
            className="btn-casefile-close"
            onClick={onClose}
            aria-label="Vaka Dosyasını Kapat"
            id="btn-close-casefile"
          >
            ✕
          </button>
        </div>

        <div className="casefile-header">
          <h2 id="casefile-title" className="casefile-heading">
            Soruşturma Dosyası
          </h2>
          <p className="casefile-desc">
            Toplanan deliller, şüpheli profilleri ve vaka tutanakları.
          </p>

          <div className="casefile-nav" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'clues'}
              className={`casefile-tab-btn ${activeTab === 'clues' ? 'active' : ''}`}
              onClick={() => setActiveTab('clues')}
              id="tab-clues"
            >
              İpuçları & Kanıtlar ({collectedCount}/{totalClues})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'suspects'}
              className={`casefile-tab-btn ${activeTab === 'suspects' ? 'active' : ''}`}
              onClick={() => setActiveTab('suspects')}
              id="tab-suspects"
            >
              Şüpheliler ({caseData.suspects?.length || 0})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'case'}
              className={`casefile-tab-btn ${activeTab === 'case' ? 'active' : ''}`}
              onClick={() => setActiveTab('case')}
              id="tab-case-info"
            >
              Vaka Özeti
            </button>
          </div>
        </div>

        <div className="casefile-body">
          {/* İPUÇLARI SEKMESİ */}
          {activeTab === 'clues' && (
            <div className="clues-grid" role="tabpanel" aria-labelledby="tab-clues">
              {allCluesList.map((clue) => {
                const isCollected = collectedClueIds.includes(clue.id);

                if (isCollected) {
                  return (
                    <article key={clue.id} className="clue-card unlocked">
                      <div className="clue-card-header">
                        <span className="clue-category-tag">{clue.category}</span>
                        <span className="clue-status-tag">Ele Geçirildi</span>
                      </div>
                      <h3 className="clue-title">{clue.title}</h3>
                      <p className="clue-desc">{clue.description}</p>
                      <div className="clue-meta">
                        <div className="meta-item">
                          <span className="meta-label">Bulunduğu Yer:</span>
                          <span className="meta-value">{clue.location}</span>
                        </div>
                        {clue.suspect && (
                          <div className="meta-item">
                            <span className="meta-label">İlgili Şüpheli:</span>
                            <span className="meta-value suspect-highlight">
                              {clue.suspect}
                            </span>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                }

                // Kilitli / Henüz bulunmamış ipucu
                return (
                  <article key={clue.id} className="clue-card locked" aria-hidden="true">
                    <div className="clue-card-header">
                      <span className="clue-category-tag">Gizli Kanıt</span>
                      <span className="clue-lock-badge">🔒 Henüz Bulunmadı</span>
                    </div>
                    <h3 className="clue-title locked-title">??? Keşfedilmemiş İpucu</h3>
                    <p className="clue-desc locked-desc">
                      Bu delil köşkün henüz incelenmemiş bir köşesinde veya şüphelilerin ifadelerinde gizleniyor.
                    </p>
                    <div className="clue-meta">
                      <span className="locked-meta-hint">
                        Olay yerini ve şüpheli ifadelerini araştırmaya devam edin.
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* ŞÜPHELİLER SEKMESİ */}
          {activeTab === 'suspects' && (
            <div className="suspects-list" role="tabpanel" aria-labelledby="tab-suspects">
              {(caseData.suspects || []).map((suspect) => (
                <article key={suspect.id} className="suspect-dossier-card">
                  <div className="suspect-header">
                    <div className="suspect-avatar" aria-hidden="true">
                      {suspect.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="suspect-name">{suspect.name}</h3>
                      <span className="suspect-role">{suspect.role}</span>
                    </div>
                  </div>
                  <div className="suspect-details">
                    <div className="suspect-detail-row">
                      <strong className="detail-key">Olası Neden (Motive):</strong>
                      <span className="detail-val">{suspect.motive}</span>
                    </div>
                    <div className="suspect-detail-row">
                      <strong className="detail-key">Alibi (İfade):</strong>
                      <span className="detail-val">{suspect.alibi}</span>
                    </div>
                    <div className="suspect-detail-row">
                      <strong className="detail-key">Dedektif Notu:</strong>
                      <span className="detail-val italic">{suspect.initialStatus}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* VAKA ÖZETİ SEKMESİ */}
          {activeTab === 'case' && (
            <div className="case-brief-panel" role="tabpanel" aria-labelledby="tab-case-info">
              <div className="brief-section">
                <h3>Vaka Başlığı</h3>
                <p>{caseData.title} — {caseData.subtitle}</p>
              </div>
              <div className="brief-section">
                <h3>Olay Yeri & Zaman</h3>
                <p>{caseData.location} — {caseData.time}</p>
              </div>
              <div className="brief-section">
                <h3>Kurban</h3>
                <p>{caseData.victim}</p>
              </div>
              <div className="brief-section">
                <h3>Olay Özeti</h3>
                <p>{caseData.briefing}</p>
              </div>
            </div>
          )}
        </div>

        <div className="casefile-footer">
          <span className="casefile-footer-note">
            İpucu İlerlemesi: {collectedCount} / {totalClues} kanıt incelendi.
          </span>
          <button
            type="button"
            className="btn-primary"
            onClick={onClose}
          >
            Soruşturmaya Dön
          </button>
        </div>
      </div>
    </div>
  );
}
