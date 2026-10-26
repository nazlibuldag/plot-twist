import { useEffect, useRef } from 'react';

/**
 * Erişilebilir, klavye uyumlu Noir Modal Bileşeni
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  id = 'pt-modal',
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // ESC tuşuna basıldığında kapat
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Modal açıldığında odağı içeriye al
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Arka plan kaydırmayı kilitle
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        ref={modalRef}
        tabIndex={-1}
      >
        <div className="modal-header">
          <div className="modal-header-tag">
            <span className="noir-bullet" aria-hidden="true">■</span>
            <span>GİZLİ PROTOKOL</span>
          </div>
          <h2 id={`${id}-title`} className="modal-title">
            {title}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Kapat"
            id={`${id}-close-button`}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">{children}</div>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
