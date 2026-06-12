// Classe responsável por fazer requisições à API - paciente
import type { PacienteDTO } from "../dto/PacienteDTO";

class PacienteRequests {
    private serverURL;
    private endpointPaciente;

    constructor() {
        this.serverURL = `http://localhost:3333`;
        this.endpointPaciente = `/api/pacientes`;
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
}

export default new PacienteRequests;
