import { type JSX, useState, useEffect } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import PacienteRequests from "../../../fetch/PacienteRequest";
import type { PacienteDTO } from "../../../dto/PacienteDTO";

function ListagemPacientes(): JSX.Element {
    const [pacientes, setPacientes] = useState<PacienteDTO[]>([]);

    useEffect(() => {
        const buscarPacientes = async () => {
            try {
                const listaDePacientes = await PacienteRequests.obterListaDePacientes();
                setPacientes(listaDePacientes);
            } catch (error) {
                console.error(`Erro ao buscar pacientes. ${error}`);
                alert("Erro ao criar a listagem de pacientes.");
            }
        };

        buscarPacientes();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navegacao />

            <main style={{ flex: 1, padding: '40px 10%', backgroundColor: 'var(--cor-container)' }}>
                {/* Cabeçalho da Listagem */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h1 style={{ color: 'var(--cor-inspiracao)', fontSize: '1.8rem', fontWeight: 'bold' }}>
                        Pacientes Cadastrados
                    </h1>
                    <button style={{ 
                        backgroundColor: 'var(--cor-botao-sucesso)', 
                        color: 'white', 
                        padding: '10px 20px', 
                        borderRadius: '8px', 
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        + Novo Paciente
                    </button>
                </div>

                {/* Tabela de Pacientes */}
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
                                <th style={estiloCabecalho}>ID</th>
                                <th style={estiloCabecalho}>NOME</th>
                                <th style={estiloCabecalho}>CPF</th>
                                <th style={estiloCabecalho}>TELEFONE</th>
                                <th style={estiloCabecalho}>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientes.length > 0 ? (
                                pacientes.map((paciente) => (
                                    <tr key={paciente.idPaciente} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td style={estiloCelula}>{paciente.idPaciente}</td>
                                        <td style={estiloCelula}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ 
                                                    width: '30px', 
                                                    height: '30px', 
                                                    borderRadius: '50%', 
                                                    backgroundColor: '#f0f0f0', 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center', 
                                                    fontSize: '0.8rem', 
                                                    fontWeight: 'bold' 
                                                }}>
                                                    {paciente.nome.charAt(0).toUpperCase()}
                                                </div>
                                                {paciente.nome}
                                            </div>
                                        </td>
                                        <td style={estiloCelula}>
                                            <span style={{ backgroundColor: '#E8F7FE', color: '#3F4DE3', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                                {paciente.cpf}
                                            </span>
                                        </td>
                                        <td style={estiloCelula}>{paciente.telefone}</td>
                                        <td style={estiloCelula}>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button style={btnAcao}>Detalhes</button>
                                                <button style={{ ...btnAcao, color: 'var(--cor-botao-sair)' }}>Remover</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} style={{ ...estiloCelula, textAlign: 'center', padding: '40px' }}>
                                        Nenhum paciente encontrado.
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

// Estilos Reutilizáveis (Seguindo o padrão MedFlow)
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

export default ListagemPacientes;