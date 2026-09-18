import { type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./CarrosselHome.css";

const slidesData = [
    { bg: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1920", badge: "Triagem Inteligente", titulo: "Triagem Prévia por IA", texto: "Análise automatizada de sintomas antes da consulta para classificar urgências e agilizar o fluxo de atendimento da clínica.", btn: "Saber Mais", route: "/lista/consulta" },
    { bg: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1920", badge: "Atendimento Remoto", titulo: "Telemedicina Integrada", texto: "Consultas por vídeo de alta definição diretamente conectadas ao prontuário do paciente com emissão de receitas digitais.", btn: "Iniciar Chamada", route: "/lista/consulta" },
    { bg: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1920", badge: "Segurança de Dados", titulo: "Prontuário Digital Criptografado", texto: "Acesso centralizado e seguro ao histórico clínico completo, laudos e exames com conformidade total à LGPD.", btn: "Acessar Prontuário", route: "/lista/paciente" },
    { bg: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=1920", badge: "Gestão Unificada", titulo: "Agendamento de Consultas 24/7", texto: "Sincronização de agenda presencial e online em tempo real para médicos e pacientes evitarem conflitos de horário.", btn: "Ver Agenda", route: "/lista/consulta" },
    { bg: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1920", badge: "Corpo Clínico", titulo: "Conectividade Médica", texto: "Ferramentas integradas para discussão de casos multidisciplinares e encaminhamentos internos rápidos.", btn: "Painel Médico", route: "/lista/medico" },
    { bg: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1920", badge: "Gestão do Paciente", titulo: "Histórico Unificado de Saúde", texto: "Acompanhamento contínuo da jornada do paciente com lembretes automáticos de consultas e prescrições.", btn: "Ver Pacientes", route: "/lista/paciente" }
];

export default function CarrosselHome(): JSX.Element {
    const navigate = useNavigate();

    return (
        <div className="carrossel-wrapper-fullscreen">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                speed={1000}
                loop
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                navigation
                pagination={{ clickable: true }}
                className="swiper-fullscreen"
            >
                {slidesData.map((slide) => (
                    <SwiperSlide key={slide.titulo}>
                        <div className="slide-bg-image" style={{ backgroundImage: `url(${slide.bg})` }}>
                            <div className="overlay-dark-medflow" />
                            <div className="slide-content-container">
                                <div className="glass-card-hero">
                                    <span className="hero-badge">{slide.badge}</span>
                                    <h1 className="hero-title">{slide.titulo}</h1>
                                    <p className="hero-desc">{slide.texto}</p>
                                    <button className="btn-hero-primary" type="button" onClick={() => navigate(slide.route)}>{slide.btn}</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
