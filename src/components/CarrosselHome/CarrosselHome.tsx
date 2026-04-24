import { type JSX } from "react";
// Importações corrigidas e módulos necessários
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from "swiper/modules";

// Importação obrigatória dos estilos do Swiper v11
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./CarrosselHome.css";

// Usando imagens do Unsplash focadas em saúde e tecnologia
const imgTech = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070";
const imgTelemed = "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=2072";

function CarrosselHome(): JSX.Element {
    const slides = [
        {
            bg: imgTech,
            badge: "Inteligência Médica",
            titulo: "Fluxo Digital MedFlow",
            texto: "Gestão inteligente para clínicas multidisciplinares com a agilidade da era digital.",
            btn: "Ver Agenda"
        },
        {
            bg: imgTelemed,
            badge: "Telemedicina",
            titulo: "Conectividade Sem Fronteiras",
            texto: "Consultas por vídeo integradas diretamente ao prontuário do paciente com total segurança.",
            btn: "Iniciar Chamada"
        }
    ];

    return (
        <div className="carrossel-wrapper-modern">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade, Parallax]}
                effect="fade"
                speed={1200}
                parallax={true} // Ativa o efeito de paralaxe
                loop={true}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={true}
                className="swiper-tech"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}> {/* O erro 'Cannot find name' deve sumir aqui */}
                        {/* Imagem com efeito Parallax */}
                        <div 
                            className="slide-image-bg" 
                            style={{ backgroundImage: `url(${slide.bg})` }}
                            data-swiper-parallax="25%"
                        >
                            <div className="overlay-dark"></div>
                        </div>

                        {/* Conteúdo com efeito KeyUp (Texto sobe suavemente) */}
                        <div className="slide-content-area">
                            <div className="tech-glass-card" data-swiper-parallax="-300">
                                <span className="tech-badge">{slide.badge}</span>
                                <h2 className="tech-title">{slide.titulo}</h2>
                                <p className="tech-desc">{slide.texto}</p>
                                <button className="btn-tech-neon">{slide.btn}</button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default CarrosselHome;