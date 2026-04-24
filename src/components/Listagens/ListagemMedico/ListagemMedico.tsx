import { type JSX } from "react";
import { useState, useEffect } from "react";
import type { MedicoDTO } from "../../../dto/MedicoDTO";
import MedicoRequests from "../../../fetch/MedicoRequest";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";

function ListagemMedicos(): JSX.Element {
    const [medicos, setMedicos] = useState<MedicoDTO[]>([]);

    useEffect(() => {
        const buscarMedicos = async () => {
            try {
                const listaDeMedicos = await MedicoRequests.obterListaDeMedicos();
                setMedicos(listaDeMedicos);
            } catch (error) {
                console.error(`Erro ao buscar médicos. ${error}`);
                alert("Erro ao criar a listagem de médicos.");
            }
        }

        buscarMedicos();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navegacao />

            <main style={{ flex: 1, padding: '40px 10%', backgroundColor: 'var(--cor-container)' }}>
                {/* Cabeçalho */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h1 style={{ color: 'var(--cor-inspiracao)', fontSize: '1.8rem', fontWeight: 'bold' }}>
                        Médicos
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
                        + Novo Médico
                    </button>
                </div>

                {/* Tabela de Médicos */}
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
                                <th style={estiloCabecalho}>NOME</th>
                                <th style={estiloCabecalho}>ESPECIALIDADE</th>
                                <th style={estiloCabecalho}>VALOR DA CONSULTA</th>
                                <th style={estiloCabecalho}>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicos && medicos.length > 0 ? (
                                medicos.map((medico) => (
                                    <tr key={medico.idMedico} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td style={estiloCelula}>
                                            <div style={{ fontWeight: 'bold' }}>{medico.nome}</div>
                                        </td>
                                        <td style={estiloCelula}>{medico.especialidade}</td>
                                        <td style={estiloCelula}>
                                            <span style={{ 
                                                backgroundColor: '#E7F9E2', 
                                                color: '#18C401',
                                                padding: '4px 8px',
                                                borderRadius: '6px',
                                                fontSize: '0.85rem',
                                                fontWeight: 'bold'
                                            }}>
                                                R$ {medico.valorConsulta}
                                            </span>
                                        </td>
                                        <td style={estiloCelula}>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button style={btnAcao}>Detalhes</button>
                                                <button style={{ ...btnAcao, color: '#3F4DE3' }}>Atualizar</button>
                                                <button style={{ ...btnAcao, color: '#E53E3E' }}>Deletar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} style={{ ...estiloCelula, textAlign: 'center', padding: '32px', color: '#888' }}>
                                        Nenhum médico encontrado.
                                    </td>
                                </tr>
                            )}
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

export default ListagemMedicos;