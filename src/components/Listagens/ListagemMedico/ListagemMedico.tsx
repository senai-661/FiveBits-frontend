import { type JSX } from "react";
import { useState, useEffect } from "react";
import type { MedicoDTO } from "../../../dto/MedicoDTO";
import MedicoRequests from "../../../fetch/MedicoRequest";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import { useNavigate, useLocation } from "react-router-dom";
import { AlertCard, type AlertVariant } from "../../AlertCard";
import ConfirmacaoCard from "../../ConfirmacaoCard/ConfirmacaoCard";
import "../../../styles/ListagensPadrao.css";

interface AlertaState {
    variant: AlertVariant;
    title?: string;
    message: string;
    type?: 'banner' | 'toast';
}

function ListagemMedicos(): JSX.Element {
    const [medicos, setMedicos] = useState<MedicoDTO[]>([]);
    const [erro, setErro] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    const initialAlerta = (location.state as { alerta?: AlertaState })?.alerta || null;
    const [alerta, setAlerta] = useState<AlertaState | null>(initialAlerta);
    const [medicoParaExcluir, setMedicoParaExcluir] = useState<{ id: number; nome: string } | null>(null);

    const buscarMedicos = async () => {
        setErro(false);
        try {
            const listaDeMedicos = await MedicoRequests.obterListaDeMedicos();
            if (listaDeMedicos) {
                setMedicos(listaDeMedicos);
            } else {
                setMedicos([]);
            }
        } catch (error) {
            console.error(`Erro ao buscar médicos. ${error}`);
            setErro(true);
        }
    }

    const solicitarExclusao = (id: number, nome: string) => {
        setMedicoParaExcluir({ id, nome });
    };

    const deletarMedico = async () => {
        if (!medicoParaExcluir) return;

        const resposta = await MedicoRequests.deletarMedico(medicoParaExcluir.id);
        setMedicoParaExcluir(null);
        if (resposta) {
            setAlerta({
                variant: 'success',
                title: 'Médico Removido',
                message: 'O cadastro do médico foi removido com sucesso.',
                type: 'toast',
            });
            buscarMedicos();
        } else {
            setAlerta({
                variant: 'danger',
                title: 'Erro de Remoção',
                message: 'Não foi possível deletar o médico.',
                type: 'toast',
            });
        }
    };

    useEffect(() => {
        buscarMedicos();
    }, []);

    return (
        <div className="medflow-list-wrapper">
            <Navegacao />

            {medicoParaExcluir && (
                <ConfirmacaoCard
                    titulo="Excluir médico?"
                    mensagem={`O cadastro de ${medicoParaExcluir.nome} será removido permanentemente.`}
                    onCancelar={() => setMedicoParaExcluir(null)}
                    onConfirmar={deletarMedico}
                />
            )}

            {alerta && (
                <AlertCard
                    variant={alerta.variant}
                    type={alerta.type || 'toast'}
                    title={alerta.title}
                    message={alerta.message}
                    onClose={() => setAlerta(null)}
                />
            )}

            <main className="main-content">
                {/* Cabeçalho */}
                <div className="page-header">
                    <h1>Médicos</h1>
                    <a href="/cadastro/medico" className="btn-novo">
                        + Novo Médico
                    </a>
                </div>

                {/* Tabela de Médicos */}
                <div className="table-container">
                    <table className="medflow-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Especialidade</th>
                                <th>Valor da Consulta</th>
                                <th>Ações</th>
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
                                            <button className="btn-retry" onClick={buscarMedicos}>Tentar Novamente</button>
                                        </div>
                                    </td>
                                </tr>
                            ) : medicos && medicos.length > 0 ? (
                                medicos.map((medico) => (
                                    <tr key={medico.idMedico}>
                                        <td>
                                            <div className="item-box">
                                                <div className="avatar-icon">
                                                    {medico.nome.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-bold">{medico.nome}</span>
                                            </div>
                                        </td>
                                        <td>{medico.especialidade}</td>
                                        <td>
                                            <span className="money-tag">
                                                R$ {medico.valorConsulta}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="btn-group">
                                                <button className="btn-minimal primary" onClick={() => navigate(`/detalhes/medico/${medico.idMedico}`)}>Detalhes</button>
                                                <button className="btn-minimal secondary" onClick={() => navigate(`/atualizar/medico/${medico.idMedico}`)}>Atualizar</button>
                                                <button className="btn-minimal danger" onClick={() => solicitarExclusao(medico.idMedico, medico.nome)}>Deletar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="empty-state">
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

export default ListagemMedicos;
