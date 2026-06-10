import { useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import PacienteRequest from "../../../fetch/PacienteRequest";
import type { PacienteDTO } from "../../../dto/PacienteDTO";
import Utilitario from "../../../utils/Utilitario";
import styles from "../../../styles/DetalhesPadrao.module.css";

function FormPaciente(): JSX.Element {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<PacienteDTO>({
        idPaciente: 0,
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        senha: "",
        dataNascimento: new Date(),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "telefone") {
            const telefoneFormatado = Utilitario.formatarTelefone(value);
            setFormData(prev => ({ ...prev, [name]: telefoneFormatado }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!Utilitario.validarEmail(formData.email)) {
            alert("E-mail inválido");
            return;
        }

        const resposta = await PacienteRequest.enviarFormularioPaciente(formData);
        if (resposta) {
            alert("Paciente cadastrado com sucesso");
        } else {
            alert("Erro ao cadastrar paciente");
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
                                <h2 className={styles.headerTitle}>Cadastro de Paciente</h2>
                                <div className={styles.headerSubtitle}>
                                    <span>Preencha os dados abaixo para registrar um novo paciente.</span>
                                </div>
                            </div>

                            <Divider className="my-3" />

                            {/* Grid de seções */}
                            <div className={styles.infoGrid}>

                                {/* Seção: Informações Pessoais */}
                                <div className={styles.infoSection}>
                                    <h3 className={styles.sectionTitle}>
                                        <i className="pi pi-user text-blue-500 text-sm"></i> Informações Pessoais
                                    </h3>
                                    <div className={styles.sectionText}>

                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>Nome Completo</span>
                                            <input
                                                type="text"
                                                name="nome"
                                                id="nome"
                                                required
                                                minLength={3}
                                                onChange={handleChange}
                                                placeholder="Digite o nome"
                                                className={styles.fieldInput}
                                            />
                                        </div>

                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>CPF</span>
                                            <input
                                                type="text"
                                                name="cpf"
                                                id="cpf"
                                                required
                                                minLength={11}
                                                onChange={handleChange}
                                                placeholder="000.000.000-00"
                                                className={styles.fieldInput}
                                            />
                                        </div>

                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>Data de Nascimento</span>
                                            <input
                                                type="date"
                                                name="dataNascimento"
                                                id="dataNascimento"
                                                onChange={handleChange}
                                                className={styles.fieldInput}
                                            />
                                        </div>

                                    </div>
                                </div>

                                {/* Seção: Contato */}
                                <div className={styles.infoSection}>
                                    <h3 className={styles.sectionTitle}>
                                        <i className="pi pi-map-marker text-orange-500 text-sm"></i> Contato
                                    </h3>
                                    <div className={styles.sectionText}>

                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>E-mail</span>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                onChange={handleChange}
                                                placeholder="exemplo@email.com"
                                                className={styles.fieldInput}
                                            />
                                        </div>

                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>Celular / Telefone</span>
                                            <input
                                                type="tel"
                                                name="telefone"
                                                id="telefone"
                                                value={formData.telefone}
                                                onChange={handleChange}
                                                placeholder="(xx) x xxxx-xxxx"
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
                        <button type="submit" className={styles.buttonPrimary}>
                            Cadastrar Paciente
                        </button>
                        <button
                            type="button"
                            className={styles.buttonSecondary}
                            onClick={() => navigate("/lista/paciente")}
                        >
                            Voltar
                        </button>
                    </div>

                </div>
            </form>
        </main>
    );
}

export default FormPaciente;