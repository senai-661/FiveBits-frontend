import type { ConsultaDTO } from "../dto/ConsultaDTO";

// Classe responsável por fazer requisições à API - consulta
class ConsultaRequests {
    private serverURL;
    private endpointConsulta;

    constructor() {
        this.serverURL = `http://localhost:3333`;
        this.endpointConsulta = `/api/consultas`;
    }

    private async mensagemDeErro(respostaAPI: Response): Promise<string> {
        const erroAPI = await respostaAPI.json().catch(() => null);
        return erroAPI?.mensagem || erroAPI?.message || respostaAPI.statusText;
    }

    async obterListaDeConsultas() {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointConsulta}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if(respostaAPI.ok) {
                const listaDeConsultas = await respostaAPI.json();
                return listaDeConsultas;
            } else {
                throw new Error("Não foi possível listar as consultas.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de consultas. ${error}`);
            throw error;
        }
    }


async obterConsultaPorId(id_consulta: number) {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointConsulta}/${id_consulta}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const consulta = await respostaAPI.json();
                return consulta;
            } else {
                throw new Error(`Não foi possível buscar o empréstimo com ID ${id_consulta}.`);
            }
        } catch (error) {
            console.error(`Erro ao buscar o empréstimo por ID. ${error}`);
            throw error;
        }
    }

    async enviarFormularioConsulta(formConsulta: ConsultaDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const headers: Record<string, string> = {
                'Content-Type': 'application/json'
            };

            if (token) headers['x-access-token'] = token;

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointConsulta}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(formConsulta)
            });

            if (!respostaAPI.ok) {
                let detalhe = '';
                try {
                    detalhe = await respostaAPI.text();
                } catch {
                    detalhe = `${respostaAPI.statusText}`;
                }

                console.error(`Erro ao cadastrar consulta: ${respostaAPI.status} ${respostaAPI.statusText} - ${detalhe}`);
                throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
            }

            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);

            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }

    async atualizarConsulta(formConsulta: ConsultaDTO): Promise<boolean> {
        if (formConsulta.idConsulta === undefined) {
            throw new Error("ID da consulta não informado.");
        }

        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointConsulta}/${formConsulta.idConsulta}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify({
                    idConsulta: formConsulta.idConsulta,
                    idPaciente: formConsulta.paciente.idPaciente,
                    idMedico: formConsulta.medico.idMedico,
                    dataHora: formConsulta.dataHora,
                    status: formConsulta.status,
                    modalidade: formConsulta.modalidade,
                    triagemSintomas: formConsulta.triagemSintomas
                })
            });

            if (!respostaAPI.ok) {
                throw new Error(`Erro ${respostaAPI.status}: ${await this.mensagemDeErro(respostaAPI)}`);
            }

            return true;
        } catch (error) {
            console.error(`Erro ao atualizar consulta. ${error}`);
            throw error;
        }
    }

    async deletarConsulta(idConsulta: number): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointConsulta}/${idConsulta}`, {
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
            console.error(`Erro ao deletar consulta. ${error}`);
            return false;
        }
    }
}

export default new ConsultaRequests;