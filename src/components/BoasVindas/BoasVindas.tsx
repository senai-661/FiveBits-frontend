import { type JSX } from "react";
import "./BoasVindas.css";

function BoasVindas(): JSX.Element {
    return <section className="home-hero">
        <div className="content-container hero-grid">
            <div className="hero-copy">
                <span className="hero-badge">
                    <i className="pi pi-heart-fill" />
                    MedFlow Saúde
                </span>
                <h1>Saúde conectada, cuidado mais humano.</h1>
                <p>Organize consultas, pacientes e informações clínicas em uma experiência simples, segura e sempre acessível.</p>
                <div className="hero-actions">
                    <a className="button button-primary" href="#servicos">Conheça os serviços <i className="pi pi-arrow-right" /></a>
                    <a className="button button-secondary hero-secondary" href="/login">Acessar plataforma</a>
                </div>
            </div>
            <div className="hero-visual" aria-hidden="true">
                <img
                    src={"https://blog.unoeste.br/wp-content/uploads/2022/08/curso-medicina.jpg"}
                    alt=""
                    style={{ bottom: "clamp(0px, 1vw, 1.5rem)" }}
                />
            </div>
        </div>
    </section>;
}
export default BoasVindas;
