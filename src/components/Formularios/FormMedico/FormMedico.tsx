import { useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import MedicoRequest from "../../../fetch/MedicoRequest";
import type { MedicoDTO } from "../../../dto/MedicoDTO";
import Utilitario from "../../../utils/Utilitario";
import styles from "../../../styles/DetalhesPadrao.module.css";

function FormMedico(): JSX.Element {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<MedicoDTO>({
        idMedico: 0,
        nome: "",
        crm: "",
        especialidade: "",
        valorConsulta: 0,
        emailMedico: "",
        senhaMedico: "",
        situacao: true
    });

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

        if (!Utilitario.validarEmail(formData.emailMedico)) {
            alert("E-mail inválido");
            return;
        }

        const resposta =
            await MedicoRequest.enviarFormularioMedico(formData);

        if (resposta) {
            alert("Médico cadastrado com sucesso");
        } else {
            alert("Erro ao cadastrar médico");
        }
    };

    return (
        <main className={styles.detailsWrapper}>
            <form onSubmit={handleSubmit}>
                <div className={styles.cardContainer}>
                    <Card className={styles.detailsCard}>
                        <div className={styles.cardContent}>

                            {/* Cabeçalho */}
                            <div className={styles.detailsHeader}>
                                <h2 className={styles.headerTitle}>
                                    Cadastro de Médico
                                </h2>
                                <div className={styles.headerSubtitle}>
                                    <span>
                                        Preencha os dados abaixo para registrar um novo médico.
                                    </span>
                                </div>
                            </div>

                            <Divider className="my-3" />

                            {/* Grid */}
                            <div className={styles.infoGrid}>

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
                                                onChange={handleChange}
                                                placeholder="0,00"
                                                className={styles.fieldInput}
                                            />
                                        </div>

                                    </div>
                                </div>

                                {/* Contato e Acesso */}
                                <div className={styles.infoSection}>
                                    <h3 className={styles.sectionTitle}>
                                        <i className="pi pi-envelope text-orange-500 text-sm"></i>
                                        {" "}Contato e Acesso
                                    </h3>

                                    <div className={styles.sectionText}>

                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>
                                                E-mail
                                            </span>
                                            <input
                                                type="email"
                                                name="emailMedico"
                                                required
                                                onChange={handleChange}
                                                placeholder="medico@email.com"
                                                className={styles.fieldInput}
                                            />
                                        </div>

                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>
                                                Senha
                                            </span>
                                            <input
                                                type="password"
                                                name="senhaMedico"
                                                required
                                                minLength={6}
                                                onChange={handleChange}
                                                placeholder="Digite a senha"
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
                            Cadastrar Médico
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