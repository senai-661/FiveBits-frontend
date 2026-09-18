import { type JSX, useState, useEffect } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import PacienteRequests from "../../../fetch/PacienteRequest";
import type { PacienteDTO } from "../../../dto/PacienteDTO";
import { useNavigate } from "react-router-dom";
import { AlertCard, type AlertVariant } from "../../AlertCard";
import ConfirmacaoCard from "../../../components/ConfirmacaoCard/ConfirmacaoCard";
import Utilitario from "../../../utils/Utilitario";
import "../../../styles/ListagensPadrao.css";

interface AlertaState {
    variant: AlertVariant;
    title: string;
    message: string;
}

function ListagemPacientes(): JSX.Element {
    const [pacientes, setPacientes] = useState<PacienteDTO[]>([]);
    const [erro, setErro] = useState<boolean>(false);
    const [pacienteParaExcluir, setPacienteParaExcluir] = useState<{ id: number; nome: string } | null>(null);
    const [alerta, setAlerta] = useState<AlertaState | null>(null);
    const navigate = useNavigate();

    const buscarPacientes = async () => {
        setErro(false);
        try {
            const listaDePacientes = await PacienteRequests.obterListaDePacientes();
            if (listaDePacientes) {
                setPacientes(listaDePacientes);
            } else {
                setPacientes([]);
            }
        } catch (error) {
            console.error(`Erro ao buscar pacientes. ${error}`);
            setErro(true);
        }
    };

    const solicitarRemocaoPaciente = (id_paciente: number | undefined, nome: string) => {
        if (id_paciente === undefined) {
            return;
        }

        setPacienteParaExcluir({ id: id_paciente, nome });
    };

    const handleRemoverPaciente = async () => {
        if (!pacienteParaExcluir) return;

        const sucesso = await PacienteRequests.removerPaciente(pacienteParaExcluir.id);
        setPacienteParaExcluir(null);
        if (sucesso) {
            setAlerta({
                variant: "success",
                title: "Paciente removido",
                message: "O cadastro do paciente foi removido com sucesso.",
            });

            setPacientes(prev => prev.filter(paciente => paciente.idPaciente !== pacienteParaExcluir.id));
        } else {
            setAlerta({
                variant: "danger",
                title: "Erro de remoção",
                message: "Não foi possível remover o paciente.",
            });
        }
    };

    useEffect(() => {
        buscarPacientes();
    }, []);

    return (
        <div className="medflow-list-wrapper">
            <Navegacao />

            {alerta && (
                <AlertCard
                    variant={alerta.variant}
                    type="toast"
                    title={alerta.title}
                    message={alerta.message}
                    onClose={() => setAlerta(null)}
                />
            )}

            {pacienteParaExcluir && (
                <ConfirmacaoCard
                    titulo="Remover paciente?"
                    mensagem={`O cadastro de ${pacienteParaExcluir.nome} será removido permanentemente.`}
                    onCancelar={() => setPacienteParaExcluir(null)}
                    onConfirmar={handleRemoverPaciente}
                />
            )}

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
                                            <span className="info-tag">{Utilitario.formatarCpf(paciente.cpf)}</span>
                                        </td>
                                        <td>{paciente.telefone ? Utilitario.formatarTelefone(paciente.telefone) : "Não informado"}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button className="btn-minimal primary" onClick={(() => navigate(`/detalhes/paciente/${paciente.idPaciente}`))}>Detalhes</button>
                                                <button className="btn-minimal secondary" onClick={() => navigate(`/atualizar/paciente/${paciente.idPaciente}`)}>Atualizar</button>
                                                <button className="btn-minimal danger" onClick={() => solicitarRemocaoPaciente(paciente.idPaciente, paciente.nome)}>Remover</button>
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