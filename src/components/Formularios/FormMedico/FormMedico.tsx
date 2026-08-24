import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import MedicoRequest from "../../../fetch/MedicoRequest";
import type { MedicoDTO } from "../../../dto/MedicoDTO";
import Utilitario from "../../../utils/Utilitario";
import { AlertCard, type AlertVariant } from "../../AlertCard";
import styles from "../../../styles/DetalhesPadrao.module.css";

interface FormMedicoProps {
    idMedico?: number;
}

interface AlertaState {
    variant: AlertVariant;
    title?: string;
    message: string;
    type?: 'banner' | 'toast';
}

function FormMedico({ idMedico }: FormMedicoProps): JSX.Element {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<MedicoDTO>({
        idMedico: 0,
        nome: "",
        crm: "",
        especialidade: "",
        valorConsulta: 0,

        situacao: true
    });
    const modoEdicao = idMedico !== undefined;
    const [carregando, setCarregando] = useState(modoEdicao);
    const [alerta, setAlerta] = useState<AlertaState | null>(null);

    useEffect(() => {
        if (idMedico === undefined) return;

        async function buscarMedico(medicoId: number) {
            try {
                const medico = await MedicoRequest.obterMedicoPorId(medicoId);
                if (medico) {
                    setFormData({ ...medico, crm: Utilitario.formatarCrm(medico.crm) });
                } else {
                    setAlerta({
                        variant: 'danger',
                        title: 'Não Encontrado',
                        message: 'Médico não foi encontrado.',
                    });
                }
            } catch (error) {
                console.error("Erro ao carregar médico para edição:", error);
                setAlerta({
                    variant: 'danger',
                    title: 'Erro de Carregamento',
                    message: 'Erro ao carregar os dados do médico.',
                });
            } finally {
                setCarregando(false);
            }
        }

        buscarMedico(idMedico);
    }, [idMedico]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]:
                name === "crm"
                    ? Utilitario.formatarCrm(value)
                    : name === "valorConsulta"
                        ? Number(value)
                        : value
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setAlerta(null);

        try {
            const dadosMedico = { ...formData, crm: formData.crm.replace(/[^\dA-Za-z]/g, '') };
            const resposta = modoEdicao
                ? await MedicoRequest.atualizarMedico(dadosMedico)
                : await MedicoRequest.enviarFormularioMedico(dadosMedico);

            if (resposta) {
                navigate("/lista/medico", {
                    state: {
                        alerta: {
                            variant: 'success',
                            title: modoEdicao ? "Médico Atualizado" : "Médico Cadastrado",
                            message: modoEdicao ? "Dados do médico atualizados com sucesso!" : "Médico cadastrado com sucesso!",
                            type: 'toast',
                        }
                    }
                });
            } else {
                setAlerta({
                    variant: 'danger',
                    title: 'Erro na Operação',
                    message: modoEdicao ? "Erro ao atualizar dados do médico." : "Erro ao cadastrar médico.",
                });
            }
        } catch (error) {
            const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
            const acao = modoEdicao ? "atualizar" : "cadastrar";
            setAlerta({
                variant: 'danger',
                title: 'Erro no Servidor',
                message: `Não foi possível ${acao} o médico: ${mensagem}`,
            });
        }
    };

    if (carregando) {
        return <main className={`${styles.detailsWrapper} ${styles.centeredFormWrapper}`}><p>Carregando dados do médico...</p></main>;
    }

    return (
        <main className={`${styles.detailsWrapper} ${styles.centeredFormWrapper}`}>
            {alerta && (
                <div style={{ marginBottom: '1.25rem' }}>
                    <AlertCard
                        variant={alerta.variant}
                        type={alerta.type || 'toast'}
                        title={alerta.title}
                        message={alerta.message}
                        onClose={() => setAlerta(null)}
                    />
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className={styles.cardContainer}>
                    <Card className={styles.detailsCard}>
                        <div className={styles.cardContent}>

                            {/* Cabeçalho */}
                            <div className={styles.detailsHeader}>
                                <h2 className={styles.headerTitle}>
                                    {modoEdicao ? "Atualização de Médico" : "Cadastro de Médico"}
                                </h2>
                                <div className={styles.headerSubtitle}>
                                    <span>
                                        {modoEdicao
                                            ? "Altere os dados abaixo e salve as informações do médico."
                                            : "Preencha os dados abaixo para registrar um novo médico."}
                                    </span>
                                </div>
                            </div>

                            <Divider className="my-3" />

                            {/* Grid */}
                            <div className={`${styles.infoGrid} ${styles.singleColumnGrid}`}>

                                {/* Dados Profissionais */}
                                <div className={styles.infoSection}>
                                    <h3 className={styles.sectionTitle}>
                                        <i className="pi pi-briefcase text-blue-500 text-sm"></i>
                                        {" "}Informações Profissionais
                                    </h3>

                                    <div className={styles.sectionText}>

                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>
                                                Nome Completo
                                            </span>
                                            <input
                                                type="text"
                                                name="nome"
                                                required
                                                minLength={3}
                                                value={formData.nome}
                                                onChange={handleChange}
                                                placeholder="Digite o nome"
                                                className={styles.fieldInput}
                                            />
                                        </div>

                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>
                                                CRM
                                            </span>
                                            <input
                                                type="text"
                                                name="crm"
                                                required
                                                maxLength={9}
                                                value={formData.crm}
                                                onChange={handleChange}
                                                placeholder="Digite o CRM"
                                                className={styles.fieldInput}
                                            />
                                        </div>

                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>
                                                Especialidade
                                            </span>
                                            <input
                                                type="text"
                                                name="especialidade"
                                                required
                                                value={formData.especialidade}
                                                onChange={handleChange}
                                                placeholder="Ex: Cardiologia"
                                                className={styles.fieldInput}
                                            />
                                        </div>

                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>
                                                Valor da Consulta
                                            </span>
                                            <input
                                                type="number"
                                                name="valorConsulta"
                                                min="0"
                                                step="0.01"
                                                required
                                                value={formData.valorConsulta}
                                                onChange={handleChange}
                                                placeholder="0,00"
                                                className={styles.fieldInput}
                                            />
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </Card>

                    {/* Botões */}
                    <div className={styles.buttonGroup}>
                        <button
                            type="submit"
                            className={styles.buttonPrimary}
                        >
                            {modoEdicao ? "Atualizar Médico" : "Cadastrar Médico"}
                        </button>

                        <button
                            type="button"
                            className={styles.buttonSecondary}
                            onClick={() => navigate("/lista/medico")}
                        >
                            Voltar
                        </button>
                    </div>

                </div>
            </form>
        </main>
    );
}

export default FormMedico;

