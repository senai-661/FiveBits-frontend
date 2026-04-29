import { type JSX } from "react";
import "./Rodape.css";

function Rodape(): JSX.Element {
    return (
        <footer className="footer-minimal">
            <div className="footer-container">
                <div className="brand-brief">
                    <span className="logo-compact">Med<strong>Flow</strong></span>
                    <span className="divider">|</span>
                    <p className="slogan-minimal">Gestão inteligente para clínicas multidisciplinares.</p>
                </div>

                <div className="dev-credits">
                    <span className="label">Dev by:</span>
                    <div className="dev-names">
                        <span>Enzo</span> • <span>Gabriel</span> • <span>Ismael</span> • <span>Jadson</span> • <span>Lívia</span>
                    </div>
                </div>

                <div className="footer-info">
                    <span>Sertãozinho - SP</span>
                    <span className="version">v1.0.2</span>
                </div>
            </div>
        </footer>
    );
}

export default Rodape;