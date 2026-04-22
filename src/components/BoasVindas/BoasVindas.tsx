import { type JSX } from "react";

function BoasVindas(): JSX.Element {
    return (
        <section style={{ 
            textAlign: 'center', 
            padding: '40px',
            maxWidth: '900px',
            animation: 'fadeIn 1s ease-in' // Efeito suave de entrada
        }}>
            <h1 style={{ 
                color: 'var(--cor-inspiracao)', 
                fontSize: '3.5rem', 
                fontWeight: 'bold',
                marginBottom: '24px' 
            }}>
                Bem-vindo ao MedFlow
            </h1>

            <p style={{ 
                fontSize: '1.4rem', 
                color: 'var(--cor-texto)', 
                lineHeight: '1.6',
                marginBottom: '20px'
            }}>
                Sua saúde merece a agilidade da era digital. Conectamos você a 
                consultas <strong>presenciais e por vídeo</strong> com total segurança.
            </p>

            <p style={{ 
                fontSize: '1.1rem', 
                color: 'var(--cor-telemed-destaque)',
                fontWeight: '500'
            }}>
                Gestão inteligente para clínicas multidisciplinares e cuidado humanizado.
            </p>
        </section>
    );
}

export default BoasVindas;