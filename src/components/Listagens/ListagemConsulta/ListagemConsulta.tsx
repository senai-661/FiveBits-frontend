import { type JSX } from "react";
import { useState, useEffect } from "react";
import type { ConsultaDTO } from "../../../dto/ConsultaDTO";
import ConsultaRequest from "../../../fetch/ConsultaRequest";
import { useNavigate } from "react-router-dom";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import "../../../styles/ListagensPadrao.css";

function ListagemConsultas(): JSX.Element {
    const [consultas, setConsultas] = useState<ConsultaDTO[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const buscarConsultas = async () => {
            try {
                const listaDeConsultas = await ConsultaRequest.obterListaDeConsultas();
                setConsultas(listaDeConsultas);
            } catch (error) {
                console.error(`Erro ao buscar consultas. ${error}`);
            }
        }
        buscarConsultas();
    }, []);

    const formatarDataHora = (dataIso: string) => {
        const dataObj = new Date(dataIso);
        return {
            data: dataObj.toLocaleDateString('pt-BR'),
            hora: dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
    };

    return (
        <div className="medflow-list-wrapper">
            
            {/* 1. CABEÇALHO (Agora visível) */}
            <Navegacao />

            {/* 2. CONTEÚDO PRINCIPAL */}
            <main className="main-content">
                <div className="page-header">
                    <h1>Agenda de Consultas</h1>
                    <button className="btn-novo">+ Nova Consulta</button>
                </div>

                <div className="table-container">
                    <table className="medflow-table">
                        <thead>
                            <tr>
                                <th>DATA / HORA</th>
                                <th>PACIENTE</th>
                                <th>MÉDICO</th>
                                <th>TRIAGEM</th>
                                <th>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consultas && consultas.length > 0 ? (
                                consultas.map((consulta) => {
                                    const { data, hora } = formatarDataHora( consulta.dataHora.toString());
                                    return (
                                        <tr key={consulta.idConsulta}>
                                            <td>
                                                <div className="text-bold">{data}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#888' }}>às {hora}</div>
                                            </td>
                                            <td>{consulta.paciente.nomePaciente}</td>
                                            <td>{consulta.medico.nomeMedico}</td>
                                            <td>
                                                <div style={{
                                                    fontSize: '0.85rem',
                                                    color: '#666',
                                                    maxWidth: '180px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>{consulta.triagemSintomas}</div>
                                            </td>
                                            <td>
                                                <div className="btn-group">
                                                    <button className="btn-minimal primary" onClick={() => navigate (`/detalhes/consulta/${consulta.idConsulta}`)}>Detalhes</button>
                                                    <button className="btn-minimal secondary">Atualizar</button>
                                                    <button className="btn-minimal danger">Cancelar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="empty-state">
                                        Nenhuma consulta agendada.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* 3. RODAPÉ */}
            <Rodape />
        </div>
    );
}

export default ListagemConsultas;