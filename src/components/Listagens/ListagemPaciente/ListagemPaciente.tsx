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
            }
        };
        buscarPacientes();
    }, []);

    return (
        <div className="medflow-list-wrapper">
            <style>{`
                .medflow-list-wrapper {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                    /* Fundo clarinho e minimalista */
                    background-color: #f4f7f9; 
                }

                .main-content {
                    flex: 1;
                    padding: 50px 10%;
                }

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 35px;
                }

                .page-header h1 {
                    color: #1a3a36;
                    font-size: 1.8rem;
                    font-weight: 800;
                    margin: 0;
                }

                /* Container com Sombra Leve e Focada */
                .table-container {
                    background: #ffffff;
                    border-radius: 20px;
                    border: 1px solid rgba(0, 0, 0, 0.03);
                    /* Sombra suave para efeito de profundidade */
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); 
                    overflow: hidden;
                }

                .medflow-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .medflow-table th {
                    background-color: #fafbfc;
                    padding: 18px 24px;
                    text-align: left;
                    font-size: 0.75rem;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border-bottom: 1px solid #edf2f7;
                }

                .medflow-table td {
                    padding: 16px 24px;
                    border-bottom: 1px solid #f7fafc;
                    color: #334155;
                    font-size: 0.95rem;
                }

                .medflow-table tr:last-child td {
                    border-bottom: none;
                }

                .medflow-table tr:hover {
                    background-color: #f0fdfa; /* Destaque sutil no hover */
                }

                /* Estilização Interna */
                .patient-box {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .avatar-icon {
                    width: 36px;
                    height: 36px;
                    background: #e6f6f4;
                    color: #00a896;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 0.85rem;
                }

                .cpf-tag {
                    background: #f1f5f9;
                    color: #3b82f6;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.85rem;
                    font-weight: 600;
                }

                .btn-group {
                    display: flex;
                    gap: 8px;
                }

                .btn-minimal {
                    padding: 7px 15px;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                    background: white;
                    font-size: 0.8rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.2s;
                }

                .btn-minimal:hover {
                    background: #f8fafc;
                    border-color: #cbd5e1;
                }
            `}</style>

            <Navegacao />

            <main className="main-content">
                <div className="page-header">
                    <h1>Pacientes Cadastrados</h1>
                    <button style={{
                        backgroundColor: '#00a896',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        fontWeight: '700',
                        cursor: 'pointer'
                    }}>+ Novo Paciente</button>
                </div>

                <div className="table-container">
                    <table className="medflow-table">
                        <thead>
                            <tr>
                                <th>Paciente</th>
                                <th>CPF</th>
                                <th>Telefone</th>
                                <th style={{ textAlign: 'center' }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientes.length > 0 ? (
                                pacientes.map((paciente) => (
                                    <tr key={paciente.idPaciente}>
                                        <td>
                                            <div className="patient-box">
                                                <div className="avatar-icon">
                                                    {paciente.nome.charAt(0).toUpperCase()}
                                                </div>
                                                <span style={{ fontWeight: 600 }}>{paciente.nome}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="cpf-tag">{paciente.cpf}</span>
                                        </td>
                                        <td>{paciente.telefone}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button className="btn-minimal">Detalhes</button>
                                                <button className="btn-minimal" style={{ color: '#ef4444' }}>Remover</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                        Nenhum paciente registrado.
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

export default ListagemPacientes;