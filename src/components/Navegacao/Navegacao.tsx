import { type JSX, useState } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import AuthRequests from '../../fetch/AuthRequests';
import logoImg from "../../assets/logo.png";
import "./Navegacao.css";

function Navegacao(): JSX.Element {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });

    const [email] = useState(() => localStorage.getItem('email') ?? '');

    const logout = () => {
        AuthRequests.removeToken();
        setIsAuthenticated(false);
    };

    const items: MenuItem[] = [
        { label: 'Home', icon: 'pi pi-home', url: "/" },
        { label: 'Paciente', icon: 'pi pi-users', url: "/lista/paciente" },
        { label: 'Médico', icon: 'pi pi-user-plus', url: "/lista/medico" },
        { label: 'Consulta', icon: 'pi pi-calendar', url: "/lista/consulta" }
    ];

    // Logo encapsulada para o lado esquerdo
    const startSection = (
        <div className="nav-logo-wrapper">
            <img alt="MedFlow Logo" src={logoImg} className="logo-img-prime" />
        </div>
    );

    // Seção de usuário para o lado direito
    const endSection = (
        <div className="nav-user-controls">
            {isAuthenticated ? (
                <>
                    <div className="user-text-container">
                        <span className="welcome-span">Olá,</span>
                        <span className="email-span">{email}</span>
                    </div>
                    <button onClick={logout} className="btn-logout-modern">
                        <i className="pi pi-power-off"></i> Sair
                    </button>
                </>
            ) : (
                <a href="/login" className="btn-login-modern">Entrar</a>
            )}
        </div>
    );

    return (
        <header className="header-glass">
            <Menubar
                model={isAuthenticated ? items : [items[0]]}
                start={startSection}
                end={endSection}
                className="main-menubar"
            />
        </header>
    );
}

export default Navegacao;