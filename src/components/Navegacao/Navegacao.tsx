import { type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';

interface CustomMenuItem extends MenuItem {
    badge?: number;
    shortcut?: string;
    items?: CustomMenuItem[];
}

function Navegacao(): JSX.Element {
    const items: CustomMenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            className: 'm-5 text-white text-lg',
            url: "/"
        },
        {
            label: 'Pacientes',
            icon: 'pi pi-star',
            className: 'm-5 text-white text-lg',
            url: "/lista/pacientes"
        },
        {
            label: 'Medicos',
            icon: 'pi pi-star',
            className: 'm-5 text-white text-lg',
            url: "/lista/medicos"
        },
        {
            label: 'Consultas',
            icon: 'pi pi-star',
            className: 'm-5 text-white text-lg',
            url: "/lista/medicos"   
        },
        {  
            label: 'Login',
            icon: 'pi pi-star',
            className: 'm-5 text-white text-lg',
            url: "/lista/login"
        }
    ];

    const start = (
        <img
            alt="logo"
            src='./src/assets/app-icon.png'
            height="100"
            className="h-20 p-3 ml-10 mr-5 h-[7rem]"
        />
    );

    const end = (
        <div className="flex align-items-center gap-2">
        </div>
    );

    return (
        <header className="card h-[12vh] bg-slate-700 content-center">
            <Menubar 
                model={items} 
                start={start} 
                end={end} 
            />
        </header>
    );
}

export default Navegacao;