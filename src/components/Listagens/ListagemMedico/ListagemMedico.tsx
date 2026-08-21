import { type JSX } from "react";
import { useState, useEffect } from "react";
import type { MedicoDTO } from "../../../dto/MedicoDTO";
import MedicoRequests from "../../../fetch/MedicoRequest";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import { useNavigate } from "react-router-dom";
import "../../../styles/ListagensPadrao.css";

function ListagemMedicos(): JSX.Element {
    const [medicos, setMedicos] = useState<MedicoDTO[]>([]);
    const [erro, setErro] = useState<boolean>(false);
    const [pagina, setPagina] = useState(1);
    const itensPorPagina = 5;
    const navigate = useNavigate();

    const buscarMedicos = async () => {
        setErro(false);
        try {
            const listaDeMedicos = await MedicoRequests.obterListaDeMedicos();
            if (listaDeMedicos) {
                setMedicos(listaDeMedicos);
                setPagina(1);
            } else {
                setMedicos([]);
            }
        } catch (error) {
            console.error(`Erro ao buscar médicos. ${error}`);
            setErro(true);
        }
    }

    const deletarMedico = async (idMedico: number) => {
        if (!window.confirm("Deseja realmente deletar este médico?")) return;

        const resposta = await MedicoRequests.deletarMedico(idMedico);
        if (resposta) {
            alert("Médico deletado com sucesso");
            buscarMedicos();
        } else {
            alert("Erro ao deletar médico");
        }
    };

    useEffect(() => {
        buscarMedicos();
    }, []);

    return (
        <div className="medflow-list-wrapper">
            <Navegacao />

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
                                medicos.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina).map((medico) => (
                                    <tr key={medico.idMedico}>
                                        <td>
                                            <div className="item-box">
                                                <img
                                                    className="avatar-photo"
                                                    src={`https://i.pravatar.cc/88?u=medico-${medico.idMedico}`}
                                                    alt={`Avatar de ${medico.nome}`}
                                                />
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
                                                <button className="btn-minimal primary" title="Ver detalhes" aria-label="Ver detalhes" onClick={() => navigate(`/detalhes/medico/${medico.idMedico}`)}><i className="pi pi-eye" /></button>
                                                <button className="btn-minimal secondary" title="Atualizar" aria-label="Atualizar" onClick={() => navigate(`/atualizar/medico/${medico.idMedico}`)}><i className="pi pi-pencil" /></button>
                                                <button className="btn-minimal danger" title="Deletar" aria-label="Deletar" onClick={() => deletarMedico(medico.idMedico)}><i className="pi pi-trash" /></button>
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
                    <div className="pagination-bar">
                        <span>Página {pagina} de {Math.max(1, Math.ceil(medicos.length / itensPorPagina))}</span>
                        <div className="pagination-actions">
                            <button className="pagination-button" disabled={pagina === 1} onClick={() => setPagina((valor) => valor - 1)} aria-label="Página anterior">&lt; Anterior</button>
                            <button className="pagination-button" disabled={pagina >= Math.ceil(medicos.length / itensPorPagina)} onClick={() => setPagina((valor) => valor + 1)} aria-label="Próxima página">Próxima &gt;</button>
                        </div>
                    </div>
                </div>
            </main>

            <Rodape />
        </div>
    );
}

export default ListagemMedicos;