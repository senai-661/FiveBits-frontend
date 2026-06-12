import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ConsultaRequest from "../../../fetch/ConsultaRequest";
import MedicoRequests from "../../../fetch/MedicoRequest";
import PacienteRequests from "../../../fetch/PacienteRequest";

import styles from "../../../styles/DetalhesPadrao.module.css"; 

import type { ConsultaDTO } from "../../../dto/ConsultaDTO";
import type { MedicoDTO } from "../../../dto/MedicoDTO";
import type { PacienteDTO } from "../../../dto/PacienteDTO";

function FormConsulta() {
    const navigate = useNavigate();

    const [listaPacientes, setListaPacientes] = useState<PacienteDTO[]>([]);
    const [listaMedicos, setListaMedicos] = useState<MedicoDTO[]>([]);
    const [carregando, setCarregando] = useState(true);

    const [formData, setFormData] = useState<ConsultaDTO>({
        dataHora: new Date(),
        status: "Pendente",
        modalidade: "Pessoalmente",
        triagemSintomas: "",
        situacao: true,

        paciente: {
            idPaciente: 0,
            nome: "",
            cpf: "",
            telefone: "",
            dataNascimento: new Date(),
            situacao: true
        },

        medico: {
            idMedico: 0,
            nome: "",
            crm: "",
            especialidade: "",
            valorConsulta: 0,
            situacao: true
        }
    });

    useEffect(() => {
        async function carregarDados() {
            setCarregando(true);

            const [pacientes, medicos] = await Promise.all([
                PacienteRequests.obterListaDePacientes(),
                MedicoRequests.obterListaDeMedicos()
            ]);

            if (pacientes) setListaPacientes(pacientes as PacienteDTO[]);
            if (medicos) setListaMedicos(medicos as MedicoDTO[]);

            setCarregando(false);
        }

        carregarDados();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        if (name === "idPaciente") {
            setFormData(prev => ({
                ...prev,
                paciente: {
                    ...prev.paciente,
                    idPaciente: Number(value)
                }
            }));
        } else if (name === "idMedico") {
            setFormData(prev => ({
                ...prev,
                medico: {
                    ...prev.medico,
                    idMedico: Number(value)
                }
            }));
        } else if (name === "dataHora") {
            setFormData(prev => ({
                ...prev,
                dataHora: new Date(value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        console.log(formData);

        const resposta =
            await ConsultaRequest.enviarFormularioConsulta(formData);

        if (resposta) {
            alert("Consulta cadastrada com sucesso!");
          navigate("/lista/consulta");
        } else {
            alert("Erro ao cadastrar consulta!");
        }
    };

    return (
    <main className={styles.detailsWrapper}>
        {carregando ? (
            <p>Carregando dados...</p>
        ) : (
            <form onSubmit={handleSubmit}>
                <div className={styles.cardContainer}>

                    <div className={styles.detailsCard}>
                        <div className={styles.cardContent}>

                            {/* Cabeçalho */}
                            <div className={styles.detailsHeader}>
                                <h2 className={styles.headerTitle}>
                                    Cadastro de Consulta
                                </h2>

                                <div className={styles.headerSubtitle}>
                                    <span>
                                        Preencha os dados abaixo para registrar uma nova consulta.
                                    </span>
                                </div>
                            </div>

                            <div className={styles.infoGrid}>

                                {/* Paciente */}
                                <div className={styles.infoSection}>
                                    <h3 className={styles.sectionTitle}>
                                        <i className="pi pi-user text-green-500 text-sm"></i>
                                        {" "}Paciente
                                    </h3>

                                    <div className={styles.sectionText}>
                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>
                                                Paciente
                                            </span>

                                            <select
                                                name="idPaciente"
                                                required
                                                value={formData.paciente.idPaciente || ""}
                                                onChange={handleChange}
                                                className={styles.fieldInput}
                                            >
                                                <option value="">
                                                    Selecione um paciente
                                                </option>

                                                {listaPacientes.map((paciente) => (
                                                    <option
                                                        key={paciente.idPaciente}
                                                        value={paciente.idPaciente}
                                                    >
                                                        {paciente.nome} - {paciente.cpf}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Médico */}
                                <div className={styles.infoSection}>
                                    <h3 className={styles.sectionTitle}>
                                        <i className="pi pi-briefcase text-orange-500 text-sm"></i>
                                        {" "}Médico
                                    </h3>

                                    <div className={styles.sectionText}>
                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>
                                                Médico
                                            </span>

                                            <select
                                                name="idMedico"
                                                required
                                                value={formData.medico.idMedico || ""}
                                                onChange={handleChange}
                                                className={styles.fieldInput}
                                            >
                                                <option value="">
                                                    Selecione um médico
                                                </option>

                                                {listaMedicos.map((medico) => (
                                                    <option
                                                        key={medico.idMedico}
                                                        value={medico.idMedico}
                                                    >
                                                        {medico.nome} - {medico.especialidade}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Dados da Consulta */}
                                <div className={styles.infoSection}>
                                    <h3 className={styles.sectionTitle}>
                                        <i className="pi pi-calendar text-blue-500 text-sm"></i>
                                        {" "}Dados da Consulta
                                    </h3>

                                    <div className={styles.sectionText}>

                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>
                                                Data e Hora
                                            </span>

                                            <input
                                                type="datetime-local"
                                                name="dataHora"
                                                required
                                                onChange={handleChange}
                                                className={styles.fieldInput}
                                            />
                                        </div>

                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>
                                                Modalidade
                                            </span>

                                            <select
                                                name="modalidade"
                                                value={formData.modalidade}
                                                onChange={handleChange}
                                                className={styles.fieldInput}
                                            >
                                                <option value="Pessoalmente">
                                                    Pessoalmente
                                                </option>

                                                <option value="Telemedicina">
                                                    Telemedicina
                                                </option>
                                            </select>
                                        </div>

                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>
                                                Status
                                            </span>

                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className={styles.fieldInput}
                                            >
                                                <option value="Pendente">
                                                    Pendente
                                                </option>

                                                <option value="Confirmado">
                                                    Confirmado
                                                </option>

                                                <option value="Cancelado">
                                                    Cancelado
                                                </option>

                                                <option value="Concluido">
                                                    Concluído
                                                </option>
                                            </select>
                                        </div>

                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>
                                                Triagem de Sintomas
                                            </span>

                                            <textarea
                                                name="triagemSintomas"
                                                rows={5}
                                                required
                                                value={formData.triagemSintomas}
                                                onChange={handleChange}
                                                className={styles.fieldInput}
                                                placeholder="Descreva os sintomas do paciente"
                                            />
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Botões */}
                    <div className={styles.buttonGroup}>
                        <button
                            type="submit"
                            className={styles.buttonPrimary}
                        >
                            Cadastrar Consulta
                        </button>

                        <button
                            type="button"
                            className={styles.buttonSecondary}
                            onClick={() => navigate("/lista/consulta")}
                        >
                            Voltar
                        </button>
                    </div>

                </div>
            </form>
        )}
    </main>
);
}

export default FormConsulta;