import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ConsultaRequest from "../../../fetch/ConsultaRequest";
import MedicoRequests from "../../../fetch/MedicoRequest";
import PacienteRequests from "../../../fetch/PacienteRequest";
import { AlertCard, type AlertVariant } from "../../AlertCard";

import styles from "../../../styles/DetalhesPadrao.module.css";

import type { ConsultaDTO } from "../../../dto/ConsultaDTO";
import type { MedicoDTO } from "../../../dto/MedicoDTO";
import type { PacienteDTO } from "../../../dto/PacienteDTO";

interface FormConsultaProps {
    idConsulta?: number;
}

interface AlertaState {
    variant: AlertVariant;
    title?: string;
    message: string;
    type?: 'banner' | 'toast';
}

function FormConsulta({ idConsulta }: FormConsultaProps) {
    const navigate = useNavigate();

    const [listaPacientes, setListaPacientes] = useState<PacienteDTO[]>([]);
    const [listaMedicos, setListaMedicos] = useState<MedicoDTO[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [alerta, setAlerta] = useState<AlertaState | null>(null);
    const modoEdicao = idConsulta !== undefined;

    const [formData, setFormData] = useState<ConsultaDTO>({
        dataHora: new Date(),
        status: "Pendente",
        modalidade: "Pessoalmente",
        triagemSintomas: "",
        situacao: true,

        paciente: {
            idPaciente: 0,
            nomePaciente: "",
            cpf: "",
            telefone: "",
            dataNascimento: new Date(),
            situacao: true
        },

        medico: {
            idMedico: 0,
            nomeMedico: "",
            crm: "",
            especialidade: "",
            valorConsulta: 0,
            situacao: true
        }
    });

    useEffect(() => {
        async function carregarDados() {
            setCarregando(true);

            const [pacientes, medicos, consulta] = await Promise.all([
                PacienteRequests.obterListaDePacientes(),
                MedicoRequests.obterListaDeMedicos(),
                modoEdicao ? ConsultaRequest.obterConsultaPorId(idConsulta) : Promise.resolve(undefined)
            ]);

            if (pacientes) setListaPacientes(pacientes as PacienteDTO[]);
            if (medicos) setListaMedicos(medicos as MedicoDTO[]);
            if (consulta) setFormData(consulta as ConsultaDTO);

            setCarregando(false);
        }

        carregarDados();
    }, [idConsulta, modoEdicao]);

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
        setAlerta(null);

        try {
            const resposta = modoEdicao
                ? await ConsultaRequest.atualizarConsulta(formData)
                : await ConsultaRequest.enviarFormularioConsulta(formData);

            if (resposta) {
                navigate("/lista/consulta", {
                    state: {
                        alerta: {
                            variant: 'success',
                            title: modoEdicao ? "Consulta Atualizada" : "Consulta Agendada",
                            message: modoEdicao ? "Consulta atualizada com sucesso!" : "Consulta cadastrada com sucesso!",
                            type: 'toast',
                        }
                    }
                });
            } else {
                setAlerta({
                    variant: 'danger',
                    title: 'Erro na Operação',
                    message: modoEdicao ? "Erro ao atualizar consulta!" : "Erro ao cadastrar consulta!",
                });
            }
        } catch (error) {
            const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
            const acao = modoEdicao ? "atualizar" : "cadastrar";
            setAlerta({
                variant: 'danger',
                title: 'Erro no Servidor',
                message: `Não foi possível ${acao} a consulta: ${mensagem}`,
            });
        }
    };

    return (
        <main className={styles.detailsWrapper}>
            {alerta && (
                <div style={{ marginBottom: '1.25rem', maxWidth: '800px', marginInline: 'auto' }}>
                    <AlertCard
                        variant={alerta.variant}
                        type={alerta.type || 'toast'}
                        title={alerta.title}
                        message={alerta.message}
                        onClose={() => setAlerta(null)}
                    />
                </div>
            )}
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
                                        {modoEdicao ? "Atualização de Consulta" : "Cadastro de Consulta"}
                                    </h2>

                                    <div className={styles.headerSubtitle}>
                                        <span>
                                            {modoEdicao
                                                ? "Altere os dados abaixo e salve as informações da consulta."
                                                : "Preencha os dados abaixo para registrar uma nova consulta."}
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
                                                    value={new Date(formData.dataHora).toISOString().slice(0, 16)}
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
                                {modoEdicao ? "Atualizar Consulta" : "Cadastrar Consulta"}
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