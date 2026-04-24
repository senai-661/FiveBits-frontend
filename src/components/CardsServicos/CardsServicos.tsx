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
            gap: '30px', // Espaço moderno entre os cards
            padding: '60px 10%', // Padding lateral para centralizar
            backgroundColor: '#ffffff'
        }}>
            {servicos.map((item, index) => (
                <div key={index} 
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '20px', // Bordas arredondadas modernas
                        overflow: 'hidden', // Garante que a imagem siga o arredondamento
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)', // Sombra muito suave (limpa)
                        transition: 'transform 0.3s, boxShadow 0.3s',
                        cursor: 'pointer',
                        border: '1px solid #f0f0f0', // Borda sutil
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 168, 150, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.05)';
                    }}
                >
                    {/* CONTAINER DA IMAGEM (NOVO) */}
                    <div style={{ 
                        width: '100%', 
                        height: '160px', // Altura fixa para alinhar os cards
                        overflow: 'hidden',
                        borderBottom: '1px solid #f0f0f0' // Separação sutil
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
                        padding: '25px', 
                        textAlign: 'center',
                        flex: 1, // Faz este container ocupar o espaço restante
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between' // Alinha o título no topo e o botão na base
                    }}>
                        <h3 style={{ 
                            fontSize: '1.25rem', // Fonte maior e limpa
                            color: '#1a1a1a', 
                            marginBottom: '20px',
                            fontWeight: '600',
                            lineHeight: '1.2'
                        }}>
                            {item.titulo}
                        </h3>
                        
                        <button style={{
                            backgroundColor: '#00a896', // Verde Água/Esmeralda moderno (capturado do avatar)
                            color: 'white',
                            border: 'none',
                            padding: '12px 25px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '0.95rem',
                            width: '100%', // Botão ocupando toda a largura interna (moderno)
                            transition: 'background 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#008e7f'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00a896'}
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