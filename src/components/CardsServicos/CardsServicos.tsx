import { type JSX } from "react";

// Definição dos dados para os cards (Título e URL da Imagem correspondente)
const servicos = [
    { 
        titulo: "Redes Credenciadas", 
        // Exemplo: Imagem de equipe médica ou mapa
        img: "https://d24ux3x5lhpqgy.cloudfront.net/361aec56-5f72-4946-b475-34bfd2bceb70" 
    },
    { 
        titulo: "Planos de Saúde", 
        // Exemplo: Imagem de carteirinha ou família
        img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80" 
    },
    { 
        titulo: "Medicina Preventiva", 
        // Exemplo: Imagem de check-up ou idosos ativos
        img: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&q=80" 
    },
    { 
        titulo: "2ª via de Boleto", 
        // Exemplo: Imagem de notebook ou calculadora
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80" 
    },
];

function CardsServicos(): JSX.Element {
    return (
        <section style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Grid responsivo
            gap: '8px',
            padding: '8px 5%',
            backgroundColor: '#081729'
        }}>
            {servicos.map((item, index) => (
                <div key={index} 
                    style={{
                        backgroundColor: '#002D47',
                        borderRadius: '10px',
                        overflow: 'hidden', // Garante que a imagem siga o arredondamento
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                        transition: 'transform 0.3s, boxShadow 0.3s',
                        cursor: 'pointer',
                        border: '1px solid rgba(144, 169, 85, 0.2)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 0 24px rgba(0, 170, 255, 0.22)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                    }}
                >
                    {/* CONTAINER DA IMAGEM (NOVO) */}
                    <div style={{ 
                        width: '100%', 
                        height: '48px',
                        overflow: 'hidden',
                        borderBottom: '1px solid rgba(144, 169, 85, 0.2)'
                    }}>
                        <img 
                            src={item.img} 
                            alt={item.titulo} 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover' // Garante que a imagem cubra a área sem distorcer
                            }} 
                        />
                    </div>

                    {/* CONTAINER DO TEXTO E BOTÃO */}
                    <div style={{ 
                        padding: '6px 10px',
                        textAlign: 'center',
                        flex: 1, // Faz este container ocupar o espaço restante
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between' // Alinha o título no topo e o botão na base
                    }}>
                        <h3 style={{ 
                            fontSize: '0.75rem',
                            color: '#FFFFFF',
                            marginBottom: '5px',
                            fontWeight: '600',
                            lineHeight: '1.2'
                        }}>
                            {item.titulo}
                        </h3>
                        
                        <button style={{
                            backgroundColor: '#00AAFF',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '7px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '0.7rem',
                            width: '100%', // Botão ocupando toda a largura interna (moderno)
                            transition: 'background 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005F91'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00AAFF'}
                        >
                            Clique aqui
                        </button>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default CardsServicos;