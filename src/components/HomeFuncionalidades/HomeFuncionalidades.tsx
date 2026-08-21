import { type JSX } from "react";
import "./HomeFuncionalidades.css";

const funcionalidades = [
    { icon: "pi pi-sparkles", titulo: "Triagem com IA 24/7", texto: "Organize sinais e sintomas com apoio inteligente." },
    { icon: "pi pi-calendar", titulo: "Agendamento Inteligente", texto: "Coordene agendas e horários sem atrito." },
    { icon: "pi pi-folder-open", titulo: "Prontuário Unificado", texto: "Tenha o contexto clínico sempre acessível." }
];

function HomeFuncionalidades(): JSX.Element {
    return (
        <section className="functional-banner">
            <div className="functional-copy">
                <span className="functional-kicker">ECOSSISTEMA MEDFLOW</span>
                <h2>Uma visão mais clara para cada decisão clínica.</h2>
                <div className="functional-list">
                    {funcionalidades.map((item) => (
                        <article className="functional-item" key={item.titulo}>
                            <span className="functional-icon"><i className={item.icon} /></span>
                            <div><h3>{item.titulo}</h3><p>{item.texto}</p></div>
                        </article>
                    ))}
                </div>
            </div>
            <div className="functional-visual" aria-hidden="true">
                <div className="visual-ring ring-one" />
                <div className="visual-ring ring-two" />
                <div className="visual-monitor"><i className="pi pi-heart" /><span>Monitoramento clínico</span><strong>98.4%</strong></div>
            </div>
        </section>
    );
}

export default HomeFuncionalidades;
