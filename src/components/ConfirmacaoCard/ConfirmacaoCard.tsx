import { useEffect, useRef } from "react";
import "./ConfirmacaoCard.css";

interface ConfirmacaoCardProps {
    titulo: string;
    mensagem: string;
    onConfirmar: () => void;
    onCancelar: () => void;
}

function ConfirmacaoCard({ titulo, mensagem, onConfirmar, onCancelar }: ConfirmacaoCardProps) {
    const cancelButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        cancelButtonRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onCancelar();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onCancelar]);

    return (
        <div className="confirmacao-overlay" role="presentation" onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
                onCancelar();
            }
        }}>
            <section className="confirmacao-card" role="alertdialog" aria-modal="true" aria-labelledby="confirmacao-titulo" aria-describedby="confirmacao-mensagem">
                <div className="confirmacao-icon" aria-hidden="true">
                    <i className="pi pi-exclamation-triangle" />
                </div>
                <div className="confirmacao-content">
                    <h2 id="confirmacao-titulo">{titulo}</h2>
                    <p id="confirmacao-mensagem">{mensagem}</p>
                    <div className="confirmacao-actions">
                        <button ref={cancelButtonRef} type="button" className="confirmacao-btn cancel" onClick={onCancelar}>
                            Cancelar
                        </button>
                        <button type="button" className="confirmacao-btn confirm" onClick={onConfirmar}>
                            Confirmar exclusão
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ConfirmacaoCard;
