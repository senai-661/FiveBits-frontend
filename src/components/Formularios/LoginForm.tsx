import { type JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthRequests from '../../fetch/AuthRequests';

function LoginForm(): JSX.Element {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const corMedFlow = "#00a896";

    interface LoginData {
        email: string;
        senha: string;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const login: LoginData = { email, senha };
        try {
            if (await AuthRequests.login(login)) {
                window.location.href = '/bem-vindo';
            }
        } catch (error) {
            console.error(`Erro ao tentar fazer login: ${error}`);
            alert('Erro ao fazer login, verifique se usuário e/ou senha estão corretos.');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: corMedFlow, // Fundo principal na cor da marca
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px', // Bordas arredondadas modernas
                padding: '3rem 2.5rem',
                width: '100%',
                maxWidth: '450px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)', // Sombra profunda e suave
                textAlign: 'center',
            }}>
                {/* Logo Estilizada */}
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: '#1a3a36', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-1px' }}>Med</span>
                    <span style={{ color: corMedFlow, fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-1px' }}>Flow</span>
                </div>

                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1a3a36', marginBottom: '0.5rem' }}>
                    Área do paciente
                </h2>
                <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '2.5rem', fontWeight: '400' }}>
                    Bem-vindo de volta! Acesse sua conta.
                </p>

                <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                    {/* Input de E-mail */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#1a3a36', marginBottom: '0.5rem' }}>
                            E-mail
                        </label>
                        <input
                            type="email"
                            placeholder="exemplo@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.8rem 1rem',
                                borderRadius: '12px',
                                border: '2px solid #eef2f2',
                                fontSize: '1rem',
                                color: '#111827',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                boxSizing: 'border-box'
                            }}
                            onFocus={e => {
                                e.currentTarget.style.borderColor = corMedFlow;
                                e.currentTarget.style.boxShadow = `0 0 0 4px rgba(0, 168, 150, 0.1)`;
                            }}
                            onBlur={e => {
                                e.currentTarget.style.borderColor = '#eef2f2';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Input de Senha */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a3a36' }}>
                                Senha
                            </label>
                            <Link
                                to="/recuperar-senha"
                                style={{ fontSize: '0.85rem', color: corMedFlow, textDecoration: 'none', fontWeight: 600 }}
                            >
                                Esqueci minha senha
                            </Link>
                        </div>
                        <input
                            type="password"
                            placeholder="Sua senha segura"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.8rem 1rem',
                                borderRadius: '12px',
                                border: '2px solid #eef2f2',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                boxSizing: 'border-box'
                            }}
                            onFocus={e => {
                                e.currentTarget.style.borderColor = corMedFlow;
                                e.currentTarget.style.boxShadow = `0 0 0 4px rgba(0, 168, 150, 0.1)`;
                            }}
                            onBlur={e => {
                                e.currentTarget.style.borderColor = '#eef2f2';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Botão Principal */}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: corMedFlow,
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(0, 168, 150, 0.3)'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#008e7f';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = corMedFlow;
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        Entrar na sua conta
                    </button>
                </form>

                <p style={{ marginTop: '2rem', fontSize: '0.95rem', color: '#6b7280' }}>
                    Ainda não tem conta?{' '}
                    <Link
                        to="/cadastro"
                        style={{ color: corMedFlow, fontWeight: 700, textDecoration: 'none' }}
                    >
                        Cadastre-se grátis
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;