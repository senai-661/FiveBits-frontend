import type { JSX } from "react";

function Rodape(): JSX.Element {
    return (
        <footer 
            className="h-[12vh] flex flex-col items-center justify-center border-t" 
            style={{ backgroundColor: '#F5F5F5', borderColor: '#D4D4D4' }}
        >
            <div className="text-center">
                <p className="text-sm font-semibold" style={{ color: '#000000' }}>
                    © 2026 MedFlow - Sistema de Gestão de Clínica Médica [cite: 8, 11]
                </p>
                <p className="text-xs mt-2" style={{ color: '#3F4DE3' }}>
                    Desenvolvido por: Enzo Cassão, Gabriel Henrique, Ismael Henrique, Jadson Santos e Lívia Borges 
                </p>
            </div>
            
            <div className="mt-2 flex gap-4">
                <span className="text-[10px] uppercase tracking-widest text-gray-400">
                    Sertãozinho - SP 
                </span>
            </div>
        </footer>
    );
}

export default Rodape;