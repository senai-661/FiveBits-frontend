import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import MedicoRequest from "../../../fetch/MedicoRequest";
import type { MedicoDTO } from "../../../dto/MedicoDTO";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/DetalhesPadrao.module.css";

interface DetalhesMedicoProps {
    id_medico: number;
}

/**
 * Componente que exibe os detalhes de um médico.
 * Faz a consulta à API com base no ID fornecido e monta a visualização.
 */
function DetalhesMedico({ id_medico }: DetalhesMedicoProps): JSX.Element {
    const [medico, setMedico] = useState<MedicoDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarDados() {
            setLoading(true);
            setError(null);

            try {
                const dados = await MedicoRequest.obterMedicoPorId(id_medico);
                if (dados) {
                    setMedico(dados);
                } else {
                    setError("Médico não encontrado.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes do médico:", err);
                setError("Ocorreu um erro ao buscar as informações do médico.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [id_medico]);

    // Renderização do estado de carregamento (Skeleton)
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

    // Renderização do estado de erro
    if (error || !medico) {
        return (
            <div className={styles.errorWrapper}>
                <Message severity="error" text={error || "Erro desconhecido."} />
            </div>
        );
    }

    // Renderização dos detalhes do médico
    return (
        <main className={styles.detailsWrapper}>
            <div className={styles.cardContainer}>
                <Card className={styles.detailsCard}>
                    <div className={styles.cardContent}>
                        <div className={styles.detailsHeader}>
                            <h2 className={styles.headerTitle}>{medico.nome}</h2>
                            <div className={styles.headerSubtitle}>
                                <span>Registro no Conselho (CRM)</span>
                                <Tag value={medico.crm} severity="info" className="px-3 py-1 text-sm font-semibold" />
                            </div>
                        </div>

                        <Divider className="my-3" />

                        <div className={styles.infoGrid}>
                            <div className={styles.infoSection}>
                                <h3 className={styles.sectionTitle}>
                                    <i className="pi pi-briefcase text-blue-500 text-sm"></i> Informações do Médico
                                </h3>
                                <div className={styles.sectionText}>
                                    <div className={styles.fieldGroup}>
                                        <span className={styles.fieldLabel}>Especialidade</span>
                                        <span className={styles.fieldValue}>{medico.especialidade}</span>
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <span className={styles.fieldLabel}>Valor da Consulta</span>
                                        <span className={styles.fieldValue}>
                                            R$ {medico.valorConsulta}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.buttonSecondary}
                        onClick={() => navigate(`/lista/medico`)}
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </main>
    );
}

export default DetalhesMedico;