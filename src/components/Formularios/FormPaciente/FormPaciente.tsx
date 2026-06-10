import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PacienteRequest from '../../../fetch/PacienteRequest';
import type { PacienteDTO } from '../../../dto/PacienteDTO';
import Utilitario from '../../../utils/Utilitario';
import styles from './FormPaciente.module.css';

function FormPaciente() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<PacienteDTO>({
        idPaciente: 0,
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        senha: '',
        dataNascimento: new Date(),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'telefone') {
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
        <main className={`${styles.container} flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto`}>
            <div className="max-w-3xl mx-auto">
                <form
                    onSubmit={handleSubmit}
                    className={`${styles.form} bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200`}
                >
                    {/* Cabeçalho */}
                    <div className="mb-8 sm:mb-10">
                        <h1 className={`${styles.headerTitle} text-3xl sm:text-4xl font-bold text-slate-800`}>
                            Cadastro de Paciente
                        </h1>
                        <p className={`${styles.subtitle} text-slate-500 mt-1 text-sm`}>
                            Preencha os dados abaixo para registrar um novo paciente.
                        </p>
                    </div>

                    <div className="space-y-6">

                        {/* Linha 1: Nome e CPF */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="nome" className={`${styles.label} block text-sm font-semibold text-slate-700 mb-2`}>
                                    Nome completo
                                </label>
                                <input
                                    type="text"
                                    name="nome"
                                    id="nome"
                                    required
                                    minLength={3}
                                    onChange={handleChange}
                                    placeholder="Digite o nome"
                                    className={`${styles.input} w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800`}
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="cpf" className={`${styles.label} block text-sm font-semibold text-slate-700 mb-2`}>
                                    CPF
                                </label>
                                <input
                                    type="text"
                                    name="cpf"
                                    id="cpf"
                                    required
                                    minLength={11}
                                    onChange={handleChange}
                                    placeholder="000.000.000-00"
                                    className={`${styles.input} w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800`}
                                />
                            </div>
                        </div>

                        {/* Linha 2: E-mail */}
                        <div>
                            <label htmlFor="email" className={`${styles.label} block text-sm font-semibold text-slate-700 mb-2`}>
                                E-mail
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleChange}
                                placeholder="exemplo@email.com"
                                className={`${styles.input} w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800`}
                            />
                        </div>

                        {/* Linha 3: Data de Nascimento e Telefone */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="dataNascimento" className={`${styles.label} block text-sm font-semibold text-slate-700 mb-2`}>
                                    Data de Nascimento
                                </label>
                                <input
                                    type="date"
                                    name="dataNascimento"
                                    id="dataNascimento"
                                    onChange={handleChange}
                                    className={`${styles.input} w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all text-slate-600`}
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="telefone" className={`${styles.label} block text-sm font-semibold text-slate-700 mb-2`}>
                                    Telefone
                                </label>
                                <input
                                    type="tel"
                                    name="telefone"
                                    id="telefone"
                                    value={formData.telefone}
                                    onChange={handleChange}
                                    placeholder="(xx) x xxxx-xxxx"
                                    className={`${styles.input} w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800`}
                                />
                            </div>
                        </div>

                    </div>

                    {/* Divisor */}
                    <hr className={`${styles.divider} my-8 border-slate-100`} />

                    {/* Botões */}
                    <div className="space-y-3">
                        <button
                            type="submit"
                            className={`${styles.btnPrimary} w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-base tracking-wide cursor-pointer hover:bg-teal-700 shadow-md hover:shadow-lg transition-all active:scale-[0.98]`}
                        >
                            Cadastrar Paciente
                        </button>
                        <button
                            type="button"
                            className={`${styles.btnSecondary} w-full bg-white border-2 border-slate-200 text-slate-600 py-4 rounded-xl font-semibold text-base hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]`}
                            onClick={() => navigate(`/lista/paciente`)}
                        >
                            Voltar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default FormPaciente;