import { useState, type JSX } from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { useNavigate } from 'react-router-dom';
import PacienteRequest from '../../../fetch/PacienteRequest';
import type { PacienteDTO } from '../../../dto/PacienteDTO';
import Utilitario from '../../../utils/Utilitario';
import { AlertCard, type AlertVariant } from '../../AlertCard';
import styles from '../../../styles/DetalhesPadrao.module.css';

interface AlertaState {
    variant: AlertVariant;
    title?: string;
    message: string;
    type?: 'banner' | 'toast';
}

function FormPaciente(): JSX.Element {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<PacienteDTO>({
        nome: '',
        cpf: '',
        telefone: '',
        dataNascimento: '',
    });
    const [salvando, setSalvando] = useState(false);
    const [alerta, setAlerta] = useState<AlertaState | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'cpf') {
            setFormData(prev => ({ ...prev, [name]: Utilitario.formatarCpf(value) }));
            return;
        }

        if (name === 'telefone') {
            const telefoneFormatado = Utilitario.formatarTelefone(value);
            setFormData(prev => ({ ...prev, [name]: telefoneFormatado }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAlerta(null);

        const paciente: PacienteDTO = {
            nome: formData.nome.trim(),
            cpf: formData.cpf.replace(/\D/g, ''),
            telefone: formData.telefone?.replace(/\D/g, '') || undefined,
            dataNascimento: formData.dataNascimento,
        };

        if (paciente.cpf.length !== 11) {
            setAlerta({
                variant: 'warning',
                title: 'CPF Incompleto',
                message: 'O CPF deve conter 11 números.',
            });
            return;
        }

        setSalvando(true);
        try {
            const resposta = await PacienteRequest.enviarFormularioPaciente(paciente);
            if (resposta) {
                navigate(`/lista/paciente`, {
                    state: {
                        alerta: {
                            variant: 'success',
                            title: 'Paciente Cadastrado',
                            message: 'Paciente cadastrado com sucesso!',
                            type: 'toast',
                        }
                    }
                });
            } else {
                setAlerta({
                    variant: 'danger',
                    title: 'Erro de Cadastro',
                    message: 'Erro ao cadastrar paciente.',
                });
            }
        } catch (error) {
            const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
            setAlerta({
                variant: 'danger',
                title: 'Erro no Servidor',
                message: `Não foi possível cadastrar o paciente: ${mensagem}`,
            });
        } finally {
            setSalvando(false);
        }
    };

    return (
        <main className={`${styles.detailsWrapper} ${styles.centeredFormWrapper}`}>
            {alerta && (
                <AlertCard
                    variant={alerta.variant}
                    type={alerta.type || 'toast'}
                    title={alerta.title}
                    message={alerta.message}
                    onClose={() => setAlerta(null)}
                />
            )}
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

                            {/* Grid */}
                            <div className={`${styles.infoGrid} ${styles.singleColumnGrid}`}>
                                <div className={styles.infoSection}>
                                    <h3 className={styles.sectionTitle}>
                                        <i className="pi pi-user text-green-500 text-sm"></i>
                                        {" "}Informações Pessoais
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
                                                value={formData.nome}
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
                                                maxLength={14}
                                                value={formData.cpf}
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
                                                required
                                                value={String(formData.dataNascimento)}
                                                onChange={handleChange}
                                                className={styles.fieldInput}
                                            />
                                        </div>

                                        <div className={styles.fieldGroup}>
                                            <span className={styles.fieldLabel}>Telefone</span>
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
                        <button
                            type="submit"
                            disabled={salvando}
                            className={styles.buttonPrimary}
                        >
                            {salvando ? 'Cadastrando...' : 'Cadastrar Paciente'}
                        </button>

                        <button
                            type="button"
                            className={styles.buttonSecondary}
                            onClick={() => navigate(`/lista/paciente`)}
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

