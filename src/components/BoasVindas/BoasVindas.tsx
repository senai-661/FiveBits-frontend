import { type JSX } from "react";

function BoasVindas(): JSX.Element {
    return (
        <section style={{ 
            textAlign: 'center', 
            padding: '2rem',
            maxWidth: '1000px', // Limita a largura para o texto não espalhar
            margin: '0 auto'
        }}>
            <h1 style={{ 
                color: 'var(--cor-texto)', 
                fontSize: '3.5rem', 
                fontWeight: 'bold',
                marginBottom: '1rem' 
            }}>
                Bem-vindo ao MedFlow
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#333', lineHeight: '1.5' }}>
                Sua saúde merece a agilidade da era digital. Conectamos você a consultas 
                <strong> presenciais e por vídeo</strong> com total segurança.
            </p>
            <p style={{ color: '#666', marginTop: '10px' }}>
                Gestão inteligente para clínicas multidisciplinares e cuidado humanizado.
            </p>
        </section>
    );
}
export default BoasVindas;