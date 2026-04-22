import { type JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthRequests from '../../fetch/AuthRequests';

function LoginForm(): JSX.Element {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    interface LoginData {
        email: string;
        senha: string;
    }

    interface FormEvent {
        preventDefault: () => void;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const login: LoginData = { email, senha };
        try {
            if (await AuthRequests.login(login)) {
                window.location.href = '/';
            }
        } catch (error) {
            console.error(`Erro ao tentar fazer login: ${error}`);
            alert('Erro ao fazer login, verifique se usuário e/ou senha estão corretos.');
        }
    };

    return (
        <div style={{
            minHeight: 'calc(100vh - 64px)',
            backgroundColor: '#e8f4fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '2.5rem 2rem',
                width: '100%',
                maxWidth: '420px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                textAlign: 'center',
            }}>
                {/* Logo */}
                <div style={{ marginBottom: '0.25rem' }}>
                    <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '1.4rem' }}>+ Med</span>
                    <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '1.4rem', marginLeft: '4px' }}>Flow</span>
                </div>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: '0.5rem 0 0.25rem' }}>
                    Área do paciente
                </h2>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
                    Bem-vindo de volta! Acesse sua conta.
                </p>

                <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                    {/* Email */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
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
                                padding: '0.65rem 0.85rem',
                                borderRadius: '7px',
                                border: '1px solid #d1d5db',
                                fontSize: '0.95rem',
                                color: '#111827',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s',
                            }}
                            onFocus={e => (e.currentTarget.style.borderColor = '#2563eb')}
                            onBlur={e => (e.currentTarget.style.borderColor = '#d1d5db')}
                        />
                    </div>

                    {/* Senha */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#374151' }}>
                                Senha
                            </label>
                            <Link
                                to="/recuperar-senha"
                                style={{ fontSize: '0.85rem', color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}
                                onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                                onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
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
                                padding: '0.65rem 0.85rem',
                                borderRadius: '7px',
                                border: '1px solid #d1d5db',
                                fontSize: '0.95rem',
                                color: '#111827',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s',
                            }}
                            onFocus={e => (e.currentTarget.style.borderColor = '#2563eb')}
                            onBlur={e => (e.currentTarget.style.borderColor = '#d1d5db')}
                        />
                    </div>

                    {/* Botão */}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#16a34a',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '1rem',
                            border: 'none',
                            borderRadius: '7px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#15803d')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#16a34a')}
                    >
                        Entrar na sua conta
                    </button>
                </form>

                <p style={{ marginTop: '1.25rem', fontSize: '0.9rem', color: '#6b7280' }}>
                    Ainda não tem conta?{' '}
                    <Link
                        to="/cadastro"
                        style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                        onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                    >
                        Cadastre-se grátis
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
