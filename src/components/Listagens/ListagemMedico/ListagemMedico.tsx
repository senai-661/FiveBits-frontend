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
    const navigate = useNavigate();

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
        <div className="medflow-list-wrapper">
            <Navegacao />

            <main className="main-content">
                {/* Cabeçalho */}
                <div className="page-header">
                    <h1>Médicos</h1>
                    <button className="btn-novo">+ Novo Médico</button>
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
                            {medicos && medicos.length > 0 ? (
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
                                                <button className="btn-minimal secondary">Atualizar</button>
                                                <button className="btn-minimal danger">Deletar</button>
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