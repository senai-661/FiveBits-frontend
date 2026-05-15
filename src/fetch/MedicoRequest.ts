import type { MedicoDTO } from "../dto/MedicoDTO";

// Classe responsável por fazer requisições à API - medico
class MedicoRequests {
    private serverURL;
    private endpointMedico;

    constructor() {
        this.serverURL = `http://localhost:3333`;
        this.endpointMedico = `/api/medicos`;
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
            return;
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
            return;
        }
    }
}

export default new MedicoRequests;