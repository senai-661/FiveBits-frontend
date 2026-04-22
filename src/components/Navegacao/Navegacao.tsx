import { type JSX } from "react";

function Navegacao(): JSX.Element {
    return (
        <header className="navbar-custom">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src="/assets/app-icon.png" alt="Logo" style={{ height: '50px' }} />
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                    <span style={{ color: 'var(--cor-logo-primaria)' }}>Med</span>
                    <span style={{ color: 'var(--cor-logo-secundaria)' }}>Flow</span>
                </span>
            </div>

            <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                <a href="/" style={{ textDecoration: 'none', color: 'black', fontSize: '1.1rem' }}>Home</a>
                <a href="/login" style={{ 
                    backgroundColor: 'var(--cor-botao-sucesso)', /* #18C401 [cite: 322] */
                    color: 'white',
                    padding: '12px 30px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                }}>Entrar</a>
            </nav>
        </header>
    );
}

export default Navegacao;