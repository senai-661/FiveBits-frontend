// Navegacao.tsx
import { type JSX, useState } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import AuthRequests from '../../fetch/AuthRequests';
import logoImg from "../../assets/logo.png"; // Certifique-se de que o arquivo está lá
import "./Navegacao.css"; // Certifique-se de importar o CSS corrigido

function Navegacao(): JSX.Element {
    // Estado de Autenticação
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });

    // Recupera o email para a saudação
    const [email] = useState(() => {
        return localStorage.getItem('email') ?? '';
    });

    const logout = () => {
        AuthRequests.removeToken();
        setIsAuthenticated(false);
    };

    // Itens do Menu MedFlow
    const items: MenuItem[] = [
        { label: 'Home', icon: 'pi pi-home', url: "/" },
        { label: 'Paciente', icon: 'pi pi-users', url: "/lista/paciente" },
        { label: 'Médico', icon: 'pi pi-user-plus', url: "/lista/medico" },
        { label: 'Consulta', icon: 'pi pi-calendar', url: "/lista/consulta" }
    ];

    // Seção de Saudação e Logout (end)
    const endSection = (
        <div className="flex items-center gap-3 pr-6">
            {isAuthenticated ? (
                <>
                    <p className="text-user-greeting">
                        Olá, <span className="text-user-email">{email}</span>
                    </p>
                    <button
                        onClick={logout}
                        className="btn-logout"
                    >
                        Sair
                    </button>
                </>
            ) : (
                <a
                    href="/login"
                    className="btn-login"
                >
                    Entrar
                </a>
            )}
        </div>
    );

    return (
        <header className="navbar-custom">
            <div className="nav-logo-section">
                <img
                    alt="MedFlow Logo"
                    src={logoImg}
                    className="logo-img"
                />
            </div>
            {/* O Menubar agora só contém os links centrais, a logo e o fim estão no header */}
            <Menubar
                model={isAuthenticated ? items : [items[0]]}
                end={endSection}
                className="menubar-reset"
            />
        </header>
    );
}

export default Navegacao;