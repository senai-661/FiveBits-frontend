import { type JSX } from "react";
import "./CardsServicos.css";

const servicos = [
    { titulo: "Redes credenciadas", texto: "Encontre especialistas e unidades próximas de você.", icone: "pi pi-map-marker" },
    { titulo: "Planos de saúde", texto: "Acompanhe benefícios e coberturas com clareza.", icone: "pi pi-shield" },
    { titulo: "Medicina preventiva", texto: "Cuidados proativos para uma rotina mais saudável.", icone: "pi pi-heart" },
    { titulo: "2ª via de boleto", texto: "Tenha seus documentos sempre à mão, com segurança.", icone: "pi pi-file" },
];

function CardsServicos(): JSX.Element {
    return (
        <>
            <section id="servicos" className="services-section section">
                <div className="content-container">
                    <div className="section-heading">
                        <span className="eyebrow">Seu cuidado em um só lugar</span>
                        <h2 className="section-title">Serviços desenhados para simplificar.</h2>
                        <p className="section-description">Uma estrutura digital leve e acolhedora para acompanhar cada passo da sua jornada de saúde.</p>
                    </div>
                    <div className="service-grid">
                        {servicos.map((item, index) => (
                            <article className={`service-card service-card-${index + 1}`} key={item.titulo}>
                                <div className="service-icon">
                                    <i className={item.icone} />
                                </div>
                                <h3>{item.titulo}</h3>
                                <p>{item.texto}</p>
                                <a href="/login" className="button button-primary service-btn">
                                    Saiba mais <i className="pi pi-arrow-up-right" />
                                </a>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
            <section className="portfolio-section section">
                <div className="content-container">
                    <div className="section-heading">
                        <span className="eyebrow">Experiência MedFlow</span>
                        <h2 className="section-title">Tecnologia que deixa o cuidado mais próximo.</h2>
                    </div>
                    <div className="portfolio-grid">
                        <article className="portfolio-card portfolio-large">
                            <span>Agenda integrada</span>
                            <strong>Tenha mais tempo para o que importa.</strong>
                        </article>
                        <article className="portfolio-card portfolio-sky">
                            <span>Dados protegidos</span>
                            <strong>Segurança em cada interação.</strong>
                        </article>
                        <article className="portfolio-card portfolio-green">
                            <span>Visão completa</span>
                            <strong>Uma gestão mais consciente.</strong>
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
}
export default CardsServicos;

