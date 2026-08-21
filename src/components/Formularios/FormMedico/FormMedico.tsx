import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import MedicoRequest from "../../../fetch/MedicoRequest";
import type { MedicoDTO } from "../../../dto/MedicoDTO";
import styles from "../../../styles/DetalhesPadrao.module.css";

interface FormMedicoProps {
    idMedico?: number;
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

    useEffect(() => {
        if (idMedico === undefined) return;

        async function buscarMedico(medicoId: number) {
            try {
                const medico = await MedicoRequest.obterMedicoPorId(medicoId);
                if (medico) setFormData(medico);
                else alert("Médico não encontrado");
            } catch (error) {
                console.error("Erro ao carregar médico para edição:", error);
                alert("Erro ao carregar os dados do médico");
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
                name === "valorConsulta"
                    ? Number(value)
                    : value
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();


        try {
            const resposta = modoEdicao
                ? await MedicoRequest.atualizarMedico(formData)
                : await MedicoRequest.enviarFormularioMedico(formData);

            if (resposta) {
                alert(modoEdicao ? "Médico atualizado com sucesso" : "Médico cadastrado com sucesso");
                navigate("/lista/medico");
            } else {
                alert(modoEdicao ? "Erro ao atualizar médico" : "Erro ao cadastrar médico");
            }
        } catch (error) {
            const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
            const acao = modoEdicao ? "atualizar" : "cadastrar";
            alert(`Não foi possível ${acao} o médico: ${mensagem}`);
        }
    };

    if (carregando) {
        return <main className={`${styles.detailsWrapper} ${styles.centeredFormWrapper}`}><p>Carregando dados do médico...</p></main>;
    }

    return (
        <main className={`${styles.detailsWrapper} ${styles.centeredFormWrapper}`}>
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
