import { type JSX } from "react";
import avatar from "../../assets/avatar.png";

function BoasVindas(): JSX.Element {
    return (
        <section className="welcome-card">
            <div className="welcome-copy">
                <span className="welcome-badge">MEDFLOW SAÚDE</span>
                <h1>Bem-vindo ao MedFlow</h1>
                <p>Gestão de saúde mais simples, conectada e humana para sua rotina.</p>
                <button type="button" className="welcome-cta">Explorar plataforma</button>
            </div>
            <img className="welcome-avatar" src={avatar} alt="Profissional de saúde MedFlow" />
        </section>
    );
}

export default BoasVindas;
