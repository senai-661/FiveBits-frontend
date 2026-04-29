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
}

export default new MedicoRequests;