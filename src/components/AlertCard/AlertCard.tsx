import React from 'react';

export type AlertVariant = 'success' | 'danger' | 'warning' | 'info';
export type AlertType = 'banner' | 'toast';
export type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export interface AlertCardProps {
  /** Variant defines color scheme & default icon */
  variant?: AlertVariant;
  /** Display mode: inline banner or fixed floating toast */
  type?: AlertType;
  /** Optional title for the alert */
  title?: string;
  /** Main message content */
  message: React.ReactNode;
  /** Custom PrimeIcon class name (e.g. 'pi pi-bell') */
  icon?: string;
  /** Callback fired when user clicks the close (X) button */
  onClose?: () => void;
  /** Label for an optional action button */
  actionLabel?: string;
  /** Callback fired when action button is clicked */
  onAction?: () => void;
  /** Optional duration in milliseconds to auto-dismiss alert (if onClose is provided) */
  autoDismissMs?: number;
  /** Fixed screen position when type="toast" */
  position?: ToastPosition;
  /** Optional additional CSS class */
  className?: string;
}

const defaultIcons: Record<AlertVariant, string> = {
  success: 'pi pi-check-circle',
  danger: 'pi pi-exclamation-circle',
  warning: 'pi pi-exclamation-triangle',
  info: 'pi pi-info-circle',
};

const defaultTitles: Record<AlertVariant, string> = {
  success: 'Sucesso',
  danger: 'Atenção / Erro',
  warning: 'Aviso',
  info: 'Informação',
};

export const AlertCard: React.FC<AlertCardProps> = ({
  variant = 'info',
  type = 'banner',
  title,
  message,
  icon,
  onClose,
  actionLabel,
  onAction,
  autoDismissMs,
  position = 'top-right',
  className = '',
}) => {
  const iconClass = icon || defaultIcons[variant];
  const displayTitle = title !== undefined ? title : defaultTitles[variant];

  React.useEffect(() => {
    if (!autoDismissMs || !onClose) return;
    const timer = setTimeout(() => {
      onClose();
    }, autoDismissMs);
    return () => clearTimeout(timer);
  }, [autoDismissMs, onClose]);

  const cardContent = (
    <div
      className={`alert-card alert-card--${variant} ${
        type === 'toast' ? 'alert-card--toast' : ''
      } ${className}`.trim()}
      role="alert"
      aria-live="polite"
    >
      <div className="alert-card-icon-container" aria-hidden="true">
        <i className={iconClass} />
      </div>

      <div className="alert-card-content">
        {displayTitle && <h4 className="alert-card-title">{displayTitle}</h4>}
        <div className="alert-card-message">{message}</div>

        {actionLabel && onAction && (
          <div className="alert-card-actions">
            <button
              type="button"
              className="alert-card-btn-action"
              onClick={onAction}
            >
              {actionLabel}
            </button>
          </div>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          className="alert-card-btn-close"
          onClick={onClose}
          aria-label="Fechar alerta"
        >
          <i className="pi pi-times" aria-hidden="true" />
        </button>
      )}
    </div>
  );

  if (type === 'toast') {
    return (
      <div className={`alert-toast-container alert-toast-container--${position}`}>
        {cardContent}
      </div>
    );
  }

  return cardContent;
};

export default AlertCard;
