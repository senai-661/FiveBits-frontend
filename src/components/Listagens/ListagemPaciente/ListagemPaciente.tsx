import { type JSX, useState, useEffect } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import PacienteRequests from "../../../fetch/PacienteRequest";
import type { PacienteDTO } from "../../../dto/PacienteDTO";
import { useNavigate } from "react-router-dom";
import "../../../styles/ListagensPadrao.css";

function ListagemPacientes(): JSX.Element {
    const [pacientes, setPacientes] = useState<PacienteDTO[]>([]);
    const navigate = useNavigate();

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
            <Navegacao />

            <main className="main-content">
                <div className="page-header">
                    <h1>Pacientes Cadastrados</h1>
                    <button className="btn-novo">+ Novo Paciente</button>
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
                                            <div className="item-box">
                                                <div className="avatar-icon">
                                                    {paciente.nome.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-bold">{paciente.nome}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="info-tag">{paciente.cpf}</span>
                                        </td>
                                        <td>{paciente.telefone}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button className="btn-minimal primary" onClick={( ()=> navigate(`/detalhes/paciente/${paciente.idPaciente}`))}>Detalhes</button>
                                                <button className="btn-minimal secondary">Atualizar</button>
                                                <button className="btn-minimal danger">Remover</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="empty-state">
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