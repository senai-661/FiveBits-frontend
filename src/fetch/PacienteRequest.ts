// Classe responsável por fazer requisições à API - paciente
import { SERVER_CFG } from "../AppConfig";
import type { PacienteDTO } from "../dto/PacienteDTO";

class PacienteRequests {
    private serverURL;
    private endpointPaciente;

    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;
        this.endpointPaciente = SERVER_CFG.ENDPOINT_PACIENTES;
    }

    async obterListaDePacientes() {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointPaciente}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if(respostaAPI.ok) {
                const listaDePacientes = await respostaAPI.json();
                return listaDePacientes;
            } else {
                throw new Error("Não foi possível listar os pacientes.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de pacientes. ${error}`);
            throw error;
        }
    }

    async obterPacientePorId(id_paciente: number): Promise<PacienteDTO | undefined> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointPaciente}/${id_paciente}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const paciente: PacienteDTO = await respostaAPI.json();
                return paciente;
            } else {
                throw new Error("Não foi possível buscar o paciente.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de paciente por ID. ${error}`);
            throw error;
        }
    }

    async enviarFormularioPaciente(formPaciente: PacienteDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointPaciente}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formPaciente)
            });

            if (!respostaAPI.ok) {
                const erroAPI = await respostaAPI.json().catch(() => null);
                const mensagem = erroAPI?.mensagem || respostaAPI.statusText;
                throw new Error(`Erro ${respostaAPI.status}: ${mensagem}`);
            }

            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);

            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }

     async removerPaciente(id_paciente: number): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointPaciente}/${id_paciente}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (!respostaAPI.ok) {
                throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
            }

            console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);

            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }

    async atualizarPaciente(id_paciente: number, formPaciente: PacienteDTO): Promise<{ sucesso: boolean; mensagem?: string }> {
        try {
            if (!formPaciente.dataNascimento || String(formPaciente.dataNascimento).trim() === '') {
                return { sucesso: false, mensagem: 'Data de nascimento é obrigatória.' };
            }

            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointPaciente}/${id_paciente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formPaciente)
            });

            if (!respostaAPI.ok) {
                const erroAPI = await respostaAPI.json().catch(() => null);
                const mensagem = erroAPI?.mensagem || erroAPI?.message || respostaAPI.statusText;
                throw new Error(`Erro ${respostaAPI.status}: ${mensagem}`);
            }

            console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);

            return { sucesso: true };
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return {
                sucesso: false,
                mensagem: error instanceof Error ? error.message : 'Erro desconhecido ao atualizar paciente',
            };
        }
    }
}

export default new PacienteRequests;
