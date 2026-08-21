import { type JSX } from "react";
import { useNavigate } from "react-router-dom";
import "./InicialLogin.css";

function InicialLogin(): JSX.Element {
    const navigate = useNavigate();

    return (
        <section className="inicial-login" aria-labelledby="welcome-title">
            <span className="inicial-badge">PLATAFORMA INTEGRADA DE SAÚDE</span>
            <h1 id="welcome-title">Bem-vindo ao MedFlow</h1>
            <p className="inicial-description">Sua plataforma integrada de saúde. Gerencie suas consultas, acompanhe a triagem inteligente e tenha acesso ao seu histórico médico em um só lugar.</p>
            <div className="inicial-features">
                <article className="feature-card">
                    <div className="feature-icon feature-icon-blue"><i className="pi pi-bolt" aria-hidden="true" /></div>
                    <span className="feature-status status-green">IA Ativa</span>
                    <strong>Triagem Prévia com IA</strong>
                    <span>Análise automatizada de sintomas para agilizar o direcionamento médico e classificar o grau de urgência.</span>
                </article>
                <article className="feature-card">
                    <div className="feature-icon feature-icon-green"><i className="pi pi-calendar" aria-hidden="true" /></div>
                    <span className="feature-status status-blue">24/7 Disponível</span>
                    <strong>Agendamento Unificado</strong>
                    <span>Gestão integrada de horários para consultas presenciais e atendimento via telemedicina em tempo real.</span>
                </article>
                <article className="feature-card">
                    <div className="feature-icon feature-icon-purple"><i className="pi pi-shield" aria-hidden="true" /></div>
                    <span className="feature-status status-dark">Criptografado</span>
                    <strong>Prontuário Digital Seguro</strong>
                    <span>Acesso centralizado a prescrições, laudos e histórico clínico com máxima proteção de dados.</span>
                </article>
            </div>
            <div className="inicial-actions">
                <button type="button" className="inicial-primary" onClick={() => navigate("/lista/consulta")}>Acessar Painel de Consultas</button>
            </div>
        </section>
    );
}

export default InicialLogin;
