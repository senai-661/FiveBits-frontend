import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import ConsultaRequests from "../../../fetch/ConsultaRequest.ts";
import type {ConsultaDTO} from "../../../dto/ConsultaDTO";
import { useNavigate } from "react-router-dom";
import "./DetalhesConsulta.css";

interface DetalhesConsultaProps {
    id_consulta: number;
}

/**
 * Componente que exibe os detalhes de uma consulta.
 * Faz a consulta à API com base no ID fornecido e monta a visualização.
 */
function DetalhesConsulta({ id_consulta }: DetalhesConsultaProps): JSX.Element {
    const [consulta, setConsulta] = useState<ConsultaDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarDados() {
            setLoading(true);
            setError(null);

            try {
                const dados = await ConsultaRequests.obterConsultaPorId(id_consulta);
                if (dados) {
                    setConsulta(dados);
                } else {
                    setError("Consulta não encontrada.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes da consulta:", err);
                setError("Ocorreu um erro ao buscar as informações da consulta.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [id_consulta]);

    if (loading) {
        return (
            <div className="detalhes-consulta-page">
                <Card className="detalhes-card detalhes-card--compact detalhes-skeleton-card animate-fade-in">
                    <div className="skeleton-grid">
                        <div className="detalhes-header">
                            <Skeleton shape="circle" size="4rem"></Skeleton>
                            <div style={{ flex: 1 }}>
                                <Skeleton width="65%" height="2rem" className="mb-2"></Skeleton>
                                <Skeleton width="45%"></Skeleton>
                            </div>
                        </div>
                        <Divider className="divider" />
                        <div className="section-grid">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i}>
                                    <Skeleton width="30%" className="mb-2"></Skeleton>
                                    <Skeleton width="80%" height="1.5rem"></Skeleton>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    if (error || !consulta) {
        return (
            <div className="error-message-container">
                <Message severity="error" text={error || "Erro desconhecido."} />
            </div>
        );
    }

    return (
        <main className="detalhes-consulta-page">
            <Card title={`Consulta #${consulta.idConsulta}`} className="detalhes-card animate-fade-in">
                <div className="detalhes-card-content">
                    <div className="detalhes-header">
                        <span className="section-label">Status da Consulta</span>
                        <Tag value={consulta.status || "Pendente"} severity="info" className="tag-info" />
                    </div>

                    <Divider className="divider" />

                    <div className="section-grid">
                        <section className="detail-section">
                            <h3 className="section-title">
                                <i className="pi pi-user" style={{ color: '#2563eb' }}></i>
                                Dados do Paciente
                            </h3>
                            <div className="detail-box">
                                <div className="detail-item">
                                    <span className="detail-label">Nome</span>
                                    <span className="detail-value">{consulta.paciente.nomePaciente}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">CPF</span>
                                    <span className="detail-value">{consulta.paciente.cpf}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Telefone</span>
                                    <span className="detail-value">{consulta.paciente.telefone ?? "Não informado"}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Data de Nascimento</span>
                                    <span className="detail-value">{new Date(consulta.paciente.dataNascimento).toLocaleDateString('pt-BR')}</span>
                                </div>
                            </div>
                        </section>

                        <section className="detail-section">
                            <h3 className="section-title">
                                <i className="pi pi-briefcase" style={{ color: '#f97316' }}></i>
                                Dados do Médico
                            </h3>
                            <div className="detail-box">
                                <div className="detail-item">
                                    <span className="detail-label">Nome</span>
                                    <span className="detail-value">{consulta.medico.nomeMedico}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">CRM</span>
                                    <span className="detail-value">{consulta.medico.crm}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Especialidade</span>
                                    <span className="detail-value">{consulta.medico.especialidade}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Valor da Consulta</span>
                                    <span className="detail-value">{consulta.medico.valorConsulta.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    <Divider className="divider" />

                    <div className="section-grid">
                        <section className="detail-section">
                            <h3 className="section-title">
                                <i className="pi pi-calendar" style={{ color: '#22c55e' }}></i>
                                Data e Modalidade
                            </h3>
                            <div className="detail-box">
                                <div className="detail-item">
                                    <span className="detail-label">Data e Hora</span>
                                    <span className="detail-value">{new Date(consulta.dataHora).toLocaleString('pt-BR')}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Modalidade</span>
                                    <span className="detail-value">{consulta.modalidade ?? "Não informada"}</span>
                                </div>
                            </div>
                        </section>

                        <section className="detail-section">
                            <h3 className="section-title">
                                <i className="pi pi-heart" style={{ color: '#ef4444' }}></i>
                                Triagem
                            </h3>
                            <div className="detail-box">
                                <div className="detail-item">
                                    <span className="detail-label">Sintomas</span>
                                    <span className="detail-value">{consulta.triagemSintomas}</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </Card>

            <div className="button-group">
                <button className="primary-button" onClick={() => navigate(`/atualizar/consulta/${consulta.idConsulta}`)}>
                    Editar Consulta
                </button>
                <button className="secondary-button" onClick={() => navigate(`/lista/consulta`)}>
                    Voltar
                </button>
            </div>
        </main>
    );
}

export default DetalhesConsulta;