import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import PacienteRequest from "../../../fetch/PacienteRequest";
import type { PacienteDTO } from "../../../dto/PacienteDTO";
import { useNavigate, useLocation } from "react-router-dom";
import { AlertCard, type AlertVariant } from "../../AlertCard";
import Utilitario from "../../../utils/Utilitario";
import styles from "../../../styles/DetalhesPadrao.module.css";

interface DetalhesPacienteProps {
    id_paciente: number;
}

interface AlertaState {
    variant: AlertVariant;
    title?: string;
    message: string;
    type?: 'banner' | 'toast';
}

function DetalhesPaciente({ id_paciente }: DetalhesPacienteProps): JSX.Element {
    const [paciente, setPaciente] = useState<PacienteDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const initialAlerta = (location.state as { alerta?: AlertaState })?.alerta || null;
    const [alerta, setAlerta] = useState<AlertaState | null>(initialAlerta);

    useEffect(() => {
        async function buscarDados() {
            setLoading(true);
            setError(null);

            try {
                const dados = await PacienteRequest.obterPacientePorId(id_paciente);
                if (dados) {
                    setPaciente(dados);
                } else {
                    setError("Paciente não encontrado.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes do Paciente:", err);
                setError("Ocorreu um erro ao buscar as informações do Paciente.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [id_paciente]);

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
    if (error || !paciente) {
        return (
            <div className={styles.errorWrapper}>
                <Message severity="error" text={error || "Erro desconhecido."} />
            </div>
        );
    }

    // Renderização dos detalhes do Paciente
    return (
        <main className={styles.detailsWrapper}>
            {alerta && (
                <AlertCard
                    variant={alerta.variant}
                    type={alerta.type || 'toast'}
                    title={alerta.title}
                    message={alerta.message}
                    onClose={() => setAlerta(null)}
                />
            )}
            <div className={styles.cardContainer}>
                <Card className={styles.detailsCard}>
                    <div className={styles.cardContent}>
                        <div className={styles.detailsHeader}>
                            <h2 className={styles.headerTitle}>{paciente.nome}</h2>
                            <div className={styles.headerSubtitle}>
                                <span>Cadastro de Pessoas Físicas (CPF)</span>
                                <Tag value={Utilitario.formatarCpf(paciente.cpf)} severity="info" className="px-3 py-1 text-sm font-semibold" />
                            </div>
                        </div>

                        <Divider className="my-3" />

                        <div className={styles.infoGrid}>
                            <div className={styles.infoSection}>
                                <h3 className={styles.sectionTitle}>
                                    <i className="pi pi-user text-blue-500 text-sm"></i> Informações Pessoais
                                </h3>
                                <div className={styles.sectionText}>
                                    <div className={styles.fieldGroup}>
                                        <span className={styles.fieldLabel}>Data de Nascimento</span>
                                        <span className={styles.fieldValue}>
                                            {new Date(paciente.dataNascimento).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <span className={styles.fieldLabel}>Status do Paciente</span>
                                        <span className={`${styles.fieldValue} ${paciente.situacao ? styles.statusActive : styles.statusInactive}`}>
                                            {paciente.situacao ? "Ativo" : "Inativo"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.infoSection}>
                                <h3 className={styles.sectionTitle}>
                                    <i className="pi pi-map-marker text-orange-500 text-sm"></i> Contato
                                </h3>
                                <div className={styles.sectionText}>
                                    <div className={styles.fieldGroup}>
                                        <span className={styles.fieldLabel}>Celular / Telefone</span>
                                        <span className={styles.fieldValue}>
                                            {paciente.telefone ? Utilitario.formatarTelefone(paciente.telefone) : "Não informado"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.buttonPrimary}
                        onClick={() => navigate(`/atualizar/paciente/${paciente.idPaciente}`)}
                    >
                        Editar Paciente
                    </button>
                    <button
                        className={styles.buttonSecondary}
                        onClick={() => navigate(`/lista/paciente`)}
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </main>
    );
}

export default DetalhesPaciente;