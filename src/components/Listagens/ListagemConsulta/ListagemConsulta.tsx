import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";

function PListagemConsulta(): JSX.Element {
    // Dados fictícios de consultas para visualização
    const consultas = [
        { id: 1, data: "22/04/2026", hora: "14:00", paciente: "Enzo Cassão", medico: "Dr. Gabriel Henrique", status: "Agendada" },
        { id: 2, data: "23/04/2026", hora: "09:30", paciente: "Lívia Borges", medico: "Dra. Lívia Borges", status: "Confirmada" },
        { id: 3, data: "21/04/2026", hora: "16:00", paciente: "Jadson Santos", medico: "Dr. Ismael Henrique", status: "Realizada" },
    ];

    // Função para definir a cor do status
    const getStatusStyle = (status: string) => {
        switch(status) {
            case "Agendada": return { backgroundColor: '#FFF4E5', color: '#B76E00' }; // Laranja
            case "Confirmada": return { backgroundColor: '#E8F7FE', color: '#3F4DE3' }; // Azul
            case "Realizada": return { backgroundColor: '#E7F9E2', color: '#18C401' }; // Verde
            default: return { backgroundColor: '#F0F0F0', color: '#666' };
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navegacao />

            <main style={{ flex: 1, padding: '40px 10%', backgroundColor: 'var(--cor-container)' }}>
                {/* Cabeçalho */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h1 style={{ color: 'var(--cor-inspiracao)', fontSize: '1.8rem', fontWeight: 'bold' }}>
                        Agenda de Consultas
                    </h1>
                    <button style={{ 
                        backgroundColor: 'var(--cor-logo-primaria)', 
                        color: 'white', 
                        padding: '10px 20px', 
                        borderRadius: '8px', 
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        + Nova Consulta
                    </button>
                </div>

                {/* Tabela de Consultas */}
                <div style={{ 
                    backgroundColor: 'white', 
                    borderRadius: '12px', 
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
                    overflow: 'hidden',
                    border: '1px solid #e0e0e0'
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f0f0f0', backgroundColor: '#f9f9f9' }}>
                                <th style={estiloCabecalho}>DATA/HORA</th>
                                <th style={estiloCabecalho}>PACIENTE</th>
                                <th style={estiloCabecalho}>MÉDICO</th>
                                <th style={estiloCabecalho}>STATUS</th>
                                <th style={estiloCabecalho}>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consultas.map((consulta) => (
                                <tr key={consulta.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td style={estiloCelula}>
                                        <div style={{ fontWeight: 'bold' }}>{consulta.data}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}> às {consulta.hora}</div>
                                    </td>
                                    <td style={estiloCelula}>{consulta.paciente}</td>
                                    <td style={estiloCelula}>
                                        <span style={{ fontSize: '0.9rem' }}>{consulta.medico}</span>
                                    </td>
                                    <td style={estiloCelula}>
                                        <span style={{ 
                                            padding: '4px 12px', 
                                            borderRadius: '20px', 
                                            fontSize: '0.75rem', 
                                            fontWeight: 'bold',
                                            ...getStatusStyle(consulta.status)
                                        }}>
                                            {consulta.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td style={estiloCelula}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button style={btnAcao}>Reagendar</button>
                                            <button style={{ ...btnAcao, color: '#E53E3E' }}>Cancelar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <Rodape />
        </div>
    );
}

const estiloCabecalho: React.CSSProperties = {
    padding: '16px',
    fontSize: '0.75rem',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '1px'
};

const estiloCelula: React.CSSProperties = {
    padding: '16px',
    fontSize: '0.95rem',
    color: '#333'
};

const btnAcao: React.CSSProperties = {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    fontSize: '0.8rem',
    cursor: 'pointer'
};

export default PListagemConsulta;