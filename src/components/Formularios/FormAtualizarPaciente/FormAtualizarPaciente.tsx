import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PacienteRequest from '../../../fetch/PacienteRequest';
import type { PacienteDTO } from '../../../dto/PacienteDTO';
import Utilitario from '../../../utils/Utilitario';
import styles from '../FormPaciente/FormPaciente.module.css';

interface FormAtualizarPacienteProps {
    idPaciente: number;
}

function formatarDataParaInput(data: Date | string): string {
    const valor = String(data);
    if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
        return valor;
    }

    const dataBrasileira = valor.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (dataBrasileira) {
        return `${dataBrasileira[3]}-${dataBrasileira[2]}-${dataBrasileira[1]}`;
    }

    const dataConvertida = new Date(valor);
    if (Number.isNaN(dataConvertida.getTime())) {
        return '';
    }

    return dataConvertida.toISOString().slice(0, 10);
}

function FormAtualizarPaciente({ idPaciente }: FormAtualizarPacienteProps) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<PacienteDTO>({
        nome: '',
        cpf: '',
        telefone: '',
        dataNascimento: '',
    });
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState('');

    useEffect(() => {
        async function carregarPaciente() {
            try {
                const paciente = await PacienteRequest.obterPacientePorId(idPaciente);
                if (!paciente) {
                    setErro('Paciente não encontrado.');
                    return;
                }

                setFormData({
                    ...paciente,
                    cpf: paciente.cpf,
                    telefone: paciente.telefone || '',
                    dataNascimento: formatarDataParaInput(paciente.dataNascimento),
                });
            } catch {
                setErro('Não foi possível carregar os dados do paciente.');
            } finally {
                setCarregando(false);
            }
        }

        carregarPaciente();
    }, [idPaciente]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'telefone' ? Utilitario.formatarTelefone(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!Number.isInteger(idPaciente) || idPaciente <= 0) {
            alert('Identificador do paciente inválido');
            return;
        }

        const cpf = formData.cpf.replace(/\D/g, '');

        if (cpf.length !== 11) {
            alert('CPF deve conter 11 números');
            return;
        }

        const dataNascimento = String(formData.dataNascimento).trim();
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dataNascimento)) {
            alert('Informe uma data de nascimento válida');
            return;
        }

        setSalvando(true);
        const resposta = await PacienteRequest.atualizarPaciente(idPaciente, {
            nome: formData.nome.trim(),
            cpf,
            telefone: formData.telefone?.replace(/\D/g, '') || undefined,
            dataNascimento,
        });
        setSalvando(false);

        if (resposta.sucesso) {
            alert('Paciente atualizado com sucesso');
            navigate(`/detalhes/paciente/${idPaciente}`);
        } else {
            alert(resposta.mensagem || 'Erro ao atualizar paciente');
        }
    };

    if (carregando) {
        return <main className={`${styles.container} flex-1`}><p>Carregando dados do paciente...</p></main>;
    }

    if (erro) {
        return (
            <main className={`${styles.container} flex-1`}>
                <div className="max-w-3xl mx-auto">
                    <p role="alert" className="text-red-600">{erro}</p>
                    <button type="button" className={`${styles.btnSecondary} mt-6`} onClick={() => navigate('/lista/paciente')}>Voltar</button>
                </div>
            </main>
        );
    }

    return (
        <main className={`${styles.container} flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto`}>
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className={`${styles.form} bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200`}>
                    <div className="mb-8 sm:mb-10">
                        <h1 className={`${styles.headerTitle} text-3xl sm:text-4xl font-bold text-slate-800`}>Atualizar Paciente</h1>
                        <p className={`${styles.subtitle} text-slate-500 mt-1 text-sm`}>Altere os dados do paciente e salve as modificações.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="nome" className={`${styles.label} block text-sm font-semibold text-slate-700 mb-2`}>Nome completo</label>
                                <input type="text" name="nome" id="nome" required minLength={3} value={formData.nome} onChange={handleChange} className={`${styles.input} w-full px-4 py-3 border-2 border-slate-200 rounded-xl`} />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="cpf" className={`${styles.label} block text-sm font-semibold text-slate-700 mb-2`}>CPF</label>
                                <input type="text" name="cpf" id="cpf" required minLength={11} value={formData.cpf} onChange={handleChange} className={`${styles.input} w-full px-4 py-3 border-2 border-slate-200 rounded-xl`} />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="dataNascimento" className={`${styles.label} block text-sm font-semibold text-slate-700 mb-2`}>Data de Nascimento</label>
                                <input type="date" name="dataNascimento" id="dataNascimento" required value={String(formData.dataNascimento)} onChange={handleChange} className={`${styles.input} w-full px-4 py-3 border-2 border-slate-200 rounded-xl`} />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="telefone" className={`${styles.label} block text-sm font-semibold text-slate-700 mb-2`}>Telefone</label>
                                <input type="tel" name="telefone" id="telefone" value={formData.telefone} onChange={handleChange} placeholder="(xx) x xxxx-xxxx" className={`${styles.input} w-full px-4 py-3 border-2 border-slate-200 rounded-xl`} />
                            </div>
                        </div>
                    </div>

                    <hr className={`${styles.divider} my-8 border-slate-100`} />
                    <div className="space-y-3">
                        <button type="submit" disabled={salvando} className={`${styles.btnPrimary} w-full bg-teal-600 text-white py-4 rounded-xl font-bold disabled:opacity-60`}>{salvando ? 'Salvando...' : 'Salvar Alterações'}</button>
                        <button type="button" className={`${styles.btnSecondary} w-full bg-white border-2 border-slate-200 text-slate-600 py-4 rounded-xl`} onClick={() => navigate(`/detalhes/paciente/${idPaciente}`)}>Cancelar</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default FormAtualizarPaciente;
