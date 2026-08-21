import { type JSX, useState, useEffect } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import PacienteRequests from "../../../fetch/PacienteRequest";
import type { PacienteDTO } from "../../../dto/PacienteDTO";
import { useNavigate } from "react-router-dom";
import "../../../styles/ListagensPadrao.css";

function ListagemPacientes(): JSX.Element {
    const [pacientes, setPacientes] = useState<PacienteDTO[]>([]);
    const [erro, setErro] = useState<boolean>(false);
    const [pagina, setPagina] = useState(1);
    const itensPorPagina = 5;
    const navigate = useNavigate();

    const buscarPacientes = async () => {
        setErro(false);
        try {
            const listaDePacientes = await PacienteRequests.obterListaDePacientes();
            if (listaDePacientes) {
                setPacientes(listaDePacientes);
                setPagina(1);
            } else {
                setPacientes([]);
            }
        } catch (error) {
            console.error(`Erro ao buscar pacientes. ${error}`);
            setErro(true);
        }
    };

    useEffect(() => {
        buscarPacientes();
    }, []);

    return (
        <div className="medflow-list-wrapper">
            <Navegacao />

            <main className="main-content">
                <div className="page-header">
                    <h1>Pacientes Cadastrados</h1>
                    <a href="/cadastro/paciente" className="btn-novo">
                        + Novo Paciente
                    </a>
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
                            {erro ? (
                                <tr>
                                    <td colSpan={4}>
                                        <div className="error-state">
                                            <div className="error-icon">⚠️</div>
                                            <div className="error-title">Serviço Indisponível</div>
                                            <div className="error-message">
                                                Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.
                                            </div>
                                            <button className="btn-retry" onClick={buscarPacientes}>Tentar Novamente</button>
                                        </div>
                                    </td>
                                </tr>
                            ) : pacientes.length > 0 ? (
                                pacientes.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina).map((paciente) => (
                                    <tr key={paciente.idPaciente}>
                                        <td>
                                            <div className="item-box">
                                                <img
                                                    className="avatar-photo"
                                                    src={`https://i.pravatar.cc/88?u=paciente-${paciente.idPaciente}`}
                                                    alt={`Avatar de ${paciente.nome}`}
                                                />
                                                <span className="text-bold">{paciente.nome}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="info-tag">{paciente.cpf}</span>
                                        </td>
                                        <td>{paciente.telefone}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button className="btn-minimal primary" title="Ver detalhes" aria-label="Ver detalhes" onClick={( ()=> navigate(`/detalhes/paciente/${paciente.idPaciente}`))}><i className="pi pi-eye" /></button>
                                                <button className="btn-minimal secondary" title="Atualizar" aria-label="Atualizar"><i className="pi pi-pencil" /></button>
                                                <button className="btn-minimal danger" title="Remover" aria-label="Remover"><i className="pi pi-trash" /></button>
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
                    <div className="pagination-bar">
                        <span>Página {pagina} de {Math.max(1, Math.ceil(pacientes.length / itensPorPagina))}</span>
                        <div className="pagination-actions">
                            <button className="pagination-button" disabled={pagina === 1} onClick={() => setPagina((valor) => valor - 1)} aria-label="Página anterior">&lt; Anterior</button>
                            <button className="pagination-button" disabled={pagina >= Math.ceil(pacientes.length / itensPorPagina)} onClick={() => setPagina((valor) => valor + 1)} aria-label="Próxima página">Próxima &gt;</button>
                        </div>
                    </div>
                </div>
            </main>

            <Rodape />
        </div>
    );
}

export default ListagemPacientes;