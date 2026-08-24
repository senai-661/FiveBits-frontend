import { type JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthRequests from '../../../fetch/AuthRequests';
import styles from './FormLogin.module.css';

function LoginForm(): JSX.Element {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    interface LoginData {
        email: string;
        senha: string;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        <main className={styles.loginStage}>
            <section className={styles.loginCard} aria-labelledby="login-title">
                <div className={styles.brand} aria-label="MedFlow">
                    <span>Med</span><strong>Flow</strong>
                </div>

                <h1 id="login-title">Área do paciente</h1>
                <p className={styles.subtitle}>Bem-vindo de volta! Acesse sua conta.</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="login-email">E-mail</label>
                        <input
                            id="login-email"
                            type="email"
                            placeholder="exemplo@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <div className={styles.passwordLabel}>
                            <label htmlFor="login-password">Senha</label>
                            <Link to="/recuperar-senha">Esqueci minha senha</Link>
                        </div>
                        <input
                            id="login-password"
                            type="password"
                            placeholder="Sua senha segura"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button type="submit" className={styles.loginButton}>
                        Entrar na sua conta
                    </button>
                </form>

                <p className={styles.registerPrompt}>
                    Ainda não tem conta? <Link to="/cadastro">Cadastre-se grátis</Link>
                </p>
            </section>
        </main>
    );
}

export default LoginForm;
