import { SERVER_CFG } from "../AppConfig";
import type { MedicoDTO } from "../dto/MedicoDTO";

// Classe responsável por fazer requisições à API - medico
class MedicoRequests {
    private serverURL;
    private endpointMedico;

    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;
        this.endpointMedico = SERVER_CFG.ENDPOINT_MEDICOS;
    }

    private async mensagemDeErro(respostaAPI: Response): Promise<string> {
        const erroAPI = await respostaAPI.json().catch(() => null);
        return erroAPI?.mensagem || erroAPI?.message || respostaAPI.statusText;
    }

    async obterListaDeMedicos() {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointMedico}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if(respostaAPI.ok) {
                const listaDeMedicos = await respostaAPI.json();
                return listaDeMedicos;
            } else {
                throw new Error("Não foi possível listar os médicos.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de médicos. ${error}`);
            throw error;
        }
    }
    async obterMedicoPorId(id_medico: number): Promise<MedicoDTO | undefined> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointMedico}/${id_medico}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const medico: MedicoDTO = await respostaAPI.json();
                return medico;
            } else {
                throw new Error("Não foi possível buscar o médico.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de médico por ID. ${error}`);
            throw error;
        }
    }
    async enviarFormularioMedico(formMedico: MedicoDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointMedico}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formMedico)
            });

            if(!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);

            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);

            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }

    async atualizarMedico(formMedico: MedicoDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const dadosAtualizacao = {
                idMedico: formMedico.idMedico,
                nome: formMedico.nome,
                crm: formMedico.crm,
                especialidade: formMedico.especialidade,
                valorConsulta: formMedico.valorConsulta
            };
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointMedico}/${formMedico.idMedico}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(dadosAtualizacao)
            });

            if (!respostaAPI.ok) {
                throw new Error(`Erro ${respostaAPI.status}: ${await this.mensagemDeErro(respostaAPI)}`);
            }
            return true;
        } catch (error) {
            console.error(`Erro ao atualizar médico. ${error}`);
            throw error;
        }
    }

    async deletarMedico(idMedico: number): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointMedico}/${idMedico}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (!respostaAPI.ok) {
                throw new Error(`Erro ${respostaAPI.status}: ${await this.mensagemDeErro(respostaAPI)}`);
            }
            return true;
        } catch (error) {
            console.error(`Erro ao deletar médico. ${error}`);
            return false;
        }
    }
}

export default new MedicoRequests;