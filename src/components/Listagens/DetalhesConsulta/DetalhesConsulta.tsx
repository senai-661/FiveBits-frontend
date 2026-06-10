import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import ConsultaRequests from "../../../fetch/ConsultaRequest.ts";
import type {ConsultaDTO} from "../../../dto/ConsultaDTO";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/DetalhesPadrao.module.css";

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
            <div className={styles.skeletonWrapper}>
                <Card className={styles.skeletonCard}>
                    <div className="flex flex-col gap-4 p-6">
                        <div className="flex items-center gap-4">
                            <Skeleton shape="circle" size="4rem"></Skeleton>
                            <div className="flex-1">
                                <Skeleton width="60%" height="2rem" className="mb-2"></Skeleton>
                                <Skeleton width="40%"></Skeleton>
                            </div>
                        </div>
                        <Divider />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className={styles.errorWrapper}>
                <Message severity="error" text={error || "Erro desconhecido."} />
            </div>
        );
    }

    return (
        <main className={styles.detailsWrapper}>
            <div className={styles.cardContainer}>
                <Card className={styles.detailsCard}>
                    <div className={styles.cardContent}>
                        <div className={styles.detailsHeader}>
                            <h2 className={styles.headerTitle}>Consulta #{consulta.idConsulta}</h2>
                            <div className={styles.headerSubtitle}>
                                <span>Status da Consulta</span>
                                <Tag value={consulta.status || "Pendente"} severity="info" className="px-3 py-1 text-sm font-semibold" />
                            </div>
                        </div>

                        <Divider className="my-3" />

                        <div className={styles.infoGrid}>
                            <div className={styles.infoSection}>
                                <h3 className={styles.sectionTitle}>
                                    <i className="pi pi-user text-blue-500 text-sm"></i> Dados do Paciente
                                </h3>
                                <div className={styles.sectionText}>
                                    <div className={styles.fieldGroup}>
                                        <span className={styles.fieldLabel}>Nome</span>
                                        <span className={styles.fieldValue}>{consulta.paciente.nomePaciente}</span>
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <span className={styles.fieldLabel}>CPF</span>
                                        <span className={styles.fieldValue}>{consulta.paciente.cpf}</span>
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <span className={styles.fieldLabel}>Telefone</span>
                                        <span className={styles.fieldValue}>{consulta.paciente.telefone ?? "Não informado"}</span>
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <span className={styles.fieldLabel}>Data de Nascimento</span>
                                        <span className={styles.fieldValue}>{new Date(consulta.paciente.dataNascimento).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.infoSection}>
                                <h3 className={styles.sectionTitle}>
                                    <i className="pi pi-briefcase text-orange-500 text-sm"></i> Dados do Médico
                                </h3>
                                <div className={styles.sectionText}>
                                    <div className={styles.fieldGroup}>
                                        <span className={styles.fieldLabel}>Nome</span>
                                        <span className={styles.fieldValue}>{consulta.medico.nomeMedico}</span>
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <span className={styles.fieldLabel}>CRM</span>
                                        <span className={styles.fieldValue}>{consulta.medico.crm}</span>
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <span className={styles.fieldLabel}>Especialidade</span>
                                        <span className={styles.fieldValue}>{consulta.medico.especialidade}</span>
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <span className={styles.fieldLabel}>Valor da Consulta</span>
                                        <span className={styles.fieldValue}>{consulta.medico.valorConsulta.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.infoSection}>
                                <h3 className={styles.sectionTitle}>
                                    <i className="pi pi-calendar text-green-500 text-sm"></i> Data e Modalidade
                                </h3>
                                <div className={styles.sectionText}>
                                    <div className={styles.fieldGroup}>
                                        <span className={styles.fieldLabel}>Data e Hora</span>
                                        <span className={styles.fieldValue}>{new Date(consulta.dataHora).toLocaleString('pt-BR')}</span>
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <span className={styles.fieldLabel}>Modalidade</span>
                                        <span className={styles.fieldValue}>{consulta.modalidade ?? "Não informada"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.infoSection}>
                                <h3 className={styles.sectionTitle}>
                                    <i className="pi pi-heart text-red-500 text-sm"></i> Triagem
                                </h3>
                                <div className={styles.sectionText}>
                                    <div className={styles.fieldGroup}>
                                        <span className={styles.fieldLabel}>Sintomas</span>
                                        <span className={styles.fieldValue}>{consulta.triagemSintomas}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.buttonPrimary}
                        onClick={() => navigate(`#`)}//navigate(`/atualizar/consulta/${consulta.idConsulta}`)}
                    >
                        Editar Consulta
                    </button>
                    <button
                        className={styles.buttonSecondary}
                        onClick={() => navigate(`/lista/consulta`)}
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </main>
    );
}

export default DetalhesConsulta;