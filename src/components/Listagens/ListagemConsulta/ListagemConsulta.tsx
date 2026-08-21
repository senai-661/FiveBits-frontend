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
    const [erro, setErro] = useState<boolean>(false);
    const navigate = useNavigate();

    const buscarConsultas = async () => {
        setErro(false);
        try {
            const listaDeConsultas = await ConsultaRequest.obterListaDeConsultas();
            if (listaDeConsultas) {
                setConsultas(listaDeConsultas);
            } else {
                setConsultas([]);
            }
        } catch (error) {
            console.error(`Erro ao buscar consultas. ${error}`);
            setErro(true);
        }
    }

    useEffect(() => {
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
                    <a href="/cadastro/consulta" className="btn-novo">
                        + Nova Consulta
                    </a>
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
                            {erro ? (
                                <tr>
                                    <td colSpan={5}>
                                        <div className="error-state">
                                            <div className="error-icon">⚠️</div>
                                            <div className="error-title">Serviço Indisponível</div>
                                            <div className="error-message">
                                                Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.
                                            </div>
                                            <button className="btn-retry" onClick={buscarConsultas}>Tentar Novamente</button>
                                        </div>
                                    </td>
                                </tr>
                            ) : consultas && consultas.length > 0 ? (
                                consultas.map((consulta) => {
                                    const { data, hora } = formatarDataHora(consulta.dataHora.toString());
                                    return (
                                        <tr key={consulta.idConsulta}>
                                            <td>
                                                <div className="text-bold">{data}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#888' }}>às {hora}</div>
                                            </td>
                                            <td>{consulta.paciente.nome}</td>
                                            <td>{consulta.medico.nome}</td>
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
                                                    <button className="btn-minimal primary" onClick={() => navigate(`/detalhes/consulta/${consulta.idConsulta}`)}>Detalhes</button>
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