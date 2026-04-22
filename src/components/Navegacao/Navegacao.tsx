import { type JSX } from "react";
import logoImg from "../../assets/hero.png";

function Navegacao(): JSX.Element {
    return (
        <header className="navbar-custom">
            {/* Lado Esquerdo: Logo */}
            <div className="nav-logo-section">
                <img src={logoImg} alt="MedFlow Logo" className="logo-img" />
            </div>

            {/* Centro: Links de Gestão (RF001, RF002, RF003) */}
            <nav className="nav-items-section">
                <a href="/" className="nav-link">
                    <i className="pi pi-home"></i> Home
                </a>
                <a href="/lista/paciente" className="nav-link">
                    <i className="pi pi-users"></i> Paciente
                </a>
                <a href="/lista/medico" className="nav-link">
                    <i className="pi pi-user-plus"></i> Médico
                </a>
                <a href="/lista/consulta" className="nav-link">
                    <i className="pi pi-calendar"></i> Consulta
                </a>
            </nav>

            {/* Lado Direito: Ação de Acesso */}
            <div className="nav-actions">
                <a href="/login" className="btn-entrar">
                    Entrar
                </a>
            </div>
        </header>
    );
}

export default Navegacao;