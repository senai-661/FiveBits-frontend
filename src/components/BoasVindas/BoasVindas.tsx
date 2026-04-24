import { type JSX } from "react";
import avatar from "../../assets/avatar.png";

function BoasVindas(): JSX.Element {
    // Definindo a cor base capturada do avatar para unificar o design
    const corBaseMedFlow = "#00a896"; // Tom Esmeralda/Ciano do avatar

    return (
        <section style={{ 
            // Fundo Sólido Unificado (Removendo o degradê antigo e a imagem de fundo)
            backgroundColor: corBaseMedFlow,
            minHeight: '500px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            color: 'white',
            padding: '0 10%'
        }}>
            {/* Conteúdo de Texto à Esquerda */}
            <div style={{ maxWidth: '550px', zIndex: 2, position: 'relative' }}>
                <span style={{ 
                    background: 'rgba(255, 255, 255, 0.2)', // Badge sutil e moderno
                    color: 'white',
                    padding: '6px 18px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>MEDFLOW SAÚDE</span>
                
                <h1 style={{ 
                    fontSize: '4rem', // Fonte maior e mais impactante
                    margin: '25px 0 15px 0', 
                    fontWeight: '800', // Extra bold para modernidade
                    lineHeight: '1.05',
                    letterSpacing: '-1px'
                }}>
                    APP MedFlow
                </h1>
                <p style={{ 
                    fontSize: '1.25rem', 
                    marginBottom: '40px', 
                    opacity: 0.95, 
                    lineHeight: '1.6',
                    fontWeight: '300' // Fonte mais leve para o parágrafo
                }}>
                    Sua saúde na palma da sua mão! Agende consultas, acesse exames e fale com especialistas com total agilidade.
                </p>
                <button style={{ 
                    backgroundColor: 'white', // Botão branco para alto contraste
                    color: corBaseMedFlow, // Texto na cor do fundo
                    border: 'none', 
                    padding: '15px 40px', 
                    borderRadius: '30px', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)', // Sombra suave no botão
                    transition: 'transform 0.2s, boxShadow 0.2s'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }}
                >
                    Saiba mais
                </button>
            </div>

            {/* Container da Imagem à Direita (Totalmente Integrada) */}
            <div style={{ 
                position: 'absolute', 
                right: '0', // Colado na borda direita
                bottom: '0', 
                height: '100%', 
                width: '50%', // Ocupa metade da tela
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                zIndex: 1,
                // Usando máscara para suavizar a borda esquerda da imagem, se necessário
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%)',
                maskImage: 'linear-gradient(to right, transparent 0%, black 20%)',
            }}>
                <img 
                    src={avatar} 
                    alt="Médica MedFlow Digital" 
                    style={{ 
                        height: '98%', // Quase altura total
                        width: 'auto',
                        objectFit: 'contain',
                        // REMOVIDO: mixBlendMode (causava a sombra)
                        // REMOVIDO: Filtros que alteravam a cor
                    }} 
                />
            </div>
        </section>
    );
}

export default BoasVindas;