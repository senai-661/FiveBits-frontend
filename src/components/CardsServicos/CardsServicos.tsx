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
                            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85" alt="Pessoa organizando uma agenda em um notebook" />
                            <span>Agenda integrada</span>
                            <strong>Tenha mais tempo para o que importa.</strong>
                        </article>
                        <article className="portfolio-card portfolio-sky">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhDNJfEkjOUr7CHmeZ_PUCIGpaxvHyja4eI_1gN7-0Ecr7njOiPjYwdxk&s=10" alt="Cadeado representando segurança e proteção de dados" />
                            <span>Dados protegidos</span>
                            <strong>Segurança em cada interação.</strong>
                        </article>
                        <article className="portfolio-card portfolio-green">
                            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85" alt="Profissional de saúde analisando informações" />
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

