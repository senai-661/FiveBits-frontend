import { type JSX } from "react";
import avatar from "../../assets/avatar.png"; // Certifique-se que o caminho está correto

function BoasVindas(): JSX.Element {
    return (
        <section style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4rem 2rem',
            maxWidth: '1200px',
            margin: '0 auto',
            gap: '2rem',
            minHeight: '70vh'
        }}>
            {/* Lado Esquerdo: Textos */}
            <div style={{ flex: 1, textAlign: 'left' }}>
                <h1 style={{ 
                    color: '#000', 
                    fontSize: '3.5rem', 
                    fontWeight: 'bold',
                    lineHeight: '1.1',
                    marginBottom: '1.5rem' 
                }}>
                    Bem-vindo ao <span style={{ color: '#000' }}>MedFlow</span>
                </h1>
                <p style={{ 
                    fontSize: '1.25rem', 
                    color: '#333', 
                    lineHeight: '1.6',
                    maxWidth: '500px'
                }}>
                    Sua saúde merece a agilidade da era digital. Conectamos você a consultas 
                    <strong> presenciais e por vídeo</strong> com total segurança.
                </p>
                <p style={{ 
                    color: '#666', 
                    marginTop: '1.5rem',
                    fontSize: '1.1rem' 
                }}>
                    Gestão inteligente para clínicas multidisciplinares e cuidado humanizado.
                </p>
            </div>

            {/* Lado Direito: Imagem */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <img 
                    src={avatar} 
                    alt="Médica MedFlow" 
                    style={{ 
                        width: '100%', 
                        maxWidth: '500px', 
                        height: 'auto',
                        objectFit: 'contain'
                    }} 
                />
            </div>
        </section>
    );
}

export default BoasVindas;