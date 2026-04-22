import { type JSX } from "react";
import { useState, useEffect } from "react";
import type { ConsultaDTO } from "../../../dto/ConsultaDTO";
import ConsultaRequest from "../../../fetch/ConsultaRequest";
// Importações de componentes caso existam no seu projeto
// import Navegacao from "../../../components/Navegacao/Navegacao";
// import Rodape from "../../../components/Rodape/Rodape";

function ListagemConsultas(): JSX.Element {
    const [consultas, setConsultas] = useState<ConsultaDTO[]>([]);

    useEffect(() => {
        const buscarConsultas = async () => {
            try {
                const listaDeConsultas = await ConsultaRequest.obterListaDeConsultas();
                setConsultas(listaDeConsultas);
            } catch (error) {
                console.error(`Erro ao buscar consultas. ${error}`);
                alert("Erro ao criar a listagem de consultas.");
            }
        }
        buscarConsultas();
    }, []);

    // Helper para formatar data e hora do DTO
    const formatarDataHora = (dataIso: string) => {
        const dataObj = new Date(dataIso);
        return {
            data: dataObj.toLocaleDateString('pt-BR'),
            hora: dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
            {/* <Navegacao /> */}

            <main style={{ flex: 1, padding: '40px 10%' }}>
                {/* Cabeçalho da Seção */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h1 style={{ color: '#2c3e50', fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>
                        Agenda de Consultas
                    </h1>
                    <button style={{ 
                        backgroundColor: '#3f4de3', 
                        color: 'white', 
                        padding: '10px 20px', 
                        borderRadius: '8px', 
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'opacity 0.2s'
                    }}>
                        + Nova Consulta
                    </button>
                </div>

                {/* Container da Tabela */}
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
                                <th style={estiloCabecalho}>DATA / HORA</th>
                                <th style={estiloCabecalho}>PACIENTE (ID)</th>
                                <th style={estiloCabecalho}>MÉDICO (ID)</th>
                                <th style={estiloCabecalho}>TRIAGEM</th>
                                <th style={estiloCabecalho}>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consultas.length > 0 ? (
                                consultas.map((consulta) => {
                                    const { data, hora } = formatarDataHora(consulta.dataHora.toString());
                                    return (
                                        <tr key={consulta.idConsulta} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                            <td style={estiloCelula}>
                                                <div style={{ fontWeight: 'bold' }}>{data}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#888' }}>às {hora}</div>
                                            </td>
                                            <td style={estiloCelula}>
                                                <div style={{ fontWeight: '500' }}>Paciente ID: {consulta.idPaciente}</div>
                                            </td>
                                            <td style={estiloCelula}>
                                                <span style={{ fontSize: '0.9rem' }}>Médico ID: {consulta.idMedico}</span>
                                            </td>
                                            <td style={estiloCelula}>
                                                <div style={{ 
                                                    fontSize: '0.85rem', 
                                                    color: '#666',
                                                    maxWidth: '200px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>
                                                    {consulta.triagemSintomas}
                                                </div>
                                            </td>
                                            <td style={estiloCelula}>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button style={btnAcao}>Detalhes</button>
                                                    <button style={{ ...btnAcao, color: '#E53E3E' }}>Cancelar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} style={{ ...estiloCelula, textAlign: 'center', padding: '40px' }}>
                                        Nenhuma consulta agendada no momento.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* <Rodape /> */}
        </div>
    );
}

// Objetos de Estilo (Reusable)
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
    fontWeight: '600',
    cursor: 'pointer'
};

export default ListagemConsultas;